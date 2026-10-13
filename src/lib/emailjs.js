import emailjs from '@emailjs/browser';

/**
 * ReadFirst EmailJS Integration Service
 * Configured to connect the ReadFirst Educator Transformation Application Form
 * and modal enquiry forms to EmailJS with styled HTML templates.
 */

export const getEmailJsConfig = () => {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    confirmationTemplateId: import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    toEmail: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'office@thelearningmarathon.com',
  };
};

export const isEmailJsConfigured = () => {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_') &&
    !templateId.includes('your_') &&
    !publicKey.includes('your_')
  );
};

/**
 * Question descriptions matching the Application Form
 */
export const APPLICATION_QUESTIONS = {
  fullName: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  designation: 'Current Designation / Role',
  organisation: 'School / Institution / Organisation',
  experience: 'Total Years in Education',
  q5: '5. A time a learner did not learn as expected, or a lesson didn\'t go as planned',
  q6: '6. Questions about learning or teaching you think about most often',
  q7: '7. What has drawn you to ReadFirst & what you hope to take away',
  q8: '8. A time you changed your thinking or approach after learning something new',
  q9: '9. How you would respond if research papers challenge your long-used approach',
  q10: '10. Where you could apply ReadFirst insights in 30–60 days & measure impact',
  q11: '11. Readiness for online sessions, readings & 30-day collaborative research paper',
  q12: '12. Thoughts on program fee (₹50,000) & readiness to proceed if selected',
  q13: '13. Experience, perspective or question you wish to bring to cohort discussions',
  q14: '14. Additional notes / background (Optional)',
};

/**
 * Generates an executive plain-text summary of the applicant responses
 */
export const generatePlainTextSummary = (formData) => {
  return `=== READFIRST EDUCATOR TRANSFORMATION PROGRAM APPLICATION ===
Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

APPLICANT PROFILE:
- Full Name: ${formData.fullName || '(Not provided)'}
- Email: ${formData.email || '(Not provided)'}
- Phone: ${formData.phone || '(Not provided)'}
- Current Designation: ${formData.designation || '(Not provided)'}
- School / Organisation: ${formData.organisation || '(Not provided)'}
- Years in Education: ${formData.experience || '(Not provided)'}

SECTION 2: LEARNING JOURNEY & REFLECTIONS
[Q5] Lesson Breakdown / Reflection:
${formData.q5 || '(No response entered)'}

[Q6] Questions About Learning & Teaching:
${formData.q6 || '(No response entered)'}

[Q7] Draw to ReadFirst & Hoped Outcomes:
${formData.q7 || '(No response entered)'}

SECTION 3: INTELLECTUAL CURIOSITY & OPENNESS
[Q8] Changed Approach / Mindset Shift:
${formData.q8 || '(No response entered)'}

[Q9] Reaction to Challenging Research:
${formData.q9 || '(No response entered)'}

SECTION 4: APPLICATION & COMMITMENT
[Q10] 30–60 Day Practical Application & Impact:
${formData.q10 || '(No response entered)'}

[Q11] Program Time Commitment (Online + 30-day paper):
${formData.q11 || '(No response entered)'}

[Q12] Investment Readiness (₹50,000 Fee):
${formData.q12 || '(No response entered)'}

SECTION 5: COHORT CONTRIBUTION & ADDITIONAL
[Q13] Contribution to Cohort Discussions:
${formData.q13 || '(No response entered)'}

[Q14] Additional Information:
${formData.q14 || '(None)'}

Declaration Confirmed: ${formData.confirmed ? 'Yes' : 'No'}
============================================================`;
};

/**
 * Escapes HTML entities for safe inclusion in email markup
 */
const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>');
};

/**
 * Pure dynamic EmailJS HTML template using variables {{fullName}}, {{email}}, etc.
 * Zero hardcoded applicant values. Paste directly into EmailJS Template Editor.
 */
