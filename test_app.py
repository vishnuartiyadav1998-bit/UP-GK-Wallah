import hashlib
import io
import re
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch
from urllib.parse import unquote

from app import RATE_LIMITS, create_app


class StudentAuthTests(unittest.TestCase):
    def setUp(self):
        RATE_LIMITS.clear()
        self.temp_dir = tempfile.TemporaryDirectory()
        self.database_path = Path(self.temp_dir.name) / "users.sqlite3"
        self.test_otp = {"code": "123456", "email": None}

        def send_email(email, otp):
            self.test_otp["email"] = email
            self.test_otp["code"] = otp
            return True

        self.app = create_app(
            {
                "TESTING": True,
                "DATABASE": str(self.database_path),
                "COOKIE_SECURE": True,
                "ADMIN_USERNAME": "admin",
                "ADMIN_PASSWORD": "Vishnu@1998",
                "EMAIL_SEND": send_email,
            }
        )
        self.client = self.app.test_client()
        self.origin = "http://localhost"

    def tearDown(self):
        self.temp_dir.cleanup()

    def post(self, endpoint, data, client=None):
        client = client or self.client
        return client.post(
            endpoint,
            json=data,
            base_url=self.origin,
            headers={"Origin": self.origin},
        )

    def post_file(self, endpoint, fields, filename, content, client=None):
        client = client or self.client
        return client.post(
            endpoint,
            data={**fields, "file": (io.BytesIO(content), filename)},
            base_url=self.origin,
            headers={"Origin": self.origin},
            content_type="multipart/form-data",
        )

    def captcha(self, client=None):
        response = self.post("/api/auth/captcha", {}, client=client)
        self.assertEqual(response.status_code, 200)
        svg = unquote(response.json["image"].split(",", 1)[1])
        answer = "".join(re.findall(r"<text\b[^>]*>(.)</text>", svg))
        self.assertEqual(len(answer), 5)
        return {"captchaId": response.json["challengeId"], "captchaCode": answer}

    def create_account(self, username="student.one", email=None, client=None):
        email = email or username.replace(".", "+") + "@example.com"
        start = self.post(
            "/api/auth/register",
            {
                "name": "Test Student",
                "username": username,
                "password": "a-safe-password-123",
                "email": email,
                **self.captcha(client),
            },
            client=client,
        )
        if start.status_code != 202:
            return start
        return self.post(
            "/api/auth/register/verify-otp",
            {"challengeId": start.json["challengeId"], "otp": self.test_otp["code"]},
            client=client,
        )

    def login_account(self, username="student.one", password="a-safe-password-123", client=None):
        return self.post(
            "/api/auth/login",
            {"username": username, "password": password},
            client=client,
        )

    def login_admin(self):
        return self.post(
            "/api/admin/login",
            {"username": "admin", "password": "Vishnu@1998"},
        )

    def upload_pdf(self, filename="previous-paper.pdf", content=None):
        pdf_data = content or b"%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF"
        return self.client.post(
            "/api/admin/papers",
            data={
                "exam": "UPSSSC PET",
                "title": "UPSSSC PET Paper",
                "year": "2024",
                "source": "Government Jobs Channel",
                "file": (io.BytesIO(pdf_data), filename, "application/pdf"),
            },
            base_url=self.origin,
            headers={"Origin": self.origin},
            content_type="multipart/form-data",
        )

    def valid_result(self, title="Practice set", selected_index=1):
        return {
            "kind": "mock",
            "testId": "practice-1",
            "title": title,
            "exam": "UP GK",
            "durationSeconds": 45,
            "timedOut": False,
            "answers": [
                {
                    "question": "???? ?? ??????? ???? ???",
                    "options": ["?????", "?? ??????", "????", "??????"],
                    "correctIndex": 1,
                    "selectedIndex": selected_index,
                    "explanation": "?? ?????? ???? ?? ??????? ???",
                },
                {
                    "question": "????? ?????? ?? ????????",
                    "options": ["????", "????", "??????", "????"],
                    "correctIndex": 0,
                    "selectedIndex": None,
                    "explanation": "???? ????? ?????? ?? ??????? ???",
                },
            ],
        }

    def test_registration_requires_captcha_and_verified_email_otp(self):
        captcha = self.captcha()
        invalid = self.post(
            "/api/auth/register",
            {
                "name": "Test Student",
                "username": "student.one",
                "password": "a-safe-password-123",
                "email": "student@example.com",
                "captchaId": captcha["captchaId"],
                "captchaCode": "WRONG",
            },
        )
        self.assertEqual(invalid.status_code, 400)
        self.assertEqual(invalid.json["code"], "captcha_invalid")

        start = self.post(
            "/api/auth/register",
            {
                "name": "Test Student",
                "username": "student.one",
                "password": "a-safe-password-123",
                "email": "student@example.com",
                **self.captcha(),
            },
        )
        self.assertEqual(start.status_code, 202)
        self.assertEqual(self.test_otp["email"], "student@example.com")
        session_state = self.client.get("/api/auth/me")
        self.assertEqual(session_state.status_code, 200)
        self.assertFalse(session_state.json["authenticated"])

        wrong_otp = self.post(
            "/api/auth/register/verify-otp",
            {"challengeId": start.json["challengeId"], "otp": "000000"},
        )
        self.assertEqual(wrong_otp.status_code, 401)
        self.assertFalse(self.client.get("/api/auth/me").json["authenticated"])
        database = sqlite3.connect(self.database_path)
        challenge_hash = hashlib.sha256(start.json["challengeId"].encode("utf-8")).hexdigest()
        stored_otp_hash = database.execute(
            "SELECT otp_hash FROM auth_otp_challenges WHERE challenge_hash = ?",
            (challenge_hash,),
        ).fetchone()[0]
        database.close()
        self.assertEqual(len(stored_otp_hash), 64)
        self.assertNotEqual(stored_otp_hash, self.test_otp["code"])

        verified = self.post(
            "/api/auth/register/verify-otp",
            {"challengeId": start.json["challengeId"], "otp": self.test_otp["code"]},
        )
        self.assertEqual(verified.status_code, 201)
        self.assertEqual(self.client.get("/api/auth/me").status_code, 200)
        database = sqlite3.connect(self.database_path)
        email_state = database.execute(
            "SELECT email, email_verified FROM users WHERE username = ?", ("student.one",)
        ).fetchone()
        remaining_challenge = database.execute(
            "SELECT 1 FROM auth_otp_challenges WHERE challenge_hash = ?",
            (challenge_hash,),
        ).fetchone()
        database.close()
        self.assertEqual(email_state, ("student@example.com", 1))
        self.assertIsNone(remaining_challenge)

    def test_resend_replaces_signup_otp(self):
        start = self.post(
            "/api/auth/register",
            {
                "name": "Test Student",
                "username": "student.one",
                "password": "a-safe-password-123",
                "email": "student@example.com",
                **self.captcha(),
            },
        )
        self.assertEqual(start.status_code, 202)
        old_otp = self.test_otp["code"]
        resend = self.post(
            "/api/auth/otp/resend",
            {"challengeId": start.json["challengeId"], **self.captcha()},
        )
        self.assertEqual(resend.status_code, 200)
        new_otp = self.test_otp["code"]
        self.assertNotEqual(old_otp, new_otp)
        invalid = self.post(
            "/api/auth/register/verify-otp",
            {"challengeId": start.json["challengeId"], "otp": old_otp},
        )
        verified = self.post(
            "/api/auth/register/verify-otp",
            {"challengeId": start.json["challengeId"], "otp": new_otp},
        )
        self.assertEqual(invalid.status_code, 401)
        self.assertEqual(verified.status_code, 201)

    def test_username_or_email_and_password_login_then_logout(self):
        self.assertEqual(self.create_account().status_code, 201)
        self.post("/api/auth/logout", {})
        login = self.login_account(username="STUDENT.ONE")
        self.assertEqual(login.status_code, 200)
        student_session = self.client.get("/api/auth/me")
        self.assertEqual(student_session.status_code, 200)
        self.assertTrue(student_session.json["authenticated"])

        self.post("/api/auth/logout", {})
        email_login = self.login_account(username="student+one@example.com")
        self.assertEqual(email_login.status_code, 200)
        self.assertTrue(self.client.get("/api/auth/me").json["authenticated"])
        logout = self.post("/api/auth/logout", {})
        self.assertEqual(logout.status_code, 200)
        self.assertFalse(self.client.get("/api/auth/me").json["authenticated"])

    def test_browser_sessions_remain_isolated(self):
        self.assertEqual(self.create_account("student.one").status_code, 201)
        another_browser = self.app.test_client()
        other_response = self.create_account(
            "student.two",
            email="student.two@example.com",
            client=another_browser,
        )
        self.assertEqual(other_response.status_code, 201)
        self.assertEqual(
            self.client.get("/api/auth/me").json["user"]["username"],
            "student.one",
        )
        self.assertEqual(
            another_browser.get("/api/auth/me").json["user"]["username"],
            "student.two",
        )

    def test_wrong_password_is_rejected(self):
        self.assertEqual(self.create_account().status_code, 201)
        response = self.login_account(password="incorrect-password")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json, {"error": "Invalid username or password."})

    def test_email_verification_fails_closed_without_smtp(self):
        app = create_app(
            {
                "TESTING": True,
                "DATABASE": str(Path(self.temp_dir.name) / "no-email.sqlite3"),
                "SMTP_HOST": "",
                "SMTP_USERNAME": "",
                "SMTP_PASSWORD": "",
                "SMTP_FROM_EMAIL": "",
                "EMAIL_SEND": None,
            }
        )
        client = app.test_client()
        captcha = self.captcha(client)
        response = self.post(
            "/api/auth/register",
            {
                "name": "Test Student",
                "username": "student.one",
                "password": "a-safe-password-123",
                "email": "student@example.com",
                **captcha,
            },
            client=client,
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json["code"], "email_not_configured")
        self.assertFalse(client.get("/api/auth/me").json["authenticated"])

    def test_existing_database_gets_email_verification_columns(self):
        legacy_database = Path(self.temp_dir.name) / "legacy.sqlite3"
        connection = sqlite3.connect(legacy_database)
        connection.execute(
            """CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                display_name TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                created_at INTEGER NOT NULL
            )"""
        )
        connection.execute(
            "INSERT INTO users VALUES (1, 'legacy.student', 'Legacy Student', 'hash', 1)"
        )
        connection.commit()
        connection.close()

        create_app({"TESTING": True, "DATABASE": str(legacy_database)})
        connection = sqlite3.connect(legacy_database)
        columns = {row[1] for row in connection.execute("PRAGMA table_info(users)")}
        email_state = connection.execute(
            "SELECT email, email_verified FROM users WHERE username = ?",
            ("legacy.student",),
        ).fetchone()
        connection.close()
        self.assertIn("email", columns)
        self.assertIn("email_verified", columns)
        self.assertEqual(email_state, (None, 0))

    def test_registration_rejects_weak_password_and_duplicate_username_or_email(self):
        weak = self.post(
            "/api/auth/register",
            {
                "name": "Student",
                "username": "student",
                "password": "short",
                "email": "student@example.com",
                **self.captcha(),
            },
        )
        self.assertEqual(weak.status_code, 400)
        self.assertEqual(self.create_account().status_code, 201)
        self.assertEqual(self.create_account().status_code, 409)
        RATE_LIMITS.clear()
        self.assertEqual(
            self.create_account("student.two", email="student+one@example.com").status_code,
            409,
        )

    def test_mutating_request_requires_same_origin(self):
        response = self.client.post(
            "/api/auth/register",
            json={
                "name": "Test Student",
                "username": "student.one",
                "password": "a-safe-password-123",
            },
            base_url=self.origin,
        )
        self.assertEqual(response.status_code, 403)

    def test_database_file_is_not_publicly_served(self):
        response = self.client.get("/instance/users.sqlite3")
        self.assertEqual(response.status_code, 404)

    def test_test_result_is_saved_with_score_calculated_from_answers(self):
        self.create_account()
        response = self.post("/api/results", self.valid_result())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json["result"]["score"], 1)
        self.assertEqual(response.json["result"]["total"], 2)

        result_id = response.json["result"]["id"]
        detailed = self.client.get(f"/api/results/{result_id}")
        self.assertEqual(detailed.status_code, 200)
        self.assertEqual(detailed.json["result"]["answers"][1]["selectedIndex"], None)

        history = self.client.get("/api/results?kind=mock")
        self.assertEqual(len(history.json["results"]), 1)
        self.assertEqual(history.json["results"][0]["title"], "Practice set")

    def test_test_results_are_private_to_the_account(self):
        self.create_account()
        saved = self.post("/api/results", self.valid_result())
        result_id = saved.json["result"]["id"]

        another_browser = self.app.test_client()
        self.create_account("student.two", email="student.two@example.com", client=another_browser)
        self.assertEqual(another_browser.get("/api/results").json["results"], [])
        self.assertEqual(another_browser.get(f"/api/results/{result_id}").status_code, 404)

    def test_test_result_rejects_invalid_answer_data(self):
        self.create_account()
        result = self.valid_result()
        result["answers"][0]["correctIndex"] = 99
        response = self.post("/api/results", result)
        self.assertEqual(response.status_code, 400)

    def test_exam_content_is_admin_only_to_write_and_public_to_read(self):
        data = {
            "exam": "UPSSSC PET",
            "type": "theory",
            "topic": "भारतीय संविधान",
            "title": "संविधान की प्रस्तावना",
            "content": "यह theory नोट्स हैं।",
        }
        blocked = self.post("/api/admin/exam-content", data)
        self.assertEqual(blocked.status_code, 401)

        self.assertEqual(self.login_admin().status_code, 200)
        created = self.post("/api/admin/exam-content", data)
        self.assertEqual(created.status_code, 201)

        public_content = self.client.get("/api/exam-content?exam=UPSSSC%20PET")
        self.assertEqual(public_content.status_code, 200)
        self.assertEqual(public_content.json["items"], [])
        admin_content = self.client.get("/api/admin/content?exam=UPSSSC%20PET")
        self.assertEqual(admin_content.json["items"][0]["status"], "draft")
        self.assertEqual(self.post("/api/admin/publish", {"exam": "UPSSSC PET"}).status_code, 200)
        public_content = self.client.get("/api/exam-content?exam=UPSSSC%20PET")
        self.assertEqual(public_content.json["items"][0]["topic"], "भारतीय संविधान")

        deleted = self.client.delete(
            f"/api/admin/exam-content/{created.json['id']}",
            base_url=self.origin,
            headers={"Origin": self.origin},
        )
        self.assertEqual(deleted.status_code, 200)

    def test_current_affairs_one_liners_are_public_after_admin_adds_them(self):
        self.assertEqual(self.login_admin().status_code, 200)
        created = self.post(
            "/api/admin/exam-content",
            {
                "exam": "Current Affairs",
                "type": "pyq",
                "topic": "राष्ट्रीय समाचार",
                "title": "एक-पंक्ति प्रश्न",
                "content": "भारत के राष्ट्रपति कौन हैं?",
                "options": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
                "correctIndex": 1,
                "explanation": "उदाहरण व्याख्या",
            },
        )
        self.assertEqual(created.status_code, 201)

        self.assertEqual(self.client.get("/api/exam-content?exam=Current%20Affairs").json["items"], [])
        self.post("/api/admin/publish", {"exam": "Current Affairs"})
        response = self.client.get("/api/exam-content?exam=Current%20Affairs")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["items"][0]["type"], "pyq")
        self.assertEqual(response.json["items"][0]["content"], "भारत के राष्ट्रपति कौन हैं?")

    def test_global_search_finds_admin_content_in_hindi_and_english(self):
        self.assertEqual(self.login_admin().status_code, 200)
        created = self.post(
            "/api/admin/exam-content",
            {
                "exam": "UPSSSC PET",
                "type": "theory",
                "topic": "भारतीय संविधान",
                "title": "प्रस्तावना",
                "content": "The Constitution begins with the Preamble.",
            },
        )
        self.assertEqual(created.status_code, 201)
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})

        hindi = self.client.get("/api/search?q=" + "भारतीय%20संविधान")
        english = self.client.get("/api/search?q=Preamble")
        bilingual = self.client.get("/api/search?q=Constitution%20of%20India")
        invalid = self.client.get("/api/search?q=")
        stopwords_only = self.client.get("/api/search?q=of%20the")
        self.assertEqual(hindi.status_code, 200)
        self.assertEqual(english.status_code, 200)
        self.assertEqual(bilingual.status_code, 200)
        self.assertEqual(invalid.status_code, 400)
        self.assertEqual(stopwords_only.status_code, 400)
        self.assertEqual(hindi.json["content"][0]["title"], "प्रस्तावना")
        self.assertEqual(english.json["content"][0]["content"], "The Constitution begins with the Preamble.")
        self.assertEqual(bilingual.json["content"][0]["title"], "प्रस्तावना")

        test_created = self.post(
            "/api/admin/tests",
            {
                "exam": "UPSSSC PET",
                "testType": "mock",
                "title": "भारत अभ्यास",
                "durationMinutes": 5,
                "questions": [{
                    "question": "भारत का संविधान कब लागू हुआ?",
                    "options": ["1947", "1950", "1952", "1956"],
                    "correctIndex": 1,
                    "explanation": "संविधान 1950 में लागू हुआ।",
                }],
            },
        )
        self.assertEqual(test_created.status_code, 201)
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        test_search = self.client.get("/api/search?q=" + "भारत%20का%20संविधान")
        self.assertTrue(any(
            item["title"] == "भारत अभ्यास"
            and item["matchText"] == "भारत का संविधान कब लागू हुआ?"
            for item in test_search.json["tests"]
        ))
        uploaded = self.upload_pdf()
        self.assertEqual(uploaded.status_code, 201)
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        paper_search = self.client.get("/api/search?q=Government%20Jobs%20Channel")
        self.assertTrue(any(
            item["title"] == "UPSSSC PET Paper"
            for item in paper_search.json["papers"]
        ))

    def test_admin_can_create_pyq_and_full_test_requires_25_questions(self):
        self.assertEqual(self.login_admin().status_code, 200)
        pyq = self.post(
            "/api/admin/exam-content",
            {
                "exam": "UPSSSC PET",
                "type": "pyq",
                "topic": "इतिहास",
                "title": "PYQ 2024",
                "content": "मौर्य साम्राज्य की स्थापना किसने की?",
                "options": ["अशोक", "चंद्रगुप्त मौर्य", "बिंदुसार", "हर्ष"],
                "correctIndex": 1,
                "explanation": "चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।",
            },
        )
        self.assertEqual(pyq.status_code, 201)

        full_test = {
            "exam": "UPSSSC PET",
            "testType": "full",
            "title": "PET full test",
            "durationMinutes": 60,
            "questions": [self.valid_result()["answers"][0]],
        }
        rejected = self.post("/api/admin/tests", full_test)
        self.assertEqual(rejected.status_code, 400)
        full_test["questions"] = [
            {
                "question": f"प्रश्न {index}",
                "options": ["A", "B", "C", "D"],
                "correctIndex": 0,
                "explanation": "",
            }
            for index in range(25)
        ]
        created = self.post("/api/admin/tests", full_test)
        self.assertEqual(created.status_code, 201)
        self.assertEqual(self.client.get("/api/exam-tests?exam=UPSSSC%20PET").json["tests"], [])
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        listed = self.client.get("/api/exam-tests?exam=UPSSSC%20PET")
        self.assertEqual(len(listed.json["tests"]), 1)
        self.assertEqual(len(listed.json["tests"][0]["questions"]), 25)

    def test_admin_login_rejects_bad_password_and_has_no_write_without_session(self):
        wrong = self.post(
            "/api/admin/login",
            {"username": "site-admin", "password": "wrong-admin-password"},
        )
        self.assertEqual(wrong.status_code, 401)
        session_state = self.client.get("/api/admin/me")
        self.assertEqual(session_state.status_code, 200)
        self.assertFalse(session_state.json["authenticated"])
        self.assertEqual(
            self.post("/api/admin/tests", {}).status_code,
            401,
        )
        self.assertEqual(self.login_admin().status_code, 200)
        self.assertTrue(self.client.get("/api/admin/me").json["authenticated"])

    def test_admin_uploads_pdf_and_visitors_can_view_or_download_it(self):
        self.assertEqual(self.upload_pdf().status_code, 401)
        self.assertEqual(self.login_admin().status_code, 200)

        uploaded = self.upload_pdf()
        self.assertEqual(uploaded.status_code, 201)
        paper_id = uploaded.json["id"]

        visitor = self.app.test_client()
        public_list = visitor.get("/api/papers?exam=UPSSSC%20PET")
        self.assertEqual(public_list.json["papers"], [])
        self.assertEqual(visitor.get(f"/api/papers/{paper_id}/file").status_code, 404)
        admin_list = self.client.get("/api/admin/content?exam=UPSSSC%20PET")
        self.assertEqual(admin_list.json["papers"][0]["status"], "draft")
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        public_list = visitor.get("/api/papers?exam=UPSSSC%20PET")
        self.assertEqual(len(public_list.json["papers"]), 1)
        self.assertEqual(public_list.json["papers"][0]["year"], "2024")
        view_response = visitor.get(f"/api/papers/{paper_id}/file")
        self.assertEqual(view_response.mimetype, "application/pdf")
        view_response.close()
        download = visitor.get(f"/api/papers/{paper_id}/file?download=1")
        self.assertIn("attachment", download.headers["Content-Disposition"])
        download.close()
        self.assertEqual(
            visitor.get(f"/api/papers/{paper_id + 100}/file").status_code,
            404,
        )

        deleted = self.client.delete(
            f"/api/admin/papers/{paper_id}",
            base_url=self.origin,
            headers={"Origin": self.origin},
        )
        self.assertEqual(deleted.status_code, 200)
        self.assertEqual(visitor.get(f"/api/papers/{paper_id}/file").status_code, 404)

    def test_bulk_theory_csv_is_private_until_published(self):
        payload = b"topic,title,content\nHistory,Ancient India,\"Notes, with comma\"\nGeography,Rivers,Ganga and Yamuna\n"
        blocked = self.post_file(
            "/api/admin/import/theory-csv",
            {"exam": "UPSSSC PET"},
            "theory.csv",
            payload,
        )
        self.assertEqual(blocked.status_code, 401)

        self.assertEqual(self.login_admin().status_code, 200)
        imported = self.post_file(
            "/api/admin/import/theory-csv",
            {"exam": "UPSSSC PET"},
            "theory.csv",
            payload,
        )
        self.assertEqual(imported.status_code, 201)
        self.assertEqual(imported.json["imported"], 2)
        self.assertEqual(
            self.client.get("/api/exam-content?exam=UPSSSC%20PET").json["items"],
            [],
        )
        drafts = self.client.get("/api/admin/content?exam=UPSSSC%20PET").json["items"]
        self.assertEqual(len(drafts), 2)
        self.assertEqual(drafts[1]["content"], "Notes, with comma")
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        public_items = self.client.get("/api/exam-content?exam=UPSSSC%20PET").json["items"]
        self.assertEqual(len(public_items), 2)

    def test_bulk_test_csv_groups_questions_and_validates_before_inserting(self):
        header = "test_type,title,duration_minutes,question,option_a,option_b,option_c,option_d,correct_answer,explanation\n"
        row = "mock,History mock,20,Question {},A,B,C,D,B,Example explanation\n"
        payload = (header + row.format("one") + row.format("two")).encode("utf-8")
        self.assertEqual(self.login_admin().status_code, 200)
        imported = self.post_file(
            "/api/admin/import/tests-csv",
            {"exam": "UPSSSC PET"},
            "tests.csv",
            payload,
        )
        self.assertEqual(imported.status_code, 201)
        self.assertEqual(imported.json["imported"], 1)
        self.assertEqual(imported.json["questions"], 2)
        self.assertEqual(
            self.client.get("/api/exam-tests?exam=UPSSSC%20PET").json["tests"],
            [],
        )
        private_tests = self.client.get("/api/admin/content?exam=UPSSSC%20PET").json["tests"]
        self.assertEqual(len(private_tests), 1)
        self.assertEqual(len(private_tests[0]["questions"]), 2)
        self.assertEqual(private_tests[0]["questions"][0]["correctIndex"], 1)

        invalid_full_test = (
            header
            + "full,Too short,60,Question,A,B,C,D,A,Explanation\n"
        ).encode("utf-8")
        rejected = self.post_file(
            "/api/admin/import/tests-csv",
            {"exam": "UPSSSC PET"},
            "invalid.csv",
            invalid_full_test,
        )
        self.assertEqual(rejected.status_code, 400)
        self.assertEqual(
            len(self.client.get("/api/admin/content?exam=UPSSSC%20PET").json["tests"]),
            1,
        )

    def test_pdf_text_import_creates_private_theory_draft(self):
        self.assertEqual(self.login_admin().status_code, 200)
        fake_pdf = b"%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF"
        page = MagicMock()
        page.extract_text.return_value = "Extracted study notes from a text PDF."
        reader = MagicMock()
        reader.is_encrypted = False
        reader.pages = [page]
        with patch("app.PdfReader", return_value=reader):
            imported = self.post_file(
                "/api/admin/import/pdf-theory",
                {"exam": "UPSSSC PET", "topic": "History", "title": "PDF notes"},
                "notes.pdf",
                fake_pdf,
            )
        self.assertEqual(imported.status_code, 201)
        self.assertEqual(imported.json["status"], "draft")
        self.assertEqual(
            self.client.get("/api/exam-content?exam=UPSSSC%20PET").json["items"],
            [],
        )
        draft = self.client.get("/api/admin/content?exam=UPSSSC%20PET").json["items"][0]
        self.assertEqual(draft["content"], "Extracted study notes from a text PDF.")
        self.post("/api/admin/publish", {"exam": "UPSSSC PET"})
        self.assertEqual(
            len(self.client.get("/api/exam-content?exam=UPSSSC%20PET").json["items"]),
            1,
        )

    def test_pdf_upload_rejects_wrong_file_type_and_bad_metadata(self):
        self.assertEqual(self.login_admin().status_code, 200)
        invalid_file = self.upload_pdf(content=b"not a PDF")
        self.assertEqual(invalid_file.status_code, 400)
        invalid_filename = self.upload_pdf(filename="notes.txt")
        self.assertEqual(invalid_filename.status_code, 400)


if __name__ == "__main__":
    unittest.main()
