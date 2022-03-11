<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { routes } from '../utils/constants';
import { isNil } from '../utils/utils';
import supabase from '../plugins/supabase';
import SecretsGroupDialog from '../components/secrets/SecretsGroupDialog.vue';
import SecretsGroupPanel from '../components/secrets/SecretsGroupPanel.vue';
import { fetchSecrets, addSecretGroup } from '../utils/services';
import FullSecret from '../types/FullSecret';

const router = useRouter();

const secrets: Ref<FullSecret[]> = ref([]);
const showAddGroupForm = ref(false);

async function addGroup(name: string) {
  const group = { user_id: supabase.auth.user().id, name };
  await addSecretGroup(group);
  getSecrets();
}

async function getSecrets() {
  secrets.value = await fetchSecrets();
}

onMounted(() => {
  // go to account page if not logged in
  const session = supabase.auth.session();
  if (isNil(session)) {
    router.push(routes.account);
  }

  // fetch secrets
  getSecrets();
});
</script>

<template>
  <v-container>
    <h1>My Secrets</h1>
    <div v-for="(secret, idx) in secrets" :key="idx">
      <secrets-group-panel
        :group="secret.group"
        :secrets="secret.secrets"
        @refresh="getSecrets"
      />
    </div>
    <v-btn
      color="primary"
      min-width="20em"
      class="mt-2"
      @click="showAddGroupForm = true"
      >Add Group +</v-btn
    >
  </v-container>
  <secrets-group-dialog
    :value="showAddGroupForm"
    @update:value="
      (val) => {
        showAddGroupForm = val;
      }
    "
    @save="addGroup"
  />
</template>
