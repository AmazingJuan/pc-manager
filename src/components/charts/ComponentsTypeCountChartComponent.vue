<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import { ChartUtils } from '@utils/ChartUtils';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartData } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

const props = defineProps<Props>();
const componentService = ComponentService.getInstance();

// -------------------------------
// Reactive variables
// -------------------------------
const chartData = computed<ChartData<'bar'>>(() => {
  const typeCounts = componentService.getCountByType(props.components);
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
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold mb-6">Components by Type</h2>
    <div class="h-75">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
