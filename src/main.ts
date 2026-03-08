// Own imports
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';
import './assets/main.css';

// Third-Party Imports
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
