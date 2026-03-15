<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import Sidebar from '@components/navigation/SidebarComponent.vue';
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar Navigation -->
    <Sidebar />

    <!-- Main Route Content -->
    <main class="flex-1 p-6 lg:p-8 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
