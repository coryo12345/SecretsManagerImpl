import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import vuetify from './plugins/vuetify.js';
import { loadFonts } from './plugins/webfontloader';
import { store } from './store/index';

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);
app.mount('#app');
