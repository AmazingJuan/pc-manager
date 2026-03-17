<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
import { FormatUtils } from '@/utils/FormatUtils';
import { BadgeUtils } from '@utils/BadgeUtils';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { History } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  computerStatusHistoryEntries: ComputerStatusHistoryInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Functions
// -------------------------------
function getComputerName(computerId: number): string {
  return props.computers.find((computer) => computer.id === computerId)?.name ?? `Computer #${computerId}`;
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card">
    <div v-if="props.computerStatusHistoryEntries.length === 0" class="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <History class="w-12 h-12 mb-4 opacity-30" />
      <p class="text-base">No computer status history entries recorded</p>
      <p class="text-sm opacity-60">Computer status history entries will appear here when you modify a Computer status</p>
    </div>

    <table v-else class="w-full text-sm">
      <thead>
        <tr class="border-b border-border text-muted-foreground">
          <th class="text-left px-4 py-3 font-medium">Computer</th>
          <th class="text-left px-4 py-3 font-medium">Previous Status</th>
          <th class="text-left px-4 py-3 font-medium">New Status</th>
          <th class="text-left px-4 py-3 font-medium">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="historyEntry in props.computerStatusHistoryEntries"
          :key="historyEntry.id"
          class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
        >
          <td class="px-4 py-3 text-foreground">{{ getComputerName(historyEntry.computerId) }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="BadgeUtils.getBadgeClass('computer', historyEntry.previousStatus)">
              {{ BadgeUtils.getBadgeLabel('computer', historyEntry.previousStatus) }}
            </span>
          </td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="BadgeUtils.getBadgeClass('computer', historyEntry.newStatus)">
              {{ BadgeUtils.getBadgeLabel('computer', historyEntry.newStatus) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">
            {{ FormatUtils.formatDateTime(historyEntry.changedAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
