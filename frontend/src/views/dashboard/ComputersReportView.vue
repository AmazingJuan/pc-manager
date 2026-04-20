<!-- Author: Andru Yohanes Quiroz -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import type { ComputerStatus } from '@app-types/Computer';
import ComputersReportChartsSection from '@components/computersReport/ComputersReportChartsSectionComponent.vue';
import ComputersReportFiltersSection from '@components/computersReport/ComputersReportFiltersSectionComponent.vue';
import ComputersReportTableSection from '@components/computersReport/ComputersReportTableSectionComponent.vue';
import type { UserInterface } from '@interfaces/UserInterface';
import { UserService } from '@services/UserService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Services
// -------------------------------
const computerService = ComputerService.getInstance();
const userService = UserService.getInstance();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const users = ref<UserInterface[]>([]);
const searchQuery = ref<string>('');
const selectedStatus = ref<ComputerStatus | 'all'>('all');
const selectedUserId = ref<number | 'all'>('all');
const filteredComputers = computed(() =>
  computerService.filterComputers(computers.value, { searchQuery: searchQuery.value, status: selectedStatus.value, userId: selectedUserId.value }),
);

// -------------------------------
// Functions
// -------------------------------
function getUserName(userId: number): string {
  return users.value.find((user) => user.id === userId)?.name ?? 'Sin asignar';
}

function clearFilters(): void {
  searchQuery.value = '';
  selectedStatus.value = 'all';
  selectedUserId.value = 'all';
}

function loadData(): void {
  computers.value = computerService.getAll();
  users.value = userService.getAll();
}

// -------------------------------
// Watchers / Lifecycle
// -------------------------------
onMounted(loadData);
</script>

<template>
  <div class="p-8 space-y-8 max-w-7xl mx-auto">
    <div>
      <h1 class="text-3xl text-foreground mb-2">Computers Reports</h1>
      <p class="text-muted-foreground">Management and analysis of computer inventory</p>
    </div>

    <ComputersReportFiltersSection
      :users="users"
      :search-query="searchQuery"
      :selected-status="selectedStatus"
      :selected-user-id="selectedUserId"
      :filtered-count="filteredComputers.length"
      :total-count="computers.length"
      @update:search-query="searchQuery = $event"
      @update:selected-status="selectedStatus = $event"
      @update:selected-user-id="selectedUserId = $event"
      @clear-filters="clearFilters"
    />

    <ComputersReportChartsSection :computers="computers" />

    <ComputersReportTableSection :computers="filteredComputers" :get-user-name="getUserName" />
  </div>
</template>
