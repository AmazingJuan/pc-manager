<!-- Author: Andru Yohanes Quiroz -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { BadgeUtils } from '@utils/BadgeUtils';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { FormatUtils } from '@utils/FormatUtils';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  getUserName: (userId: number) => string;
  totalInInventory: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="rounded-lg border border-border bg-card">
    <div class="p-5 border-b border-border">
      <h2 class="text-base font-medium text-foreground">Filtered results</h2>
    </div>
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-border text-muted-foreground">
          <th class="text-left px-4 py-3 font-medium">Name</th>
          <th class="text-left px-4 py-3 font-medium">Location</th>
          <th class="text-left px-4 py-3 font-medium">Assigned User</th>
          <th class="text-left px-4 py-3 font-medium">Status</th>
          <th class="text-left px-4 py-3 font-medium">Warranty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!props.computers.length">
          <td colspan="5" class="px-4 py-8 text-center text-muted-foreground max-w-prose mx-auto">
            <template v-if="props.totalInInventory === 0">No computers in the system yet. Add one from the computers management page.</template>
            <template v-else>No computers match the current filters. Try clearing or adjusting them.</template>
          </td>
        </tr>
        <tr
          v-for="computer in props.computers"
          v-else
          :key="computer.id"
          class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
        >
          <td class="px-4 py-3 text-foreground">{{ computer.name }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ computer.location }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ props.getUserName(computer.userId ?? 0) }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="BadgeUtils.getBadgeClass('computer', computer.status)">
              {{ BadgeUtils.getBadgeLabel('computer', computer.status) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">{{ FormatUtils.formatDate(computer.warrantyExpirationDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
