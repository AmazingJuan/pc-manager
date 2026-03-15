<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@/types/Computer';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import { Formatter } from '@utils/Formatter';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ref, watch } from 'vue';

// -------------------------------
// Reactive Variables
// -------------------------------
const formData = ref({
  name: '',
  location: '',
  userId: '',
  status: 'active' as ComputerStatus,
  componentIds: [] as number[],
  purchaseDate: '',
  warrantyExpiration: '',
  notes: '',
});

// -------------------------------
// Props
// -------------------------------
interface Props {
  computer: ComputerInterface | null;
  users: UserInterface[];
  components: ComponentInterface[];
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  create: [payload: CreateComputerDTO];
  edit: [payload: EditComputerDTO];
  cancel: [];
}>();

// -------------------------------
// Functions
// -------------------------------
function resetFormState(): void {
  formData.value = {
    name: '',
    location: '',
    userId: '',
    status: 'active',
    componentIds: [],
    purchaseDate: '',
    warrantyExpiration: '',
    notes: '',
  };
}

function handleComponentToggle(componentId: number): void {
  const currentIds = formData.value.componentIds;
  const exists = currentIds.includes(componentId);

  formData.value.componentIds = exists
    ? currentIds.filter((id) => id !== componentId)
    : [...currentIds, componentId];
}

function handleSubmit(): void {
  const parsedUserId = Number(formData.value.userId);

  const computerData: CreateComputerDTO = {
    name: formData.value.name.trim(),
    location: formData.value.location.trim(),
    userId: Number.isFinite(parsedUserId) ? parsedUserId : 0,
    status: formData.value.status,
    componentIds: [...formData.value.componentIds],
    purchaseDate: new Date(formData.value.purchaseDate),
    warrantyExpirationDate: new Date(formData.value.warrantyExpiration),
    notes: formData.value.notes.trim(),
  };

  if (props.computer) {
    const editPayload: EditComputerDTO = {
      ...computerData,
    };
    emit('edit', editPayload);
    return;
  }

  emit('create', computerData);
}

// -------------------------------
// Watchers
// -------------------------------
watch(
  () => props.computer,
  (computer) => {
    if (!computer) {
      resetFormState();
      return;
    }

    formData.value = {
      name: computer.name,
      location: computer.location,
      userId: computer.userId ? String(computer.userId) : '',
      status: computer.status,
      componentIds: [...computer.componentIds],
      purchaseDate: Formatter.dateToString(computer.purchaseDate),
      warrantyExpiration: Formatter.dateToString(computer.warrantyExpirationDate),
      notes: computer.notes,
    };
  },
  { immediate: true },
);
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Name *</label>
        <input
          v-model="formData.name"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Location *</label>
        <input
          v-model="formData.location"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
    </div>

    <!-- Assignment and Status -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Assigned User</label>
        <select
          v-model="formData.userId"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Unassigned</option>
          <option v-for="user in users" :key="user.id" :value="String(user.id)">
            {{ user.username }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Status *</label>
        <select
          v-model="formData.status"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
    </div>

    <!-- Important Dates -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Purchase Date *</label>
        <input
          v-model="formData.purchaseDate"
          type="date"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Warranty Expiration *</label>
        <input
          v-model="formData.warrantyExpiration"
          type="date"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
    </div>

    <!-- Components Selection -->
    <div>
      <label class="block text-sm text-foreground mb-2">Components</label>
      <div class="max-h-48 overflow-y-auto p-4 bg-secondary/30 rounded-lg border border-border">
        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="component in components"
            :key="component.id"
            class="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              :checked="formData.componentIds.includes(component.id)"
              class="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
              @change="handleComponentToggle(component.id)"
            />
            <span class="text-sm text-foreground">{{ component.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Additional Notes -->
    <div>
      <label class="block text-sm text-foreground mb-2">Notes</label>
      <textarea
        v-model="formData.notes"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        rows="3"
      />
    </div>

    <!-- Form Actions -->
    <div class="flex gap-3 pt-4">
      <button
        type="submit"
        class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
      >
        {{ computer ? 'Update' : 'Create' }}
      </button>
      <button
        type="button"
        class="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
