<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ComponentsAveragePriceChartComponent from '@components/charts/ComponentsAveragePriceChartComponent.vue';
import ComponentsReportTypeCountChartComponent from '@components/charts/ComponentsReportTypeCountChartComponent.vue';
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
    <ComponentsReportTypeCountChartComponent :components="components" />
    <ComponentsAveragePriceChartComponent :components="components" />
  </div>
</template>
