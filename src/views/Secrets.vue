<script setup lang="ts">
import { computed, ref } from 'vue';
import supabase from '../plugins/supabase';

const email = ref('');
const password = ref('');
const user = computed(() => supabase.auth.user());

async function signUp() {
  const { user, session, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  console.log(user, session, error);
}
</script>

<template>
  <v-container>
    <v-card class="pa-4">
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
      <v-btn color="secondary" text-color="background" class="mx-1"
        >Login</v-btn
      >
    </v-card>
    <v-card class="mt-6 pa-4">
      <span>
        {{ user }}
      </span>
    </v-card>
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

/* .textfield:focus {
  outline: none;
} */
</style>
