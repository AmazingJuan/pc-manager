<!-- Author: Andru Yohanes Quiroz -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  selectedComputerId: number | 'all';
  selectedOldStatus: string;
  selectedStatus: string;
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  'update:selectedComputerId': [value: number | 'all'];
  'update:selectedOldStatus': [value: string];
  'update:selectedStatus': [value: string];
}>();

// -------------------------------
// Functions
// -------------------------------
function handleComputerFilterChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;

  emit('update:selectedComputerId', selectedValue === 'all' ? 'all' : Number(selectedValue));
}

function handleStatusFilterChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;

  emit('update:selectedStatus', selectedValue);
}

function handleOldStatusFilterChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;

  emit('update:selectedOldStatus', selectedValue);
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-5 mb-6">
    <p class="text-sm text-muted-foreground mb-4">Filters</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm text-muted-foreground mb-1">Filter by Computer</label>
        <select
          :value="props.selectedComputerId"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleComputerFilterChange"
        >
          <option value="all">All Computers</option>
          <option v-for="computer in props.computers" :key="computer.id" :value="computer.id">
            {{ computer.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-muted-foreground mb-1">Filter by Old Status</label>
        <select
          :value="props.selectedOldStatus"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleOldStatusFilterChange"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-muted-foreground mb-1">Filter by New Status</label>
        <select
          :value="props.selectedStatus"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleStatusFilterChange"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
</template>
