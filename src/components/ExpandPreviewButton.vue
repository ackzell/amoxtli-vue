<script setup lang="ts">
import { useBrowserLocation } from '@vueuse/core';
import { ref, watch, onMounted } from 'vue';

const sidePanel = ref<Element | null>();
const isSidePanelExpanded = ref(false);
const currentLocation = useBrowserLocation();

function setExpanded(value: boolean) {
  if (!sidePanel.value) {
    return;
  }

  sidePanel.value.classList.toggle('sm:static', !value);
}

function toggle() {
  if (!sidePanel.value) {
    return;
  }
  isSidePanelExpanded.value = !isSidePanelExpanded.value;

  setExpanded(isSidePanelExpanded.value);
}

onMounted(() => {
  sidePanel.value = document.querySelector('[data-id="side-panel"]');
  setExpanded(isSidePanelExpanded.value);
});

watch(currentLocation, () => {
  setExpanded(isSidePanelExpanded.value);
});
</script>

<template>
  <button
    :title="`${isSidePanelExpanded ? 'Collapse' : 'Expand'} Workspace`"
    type="button"
    class="top-bar-button"
    :class="{ 'text-primary dark:text-primary-dark': isSidePanelExpanded }"
    :disabled="!sidePanel"
    @click="toggle"
  >
    <div
      class="w-5 h-5 i-ph-brackets-curly"
      :class="{ 'i-ph-brackets-curly-bold': isSidePanelExpanded }"
    />
  </button>
</template>
