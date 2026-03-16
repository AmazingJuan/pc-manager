<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ArcElement, Chart as ChartJS, Legend, Tooltip, type ChartOptions } from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Non Reactive Variables
// -------------------------------
const COLORS = ['#10b981', '#6b7280', '#f59e0b'];

// -------------------------------
// Reactive Variables
// -------------------------------
const isChartReady = ref(false);

// -------------------------------
// Computed Variables
// -------------------------------
const chartLabels = computed(() => ['Activos', 'Inactivos', 'Mantenimiento']);

const chartValues = computed(() => [
  props.computers.filter((computer) => computer.status === 'active').length,
  props.computers.filter((computer) => computer.status === 'inactive').length,
  props.computers.filter((computer) => computer.status === 'maintenance').length,
]);

const chartData = computed(() => ({
  labels: chartLabels.value,
  datasets: [
    {
      data: isChartReady.value ? chartValues.value : chartLabels.value.map(() => 0),
      backgroundColor: COLORS,
      borderWidth: 0,
      hoverOffset: 15,
    },
  ],
}));

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { animateRotate: true, duration: 2000 },
  plugins: {
    legend: { position: 'right', labels: { color: '#a3a3a3', usePointStyle: true, padding: 20 } },
    tooltip: { backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', borderWidth: 1, titleColor: '#ffffff', bodyColor: '#ffffff' },
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
    <h2 class="text-xl font-semibold mb-6">PCs por Estado</h2>
    <div class="h-75">
      <Pie :data="chartData" :options="options" />
    </div>
  </div>
</template>
