import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Secrets from '../views/Secrets.vue';
import Account from '../views/Account.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/secrets',
    component: Secrets,
  },
  {
    path: '/account',
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
