// ...existing code...
import { createClient } from '@supabase/supabase-js';

export default async (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  console.log('[protect edge] request for', pathname, 'method', request.method);

  // Explicitly exclude unprotected routes (login page, callback, functions, assets, preflight, dev tooling)
  const excludedPrefixes = [
    '/login',
    '/auth/callback',
    '/.netlify/functions',
    '/assets',
    '/favicon.ico',
    '/@vite', // Vite HMR client
    '/@', // other vite internal endpoints
    '/__uno.css',
    '/__vite',
    '/node_modules',
    '/src', // Astro dev module requests
    '/_astro', // internal astro assets
    '/.well-known', // dev/tools
  ];

  if (
    request.method === 'OPTIONS' ||
    excludedPrefixes.some((p) => pathname === p || pathname.startsWith(p + '/'))
  ) {
    console.log('[protect edge] skipping auth for excluded path', pathname);
    return;
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/sb_token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) {
    console.log('[protect edge] no token, redirect to /login');
    return Response.redirect(new URL('/login', request.url));
  }

  // Read all common env var names and fall back sensibly
  const SUPABASE_URL =
    Deno.env.get('SUPABASE_URL') ?? Deno.env.get('PUBLIC_SUPABASE_URL') ?? '';
  const SUPABASE_KEY =
    Deno.env.get('SUPABASE_KEY') ??
    Deno.env.get('SUPABASE_ANON_KEY') ??
    Deno.env.get('PUBLIC_SUPABASE_KEY') ??
    '';

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    // Avoid crashing the edge function when env is missing — log and redirect to login.
    console.error('[protect edge] missing Supabase env vars', {
      hasUrl: !!SUPABASE_URL,
      hasKey: !!SUPABASE_KEY,
    });
    return Response.redirect(new URL('/login', request.url));
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.log(
        '[protect edge] invalid token or user not found, redirect to /login',
        { error }
      );
      return Response.redirect(new URL('/login', request.url));
    }

    console.log('[protect edge] authenticated user id', user.id);
    return;
  } catch (err) {
    console.error('[protect edge] supabase client error', err);
    return Response.redirect(new URL('/login', request.url));
  }
};
// ...existing code...
