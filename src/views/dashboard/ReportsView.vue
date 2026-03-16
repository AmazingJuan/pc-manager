<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@app-types/Components';
import { ComponentService } from '@services/ComponentService';
import ReportsChartsComponent from '@components/dashboard/reports/ReportsChartsComponent.vue';
import ReportsFiltersComponent from '@components/dashboard/reports/ReportsFiltersComponent.vue';
import ReportsTableComponent from '@components/dashboard/reports/ReportsTableComponent.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const componentService = ComponentService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const selectedType = ref<string>('all');
const selectedStatus = ref<ComponentType | 'all'>('all');
const fromDate = ref<string>('');
const toDate = ref<string>('');

// -------------------------------
// Computed
// -------------------------------
const filteredComponents = computed(() => {
  return components.value.filter((component) => {
    const matchesType = selectedType.value === 'all' || component.type === selectedType.value;
    const matchesStatus = selectedStatus.value === 'all' || component.status === selectedStatus.value;
    const matchesFrom = !fromDate.value || component.purchaseDate >= fromDate.value;
    const matchesTo = !toDate.value || component.purchaseDate <= toDate.value;
    return matchesType && matchesStatus && matchesFrom && matchesTo;
  });
});

const availableTypes = computed(() => {
  return [...new Set(components.value.map((component) => component.type))];
});

// -------------------------------
// Functions
// -------------------------------
function clearFilters(): void {
  selectedType.value = 'all';
  selectedStatus.value = 'all';
  fromDate.value = '';
  toDate.value = '';
}

function loadData(): void {
  components.value = componentService.getAll();
}

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl text-foreground mb-2">Component Reports</h1>
      <p class="text-muted-foreground">Inventory analysis and filtering</p>
    </div>

    <ReportsFiltersComponent
      :available-types="availableTypes"
      :selected-type="selectedType"
      :selected-status="selectedStatus"
      :from-date="fromDate"
      :to-date="toDate"
      :filtered-count="filteredComponents.length"
      :total-count="components.length"
      @update:selected-type="selectedType = $event"
      @update:selected-status="selectedStatus = $event"
      @update:from-date="fromDate = $event"
      @update:to-date="toDate = $event"
      @clear-filters="clearFilters"
    />

    <ReportsChartsComponent :components="components" />

    <ReportsTableComponent :components="filteredComponents" />
  </div>
</template>
