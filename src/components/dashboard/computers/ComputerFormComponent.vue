<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { ComputerSchema } from '@schemas/computer/ComputerSchema';
import type { ComputerStatus } from '@/types/Computer';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { Formatter } from '@utils/Formatter';

// -------------------------------
// Third Party Imports
// -------------------------------
import { computed } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';

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
// Computed Variables
// -------------------------------
const initialValues = computed(() => ({
  name: props.computer?.name ?? '',
  location: props.computer?.location ?? '',
  userId: props.computer?.userId ? String(props.computer.userId) : '',
  status: (props.computer?.status ?? 'active') as ComputerStatus,
  componentIds: props.computer ? [...props.computer.componentIds] : [],
  purchaseDate: props.computer ? Formatter.dateToString(props.computer.purchaseDate) : '',
  warrantyExpiration: props.computer
    ? Formatter.dateToString(props.computer.warrantyExpirationDate)
    : '',
  notes: props.computer?.notes ?? '',
}));

// -------------------------------
// Functions
// -------------------------------
function handleSubmit(values: Record<string, unknown>): void {
  const parsedUserId = Number(values.userId ?? '');
  const selectedComponentIds = Array.isArray(values.componentIds)
    ? values.componentIds.map((id) => Number(id)).filter((id) => Number.isFinite(id))
    : [];

  const status = String(values.status ?? 'active');

  const computerData: CreateComputerDTO = {
    name: String(values.name ?? '').trim(),
    location: String(values.location ?? '').trim(),
    userId: Number.isFinite(parsedUserId) && parsedUserId > 0 ? parsedUserId : 0,
    status: (status === 'inactive' || status === 'maintenance'
      ? status
      : 'active') as ComputerStatus,
    componentIds: selectedComponentIds,
    purchaseDate: new Date(String(values.purchaseDate ?? '')),
    warrantyExpirationDate: new Date(String(values.warrantyExpiration ?? '')),
    notes: String(values.notes ?? '').trim(),
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
</script>

<template>
  <Form
    :key="computer ? `edit-${computer.id}` : 'create-computer'"
    :initial-values="initialValues"
    :validation-schema="ComputerSchema"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <!-- Basic Information -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Name *</label>
        <Field v-slot="{ field, errorMessage }" name="name">
          <input
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="Computer name"
          />
        </Field>
        <ErrorMessage name="name" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Location *</label>
        <Field v-slot="{ field, errorMessage }" name="location">
          <input
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="Office / room"
          />
        </Field>
        <ErrorMessage name="location" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
    </div>

    <!-- Assignment and Status -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Assigned User</label>
        <Field v-slot="{ field }" name="userId">
          <select
            v-bind="field"
            class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Unassigned</option>
            <option v-for="user in users" :key="user.id" :value="String(user.id)">
              {{ user.username }}
            </option>
          </select>
        </Field>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Status *</label>
        <Field v-slot="{ field, errorMessage }" name="status">
          <select
            v-bind="field"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </Field>
        <ErrorMessage name="status" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
    </div>

    <!-- Important Dates -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2">Purchase Date *</label>
        <Field v-slot="{ field, errorMessage }" name="purchaseDate">
          <input
            v-bind="field"
            type="date"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          />
        </Field>
        <ErrorMessage name="purchaseDate" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
      <div>
        <label class="block text-sm text-foreground mb-2">Warranty Expiration *</label>
        <Field v-slot="{ field, errorMessage }" name="warrantyExpiration">
          <input
            v-bind="field"
            type="date"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          />
        </Field>
        <ErrorMessage name="warrantyExpiration" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
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
            <Field
              name="componentIds"
              type="checkbox"
              :value="component.id"
              class="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
            />
            <span class="text-sm text-foreground">{{ component.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Additional Notes -->
    <div>
      <label class="block text-sm text-foreground mb-2">Notes</label>
      <Field v-slot="{ field, errorMessage }" name="notes">
        <textarea
          v-bind="field"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
          rows="3"
        />
      </Field>
      <ErrorMessage name="notes" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
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
  </Form>
</template>
