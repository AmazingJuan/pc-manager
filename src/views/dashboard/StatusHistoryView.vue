<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
import { ComputerService } from '@services/ComputerService';
import { StatusChangeService } from '@services/StatusChangeService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';
import { History } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const statusChangeService = StatusChangeService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const statusChanges = ref<StatusChangeInterface[]>([]);
const selectedComputerId = ref<number | 'all'>('all');
const selectedStatus = ref<string>('all');

// -------------------------------
// Computed
// -------------------------------
const filteredStatusChanges = computed(() => {
  return statusChanges.value.filter((statusChange) => {
    const matchesComputer =
      selectedComputerId.value === 'all' || statusChange.computerId === selectedComputerId.value;
    const matchesStatus =
      selectedStatus.value === 'all' || statusChange.newStatus === selectedStatus.value;
    return matchesComputer && matchesStatus;
  });
});

const statusChangeStats = computed(() => ({
  total: filteredStatusChanges.value.length,
  toActive: filteredStatusChanges.value.filter((c) => c.newStatus === 'active').length,
  toMaintenance: filteredStatusChanges.value.filter((c) => c.newStatus === 'maintenance').length,
  toInactive: filteredStatusChanges.value.filter((c) => c.newStatus === 'inactive').length,
}));

// -------------------------------
// Functions
// -------------------------------
function getComputerName(computerId: number): string {
  return computers.value.find((computer) => computer.id === computerId)?.name ?? `PC #${computerId}`;
}

function formatStatus(status: string): string {
  const statusLabels: Record<string, string> = {
    active: 'Activo',
    maintenance: 'Mantenimiento',
    inactive: 'Inactivo',
  };
  return statusLabels[status] ?? status;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function loadData(): void {
  computers.value = computerService.getAll();
  statusChanges.value = statusChangeService.getAll();
}

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-8">
      <History class="w-8 h-8 text-primary" />
      <div>
        <h1 class="text-3xl text-foreground mb-2">Historial de Cambios de Estado</h1>
        <p class="text-muted-foreground">Registro completo de todos los cambios de estado de los PCs</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-border bg-card p-5 mb-6">
      <p class="text-sm text-muted-foreground mb-4">Filtros</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-muted-foreground mb-1">Filtrar por PC</label>
          <select
            v-model="selectedComputerId"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos los PCs</option>
            <option v-for="computer in computers" :key="computer.id" :value="computer.id">
              {{ computer.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-muted-foreground mb-1">Filtrar por Estado</label>
          <select
            v-model="selectedStatus"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="maintenance">Mantenimiento</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="rounded-lg border border-border bg-card p-4">
        <p class="text-xs text-muted-foreground mb-1">Total de Cambios</p>
        <p class="text-2xl font-semibold text-foreground">{{ statusChangeStats.total }}</p>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <p class="text-xs text-muted-foreground mb-1">A Activo</p>
        <p class="text-2xl font-semibold text-emerald-400">{{ statusChangeStats.toActive }}</p>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <p class="text-xs text-muted-foreground mb-1">A Mantenimiento</p>
        <p class="text-2xl font-semibold text-yellow-400">{{ statusChangeStats.toMaintenance }}</p>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <p class="text-xs text-muted-foreground mb-1">A Inactivo</p>
        <p class="text-2xl font-semibold text-muted-foreground">{{ statusChangeStats.toInactive }}</p>
      </div>
    </div>

    <!-- Table / Empty State -->
    <div class="rounded-lg border border-border bg-card">
      <div
        v-if="filteredStatusChanges.length === 0"
        class="flex flex-col items-center justify-center py-20 text-muted-foreground"
      >
        <History class="w-12 h-12 mb-4 opacity-30" />
        <p class="text-base">No hay cambios de estado registrados</p>
        <p class="text-sm opacity-60">
          Los cambios de estado aparecerán aquí cuando modifiques el estado de un PC
        </p>
      </div>

      <table v-else class="w-full text-sm">
        <thead>
          <tr class="border-b border-border text-muted-foreground">
            <th class="text-left px-4 py-3 font-medium">PC</th>
            <th class="text-left px-4 py-3 font-medium">Estado Anterior</th>
            <th class="text-left px-4 py-3 font-medium">Nuevo Estado</th>
            <th class="text-left px-4 py-3 font-medium">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="statusChange in filteredStatusChanges"
            :key="statusChange.id"
            class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-3 text-foreground">{{ getComputerName(statusChange.computerId) }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                {{ formatStatus(statusChange.previousStatus) }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-emerald-500/20 text-emerald-400': statusChange.newStatus === 'active',
                  'bg-yellow-500/20 text-yellow-400': statusChange.newStatus === 'maintenance',
                  'bg-muted text-muted-foreground': statusChange.newStatus === 'inactive',
                }"
              >
                {{ formatStatus(statusChange.newStatus) }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ formatDate(statusChange.changedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>