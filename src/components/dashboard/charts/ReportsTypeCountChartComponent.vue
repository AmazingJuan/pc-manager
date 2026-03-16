<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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
const chartData = computed<ChartData<'bar'>>(() => {
  const typeCounts = props.components.reduce<Record<string, number>>((counts, component) => {
    const count = counts[component.type];
    counts[component.type] = count !== undefined ? count + 1 : 1;
    return counts;
  }, {});

  const labels = Object.keys(typeCounts);
  const values = Object.values(typeCounts);

  return { labels, datasets: [{ label: 'Count', data: values, backgroundColor: '#dc2626', borderRadius: 8 }] };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { color: '#a3a3a3' }, grid: { color: '#2a2a2a' } },
    y: { ticks: { color: '#a3a3a3' }, grid: { color: '#2a2a2a' }, beginAtZero: true },
  },
  plugins: {
    legend: { labels: { color: '#a3a3a3' } },
    tooltip: { backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', borderWidth: 1, titleColor: '#ffffff', bodyColor: '#ffffff' },
  },
};
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-5">
    <h2 class="text-base font-medium text-foreground mb-4">Components by Type</h2>
    <div class="h-80">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
