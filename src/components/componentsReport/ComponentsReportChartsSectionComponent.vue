<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import ComponentsAveragePriceChartComponent from '@components/charts/ComponentsAveragePriceChartComponent.vue';
import ComponentsTypeCountChartComponent from '@components/charts/ComponentsTypeCountChartComponent.vue';
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
    <ComponentsTypeCountChartComponent :components="components" />
    <ComponentsAveragePriceChartComponent :components="components" />
  </div>
</template>
