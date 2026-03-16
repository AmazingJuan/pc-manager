<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@/types/Components';

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Functions
// -------------------------------
function formatStatus(status: ComponentType): string {
  const statusLabels: Record<ComponentType, string> = { available: 'Available', 'in-use': 'In Use', maintenance: 'Maintenance', damaged: 'Damaged' };

  return statusLabels[status];
}

function getStatusClass(status: ComponentType): string {
  const statusClassMap: Record<ComponentType, string> = {
    available: 'bg-green-500/10 text-green-500 border-green-500/20',
    'in-use': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    maintenance: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    damaged: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return statusClassMap[status];
}

function formatPurchaseDate(purchaseDate: string): string {
  return new Date(purchaseDate).toLocaleDateString('es-CO');
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
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
          <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">No components found for the selected filters</td>
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
            <span class="px-2 py-1 rounded text-xs border" :class="getStatusClass(component.status)">
              {{ formatStatus(component.status) }}
            </span>
          </td>
          <td class="px-4 py-3 text-muted-foreground">{{ formatPrice(component.price) }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ formatPurchaseDate(component.purchaseDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
