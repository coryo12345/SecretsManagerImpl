<script setup lang="ts">
import AppLayout from './components/AppLayout.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<style lang="scss">
:root {
  --top-padding: 60px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: var(--top-padding);
  min-height: 100%;
}

.v-application__wrap {
  min-height: calc(100vh - 60px);
}

html,
body {
  height: 100%;
}
</style>
