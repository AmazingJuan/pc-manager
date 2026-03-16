<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ChartsSectionComponent from '@components/dashboard/sections/ChartsSectionComponent.vue';
import StatsSection from '@components/dashboard/sections/StatsSectionComponent.vue';
import SummarySection from '@components/dashboard/sections/SummarySectionComponent.vue';
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import { UserService } from '@services/UserService';

// -------------------------------
// Third Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const componentService = ComponentService.getInstance();
const userService = UserService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref(computerService.getAll());
const components = ref(componentService.getAll());
const users = ref(userService.getAll());

const stats = computed(() => ({
  totalComputers: computers.value.length,
  activeComputers: computers.value.filter((computer) => computer.status === 'active').length,
  maintenanceComputers: computers.value.filter((computer) => computer.status === 'maintenance').length,
  totalComponents: components.value.length,
  availableComponents: components.value.filter((component) => component.status === 'available').length,
  totalUsers: users.value.length,
}));

// -------------------------------
// Functions
// -------------------------------
function loadData(): void {
  computers.value = computerService.getAll();
  components.value = componentService.getAll();
  users.value = userService.getAll();
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
    <StatsSection :stats="stats" />

    <!-- Charts -->
    <ChartsSectionComponent :computers="computers" :components="components" />

    <!-- System summary section -->
    <SummarySection :stats="stats" />
  </div>
</template>
