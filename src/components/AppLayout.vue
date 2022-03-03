<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { State } from '../store';
import GlobalSnackbar from './GlobalSnackbar.vue';
const store = useStore<State>();

const drawer = ref(true);
const title = computed(() => store.state.title);
const items = ref([
  { title: 'Home', icon: '', to: '/' },
  { title: 'Secrets', icon: '', to: '/secrets' },
  { title: 'Account', icon: '', to: '/account' },
]);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app :clipped-left="true" color="primary">
      <v-app-bar-nav-icon
        class="bg-background text-primary"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title class="text-left" v-text="title" />
    </v-app-bar>
    <v-main class="pt-4">
      <slot></slot>
      <global-snackbar />
      <v-footer :absolute="true" class="bg-primary full-width" :bottom="true">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-list div.v-list-item .v-list-item-title {
  font-weight: bold;
}

.full-width {
  width: 100%;
}
</style>
