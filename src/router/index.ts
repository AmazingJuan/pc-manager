// Author: Juan Manuel Zapata & Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import ComponentsView from '@views/dashboard/ComponentsView.vue';
import ComputersView from '@views/dashboard/ComputersView.vue';
import IndexView from '@/views/dashboard/IndexView.vue';
import LoginView from '@views/auth/LoginView.vue';
import RegisterView from '@views/auth/RegisterView.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  { path: '/dashboard', name: 'dashboard', component: IndexView },
  { path: '/dashboard/computers', name: 'computers', component: ComputersView },
  { path: '/dashboard/components', name: 'components', component: ComponentsView },
  { path: '/dashboard/users', name: 'users', component: IndexView },
  { path: '/dashboard/log', name: 'computers-status-log', component: IndexView },
  { path: '/dashboard/reports', name: 'reports', component: IndexView },
  { path: '/dashboard/inventory', name: 'inventory', component: IndexView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Routes validation
router.beforeEach((to) => {
  const authService = AuthService.getInstance();
  const isAuthenticated = authService.hasLoggedInUser();
  const loggedInUser = authService.getLoggedInUser();
  const isAdmin = loggedInUser?.role === 'admin';

  const guestOnlyRouteNames = new Set(['login', 'register']);
  const adminOnlyRouteNames = new Set(['users', 'computers-status-log']);

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
