# UP GK Wallah

## Run locally

The site now uses a Python backend for student registration/login and per-account mock/live test-result history. Python 3.10 or newer is recommended.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000`. The SQLite database is created at `instance/users.sqlite3`; do not publish or commit that file. Passwords are stored as PBKDF2 hashes, and browser sessions use an HttpOnly, SameSite cookie. Completed mock and live tests save the score, elapsed time, timer-expiry status, and question-by-question answer review to the signed-in user's database history.

### Student email OTP and login

Creating a student account requires a name, username, password, email address, and the on-screen CAPTCHA. A one-time code is sent to that email; the account is created only after the code is verified. Afterward, users can log in with their username or email and password, and log out from the account menu. Login does not send another OTP.

Email is sent over SMTP using Python's standard library; no paid email API is required. Gmail SMTP can be used with a Google App Password (the Google account must have 2-Step Verification enabled). Set these private environment variables on the server; never put credentials in source files:

- `SMTP_HOST`: SMTP server; defaults to `smtp.gmail.com`.
- `SMTP_PORT`: SMTP submission port; defaults to `587` (STARTTLS).
- `SMTP_USERNAME`: the sending Gmail address.
- `SMTP_PASSWORD`: the Google App Password, not the normal account password.
- `SMTP_FROM_EMAIL`: optional sender address; defaults to `SMTP_USERNAME`.
- `AUTH_CAPTCHA_SECRET`: a long random secret used to sign CAPTCHA answers and OTP hashes. If omitted, a process-local random secret is generated; set a stable value for a deployed service.

For Gmail, first enable 2-Step Verification and create an App Password in the Google Account security settings. In the same PowerShell window used to start the app, configure the sender and App Password:

```powershell
$env:SMTP_USERNAME = "student@gmail.com"
$env:SMTP_PASSWORD = "xyz#1234567891011"
python app.py
```

If SMTP is not configured or email delivery fails, account creation fails closed and displays an error. OTPs expire after five minutes, are stored only as keyed hashes, and have a limited number of verification attempts. Free email providers apply their own sending limits and policies. Accounts created with the older mobile-based flow remain in the database and can continue to log in with username/password; new accounts use email verification.

### Same Wi-Fi par phone se test karein

Computer aur phone ko ek hi Wi-Fi par connect karein. Project folder ke PowerShell terminal mein:

```powershell
.\start-lan.ps1
```

Screen par dikhaya gaya `http://<computer-ka-wifi-ip>:5000` link phone ke browser mein kholein. Agar script execution policy error aaye, PowerShell mein `powershell -ExecutionPolicy Bypass -File .\start-lan.ps1` chalayein. Windows Firewall prompt par sirf **Private networks** ke liye Python access allow karein. Agar prompt na aaye aur phone connect na kar paaye, Windows Defender Firewall mein Python ko Private network par allow karein. Server band karne ke liye us terminal mein `Ctrl+C` dabayein. Yeh temporary link sirf isi local network par kaam karta hai; computer/server chalu rehna chahiye aur Wi-Fi/IP badalne par link badal sakta hai. Public/stable link ke liye public hosting par deploy karna zaroori hai.

## Owner-only exam content admin

Students and signed-out visitors do not get an Admin link or editor. As the owner, open `http://127.0.0.1:5000/#owner-admin` and sign in. The username/password are checked on the server; edit, import, draft listing, publish, delete, and private PDF access each require the authenticated Admin session. Set a unique admin username and a private password of at least 16 characters in the server environment. Without the password, Admin access remains disabled. Never put these credentials in JavaScript, commit them, or share them with students.

```powershell
$env:ADMIN_USERNAME = "admin"
$env:ADMIN_PASSWORD = "Vishnu@1998"
python app.py
```

All new manual edits, CSV imports, and previous-paper PDFs are saved as **private drafts**. Only the owner can see drafts or open draft PDFs. Review the items in Content Admin, then click **इस परीक्षा के सभी drafts Publish करें** to make that exam's drafts visible to students. Public APIs and search return published content only.

### Bulk CSV import

