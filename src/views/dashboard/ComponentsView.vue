<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentService } from '@services/ComponentService';

// -------------------------------
// Third Party Imports
// -------------------------------
import { onMounted, onUnmounted, ref } from 'vue';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const componentService = ComponentService.getInstance();

let successTimeout: ReturnType<typeof setTimeout> | null = null;

// -------------------------------
// Reactive Variables
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const isModalOpen = ref(false);
const editingComponent = ref<ComponentInterface | null>(null);
const form = ref({ name: '', status: 'available' as ComponentInterface['status'] });
const successMessage = ref('');

const statusOptions: Array<{ value: ComponentInterface['status']; label: string }> = [
  { value: 'available', label: 'Available' },
  { value: 'in-use', label: 'In Use' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'damaged', label: 'Damaged' },
];

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

function resetForm(): void {
  form.value.name = '';
  form.value.status = 'available';
}

function handleCreate(): void {
  if (!form.value.name.trim()) {
    return;
  }

  componentService.create({
    name: form.value.name.trim(),
    status: form.value.status,
  });

  showSuccess('Component created successfully');
  loadData();
  closeModal();
}

function handleUpdate(): void {
  if (!editingComponent.value || !form.value.name.trim()) {
    return;
  }

  componentService.update(editingComponent.value.id, {
    name: form.value.name.trim(),
    status: form.value.status,
  });

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
  if (component) {
    editingComponent.value = component;
    form.value.name = component.name;
    form.value.status = component.status;
  } else {
    editingComponent.value = null;
    resetForm();
  }

  isModalOpen.value = true;
}

function closeModal(): void {
  isModalOpen.value = false;
  editingComponent.value = null;
  resetForm();
}

// -------------------------------
// Lifecycle Hooks
// -------------------------------
onMounted(loadData);

onUnmounted(() => {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }
});
</script>

<template>
  <div class="p-8">
    <!-- Header and Main Action -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl text-foreground mb-2">Components</h1>
        <p class="text-muted-foreground">Manage the components inventory</p>
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
    <div class="overflow-x-auto rounded-lg border border-border">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border bg-card">
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Name</th>
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Status</th>
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!components.length">
            <td colspan="3" class="px-6 py-8 text-center text-muted-foreground">
              No components registered
            </td>
          </tr>
          <tr
            v-for="component in components"
            v-else
            :key="component.id"
            class="border-b border-border hover:bg-secondary/50 transition-colors"
          >
            <td class="px-6 py-4 text-sm">{{ component.name }}</td>
            <td class="px-6 py-4 text-sm">
              <span
                v-if="component.status === 'available'"
                class="px-2 py-1 rounded text-xs border bg-green-500/10 text-green-500 border-green-500/20"
              >
                Available
              </span>
              <span
                v-else-if="component.status === 'in-use'"
                class="px-2 py-1 rounded text-xs border bg-blue-500/10 text-blue-500 border-blue-500/20"
              >
                In Use
              </span>
              <span
                v-else-if="component.status === 'maintenance'"
                class="px-2 py-1 rounded text-xs border bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              >
                Maintenance
              </span>
              <span
                v-else
                class="px-2 py-1 rounded text-xs border bg-red-500/10 text-red-500 border-red-500/20"
              >
                Damaged
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                  title="Edit"
                  @click="openModal(component)"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  title="Delete"
                  @click="handleDelete(component)"
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
        class="w-full max-w-xl bg-card rounded-lg border border-border p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-xl text-foreground mb-4">
          {{ editingComponent ? 'Edit Component' : 'Add Component' }}
        </h2>

        <form
          class="space-y-6"
          @submit.prevent="editingComponent ? handleUpdate() : handleCreate()"
        >
          <div>
            <label class="block text-sm text-foreground mb-2" for="component-name">Name</label>
            <input
              id="component-name"
              v-model="form.name"
              type="text"
              class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="E.g.: RAM 16GB"
              required
            />
          </div>

          <div>
            <label class="block text-sm text-foreground mb-2" for="component-status">Status</label>
            <select
              id="component-status"
              v-model="form.status"
              class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary/50"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              {{ editingComponent ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
