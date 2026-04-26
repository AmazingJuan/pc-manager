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

router.beforeEach(async (to) => {
  const hasToken = AuthService.hasAccessToken();
  const requiresAuth = Boolean(to.meta.requiresAuth || to.meta.admin);
  const guestOnly = Boolean(to.meta.guestOnly);
  const needsAdmin = Boolean(to.meta.admin);

  if (requiresAuth) {
    if (!hasToken) {
      return { name: 'login' };
    }
    let user = AuthService.getCachedLoggedInUser();
    if (!user) {
      try {
        user = await AuthService.getLoggedInUser();
      } catch {
        AuthService.logout();
        return { name: 'login' };
      }
    }
    if (needsAdmin && user?.role !== 'admin') {
      return { name: 'dashboard' };
    }
    return true;
  }

  if (guestOnly && hasToken) {
    const cached = AuthService.getCachedLoggedInUser();
    if (cached) {
      return { name: 'dashboard' };
    }
    try {
      const user = await AuthService.getLoggedInUser();
      if (user) {
        return { name: 'dashboard' };
      }
    } catch {
      AuthService.logout();
    }
  }

  return true;
});

export default router;