In Content Admin, select an exam and download one of the sample templates. Save CSV as UTF-8. Upload theory and mock/full-test data separately; validation happens for the whole file before any rows are saved. Each CSV is limited to 2 MB/1000 rows. Theory columns (header spelling matters):

```csv
topic,title,content
History,Ancient India,"Add theory notes here"
```

MCQ columns:

```csv
test_type,title,duration_minutes,question,option_a,option_b,option_c,option_d,correct_answer,explanation
mock,History mock,20,Example question,Option A,Option B,Option C,Option D,A,Example explanation
```

Rows with the same `test_type`, `title`, and `duration_minutes` are grouped into one test. `test_type` is `mock` or `full`; `correct_answer` is A-D (or 1-4). A full test needs at least 25 questions; each test may contain at most 100. Question/explanation text is shown to students only after publishing.

### PDF to theory draft

The Admin PDF import extracts selectable text from a PDF (maximum 20 MB and 200 pages) and saves up to 12,000 characters as a private theory draft. Review and edit extracted text before publishing. Scanned/image-only PDFs need OCR and are rejected when no selectable text is found. This PDF extraction is for study notes; the separate Previous Paper PDF upload stores a paper for students to view after its draft is published.

For Current Affairs one-liners, select **Current Affairs** in the Content Admin exam list, choose **One-Liner Question**, and save each question with its four options, correct answer, and a short explanation. It remains a private draft until you publish it. The public **Current Affairs** navigation button opens published questions; visitors can reveal each answer without opening the general mixed quiz.

## मोबाइल, टैबलेट और लैपटॉप लेआउट

पेज का layout viewport के अनुसार बदलता है: छोटे फोन पर sidebar और मुख्य सामग्री एक कॉलम में आती है, छोटे टैबलेट पर भी पढ़ने की जगह संकरी न हो इसलिए sidebar ऊपर और सामग्री नीचे रहती है, और बड़े टैबलेट/लैपटॉप पर sidebar और सामग्री साथ दिखते हैं। लंबे comparison tables फोन पर अपने बॉक्स के भीतर horizontal scroll होते हैं; पूरी वेबसाइट को दाएँ-बाएँ scroll नहीं करना पड़ता। CSS breakpoints और संबंधित नियम `style.css` में `@media` के अंदर हैं।

## थ्योरी के नीचे महत्वपूर्ण तालिका जोड़ना

एक चलने वाला उदाहरण अध्याय 1, **प्रागैतिहासिक काल**, में है। इसकी सामग्री `script.js` के आरंभ में `masterStudyDatabase` के `"anc_ch1"` object में है। किसी दूसरी थ्योरी के नीचे अपनी तालिका दिखाने के लिए उसी अध्याय object में `studyAid` जोड़ें:

```js
studyAid: {
    title: "महत्त्वपूर्ण तुलना",
    columns: ["विषय", "मुख्य तथ्य", "याद रखने योग्य बात"],
    rows: [
        ["उदाहरण 1", "यहाँ मुख्य तथ्य लिखें", "यहाँ छोटा नोट लिखें"],
        ["उदाहरण 2", "दूसरा मुख्य तथ्य", "दूसरा छोटा नोट"]
    ]
},
```

`columns` में हर column का heading और `rows` में हर पंक्ति की उसी क्रम में values रखें। जितने headings हों, हर row में उतनी ही values दें। किसी chapter में `studyAid` नहीं होगा तो उसकी थ्योरी पहले की तरह दिखेगी।

काम का code इन जगहों पर है:

1. **डेटा:** `script.js` में `masterStudyDatabase` खोजें, सही chapter ID (जैसे `"anc_ch1"`) खोलें और `studyAid` को `theory` के बाद, `imageUrl`/`questions` से पहले जोड़ें। ऊपर दिए object के पहले property से पहले comma लगाएँ; `studyAid` के बाद अगली property हो तो closing `}` के बाद comma रखें।
2. **दिखाने का code:** उसी `script.js` में `loadChapterData(chapterId)` खोजें। यह `data.studyAid` को पढ़कर HTML table बनाता है। आम तौर पर नया chapter जोड़ते समय इस renderer को बदलने की जरूरत नहीं है।
3. **रंग और मोबाइल व्यवहार:** `style.css` में `.study-aid` और `.study-aid-table` नियम table का रूप तय करते हैं; `overflow-x: auto` इसे फोन पर अपने container में scroll कराता है।

