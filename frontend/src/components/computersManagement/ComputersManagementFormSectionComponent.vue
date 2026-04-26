<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@app-types/Computer';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import { FormatUtils } from '@utils/FormatUtils';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { reactive, watch } from 'vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  computer: ComputerInterface | null;
  users: UserInterface[];
  components: ComponentInterface[];
  /** Ids de piezas al editar; el padre llama a `GET /computers/:id/components`. */
  initialComponentIds: number[];
}

const props = withDefaults(defineProps<Props>(), { initialComponentIds: () => [] });

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{ create: [payload: CreateComputerDTO]; edit: [payload: EditComputerDTO]; cancel: [] }>();

// -------------------------------
// Form state
// -------------------------------
const form = reactive({
  name: '',
  location: '',
  userId: '',
  status: 'active' as ComputerStatus,
  selectedComponentIds: [] as number[],
  purchaseDate: '',
  warrantyExpiration: '',
  notes: '',
});

const fieldErrors = reactive<Record<string, string>>({});

function clearFieldErrors(): void {
  for (const k of Object.keys(fieldErrors)) {
    delete fieldErrors[k];
  }
}

function syncFormFromProps(): void {
  if (props.computer) {
    form.name = props.computer.name;
    form.location = props.computer.location;
    form.userId = props.computer.userId != null && props.computer.userId > 0 ? String(props.computer.userId) : '';
    form.status = props.computer.status;
    form.purchaseDate = FormatUtils.dateToString(props.computer.purchaseDate);
    form.warrantyExpiration = FormatUtils.dateToString(props.computer.warrantyExpirationDate);
    form.notes = props.computer.notes ?? '';
    form.selectedComponentIds = [...props.initialComponentIds];
  } else {
    form.name = '';
    form.location = '';
    form.userId = '';
    form.status = 'active';
    form.purchaseDate = '';
    form.warrantyExpiration = '';
    form.notes = '';
    form.selectedComponentIds = [];
  }
  clearFieldErrors();
}

watch(
  [() => props.computer, () => props.initialComponentIds],
  () => {
    syncFormFromProps();
  },
  { deep: true, immediate: true },
);

// -------------------------------
// Functions
// -------------------------------
function toggleComponentId(id: number, checked: boolean): void {
  if (checked) {
    if (!form.selectedComponentIds.includes(id)) {
      form.selectedComponentIds.push(id);
    }
  } else {
    const i = form.selectedComponentIds.indexOf(id);
    if (i >= 0) {
      form.selectedComponentIds.splice(i, 1);
    }
  }
}

function fieldClass(field: string): string {
  return fieldErrors[field] ? 'border-destructive' : 'border-border';
}

function validate(): boolean {
  clearFieldErrors();
  const name = form.name.trim();
  const location = form.location.trim();

  if (!name) {
    fieldErrors.name = 'Name is required';
  } else if (name.length < 2) {
    fieldErrors.name = 'Name must be at least 2 characters';
  } else if (name.length > 100) {
    fieldErrors.name = 'Name must be at most 100 characters';
  }

  if (!location) {
    fieldErrors.location = 'Location is required';
  } else if (location.length < 2) {
    fieldErrors.location = 'Location must be at least 2 characters';
  } else if (location.length > 100) {
    fieldErrors.location = 'Location must be at most 100 characters';
  }

  if (form.status !== 'active' && form.status !== 'inactive' && form.status !== 'maintenance') {
    fieldErrors.status = 'Status is not valid';
  }

  if (!form.purchaseDate) {
    fieldErrors.purchaseDate = 'Purchase date is required';
  }
  if (!form.warrantyExpiration) {
    fieldErrors.warrantyExpiration = 'Warranty expiration date is required';
  }
  if (form.purchaseDate && form.warrantyExpiration) {
    if (new Date(form.warrantyExpiration) < new Date(form.purchaseDate)) {
      fieldErrors.warrantyExpiration = 'Warranty expiration must be on or after purchase date';
    }
  }

  if (form.selectedComponentIds.length < 1) {
    fieldErrors.componentIds = 'Computer must have at least one component';
  }

  if (form.notes.length > 500) {
    fieldErrors.notes = 'Notes must be at most 500 characters';
  }

  return Object.keys(fieldErrors).length === 0;
}

function handleSubmit(): void {
  if (!validate()) {
    return;
  }
  const parsedUserId = Number(form.userId);
  const computerData: CreateComputerDTO = {
    name: form.name.trim(),
    location: form.location.trim(),
    userId: Number.isFinite(parsedUserId) && parsedUserId > 0 ? parsedUserId : 0,
    status: form.status,
    componentIds: [...form.selectedComponentIds],
    purchaseDate: new Date(form.purchaseDate),
    warrantyExpirationDate: new Date(form.warrantyExpiration),
    notes: form.notes.trim(),
  };
  if (props.computer) {
    const editPayload: EditComputerDTO = { ...computerData };
    emit('edit', editPayload);
    return;
  }
  emit('create', computerData);
}
</script>

<template>
  <form :key="computer ? `edit-${computer.id}` : 'create-computer'" class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Name *</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="fieldClass('name')"
          placeholder="Computer name"
        />
        <p v-if="fieldErrors.name" class="text-xs text-destructive mt-1">{{ fieldErrors.name }}</p>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Location *</label>
        <input
          v-model="form.location"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="fieldClass('location')"
          placeholder="Office / room"
        />
        <p v-if="fieldErrors.location" class="text-xs text-destructive mt-1">{{ fieldErrors.location }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Assigned User</label>
        <select
          v-model="form.userId"
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
          v-model="form.status"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="fieldClass('status')"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <p v-if="fieldErrors.status" class="text-xs text-destructive mt-1">{{ fieldErrors.status }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Purchase Date *</label>
        <input
          v-model="form.purchaseDate"
          type="date"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="fieldClass('purchaseDate')"
        />
        <p v-if="fieldErrors.purchaseDate" class="text-xs text-destructive mt-1">
          {{ fieldErrors.purchaseDate }}
        </p>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Warranty Expiration *</label>
        <input
          v-model="form.warrantyExpiration"
          type="date"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="fieldClass('warrantyExpiration')"
        />
        <p v-if="fieldErrors.warrantyExpiration" class="text-xs text-destructive mt-1">
          {{ fieldErrors.warrantyExpiration }}
        </p>
      </div>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Components *</label>
      <div class="max-h-48 overflow-y-auto p-4 bg-secondary/30 rounded-lg border border-border">
        <div class="grid grid-cols-2 gap-2">
          <label v-for="c in components" :key="c.id" class="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded cursor-pointer">
            <input
              type="checkbox"
              :checked="form.selectedComponentIds.includes(c.id)"
              class="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
              @change="toggleComponentId(c.id, ($event.target as HTMLInputElement).checked)"
            />
            <span class="text-sm text-foreground">{{ c.name }}</span>
          </label>
        </div>
      </div>
      <p v-if="fieldErrors.componentIds" class="text-xs text-destructive mt-1">
        {{ fieldErrors.componentIds }}
      </p>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Notes</label>
      <textarea
        v-model="form.notes"
        class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        :class="fieldClass('notes')"
        rows="3"
      />
      <p v-if="fieldErrors.notes" class="text-xs text-destructive mt-1">{{ fieldErrors.notes }}</p>
    </div>

    <div class="flex gap-3 pt-4">
      <button type="submit" class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
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