export const APPLICATION_EMAILJS_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReadFirst — Educator Transformation Program Application</title>
  <style>
    @media only screen and (max-width: 620px) {
      .rf-outer-table { width: 100% !important; padding: 12px 6px !important; }
      .rf-header-pad { padding: 24px 20px !important; }
      .rf-content-pad { padding: 20px 16px !important; }
      .rf-stack-col { display: block !important; width: 100% !important; text-align: left !important; padding: 0 0 12px 0 !important; }
      .rf-action-btn { display: block !important; width: 100% !important; margin: 0 0 8px 0 !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0C1724; -webkit-font-smoothing: antialiased; word-break: break-word;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="rf-outer-table" style="background-color: #FAF8F5; padding: 36px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 660px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 36px rgba(0, 31, 66, 0.08); border: 1px solid #E5E0D8;">
          
          <!-- 1. Brand Top Banner -->
          <tr>
            <td class="rf-header-pad" style="background: linear-gradient(135deg, #001F42 0%, #00326A 100%); padding: 38px 36px 32px 36px; color: #FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #FBCFBA; margin-bottom: 14px;">
                      ✦ READFIRST · EDUCATOR TRANSFORMATION PROGRAM
                    </div>
                    <h1 style="margin: 0 0 8px 0; font-family: 'Newsreader', Georgia, serif, -apple-system; font-size: 28px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.25;">
                      New Cohort Application
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.85); line-height: 1.55;">
                      A reflective educator inquiry submission received via <strong style="color: #FBCFBA;">ReadFirst</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2. Dynamic Applicant Profile Bar -->
          <tr>
            <td class="rf-content-pad" style="padding: 26px 36px; background-color: #FFF4EE; border-bottom: 1px solid #F7BA9E;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="rf-stack-col" style="vertical-align: top; width: 55%; padding-right: 14px;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #F2642A; margin-bottom: 6px;">
                      Applicant Profile
                    </div>
                    <div style="font-size: 22px; font-weight: 700; color: #001F42; margin-bottom: 4px; line-height: 1.25;">
                      {{fullName}}
                    </div>
                    <div style="font-size: 14px; color: #576778; font-weight: 500; margin-bottom: 6px;">
                      {{designation}} · {{organisation}}
                    </div>
                    <div style="display: inline-block; background-color: rgba(0, 50, 106, 0.08); padding: 3px 10px; border-radius: 12px; font-size: 12px; color: #00326A; font-weight: 600;">
                      Experience: {{experience}}
                    </div>
                  </td>
                  <td class="rf-stack-col" style="vertical-align: top; width: 45%; text-align: right; padding-left: 10px;">
                    <div style="font-size: 13px; color: #576778; margin-bottom: 6px;">
                      <strong style="color: #001F42;">Email:</strong> 
                      <a href="mailto:{{email}}" style="color: #00326A; text-decoration: underline; font-weight: 600;">{{email}}</a>
                    </div>
                    <div style="font-size: 13px; color: #576778; margin-bottom: 6px;">
                      <strong style="color: #001F42;">Phone:</strong> 
                      <a href="tel:{{phone}}" style="color: #00326A; text-decoration: underline; font-weight: 600;">{{phone}}</a>
                    </div>
                    <div style="font-size: 12px; color: #8898A7; margin-top: 8px;">
                      Received: {{submitted_at}}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3. Direct Contact Actions -->
          <tr>
            <td style="padding: 14px 36px; background-color: #FFFFFF; border-bottom: 1px solid #E5E0D8;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="mailto:{{email}}?subject=ReadFirst%20Educator%20Transformation%20Program%20Application%20—%20Next%20Steps" class="rf-action-btn" style="display: inline-block; background-color: #00326A; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 6px; margin-right: 10px;">
                      ✉ Reply directly to {{fullName}}
                    </a>
                    <a href="tel:{{phone}}" class="rf-action-btn" style="display: inline-block; background-color: #F2642A; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 6px;">
                      📞 Call ({{phone}})
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4. Questions & Responses Body -->
          <tr>
            <td class="rf-content-pad" style="padding: 32px 36px; background-color: #FAF8F5;">
              
              <!-- Section 2 -->
              <div style="margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                  <tr>
                    <td style="border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                      <span style="font-size: 15px; font-weight: 700; color: #001F42; text-transform: uppercase; letter-spacing: 0.05em;">
                        Section 2: Learning Journey &amp; Reflections
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 5</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Tell us about a time when a learner did not learn as expected, or a lesson did not go the way you planned. What do you think happened, and what did it make you reflect on?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q5}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 6</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    What questions about learning or teaching do you find yourself thinking about most often? What would you like to explore more deeply?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q6}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 7</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    What has drawn you to ReadFirst? What are you hoping to take away from this experience?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q7}}
                  </div>
                </div>
              </div>

              <!-- Section 3 -->
              <div style="margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                  <tr>
                    <td style="border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                      <span style="font-size: 15px; font-weight: 700; color: #001F42; text-transform: uppercase; letter-spacing: 0.05em;">
                        Section 3: Intellectual Curiosity &amp; Openness
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 8</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Tell us about a time when you changed your thinking or approach because you learned something new.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q8}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 9</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    If you read something in the research papers that challenges an approach you have used for a long time, how would you respond?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q9}}
                  </div>
                </div>
              </div>

              <!-- Section 4 -->
              <div style="margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                  <tr>
                    <td style="border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                      <span style="font-size: 15px; font-weight: 700; color: #001F42; text-transform: uppercase; letter-spacing: 0.05em;">
                        Section 4: Application &amp; Commitment
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 10</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Where in your current work could you apply insights from ReadFirst within the next 30–60 days, and how might you know whether it made a difference?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q10}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 11 (Commitment)</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Are you prepared to set aside time for online sessions, reading, activities and a 30-day collaborative research paper?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q11}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 12 (Investment: ₹50,000)</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    The program fee is ₹50,000. Please share your thoughts on this investment and whether you are prepared to proceed if selected.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #FFF4EE; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #F2642A;">
{{q12}}
                  </div>
                </div>
              </div>

              <!-- Section 5 -->
              <div style="margin-bottom: 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                  <tr>
                    <td style="border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                      <span style="font-size: 15px; font-weight: 700; color: #001F42; text-transform: uppercase; letter-spacing: 0.05em;">
                        Section 5: Cohort Contribution &amp; Additional Info
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 13</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    What is one experience, perspective or question you would like to bring to the cohort discussions?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q13}}
                  </div>
                </div>

                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8898A7; margin-bottom: 5px;">Question 14 (Optional Notes)</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Is there anything else you would like us to know about your background, work or interest in ReadFirst?
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #D2DADB;">
{{q14}}
                  </div>
                </div>
              </div>

              <!-- Declaration Status Pill -->
              <div style="padding: 14px 18px; background-color: #EBF7EE; border: 1px solid #B8E4C3; border-radius: 8px; font-size: 13px; color: #15803D; font-weight: 600;">
                ✓ Declaration Confirmed: {{confirmed}}
              </div>

            </td>
          </tr>

          <!-- 5. Editorial Footer -->
          <tr>
            <td class="rf-content-pad" style="padding: 28px 36px; background-color: #00152D; color: #8898A7; font-size: 12px; line-height: 1.65; border-top: 1px solid #1E2D3D;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-weight: 700; font-size: 14px; color: #FFFFFF; margin-bottom: 4px; letter-spacing: -0.01em;">
                      ReadFirst · Educator Transformation Program
                    </div>
                    <div>
                      Admissions &amp; Review Desk: <a href="mailto:{{to_email}}" style="color: #FBCFBA; text-decoration: none; font-weight: 600;">{{to_email}}</a>
                    </div>
                    <div style="margin-top: 10px; font-size: 11px; color: #576778;">
                      Confidentiality Note: This notification was sent automatically when an applicant submitted their form on ReadFirst. Please preserve applicant privacy in accordance with data governance policies.
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
</html>`;

/**
 * Generates high-fidelity, responsive HTML styled email matching ReadFirst design system
 * Primary Navy: #00326A, Deep Navy: #001F42, Warm Accent: #F2642A, Warm Neutral: #FAF8F5
 */
export const generateApplicationEmailHtml = (formData) => {
  const submittedTime = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const renderQaItem = (num, questionText, answerText) => `
    <div style="margin-bottom: 22px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 6px;">
        Question ${num}
      </div>
      <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 12px;">
        ${escapeHtml(questionText)}
      </div>
      <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
        ${escapeHtml(answerText || '(No response provided)')}
      </div>
    </div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New ReadFirst Educator Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0C1724; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF8F5; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 31, 66, 0.08); border: 1px solid #E5E0D8;">
          
          <!-- Branded Top Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #001F42 0%, #00326A 100%); padding: 36px 36px 32px 36px; color: #FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #FBCFBA; margin-bottom: 14px;">
                      ✦ READFIRST · EDUCATOR TRANSFORMATION PROGRAM
                    </div>
                    <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.25;">
                      New Cohort Application Received
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.85); line-height: 1.5;">
                      A reflective application has been submitted via <span style="color: #FBCFBA; font-weight: 600;">elevify.com / readfirst.in</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Candidate Overview Card -->
          <tr>
            <td style="padding: 28px 36px; background-color: #FFF4EE; border-bottom: 1px solid #F7BA9E;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #F2642A; margin-bottom: 8px;">
                Applicant Summary
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: top; width: 50%; padding-right: 12px;">
                    <div style="font-size: 20px; font-weight: 700; color: #001F42; margin-bottom: 4px;">
                      ${escapeHtml(formData.fullName || 'Unnamed Applicant')}
                    </div>
                    <div style="font-size: 14px; color: #576778; font-weight: 500; margin-bottom: 8px;">
                      ${escapeHtml(formData.designation || 'Educator')} · ${escapeHtml(formData.organisation || 'Independent')}
                    </div>
                    <div style="font-size: 13px; color: #00326A; font-weight: 600;">
                      Experience: ${escapeHtml(formData.experience || 'Not specified')}
                    </div>
                  </td>
                  <td style="vertical-align: top; width: 50%; text-align: right; padding-left: 12px;">
                    <div style="font-size: 13px; color: #576778; margin-bottom: 6px;">
                      <strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #00326A; text-decoration: underline; font-weight: 600;">${escapeHtml(formData.email || 'N/A')}</a>
                    </div>
                    <div style="font-size: 13px; color: #576778; margin-bottom: 6px;">
                      <strong>Phone:</strong> <a href="tel:${formData.phone}" style="color: #00326A; text-decoration: underline; font-weight: 600;">${escapeHtml(formData.phone || 'N/A')}</a>
                    </div>
                    <div style="font-size: 12px; color: #8898A7;">
                      ${submittedTime} IST
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Bar -->
          <tr>
            <td style="padding: 16px 36px; background-color: #FFFFFF; border-bottom: 1px solid #E5E0D8;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="mailto:${formData.email}?subject=Regarding%20your%20ReadFirst%20Educator%20Application" style="display: inline-block; background-color: #00326A; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 6px; margin-right: 10px;">
                      ✉ Reply via Email
                    </a>
                    ${formData.phone ? `
                    <a href="tel:${formData.phone}" style="display: inline-block; background-color: #F2642A; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 6px;">
                      📞 Call Candidate
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Responses Section -->
          <tr>
            <td style="padding: 32px 36px; background-color: #FAF8F5;">
              
              <!-- Section 2: Learning Journey Reflections -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #001F42; border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                  Section 2: Learning Journey &amp; Reflections
                </h3>
                ${renderQaItem(5, APPLICATION_QUESTIONS.q5, formData.q5)}
                ${renderQaItem(6, APPLICATION_QUESTIONS.q6, formData.q6)}
                ${renderQaItem(7, APPLICATION_QUESTIONS.q7, formData.q7)}
              </div>

              <!-- Section 3: Intellectual Curiosity & Openness -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #001F42; border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                  Section 3: Intellectual Curiosity &amp; Openness
                </h3>
                ${renderQaItem(8, APPLICATION_QUESTIONS.q8, formData.q8)}
                ${renderQaItem(9, APPLICATION_QUESTIONS.q9, formData.q9)}
              </div>

              <!-- Section 4: Application & Commitment -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #001F42; border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                  Section 4: Application &amp; Commitment
                </h3>
                ${renderQaItem(10, APPLICATION_QUESTIONS.q10, formData.q10)}
                ${renderQaItem(11, APPLICATION_QUESTIONS.q11, formData.q11)}
                ${renderQaItem(12, APPLICATION_QUESTIONS.q12, formData.q12)}
              </div>

              <!-- Section 5: Cohort Contribution & Notes -->
              <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #001F42; border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                  Section 5: Cohort Contribution &amp; Additional Information
                </h3>
                ${renderQaItem(13, APPLICATION_QUESTIONS.q13, formData.q13)}
                ${renderQaItem(14, APPLICATION_QUESTIONS.q14, formData.q14 || 'None provided')}
              </div>

              <!-- Declaration Status -->
              <div style="padding: 14px 18px; background-color: #EBF7EE; border: 1px solid #B8E4C3; border-radius: 8px; font-size: 13px; color: #15803D; font-weight: 600;">
                ✓ Candidate Declaration Confirmed: ${formData.confirmed ? 'Yes, agreed to complete all readings & participate in cohort discussions.' : 'Pending confirmation'}
              </div>

            </td>
          </tr>

          <!-- Editorial Footer -->
          <tr>
            <td style="padding: 26px 36px; background-color: #00152D; color: #8898A7; font-size: 12px; line-height: 1.6; border-top: 1px solid #1E2D3D;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-weight: 700; font-size: 14px; color: #FFFFFF; margin-bottom: 4px;">
                      ReadFirst · elevify.com
                    </div>
                    <div>
                      Educator Transformation Program · Admissions &amp; Inquiries: <a href="mailto:admissions@readfirst.in" style="color: #FBCFBA; text-decoration: none;">admissions@readfirst.in</a>
                    </div>
                    <div style="margin-top: 8px; font-size: 11px; color: #576778;">
                      Confidential notification: This message contains application reflections submitted directly by the candidate.
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
</html>
  `.trim();
};

