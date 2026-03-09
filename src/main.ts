// -------------------------------
// Own Imports
// -------------------------------
import App from './App.vue';
import './assets/main.css';
import { ServiceInitializer } from './bootstrap/ServiceInitializer';
import router from './router';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

// He we use a third party pinia plugin to use localStorage persistence.
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

ServiceInitializer.initialize();

app.mount('#app');
