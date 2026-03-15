<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Pencil, Trash2 } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computers: ComputerInterface[];
  users: UserInterface[];
}

defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  edit: [computer: ComputerInterface];
  delete: [computer: ComputerInterface];
}>();
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-border">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border bg-card">
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Name</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Location</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Assigned User</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Status</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Components</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!computers.length">
          <td colspan="6" class="px-6 py-8 text-center text-muted-foreground">
            No computers registered
          </td>
        </tr>
        <tr
          v-for="computer in computers"
          v-else
          :key="computer.id"
          class="border-b border-border hover:bg-secondary/50 transition-colors"
        >
          <td class="px-6 py-4 text-sm">{{ computer.name }}</td>
          <td class="px-6 py-4 text-sm">{{ computer.location || '-' }}</td>
          <td class="px-6 py-4 text-sm">
            <span class="text-muted-foreground">
              {{
                !computer.userId
                  ? 'Unassigned'
                  : (users.find((u) => u.id === computer.userId)?.username ?? 'User not found')
              }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm">
            <span
              v-if="computer.status === 'active'"
              class="px-2 py-1 rounded text-xs border bg-green-500/10 text-green-500 border-green-500/20"
            >
              Active
            </span>
            <span
              v-else-if="computer.status === 'inactive'"
              class="px-2 py-1 rounded text-xs border bg-gray-500/10 text-gray-500 border-gray-500/20"
            >
              Inactive
            </span>
            <span
              v-else
              class="px-2 py-1 rounded text-xs border bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            >
              Maintenance
            </span>
          </td>
          <td class="px-6 py-4 text-sm">
            <span class="text-primary">
              {{ computer.componentIds.length }}
              {{ computer.componentIds.length === 1 ? 'component' : 'components' }}
            </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                title="Edit"
                @click="emit('edit', computer)"
              >
                <Pencil class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                title="Delete"
                @click="emit('delete', computer)"
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
