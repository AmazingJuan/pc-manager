<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@app-types/Computer';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Filter, X } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  users: UserInterface[];
  searchQuery: string;
  selectedStatus: ComputerStatus | 'all';
  selectedUserId: number | 'all';
  filteredCount: number;
  totalCount: number;
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  'update:searchQuery': [value: string];
  'update:selectedStatus': [value: ComputerStatus | 'all'];
  'update:selectedUserId': [value: number | 'all'];
  'clear-filters': [];
}>();

// -------------------------------
// Functions
// -------------------------------
function handleSearchInput(event: Event): void {
  emit('update:searchQuery', (event.target as HTMLInputElement).value);
}

function handleStatusFilterChange(event: Event): void {
  emit('update:selectedStatus', (event.target as HTMLSelectElement).value as ComputerStatus | 'all');
}

function handleUserChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;

  emit('update:selectedUserId', selectedValue === 'all' ? 'all' : Number(selectedValue));
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-5">
    <p class="text-sm font-medium text-primary mb-4 flex items-center gap-2"><Filter class="w-4 h-4" /> Filters</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block text-xs text-muted-foreground mb-1">Search</label>
        <input
          :value="props.searchQuery"
          type="text"
          placeholder="Search by name or location..."
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground"
          @input="handleSearchInput"
        />
      </div>
      <div>
        <label class="block text-xs text-muted-foreground mb-1">Status</label>
        <select
          :value="props.selectedStatus"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleStatusFilterChange"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      <div>
        <label class="block text-xs text-muted-foreground mb-1">User</label>
        <select
          :value="props.selectedUserId"
          class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          @change="handleUserChange"
        >
          <option value="all">All</option>
          <option v-for="user in props.users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <button
        class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-muted/30 transition-colors"
        @click="emit('clear-filters')"
      >
        <X class="w-4 h-4" /> Clear Filters
      </button>
      <span class="text-xs text-muted-foreground"> Showing {{ props.filteredCount }} of {{ props.totalCount }} computers </span>
    </div>
  </div>
</template>
