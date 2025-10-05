<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const theme = useLocalStorage('tk_theme', 'light');

const toggleTheme = () => {
  console.log('Toggling theme from', theme.value);

  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme.value);
};

// Initialize theme on load (client-side only)
onMounted(() => {
  if (theme.value) {
    document.documentElement.setAttribute('data-theme', theme.value);
  }
});

watch(theme, () => {
  const root = document.documentElement;
  root.classList.remove('theme-ready');
  // start fade-in just before base transition ends
  setTimeout(() => root.classList.add('theme-ready'), 800);
});
</script>

<template>
  <div class="theme-switcher">
    <button
      class="sc-login-btn"
      v-tooltip.bottom-end="
        `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
      "
      @click="toggleTheme"
    >
      <div
        class="w-4 h-4"
        :class="theme === 'dark' ? 'i-carbon-sun' : 'i-carbon-moon'"
      />
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
