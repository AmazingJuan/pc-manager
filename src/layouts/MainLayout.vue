<!-- Author: Juan Manuel Zapata -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Monitor, Cpu, LayoutGrid } from 'lucide-vue-next';
import { RouterLink, RouterView } from 'vue-router';

const route = useRoute();

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/pcs', label: 'PCs', icon: Monitor },
  { to: '/components', label: 'Componentes', icon: Cpu },
];

const isActive = (to: string) => route.path === to;
</script>

<template>
  <div class="min-h-screen bg-background flex px-4 py-6 gap-6">
    <aside class="hidden md:flex flex-col w-72 bg-card border-r border-border p-6">
      <div class="mb-8">
        <div class="text-lg font-semibold text-foreground">PC Manager</div>
        <div class="text-xs text-muted-foreground">Panel de control</div>
      </div>

      <nav class="flex-1 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
          :class="{
            'bg-primary/10 text-primary': isActive(item.to),
            'text-foreground hover:bg-secondary/50': !isActive(item.to),
          }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80">
        <div class="text-sm text-muted-foreground">{{ route.meta.subtitle || route.meta.title }}</div>
        <div class="text-xs text-muted-foreground">{{ route.meta.title }}</div>
      </header>

      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

