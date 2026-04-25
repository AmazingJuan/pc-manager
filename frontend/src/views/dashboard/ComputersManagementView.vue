<!-- Author: Juan Pablo Aveldaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerService } from '@services/ComputerService';
import ComputersManagementFormSection from '@components/computersManagement/ComputersManagementFormSectionComponent.vue';
import ComputersManagementTableSection from '@components/computersManagement/ComputersManagementTableSectionComponent.vue';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import UiModalComponent from '@components/ui/UiModalComponent.vue';
import type { UserInterface } from '@interfaces/UserInterface';
import { UserService } from '@services/UserService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Plus } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';

// -------------------------------
// Non Reactive Variables
// -------------------------------
let successTimeout: ReturnType<typeof setTimeout> | null = null;

// -------------------------------
// Reactive Variables / Computed
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

async function loadData(): Promise<void> {
  computers.value = ComputerService.getAll();
  users.value = await UserService.getAll();
  components.value = ComponentService.getAll();
}

async function handleCreate(payload: CreateComputerDTO): Promise<void> {
  ComputerService.create(payload);
  showSuccess('Computer created successfully');

  await loadData();
  closeModal();
}

async function handleUpdate(payload: EditComputerDTO): Promise<void> {
  if (!editingComputer.value) {
    return;
  }

  ComputerService.update(editingComputer.value.id, payload);
  showSuccess('Computer updated successfully');
  await loadData();
  closeModal();
}

async function handleDelete(computer: ComputerInterface): Promise<void> {
  if (window.confirm(`Are you sure you want to delete computer "${computer.name}"?`)) {
    ComputerService.delete(computer.id);
    await loadData();
    showSuccess('Computer deleted successfully');
  }
}

function openModal(computer?: ComputerInterface): void {
  if (computer) {
    editingComputer.value = computer;
  } else {
    editingComputer.value = null;
  }

  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingComputer.value = null;
}

// -------------------------------
// Watchers / Lifecycle
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
    <div v-if="successMessage" class="mt-4 mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
      {{ successMessage }}
    </div>

    <!-- Computers Table -->
    <ComputersManagementTableSection :computers="computers" :users="users" @edit="openModal" @delete="handleDelete" />

    <!-- Create/Edit Modal -->
    <UiModalComponent :is-open="isModalOpen" :title="editingComputer ? 'Edit Computer' : 'Add Computer'" max-width="max-w-3xl" @close="closeModal">
      <ComputersManagementFormSection
        :computer="editingComputer"
        :users="users"
        :components="components"
        @create="handleCreate"
        @edit="handleUpdate"
        @cancel="closeModal"
      />
    </UiModalComponent>
  </div>
</template>
