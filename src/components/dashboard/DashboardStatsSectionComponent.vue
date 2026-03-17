<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import UiStatCardComponent from '@components/ui/UiStatCardComponent.vue';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Activity, AlertTriangle, Cpu, Monitor, TrendingUp, Users } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  stats: {
    totalComputers: number;
    activeComputers: number;
    maintenanceComputers: number;
    totalComponents: number;
    availableComponents: number;
    totalUsers: number;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UiStatCardComponent title="Total Computers" :value="props.stats.totalComputers" :icon="Monitor" color="primary" />
    <UiStatCardComponent title="Active Computers" :value="props.stats.activeComputers" :icon="Activity" color="success" />
    <UiStatCardComponent title="In Maintenance" :value="props.stats.maintenanceComputers" :icon="AlertTriangle" color="warning" />
    <UiStatCardComponent title="Total Components" :value="props.stats.totalComponents" :icon="Cpu" color="primary" />
    <UiStatCardComponent title="Available Components" :value="props.stats.availableComponents" :icon="TrendingUp" color="success" />
    <UiStatCardComponent title="Registered Users" :value="props.stats.totalUsers" :icon="Users" color="primary" />
  </section>
</template>
