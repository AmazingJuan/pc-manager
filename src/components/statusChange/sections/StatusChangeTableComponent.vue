<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
import { Formatter } from '@utils/Formatter';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { History } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  statusChanges: StatusChangeInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Functions
// -------------------------------
function getComputerName(computerId: number): string {
  return props.computers.find((computer) => computer.id === computerId)?.name ?? `Computer #${computerId}`;
}

function formatStatus(status: string): string {
  const statusLabels: Record<string, string> = { active: 'Active', maintenance: 'Maintenance', inactive: 'Inactive' };

  return statusLabels[status] ?? status;
}

function getStatusBadgeClass(status: string): string {
  if (status === 'active') {
    return 'bg-green-500/10 text-green-500 border-green-500/20';
  }

  if (status === 'inactive') {
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }

  return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card">
    <div v-if="props.statusChanges.length === 0" class="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <History class="w-12 h-12 mb-4 opacity-30" />
      <p class="text-base">No status changes recorded</p>
      <p class="text-sm opacity-60">Status changes will appear here when you modify a Computer status</p>
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
          v-for="statusChange in props.statusChanges"
          :key="statusChange.id"
          class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
        >
          <td class="px-4 py-3 text-foreground">{{ getComputerName(statusChange.computerId) }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="getStatusBadgeClass(statusChange.previousStatus)">
              {{ formatStatus(statusChange.previousStatus) }}
            </span>
          </td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="getStatusBadgeClass(statusChange.newStatus)">
              {{ formatStatus(statusChange.newStatus) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">
            {{ Formatter.formatDate(statusChange.changedAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
