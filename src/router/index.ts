// -------------------------------
// Own Imports
// -------------------------------
import LoginView from '@views/LoginView.vue';
import RegisterView from '@views/RegisterView.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'PC Manager', subtitle: 'TI Devices Management' },
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Create an account', subtitle: 'Complete this form to register' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
