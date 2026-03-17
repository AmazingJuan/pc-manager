<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import ComputersStatusBarChartComponent from '@components/charts/ComputersStatusBarChartComponent.vue';
import ComputersByLocationBarChartComponent from '@components/charts/ComputersByLocationBarChartComponent.vue';

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
    <ComputersStatusBarChartComponent :computers="computers" />
    <ComputersByLocationBarChartComponent :computers="computers" />
  </section>
</template>
