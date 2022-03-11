<script setup lang="ts">
import Secret from '../../types/Secret';
import { addSecret } from '../../utils/services';
import SecretItem from './SecretItem.vue';
import SecretDialog from './SecretDialog.vue';
import { ref } from 'vue';
import SecretGroup from '../../types/SecretGroup';

const props = defineProps<{
  group: SecretGroup;
  secrets: Secret[];
}>();
const emit = defineEmits(['refresh']);

const showForm = ref(false);

async function _addSecret(val: Secret) {
  await addSecret({
    name: val.name,
    group_id: props.group.id,
    value: val.value,
  });
  emit('refresh');
}
</script>

<template>
  <v-expansion-panels class="my-4">
    <v-expansion-panel bg-color="background">
      <v-expansion-panel-title color="secondary">
        {{ props.group.name }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <secret-item v-for="(secret, idx) in props.secrets" :secret="secret" />
        <v-btn color="secondary" size="x-small" icon @click="showForm = true">
          +
        </v-btn>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <secret-dialog
    :value="showForm"
    :group-id="props.group.id"
    @update:value="
      (val) => {
        showForm = val;
      }
    "
    @save="_addSecret"
  />
</template>

<style scoped>
.v-expansion-panel-text {
  background-color: var(--v-theme-background);
}
</style>
