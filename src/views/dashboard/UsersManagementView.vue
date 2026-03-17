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
// Services
// -------------------------------
const userService = UserService.getInstance();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const users = ref<UserInterface[]>([]);
const isModalOpen = ref(false);
const editingUser = ref<UserInterface | null>(null);
const successMessage = ref('');

// -------------------------------
// Functions
// -------------------------------
function loadData(): void {
  users.value = userService.getAll();
}

function showSuccess(message: string): void {
  successMessage.value = message;
  setTimeout(() => (successMessage.value = ''), 3000);
}

function openModal(user?: UserInterface): void {
  editingUser.value = user ?? null;
  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingUser.value = null;
}

function handleCreate(payload: CreateUserDTO): void {
  userService.create(payload);
  showSuccess('User created successfully');
  loadData();
  closeModal();
}

function handleUpdate(payload: EditUserDTO): void {
  if (!editingUser.value) return;
  userService.update(editingUser.value.id, payload);
  showSuccess('User updated successfully');
  loadData();
  closeModal();
}

function handleDelete(user: UserInterface): void {
  if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
    userService.delete(user.id);
    loadData();
    showSuccess('User deleted successfully');
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

    <!-- Users Table -->
    <UsersManagementTableSection :users="users" @edit="openModal" @delete="handleDelete" />

    <!-- Create/Edit Modal -->
    <UiModalComponent :is-open="isModalOpen" :title="editingUser ? 'Edit User' : 'Add User'" @close="closeModal">
      <UsersManagementFormSection :user="editingUser" @create="handleCreate" @edit="handleUpdate" @cancel="closeModal" />
    </UiModalComponent>
  </div>
</template>
