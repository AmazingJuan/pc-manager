<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { UserInterface } from '@interfaces/UserInterface';
import type { ComputerStatus } from '@/types/Computer';
import PCsByLocationBarChart from '@components/dashboard/charts/PCsByLocationBarChart.vue';
import PCsStatusPieChart from '@components/dashboard/charts/PCsStatusPieChart.vue';
import { ComputerService } from '@services/ComputerService';
import { UserService } from '@services/UserService';
import { Formatter } from '@utils/Formatter';

// -------------------------------
// Third Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';
import { Filter, X } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const computerService = ComputerService.getInstance();
const userService = UserService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const computers = ref<ComputerInterface[]>([]);
const users = ref<UserInterface[]>([]);
const searchQuery = ref<string>('');
const selectedStatus = ref<ComputerStatus | 'all'>('all');
const selectedUserId = ref<number | 'all'>('all');

// -------------------------------
// Computed
// -------------------------------
const filteredComputers = computed(() => {
  return computers.value.filter((computer) => {
    const matchesSearch =
      !searchQuery.value ||
      computer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      computer.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = selectedStatus.value === 'all' || computer.status === selectedStatus.value;
    const matchesUser = selectedUserId.value === 'all' || computer.userId === selectedUserId.value;
    return matchesSearch && matchesStatus && matchesUser;
  });
});

// -------------------------------
// Functions
// -------------------------------
function getUserName(userId: number): string {
  return users.value.find((user) => user.id === userId)?.name ?? 'Sin asignar';
}

function formatStatus(status: ComputerStatus): string {
  const statusLabels: Record<ComputerStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    maintenance: 'Mantenimiento',
  };
  return statusLabels[status];
}

function clearFilters(): void {
  searchQuery.value = '';
  selectedStatus.value = 'all';
  selectedUserId.value = 'all';
}

function loadData(): void {
  computers.value = computerService.getAll();
  users.value = userService.getAll();
}

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8 space-y-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div>
      <h1 class="text-3xl text-foreground mb-2">Inventario de PCs</h1>
      <p class="text-muted-foreground">Gestión y análisis del inventario de equipos</p>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-border bg-card p-5">
      <p class="text-sm font-medium text-primary mb-4 flex items-center gap-2">
        <Filter class="w-4 h-4" /> Filtros
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Búsqueda</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Estado</label>
          <select
            v-model="selectedStatus"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="maintenance">Mantenimiento</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Usuario</label>
          <select
            v-model="selectedUserId"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <button
          class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-muted/30 transition-colors"
          @click="clearFilters"
        >
          <X class="w-4 h-4" /> Limpiar Filtros
        </button>
        <span class="text-xs text-muted-foreground">
          Mostrando {{ filteredComputers.length }} de {{ computers.length }} PCs
        </span>
      </div>
    </div>

    <!-- Charts -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PCsStatusPieChart :computers="filteredComputers" />
      <PCsByLocationBarChart :computers="filteredComputers" />
    </section>

    <!-- Table -->
    <div class="rounded-lg border border-border bg-card">
      <div class="p-5 border-b border-border">
        <h2 class="text-base font-medium text-foreground">Listado de Equipos</h2>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border text-muted-foreground">
            <th class="text-left px-4 py-3 font-medium">Nombre</th>
            <th class="text-left px-4 py-3 font-medium">Ubicación</th>
            <th class="text-left px-4 py-3 font-medium">Usuario Asignado</th>
            <th class="text-left px-4 py-3 font-medium">Estado</th>
            <th class="text-left px-4 py-3 font-medium">Componentes</th>
            <th class="text-left px-4 py-3 font-medium">Garantía</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="computer in filteredComputers"
            :key="computer.id"
            class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-3 text-foreground">{{ computer.name }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ computer.location }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ getUserName(computer.userId) }}</td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-emerald-500/20 text-emerald-400': computer.status === 'active',
                  'bg-yellow-500/20 text-yellow-400': computer.status === 'maintenance',
                  'bg-muted text-muted-foreground': computer.status === 'inactive',
                }"
              >
                {{ formatStatus(computer.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ computer.componentIds.length }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ Formatter.dateToString(computer.warrantyExpirationDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
