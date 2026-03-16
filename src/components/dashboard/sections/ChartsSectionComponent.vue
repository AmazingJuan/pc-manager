<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ComponentsStatusPieChart from '@components/dashboard/charts/ComponentsStatusPieChart.vue';
import ComputersStatusBarChart from '@components/dashboard/charts/ComputersStatusBarChart.vue';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  components: ComponentInterface[];
}

defineProps<Props>();
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ComputersStatusBarChart :computers="computers" />
    <ComponentsStatusPieChart :components="components" />
  </section>
</template>
