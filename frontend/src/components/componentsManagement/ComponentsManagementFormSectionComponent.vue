<!-- Author: Juan Manuel Zapata -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@app-types/Components';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { reactive, watch } from 'vue';

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
// Form state
// -------------------------------
const form = reactive({
  name: '',
  status: 'available' as ComponentType,
  type: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  purchaseDate: '',
  price: 0,
});

function resetForm(): void {
  form.name = '';
  form.status = 'available';
  form.type = '';
  form.manufacturer = '';
  form.model = '';
  form.serialNumber = '';
  form.purchaseDate = '';
  form.price = 0;
}

function applyComponent(component: ComponentInterface | null): void {
  if (!component) {
    resetForm();
    return;
  }

  form.name = component.name;
  form.status = component.status;
  form.type = component.type;
  form.manufacturer = component.manufacturer;
  form.model = component.model;
  form.serialNumber = component.serialNumber;
  form.purchaseDate = String(component.purchaseDate ?? '').slice(0, 10);
  form.price = Number(component.price);
}

watch(
  () => props.component,
  (current) => {
    applyComponent(current);
  },
  { immediate: true },
);

// -------------------------------
// Functions
// -------------------------------
function handleSubmit(): void {
  const token = (v: string) => String(v ?? '').trim();
  const parsedStatus = String(form.status ?? 'available');
  const normalizedStatus = availableStatuses.includes(parsedStatus as ComponentType) ? (parsedStatus as ComponentType) : 'available';
  const parsedPrice = Number(form.price);

  const componentData: CreateComponentDTO = {
    name: token(form.name),
    status: normalizedStatus,
    type: token(form.type),
    manufacturer: token(form.manufacturer),
    model: token(form.model),
    serialNumber: token(form.serialNumber),
    purchaseDate: String(form.purchaseDate ?? ''),
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
  <form :key="component ? `edit-${component.id}` : 'create-component'" class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-name">Name *</label>
        <input
          id="component-name"
          v-model="form.name"
          type="text"
          name="name"
          required
          minlength="2"
          maxlength="100"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Component name"
        />
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-type">Type *</label>
        <input
          id="component-type"
          v-model="form.type"
          type="text"
          name="type"
          required
          minlength="2"
          maxlength="60"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="E.g.: Processor, RAM, etc."
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-manufacturer">Manufacturer *</label>
        <input
          id="component-manufacturer"
          v-model="form.manufacturer"
          type="text"
          name="manufacturer"
          required
          minlength="2"
          maxlength="80"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-model">Model *</label>
        <input
          id="component-model"
          v-model="form.model"
          type="text"
          name="model"
          required
          minlength="1"
          maxlength="80"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-foreground mb-2" for="component-serial-number">Serial Number *</label>
        <input
          id="component-serial-number"
          v-model="form.serialNumber"
          type="text"
          name="serialNumber"
          required
          minlength="3"
          maxlength="100"
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm text-foreground mb-2" for="component-status">Status *</label>
        <select
          id="component-status"
          v-model="form.status"
          name="status"
          required
          class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="available">Available</option>
          <option value="in-use">In Use</option>
          <option value="maintenance">Maintenance</option>
          <option value="damaged">Damaged</option>
        </select>
      </div>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2" for="component-purchase-date">Purchase Date *</label>
      <input
        id="component-purchase-date"
        v-model="form.purchaseDate"
        type="date"
        name="purchaseDate"
        required
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2" for="component-price">Price *</label>
      <input
        id="component-price"
        v-model.number="form.price"
        type="number"
        name="price"
        required
        min="0"
        step="0.01"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
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
  </form>
</template>
