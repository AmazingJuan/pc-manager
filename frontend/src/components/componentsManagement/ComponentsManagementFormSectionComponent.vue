<!-- Author: Juan Manuel Zapata -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { ComponentSchema } from '@schemas/component/ComponentSchema';
import type { ComponentType } from '@app-types/Components';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';

// -------------------------------
// Props
// -------------------------------
interface Props {
  component: ComponentInterface | null;
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{ create: [payload: CreateComponentDTO]; edit: [payload: EditComponentDTO]; cancel: [] }>();

// -------------------------------
// Non-Reactive Variables
// -------------------------------
const availableStatuses: ComponentType[] = ['available', 'in-use', 'maintenance', 'damaged'];

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const initialValues = computed(() => ({
  name: props.component?.name ?? '',
  status: (props.component?.status ?? 'available') as ComponentType,
  type: props.component?.type ?? '',
  manufacturer: props.component?.manufacturer ?? '',
  model: props.component?.model ?? '',
  serialNumber: props.component?.serialNumber ?? '',
  purchaseDate: props.component?.purchaseDate ?? '',
  price: props.component?.price ?? 0,
}));

// -------------------------------
// Functions
// -------------------------------
function handleSubmit(values: Record<string, unknown>): void {
  const parsedStatus = String(values.status ?? 'available');
  const normalizedStatus = availableStatuses.includes(parsedStatus as ComponentType) ? (parsedStatus as ComponentType) : 'available';
  const parsedPrice = Number(values.price ?? 0);

  const componentData: CreateComponentDTO = {
    name: String(values.name ?? '').trim(),
    status: normalizedStatus,
    type: String(values.type ?? '').trim(),
    manufacturer: String(values.manufacturer ?? '').trim(),
    model: String(values.model ?? '').trim(),
    serialNumber: String(values.serialNumber ?? '').trim(),
    purchaseDate: String(values.purchaseDate ?? ''),
    price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
  };

  if (props.component) {
    const editPayload: EditComponentDTO = { ...componentData };

    emit('edit', editPayload);
    return;
  }

  emit('create', componentData);
}
</script>

<template>
  <Form
    :key="component ? `edit-${component.id}` : 'create-component'"
    :initial-values="initialValues"
    :validation-schema="ComponentSchema"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-name">Name *</label>
        <Field v-slot="{ field, errorMessage }" name="name">
          <input
            id="component-name"
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="Component name"
          />
        </Field>
        <ErrorMessage name="name" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-type">Type *</label>
        <Field v-slot="{ field, errorMessage }" name="type">
          <input
            id="component-type"
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="E.g.: Processor, RAM, etc."
          />
        </Field>
        <ErrorMessage name="type" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-manufacturer">Manufacturer *</label>
        <Field v-slot="{ field, errorMessage }" name="manufacturer">
          <input
            id="component-manufacturer"
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          />
        </Field>
        <ErrorMessage name="manufacturer" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-model">Model *</label>
        <Field v-slot="{ field, errorMessage }" name="model">
          <input
            id="component-model"
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          />
        </Field>
        <ErrorMessage name="model" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-serial-number">Serial Number *</label>
        <Field v-slot="{ field, errorMessage }" name="serialNumber">
          <input
            id="component-serial-number"
            v-bind="field"
            type="text"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          />
        </Field>
        <ErrorMessage name="serialNumber" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-status">Status *</label>
        <Field v-slot="{ field, errorMessage }" name="status">
          <select
            id="component-status"
            v-bind="field"
            class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
          >
            <option value="available">Available</option>
            <option value="in-use">In Use</option>
            <option value="maintenance">Maintenance</option>
            <option value="damaged">Damaged</option>
          </select>
        </Field>
        <ErrorMessage name="status" v-slot="{ message }">
          <p class="text-xs text-destructive mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-purchase-date">Purchase Date *</label>
        <Field v-slot="{ field, errorMessage }" name="purchaseDate">
          <input
            id="component-purchase-date"
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
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2" for="component-price">Price *</label>
      <Field v-slot="{ field, errorMessage }" name="price">
        <input
          id="component-price"
          v-bind="field"
          type="number"
          min="0"
          step="0.01"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
        />
      </Field>
      <ErrorMessage name="price" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <div class="flex gap-3 pt-4">
      <button type="submit" class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
        {{ component ? 'Update' : 'Create' }}
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
