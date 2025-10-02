<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { themeStore, toggleTheme } from '@tutorialkit/astro';

const theme = useStore(themeStore);
const domLoaded = ref(false);

onMounted(() => {
  domLoaded.value = true;
});
</script>

<template>
  <button
    v-if="domLoaded"
    class="flex items-center text-2xl text-tk-elements-topBar-iconButton-iconColor hover:text-tk-elements-topBar-iconButton-iconColorHover transition-theme bg-tk-elements-topBar-iconButton-backgroundColor hover:bg-tk-elements-topBar-iconButton-backgroundColorHover p-1 rounded-md"
    title="Toggle Theme"
    @click="toggleTheme"
  >
    <div :class="theme === 'dark' ? 'i-carbon-sun' : 'i-carbon-moon'" />
  </button>
</template>
