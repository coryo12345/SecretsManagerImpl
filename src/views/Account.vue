<script setup lang="ts">
import { computed, ref } from 'vue';
import supabase from '../plugins/supabase';
import LoginCard from '../components/LoginCard.vue';
import { isNil } from '../utils/utils';
import { useRouter } from 'vue-router';
import { routes, actions } from '../utils/constants';
import { useStore } from 'vuex';
import { State } from '../store';
import SnackbarMessage from '../types/SnackbarMessage';

const router = useRouter();
const store = useStore<State>();

const secretsRoute = ref(routes.secrets);
const user = computed(() => supabase.auth.user());
const email = computed(() =>
  user.value.email && user.value.email.length ? user.value.email : 'None'
);
const phone = computed(() =>
  user.value.phone && user.value.phone.length ? user.value.phone : 'None'
);

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (isNil(error)) {
    router.push(routes.home);
  } else {
    const msg: SnackbarMessage = {
      type: 'error',
      message: 'We were unable to sign you out. Try again later.',
    };
    store.dispatch(actions.snackbar.add, msg);
  }
}
</script>

<template>
  <v-container>
    <v-card v-if="user" class="mt-6 mx-auto pa-4" max-width="40em">
      <v-card-title>My Account</v-card-title>
      <v-card-text>
        <div class="text-left">
          <p>Email: {{ email }}</p>
          <p>Phone: {{ phone }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :to="secretsRoute">View Secrets</v-btn>
        <v-btn color="secondary" @click="signOut">Sign Out</v-btn>
      </v-card-actions>
    </v-card>
    <login-card v-else />
  </v-container>
</template>
