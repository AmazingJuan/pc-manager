<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@/types/Components';
import { Formatter } from '@utils/Formatter';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Pencil, Trash2 } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  components: ComponentInterface[];
}

defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{ edit: [component: ComponentInterface]; delete: [component: ComponentInterface] }>();

// -------------------------------
// Functions
// -------------------------------
function getStatusClasses(status: ComponentType): string {
  const colors: Record<ComponentType, string> = {
    available: 'bg-green-500/10 text-green-500 border-green-500/20',
    'in-use': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    maintenance: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    damaged: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return colors[status];
}

function getStatusLabel(status: ComponentType): string {
  const labels: Record<ComponentType, string> = { available: 'Available', 'in-use': 'In Use', maintenance: 'Maintenance', damaged: 'Damaged' };

  return labels[status];
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-border">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border bg-card">
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Name</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Type</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Manufacturer</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Model</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Status</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Purchase Date</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Price</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!components.length">
          <td colspan="8" class="px-6 py-8 text-center text-muted-foreground">No components registered</td>
        </tr>
        <tr v-for="component in components" v-else :key="component.id" class="border-b border-border hover:bg-secondary/50 transition-colors">
          <td class="px-6 py-4 text-sm">{{ component.name }}</td>
          <td class="px-6 py-4 text-sm">{{ component.type || '-' }}</td>
          <td class="px-6 py-4 text-sm">{{ component.manufacturer || '-' }}</td>
          <td class="px-6 py-4 text-sm">{{ component.model || '-' }}</td>
          <td class="px-6 py-4 text-sm">
            <span class="px-2 py-1 rounded text-xs border" :class="getStatusClasses(component.status)">
              {{ getStatusLabel(component.status) }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm">
            {{ component.purchaseDate ? Formatter.dateToString(new Date(component.purchaseDate)) : '-' }}
          </td>
          <td class="px-6 py-4 text-sm">${{ component.price.toFixed(2) }}</td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                title="Edit"
                @click="emit('edit', component)"
              >
                <Pencil class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                title="Delete"
                @click="emit('delete', component)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
