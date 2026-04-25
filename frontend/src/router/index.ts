// Author: Juan Manuel Zapata, Juan Pablo Avendaño & Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import ComponentReportView from '@views/dashboard/ComponentsReportView.vue';
import ComponentsManagementView from '@views/dashboard/ComponentsManagementView.vue';
import ComputerReportView from '@views/dashboard/ComputersReportView.vue';
import ComputersManagementView from '@views/dashboard/ComputersManagementView.vue';
import IndexView from '@views/dashboard/IndexView.vue';
import LoginView from '@views/auth/LoginView.vue';
import RegisterView from '@views/auth/RegisterView.vue';
import StatusHistoryView from '@views/dashboard/StatusHistoryView.vue';
import UsersManagementView from '@views/dashboard/UsersManagementView.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Guest routes
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView, meta: { title: 'Computer Manager', subtitle: 'TI Devices Management', guestOnly: true } },

  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Create an account', subtitle: 'Complete this form to register', guestOnly: true },
  },

  // Routes that require login
  { path: '/dashboard', name: 'dashboard', component: IndexView, meta: { requiresAuth: true } },
  { path: '/dashboard/components/report', name: 'components-report', component: ComponentReportView, meta: { requiresAuth: true } },
  { path: '/dashboard/computers/report', name: 'computers-report', component: ComputerReportView, meta: { requiresAuth: true } },
  { path: '/dashboard/computers/status-history', name: 'computers-status-history', component: StatusHistoryView, meta: { requiresAuth: true } },

  // Admin only routes
  { path: '/dashboard/users', name: 'users', component: UsersManagementView, meta: { requiresAuth: true, admin: true } },
  { path: '/dashboard/computers', name: 'computers', component: ComputersManagementView, meta: { requiresAuth: true, admin: true } },
  { path: '/dashboard/components', name: 'components', component: ComponentsManagementView, meta: { requiresAuth: true, admin: true } },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

// Routes validation
router.beforeEach(async (to) => {
  const isAuthenticated = AuthService.hasLoggedInUser();
  let loggedInUser = AuthService.getCachedLoggedInUser();

  if (!loggedInUser && isAuthenticated && (to.meta.requiresAuth || to.meta.admin)) {
    loggedInUser = await AuthService.getLoggedInUser().catch(() => null);
  }

  const isAdmin = loggedInUser?.role === 'admin';

  if (!isAuthenticated && to.meta.requiresAuth) {
    return { name: 'login' };
  }

  if (isAuthenticated && to.meta.guestOnly) {
    return { name: 'dashboard' };
  }

  if (isAuthenticated && to.meta.admin && !isAdmin) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
