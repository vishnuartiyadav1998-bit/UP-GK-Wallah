import hashlib
import hmac
import io
import json
import os
import re
import secrets
import smtplib
import sqlite3
import ssl
import time
import unicodedata
import urllib.parse
import uuid
import csv
from collections import defaultdict, deque
from email.message import EmailMessage
from pathlib import Path, PurePosixPath

from flask import Flask, abort, g, jsonify, request, send_file, send_from_directory
from pypdf import PdfReader
from pypdf.errors import PdfReadError
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.utils import secure_filename


ROOT = Path(__file__).resolve().parent
SESSION_COOKIE = "upgk_session"
SESSION_LIFETIME_SECONDS = 60 * 60 * 12
AUTH_OTP_LIFETIME_SECONDS = 5 * 60
PASSWORD_ITERATIONS = 600_000
USERNAME_PATTERN = re.compile(r"^[a-z0-9_.-]{3,32}$")
EMAIL_PATTERN = re.compile(r"^[^@\s]{1,64}@[^@\s.]+(?:\.[^@\s.]+)+$")
CAPTCHA_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
MAX_PAPER_BYTES = 20 * 1024 * 1024
MAX_IMPORT_CSV_BYTES = 2 * 1024 * 1024
MAX_CSV_ROWS = 1000
MAX_PDF_PAGES = 200
MAX_IMPORTED_THEORY_CHARS = 12000
RATE_LIMITS = defaultdict(deque)
SEARCH_STOP_WORDS = {
    "a", "an", "and", "of", "the", "for", "in",
    "का", "की", "के", "में", "से", "और", "को", "पर", "है",
}
SEARCH_SYNONYMS = {
    "india": ("भारत", "भारतीय"),
    "indian": ("भारत", "भारतीय"),
    "भारत": ("india", "indian"),
    "भारतीय": ("india", "indian"),
    "history": ("इतिहास",),
    "इतिहास": ("history",),
    "geography": ("भूगोल",),
    "भूगोल": ("geography",),
    "constitution": ("संविधान",),
    "संविधान": ("constitution",),
    "polity": ("राजव्यवस्था", "राजनीति"),
    "राजव्यवस्था": ("polity", "governance"),
    "governance": ("शासन", "राजव्यवस्था"),
    "economy": ("अर्थव्यवस्था", "आर्थिक"),
    "अर्थव्यवस्था": ("economy",),
    "science": ("विज्ञान",),
    "विज्ञान": ("science",),
    "environment": ("पर्यावरण",),
    "पर्यावरण": ("environment",),
    "culture": ("संस्कृति", "कला"),
    "संस्कृति": ("culture",),
    "sports": ("खेल",),
    "खेल": ("sports",),
    "exam": ("परीक्षा",),
    "परीक्षा": ("exam",),
    "syllabus": ("पाठ्यक्रम", "सिलेबस"),
    "पाठ्यक्रम": ("syllabus",),
    "chapter": ("अध्याय",),
    "अध्याय": ("chapter",),
    "question": ("प्रश्न",),
    "questions": ("प्रश्न",),
    "प्रश्न": ("question", "questions"),
    "prelims": ("प्रारंभिक", "प्रारम्भिक"),
    "preliminary": ("प्रारंभिक", "प्रारम्भिक"),
    "प्रारंभिक": ("prelims", "preliminary"),
    "mains": ("मुख्य परीक्षा",),
    "मुख्य": ("mains",),
    "paper": ("पेपर",),
    "पेपर": ("paper",),
    "current": ("करेंट", "समसामयिक"),
    "affairs": ("अफेयर्स", "समसामयिक"),
    "समसामयिक": ("current", "affairs"),
}


def password_record(password):
    salt = secrets.token_bytes(6-12)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PASSWORD_ITERATIONS
    )
    return f"pbkdf2_sha256${PASSWORD_ITERATIONS}${salt.hex()}${password_hash.hex()}"


def verify_password(password, record):
    try:
        algorithm, iterations, salt_hex, expected_hex = record.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        actual = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), bytes.fromhex(salt_hex), int(iterations)
        )
        return hmac.compare_digest(actual.hex(), expected_hex)
    except (ValueError, TypeError):
        return False


