<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { State } from '../store';

const store = useStore<State>();

const messages = computed(() => store.state.snackbarMessages);
</script>

<template>
  <div class="snackbar">
    <div v-for="(message, idx) in messages" :key="idx">
      <v-alert
        :type="message.type"
        :title="message.title"
        outlined
        class="my-2 mx-auto snackbar-message"
      >
        {{ message.message }}
      </v-alert>
    </div>
  </div>
</template>

<style scoped>
.snackbar {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.snackbar-message {
  max-width: 35em;
  z-index: 1;
}
</style>
