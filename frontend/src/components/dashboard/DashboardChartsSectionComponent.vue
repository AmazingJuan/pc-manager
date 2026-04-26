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
  /** Avoid empty-state flash before data is loaded */
  loading?: boolean;
}

defineProps<Props>();
</script>

<template>
  <section v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-busy="true" aria-label="Loading charts">
    <div class="h-[22rem] rounded-xl border border-border bg-card shadow-sm animate-pulse" />
    <div class="h-[22rem] rounded-xl border border-border bg-card shadow-sm animate-pulse" />
  </section>
  <section v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ComputersStatusBarChartComponent :computers="computers" />
    <ComponentsStatusPieChartComponent :components="components" />
  </section>
</template>
