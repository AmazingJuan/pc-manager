<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ComponentsStatusPieChartComponent from '@components/charts/ComponentsStatusPieChartComponent.vue';
import ComputersStatusBarChartComponent from '@components/charts/ComputersStatusBarChartComponent.vue';
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
    <ComputersStatusBarChartComponent :computers="computers" />
    <ComponentsStatusPieChartComponent :components="components" />
  </section>
</template>
