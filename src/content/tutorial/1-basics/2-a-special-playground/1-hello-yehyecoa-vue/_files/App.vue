<script setup>
import { ref, version } from 'vue';

const message = ref('Hola yehyecoa-vue!');
console.log('version:', version);
</script>

<template>
  <h1>{{ message }}</h1>

  Version is: <code>{{ version }}</code>
</template>
