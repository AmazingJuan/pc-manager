<!-- Author: Juan Manuel Zapata -->
<script setup lang="ts">

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { getPCs, addPC, updatePC, deletePC } from '@services/localStorage';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { onMounted, ref } from 'vue';


const pcList = ref<ComputerInterface[]>([]);

const editingPc = ref<ComputerInterface | null>(null);
const pcForm = ref<{ name: string; status: ComputerInterface['status'] }>({
  name: '',
  status: 'active',
});

const loadRegisteredPCs = () => {
  pcList.value = getPCs();
};

const resetPcForm = () => {
  editingPc.value = null;
  pcForm.value = { name: '', status: 'active' };
};

const editPc = (pc: ComputerInterface) => {
  editingPc.value = pc;
  pcForm.value = { name: pc.name, status: pc.status };
};

const savePc = () => {
  if (!pcForm.value.name.trim()) return;

  if (editingPc.value) {
    updatePC(editingPc.value.id, {
      name: pcForm.value.name,
      status: pcForm.value.status,
    });
  } else {
    addPC({
      name: pcForm.value.name,
      status: pcForm.value.status,
    });
  }

  loadPCs();
  resetPcForm();
};

const removePc = (id: number) => {
  deletePC(id);
  if (editingPc.value?.id === id) resetPcForm();
  loadPCs();
};

onMounted(loadRegisteredPCs);
</script>


<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl text-foreground mb-1">Administrar PCs</h1>
        <p class="text-sm text-muted-foreground">Crea, edita y elimina tus equipos.</p>
      </div>
      <button
        type="button"
        class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90"
        @click="resetPcForm"
      >
        + Nuevo
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-lg text-foreground mb-4">Listado de PCs</h2>
        <div class="space-y-3 max-h-[420px] overflow-auto">
          <div
            v-for="pc in pcList"
            :key="pc.id"
            class="flex items-center justify-between gap-4 p-3 bg-secondary/50 rounded-lg"
          >
            <div>
              <div class="text-sm font-semibold text-foreground">{{ pc.name }}</div>
              <div class="text-xs text-muted-foreground">{{ pc.status }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-foreground hover:bg-secondary/70"
                @click="editPc(pc)"
              >
                Editar
              </button>
              <button
                type="button"
                class="rounded-lg bg-destructive px-3 py-1 text-xs font-semibold text-background hover:bg-destructive/90"
                @click="removePc(pc.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
          <p v-if="!pcList.length" class="text-sm text-muted-foreground">
            Ninguna PC registrada. Agrega una nueva para comenzar.
          </p>
        </div>
      </div>

      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-lg text-foreground mb-4">Formulario de PC</h2>
        <form @submit.prevent="savePc" class="space-y-4">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-muted-foreground">Nombre</label>
              <input
                v-model="pcForm.name"
                type="text"
                placeholder="Ej. PC-01"
                class="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-muted-foreground">Estado</label>
              <select
                v-model="pcForm.status"
                class="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="maintenance">Mantenimiento</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/40"
              @click="resetPcForm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90"
            >
              {{ editingPc ? 'Guardar cambios' : 'Agregar PC' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

