import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const origin =
    (event.headers.origin as string) || process.env.ALLOWED_ORIGIN || '';
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
    // In Netlify Dev (localhost over http) browsers ignore Secure cookies.
    const isNetlifyDev =
      process.env.NETLIFY_DEV === 'true' ||
      origin.startsWith('http://localhost');
    const secureSegment = isNetlifyDev ? '' : '; Secure';

    // Clear cookie by setting empty value and Max-Age=0 / Expires in the past
    const cookie = `sb_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secureSegment}`;

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
