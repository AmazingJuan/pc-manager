// -------------------------------
// Own Imports
// -------------------------------
import App from '@/App.vue';
import { ServiceInitializer } from '@bootstrap/ServiceInitializer';
import router from '@/router';
import '@assets/main.css';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { configure } from 'vee-validate';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

configure({ validateOnBlur: false, validateOnChange: false, validateOnInput: false, validateOnModelUpdate: false });

// He we use a third party pinia plugin to use localStorage persistence.
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

ServiceInitializer.initialize();

app.mount('#app');
