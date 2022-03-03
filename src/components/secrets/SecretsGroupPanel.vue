<script setup lang="ts">
import Secret from '../../types/Secret';

const props = defineProps<{
  name: string;
  secrets: Secret[];
}>();
</script>

<template>
  <v-expansion-panels class="my-4">
    <v-expansion-panel bg-color="background">
      <v-expansion-panel-title color="secondary">{{
        props.name
      }}</v-expansion-panel-title>
      <v-expansion-panel-text>{{ props.secrets }}</v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.v-expansion-panel-text {
  background-color: var(--v-theme-background);
}
</style>
