<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';
import { BadgeUtils } from '@utils/BadgeUtils';
import { FormatUtils } from '@/utils/FormatUtils';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Pencil, Shield, Trash2 } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  users: UserInterface[];
}

defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{ edit: [user: UserInterface]; delete: [user: UserInterface] }>();
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-border">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border bg-card">
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Name</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Username</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Email</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Role</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Registered</th>
          <th class="px-6 py-4 text-left text-sm text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!users.length">
          <td colspan="6" class="px-6 py-8 text-center text-muted-foreground">No users registered</td>
        </tr>
        <tr v-for="user in users" v-else :key="user.id" class="border-b border-border hover:bg-secondary/50 transition-colors">
          <td class="px-6 py-4 text-sm">{{ user.name }}</td>
          <td class="px-6 py-4 text-sm">{{ user.username }}</td>
          <td class="px-6 py-4 text-sm">{{ user.email }}</td>
          <td class="px-6 py-4 text-sm">
            <span class="px-2 py-1 rounded text-xs border flex items-center gap-1 w-fit" :class="BadgeUtils.getBadgeClass('user', user.role)">
              <Shield v-if="user.role === 'admin'" class="w-3 h-3" />
              {{ BadgeUtils.getBadgeLabel('user', user.role) }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-muted-foreground">{{ FormatUtils.formatDate(user.createdAt) }}</td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                title="Edit"
                @click="emit('edit', user)"
              >
                <Pencil class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                title="Delete"
                @click="emit('delete', user)"
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
