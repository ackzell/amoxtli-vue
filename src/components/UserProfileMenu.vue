<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LogoutButton from './LogoutButton.vue';
import { supabaseClient } from '@lib/supabase';
import { Dropdown } from 'floating-vue';
import type { User } from '@supabase/supabase-js';

const user = ref();

onMounted(async () => {
  const { data: userData } = await supabaseClient.auth.getUser();
  user.value = userData.user;
  localStorage.setItem('user-profile', JSON.stringify(user.value));
});

function proxiedAvatar(url: string | undefined) {
  if (!url) return '';
  try {
    const u = new URL(url);
    // If it's already same-origin or a data URL, don't proxy
    if (u.protocol === 'data:' || u.origin === window.location.origin)
      return url;
    // Netlify classic functions are available at /.netlify/functions/<name>
    return `/.netlify/functions/avatar-proxy?url=${encodeURIComponent(url)}`;
  } catch (err) {
    return url;
  }
}
</script>

<template>
  <Dropdown aria-id="user-profile-dropdown" placement="bottom-end">
    <button class="flex items-center gap-2 px-3 py-1">
      <img
        v-if="user && user.user_metadata && user.user_metadata.avatar_url"
        :src="proxiedAvatar(user.user_metadata.avatar_url)"
        alt="User Avatar"
        class="w-8 h-8 rounded-full"
      />
    </button>
    <template #popper>
      <div class="flex flex-col p-2 gap-1">
        <div class="flex p-2 gap-1">
          <LogoutButton :userName="user?.user_metadata?.preferred_username" />
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<style>
.v-popper--theme-dropdown .v-popper__inner {
  background: var(--tk-background-primary);
  border-color: var(--av-primary);
}

.v-popper--theme-dropdown .v-popper__arrow-inner {
  border-color: var(--tk-background-primary);
}

.v-popper--theme-dropdown .v-popper__arrow-outer {
  border-color: var(--av-primary);
}
</style>
