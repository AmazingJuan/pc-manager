<script setup lang="ts">
// Author: Juan Manuel Zapata
// -------------------------------
// Own Imports
// -------------------------------
import ComponentForm from '@components/dashboard/components/ComponentFormComponent.vue';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';
import ComponentTable from '@components/dashboard/components/ComponentTableComponent.vue';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
import ModalComponent from '@components/dashboard/ModalComponent.vue';

// -------------------------------
// Third Party Imports
// -------------------------------
import { onMounted, onUnmounted, ref } from 'vue';
import { Plus } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const componentService = ComponentService.getInstance();
let successTimeout: ReturnType<typeof setTimeout> | null = null;

// -------------------------------
// Reactive Variables
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const editingComponent = ref<ComponentInterface | null>(null);
const isModalOpen = ref(false);
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
  components.value = componentService.getAll();
}

function handleCreate(payload: CreateComponentDTO): void {
  componentService.create(payload);

  showSuccess('Component created successfully');
  loadData();
  closeModal();
}

function handleUpdate(payload: EditComponentDTO): void {
  if (!editingComponent.value) {
    return;
  }

  componentService.update(editingComponent.value.id, payload);

  showSuccess('Component updated successfully');
  loadData();
  closeModal();
}

function handleDelete(component: ComponentInterface): void {
  if (window.confirm(`Are you sure you want to delete component "${component.name}"?`)) {
    componentService.delete(component.id);
    loadData();
    showSuccess('Component deleted successfully');
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
// Lifecycle Hooks
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
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        @click="openModal()"
      >
        <Plus class="w-5 h-5" />
        Add Component
      </button>
    </div>

    <!-- Success Feedback -->
    <div
      v-if="successMessage"
      class="mt-4 mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
    >
      {{ successMessage }}
    </div>

    <!-- Components Table -->
    <ComponentTable :components="components" @edit="openModal" @delete="handleDelete" />

    <!-- Create/Edit Modal -->
    <ModalComponent
      :is-open="isModalOpen"
      :title="editingComponent ? 'Edit Component' : 'Add Component'"
      max-width="max-w-4xl"
      @close="closeModal"
    >
      <ComponentForm
        :component="editingComponent"
        @create="handleCreate"
        @edit="handleUpdate"
        @cancel="closeModal"
      />
    </ModalComponent>
  </div>
</template>
