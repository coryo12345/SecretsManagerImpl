<script setup lang="ts">
import { computed, ref } from 'vue';
import Secret from '../../types/Secret';

const props = defineProps<{
  value: boolean;
  groupId: number;
}>();
const emit = defineEmits<{
  (e: 'update:value', value: boolean): void;
  (e: 'save', value: Secret): void;
}>();

const name = ref('');
const val = ref('');

const showValue = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit('update:value', val);
  },
});

function submit() {
  emit('save', { value: val.value, name: name.value, group_id: props.groupId });
  showValue.value = false;
  name.value = '';
  val.value = '';
}
</script>

<template>
  <v-dialog v-model="showValue">
    <v-card width="40em" class="pa-4">
      <v-card-title>Add Secret</v-card-title>
      <v-text-field v-model="name" class="mx-2" label="Secret name" />
      <v-text-field v-model="val" class="mx-2" label="Secret value" />
      <v-card-actions>
        <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
