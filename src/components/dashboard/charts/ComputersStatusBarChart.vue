<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartOptions } from 'chart.js';
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

// -------------------------------
// Computed Variables
// -------------------------------
const chartData = computed(() => ({
  labels: ['Active', 'Inactive', 'Maintenance'],
  datasets: [
    {
      label: 'Count',
      data: [
        props.computers.filter((computer) => computer.status === 'active').length,
        props.computers.filter((computer) => computer.status === 'inactive').length,
        props.computers.filter((computer) => computer.status === 'maintenance').length,
      ],
      backgroundColor: '#dc2626',
      borderRadius: 8,
      barThickness: 45,
    },
  ],
}));

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1a1a1a',
      borderColor: '#2a2a2a',
      borderWidth: 1,
      padding: 12,
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#a3a3a3',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#2a2a2a',
      },
      ticks: {
        color: '#a3a3a3',
        stepSize: 1,
      },
    },
  },
};
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold mb-6">Computers by Status</h2>
    <div class="h-75">
      <Bar :data="chartData" :options="options" />
    </div>
  </div>
</template>
