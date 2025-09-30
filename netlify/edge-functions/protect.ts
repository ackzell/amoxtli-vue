import { createClient } from '@supabase/supabase-js';

export default async (request: Request) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/sb_token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) {
    return Response.redirect(new URL('/login', request.url));
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.redirect(new URL('/login', request.url));
  }

  // ✅ Authenticated → continue
  return;
};
