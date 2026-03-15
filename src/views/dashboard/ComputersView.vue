<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import ComputerForm from '@components/dashboard/computers/ComputerFormComponent.vue';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { UserService } from '@services/UserService';

// -------------------------------
// Third Party Imports
// -------------------------------
import { onMounted, onUnmounted, ref } from 'vue';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const componentService = ComponentService.getInstance();
const userService = UserService.getInstance();

let successTimeout: ReturnType<typeof setTimeout> | null = null;

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const users = ref<UserInterface[]>([]);
const components = ref<ComponentInterface[]>([]);
const isModalOpen = ref(false);
const editingComputer = ref<ComputerInterface | null>(null);
const successMessage = ref('');

// -------------------------------
// Functions
// -------------------------------
function showSuccess(message: string): void {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }

  successMessage.value = message;
  successTimeout = setTimeout(() => {
    successMessage.value = '';
    successTimeout = null;
  }, 3000);
}

function loadData(): void {
  computers.value = computerService.getAll();
  users.value = userService.getAll();
  components.value = componentService.getAll();
}

function handleCreate(payload: CreateComputerDTO): void {
  computerService.create(payload);
  showSuccess('Computer created successfully');

  loadData();
  closeModal();
}

function handleUpdate(payload: EditComputerDTO): void {
  if (!editingComputer.value) {
    return;
  }

  computerService.update(editingComputer.value.id, payload);
  showSuccess('Computer updated successfully');
  loadData();
  closeModal();
}

function handleDelete(computer: ComputerInterface): void {
  if (window.confirm(`Are you sure you want to delete computer "${computer.name}"?`)) {
    computerService.delete(computer.id);
    loadData();
    showSuccess('Computer deleted successfully');
  }
}

function openModal(computer?: ComputerInterface): void {
  console.log('here');
  if (computer) {
    editingComputer.value = computer;
    console.log('here2');
  } else {
    editingComputer.value = null;
    console.log('here3');
  }

  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingComputer.value = null;
}

// -------------------------------
// Watchers
// -------------------------------

onUnmounted(() => {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }
});

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header and Main Action -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl text-foreground mb-2">Computer Management</h1>
        <p class="text-muted-foreground">Manage system equipment</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        @click="openModal()"
      >
        <Plus class="w-5 h-5" />
        Add Computer
      </button>
    </div>

    <!-- Success Feedback -->
    <div
      v-if="successMessage"
      class="mt-4 mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
    >
      {{ successMessage }}
    </div>

    <!-- Computers Table -->
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
                    : (users.find((currentUser) => currentUser.id === computer.userId)?.username ??
                      'User not found')
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
                  @click="openModal(computer)"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  title="Delete"
                  @click="handleDelete(computer)"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-3xl bg-card rounded-lg border border-border p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-xl text-foreground mb-4">
          {{ editingComputer ? 'Edit Computer' : 'Add Computer' }}
        </h2>
        <ComputerForm
          :computer="editingComputer"
          :users="users"
          :components="components"
          @create="handleCreate"
          @edit="handleUpdate"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>
