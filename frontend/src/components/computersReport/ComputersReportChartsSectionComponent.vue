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
  loading?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <section v-if="props.loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-busy="true">
    <div class="h-[22rem] rounded-xl border border-border bg-card animate-pulse" />
    <div class="h-[22rem] rounded-xl border border-border bg-card animate-pulse" />
  </section>
  <section v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ComputersStatusBarChartComponent :computers="computers" />
    <ComputersByLocationBarChartComponent :computers="computers" />
  </section>
</template>
