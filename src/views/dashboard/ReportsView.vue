<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@/types/Components';
import { ComponentService } from '@services/ComponentService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted, ref } from 'vue';
import { Filter, X } from 'lucide-vue-next';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const componentService = ComponentService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const components = ref<ComponentInterface[]>([]);
const selectedType = ref<string>('all');
const selectedStatus = ref<ComponentType | 'all'>('all');
const fromDate = ref<string>('');
const toDate = ref<string>('');

// -------------------------------
// Computed
// -------------------------------
const filteredComponents = computed(() => {
  return components.value.filter((component) => {
    const matchesType = selectedType.value === 'all' || component.type === selectedType.value;
    const matchesStatus = selectedStatus.value === 'all' || component.status === selectedStatus.value;
    const matchesFrom = !fromDate.value || component.purchaseDate >= fromDate.value;
    const matchesTo = !toDate.value || component.purchaseDate <= toDate.value;
    return matchesType && matchesStatus && matchesFrom && matchesTo;
  });
});

const availableTypes = computed(() => {
  return [...new Set(components.value.map((component) => component.type))];
});

const componentsByType = computed(() => {
  const counts: Record<string, number> = {};
  for (const component of filteredComponents.value) {
    const count = counts[component.type];
    counts[component.type] = count !== undefined ? count + 1 : 1;
  }
  return counts;
});

const avgPriceByType = computed(() => {
  const totals: Record<string, { sum: number; count: number }> = {};

  for (const component of filteredComponents.value) {
    const entry = totals[component.type];
    if (entry) {
      entry.sum += component.price;
      entry.count += 1;
    } else {
      totals[component.type] = { sum: component.price, count: 1 };
    }
  }

  const result: Record<string, number> = {};
  for (const type in totals) {
    const entry = totals[type];
    if (entry) {
      result[type] = Math.round(entry.sum / entry.count);
    }
  }
  return result;
});

const chartMaxCount = computed(() => Math.max(...Object.values(componentsByType.value), 1));
const chartMaxPrice = computed(() => Math.max(...Object.values(avgPriceByType.value), 1));

// -------------------------------
// Functions
// -------------------------------
function formatStatus(status: ComponentType): string {
  const statusLabels: Record<ComponentType, string> = {
    'available': 'Disponible',
    'in-use': 'En uso',
    'maintenance': 'Mantenimiento',
    'damaged': 'Dañado',
  };
  return statusLabels[status];
}

function clearFilters(): void {
  selectedType.value = 'all';
  selectedStatus.value = 'all';
  fromDate.value = '';
  toDate.value = '';
}

function loadData(): void {
  components.value = componentService.getAll();
}

// -------------------------------

onMounted(loadData);
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl text-foreground mb-2">Reportes de Componentes</h1>
      <p class="text-muted-foreground">Análisis y filtrado de datos del inventario</p>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-border bg-card p-5 mb-6">
      <p class="text-sm font-medium text-primary mb-4 flex items-center gap-2">
        <Filter class="w-4 h-4" /> Filtros
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Tipo de Componente</label>
          <select
            v-model="selectedType"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option v-for="type in availableTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Estado</label>
          <select
            v-model="selectedStatus"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option value="available">Disponible</option>
            <option value="in-use">En uso</option>
            <option value="maintenance">Mantenimiento</option>
            <option value="damaged">Dañado</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Desde</label>
          <input
            v-model="fromDate"
            type="date"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label class="block text-xs text-muted-foreground mb-1">Hasta</label>
          <input
            v-model="toDate"
            type="date"
            class="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
          />
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
          Mostrando {{ filteredComponents.length }} de {{ components.length }} componentes
        </span>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Componentes por Tipo -->
      <div class="rounded-lg border border-border bg-card p-5">
        <h2 class="text-base font-medium text-foreground mb-4">Componentes por Tipo</h2>
        <div class="flex gap-2 mb-1">
          <div
            v-for="(count, type) in componentsByType"
            :key="type"
            class="flex-1 text-center text-xs text-muted-foreground"
          >
            {{ count }}
          </div>
        </div>
        <div class="flex items-end gap-2 h-32">
          <div
            v-for="(count, type) in componentsByType"
            :key="type"
            class="flex-1 bg-primary rounded-t transition-all"
            :style="{ height: `${(count / chartMaxCount) * 100}%` }"
          />
        </div>
        <div class="flex gap-2 mt-1">
          <div
            v-for="(_, type) in componentsByType"
            :key="type"
            class="flex-1 text-center text-xs text-muted-foreground truncate"
          >
            {{ type }}
          </div>
        </div>
        <div class="flex items-center gap-2 mt-3">
          <span class="w-3 h-3 rounded-sm bg-primary inline-block" />
          <span class="text-xs text-muted-foreground">Cantidad</span>
        </div>
      </div>

      <!-- Precio Promedio por Tipo -->
      <div class="rounded-lg border border-border bg-card p-5">
        <h2 class="text-base font-medium text-foreground mb-4">Precio Promedio por Tipo</h2>
        <div class="flex gap-2 mb-1">
          <div
            v-for="(avg, type) in avgPriceByType"
            :key="type"
            class="flex-1 text-center text-xs text-muted-foreground"
          >
            ${{ avg }}
          </div>
        </div>
        <div class="flex items-end gap-2 h-32">
          <div
            v-for="(avg, type) in avgPriceByType"
            :key="type"
            class="flex-1 bg-primary rounded-t transition-all"
            :style="{ height: `${(avg / chartMaxPrice) * 100}%` }"
          />
        </div>
        <div class="flex gap-2 mt-1">
          <div
            v-for="(_, type) in avgPriceByType"
            :key="type"
            class="flex-1 text-center text-xs text-muted-foreground truncate"
          >
            {{ type }}
          </div>
        </div>
        <div class="flex items-center gap-2 mt-3">
          <span class="w-3 h-3 rounded-full bg-primary inline-block" />
          <span class="text-xs text-muted-foreground">Precio Promedio</span>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="rounded-lg border border-border bg-card">
      <div class="p-5 border-b border-border">
        <h2 class="text-base font-medium text-foreground">Resultados Filtrados</h2>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border text-muted-foreground">
            <th class="text-left px-4 py-3 font-medium">Nombre</th>
            <th class="text-left px-4 py-3 font-medium">Tipo</th>
            <th class="text-left px-4 py-3 font-medium">Fabricante</th>
            <th class="text-left px-4 py-3 font-medium">Estado</th>
            <th class="text-left px-4 py-3 font-medium">Precio</th>
            <th class="text-left px-4 py-3 font-medium">Fecha de Compra</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="component in filteredComponents"
            :key="component.id"
            class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-3 text-foreground">{{ component.name }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ component.type }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ component.manufacturer }}</td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-emerald-500/20 text-emerald-400': component.status === 'available',
                  'bg-blue-500/20 text-blue-400': component.status === 'in-use',
                  'bg-yellow-500/20 text-yellow-400': component.status === 'maintenance',
                  'bg-red-500/20 text-red-400': component.status === 'damaged',
                }"
              >
                {{ formatStatus(component.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">${{ component.price }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ component.purchaseDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
