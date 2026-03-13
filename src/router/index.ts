// -------------------------------
// Own Imports
// -------------------------------
import LoginView from '@views/LoginView.vue';
import RegisterView from '@views/RegisterView.vue';
import DashboardView from '@views/DashboardView.vue';
import PCsView from '@views/PCsView.vue';
import ComponentsView from '@views/ComponentsView.vue';

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
    meta: { layout: 'auth', title: 'PC Manager', subtitle: 'TI Devices Management' },
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth', title: 'Create an account', subtitle: 'Complete this form to register' },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { layout: 'main', title: 'Dashboard', subtitle: 'Overview of your devices' },
  },
  {
    path: '/pcs',
    name: 'pcs',
    component: PCsView,
    meta: { layout: 'main', title: 'PCs', subtitle: 'Gestiona tus equipos' },
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView,
    meta: { layout: 'main', title: 'Componentes', subtitle: 'Gestiona los componentes' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
