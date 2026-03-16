<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ReportsAveragePriceChartComponent from '../charts/ReportsAveragePriceChartComponent.vue';
import ReportsTypeCountChartComponent from '../charts/ReportsTypeCountChartComponent.vue';
import type { ComponentInterface } from '@interfaces/ComponentInterface';

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <ReportsTypeCountChartComponent :components="components" />
    <ReportsAveragePriceChartComponent :components="components" />
  </div>
</template>
