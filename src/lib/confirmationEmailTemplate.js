/**
 * Polished, professional HTML and plain-text confirmation email template
 * sent automatically to applicants upon submitting their ReadFirst Educator application.
 */

export const generateConfirmationHtml = (formData = {}) => {
  const fullName = formData.fullName || 'Educator';
  const email = formData.email || '';
  const designation = formData.designation || 'Educator';
  const organisation = formData.organisation || 'Educational Institution';
  const experience = formData.experience || 'Not specified';
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Applying — ReadFirst</title>
  <style>
    @media only screen and (max-width: 600px) {
      .rf-outer { padding: 16px 8px !important; }
      .rf-card { border-radius: 10px !important; }
      .rf-header { padding: 32px 24px !important; }
      .rf-body { padding: 28px 20px !important; }
      .rf-details { padding: 18px 16px !important; }
      .rf-row-label { display: block !important; width: 100% !important; margin-bottom: 2px !important; }
      .rf-row-val { display: block !important; width: 100% !important; margin-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0C1724; -webkit-font-smoothing: antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rf-outer" style="background-color: #FAF8F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rf-card" style="max-width: 620px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 31, 66, 0.07); border: 1px solid #E5E0D8;">
          
          <!-- 1. Brand Top Banner -->
          <tr>
            <td class="rf-header" style="background: linear-gradient(135deg, #001F42 0%, #00326A 100%); padding: 38px 36px; color: #FFFFFF;">
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.22); padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #FBCFBA; margin-bottom: 16px;">
                ✦ READFIRST · EDUCATOR TRANSFORMATION PROGRAM
              </div>
              <h1 style="margin: 0 0 10px 0; font-family: 'Newsreader', Georgia, serif; font-size: 32px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.2;">
                Thank You for Applying!
              </h1>
              <p style="margin: 0; font-size: 15px; color: rgba(255, 255, 255, 0.88); line-height: 1.55;">
                We have safely received your application and reflections.
              </p>
            </td>
          </tr>

          <!-- 2. Main Content Body -->
          <tr>
            <td class="rf-body" style="padding: 36px 36px 28px 36px; background-color: #FFFFFF;">
              <p style="font-size: 16px; line-height: 1.6; color: #001F42; margin: 0 0 16px 0; font-weight: 600;">
                Dear ${fullName},
              </p>
              
              <p style="font-size: 15px; line-height: 1.7; color: #425263; margin: 0 0 18px 0;">
                Thank you for your interest in <strong style="color: #001F42;">ReadFirst</strong>. We appreciate the time, care, and depth of thought you have brought to your responses.
              </p>

              <p style="font-size: 15px; line-height: 1.7; color: #425263; margin: 0 0 24px 0;">
                Your application will be carefully reviewed by our admissions panel, and we will be in touch with you regarding the next steps.
              </p>

              <!-- Highlight Quote Box matching the onscreen modal -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #FFF9F6; border-left: 4px solid #F2642A; padding: 18px 22px; border-radius: 6px;">
                    <p style="font-family: Georgia, serif; font-style: italic; font-size: 17px; color: #001F42; margin: 0; line-height: 1.55;">
                      “We look forward to the possibility of learning and growing together.”
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next Section -->
              <h2 style="font-size: 16px; font-weight: 700; color: #001F42; margin: 28px 0 12px 0; letter-spacing: -0.01em;">
                What Happens Next?
              </h2>
              <p style="font-size: 14px; line-height: 1.65; color: #526170; margin: 0 0 24px 0;">
                Because cohort participation is intentionally selective, our team reviews each submission individually to understand each educator's reflective journey. We will write back to you at this email address within <strong>3 to 5 business days</strong>.
              </p>

              <!-- Applicant Details Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rf-details" style="background-color: #F8FAFC; border: 1px solid #E5E9EE; border-radius: 10px; padding: 20px 22px; margin-top: 20px;">
                <tr>
                  <td style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #F2642A; padding-bottom: 12px;" colspan="2">
                    Submission Details
                  </td>
                </tr>
                <tr>
                  <td class="rf-row-label" style="font-size: 13px; color: #64748B; width: 35%; padding-bottom: 8px;">Applicant:</td>
                  <td class="rf-row-val" style="font-size: 13px; font-weight: 600; color: #001F42; padding-bottom: 8px;">${fullName}</td>
                </tr>
                <tr>
                  <td class="rf-row-label" style="font-size: 13px; color: #64748B; padding-bottom: 8px;">Email Address:</td>
                  <td class="rf-row-val" style="font-size: 13px; font-weight: 600; color: #001F42; padding-bottom: 8px;">${email}</td>
                </tr>
                <tr>
                  <td class="rf-row-label" style="font-size: 13px; color: #64748B; padding-bottom: 8px;">Role / Institution:</td>
                  <td class="rf-row-val" style="font-size: 13px; color: #001F42; padding-bottom: 8px;">${designation} · ${organisation}</td>
                </tr>
                <tr>
                  <td class="rf-row-label" style="font-size: 13px; color: #64748B; padding-bottom: 8px;">Experience:</td>
                  <td class="rf-row-val" style="font-size: 13px; color: #001F42; padding-bottom: 8px;">${experience}</td>
                </tr>
                <tr>
                  <td class="rf-row-label" style="font-size: 13px; color: #64748B;">Received:</td>
                  <td class="rf-row-val" style="font-size: 12px; color: #64748B;">${submittedAt}</td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- 3. Professional Editorial Footer -->
          <tr>
            <td style="padding: 26px 36px; background-color: #00152D; color: #94A3B8; font-size: 12px; line-height: 1.65; border-top: 1px solid #1E2D3D;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-weight: 700; font-size: 14px; color: #FFFFFF; margin-bottom: 4px;">
                      ReadFirst · Research-Based Teaching &amp; Learning
                    </div>
                    <div style="color: #CBD5E1; margin-bottom: 12px;">
                      Website: <a href="https://readfirst.in" style="color: #FBCFBA; text-decoration: none; font-weight: 600;">readfirst.in</a>
                    </div>
                    <div style="font-size: 11px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px;">
                      Please note: This is an automated confirmation sent from an unmonitored mailbox. If you have questions or need to make adjustments to your submission, please contact us at <a href="mailto:office@thelearningmarathon.com" style="color: #CBD5E1; text-decoration: underline;">office@thelearningmarathon.com</a>.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`.trim();
};

export const generateConfirmationPlainText = (formData = {}) => {
  const fullName = formData.fullName || 'Educator';
  return `Thank You for Applying — ReadFirst Educator Transformation Program

Dear ${fullName},

Thank you for your interest in ReadFirst. We appreciate the time, care, and depth of thought you have put into your responses.

Your application will be carefully reviewed, and we will be in touch regarding the next steps.

"We look forward to the possibility of learning and growing together."

WHAT HAPPENS NEXT:
Because cohort participation is intentionally selective, our admissions panel reviews each submission individually. We will contact you at this email address within 3 to 5 business days regarding your admission status.

SUBMISSION SUMMARY:
• Applicant: ${formData.fullName || 'N/A'}
• Email: ${formData.email || 'N/A'}
• Role & Institution: ${formData.designation || 'Educator'} · ${formData.organisation || 'N/A'}
• Experience: ${formData.experience || 'N/A'}

Warm regards,
Admissions & Review Desk
ReadFirst · Research-Based Teaching & Learning
https://readfirst.in

---
Note: This is an automated confirmation sent from an unmonitored mailbox. For inquiries, please reach out to office@thelearningmarathon.com.`;
};
