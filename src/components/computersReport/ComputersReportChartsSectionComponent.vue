<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import ComputersByLocationBarChartComponent from '@components/charts/ComputersByLocationBarChartComponent.vue';
import ComputersStatusBarChartComponent from '@components/charts/ComputersStatusBarChartComponent.vue';

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