फिर browser को refresh करें। यह तरीका built-in chapter data के लिए है; Content Admin से सेव किए गए theory content में इस समय table editor नहीं है।

The standalone **Current Affairs** header tab is the only public Current Affairs entry; it is not listed as a separate exam in the Exams catalog. Exam detail pages include a latest-known syllabus overview for each listed exam. These overviews are study aids, not independently verified 2026 official notifications. Exam patterns, eligibility, marks, and stages can change; confirm them against the recruiting authority's latest notice.

Use the header search to find exams, syllabus topics, chapters and their notes/questions, built-in mock/live test questions, and admin-saved exam content, tests, and paper metadata. Search is case-insensitive for English, supports Hindi, and maps common terms such as "constitution"/"संविधान" and "history"/"इतिहास". Matching chapters and exam pages can be opened directly from the results. PDF file contents themselves are not indexed.

Previous-paper PDFs must be valid PDF files up to 20 MB. They are stored outside the public static files in the private `instance/papers/` folder and are only served through the paper download endpoint. The **Prev. Papers** navigation link opens a public page where students can filter by exam and view/download admin-uploaded papers. Add only PDFs that you have the right to distribute.

Owner login खोलने के लिए `http://127.0.0.1:5000/#owner-admin` पर जाएँ। बिना configured password के Admin login disabled रहता है। Backend terminal में पहले server बंद करने के लिए `Ctrl+C` दबाएँ, फिर project folder में PowerShell से configure और restart करें:

```powershell
$env:ADMIN_USERNAME = "your-admin-username"
$env:ADMIN_PASSWORD = "your-new-16+-character-password"
python -m waitress --listen=127.0.0.1:5000 app:app
```

फिर website refresh करके नीले **Content Admin** button पर click करें और वही username/password दर्ज करें। Password हर बार PowerShell के उसी server terminal में सेट करें; इसे source code या README में न डालें। For production, set these as private environment variables in the host or service configuration and restart the backend. A full test requires at least 25 questions; mock tests require at least one.

New passwords must be 12-128 characters. Existing browser-only accounts are migrated to the backend the first time their owner successfully logs in with the same username and password. A legacy password shorter than 12 characters cannot be migrated; register a new account with a stronger password instead.
Unmigrated legacy account entries remain in that browser's old local storage until successfully migrated. Do not reuse an old password elsewhere; after migrating or recreating an account, the matching legacy entry is removed automatically.

## Before public deployment

- Deploy behind a trusted HTTPS reverse proxy and enable `COOKIE_SECURE=1`. Do not use that setting over plain HTTP; browsers will not send the session cookie.
- If TLS is terminated at that reverse proxy, set `TRUST_PROXY=1` only when the proxy removes client-supplied `X-Forwarded-*` headers and sets its own. The app trusts exactly one proxy hop.
- Run with a production WSGI server such as Waitress, not Flask's development server. Keep the WSGI listener private behind the HTTPS proxy.
- Keep `instance/users.sqlite3` on private persistent storage, restrict host access, and maintain encrypted off-site backups. Never put the database in a public/static directory.
- Configure request-rate limits at the proxy as well. The app's in-process login/signup limits reset on restart and are intended as a baseline, not a replacement for proxy-level protection.
- Keep Python dependencies and the server operating system patched; use a firewall and monitor backups and access logs.

Example for a server behind a single trusted HTTPS proxy:

```powershell
$env:COOKIE_SECURE = "1"
$env:TRUST_PROXY = "1"
waitress-serve --listen=127.0.0.1:5000 app:app
```

No backend can guarantee that a public website will never be attacked. The browser files are public and can be changed by a visitor on their own device; security-sensitive checks and any future private data operations must be enforced by the server. The score is calculated server-side from the submitted answer review, but the question catalog and its answer keys are public client files, so a browser user can alter their own reported answers. Custom mock tests remain in browser storage and are not part of the account-data backend.

## Run backend tests

```powershell
python -m unittest test_app.py
```
