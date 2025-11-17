<script setup lang="ts">
import { useBrowserLocation } from '@vueuse/core';
import { ref, watch, onMounted } from 'vue';

const mainPanel = ref<Element | null>();
const isMainPanelExpanded = ref(false);

const sidePanel = ref<Element | null>();
const isSidePanelExpanded = ref(false);

const currentLocation = useBrowserLocation();

function setMainPanelExpanded(value: boolean) {
  if (!mainPanel.value) {
    return;
  }

  mainPanel.value.classList.toggle('sm:static', !value);
  sidePanel.value?.classList.toggle('hidden', value);
  isMainPanelExpanded.value = value;
}

function setSidePanelExpanded(value: boolean) {
  if (!sidePanel.value) {
    return;
  }

  sidePanel.value.classList.toggle('sm:static', !value);
  isSidePanelExpanded.value = value;
}

function toggleMainPanel() {
  console.log('toggle clicked')
  isMainPanelExpanded.value = !isMainPanelExpanded.value;

  setMainPanelExpanded(isMainPanelExpanded.value);

  if (isMainPanelExpanded.value) {
    setSidePanelExpanded(false);
  }
}

function toggleSidePanel() {
  if (!sidePanel.value) {
    return;
  }
  isSidePanelExpanded.value = !isSidePanelExpanded.value;
  setSidePanelExpanded(isSidePanelExpanded.value);

  if (isSidePanelExpanded.value) {
    setMainPanelExpanded(false);
  }
}

onMounted(() => {
  mainPanel.value = document.querySelector('[data-id="main-panel"]');
  sidePanel.value = document.querySelector('[data-id="side-panel"]');
  setMainPanelExpanded(isMainPanelExpanded.value);
  setSidePanelExpanded(isSidePanelExpanded.value);
});

watch(currentLocation, () => {
  setMainPanelExpanded(isMainPanelExpanded.value);
  setSidePanelExpanded(isSidePanelExpanded.value);
});

</script>

<template>
  <button :title="`${isMainPanelExpanded ? 'Collapse' : 'Expand'} Lesson Contents`" type="button" class="top-bar-button"
    :class="{ 'text-primary dark:text-primary-dark': isMainPanelExpanded }" :disabled="!mainPanel"
    @click="toggleMainPanel">
    <div class="w-5 h-5 i-ph-book-open" :class="{ 'i-ph-book-open': isMainPanelExpanded }" />
  </button>

  <button :title="`${isSidePanelExpanded ? 'Collapse' : 'Expand'} Workspace`" type="button" class="top-bar-button"
    :class="{ 'text-primary dark:text-primary-dark': isSidePanelExpanded }" :disabled="!sidePanel"
    @click="toggleSidePanel">
    <div class="w-5 h-5 i-ph-brackets-curly" :class="{ 'i-ph-brackets-curly-bold': isSidePanelExpanded }" />
  </button>
</template>
