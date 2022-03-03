<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import supabase from '../plugins/supabase';
import SnackbarMessage from '../types/SnackbarMessage';
import { routes, actions } from '../utils/constants';
import { isNil } from '../utils/utils';

const router = useRouter();
const store = useStore();

const email = ref('');
const password = ref('');

function refreshPage() {
  router.go(0);
}

async function signUp() {
  const { error, session } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (isNil(error) && !isNil(session)) {
    refreshPage();
  } else {
    const msg: SnackbarMessage = {
      type: 'error',
      message: 'There was a problem signing you up.',
    };
    store.dispatch(actions.snackbar.add, msg);
  }
}

async function signIn() {
  const { error, session } = await supabase.auth.signIn({
    email: email.value,
    password: password.value,
  });
  if (isNil(error) && !isNil(session)) {
    refreshPage();
  } else if (isNil(session)) {
    const msg: SnackbarMessage = {
      type: 'error',
      message: 'We couldn\t sign you in. Check your email and password.',
    };
    store.dispatch(actions.snackbar.add, msg);
  } else {
    const msg: SnackbarMessage = {
      type: 'error',
      message: 'There was a problem signing you in.',
    };
    store.dispatch(actions.snackbar.add, msg);
  }
}
</script>

<template>
  <v-card class="pa-4 mx-auto">
    <v-card-title>Login</v-card-title>
    <div class="d-flex flex-column">
      <input
        v-model="email"
        type="text"
        placeholder="E-mail"
        class="textfield"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="textfield mb-4"
      />
    </div>
    <v-btn color="primary" class="mx-1" @click="signUp">Sign Up</v-btn>
    <v-btn
      color="secondary"
      text-color="background"
      class="mx-1"
      @click="signIn"
      >Sign In</v-btn
    >
  </v-card>
</template>

<style scoped>
.v-card {
  max-width: 30em;
}
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
