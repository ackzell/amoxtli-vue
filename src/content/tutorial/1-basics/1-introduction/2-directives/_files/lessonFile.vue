<script setup lang="ts">
import { ref } from 'vue';

const theBeatles = [
  {
    firstName: 'John',
    lastName: 'Lennon',
  },
  {
    firstName: 'Paul',
    lastName: 'McCartney',
  },
  {
    firstName: 'George',
    lastName: 'Harrison',
  },
  {
    firstName: 'Ringo',
    lastName: 'Star',
  },
];

const message = ref('Hello from the Vue instance!');
const treasureRevealed = ref(false);
const indent = ref('tabs');

function showMessage() {
  alert('Seriously?');
}
</script>

<template>
  <h1>Welcome to Vue!</h1>

  <h2>Directives</h2> lalalalalal

  <!-- declaring a mounting point -->
  <div id="my-app">
    <!-- v-model  -->
    <hr />
    <h3>
      <code>v-model</code>
    </h3>
    <input type="text" v-model="message" />
    <br />
    {{ message }}
    <!-- v-model  -->

    <!-- v-for -->
    <hr />
    <h3><code>v-for</code></h3>
    The Beatles are:
    <ul>
      <!-- `theBeatles` is declared in the Vue instance -->
      <li v-for="(beatle, index) in theBeatles" :key="index">
        {{ `${index}: ${beatle.firstName} ${beatle.lastName}` }}
      </li>
    </ul>
    <!-- v-for -->

    <!-- v-show -->
    <!-- Adds `style="display: none;""` to the element-->
    <hr />
    <h3><code>v-show</code></h3>
    <label>
      <input type="checkbox" v-model="treasureRevealed" />
      Show <strong>the answer</strong>
    </label>
    <span v-show="treasureRevealed" class="answer">42</span>
    <!-- v-show -->

    <!-- v-if, v-else, v-else-if -->
    <!-- attaches/detaches the element from the DOM -->
    <hr />
    <h3><code>v-if, v-else, v-else-if</code></h3>

    <label>
      <input type="radio" name="indent" value="tabs" v-model="indent" />
      Tabs
    </label>

    <label>
      <input type="radio" name="indent" value="spaces" v-model="indent" />
      Spaces
    </label>

    <br />
    <br />

    <span id="no-answer" v-if="!indent" class="answer">Pick one</span>
    <span id="tabs-answer" v-else-if="indent == 'tabs'" class="answer">
      Okay, okay... cool cool cool cool cool
    </span>
    <span id="spaces-answer" v-else class="answer"> No judging here 👀 </span>
    <!-- v-if, v-else, v-else-if -->

    <!-- v-bind -->
    <!-- you can `bind` HTML attributes -->
    <!-- to turn them into dynamic values -->
    <hr />
    <h3><code>v-bind</code></h3>
    <span v-bind:class="{ colored: indent == 'spaces' }"
      >Color me surprised</span
    >
    <br />
    <!-- alternative syntax for v-bind -->
    <span :class="{ colored: indent != 'spaces' }"
      >Or ... color me instead</span
    >
    <br />
    <br />
    <button :disabled="treasureRevealed">Click me if you can</button>
    <!-- v-bind -->

    <!-- v-on -->
    <!-- used to listen to native or synthetic events -->
    <hr />
    <h2><code>v-on</code></h2>
    <button class="off-limits" type="button" v-on:click="showMessage">
      Don't push!
    </button>

    <!-- alternative syntax for event binding -->
    <button class="off-limits" type="button" @click="showMessage">
      Me neither!
    </button>
    <!-- v-on -->
  </div>
</template>

<style>
:root {
  --primary: #41b883;
  --secondary: #34495e;
}

body {
  background-color: whitesmoke;
  color: var(--secondary);
  font-family: sans-serif;
  padding: 10px;
}

h1 {
  margin: 0 auto;
  width: 80%;
  text-align: center;
}

h2,
h3 {
  color: var(--primary);
}

#my-app {
  width: 80%;
  margin: 0 auto;
}

input[type='text'] {
  color: var(--secondary);
  font-size: 1em;
  min-width: 250px;
  background: transparent;
  margin-bottom: 20px;
}

.answer {
  color: var(--primary);
}

.colored {
  background-color: var(--secondary);
  color: var(--primary);
}

hr {
  border: 1px solid var(--secondary);
  margin-top: 20px;
}

.off-limits {
  background: tomato;
  width: 100px;
  height: 100px;
  color: whitesmoke;
  font-weight: bold;
}
</style>
