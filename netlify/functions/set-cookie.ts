import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const { token } = JSON.parse(event.body || '{}');

  if (!token) {
    return { statusCode: 400, body: 'Missing token' };
  }

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': `sb_token=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=3600`,
    },
    body: 'ok',
  };
};
