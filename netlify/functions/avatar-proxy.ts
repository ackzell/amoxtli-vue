import type { Handler } from '@netlify/functions';

const ALLOWED_HOSTS = [
  'lh3.googleusercontent.com',
  'googleusercontent.com',
  'www.gravatar.com',
  'secure.gravatar.com',
  'avatars.githubusercontent.com',
];

function isAllowedHost(hostname: string | null) {
  if (!hostname) return false;
  return ALLOWED_HOSTS.some(
    (h) => hostname === h || hostname.endsWith('.' + h)
  );
}

export const handler: Handler = async (event) => {
  const origin =
    (event.headers.origin as string) || process.env.ALLOWED_ORIGIN || '';
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin || '',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  } as Record<string, string>;

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  const urlParam =
    (event.queryStringParameters && event.queryStringParameters.url) || '';
  if (!urlParam) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: 'Missing url parameter',
    };
  }

  let target: URL;
  try {
    target = new URL(urlParam);
  } catch (err) {
    return { statusCode: 400, headers: corsHeaders, body: 'Invalid url' };
  }

  if (!isAllowedHost(target.hostname)) {
    return { statusCode: 403, headers: corsHeaders, body: 'Host not allowed' };
  }

  try {
    const res = await fetch(target.toString(), { method: 'GET' });
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: corsHeaders,
        body: `Upstream returned ${res.status}`,
      };
    }

    const contentType =
      res.headers.get('content-type') || 'application/octet-stream';
    const buffer = Buffer.from(await res.arrayBuffer());
    const body = buffer.toString('base64');

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
      isBase64Encoded: true,
      body,
    };
  } catch (err) {
    console.error('[avatar-proxy] fetch error', err);
    return { statusCode: 502, headers: corsHeaders, body: 'Bad gateway' };
  }
};