DUMMY_PASSWORD_RECORD = password_record(secrets.token_urlsafe(24))


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.update(
        DATABASE=os.environ.get("UPGKWALLAH_DATABASE", str(ROOT / "instance" / "users.sqlite3")),
        COOKIE_SECURE=os.environ.get("COOKIE_SECURE", "").lower() in {"1", "true", "yes"},
        TRUST_PROXY=os.environ.get("TRUST_PROXY", "").lower() in {"1", "true", "yes"},
        PUBLIC_ORIGIN=os.environ.get("PUBLIC_ORIGIN", "").rstrip("/"),
        ADMIN_USERNAME=os.environ.get("ADMIN_USERNAME", "admin").strip().lower(),
        ADMIN_PASSWORD=os.environ.get("ADMIN_PASSWORD", ""),
        SMTP_HOST=os.environ.get("SMTP_HOST", "smtp.gmail.com"),
        SMTP_PORT=int(os.environ.get("SMTP_PORT", "587")),
        SMTP_USERNAME=os.environ.get("SMTP_USERNAME", ""),
        SMTP_PASSWORD=os.environ.get("SMTP_PASSWORD", ""),
        SMTP_FROM_EMAIL=os.environ.get("SMTP_FROM_EMAIL", ""),
        EMAIL_SEND=None,
        AUTH_CAPTCHA_SECRET=os.environ.get("AUTH_CAPTCHA_SECRET") or secrets.token_bytes(32),
        MAX_CONTENT_LENGTH=MAX_PAPER_BYTES + 64 * 1024,
    )
    if test_config:
        app.config.update(test_config)
    if app.config["TRUST_PROXY"]:
        app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    admin_password_hash = (
        password_record(app.config["ADMIN_PASSWORD"])
        if 6 <= len(app.config["ADMIN_PASSWORD"]) <= 12
        else None
    )

    Path(app.config["DATABASE"]).parent.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(app.config["DATABASE"])
    try:
        connection.executescript(
            """
            PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                display_name TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                mobile TEXT,
                mobile_verified INTEGER NOT NULL DEFAULT 0,
                email TEXT,
                email_verified INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token_hash TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
            CREATE TABLE IF NOT EXISTS test_results (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                kind TEXT NOT NULL CHECK (kind IN ('mock', 'live')),
                test_id TEXT NOT NULL,
                test_title TEXT NOT NULL,
                exam TEXT NOT NULL,
                score INTEGER NOT NULL,
                total INTEGER NOT NULL,
                duration_seconds INTEGER NOT NULL,
                timed_out INTEGER NOT NULL,
                answers_json TEXT NOT NULL,
                created_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS test_results_user_created
                ON test_results(user_id, created_at DESC);
            CREATE TABLE IF NOT EXISTS admin_sessions (
                token_hash TEXT PRIMARY KEY,
                expires_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS admin_sessions_expiry ON admin_sessions(expires_at);
            CREATE TABLE IF NOT EXISTS exam_content (
                id INTEGER PRIMARY KEY,
                exam_name TEXT NOT NULL,
                content_type TEXT NOT NULL CHECK (content_type IN ('syllabus', 'theory', 'pyq')),
                topic TEXT NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                options_json TEXT,
                correct_index INTEGER,
                explanation TEXT NOT NULL DEFAULT '',
                publication_status TEXT NOT NULL DEFAULT 'draft'
                    CHECK (publication_status IN ('draft', 'published')),
                created_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS exam_content_lookup
                ON exam_content(exam_name, content_type, id DESC);
            CREATE TABLE IF NOT EXISTS admin_tests (
                id INTEGER PRIMARY KEY,
                exam_name TEXT NOT NULL,
                test_type TEXT NOT NULL CHECK (test_type IN ('mock', 'full')),
                title TEXT NOT NULL,
                duration_minutes INTEGER NOT NULL,
                questions_json TEXT NOT NULL,
                publication_status TEXT NOT NULL DEFAULT 'draft'
                    CHECK (publication_status IN ('draft', 'published')),
                created_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS admin_tests_lookup
                ON admin_tests(exam_name, test_type, id DESC);
            CREATE TABLE IF NOT EXISTS previous_papers (
                id INTEGER PRIMARY KEY,
                exam_name TEXT NOT NULL,
                title TEXT NOT NULL,
                paper_year TEXT NOT NULL,
                source TEXT NOT NULL,
                storage_key TEXT NOT NULL UNIQUE,
                publication_status TEXT NOT NULL DEFAULT 'draft'
                    CHECK (publication_status IN ('draft', 'published')),
                created_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS previous_papers_lookup
                ON previous_papers(exam_name, paper_year DESC, id DESC);
            CREATE TABLE IF NOT EXISTS auth_captchas (
                challenge_hash TEXT PRIMARY KEY,
                answer_hash TEXT NOT NULL,
                expires_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS auth_captchas_expiry ON auth_captchas(expires_at);
            CREATE TABLE IF NOT EXISTS auth_otp_challenges (
                challenge_hash TEXT PRIMARY KEY,
                flow TEXT NOT NULL CHECK (flow IN ('register', 'login')),
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                username TEXT,
                display_name TEXT,
                password_hash TEXT,
                mobile TEXT NOT NULL DEFAULT '',
                email TEXT,
                otp_hash TEXT,
                attempts INTEGER NOT NULL DEFAULT 0,
                created_at INTEGER NOT NULL,
                expires_at INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS auth_otp_challenges_expiry
                ON auth_otp_challenges(expires_at);
            """
        )
        existing_user_columns = {
            row[1] for row in connection.execute("PRAGMA table_info(users)")
        }
        if "mobile" not in existing_user_columns:
            connection.execute("ALTER TABLE users ADD COLUMN mobile TEXT")
        if "mobile_verified" not in existing_user_columns:
            connection.execute(
                "ALTER TABLE users ADD COLUMN mobile_verified INTEGER NOT NULL DEFAULT 0"
            )
        if "email" not in existing_user_columns:
            connection.execute("ALTER TABLE users ADD COLUMN email TEXT")
        if "email_verified" not in existing_user_columns:
            connection.execute(
                "ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0"
            )
        existing_challenge_columns = {
            row[1] for row in connection.execute("PRAGMA table_info(auth_otp_challenges)")
        }
        if "email" not in existing_challenge_columns:
            connection.execute("ALTER TABLE auth_otp_challenges ADD COLUMN email TEXT")
        if "otp_hash" not in existing_challenge_columns:
            connection.execute("ALTER TABLE auth_otp_challenges ADD COLUMN otp_hash TEXT")
        if "attempts" not in existing_challenge_columns:
            connection.execute(
                "ALTER TABLE auth_otp_challenges ADD COLUMN attempts INTEGER NOT NULL DEFAULT 0"
            )
        for table in ("exam_content", "admin_tests", "previous_papers"):
            columns = {
                row[1] for row in connection.execute(f"PRAGMA table_info({table})")
            }
            if "publication_status" not in columns:
                connection.execute(
                    f"ALTER TABLE {table} ADD COLUMN publication_status TEXT NOT NULL DEFAULT 'published'"
                )
        connection.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS users_mobile_unique "
            "ON users(mobile) WHERE mobile IS NOT NULL"
        )
        connection.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique "
            "ON users(email COLLATE NOCASE) WHERE email IS NOT NULL"
        )
        connection.commit()
    finally:
        connection.close()

    def get_db():
        if "db" not in g:
            g.db = sqlite3.connect(app.config["DATABASE"], timeout=10)
            g.db.row_factory = sqlite3.Row
            g.db.execute("PRAGMA foreign_keys = ON")
        return g.db

    @app.teardown_appcontext
    def close_db(_error=None):
        database = g.pop("db", None)
        if database is not None:
            database.close()

    @app.after_request
    def add_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cache-Control"] = "no-store"
        if app.config["COOKIE_SECURE"] and request.is_secure:
            response.headers["Strict-Transport-Security"] = "max-age=31536000"
        return response

    def json_body():
        if not request.is_json:
            return None
        body = request.get_json(silent=True)
        return body if isinstance(body, dict) else None

    def same_origin_request():
        origin = request.headers.get("Origin", "").rstrip("/")
        expected_origin = app.config["PUBLIC_ORIGIN"] or request.host_url.rstrip("/")
        return bool(origin) and origin == expected_origin

    def check_rate_limit(action, limit, window_seconds):
        key = (action, request.remote_addr or "unknown")
        now = time.monotonic()
        if key not in RATE_LIMITS and len(RATE_LIMITS) >= 10_000:
            stale_keys = [
                known_key
                for known_key, known_attempts in RATE_LIMITS.items()
                if not known_attempts or now - known_attempts[-1] >= 60 * 60
            ]
            for stale_key in stale_keys:
                del RATE_LIMITS[stale_key]
            if len(RATE_LIMITS) >= 10_000:
                return False
        attempts = RATE_LIMITS[key]
        while attempts and now - attempts[0] >= window_seconds:
            attempts.popleft()
        if len(attempts) >= limit:
            return False
        attempts.append(now)
        return True

    def normalize_email(value):
        if not isinstance(value, str):
            return None
        email = value.strip().lower()
        if len(email) > 254 or not EMAIL_PATTERN.fullmatch(email):
            return None
        return email

    def captcha_digest(challenge_id, answer):
        secret = app.config["AUTH_CAPTCHA_SECRET"]
        if isinstance(secret, str):
            secret = secret.encode("utf-8")
        return hmac.new(
            secret,
            (challenge_id + ":" + answer).encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    def verify_auth_captcha(body):
        challenge_id = body.get("captchaId")
        answer = body.get("captchaCode")
        if (
            not isinstance(challenge_id, str)
            or not 20 <= len(challenge_id) <= 100
            or not isinstance(answer, str)
            or not 4 <= len(answer.strip()) <= 8
        ):
            return False

        database = get_db()
        now = int(time.time())
        row = database.execute(
            "SELECT answer_hash, expires_at FROM auth_captchas WHERE challenge_hash = ?",
            (hashlib.sha256(challenge_id.encode("utf-8")).hexdigest(),),
        ).fetchone()
        database.execute("DELETE FROM auth_captchas WHERE expires_at <= ?", (now,))
        if row is None:
            database.commit()
            return False

        database.execute(
            "DELETE FROM auth_captchas WHERE challenge_hash = ?",
            (hashlib.sha256(challenge_id.encode("utf-8")).hexdigest(),),
        )
        database.commit()
        return row["expires_at"] > now and hmac.compare_digest(
            row["answer_hash"], captcha_digest(challenge_id, answer.strip().upper())
        )

    def email_otp_is_configured():
        return callable(app.config["EMAIL_SEND"]) or bool(
            app.config["SMTP_HOST"]
            and app.config["SMTP_PORT"]
            and app.config["SMTP_USERNAME"]
            and app.config["SMTP_PASSWORD"]
            and (app.config["SMTP_FROM_EMAIL"] or app.config["SMTP_USERNAME"])
        )

    def send_email_otp(email, otp):
        injected_sender = app.config["EMAIL_SEND"]
        if callable(injected_sender):
            return bool(injected_sender(email, otp))

        message = EmailMessage()
        message["Subject"] = "UP GK Wallah account verification"
        message["From"] = app.config["SMTP_FROM_EMAIL"] or app.config["SMTP_USERNAME"]
        message["To"] = email
        message.set_content(
            "Your UP GK Wallah verification code is: {}\n\n"
            "This code expires in 5 minutes. If you did not request this, ignore this email."
            .format(otp)
        )
        try:
            with smtplib.SMTP(app.config["SMTP_HOST"], app.config["SMTP_PORT"], timeout=10) as server:
                server.ehlo()
                server.starttls(context=ssl.create_default_context())
                server.ehlo()
                server.login(app.config["SMTP_USERNAME"], app.config["SMTP_PASSWORD"])
                refused_recipients = server.send_message(message)
        except (OSError, smtplib.SMTPException) as error:
            app.logger.warning("Email OTP delivery failed (%s).", type(error).__name__)
            return False
        return not refused_recipients

    def otp_digest(challenge_id, otp):
        secret = app.config["AUTH_CAPTCHA_SECRET"]
        if isinstance(secret, str):
            secret = secret.encode("utf-8")
        return hmac.new(
            secret,
            ("otp:" + challenge_id + ":" + otp).encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    def create_otp_challenge(flow, email, username=None, name=None, password_hash=None):
        challenge_id = secrets.token_urlsafe(32)
        otp = "{:06d}".format(secrets.randbelow(1_000_000))
        now = int(time.time())
        database = get_db()
        database.execute("DELETE FROM auth_otp_challenges WHERE expires_at <= ?", (now,))
        database.execute(
            """INSERT INTO auth_otp_challenges
               (challenge_hash, flow, user_id, username, display_name, password_hash,
                mobile, email, otp_hash, attempts, created_at, expires_at)
               VALUES (?, ?, NULL, ?, ?, ?, '', ?, ?, 0, ?, ?)""",
            (
                hashlib.sha256(challenge_id.encode("utf-8")).hexdigest(),
                flow,
                username,
                name,
                password_hash,
                email,
                otp_digest(challenge_id, otp),
                now,
                now + AUTH_OTP_LIFETIME_SECONDS,
            ),
        )
        database.commit()
        return challenge_id, otp

    def find_otp_challenge(challenge_id):
        if not isinstance(challenge_id, str) or not 20 <= len(challenge_id) <= 100:
            return None
        return get_db().execute(
            """SELECT challenge_hash, flow, user_id, username, display_name,
                      password_hash, email, otp_hash, attempts, expires_at
               FROM auth_otp_challenges WHERE challenge_hash = ?""",
            (hashlib.sha256(challenge_id.encode("utf-8")).hexdigest(),),
        ).fetchone()

    def consume_otp_challenge(challenge_hash):
        database = get_db()
        database.execute(
            "DELETE FROM auth_otp_challenges WHERE challenge_hash = ?", (challenge_hash,)
        )
        database.commit()

    def set_session_cookie(response, token):
        response.set_cookie(
            SESSION_COOKIE,
            token,
            max_age=SESSION_LIFETIME_SECONDS,
            httponly=True,
            secure=app.config["COOKIE_SECURE"],
            samesite="Strict",
            path="/",
        )

    def authenticated_user():
        token = request.cookies.get(SESSION_COOKIE)
        if not token:
            return None
        token_hash = hashlib.sha256(token.encode("ascii", errors="ignore")).hexdigest()
        now = int(time.time())
        row = get_db().execute(
            """SELECT users.id, users.username, users.display_name
               FROM sessions JOIN users ON users.id = sessions.user_id
               WHERE sessions.token_hash = ? AND sessions.expires_at > ?""",
            (token_hash, now),
        ).fetchone()
        if row is None:
            get_db().execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
            get_db().commit()
            return None
        return row

    def authenticated_admin():
        token = request.cookies.get("upgk_admin_session")
        if not token:
            return False
        token_hash = hashlib.sha256(token.encode("ascii", errors="ignore")).hexdigest()
        now = int(time.time())
        database = get_db()
        session = database.execute(
            "SELECT 1 FROM admin_sessions WHERE token_hash = ? AND expires_at > ?",
            (token_hash, now),
        ).fetchone()
        if session is None:
            database.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (now,))
            database.commit()
            return False
        return True

    def new_session(user_id):
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        now = int(time.time())
        database = get_db()
        database.execute("DELETE FROM sessions WHERE expires_at <= ?", (now,))
        database.execute(
            "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
            (token_hash, user_id, now + SESSION_LIFETIME_SECONDS),
        )
        database.commit()
        return token

    def new_admin_session():
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("ascii")).hexdigest()
        now = int(time.time())
        database = get_db()
        database.execute("DELETE FROM admin_sessions WHERE expires_at <= ?", (now,))
        database.execute(
            "INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)",
            (token_hash, now + SESSION_LIFETIME_SECONDS),
        )
        database.commit()
        return token

    def set_admin_cookie(response, token):
        response.set_cookie(
            "upgk_admin_session",
            token,
            max_age=SESSION_LIFETIME_SECONDS,
            httponly=True,
            secure=app.config["COOKIE_SECURE"],
            samesite="Strict",
            path="/",
        )

    def validate_content_question(question):
        if not isinstance(question, dict):
            return False
        prompt = question.get("question")
        options = question.get("options")
        correct_index = question.get("correctIndex")
        explanation = question.get("explanation", "")
        return (
            isinstance(prompt, str)
            and bool(prompt.strip())
            and len(prompt) <= 2000
            and isinstance(options, list)
            and 2 <= len(options) <= 8
            and all(isinstance(option, str) and option.strip() and len(option) <= 1000 for option in options)
            and isinstance(correct_index, int)
            and not isinstance(correct_index, bool)
            and 0 <= correct_index < len(options)
            and isinstance(explanation, str)
            and len(explanation) <= 4000
        )

    def valid_exam_name(value):
        return isinstance(value, str) and 1 <= len(value.strip()) <= 160

    def paper_storage_dir():
        return Path(app.config["DATABASE"]).resolve().parent / "papers"

    def paper_json(row):
        return {
            "id": row["id"],
            "exam": row["exam_name"],
            "title": row["title"],
            "year": row["paper_year"],
            "source": row["source"],
            "createdAt": row["created_at"],
        }

    def user_json(user):
        return {"username": user["username"], "name": user["display_name"]}

    def result_json(result):
        return {
            "id": result["id"],
            "kind": result["kind"],
            "testId": result["test_id"],
            "title": result["test_title"],
            "exam": result["exam"],
            "score": result["score"],
            "total": result["total"],
            "durationSeconds": result["duration_seconds"],
            "timedOut": bool(result["timed_out"]),
            "createdAt": result["created_at"],
        }

    def validate_test_answers(answers):
        if not isinstance(answers, list) or not 1 <= len(answers) <= 100:
            return False
        for answer in answers:
            if not isinstance(answer, dict):
                return False
            question = answer.get("question")
            options = answer.get("options")
            correct_index = answer.get("correctIndex")
            selected_index = answer.get("selectedIndex")
            explanation = answer.get("explanation", "")
            if (
                not isinstance(question, str)
                or not question.strip()
                or len(question) > 2000
                or not isinstance(options, list)
                or not 2 <= len(options) <= 8
                or any(not isinstance(option, str) or not option.strip() or len(option) > 1000 for option in options)
                or not isinstance(correct_index, int)
                or isinstance(correct_index, bool)
                or not 0 <= correct_index < len(options)
                or (
                    selected_index is not None
                    and (
                        not isinstance(selected_index, int)
                        or isinstance(selected_index, bool)
                        or not 0 <= selected_index < len(options)
                    )
                )
                or not isinstance(explanation, str)
                or len(explanation) > 4000
            ):
                return False
        return True

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/api/auth/captcha")
    def create_auth_captcha():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("auth-captcha", 30, 60 * 60):
            return jsonify({"error": "Too many CAPTCHA requests. Please try again later."}), 429

        challenge_id = secrets.token_urlsafe(24)
        answer = "".join(secrets.choice(CAPTCHA_ALPHABET) for _ in range(5))
        now = int(time.time())
        database = get_db()
        database.execute("DELETE FROM auth_captchas WHERE expires_at <= ?", (now,))
        database.execute(
            "INSERT INTO auth_captchas (challenge_hash, answer_hash, expires_at) VALUES (?, ?, ?)",
            (
                hashlib.sha256(challenge_id.encode("utf-8")).hexdigest(),
                captcha_digest(challenge_id, answer),
                now + 5 * 60,
            ),
        )
        database.commit()

        glyphs = "".join(
            '<text x="{}" y="{}" transform="rotate({} {} {})">{}</text>'.format(
                17 + index * 26,
                secrets.randbelow(10) + 27,
                secrets.randbelow(25) - 12,
                17 + index * 26,
                24,
                character,
            )
            for index, character in enumerate(answer)
        )
        noise = "".join(
            '<path d="M{} {} Q{} {} {} {}" />'.format(
                secrets.randbelow(150),
                secrets.randbelow(48),
                secrets.randbelow(150),
                secrets.randbelow(48),
                secrets.randbelow(150),
                secrets.randbelow(48),
            )
            for _ in range(4)
        )
        svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="48" viewBox="0 0 150 48">'
            '<rect width="150" height="48" rx="8" fill="#f4eddc"/>'
            '<g fill="none" stroke="#b38b36" stroke-opacity=".45" stroke-width="1">{}</g>'
            '<g fill="#17263b" font-family="monospace" font-size="22" font-weight="700">{}</g>'
            "</svg>"
        ).format(noise, glyphs)
        image = "data:image/svg+xml;charset=utf-8," + urllib.parse.quote(svg, safe="")
        return jsonify({"challengeId": challenge_id, "image": image})

    @app.post("/api/auth/register")
    def register():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("register", 5, 60 * 60):
            return jsonify({"error": "Too many attempts. Please try again later."}), 429
        if not check_rate_limit("auth-otp-send", 3, 15 * 60):
            return jsonify({"error": "OTP भेजने के बहुत प्रयास हुए हैं। कृपया बाद में कोशिश करें."}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        if not verify_auth_captcha(body):
            return jsonify({"error": "CAPTCHA सही नहीं है या समाप्त हो गया है। नया CAPTCHA लेकर फिर कोशिश करें.", "code": "captcha_invalid"}), 400

        name = body.get("name")
        username = body.get("username")
        password = body.get("password")
        email = normalize_email(body.get("email"))
        if not all(isinstance(value, str) for value in (name, username, password)) or email is None:
            return jsonify({"error": "पूरा नाम, यूज़रनेम, पासवर्ड और सही ईमेल पता जरूरी है."}), 400

        name = name.strip()
        username = username.strip().lower()
        if (
            not name
            or len(name) > 80
            or any(ord(character) < 32 for character in name)
            or not USERNAME_PATTERN.fullmatch(username)
            or len(password) < 12
            or len(password) > 128
        ):
            return jsonify(
                {"error": "Use a 1-80 character name, a 3-32 character username, and a 12-128 character password."}
            ), 400

        database = get_db()
        if database.execute(
            "SELECT 1 FROM users WHERE username = ? COLLATE NOCASE", (username,)
        ).fetchone():
            return jsonify({"error": "That username is already registered.", "code": "username_exists"}), 409
        if database.execute("SELECT 1 FROM users WHERE email = ? COLLATE NOCASE", (email,)).fetchone():
            return jsonify({"error": "यह ईमेल पहले से किसी अकाउंट से जुड़ा है.", "code": "email_exists"}), 409
        if not email_otp_is_configured():
            return jsonify(
                {"error": "ईमेल OTP भेजने के लिए SMTP सेटिंग्स configure करें.", "code": "email_not_configured"}
            ), 503

        challenge_id, otp = create_otp_challenge(
            "register",
            email,
            username=username,
            name=name,
            password_hash=password_record(password),
        )
        if not send_email_otp(email, otp):
            consume_otp_challenge(
                hashlib.sha256(challenge_id.encode("utf-8")).hexdigest()
            )
            return jsonify(
                {"error": "ईमेल पर OTP नहीं भेजा जा सका। SMTP सेटिंग्स जाँचकर फिर कोशिश करें.", "code": "email_send_failed"}
            ), 502
        local_part, domain = email.split("@", 1)
        email_hint = "{}***@{}".format(local_part[0], domain)
        return jsonify(
            {"challengeId": challenge_id, "emailHint": email_hint}
        ), 202

    @app.post("/api/auth/register/verify-otp")
    def verify_registration_otp():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("auth-otp-verify", 10, 15 * 60):
            return jsonify({"error": "Too many attempts. Please try again later."}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        challenge = find_otp_challenge(body.get("challengeId"))
        if challenge is None or challenge["flow"] != "register" or challenge["expires_at"] <= int(time.time()):
            return jsonify({"error": "OTP अनुरोध समाप्त हो गया है। फिर से शुरू करें.", "code": "otp_expired"}), 410
        otp = body.get("otp")
        if not isinstance(otp, str) or not re.fullmatch(r"\d{6}", otp):
            return jsonify({"error": "6 अंकों का OTP दर्ज करें."}), 400
        if challenge["attempts"] >= 5:
            consume_otp_challenge(challenge["challenge_hash"])
            return jsonify({"error": "बहुत बार गलत OTP दर्ज हुआ। नया अनुरोध शुरू करें.", "code": "otp_attempts_exceeded"}), 429
        if not hmac.compare_digest(
            challenge["otp_hash"] or "",
            otp_digest(body["challengeId"], otp),
        ):
            database = get_db()
            database.execute(
                "UPDATE auth_otp_challenges SET attempts = attempts + 1 WHERE challenge_hash = ?",
                (challenge["challenge_hash"],),
            )
            database.commit()
            return jsonify({"error": "OTP गलत या समाप्त हो गया है.", "code": "otp_invalid"}), 401

        database = get_db()
        try:
            cursor = database.execute(
                """INSERT INTO users
                   (username, display_name, password_hash, email, email_verified, created_at)
                   VALUES (?, ?, ?, ?, 1, ?)""",
                (
                    challenge["username"],
                    challenge["display_name"],
                    challenge["password_hash"],
                    challenge["email"],
                    int(time.time()),
                ),
            )
            database.commit()
        except sqlite3.IntegrityError:
            database.rollback()
            consume_otp_challenge(challenge["challenge_hash"])
            return jsonify({"error": "यूज़रनेम या ईमेल पहले से रजिस्टर है.", "code": "account_exists"}), 409

        consume_otp_challenge(challenge["challenge_hash"])
        token = new_session(cursor.lastrowid)
        response = jsonify(
            {"user": {"username": challenge["username"], "name": challenge["display_name"]}}
        )
        response.status_code = 201
        set_session_cookie(response, token)
        return response

    @app.post("/api/auth/login")
    def login():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("login", 10, 15 * 60):
            return jsonify({"error": "Too many attempts. Please try again later."}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        identifier = body.get("username")
        password = body.get("password")
        if not isinstance(identifier, str) or not isinstance(password, str):
            return jsonify({"error": "Invalid username or password."}), 401
        if len(identifier) > 254 or len(password) > 128:
            return jsonify({"error": "Invalid username or password."}), 401

        user = get_db().execute(
            """SELECT id, username, display_name, password_hash
               FROM users
               WHERE username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE""",
            (identifier.strip(), identifier.strip()),
        ).fetchone()
        record = user["password_hash"] if user else DUMMY_PASSWORD_RECORD
        password_valid = verify_password(password, record)
        if user is None or not password_valid:
            return jsonify({"error": "Invalid username or password."}), 401

        token = new_session(user["id"])
        response = jsonify({"user": user_json(user)})
        set_session_cookie(response, token)
        return response

    @app.post("/api/auth/otp/resend")
    def resend_auth_otp():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("auth-otp-resend", 3, 15 * 60):
            return jsonify({"error": "OTP दोबारा भेजने के बहुत प्रयास हुए हैं। बाद में कोशिश करें.", "code": "rate_limited"}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        if not verify_auth_captcha(body):
            return jsonify({"error": "CAPTCHA सही नहीं है या समाप्त हो गया है। नया CAPTCHA लेकर फिर कोशिश करें.", "code": "captcha_invalid"}), 400
        challenge = find_otp_challenge(body.get("challengeId"))
        if challenge is None or challenge["expires_at"] <= int(time.time()):
            return jsonify({"error": "OTP अनुरोध समाप्त हो गया है। फिर से शुरू करें.", "code": "otp_expired"}), 410
        if challenge["flow"] != "register":
            return jsonify({"error": "OTP अनुरोध समाप्त हो गया है। फिर से शुरू करें.", "code": "otp_expired"}), 410
        if not email_otp_is_configured():
            return jsonify(
                {"error": "ईमेल OTP भेजने के लिए SMTP सेटिंग्स configure करें.", "code": "email_not_configured"}
            ), 503
        otp = "{:06d}".format(secrets.randbelow(1_000_000))
        if not send_email_otp(challenge["email"], otp):
            return jsonify({"error": "ईमेल पर OTP दोबारा नहीं भेजा जा सका.", "code": "email_send_failed"}), 502
        now = int(time.time())
        get_db().execute(
            """UPDATE auth_otp_challenges
               SET otp_hash = ?, attempts = 0, created_at = ?, expires_at = ?
               WHERE challenge_hash = ?""",
            (
                otp_digest(body["challengeId"], otp),
                now,
                now + AUTH_OTP_LIFETIME_SECONDS,
                challenge["challenge_hash"],
            ),
        )
        get_db().commit()
        return jsonify({"sent": True})

    @app.get("/api/auth/me")
    def me():
        user = authenticated_user()
        if user is None:
            return jsonify({"authenticated": False, "user": None})
        return jsonify({"authenticated": True, "user": user_json(user)})

    @app.post("/api/auth/logout")
    def logout():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        token = request.cookies.get(SESSION_COOKIE)
        if token:
            token_hash = hashlib.sha256(token.encode("ascii", errors="ignore")).hexdigest()
            database = get_db()
            database.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))
            database.commit()
        response = jsonify({"ok": True})
        response.delete_cookie(
            SESSION_COOKIE,
            httponly=True,
            secure=app.config["COOKIE_SECURE"],
            samesite="Strict",
            path="/",
        )
        return response

    @app.post("/api/admin/login")
    def admin_login():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not check_rate_limit("admin_login", 5, 15 * 60):
            return jsonify({"error": "Too many attempts. Please try again later."}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        username = body.get("username")
        password = body.get("password")
        if admin_password_hash is None:
            return jsonify(
                {"error": "Admin login is not configured. Set ADMIN_USERNAME and an ADMIN_PASSWORD of at least 16 characters, then restart the backend."}
            ), 503
        if (
            not isinstance(username, str)
            or not isinstance(password, str)
            or not hmac.compare_digest(username.strip().lower(), app.config["ADMIN_USERNAME"])
            or not verify_password(password, admin_password_hash)
        ):
            return jsonify({"error": "Invalid admin username or password."}), 401
        response = jsonify({"ok": True})
        set_admin_cookie(response, new_admin_session())
        return response

    @app.get("/api/admin/me")
    def admin_me():
        if not authenticated_admin():
            return jsonify({"authenticated": False})
        return jsonify({"authenticated": True, "username": app.config["ADMIN_USERNAME"]})

    @app.post("/api/admin/logout")
    def admin_logout():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        token = request.cookies.get("upgk_admin_session")
        if token:
            token_hash = hashlib.sha256(token.encode("ascii", errors="ignore")).hexdigest()
            database = get_db()
            database.execute("DELETE FROM admin_sessions WHERE token_hash = ?", (token_hash,))
            database.commit()
        response = jsonify({"ok": True})
        response.delete_cookie(
            "upgk_admin_session",
            httponly=True,
            secure=app.config["COOKIE_SECURE"],
            samesite="Strict",
            path="/",
        )
        return response

    @app.get("/api/papers")
    def list_previous_papers():
        exam = request.args.get("exam", "").strip()
        if exam and not valid_exam_name(exam):
            return jsonify({"error": "Exam name is invalid."}), 400
        if exam:
            rows = get_db().execute(
                """SELECT id, exam_name, title, paper_year, source, created_at
                   FROM previous_papers WHERE exam_name = ? AND publication_status = 'published'
                   ORDER BY paper_year DESC, id DESC LIMIT 500""",
                (exam,),
            ).fetchall()
        else:
            rows = get_db().execute(
                """SELECT id, exam_name, title, paper_year, source, created_at
                   FROM previous_papers WHERE publication_status = 'published'
                   ORDER BY paper_year DESC, id DESC LIMIT 500"""
            ).fetchall()
        return jsonify({"papers": [paper_json(row) for row in rows]})

    @app.get("/api/papers/<int:paper_id>/file")
    def download_previous_paper(paper_id):
        row = get_db().execute(
            """SELECT storage_key, title, paper_year, publication_status
               FROM previous_papers WHERE id = ?""",
            (paper_id,),
        ).fetchone()
        if (
            row is None
            or (row["publication_status"] != "published" and not authenticated_admin())
            or not re.fullmatch(r"[a-f0-9]{32}\.pdf", row["storage_key"])
        ):
            abort(404)
        storage_dir = paper_storage_dir().resolve()
        paper_path = (storage_dir / row["storage_key"]).resolve()
        if paper_path.parent != storage_dir or not paper_path.is_file():
            abort(404)
        download_name = secure_filename(
            f"{row['title']}-{row['paper_year']}.pdf"
        ) or f"previous-paper-{paper_id}.pdf"
        return send_file(
            paper_path,
            mimetype="application/pdf",
            as_attachment=request.args.get("download") == "1",
            download_name=download_name,
            conditional=True,
        )

    @app.post("/api/admin/papers")
    def upload_previous_paper():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        if not check_rate_limit("upload_paper", 30, 60 * 60):
            return jsonify({"error": "Too many PDF uploads. Please try again later."}), 429

        uploaded_file = request.files.get("file")
        exam = request.form.get("exam", "").strip()
        title = request.form.get("title", "").strip()
        year = request.form.get("year", "").strip()
        source = request.form.get("source", "").strip()
        if (
            uploaded_file is None
            or not valid_exam_name(exam)
            or not title
            or len(title) > 200
            or not re.fullmatch(r"(?:19|20)\d{2}", year)
            or len(source) > 160
            or not uploaded_file.filename
            or Path(uploaded_file.filename).suffix.lower() != ".pdf"
        ):
            return jsonify({"error": "Choose a PDF and provide a title, exam, and valid year."}), 400

        pdf_data = uploaded_file.stream.read(MAX_PAPER_BYTES + 1)
        if len(pdf_data) > MAX_PAPER_BYTES:
            return jsonify({"error": "PDF size must not exceed 20 MB."}), 413
        if not pdf_data.startswith(b"%PDF-") or b"%%EOF" not in pdf_data[-2048:]:
            return jsonify({"error": "The uploaded file is not a valid PDF document."}), 400

        paper_key = uuid.uuid4().hex + ".pdf"
        storage_dir = paper_storage_dir()
        storage_dir.mkdir(parents=True, exist_ok=True)
        paper_path = storage_dir / paper_key
        try:
            with paper_path.open("xb") as saved_file:
                saved_file.write(pdf_data)
            database = get_db()
            cursor = database.execute(
                """INSERT INTO previous_papers
                   (exam_name, title, paper_year, source, storage_key,
                    publication_status, created_at)
                   VALUES (?, ?, ?, ?, ?, 'draft', ?)""",
                (exam, title, year, source, paper_key, int(time.time())),
            )
            database.commit()
        except (OSError, sqlite3.Error):
            if paper_path.exists():
                paper_path.unlink()
            raise
        return jsonify({"id": cursor.lastrowid}), 201

    def import_file_response_error(error, status=400, code="import_invalid"):
        return jsonify({"error": error, "code": code}), status

    def read_import_csv():
        uploaded_file = request.files.get("file")
        if (
            uploaded_file is None
            or not uploaded_file.filename
            or Path(uploaded_file.filename).suffix.lower() != ".csv"
        ):
            return None, import_file_response_error("CSV file चुनें.")
        file_bytes = uploaded_file.stream.read(MAX_IMPORT_CSV_BYTES + 1)
        if len(file_bytes) > MAX_IMPORT_CSV_BYTES:
            return None, import_file_response_error("CSV file 2 MB से छोटी होनी चाहिए.", 413)
        try:
            text = file_bytes.decode("utf-8-sig")
        except UnicodeDecodeError:
            return None, import_file_response_error("CSV को UTF-8 encoding में save करें.")
        try:
            reader = csv.DictReader(io.StringIO(text, newline=""))
            if not reader.fieldnames or any(not field for field in reader.fieldnames):
                return None, import_file_response_error("CSV headers missing हैं.")
            rows = list(reader)
        except (csv.Error, UnicodeError):
            return None, import_file_response_error("CSV पढ़ा नहीं जा सका.")
        if not rows:
            return None, import_file_response_error("CSV में कम-से-कम एक data row होनी चाहिए.")
        if len(rows) > MAX_CSV_ROWS:
            return None, import_file_response_error("एक CSV में अधिकतम 1000 rows import कर सकते हैं.", 413)
        if any(None in row for row in rows):
            return None, import_file_response_error("CSV की हर row में headers के बराबर columns होने चाहिए.")
        return (reader.fieldnames, rows), None

    @app.post("/api/admin/import/theory-csv")
    def import_theory_csv():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        if not check_rate_limit("admin_import", 10, 60 * 60):
            return jsonify({"error": "Too many imports. Please try again later."}), 429
        exam = request.form.get("exam", "").strip()
        if not valid_exam_name(exam):
            return import_file_response_error("परीक्षा का नाम आवश्यक है.")
        parsed, error_response = read_import_csv()
        if error_response:
            return error_response
        headers, rows = parsed
        required_headers = {"topic", "title", "content"}
        if set(headers) != required_headers:
            return import_file_response_error(
                "Theory CSV headers exactly: topic,title,content होने चाहिए."
            )
        normalized_rows = []
        for row_number, row in enumerate(rows, start=2):
            topic, title, content = (
                (row[field] or "").strip() for field in ("topic", "title", "content")
            )
            if (
                not topic or len(topic) > 160
                or not title or len(title) > 200
                or not content or len(content) > 12000
            ):
                return import_file_response_error(
                    "CSV row {} में topic/title/content खाली या सीमा से अधिक है.".format(row_number)
                )
            normalized_rows.append((exam, "theory", topic, title, content, int(time.time())))
        database = get_db()
        database.executemany(
            """INSERT INTO exam_content
               (exam_name, content_type, topic, title, content, publication_status, created_at)
               VALUES (?, ?, ?, ?, ?, 'draft', ?)""",
            normalized_rows,
        )
        database.commit()
        return jsonify({"imported": len(normalized_rows), "status": "draft"}), 201

    @app.post("/api/admin/import/tests-csv")
    def import_tests_csv():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        if not check_rate_limit("admin_import", 10, 60 * 60):
            return jsonify({"error": "Too many imports. Please try again later."}), 429
        exam = request.form.get("exam", "").strip()
        if not valid_exam_name(exam):
            return import_file_response_error("परीक्षा का नाम आवश्यक है.")
        parsed, error_response = read_import_csv()
        if error_response:
            return error_response
        headers, rows = parsed
        required_headers = {
            "test_type", "title", "duration_minutes", "question",
            "option_a", "option_b", "option_c", "option_d",
            "correct_answer", "explanation",
        }
        if set(headers) != required_headers:
            return import_file_response_error(
                "Test CSV headers: test_type,title,duration_minutes,question,"
                "option_a,option_b,option_c,option_d,correct_answer,explanation होने चाहिए."
            )

        tests = {}
        for row_number, row in enumerate(rows, start=2):
            row = {key: (value or "").strip() for key, value in row.items()}
            test_type = row["test_type"].lower()
            title = row["title"]
            question = {
                "question": row["question"],
                "options": [row["option_a"], row["option_b"], row["option_c"], row["option_d"]],
                "explanation": row["explanation"],
            }
            try:
                duration = int(row["duration_minutes"])
            except ValueError:
                duration = 0
            answer = row["correct_answer"].upper()
            answer_indexes = {"A": 0, "B": 1, "C": 2, "D": 3, "1": 0, "2": 1, "3": 2, "4": 3}
            if (
                test_type not in ("mock", "full")
                or not title or len(title) > 200
                or not 1 <= duration <= 24 * 60
                or answer not in answer_indexes
            ):
                return import_file_response_error("CSV row {} में test_type/title/duration/correct_answer invalid है.".format(row_number))
            question["correctIndex"] = answer_indexes[answer]
            if not validate_content_question(question):
                return import_file_response_error("CSV row {} में question/options/explanation invalid हैं.".format(row_number))
            key = (test_type, title, duration)
            tests.setdefault(key, []).append(question)
            if len(tests[key]) > 100:
                return import_file_response_error("एक test में अधिकतम 100 questions हो सकते हैं.", 413)

        for (test_type, title, _duration), questions in tests.items():
            if test_type == "full" and len(questions) < 25:
                return import_file_response_error(
                    "Full test '{}' में कम-से-कम 25 questions होने चाहिए.".format(title)
                )

        database = get_db()
        database.executemany(
            """INSERT INTO admin_tests
               (exam_name, test_type, title, duration_minutes, questions_json,
                publication_status, created_at)
               VALUES (?, ?, ?, ?, ?, 'draft', ?)""",
            [
                (exam, test_type, title, duration, json.dumps(questions, ensure_ascii=False), int(time.time()))
                for (test_type, title, duration), questions in tests.items()
            ],
        )
        database.commit()
        return jsonify({"imported": len(tests), "questions": len(rows), "status": "draft"}), 201

    @app.post("/api/admin/import/pdf-theory")
    def import_pdf_theory():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        if not check_rate_limit("admin_import", 10, 60 * 60):
            return jsonify({"error": "Too many imports. Please try again later."}), 429
        uploaded_file = request.files.get("file")
        exam = request.form.get("exam", "").strip()
        topic = request.form.get("topic", "").strip()
        title = request.form.get("title", "").strip()
        if (
            uploaded_file is None
            or not uploaded_file.filename
            or Path(uploaded_file.filename).suffix.lower() != ".pdf"
            or not valid_exam_name(exam)
            or not topic or len(topic) > 160
            or not title or len(title) > 200
        ):
            return import_file_response_error("PDF, परीक्षा, topic और title भरें.")
        pdf_data = uploaded_file.stream.read(MAX_PAPER_BYTES + 1)
        if len(pdf_data) > MAX_PAPER_BYTES:
            return import_file_response_error("PDF size 20 MB से अधिक नहीं हो सकती.", 413)
        if not pdf_data.startswith(b"%PDF-") or b"%%EOF" not in pdf_data[-2048:]:
            return import_file_response_error("The uploaded file is not a valid PDF document.")
        try:
            reader = PdfReader(io.BytesIO(pdf_data), strict=True)
            if reader.is_encrypted or not 1 <= len(reader.pages) <= MAX_PDF_PAGES:
                return import_file_response_error("PDF encrypted, खाली, या 200 pages से बड़ी है.")
            text_parts = []
            text_length = 0
            for page in reader.pages:
                page_text = page.extract_text() or ""
                if page_text:
                    remaining = MAX_IMPORTED_THEORY_CHARS - text_length
                    text_parts.append(page_text[:remaining])
                    text_length += min(len(page_text), remaining)
                    if text_length >= MAX_IMPORTED_THEORY_CHARS:
                        break
        except (PdfReadError, ValueError, OSError) as error:
            app.logger.info("Admin PDF text extraction failed (%s).", type(error).__name__)
            return import_file_response_error("PDF पढ़ा नहीं जा सका.")
        extracted_text = "\n\n".join(text_parts).strip()
        if not extracted_text:
            return import_file_response_error("इस PDF में selectable text नहीं मिला; scanned PDF के लिए OCR चाहिए.")
        cursor = get_db().execute(
            """INSERT INTO exam_content
               (exam_name, content_type, topic, title, content, publication_status, created_at)
               VALUES (?, 'theory', ?, ?, ?, 'draft', ?)""",
            (exam, topic, title, extracted_text, int(time.time())),
        )
        get_db().commit()
        return jsonify(
            {"id": cursor.lastrowid, "status": "draft", "characters": len(extracted_text)}
        ), 201

    @app.get("/api/admin/content")
    def list_admin_content():
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        exam = request.args.get("exam", "").strip()
        if not valid_exam_name(exam):
            return jsonify({"error": "Exam name is required."}), 400
        database = get_db()
        content_rows = database.execute(
            """SELECT id, exam_name, content_type, topic, title, content,
                      options_json, correct_index, explanation, publication_status, created_at
               FROM exam_content WHERE exam_name = ? ORDER BY id DESC""",
            (exam,),
        ).fetchall()
        test_rows = database.execute(
            """SELECT id, exam_name, test_type, title, duration_minutes,
                      questions_json, publication_status, created_at
               FROM admin_tests WHERE exam_name = ? ORDER BY id DESC""",
            (exam,),
        ).fetchall()
        paper_rows = database.execute(
            """SELECT id, exam_name, title, paper_year, source, publication_status, created_at
               FROM previous_papers WHERE exam_name = ? ORDER BY id DESC""",
            (exam,),
        ).fetchall()
        return jsonify({
            "items": [{
                "id": row["id"], "exam": row["exam_name"], "type": row["content_type"],
                "topic": row["topic"], "title": row["title"], "content": row["content"],
                "options": json.loads(row["options_json"]) if row["options_json"] else None,
                "correctIndex": row["correct_index"], "explanation": row["explanation"],
                "status": row["publication_status"], "createdAt": row["created_at"],
            } for row in content_rows],
            "tests": [{
                "id": row["id"], "exam": row["exam_name"], "testType": row["test_type"],
                "title": row["title"], "durationMinutes": row["duration_minutes"],
                "questions": json.loads(row["questions_json"]),
                "status": row["publication_status"], "createdAt": row["created_at"],
            } for row in test_rows],
            "papers": [{
                "id": row["id"], "exam": row["exam_name"], "title": row["title"],
                "year": row["paper_year"], "source": row["source"],
                "status": row["publication_status"], "createdAt": row["created_at"],
            } for row in paper_rows],
        })

    @app.post("/api/admin/publish")
    def publish_admin_content():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        body = json_body()
        exam = body.get("exam") if body else None
        if not valid_exam_name(exam):
            return jsonify({"error": "Exam name is required."}), 400
        database = get_db()
        published = {}
        for table in ("exam_content", "admin_tests", "previous_papers"):
            cursor = database.execute(
                f"""UPDATE {table} SET publication_status = 'published'
                    WHERE exam_name = ? AND publication_status = 'draft'""",
                (exam.strip(),),
            )
            published[table] = cursor.rowcount
        database.commit()
        return jsonify({"published": published})

    @app.delete("/api/admin/papers/<int:paper_id>")
    def delete_previous_paper(paper_id):
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        database = get_db()
        row = database.execute(
            "SELECT storage_key FROM previous_papers WHERE id = ?",
            (paper_id,),
        ).fetchone()
        if row is None:
            return jsonify({"error": "Previous paper not found."}), 404
        if re.fullmatch(r"[a-f0-9]{32}\.pdf", row["storage_key"]):
            paper_path = paper_storage_dir().resolve() / row["storage_key"]
            if paper_path.parent == paper_storage_dir().resolve() and paper_path.exists():
                try:
                    paper_path.unlink()
                except OSError:
                    return jsonify({"error": "PDF is currently in use or cannot be deleted. Close it and try again."}), 409
        database.execute("DELETE FROM previous_papers WHERE id = ?", (paper_id,))
        database.commit()
        return jsonify({"ok": True})

    @app.get("/api/search")
    def search_public_content():
        query = request.args.get("q", "").strip()
        if not query or len(query) > 100:
            return jsonify({"error": "Search query must contain 1 to 100 characters."}), 400

        terms = [
            term for term in unicodedata.normalize("NFKC", query).casefold().split()
            if term not in SEARCH_STOP_WORDS
        ]
        if not terms:
            return jsonify({"error": "Search query must include a searchable word."}), 400
        term_groups = [
            tuple(dict.fromkeys((term,) + SEARCH_SYNONYMS.get(term, ())))
            for term in terms
        ]
        searchable_columns = (
            "lower(exam_name || ' ' || topic || ' ' || title || ' ' || content || ' ' || "
            "coalesce(options_json, '') || ' ' || explanation)"
        )
        content_filter = " AND ".join(
            "(" + " OR ".join(
                f"instr({searchable_columns}, lower(?)) > 0" for _ in group
            ) + ")"
            for group in term_groups
        )
        database = get_db()
        content_rows = database.execute(
            f"""SELECT id, exam_name, content_type, topic, title, content,
                       options_json, explanation
                FROM exam_content WHERE publication_status = 'published' AND {content_filter}
                ORDER BY id DESC LIMIT 40""",
            tuple(term for group in term_groups for term in group),
        ).fetchall()
        test_columns = "lower(exam_name || ' ' || title || ' ' || questions_json)"
        test_filter = " AND ".join(
            "(" + " OR ".join(
                f"instr({test_columns}, lower(?)) > 0" for _ in group
            ) + ")"
            for group in term_groups
        )
        test_rows = database.execute(
            f"""SELECT id, exam_name, test_type, title, questions_json
                FROM admin_tests WHERE publication_status = 'published' AND {test_filter}
                ORDER BY id DESC LIMIT 40""",
            tuple(term for group in term_groups for term in group),
        ).fetchall()
        paper_columns = "lower(exam_name || ' ' || title || ' ' || paper_year || ' ' || source)"
        paper_filter = " AND ".join(
            "(" + " OR ".join(
                f"instr({paper_columns}, lower(?)) > 0" for _ in group
            ) + ")"
            for group in term_groups
        )
        paper_rows = database.execute(
            f"""SELECT id, exam_name, title, paper_year, source
                FROM previous_papers WHERE publication_status = 'published' AND {paper_filter}
                ORDER BY paper_year DESC, id DESC LIMIT 40""",
            tuple(term for group in term_groups for term in group),
        ).fetchall()

        return jsonify({
            "content": [{
                "id": row["id"],
                "exam": row["exam_name"],
                "type": row["content_type"],
                "topic": row["topic"],
                "title": row["title"],
                "content": row["content"],
                "options": json.loads(row["options_json"]) if row["options_json"] else [],
                "explanation": row["explanation"],
            } for row in content_rows],
            "tests": [{
                "id": row["id"],
                "exam": row["exam_name"],
                "type": row["test_type"],
                "title": row["title"],
                "questionCount": len(questions := json.loads(row["questions_json"])),
                "matchText": next((
                    question.get("question", "")
                    for question in questions
                    if query.casefold() in json.dumps(question, ensure_ascii=False).casefold()
                ), ""),
            } for row in test_rows],
            "papers": [{
                "id": row["id"],
                "exam": row["exam_name"],
                "title": row["title"],
                "year": row["paper_year"],
                "source": row["source"],
            } for row in paper_rows],
        })

    @app.get("/api/exam-content")
    def list_exam_content():
        exam = request.args.get("exam", "").strip()
        if not valid_exam_name(exam):
            return jsonify({"error": "Exam name is required."}), 400
        rows = get_db().execute(
            """SELECT id, exam_name, content_type, topic, title, content,
                      options_json, correct_index, explanation, created_at
               FROM exam_content
               WHERE exam_name = ? AND publication_status = 'published'
               ORDER BY id DESC""",
            (exam,),
        ).fetchall()
        items = []
        for row in rows:
            items.append({
                "id": row["id"],
                "exam": row["exam_name"],
                "type": row["content_type"],
                "topic": row["topic"],
                "title": row["title"],
                "content": row["content"],
                "options": json.loads(row["options_json"]) if row["options_json"] else None,
                "correctIndex": row["correct_index"],
                "explanation": row["explanation"],
                "createdAt": row["created_at"],
            })
        return jsonify({"items": items})

    @app.post("/api/admin/exam-content")
    def create_exam_content():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        exam = body.get("exam")
        content_type = body.get("type")
        topic = body.get("topic")
        title = body.get("title")
        content = body.get("content")
        if (
            not valid_exam_name(exam)
            or content_type not in ("syllabus", "theory", "pyq")
            or not isinstance(topic, str)
            or not topic.strip()
            or len(topic) > 160
            or not isinstance(title, str)
            or not title.strip()
            or len(title) > 200
            or not isinstance(content, str)
            or not content.strip()
            or len(content) > 12000
        ):
            return jsonify({"error": "Exam content fields are invalid."}), 400

        options_json = None
        correct_index = None
        explanation = body.get("explanation", "")
        if content_type == "pyq":
            options = body.get("options")
            correct_index = body.get("correctIndex")
            if (
                not isinstance(options, list)
                or not 2 <= len(options) <= 8
                or any(not isinstance(option, str) or not option.strip() or len(option) > 1000 for option in options)
                or not isinstance(correct_index, int)
                or isinstance(correct_index, bool)
                or not 0 <= correct_index < len(options)
                or not isinstance(explanation, str)
                or len(explanation) > 4000
            ):
                return jsonify({"error": "PYQ options, correct answer, or explanation are invalid."}), 400
            options_json = json.dumps(options, ensure_ascii=False)
        elif "options" in body or "correctIndex" in body:
            return jsonify({"error": "Answer options are only accepted for PYQ content."}), 400

        database = get_db()
        cursor = database.execute(
            """INSERT INTO exam_content
               (exam_name, content_type, topic, title, content, options_json,
                correct_index, explanation, publication_status, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?)""",
            (exam.strip(), content_type, topic.strip(), title.strip(), content.strip(),
             options_json, correct_index, explanation.strip(), int(time.time())),
        )
        database.commit()
        return jsonify({"id": cursor.lastrowid}), 201

    @app.delete("/api/admin/exam-content/<int:content_id>")
    def delete_exam_content(content_id):
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        cursor = get_db().execute("DELETE FROM exam_content WHERE id = ?", (content_id,))
        get_db().commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Exam content not found."}), 404
        return jsonify({"ok": True})

    @app.get("/api/exam-tests")
    def list_exam_tests():
        exam = request.args.get("exam", "").strip()
        if not valid_exam_name(exam):
            return jsonify({"error": "Exam name is required."}), 400
        rows = get_db().execute(
            """SELECT id, exam_name, test_type, title, duration_minutes,
                      questions_json, created_at
               FROM admin_tests
               WHERE exam_name = ? AND publication_status = 'published'
               ORDER BY id DESC""",
            (exam,),
        ).fetchall()
        return jsonify({"tests": [{
            "id": "admin-" + str(row["id"]),
            "exam": row["exam_name"],
            "testType": row["test_type"],
            "title": row["title"],
            "durationMinutes": row["duration_minutes"],
            "questions": json.loads(row["questions_json"]),
            "createdAt": row["created_at"],
        } for row in rows]})

    @app.post("/api/admin/tests")
    def create_exam_test():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400
        exam = body.get("exam")
        test_type = body.get("testType")
        title = body.get("title")
        duration = body.get("durationMinutes")
        questions = body.get("questions")
        required_question_count = 25 if test_type == "full" else 1
        if (
            not valid_exam_name(exam)
            or test_type not in ("mock", "full")
            or not isinstance(title, str)
            or not title.strip()
            or len(title) > 200
            or not isinstance(duration, int)
            or isinstance(duration, bool)
            or not 1 <= duration <= 24 * 60
            or not isinstance(questions, list)
            or not required_question_count <= len(questions) <= 100
            or any(not validate_content_question(question) for question in questions)
        ):
            return jsonify({"error": "Test fields are invalid. Full tests require at least 25 valid questions."}), 400
        cursor = get_db().execute(
            """INSERT INTO admin_tests
               (exam_name, test_type, title, duration_minutes, questions_json,
                publication_status, created_at)
               VALUES (?, ?, ?, ?, ?, 'draft', ?)""",
            (exam.strip(), test_type, title.strip(), duration,
             json.dumps(questions, ensure_ascii=False), int(time.time())),
        )
        get_db().commit()
        return jsonify({"id": cursor.lastrowid}), 201

    @app.delete("/api/admin/tests/<int:test_id>")
    def delete_exam_test(test_id):
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        if not authenticated_admin():
            return jsonify({"error": "Admin login required."}), 401
        cursor = get_db().execute("DELETE FROM admin_tests WHERE id = ?", (test_id,))
        get_db().commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Exam test not found."}), 404
        return jsonify({"ok": True})

    @app.post("/api/results")
    def save_test_result():
        if not same_origin_request():
            return jsonify({"error": "Request origin is not allowed."}), 403
        user = authenticated_user()
        if user is None:
            return jsonify({"error": "Please log in."}), 401
        if not check_rate_limit("save_result", 30, 60 * 60):
            return jsonify({"error": "Too many test results. Please try again later."}), 429
        body = json_body()
        if body is None:
            return jsonify({"error": "A JSON request is required."}), 400

        kind = body.get("kind")
        test_id = body.get("testId")
        title = body.get("title")
        exam = body.get("exam")
        duration = body.get("durationSeconds")
        timed_out = body.get("timedOut")
        answers = body.get("answers")
        if (
            kind not in ("mock", "live")
            or not isinstance(test_id, str)
            or not test_id.strip()
            or len(test_id) > 100
            or not isinstance(title, str)
            or not title.strip()
            or len(title) > 160
            or not isinstance(exam, str)
            or not exam.strip()
            or len(exam) > 120
            or not isinstance(duration, int)
            or isinstance(duration, bool)
            or not 0 <= duration <= 24 * 60 * 60
            or not isinstance(timed_out, bool)
            or not validate_test_answers(answers)
        ):
            return jsonify({"error": "Test result data is invalid."}), 400

        score = sum(
            answer["selectedIndex"] == answer["correctIndex"]
            for answer in answers
            if answer["selectedIndex"] is not None
        )
        database = get_db()
        cursor = database.execute(
            """INSERT INTO test_results
               (user_id, kind, test_id, test_title, exam, score, total,
                duration_seconds, timed_out, answers_json, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                user["id"],
                kind,
                test_id.strip(),
                title.strip(),
                exam.strip(),
                score,
                len(answers),
                duration,
                int(timed_out),
                json.dumps(answers, ensure_ascii=False),
                int(time.time()),
            ),
        )
        database.commit()
        saved = database.execute(
            "SELECT * FROM test_results WHERE id = ? AND user_id = ?",
            (cursor.lastrowid, user["id"]),
        ).fetchone()
        return jsonify({"result": result_json(saved)}), 201

    @app.get("/api/results")
    def list_test_results():
        user = authenticated_user()
        if user is None:
            return jsonify({"error": "Please log in."}), 401
        kind = request.args.get("kind")
        if kind not in (None, "mock", "live"):
            return jsonify({"error": "Result type is invalid."}), 400
        if kind:
            rows = get_db().execute(
                """SELECT * FROM test_results
                   WHERE user_id = ? AND kind = ?
                   ORDER BY created_at DESC, id DESC LIMIT 50""",
                (user["id"], kind),
            ).fetchall()
        else:
            rows = get_db().execute(
                """SELECT * FROM test_results
                   WHERE user_id = ?
                   ORDER BY created_at DESC, id DESC LIMIT 50""",
                (user["id"],),
            ).fetchall()
        return jsonify({"results": [result_json(row) for row in rows]})

    @app.get("/api/results/<int:result_id>")
    def get_test_result(result_id):
        user = authenticated_user()
        if user is None:
            return jsonify({"error": "Please log in."}), 401
        result = get_db().execute(
            "SELECT * FROM test_results WHERE id = ? AND user_id = ?",
            (result_id, user["id"]),
        ).fetchone()
        if result is None:
            return jsonify({"error": "Test result not found."}), 404
        data = result_json(result)
        data["answers"] = json.loads(result["answers_json"])
        return jsonify({"result": data})

    @app.get("/")
    def homepage():
        return send_from_directory(ROOT, "index.html")

    @app.get("/<path:asset_path>")
    def static_asset(asset_path):
        path = PurePosixPath(asset_path)
        allowed_extensions = {".html", ".js", ".css", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".ico"}
        valid_location = len(path.parts) == 1 or (
            len(path.parts) == 2 and path.parts[0] == "assets"
        )
        if (
            not valid_location
            or any(part.startswith(".") for part in path.parts)
            or Path(path.name).suffix.lower() not in allowed_extensions
        ):
            abort(404)
        return send_from_directory(ROOT, path.as_posix())

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", "5000")), debug=False)
