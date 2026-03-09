// -------------------------------
// Own Imports
// -------------------------------
import LoginView from '@views/LoginView.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: 'PC Manager', subtitle: 'TI Devices Management' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
