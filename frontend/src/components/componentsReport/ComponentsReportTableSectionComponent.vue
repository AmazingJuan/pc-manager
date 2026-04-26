<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { BadgeUtils } from '@utils/BadgeUtils';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { FormatUtils } from '@utils/FormatUtils';

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
  /** Full inventory size (before filters) — used to choose the empty message */
  totalInInventory: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-border bg-card">
    <div class="p-5 border-b border-border">
      <h2 class="text-base font-medium text-foreground">Filtered Results</h2>
    </div>

    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-border bg-card text-muted-foreground">
          <th class="text-left px-4 py-3 font-medium">Name</th>
          <th class="text-left px-4 py-3 font-medium">Type</th>
          <th class="text-left px-4 py-3 font-medium">Manufacturer</th>
          <th class="text-left px-4 py-3 font-medium">Status</th>
          <th class="text-left px-4 py-3 font-medium">Price</th>
          <th class="text-left px-4 py-3 font-medium">Purchase Date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!props.components.length">
          <td colspan="6" class="px-4 py-8 text-center text-muted-foreground max-w-prose mx-auto">
            <template v-if="props.totalInInventory === 0">No components in the system yet. Add one from the components management page.</template>
            <template v-else>No components match the current filters. Try clearing or adjusting them.</template>
          </td>
        </tr>
        <tr
          v-for="component in props.components"
          v-else
          :key="component.id"
          class="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
        >
          <td class="px-4 py-3 text-foreground">{{ component.name }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ component.type }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ component.manufacturer }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs border" :class="BadgeUtils.getBadgeClass('component', component.status)">
              {{ BadgeUtils.getBadgeLabel('component', component.status) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">{{ FormatUtils.formatCurrency(component.price) }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ FormatUtils.formatDate(component.purchaseDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
