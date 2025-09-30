// ...existing code...
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const origin =
    (event.headers.origin as string) || process.env.ALLOWED_ORIGIN || '';
  // DON'T send "*" when sending credentials — reflect the Origin header
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin || '',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  try {
    const { token } = JSON.parse(event.body || '{}');
    if (!token) {
      return { statusCode: 400, headers: corsHeaders, body: 'Missing token' };
    }

    const cookieValue = encodeURIComponent(token);

    // In Netlify Dev (localhost over http) browsers ignore Secure cookies.
    // Use Secure only in real HTTPS production.
    const isNetlifyDev =
      process.env.NETLIFY_DEV === 'true' ||
      origin.startsWith('http://localhost');
    const secureSegment = isNetlifyDev ? '' : '; Secure';

    const cookie = `sb_token=${cookieValue}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600${secureSegment}`;

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Set-Cookie': cookie,
        'Access-Control-Expose-Headers': 'Set-Cookie',
      },
      body: 'ok',
    };
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: String(err) };
  }
};
// ...existing code...
