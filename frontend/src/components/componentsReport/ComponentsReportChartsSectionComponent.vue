<!-- Author: Andru Yohanes Quiroz -->
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
  loading?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    v-if="props.loading"
    class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
    aria-busy="true"
  >
    <div class="h-[22rem] rounded-xl border border-border bg-card animate-pulse" />
    <div class="h-[22rem] rounded-xl border border-border bg-card animate-pulse" />
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <ComponentsTypeCountChartComponent :components="components" />
    <ComponentsAveragePriceChartComponent :components="components" />
  </div>
</template>
