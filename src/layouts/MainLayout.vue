<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import NavigationSidebarComponent from '@components/navigation/NavigationSidebarComponent.vue';
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar Navigation -->
    <NavigationSidebarComponent />

    <!-- Main Route Content -->
    <main class="flex-1 p-6 lg:p-8 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
