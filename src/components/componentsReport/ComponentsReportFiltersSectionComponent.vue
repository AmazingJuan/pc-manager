<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentType } from '@app-types/Components';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Filter, X } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  availableTypes: string[];
  selectedType: string;
  selectedStatus: ComponentType | 'all';
  fromDate: string;
  toDate: string;
  filteredCount: number;
  totalCount: number;
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  'update:selectedType': [value: string];
  'update:selectedStatus': [value: ComponentType | 'all'];
  'update:fromDate': [value: string];
  'update:toDate': [value: string];
  'clear-filters': [];
}>();

// -------------------------------
// Functions
// -------------------------------
function handleTypeChange(event: Event): void {
  emit('update:selectedType', (event.target as HTMLSelectElement).value);
}

function handleStatusFilterChange(event: Event): void {
  emit('update:selectedStatus', (event.target as HTMLSelectElement).value as ComponentType | 'all');
}

function handleFromDateChange(event: Event): void {
  emit('update:fromDate', (event.target as HTMLInputElement).value);
}

function handleToDateChange(event: Event): void {
  emit('update:toDate', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-5 mb-6">
    <p class="text-sm font-medium text-primary mb-4 flex items-center gap-2"><Filter class="w-4 h-4" /> Filters</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div>
        <label class="block text-xs text-muted-foreground mb-1">Component Type</label>
        <select
          :value="props.selectedType"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleTypeChange"
        >
          <option value="all">All</option>
          <option v-for="type in props.availableTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs text-muted-foreground mb-1">Status</label>
        <select
          :value="props.selectedStatus"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleStatusFilterChange"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="in-use">In Use</option>
          <option value="maintenance">Maintenance</option>
          <option value="damaged">Damaged</option>
        </select>
      </div>
      <div>
        <label class="block text-xs text-muted-foreground mb-1">From</label>
        <input
          :value="props.fromDate"
          type="date"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @input="handleFromDateChange"
        />
      </div>
      <div>
        <label class="block text-xs text-muted-foreground mb-1">To</label>
        <input
          :value="props.toDate"
          type="date"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @input="handleToDateChange"
        />
      </div>
    </div>
    <div class="flex justify-between items-center">
      <button
        class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-muted/30 transition-colors"
        @click="emit('clear-filters')"
      >
        <X class="w-4 h-4" /> Clear Filters
      </button>
      <span class="text-xs text-muted-foreground"> Showing {{ props.filteredCount }} of {{ props.totalCount }} components </span>
    </div>
  </div>
</template>
