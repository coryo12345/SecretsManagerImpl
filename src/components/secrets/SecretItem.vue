<script setup lang="ts">
import Secret from '../../types/Secret';

const props = defineProps<{
  secret: Secret;
}>();
</script>

<template>
  <div class="d-flex justify-space-between">
    <p class="font-weight-bold">{{ secret.name }}</p>
    <p>{{ secret.value }}</p>
  </div>
  <hr class="mb-2" />
</template>
