import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-api-send-confirmation',
      configureServer(server) {
        const handleSendConfirmation = (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const payload = JSON.parse(body || '{}');
                const apiKey = process.env.RESEND_API_KEY;

                if (!apiKey) {
                  console.log('[Vite Dev API] Simulated automated confirmation email dispatched to:', payload.email);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    simulated: true,
                    message: 'Simulated in local development. Add RESEND_API_KEY to test live.',
                  }));
                  return;
                }

                const fromSender = process.env.RESEND_FROM_EMAIL || 'ReadFirst <admissions@no-reply.readfirst.in>';
                const resendRes = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: fromSender,
                    to: [payload.email],
                    reply_to: 'office@thelearningmarathon.com',
                    subject: 'Thank You for Applying — ReadFirst Educator Transformation Program',
                    html: payload.html,
                    text: payload.text,
                  }),
                });

                const data = await resendRes.json();
                res.statusCode = resendRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        };

        server.middlewares.use('/.netlify/functions/send-confirmation', handleSendConfirmation);
        server.middlewares.use('/api/send-confirmation', handleSendConfirmation);
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react') || id.includes('lenis')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
