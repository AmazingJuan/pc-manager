<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import ComputersStatusBarChart from '@components/dashboard/charts/ComputersStatusBarChart.vue';
import ComputersByLocationBarChart from '@components/inventory/charts/ComputersByLocationBarChart.vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
}

defineProps<Props>();
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ComputersStatusBarChart :computers="computers" />
    <ComputersByLocationBarChart :computers="computers" />
  </section>
</template>
