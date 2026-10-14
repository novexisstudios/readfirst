/**
 * Vercel Serverless Function: /api/send-confirmation
 * Relays an automated noreply confirmation email to the applicant using Resend REST API.
 * Free tier: 3,000 emails/month (100/day).
 *
 * Environment Variables (Set in Vercel/Netlify Dashboard -> Settings -> Environment Variables):
 * - RESEND_API_KEY: Your Resend API key (starts with "re_...")
 * - RESEND_FROM_EMAIL: e.g. "ReadFirst <admissions@no-reply.readfirst.in>"
 */

export default async function handler(req, res) {
  // CORS Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { email, fullName, html, text } = payload;

    if (!email) {
      return res.status(400).json({ error: 'Missing recipient email' });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('[Resend Error] RESEND_API_KEY is not configured in production environment variables.');
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured in hosting environment variables.',
      });
    }

    const fromSender = process.env.RESEND_FROM_EMAIL || 'ReadFirst <admissions@no-reply.readfirst.in>';

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromSender,
        to: [email],
        reply_to: 'office@thelearningmarathon.com',
        subject: 'Thank You for Applying — ReadFirst Educator Transformation Program',
        html: html || '<p>Thank you for your application to ReadFirst. We will be in touch shortly.</p>',
        text: text || 'Thank you for your application to ReadFirst. We will be in touch shortly.',
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[Resend API Error]:', resendData);
      return res.status(resendResponse.status).json({
        error: resendData.message || 'Failed to dispatch email via Resend',
      });
    }

    return res.status(200).json({
      success: true,
      id: resendData.id,
    });
  } catch (err) {
    console.error('[send-confirmation Handler Exception]:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
