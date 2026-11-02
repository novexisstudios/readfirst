import emailjs from '@emailjs/browser';

/**
 * ReadFirst EmailJS Integration Service
 * Configured to connect the ReadFirst Educator Transformation Application Form
 * and modal enquiry forms to EmailJS with styled HTML templates.
 */

export const getEmailJsConfig = () => {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
  return {
    serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: env.VITE_EMAILJS_TEMPLATE_ID || '',
    confirmationTemplateId: env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || '',
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
    toEmail: env.VITE_EMAILJS_TO_EMAIL || 'pratyush@readfirst.in',
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
  fullName: "1. What's your full name?",
  email: '2. Email address',
  phone: '2. Phone number',
  designation: '3. What is your current role or designation?',
  organisation: '4. Where do you currently work or teach?',
  experience: '5. How long have you been working in education?',
  q6: "6. There must have been a chapter, a book, or a lesson that has stayed with you or made you more curious. We'd love to hear about your experience, reflections and thoughts you've had while teaching or learning it.",
  q7: '7. We would love to know what interests you most about teaching and how children learn, along with the ideas, questions, or aspects of learning you would like to explore more deeply.',
  q8: "8. We'd be happy to know what draws you towards ReadFirst at this point in your journey, and what you hope to discover, understand, or take away from this experience.",
  q9: '9. We are eager to hear from you about an experience, a new idea or learning that has influenced the way you think, teach, or work. You could also reflect on how you explore new ideas that may differ from your existing understanding.',
  q10: "10. As you explore ReadFirst, we'd love to hear about your plans to bring your learning into practice over the next 30–60 days, and the difference and impact you hope to make for your students and their learning environment.",
  q11: "11. We'd like to understand how you plan to make time for the sessions, preparatory reading, reflection, and collaborative research alongside teaching and your other commitments, including the research paper to be completed within 30 days after the program.",
  q12: "12. Every educator brings something special to the learning community. We'd love to hear about the experiences, insights, ideas, or life lessons you would enjoy sharing with fellow educators as you learn and grow together.",
  q13: '13. Feel free to share anything more about your interest in ReadFirst, your expectations from the program, or how you hope to contribute to this learning journey. (Optional)',
};

/**
 * Generates an executive plain-text summary of the applicant responses
 */
export const generatePlainTextSummary = (formData) => {
  return `=== READFIRST EDUCATOR TRANSFORMATION PROGRAM APPLICATION ===
Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

SECTION 1: A LITTLE ABOUT YOU
1. Full Name: ${formData.fullName || '(Not provided)'}
2. Email Address: ${formData.email || '(Not provided)'}
   Phone Number: ${formData.phone || '(Not provided)'}
3. Current Role / Designation: ${formData.designation || '(Not provided)'}
4. Work / Teaching Institution: ${formData.organisation || '(Not provided)'}
5. Years Working in Education: ${formData.experience || '(Not provided)'}

SECTION 2: YOUR LEARNING JOURNEY
[Q6] Chapter, Book, or Lesson That Stayed With You:
${formData.q6 || '(No response entered)'}

[Q7] Interests About Teaching & How Children Learn:
${formData.q7 || '(No response entered)'}

[Q8] What Draws You Towards ReadFirst & Hoped Outcomes:
${formData.q8 || '(No response entered)'}

[Q9] Influential Experience / Exploring Differing Ideas:
${formData.q9 || '(No response entered)'}

[Q10] 30–60 Day Practical Application & Impact:
${formData.q10 || '(No response entered)'}

[Q11] Making Time for Sessions, Readings, and 30-Day Research Paper:
${formData.q11 || '(No response entered)'}

[Q12] Special Experiences, Insights, or Lessons to Share With Fellow Educators:
${formData.q12 || '(No response entered)'}

[Q13] Additional Notes, Expectations, or Contributions (Optional):
${formData.q13 || '(None)'}

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
              <!-- Section 2: Your Learning Journey -->
              <div style="margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                  <tr>
                    <td style="border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                      <span style="font-size: 15px; font-weight: 700; color: #001F42; text-transform: uppercase; letter-spacing: 0.05em;">
                        Section 2: Your Learning Journey
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Q6 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 6</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    There must have been a chapter, a book, or a lesson that has stayed with you or made you more curious. We'd love to hear about your experience, reflections and thoughts you've had while teaching or learning it.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q6}}
                  </div>
                </div>

                <!-- Q7 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 7</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    We would love to know what interests you most about teaching and how children learn, along with the ideas, questions, or aspects of learning you would like to explore more deeply.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q7}}
                  </div>
                </div>

                <!-- Q8 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 8</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    We'd be happy to know what draws you towards ReadFirst at this point in your journey, and what you hope to discover, understand, or take away from this experience.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q8}}
                  </div>
                </div>

                <!-- Q9 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 9</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    We are eager to hear from you about an experience, a new idea or learning that has influenced the way you think, teach, or work. You could also reflect on how you explore new ideas that may differ from your existing understanding.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q9}}
                  </div>
                </div>

                <!-- Q10 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 10</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    As you explore ReadFirst, we'd love to hear about your plans to bring your learning into practice over the next 30–60 days, and the difference and impact you hope to make for your students and their learning environment.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q10}}
                  </div>
                </div>

                <!-- Q11 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 11</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    We'd like to understand how you plan to make time for the sessions, preparatory reading, reflection, and collaborative research alongside teaching and your other commitments, including the research paper to be completed within 30 days after the program.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q11}}
                  </div>
                </div>

                <!-- Q12 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F2642A; margin-bottom: 5px;">Question 12</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Every educator brings something special to the learning community. We'd love to hear about the experiences, insights, ideas, or life lessons you would enjoy sharing with fellow educators as you learn and grow together.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #00326A;">
{{q12}}
                  </div>
                </div>

                <!-- Q13 -->
                <div style="margin-bottom: 18px; padding: 18px 20px; background-color: #FFFFFF; border: 1px solid #E5E0D8; border-radius: 8px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8898A7; margin-bottom: 5px;">Question 13 (Optional)</div>
                  <div style="font-size: 14px; font-weight: 600; color: #001F42; line-height: 1.45; margin-bottom: 10px;">
                    Feel free to share anything more about your interest in ReadFirst, your expectations from the program, or how you hope to contribute to this learning journey.
                  </div>
                  <div style="font-size: 14px; color: #1E2D3D; line-height: 1.65; white-space: pre-wrap; background-color: #F8FAFA; padding: 14px 16px; border-radius: 6px; border-left: 3px solid #D2DADB;">
{{q13}}
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
export const generateApplicationEmailHtml = (formData, customToEmail = null) => {
  const config = getEmailJsConfig();
  const toEmail = customToEmail || config.toEmail || 'pratyush@readfirst.in';

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
              
              <!-- Section 2: Your Learning Journey -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #001F42; border-bottom: 2px solid #00326A; padding-bottom: 6px;">
                  Section 2: Your Learning Journey
                </h3>
                ${renderQaItem(6, APPLICATION_QUESTIONS.q6, formData.q6)}
                ${renderQaItem(7, APPLICATION_QUESTIONS.q7, formData.q7)}
                ${renderQaItem(8, APPLICATION_QUESTIONS.q8, formData.q8)}
                ${renderQaItem(9, APPLICATION_QUESTIONS.q9, formData.q9)}
                ${renderQaItem(10, APPLICATION_QUESTIONS.q10, formData.q10)}
                ${renderQaItem(11, APPLICATION_QUESTIONS.q11, formData.q11)}
                ${renderQaItem(12, APPLICATION_QUESTIONS.q12, formData.q12)}
                ${renderQaItem(13, APPLICATION_QUESTIONS.q13, formData.q13 || 'None provided')}
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
                      ReadFirst · Educator Transformation Program
                    </div>
                    <div>
                      Admissions &amp; Review Desk: <a href="mailto:${escapeHtml(toEmail)}" style="color: #FBCFBA; text-decoration: none;">${escapeHtml(toEmail)}</a>
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
    q5: formData.experience || formData.q6 || 'N/A', // backward compatibility
    q6: formData.q6 || 'N/A',
    q7: formData.q7 || 'N/A',
    q8: formData.q8 || 'N/A',
    q9: formData.q9 || 'N/A',
    q10: formData.q10 || 'N/A',
    q11: formData.q11 || 'N/A',
    q12: formData.q12 || 'N/A',
    q13: formData.q13 || 'None provided',
    q14: formData.q13 || 'None provided', // backward compatibility
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