/**
 * Sends the Educator Transformation Program application via EmailJS
 */
export const sendApplicationEmail = async (formData) => {
  const config = getEmailJsConfig();

  // If EmailJS keys have not been configured yet, simulate and log helpful instructions
  if (!isEmailJsConfigured()) {
    console.warn(
      '[ReadFirst EmailJS] Keys are not fully configured yet. Running in simulation mode. ' +
      'Please supply VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
    );
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      simulated: true,
      message: 'Application captured in development mode. Provide EmailJS keys to enable live delivery.',
    };
  }

  // Pre-rendered HTML template matching ReadFirst brand
  const htmlContent = generateApplicationEmailHtml(formData);
  const plainTextSummary = generatePlainTextSummary(formData);

  // Template parameters for EmailJS
  const templateParams = {
    // Standard EmailJS recipient & sender fields
    to_email: config.toEmail,
    recipient_email: config.toEmail,
    reply_to: formData.email,
    from_name: formData.fullName,
    applicant_name: formData.fullName,

    // Core profile variables
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    designation: formData.designation,
    organisation: formData.organisation,
    experience: formData.experience,

    // Detailed question responses
    q5: formData.q5 || 'N/A',
    q6: formData.q6 || 'N/A',
    q7: formData.q7 || 'N/A',
    q8: formData.q8 || 'N/A',
    q9: formData.q9 || 'N/A',
    q10: formData.q10 || 'N/A',
    q11: formData.q11 || 'N/A',
    q12: formData.q12 || 'N/A',
    q13: formData.q13 || 'N/A',
    q14: formData.q14 || 'None provided',
    confirmed: formData.confirmed ? 'Confirmed' : 'Not confirmed',

    // Formatted timestamps & metadata
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    form_type: 'ReadFirst Educator Transformation Program Application',

    // Full pre-rendered branded HTML layout
    // (In EmailJS dashboard, use {{{application_summary_html}}} or {{{message_html}}} with triple braces)
    application_summary_html: htmlContent,
    message_html: htmlContent,
    message: plainTextSummary,
    summary_text: plainTextSummary,
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    return {
      simulated: false,
      status: response.status,
      text: response.text,
    };
  } catch (error) {
    console.error('[ReadFirst EmailJS] Failed to send email:', error);
    throw error;
  }
};

/**
 * Sends a general inquiry or modal conversation via EmailJS
 */
export const sendEnquiryEmail = async (enquiryData) => {
  const config = getEmailJsConfig();

  if (!isEmailJsConfigured()) {
    console.warn('[ReadFirst EmailJS] Modal enquiry simulated. Supply EmailJS keys in .env to activate.');
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { simulated: true };
  }

  const templateParams = {
    to_email: config.toEmail,
    reply_to: enquiryData.email,
    from_name: enquiryData.name || 'Website Visitor',
    name: enquiryData.name || 'Website Visitor',
    email: enquiryData.email,
    institution: enquiryData.institution || 'N/A',
    audience: enquiryData.audience || 'General Inquiry',
    programme: enquiryData.programme || 'N/A',
    question: enquiryData.question || enquiryData.message || 'No question text provided',
    message: enquiryData.question || enquiryData.message || 'No question text provided',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    form_type: 'Website Conversation / Enquiry Modal',
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );
    return {
      simulated: false,
      status: response.status,
      text: response.text,
    };
  } catch (error) {
    console.error('[ReadFirst EmailJS] Failed to send enquiry email:', error);
    throw error;
  }
};
