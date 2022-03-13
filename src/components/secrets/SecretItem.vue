<script setup lang="ts">
import Secret from '../../types/Secret';
import { deleteSecret } from '../../utils/services';

const props = defineProps<{
  secret: Secret;
}>();

const emit = defineEmits(['refresh']);

async function del() {
  // await deleteSecret(props.secret);
  await deleteSecret({ group_id: 1, name: 'aaaa', value: 'bbbb' });
  emit('refresh');
}
</script>

<template>
  <div class="d-flex justify-space-between">
    <p class="font-weight-bold">{{ props.secret.name }}</p>
    <span class="d-flex">
      <p class="mx-2">{{ props.secret.value }}</p>
      <v-btn
        size="x-small"
        class="delete-btn my-auto"
        icon
        color="secondary"
        variant="outlined"
        @click="del"
        >x</v-btn
      >
    </span>
  </div>
  <hr class="mb-3 mt-1" />
</template>

<style scoped>
.partial-row {
  max-width: calc(100% - 1em);
}
.delete-btn {
  width: 1em;
  height: 1em;
  font-size: 0.7em;
  padding: 0.7em;
}
</style>
