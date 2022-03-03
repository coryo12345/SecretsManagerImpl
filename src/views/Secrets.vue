<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { routes } from '../utils/constants';
import { isNil } from '../utils/utils';
import supabase from '../plugins/supabase';

const router = useRouter();

onMounted(() => {
  // go to account page if not logged in
  const session = supabase.auth.session();
  if (isNil(session)) {
    router.push(routes.account);
  }
});
</script>

<template>
  <v-container>
    <h1>Secrets!</h1>
  </v-container>
</template>

<style scoped>
.textfield {
  background-color: rgb(var(--v-theme-secondary));
  padding: 6px;
  border-radius: 4px;
  display: flex;
  margin: 4px;
  outline: rgb(var(--v-theme-background));
  border: 1px solid rgb(var(--v-theme-background));
}
</style>
