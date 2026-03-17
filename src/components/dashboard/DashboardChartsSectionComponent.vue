<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import ComponentsStatusPieChartComponent from '@components/charts/ComponentsStatusPieChartComponent.vue';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import ComputersStatusBarChartComponent from '@components/charts/ComputersStatusBarChartComponent.vue';

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
