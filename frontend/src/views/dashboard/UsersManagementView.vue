<!-- Author: Juan Pablo Aveldaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import UiModalComponent from '@components/ui/UiModalComponent.vue';
import type { UserInterface } from '@interfaces/UserInterface';
import { UserService } from '@services/UserService';
import UsersManagementFormSection from '@components/usersManagement/UsersManagementFormSectionComponent.vue';
import UsersManagementTableSection from '@components/usersManagement/UsersManagementTableSectionComponent.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Plus, Shield } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const users = ref<UserInterface[]>([]);
const isModalOpen = ref(false);
const editingUser = ref<UserInterface | null>(null);
const successMessage = ref('');
const errorMessages = ref<string[]>([]);
const formErrorMessages = ref<string[]>([]);

// -------------------------------
// Functions
// -------------------------------
async function loadData(): Promise<void> {
  try {
    users.value = await UserService.getAll();
  } catch (error) {
    if (Array.isArray(error)) {
      errorMessages.value = error as string[];
    } else {
      errorMessages.value = ['An unknown error occurred'];
    }
  }
}

function showSuccess(message: string): void {
  errorMessages.value = [];
  formErrorMessages.value = [];
  successMessage.value = message;
  setTimeout(() => (successMessage.value = ''), 3000);
}

function showError(messages: string[]): void {
  successMessage.value = '';
  formErrorMessages.value = messages;
}

function openModal(user?: UserInterface): void {
  editingUser.value = user ?? null;
  formErrorMessages.value = [];
  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingUser.value = null;
  formErrorMessages.value = [];
}

async function handleCreate(payload: CreateUserDTO): Promise<void> {
  try {
    await UserService.create(payload);
    showSuccess('User created successfully');
    await loadData();
    closeModal();
  } catch (error) {
    if (Array.isArray(error)) {
      showError(error as string[]);
    } else {
      showError(['An unknown error occurred']);
    }
  }
}

async function handleUpdate(payload: EditUserDTO): Promise<void> {
  if (!editingUser.value) return;

  try {
    await UserService.update(editingUser.value.id, payload);
    showSuccess('User updated successfully');
    await loadData();
    closeModal();
  } catch (error) {
    if (Array.isArray(error)) {
      showError(error as string[]);
    } else {
      showError(['An unknown error occurred']);
    }
  }
}

async function handleDelete(user: UserInterface): Promise<void> {
  if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
    try {
      await UserService.delete(user.id);
      await loadData();
      showSuccess('User deleted successfully');
    } catch (error) {
      if (Array.isArray(error)) {
        showError(error as string[]);
      } else {
        showError(['An unknown error occurred']);
      }
    }
  }
}

// -------------------------------
// Watchers / Lifecycle
// -------------------------------
onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl text-foreground mb-2 flex items-center gap-3">
          <Shield class="w-8 h-8 text-primary" />
          User Management
        </h1>
        <p class="text-muted-foreground">Manage system users</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        @click="openModal()"
      >
        <Plus class="w-5 h-5" />
        Add User
      </button>
    </div>

    <!-- Success Feedback -->
    <div v-if="successMessage" class="mt-4 mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
      {{ successMessage }}
    </div>

    <!-- Error Feedback -->
    <div v-if="errorMessages.length" class="mt-4 mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <ul class="list-disc pl-5">
        <li v-for="message in errorMessages" :key="message">{{ message }}</li>
      </ul>
    </div>

    <!-- Users Table -->
    <UsersManagementTableSection :users="users" @edit="openModal" @delete="handleDelete" />

    <!-- Create/Edit Modal -->
    <UiModalComponent :is-open="isModalOpen" :title="editingUser ? 'Edit User' : 'Add User'" @close="closeModal">
      <UsersManagementFormSection
        :user="editingUser"
        :error-messages="formErrorMessages"
        @create="handleCreate"
        @edit="handleUpdate"
        @cancel="closeModal"
      />
    </UiModalComponent>
  </div>
</template>
