<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
import StatusChangeStats from '@components/dashboard/statusChange/StatusChangeStatsComponent.vue';
import StatusChangeFilters from '@components/dashboard/statusChange/StatusChangeFiltersComponent.vue';
import StatusChangeTable from '@components/dashboard/statusChange/StatusChangeTableComponent.vue';
import { StatusChangeService } from '@services/StatusChangeService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';
import { History } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const statusChangeService = StatusChangeService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const statusChanges = ref<StatusChangeInterface[]>([]);
const selectedComputerId = ref<number | 'all'>('all');
const selectedOldStatus = ref<string>('all');
const selectedStatus = ref<string>('all');

// -------------------------------
// Computed
// -------------------------------
const filteredStatusChanges = computed(() => {
  return statusChanges.value.filter((statusChange) => {
    const matchesComputer = selectedComputerId.value === 'all' || statusChange.computerId === selectedComputerId.value;
    const matchesOldStatus = selectedOldStatus.value === 'all' || statusChange.previousStatus === selectedOldStatus.value;
    const matchesStatus = selectedStatus.value === 'all' || statusChange.newStatus === selectedStatus.value;
    return matchesComputer && matchesOldStatus && matchesStatus;
  });
});

const statusChangeStats = computed(() => ({
  total: filteredStatusChanges.value.length,
  toActive: filteredStatusChanges.value.filter((c) => c.newStatus === 'active').length,
  toMaintenance: filteredStatusChanges.value.filter((c) => c.newStatus === 'maintenance').length,
  toInactive: filteredStatusChanges.value.filter((c) => c.newStatus === 'inactive').length,
}));

// -------------------------------
// Functions
// -------------------------------
function loadData(): void {
  computers.value = computerService.getAll();
  statusChanges.value = statusChangeService.getAll();
}

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-8">
      <History class="w-8 h-8 text-primary" />
      <div>
        <h1 class="text-3xl text-foreground mb-2">Status Change History</h1>
        <p class="text-muted-foreground">Complete record of all computer status changes</p>
      </div>
    </div>

    <StatusChangeFilters
      :computers="computers"
      :selected-computer-id="selectedComputerId"
      :selected-old-status="selectedOldStatus"
      :selected-status="selectedStatus"
      @update:selected-computer-id="selectedComputerId = $event"
      @update:selected-old-status="selectedOldStatus = $event"
      @update:selected-status="selectedStatus = $event"
    />

    <StatusChangeStats :stats="statusChangeStats" />

    <StatusChangeTable :computers="computers" :status-changes="filteredStatusChanges" />
  </div>
</template>
