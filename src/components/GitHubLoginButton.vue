<script setup lang="ts">
import { supabaseClient } from '@/lib/supabase';
import { ref } from 'vue';

const isLoggingIn = ref(false);

async function loginWithGitHub() {
  isLoggingIn.value = true;
  await supabaseClient.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: window.location.origin + '/auth/callback' },
  });
}
</script>

<template>
  <div>
    <div v-if="isLoggingIn" class="text-[var(--tk-text-primary)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE -->
        <path
          fill="currentColor"
          d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
        >
          <animateTransform
            attributeName="transform"
            dur="0.75s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </div>
    <button v-else class="sc-github-btn" @click="loginWithGitHub">
      <div class="i-carbon-logo-github w-5 h-5 mr-2"></div>
      Sign in with GitHub
    </button>
  </div>
</template>
