<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import ComponentsManagementFormSection from '@components/componentsManagement/ComponentsManagementFormSectionComponent.vue';
import ComponentsManagementTableSection from '@components/componentsManagement/ComponentsManagementTableSectionComponent.vue';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
import UiModalComponent from '@components/ui/UiModalComponent.vue';

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
const components = ref<ComponentInterface[]>([]);
const editingComponent = ref<ComponentInterface | null>(null);
const isModalOpen = ref(false);
const successMessage = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// -------------------------------
// Functions
// -------------------------------
function showSuccess(message: string): void {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }

  successMessage.value = message;
  errorMessage.value = '';
  successTimeout = setTimeout(() => {
    successMessage.value = '';
    successTimeout = null;
  }, 3000);
}

function showError(message: string): void {
  errorMessage.value = message;
  successMessage.value = '';
}

async function loadData(): Promise<void> {
  try {
    isLoading.value = true;
    components.value = await ComponentService.getAll();
    errorMessage.value = '';
  } catch (error) {
    console.error('Error loading components:', error);
    showError('Failed to load components. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

async function handleCreate(payload: CreateComponentDTO): Promise<void> {
  try {
    isLoading.value = true;
    await ComponentService.create(payload);
    showSuccess('Component created successfully');
    await loadData();
    closeModal();
  } catch (error) {
    console.error('Error creating component:', error);
    showError('Failed to create component. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

async function handleUpdate(payload: EditComponentDTO): Promise<void> {
  if (!editingComponent.value) {
    return;
  }

  try {
    isLoading.value = true;
    await ComponentService.update(editingComponent.value.id, payload);
    showSuccess('Component updated successfully');
    await loadData();
    closeModal();
  } catch (error) {
    console.error('Error updating component:', error);
    showError('Failed to update component. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

async function handleDelete(component: ComponentInterface): Promise<void> {
  if (window.confirm(`Are you sure you want to delete component "${component.name}"?`)) {
    try {
      isLoading.value = true;
      await ComponentService.delete(component.id);
      await loadData();
      showSuccess('Component deleted successfully');
    } catch (error) {
      console.error('Error deleting component:', error);
      showError('Failed to delete component. Please try again.');
    } finally {
      isLoading.value = false;
    }
  }
}

function openModal(component?: ComponentInterface): void {
  editingComponent.value = component ?? null;
  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingComponent.value = null;
}

// -------------------------------
// Watchers / Lifecycle
// -------------------------------
onUnmounted(() => {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }
});

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header and Main Action -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl text-foreground mb-2">Components Management</h1>
        <p class="text-muted-foreground">Manage inventory components</p>
      </div>
      <button
        :disabled="isLoading"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="openModal()"
      >
        <Plus class="w-5 h-5" />
        Add Component
      </button>
    </div>

    <!-- Error Feedback -->
    <div v-if="errorMessage" class="mt-4 mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {{ errorMessage }}
    </div>

    <!-- Success Feedback -->
    <div v-if="successMessage" class="mt-4 mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
      {{ successMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !components.length" class="mt-4 rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
      Loading components...
    </div>

    <!-- Components Table -->
    <ComponentsManagementTableSection v-else :components="components" @edit="openModal" @delete="handleDelete" />

    <!-- Create/Edit Modal -->
    <UiModalComponent :is-open="isModalOpen" :title="editingComponent ? 'Edit Component' : 'Add Component'" max-width="max-w-4xl" @close="closeModal">
      <ComponentsManagementFormSection :component="editingComponent" @create="handleCreate" @edit="handleUpdate" @cancel="closeModal" />
    </UiModalComponent>
  </div>
</template>
