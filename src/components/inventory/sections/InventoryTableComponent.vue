<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@/types/Computer';
import { Formatter } from '@utils/Formatter';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  getUserName: (userId: number) => string;
}

const props = defineProps<Props>();

// -------------------------------
// Functions
// -------------------------------
function formatStatus(status: ComputerStatus): string {
  const statusLabels: Record<ComputerStatus, string> = { active: 'Active', inactive: 'Inactive', maintenance: 'Maintenance' };

  return statusLabels[status];
}

function getStatusClasses(status: ComputerStatus): string {
  const statusClasses: Record<ComputerStatus, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    maintenance: 'bg-yellow-500/20 text-yellow-400',
    inactive: 'bg-muted text-muted-foreground',
  };

  return statusClasses[status];
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card">
    <div class="p-5 border-b border-border">
      <h2 class="text-base font-medium text-foreground">Computer List</h2>
    </div>
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-border text-muted-foreground">
          <th class="text-left px-4 py-3 font-medium">Name</th>
          <th class="text-left px-4 py-3 font-medium">Location</th>
          <th class="text-left px-4 py-3 font-medium">Assigned User</th>
          <th class="text-left px-4 py-3 font-medium">Status</th>
          <th class="text-left px-4 py-3 font-medium">Components</th>
          <th class="text-left px-4 py-3 font-medium">Warranty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!props.computers.length">
          <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">No computers found for the selected filters</td>
        </tr>
        <tr
          v-for="computer in props.computers"
          v-else
          :key="computer.id"
          class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
        >
          <td class="px-4 py-3 text-foreground">{{ computer.name }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ computer.location }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ props.getUserName(computer.userId) }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs" :class="getStatusClasses(computer.status)">
              {{ formatStatus(computer.status) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">{{ computer.componentIds.length }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ Formatter.dateToString(computer.warrantyExpirationDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
