<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { Formatter } from '@utils/Formatter';
import { BadgeUtils } from '@utils/BadgeUtils';

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
            <span class="px-2 py-1 rounded text-xs border" :class="BadgeUtils.getBadgeClass('component', component.status)">
              {{ BadgeUtils.getBadgeLabel('component', component.status) }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm">
            {{ Formatter.formatDate(component.purchaseDate) }}
          </td>
          <td class="px-6 py-4 text-sm">{{ Formatter.formatCurrency(component.price) }}</td>
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
