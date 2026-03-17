<script setup lang="ts">
// Author: Andru Yohanes Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import type { ComputerStatus } from '@app-types/Computer';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import ComputerStatusHistoryFiltersSection from '@components/computerStatusHistory/ComputerStatusHistoryFiltersSectionComponent.vue';
import ComputerStatusHistoryStatsSection from '@components/computerStatusHistory/ComputerStatusHistoryStatsSectionComponent.vue';
import ComputerStatusHistoryTableSection from '@components/computerStatusHistory/ComputerStatusHistoryTableSectionComponent.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { History } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

// -------------------------------
// Services
// -------------------------------
const computerService = ComputerService.getInstance();
const computerStatusHistoryService = ComputerStatusHistoryService.getInstance();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const computerStatusHistoryEntries = ref<ComputerStatusHistoryInterface[]>([]);
const selectedComputerId = ref<number | 'all'>('all');
const selectedOldStatus = ref<ComputerStatus | 'all'>('all');
const selectedStatus = ref<ComputerStatus | 'all'>('all');
const filteredComputerStatusHistoryEntries = computed(() => {
  return computerStatusHistoryService.filterHistoryEntries(computerStatusHistoryEntries.value, {
    computerId: selectedComputerId.value,
    previousStatus: selectedOldStatus.value,
    newStatus: selectedStatus.value,
  });
});
const computerStatusHistoryStats = computed(() => computerStatusHistoryService.getStatusChangeStats(filteredComputerStatusHistoryEntries.value));

// -------------------------------
// Functions
// -------------------------------
function loadData(): void {
  computers.value = computerService.getAll();
  computerStatusHistoryEntries.value = computerStatusHistoryService.getAll();
}

// -------------------------------
// Watchers / Lifecycle
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
      @update:selected-old-status="selectedOldStatus = $event as ComputerStatus | 'all'"
      @update:selected-status="selectedStatus = $event as ComputerStatus | 'all'"
    />

    <ComputerStatusHistoryStatsSection :stats="computerStatusHistoryStats" />

    <ComputerStatusHistoryTableSection :computers="computers" :computer-status-history-entries="filteredComputerStatusHistoryEntries" />
  </div>
</template>
