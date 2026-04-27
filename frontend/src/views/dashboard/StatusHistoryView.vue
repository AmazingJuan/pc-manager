<!-- Author: Andru Yohanes Quiroz -->
<script setup lang="ts">
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
// Reactive Variables / Computed
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const computerStatusHistoryEntries = ref<ComputerStatusHistoryInterface[]>([]);
const selectedComputerId = ref<number | 'all'>('all');
const selectedOldStatus = ref<ComputerStatus | 'all'>('all');
const selectedStatus = ref<ComputerStatus | 'all'>('all');
const filteredComputerStatusHistoryEntries = computed(() => {
  return ComputerStatusHistoryService.filterHistoryEntries(computerStatusHistoryEntries.value, {
    computerId: selectedComputerId.value,
    previousStatus: selectedOldStatus.value,
    newStatus: selectedStatus.value,
  });
});
const computerStatusHistoryStats = computed(() => ComputerStatusHistoryService.getStatusChangeStats(filteredComputerStatusHistoryEntries.value));

// -------------------------------
// Functions
// -------------------------------
async function loadData(): Promise<void> {
  computers.value = await ComputerService.getAll();
  computerStatusHistoryEntries.value = await ComputerStatusHistoryService.getAll();
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
