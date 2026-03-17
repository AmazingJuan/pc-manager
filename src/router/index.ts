// Author: Juan Manuel Zapata, Juan Pablo Avendaño & Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import ComponentsManagementView from '@views/dashboard/ComponentsManagementView.vue';
import ComputersManagementView from '@views/dashboard/ComputersManagementView.vue';
import ComputerReportView from '@views/dashboard/ComputersReportView.vue';
import ComponentReportView from '@views/dashboard/ComponentsReportView.vue';
import IndexView from '@/views/dashboard/IndexView.vue';
import LoginView from '@views/auth/LoginView.vue';
import RegisterView from '@views/auth/RegisterView.vue';
import UsersManagementView from '@views/dashboard/UsersManagementView.vue';
import StatusHistoryView from '@views/dashboard/StatusHistoryView.vue';
// -------------------------------
// Third-Party Imports
// -------------------------------
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Guest routes
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView, meta: { title: 'Computer Manager', subtitle: 'TI Devices Management' } },

  { path: '/register', name: 'register', component: RegisterView, meta: { title: 'Create an account', subtitle: 'Complete this form to register' } },

  // Routes that require login
  { path: '/dashboard', name: 'dashboard', component: IndexView },
  { path: '/dashboard/components/report', name: 'components-report', component: ComponentReportView },
  { path: '/dashboard/computers/report', name: 'computers-report', component: ComputerReportView },
  { path: '/dashboard/computers/status-history', name: 'computers-status-history', component: StatusHistoryView },

  // Admin only routes
  { path: '/dashboard/users', name: 'users', component: UsersManagementView },
  { path: '/dashboard/computers', name: 'computers', component: ComputersManagementView },
  { path: '/dashboard/components', name: 'components', component: ComponentsManagementView },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

// Routes validation
router.beforeEach((to) => {
  const authService = AuthService.getInstance();
  const isAuthenticated = authService.hasLoggedInUser();
  const loggedInUser = authService.getLoggedInUser();
  const isAdmin = loggedInUser?.role === 'admin';

  const guestOnlyRouteNames = new Set(['login', 'register']);
  const adminOnlyRouteNames = new Set(['users', 'computers', 'components']);

  const isDashboardRoute = to.path.startsWith('/dashboard');
  const isGuestOnlyRoute = guestOnlyRouteNames.has(String(to.name ?? ''));
  const isAdminOnlyRoute = adminOnlyRouteNames.has(String(to.name ?? ''));

  // Not authenticated trying to access dashboard
  if (!isAuthenticated && isDashboardRoute) {
    return { name: 'login' };
  }

  // Authenticated trying to access guest-only routes
  if ((isAuthenticated && isGuestOnlyRoute) || (isAuthenticated && isAdminOnlyRoute && !isAdmin)) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
