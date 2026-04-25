<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import { useAuthStore } from '@stores/AuthStore';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { BarChart3, Cpu, History, LayoutDashboard, LogOut, Monitor, Package, Shield, Users } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// -------------------------------
// Services
// -------------------------------
const authService = AuthService.getInstance();

// -------------------------------
// Non-Reactive Variables
// -------------------------------
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const menuItems = [
  { name: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', admin: false },
  { name: 'computers', icon: Monitor, label: 'Computers Management', admin: true },

  { name: 'components', icon: Cpu, label: 'Components Management', admin: true },
  { name: 'users', icon: Users, label: 'Users Management', admin: true },
  { name: 'computers-report', icon: Package, label: 'Computers Report', admin: false },
  { name: 'computers-status-history', icon: History, label: 'Computers Status History', admin: false },
  { name: 'components-report', icon: BarChart3, label: 'Components Report', admin: false },
];

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const isAdmin = computed(() => user.value?.role === 'admin');
const user = computed(() => authStore.loggedInUser);

// -------------------------------
// Functions
// -------------------------------
function isActive(routeName: string): boolean {
  return String(route.name ?? '') === routeName;
}

function logout(): void {
  authService.logout();
  router.push({ name: 'login' });
}

// -------------------------------
// Watchers / Lifecycle
// -------------------------------
</script>

<template>
  <aside class="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
    <div class="p-6 border-b border-sidebar-border">
      <h1 class="text-2xl text-primary flex items-center gap-2">
        <Monitor class="w-8 h-8" />
        Computer Manager
      </h1>
      <p class="text-xs text-muted-foreground mt-1">IT equipment management</p>
    </div>

    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.name" v-show="!item.admin || isAdmin">
          <RouterLink
            :to="{ name: item.name }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            :class="
              isActive(item.name)
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            "
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm">{{ item.label }}</span>
            <Shield v-if="item.admin" class="w-4 h-4 ml-auto opacity-50" />
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-t border-sidebar-border">
      <div class="mb-3 px-4 py-3 bg-secondary rounded-lg">
        <p class="text-xs text-muted-foreground">User</p>
        <p class="text-sm text-foreground">{{ user?.username ?? 'Guest' }}</p>
        <p class="text-xs text-primary capitalize">{{ user?.role ?? 'guest' }}</p>
      </div>
      <button
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
        @click="logout"
      >
        <LogOut class="w-5 h-5" />
        <span class="text-sm">Sign out</span>
      </button>
    </div>
  </aside>
</template>
