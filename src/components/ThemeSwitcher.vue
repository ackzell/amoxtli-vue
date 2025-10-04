<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
</script>

<template>
  <div class="theme-switcher">
    <button
      @click="toggleTheme"
      v-tooltip.bottom-end="
        `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
      "
    >
      <div
        class="w-4 h-4 text-dark dark:text-light"
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
