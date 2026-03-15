<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

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
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Non Reactive Variables
// -------------------------------
const COLORS = ['#dc2626', '#ef4444', '#f87171', '#fca5a5'];

// -------------------------------
// Reactive Variables
// -------------------------------
const isChartReady = ref(false);

const chartValues = computed(() => [
  props.components.filter((component) => component.status === 'available').length,
  props.components.filter((component) => component.status === 'in-use').length,
  props.components.filter((component) => component.status === 'maintenance').length,
  props.components.filter((component) => component.status === 'damaged').length,
]);

const chartData = computed(() => ({
  labels: ['Available', 'In Use', 'Maintenance', 'Damaged'],
  datasets: [
    {
      data: isChartReady.value ? chartValues.value : [0, 0, 0, 0],
      backgroundColor: COLORS,
      borderWidth: 0,
      hoverOffset: 15,
    },
  ],
}));

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: true,
    duration: 2000,
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#a3a3a3',
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: '#1a1a1a',
      borderColor: '#2a2a2a',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
    },
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
    <h2 class="text-xl font-semibold mb-6">Components by Status</h2>
    <div class="h-75">
      <Pie :data="chartData" :options="options" />
    </div>
  </div>
</template>
