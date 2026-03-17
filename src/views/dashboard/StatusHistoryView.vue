<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
import ComputerStatusHistoryStatsSection from '@components/computerStatusHistory/ComputerStatusHistoryStatsSectionComponent.vue';
import ComputerStatusHistoryFiltersSection from '@components/computerStatusHistory/ComputerStatusHistoryFiltersSectionComponent.vue';
import ComputerStatusHistoryTableSection from '@components/computerStatusHistory/ComputerStatusHistoryTableSectionComponent.vue';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';
import { History } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const computerStatusHistoryService = ComputerStatusHistoryService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const computerStatusHistoryEntries = ref<ComputerStatusHistoryInterface[]>([]);
const selectedComputerId = ref<number | 'all'>('all');
const selectedOldStatus = ref<string>('all');
const selectedStatus = ref<string>('all');

// -------------------------------
// Computed
// -------------------------------
const filteredComputerStatusHistoryEntries = computed(() => {
  return computerStatusHistoryEntries.value.filter((historyEntry) => {
    const matchesComputer = selectedComputerId.value === 'all' || historyEntry.computerId === selectedComputerId.value;
    const matchesOldStatus = selectedOldStatus.value === 'all' || historyEntry.previousStatus === selectedOldStatus.value;
    const matchesStatus = selectedStatus.value === 'all' || historyEntry.newStatus === selectedStatus.value;
    return matchesComputer && matchesOldStatus && matchesStatus;
  });
});

const computerStatusHistoryStats = computed(() => ({
  total: filteredComputerStatusHistoryEntries.value.length,
  toActive: filteredComputerStatusHistoryEntries.value.filter((entry) => entry.newStatus === 'active').length,
  toMaintenance: filteredComputerStatusHistoryEntries.value.filter((entry) => entry.newStatus === 'maintenance').length,
  toInactive: filteredComputerStatusHistoryEntries.value.filter((entry) => entry.newStatus === 'inactive').length,
}));

// -------------------------------
// Functions
// -------------------------------
function loadData(): void {
  computers.value = computerService.getAll();
  computerStatusHistoryEntries.value = computerStatusHistoryService.getAll();
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
        <h1 class="text-3xl text-foreground mb-2">Computer Status History</h1>
        <p class="text-muted-foreground">Complete record of all computer status history entries</p>
      </div>
    </div>

    <ComputerStatusHistoryFiltersSection
      :computers="computers"
      :selected-computer-id="selectedComputerId"
      :selected-old-status="selectedOldStatus"
      :selected-status="selectedStatus"
      @update:selected-computer-id="selectedComputerId = $event"
      @update:selected-old-status="selectedOldStatus = $event"
      @update:selected-status="selectedStatus = $event"
    />

    <ComputerStatusHistoryStatsSection :stats="computerStatusHistoryStats" />

    <ComputerStatusHistoryTableSection :computers="computers" :computer-status-history-entries="filteredComputerStatusHistoryEntries" />
  </div>
</template>
