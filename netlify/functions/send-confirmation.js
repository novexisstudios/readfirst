/**
 * Netlify Serverless Function: send-confirmation
 * Relays an automated noreply confirmation email to the applicant using Resend REST API.
 * Free tier: 3,000 emails/month (100/day).
 *
 * Environment Variables (Set in Netlify Dashboard -> Site Configuration -> Environment Variables):
 * - RESEND_API_KEY: Your Resend API key (starts with "re_...")
 * - RESEND_FROM_EMAIL: e.g. "ReadFirst <noreply@readfirst.in>" (default fallback: "ReadFirst <onboarding@resend.dev>")
 */

export const handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { email, fullName, html, text } = payload;

    if (!email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Missing recipient email' }),
      };
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Check if API key is configured in environment
    if (!apiKey) {
      console.error('[Resend Configuration Error] RESEND_API_KEY is not configured in hosting environment variables.');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'RESEND_API_KEY is not configured in Netlify environment variables. Please add RESEND_API_KEY and RESEND_FROM_EMAIL in Netlify Site Settings.',
        }),
      };
    }

    // Sender address: custom domain if verified, or Resend's free onboarding domain for testing
    const fromSender = process.env.RESEND_FROM_EMAIL || 'ReadFirst <onboarding@resend.dev>';

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
      return {
        statusCode: resendResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: resendData.message || 'Failed to dispatch email via Resend',
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        id: resendData.id,
      }),
    };
  } catch (err) {
    console.error('[send-confirmation Handler Exception]:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};
