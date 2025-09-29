// netlify/edge-functions/auth.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export default async (request, context) => {
  const url = new URL(request.url);

  // Define public paths that don't require auth
  const publicPaths = ['/', '/signin', '/signup'];
  const isPublic =
    publicPaths.includes(url.pathname) ||
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.match(/\.(js|css|png|jpg|svg|ico|woff2?)$/);

  if (isPublic) {
    return context.next();
  }

  // Check authentication
  const cookies = request.headers.get('cookie') || '';
  const accessToken = cookies
    .split('; ')
    .find((c) => c.startsWith('sb-access-token='))
    ?.split('=')[1];

  if (!accessToken) {
    return Response.redirect(new URL('/signin', request.url), 302);
  }

  // Verify with Supabase
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_KEY')
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return Response.redirect(new URL('/signin', request.url), 302);
  }

  return context.next();
};

export const config = { path: '/*' };
