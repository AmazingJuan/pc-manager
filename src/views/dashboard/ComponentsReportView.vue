<script setup lang="ts">
// Author: Andru Yohanes Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import type { ComponentType } from '@app-types/Components';
import ComponentsReportChartsSection from '@components/componentsReport/ComponentsReportChartsSectionComponent.vue';
import ComponentsReportFiltersSection from '@components/componentsReport/ComponentsReportFiltersSectionComponent.vue';
import ComponentsReportTableSection from '@components/componentsReport/ComponentsReportTableSectionComponent.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Services
// -------------------------------
const componentService = ComponentService.getInstance();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const selectedType = ref<string>('all');
const selectedStatus = ref<ComponentType | 'all'>('all');
const fromDate = ref<string>('');
const toDate = ref<string>('');
const filteredComponents = computed(() =>
  componentService.filterComponents(components.value, {
    type: selectedType.value,
    status: selectedStatus.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
  }),
);
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

    <ComponentsReportFiltersSection
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

    <ComponentsReportChartsSection :components="components" />

    <ComponentsReportTableSection :components="filteredComponents" />
  </div>
</template>
