<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { routes } from '../utils/constants';
import { isNil } from '../utils/utils';
import supabase from '../plugins/supabase';
import SecretGroup from '../types/SecretGroup';
import SecretsDialog from '../components/secrets/SecretsDialog.vue';

const router = useRouter();

const secrets: Ref<SecretGroup[]> = ref([]);
const showAddGroupForm = ref(false);

onMounted(() => {
  // go to account page if not logged in
  const session = supabase.auth.session();
  if (isNil(session)) {
    router.push(routes.account);
  }
});

function addGroup(name: string) {
  // TODO change
  secrets.value.push({ id: 0, user_id: 'a', name });
}
</script>

<template>
  <v-container>
    <h1>Secrets!</h1>
    <div v-for="(secretGroup, idx) in secrets" :key="idx">
      {{ secretGroup.name }}
    </div>
    <v-btn
      color="primary"
      min-width="20em"
      class="mt-2"
      @click="showAddGroupForm = true"
      >Add Group +</v-btn
    >
  </v-container>
  <secrets-dialog
    :value="showAddGroupForm"
    @update:value="
      (val) => {
        showAddGroupForm = val;
      }
    "
    @save="addGroup"
  />
</template>
