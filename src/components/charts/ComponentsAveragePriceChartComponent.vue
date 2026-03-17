<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { ChartUtils } from '@utils/ChartUtils';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { CategoryScale, Chart as ChartJS, type ChartData, Legend, LinearScale, LineElement, PointElement, Tooltip, type TooltipItem } from 'chart.js';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';

// -------------------------------
// Setup / Library Configuration
// -------------------------------
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Services
// -------------------------------
const componentService = ComponentService.getInstance();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const chartData = computed<ChartData<'line'>>(() => {
  const averages = componentService.getAveragePriceByType(props.components);
  const labels = averages.map((entry) => entry.type);
  const values = averages.map((entry) => entry.averagePrice);

  return { labels, datasets: [ChartUtils.buildLineDataset('Average Price', values)] };
});

const chartOptions = ChartUtils.getLineChartOptions({
  animation: { duration: 1500, easing: 'easeOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: {
      padding: 12,
      callbacks: {
        label(context: TooltipItem<'line'>) {
          const value = context.parsed.y;
          return `Average Price: $${value}`;
        },
      },
    },
  },
  scales: { x: ChartUtils.getBaseAxisOptions({ grid: { display: false } }), y: ChartUtils.getBaseAxisOptions({ beginAtZero: true }) },
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
    <h2 class="text-xl font-semibold mb-6">Average Price by Type</h2>
    <div class="h-75">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
