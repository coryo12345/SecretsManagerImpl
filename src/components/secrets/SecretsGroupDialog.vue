<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  value: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:value', value: boolean): void;
  (e: 'save', value: string): void;
}>();

const name = ref('');

const showValue = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit('update:value', val);
  },
});

function submit() {
  emit('save', name.value);
  showValue.value = false;
  name.value = '';
}
</script>

<template>
  <v-dialog v-model="showValue">
    <v-card width="40em" class="pa-4">
      <v-card-title>Add Secrets Group</v-card-title>
      <v-text-field v-model="name" class="mx-2" label="Group name" />
      <v-card-actions>
        <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
