<script setup lang="ts">
import { supabaseClient } from '@/lib/supabase.ts';

defineProps<{
  userName?: string;
}>();

async function logout() {
  // sign out client-side (revokes session in Supabase)
  try {
    await supabaseClient.auth.signOut();
  } catch (e) {
    console.warn('supabase signOut failed', e);
  }

  // clear the server cookie used by edge protect
  try {
    await fetch('/.netlify/functions/clear-cookie', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.warn('clear-cookie request failed', e);
  }

  // redirect to login
  // @ts-ignore
  window.location.href = '/login';
}
</script>

<template>
  <button
    type="button"
    class="top-bar-button flex gap-2"
    id="logout-button"
    title="Log out"
    @click="logout"
  >
    <span class="text-sm">Logout {{ userName }}</span>
    <div class="i-mynaui-logout w-5 h-5"></div>
  </button>
</template>
ni
