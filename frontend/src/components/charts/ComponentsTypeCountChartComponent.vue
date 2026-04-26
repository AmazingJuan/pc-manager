<!-- Author: Juan Manuel Zapata -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { ChartUtils } from '@utils/ChartUtils';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import UiResourceEmptyStateComponent from '@components/ui/UiResourceEmptyStateComponent.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, type ChartData, Legend, LinearScale, Tooltip } from 'chart.js';
import { computed } from 'vue';
import { LayoutGrid } from 'lucide-vue-next';

// -------------------------------
// Setup / Library Configuration
// -------------------------------
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const isEmpty = computed(() => !props.components.length);
const chartData = computed<ChartData<'bar'>>(() => {
  const typeCounts = ComponentService.getCountByType(props.components);
  const labels = typeCounts.map((entry) => entry.type);
  const values = typeCounts.map((entry) => entry.count);

  return { labels, datasets: [ChartUtils.buildBarDataset('Count', values)] };
});
const chartOptions = ChartUtils.getBarChartOptions({
  animation: { duration: 1500, easing: 'easeOutQuart' },
  plugins: { legend: { display: false }, tooltip: { padding: 12 } },
  scales: {
    x: ChartUtils.getBaseAxisOptions({ grid: { display: false } }),
    y: ChartUtils.getBaseAxisOptions({ beginAtZero: true, ticks: { stepSize: 1 } }),
  },
});

// -------------------------------
// Functions
// -------------------------------

// -------------------------------
// Watchers / Lifecycle
// -------------------------------
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold mb-6">Components by Type</h2>
    <UiResourceEmptyStateComponent
      v-if="isEmpty"
      :icon="LayoutGrid"
      title="No components by type"
      description="Add components to see how many you have in each type."
    />
    <div v-else class="h-75">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
