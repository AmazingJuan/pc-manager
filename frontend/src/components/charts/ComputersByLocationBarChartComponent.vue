<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { ChartUtils } from '@utils/ChartUtils';
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { computed } from 'vue';

// -------------------------------
// Setup / Library Configuration
// -------------------------------
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const groupedByLocation = computed<Record<string, number>>(() => {
  return props.computers.reduce<Record<string, number>>((accumulator, computer) => {
    const key = computer.location || 'Unknown';
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
});
const chartLabels = computed(() => Object.keys(groupedByLocation.value));
const chartValues = computed(() => Object.values(groupedByLocation.value));
const chartData = computed(() => ({
  labels: chartLabels.value,
  datasets: [ChartUtils.buildBarDataset('Cantidad', chartValues.value, { barThickness: 45 })],
}));
const options = ChartUtils.getBarChartOptions({
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
    <h2 class="text-xl font-semibold mb-6">Computers by Location</h2>
    <div class="h-75">
      <Bar :data="chartData" :options="options" />
    </div>
  </div>
</template>
