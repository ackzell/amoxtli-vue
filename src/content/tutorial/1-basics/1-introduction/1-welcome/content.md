---
type: lesson
title: Welcome to Vue
editor: false
---

# Hello world!

This is a POC of a course platform that can be used as study materials for in-person workshops.

Note the `msg` **reactive variable** that is being used in a two-way binding flow.

```vue "msg"  showLineNumbers title="App.vue"
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hola Mundo!')
</script>
  
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

The first few lessons could leverage the **Vue Playground** app that is rendered on the right ->

