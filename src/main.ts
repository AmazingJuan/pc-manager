// -------------------------------
// Own Imports
// -------------------------------
import '@assets/main.css';
import App from '@/App.vue';
import router from '@/router';
import { ServiceInitializer } from '@bootstrap/ServiceInitializer';

// -------------------------------
// Third-Party Imports
// -------------------------------
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);

// He we use a third party pinia plugin to use localStorage persistence.
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

ServiceInitializer.initialize();

app.mount('#app');
