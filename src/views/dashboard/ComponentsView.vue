<script setup lang="ts">
// Author: Juan Manuel Zapata
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { ComponentService } from '@services/ComponentService';
import { UserService } from '@services/UserService';
import { Formatter } from '@utils/Formatter';

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
const userService = UserService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const editingComponent = ref<ComponentInterface | null>(null);
const form = ref({
  name: '',
  location: '',
  userId: '',
  status: 'available' as ComponentInterface['status'],
  componentIds: [] as number[],
  purchaseDate: '',
  warrantyExpirationDate: '',
  notes: '',
});
const isModalOpen = ref(false);
const statusOptions: Array<{ value: ComponentInterface['status']; label: string }> = [
  { value: 'available', label: 'Available' },
  { value: 'in-use', label: 'In Use' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'damaged', label: 'Damaged' },
];
const successMessage = ref('');
const users = ref<UserInterface[]>([]);

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
  users.value = userService.getAll();
}

function resetForm(): void {
  form.value.name = '';
  form.value.location = '';
  form.value.userId = '';
  form.value.status = 'available';
  form.value.componentIds = [];
  form.value.purchaseDate = '';
  form.value.warrantyExpirationDate = '';
  form.value.notes = '';
}

function toggleRelatedComponent(componentId: number): void {
  const currentIds = form.value.componentIds;
  const exists = currentIds.includes(componentId);
  form.value.componentIds = exists
    ? currentIds.filter((id) => id !== componentId)
    : [...currentIds, componentId];
}

function handleCreate(): void {
  const name = (form.value.name ?? '').trim();
  if (!name) {
    return;
  }

  const location = (form.value.location ?? '').trim();
  const notes = (form.value.notes ?? '').trim();

  const payload: CreateComponentDTO = {
    name,
    location,
    userId: Number(form.value.userId) || 0,
    status: form.value.status,
    componentIds: [...(form.value.componentIds ?? [])],
    purchaseDate: form.value.purchaseDate
      ? new Date(form.value.purchaseDate)
      : new Date(),
    warrantyExpirationDate: form.value.warrantyExpirationDate
      ? new Date(form.value.warrantyExpirationDate)
      : new Date(),
    notes,
  };

  componentService.create(payload);

  showSuccess('Component created successfully');
  loadData();
  closeModal();
}

function handleUpdate(): void {
  if (!editingComponent.value || !form.value.name.trim()) {
    return;
  }

  const name = (form.value.name ?? '').trim();
  const location = (form.value.location ?? '').trim();
  const notes = (form.value.notes ?? '').trim();

  const payload: EditComponentDTO = {
    name,
    location,
    userId: Number(form.value.userId) || 0,
    status: form.value.status,
    componentIds: [...(form.value.componentIds ?? [])],
    purchaseDate: form.value.purchaseDate
      ? new Date(form.value.purchaseDate)
      : new Date(),
    warrantyExpirationDate: form.value.warrantyExpirationDate
      ? new Date(form.value.warrantyExpirationDate)
      : new Date(),
    notes,
  };

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
  if (component) {
    editingComponent.value = component;
    form.value.name = component.name ?? '';
    form.value.location = component.location ?? '';
    form.value.userId = String(component.userId ?? '');
    form.value.status = component.status ?? 'available';
    form.value.componentIds = [...(component.componentIds ?? [])];
    form.value.purchaseDate = component.purchaseDate
      ? Formatter.dateToString(new Date(component.purchaseDate))
      : '';
    form.value.warrantyExpirationDate = component.warrantyExpirationDate
      ? Formatter.dateToString(new Date(component.warrantyExpirationDate))
      : '';
    form.value.notes = component.notes ?? '';
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
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Location</th>
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Assigned User</th>
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Status</th>
            <th class="px-6 py-4 text-left text-sm text-muted-foreground">Purchase Date</th>
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
            <td class="px-6 py-4 text-sm">{{ component.location || '-' }}</td>
            <td class="px-6 py-4 text-sm">
              <span class="text-muted-foreground">
                {{
                  !component.userId
                    ? 'Unassigned'
                    : (users.find((currentUser) => currentUser.id === component.userId)?.username ??
                      'User not found')
                }}
              </span>
            </td>
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
            <td class="px-6 py-4 text-sm">
              {{
                component.purchaseDate
                  ? Formatter.dateToString(new Date(component.purchaseDate))
                  : '-'
              }}
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

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-foreground mb-2" for="component-location">Location</label>
              <input
                id="component-location"
                v-model="form.location"
                type="text"
                class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                placeholder="E.g.: Warehouse A"
              />
            </div>

            <div>
              <label class="block text-sm text-foreground mb-2" for="component-user">Assigned User</label>
              <select
                id="component-user"
                v-model="form.userId"
                class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Unassigned</option>
                <option v-for="user in users" :key="user.id" :value="String(user.id)">
                  {{ user.username }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
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

            <div>
              <label class="block text-sm text-foreground mb-2" for="component-purchase-date">Purchase Date</label>
              <input
                id="component-purchase-date"
                v-model="form.purchaseDate"
                type="date"
                required
                class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-foreground mb-2" for="component-warranty-date">Warranty Expiration</label>
              <input
                id="component-warranty-date"
                v-model="form.warrantyExpirationDate"
                type="date"
                required
                class="mt-2 w-full rounded-lg border border-border bg-input px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label class="block text-sm text-foreground mb-2">Related Components</label>
              <div class="max-h-40 overflow-y-auto p-3 bg-secondary/30 rounded-lg border border-border">
                <div class="grid grid-cols-2 gap-2">
                  <label
                    v-for="other in components.filter((c) => c.id !== editingComponent?.id)"
                    :key="other.id"
                    class="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="form.componentIds.includes(other.id)"
                      class="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      @change="toggleRelatedComponent(other.id)"
                    />
                    <span class="text-sm text-foreground">{{ other.name }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm text-foreground mb-2">Notes</label>
            <textarea
              v-model="form.notes"
              class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
            />
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
