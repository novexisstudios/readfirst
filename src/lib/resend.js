import { generateConfirmationHtml, generateConfirmationPlainText } from './confirmationEmailTemplate';

/**
 * Sends an automated noreply confirmation email to the applicant upon form submission.
 * It calls the Netlify serverless endpoint `/api/send-confirmation` which securely relays
 * the email using Resend (100% free tier: 3,000 emails/month).
 */
export const sendApplicantConfirmationEmail = async (formData) => {
  if (!formData || !formData.email) {
    console.warn('[ReadFirst Confirmation Email] No applicant email provided. Skipping confirmation.');
    return { skipped: true, reason: 'missing_email' };
  }

  const payload = {
    email: formData.email,
    fullName: formData.fullName,
    designation: formData.designation,
    organisation: formData.organisation,
    experience: formData.experience,
    html: generateConfirmationHtml(formData),
    text: generateConfirmationPlainText(formData),
  };

  try {
    const response = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('[ReadFirst Confirmation Email] Server returned non-200:', response.status, errText);
      return { success: false, status: response.status, error: errText };
    }

    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    // We log and return safely without breaking the user application experience
    console.warn('[ReadFirst Confirmation Email] Dispatch notice:', error.message);
    return { success: false, error: error.message };
  }
};
