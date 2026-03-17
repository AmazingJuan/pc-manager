<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import { ChartUtils } from '@utils/ChartUtils';

// -------------------------------
// Third Party Imports
// -------------------------------
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { computed } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
}

const props = defineProps<Props>();
const computerService = ComputerService.getInstance();

const chartValues = computed(() => computerService.getCountByStatus(props.computers).map((entry) => entry.count));

// -------------------------------
// Computed Variables
// -------------------------------
const chartData = computed(() => ({
  labels: ['Active', 'Inactive', 'Maintenance'],
  datasets: [ChartUtils.buildBarDataset('Count', chartValues.value, { barThickness: 45 })],
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
    <h2 class="text-xl font-semibold mb-6">Computers by Status</h2>
    <div class="h-75">
      <Bar :data="chartData" :options="options" />
    </div>
  </div>
</template>
