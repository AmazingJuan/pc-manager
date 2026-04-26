<!-- Author: Juan Pablo Aveldaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import DashboardChartsSectionComponent from '@components/dashboard/DashboardChartsSectionComponent.vue';
import DashboardStatsSectionComponent from '@components/dashboard/DashboardStatsSectionComponent.vue';
import DashboardSummarySectionComponent from '@components/dashboard/DashboardSummarySectionComponent.vue';
import type { UserInterface } from '@interfaces/UserInterface';
import { UserService } from '@services/UserService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const components = ref<ComponentInterface[]>([]);
const users = ref<UserInterface[]>([]);
const isLoading = ref(true);
const stats = computed(() => ({
  totalComputers: computers.value.length,
  activeComputers: ComputerService.getStatusCount('active', computers.value),
  maintenanceComputers: ComputerService.getStatusCount('maintenance', computers.value),
  totalComponents: components.value.length,
  availableComponents: components.value.filter((component) => component.status === 'available').length,
  totalUsers: users.value.length,
}));

// -------------------------------
// Functions
// -------------------------------
async function loadData(): Promise<void> {
  isLoading.value = true;
  try {
    computers.value = ComputerService.getAll();
    components.value = await ComponentService.getAll();
    users.value = await UserService.getAll();
  } finally {
    isLoading.value = false;
  }
}

// -------------------------------
onMounted(loadData);
</script>

<template>
  <div class="p-8 space-y-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div>
      <h1 class="text-3xl text-foreground mb-2">Main Dashboard</h1>
      <p class="text-muted-foreground">General overview of the computer management system</p>
    </div>

    <!-- Stats -->
    <DashboardStatsSectionComponent :stats="stats" :loading="isLoading" />

    <!-- Charts -->
    <DashboardChartsSectionComponent :loading="isLoading" :computers="computers" :components="components" />

    <!-- System summary section -->
    <DashboardSummarySectionComponent :stats="stats" :loading="isLoading" />
  </div>
</template>
