<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Reactive variables
// -------------------------------
const chartData = computed<ChartData<'line'>>(() => {
  const totals = props.components.reduce<Record<string, { sum: number; count: number }>>((accumulator, component) => {
    const entry = accumulator[component.type];

    if (entry) {
      entry.sum += component.price;
      entry.count += 1;
    } else {
      accumulator[component.type] = { sum: component.price, count: 1 };
    }

    return accumulator;
  }, {});

  const labels = Object.keys(totals);
  const values = labels.map((label) => {
    const entry = totals[label];
    return entry ? Number((entry.sum / entry.count).toFixed(2)) : 0;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Average Price',
        data: values,
        borderColor: '#dc2626',
        backgroundColor: '#dc2626',
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
});

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { color: '#a3a3a3' }, grid: { color: '#2a2a2a' } },
    y: { ticks: { color: '#a3a3a3' }, grid: { color: '#2a2a2a' }, beginAtZero: true },
  },
  plugins: {
    legend: { labels: { color: '#a3a3a3' } },
    tooltip: {
      backgroundColor: '#1a1a1a',
      borderColor: '#2a2a2a',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      callbacks: {
        label(context) {
          const value = context.parsed.y;
          return `Average Price: $${value}`;
        },
      },
    },
  },
};
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-5">
    <h2 class="text-base font-medium text-foreground mb-4">Average Price by Type</h2>
    <div class="h-80">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
