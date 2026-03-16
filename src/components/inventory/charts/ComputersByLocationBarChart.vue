<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartOptions } from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Reactive Variables
// -------------------------------
const isChartReady = ref(false);

// -------------------------------
// Computed Variables
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
  datasets: [
    {
      label: 'Cantidad',
      data: isChartReady.value ? chartValues.value : chartLabels.value.map(() => 0),
      backgroundColor: '#dc2626',
      borderRadius: 8,
      barThickness: 45,
    },
  ],
}));

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1500, easing: 'easeOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', borderWidth: 1, padding: 12, titleColor: '#ffffff', bodyColor: '#ffffff' },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#a3a3a3' } },
    y: { beginAtZero: true, grid: { color: '#2a2a2a' }, ticks: { color: '#a3a3a3', stepSize: 1 } },
  },
};

// -------------------------------
// Lifecycle
// -------------------------------
onMounted(() => {
  requestAnimationFrame(() => {
    isChartReady.value = true;
  });
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
