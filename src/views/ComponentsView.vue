<!-- Author: Juan Manuel Zapata -->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl text-foreground mb-1">Administrar Componentes</h1>
        <p class="text-sm text-muted-foreground">Crea, edita y elimina los componentes de tu inventario.</p>
      </div>
      <button
        type="button"
        class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90"
        @click="resetComponentForm"
      >
        + Nuevo
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-lg text-foreground mb-4">Listado de Componentes</h2>
        <div class="space-y-3 max-h-[420px] overflow-auto">
          <div
            v-for="component in componentList"
            :key="component.id"
            class="flex items-center justify-between gap-4 p-3 bg-secondary/50 rounded-lg"
          >
            <div>
              <div class="text-sm font-semibold text-foreground">{{ component.name }}</div>
              <div class="text-xs text-muted-foreground">{{ component.status }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-foreground hover:bg-secondary/70"
                @click="editComponent(component)"
              >
                Editar
              </button>
              <button
                type="button"
                class="rounded-lg bg-destructive px-3 py-1 text-xs font-semibold text-background hover:bg-destructive/90"
                @click="removeComponent(component.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
          <p v-if="!componentList.length" class="text-sm text-muted-foreground">
            No hay componentes. Agrega uno para comenzar.
          </p>
        </div>
      </div>

      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-lg text-foreground mb-4">Formulario de Componente</h2>
        <form @submit.prevent="saveComponent" class="space-y-4">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-muted-foreground">Nombre</label>
              <input
                v-model="componentForm.name"
                type="text"
                placeholder="Ej. SSD 512GB"
                class="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-muted-foreground">Estado</label>
              <select
                v-model="componentForm.status"
                class="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="available">Disponible</option>
                <option value="in-use">En uso</option>
                <option value="maintenance">Mantenimiento</option>
                <option value="damaged">Dañado</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/40"
              @click="resetComponentForm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90"
            >
              {{ editingComponent ? 'Guardar cambios' : 'Agregar componente' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { onMounted, ref } from 'vue';
import { getComponents, addComponent, updateComponent, deleteComponent } from '@services/localStorage';

const componentList = ref<ComponentInterface[]>([]);

const editingComponent = ref<ComponentInterface | null>(null);
const componentForm = ref<{ name: string; status: ComponentInterface['status'] }>({
  name: '',
  status: 'available',
});

const loadInventoryComponents = () => {
  componentList.value = getComponents();
};

const resetComponentForm = () => {
  editingComponent.value = null;
  componentForm.value = { name: '', status: 'available' };
};

const editComponent = (component: ComponentInterface) => {
  editingComponent.value = component;
  componentForm.value = { name: component.name, status: component.status };
};

const saveComponent = () => {
  if (!componentForm.value.name.trim()) return;

  if (editingComponent.value) {
    updateComponent(editingComponent.value.id, {
      name: componentForm.value.name,
      status: componentForm.value.status,
    });
  } else {
    addComponent({
      name: componentForm.value.name,
      status: componentForm.value.status,
    });
  }

  loadComponents();
  resetComponentForm();
};

const removeComponent = (id: number) => {
  deleteComponent(id);
  if (editingComponent.value?.id === id) resetComponentForm();
  loadComponents();
};

onMounted(loadInventoryComponents);
</script>
