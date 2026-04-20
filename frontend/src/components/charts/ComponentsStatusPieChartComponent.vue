<!-- Author: Juan Manuel Zapata -->
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
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';

// -------------------------------
// Setup / Library Configuration
// -------------------------------
ChartJS.register(ArcElement, Tooltip, Legend);

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
// Non-Reactive Variables
// -------------------------------
const COLORS = ['#dc2626', '#ef4444', '#f87171', '#fca5a5'];
const STATUS_LABELS = ['Available', 'In Use', 'Maintenance', 'Damaged'];

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const chartLabels = computed(() => STATUS_LABELS);
const chartValues = computed(() => componentService.getCountByStatus(props.components).map((entry) => entry.count));
const chartData = computed(() => ({ labels: chartLabels.value, datasets: [ChartUtils.buildPieDataset(chartValues.value, COLORS)] }));
const options = ChartUtils.getPieChartOptions({
  animation: { animateRotate: true, duration: 2000 },
  plugins: { legend: { position: 'right', labels: { usePointStyle: true, padding: 20 } } },
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
