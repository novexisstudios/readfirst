# ReadFirst × EmailJS Setup Guide

This guide walks you through connecting the ReadFirst Educator Transformation Application Form to EmailJS in under 3 minutes.

---

## Step 1: Sign up / Log in to EmailJS
1. Visit [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in or create your free account.

---

## Step 2: Add an Email Service
1. In the sidebar, navigate to **Email Services** -> **Add New Service**.
2. Select your email provider (e.g., **Gmail**, **Outlook**, or custom **SMTP**).
3. Connect your email account and click **Create Service**.
4. Copy your **Service ID** (e.g. `service_abc123`).

---

## Step 3: Create an Email Template
1. In the sidebar, navigate to **Email Templates** -> **Create New Template**.
2. **Subject line**: 
   `New ReadFirst Application: {{fullName}} ({{organisation}})`
3. **To Email**: 
   `admissions@readfirst.in` (or your personal/admissions email)
4. **From Name**: 
   `{{fullName}} (via ReadFirst)`
5. **Reply-To**: 
   `{{email}}`
6. **Email Content / Body**:
   - Click the **`<>` (Source / HTML)** button in the editor toolbar to switch to code view.
   - Choose either method:
     - **Option A (Recommended)**: Copy the contents of [`email-templates/readfirst-application-template.html`](./readfirst-application-template.html) and paste it directly.
     - **Option B (Dynamic 1-Line)**: Type `{{{application_summary_html}}}` (must use three curly braces to render unescaped HTML).
7. Click **Save** in the top right.
8. Copy your **Template ID** (e.g. `template_xyz789`).

---

## Step 4: Get your Public Key
1. In the sidebar, go to **Account** -> **API Keys**.
2. Copy your **Public Key** (e.g. `user_123456789` or `pub_xxx`).

---

## Step 5: Add Keys to `.env`
Open `.env` in the project root:
```env
VITE_EMAILJS_SERVICE_ID=service_your_id
VITE_EMAILJS_TEMPLATE_ID=template_your_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: recipient notification email
VITE_EMAILJS_TO_EMAIL=admissions@readfirst.in
```

Restart your dev server (`npm run dev`) for Vite to load the new environment variables.

---

## Template Variables Available in EmailJS
Every field submitted in the form is available for your template:

| Variable | Description |
|---|---|
| `{{fullName}}` | Applicant's Full Name |
| `{{email}}` | Applicant's Email Address |
| `{{phone}}` | Applicant's Contact Phone Number |
| `{{designation}}` | Current Role / Designation |
| `{{organisation}}` | School / Institution / Organisation |
| `{{experience}}` | Years of Experience |
| `{{q5}}` | Learner breakdown reflection |
| `{{q6}}` | Questions about learning & teaching |
| `{{q7}}` | What drew applicant to ReadFirst |
| `{{q8}}` | Shift in thinking / approach |
| `{{q9}}` | Reaction to challenging research papers |
| `{{q10}}` | 30–60 day application & impact metrics |
| `{{q11}}` | Readiness for online sessions & research paper |
| `{{q12}}` | Reflection on ₹50,000 fee and readiness |
| `{{q13}}` | Contribution to cohort discussions |
| `{{q14}}` | Additional notes (optional) |
| `{{confirmed}}` | Declaration confirmation status (`Confirmed` / `Not confirmed`) |
| `{{submitted_at}}` | Formatted submission date and time (IST) |
| `{{{application_summary_html}}}` | Full pre-rendered branded HTML table/layout |
| `{{message}}` | Clean plain-text summary of all answers |
