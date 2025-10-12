<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('Hola App_2.vue!');
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
