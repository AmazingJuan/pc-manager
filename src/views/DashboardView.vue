<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import StatCard from '@components/StatCard.vue';
import { getComponents, getPCs, getUsers } from '@services/localStorage';

// -------------------------------
// Third-Party Imports
// -------------------------------

import { computed, onMounted, ref } from 'vue';
import {
  Monitor,
  Cpu,
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
} from 'lucide-vue-next';


interface Stats {
  totalPCs: number;
  activePCs: number;
  totalComponents: number;
  availableComponents: number;
  totalUsers: number;
  maintenancePCs: number;
}

const stats = ref<Stats>({
  totalPCs: 0,
  activePCs: 0,
  totalComponents: 0,
  availableComponents: 0,
  totalUsers: 0,
  maintenancePCs: 0,
});

const chartData = ref<Array<{ name: string; count: number }>>([
  { name: 'Activos', count: 0 },
  { name: 'Inactivos', count: 0 },
  { name: 'Mantenimiento', count: 0 },
]);
const pieData = ref<Array<{ name: string; value: number }>>([
  { name: 'Disponibles', value: 0 },
  { name: 'En Uso', value: 0 },
  { name: 'Mantenimiento', value: 0 },
  { name: 'Dañados', value: 0 },
]);

const pieColors = ['#dc2626', '#ef4444', '#f87171', '#fca5a5'];

const loadDashboardStats = () => {
  const pcs = getPCs();
  const components = getComponents();
  const users = getUsers();

  stats.value = {
    totalPCs: pcs.length,
    activePCs: pcs.filter((pc) => pc.status === 'active').length,
    totalComponents: components.length,
    availableComponents: components.filter((c) => c.status === 'available').length,
    totalUsers: users.length,
    maintenancePCs: pcs.filter((pc) => pc.status === 'maintenance').length,
  };

  chartData.value = [
    { name: 'Activos', count: pcs.filter((pc) => pc.status === 'active').length },
    { name: 'Inactivos', count: pcs.filter((pc) => pc.status === 'inactive').length },
    { name: 'Mantenimiento', count: pcs.filter((pc) => pc.status === 'maintenance').length },
  ];

  pieData.value = [
    { name: 'Disponibles', value: components.filter((c) => c.status === 'available').length },
    { name: 'En Uso', value: components.filter((c) => c.status === 'in-use').length },
    { name: 'Mantenimiento', value: components.filter((c) => c.status === 'maintenance').length },
    { name: 'Dañados', value: components.filter((c) => c.status === 'damaged').length },
  ];
};

const maxBarCount = computed(() => Math.max(...chartData.value.map((item) => item.count), 1));

const barWidth = (count: number) => `${Math.round((count / maxBarCount.value) * 100)}%`;

const barColor = (name: string) => {
  if (name === 'Activos') return 'bg-emerald-500';
  if (name === 'Inactivos') return 'bg-slate-400';
  return 'bg-amber-400';
};

const piePercent = (value: number) => {
  const total = pieData.value.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

const availabilityRate = computed(() => {
  if (stats.value.totalPCs === 0) return 0;
  return ((stats.value.activePCs / stats.value.totalPCs) * 100).toFixed(1);
});

onMounted(loadDashboardStats);
</script>


<template>
  <div class="space-y-10">
    <div class="mb-6">
      <h1 class="text-3xl text-foreground mb-2">Dashboard Principal</h1>
      <p class="text-muted-foreground max-w-2xl">Vista general del sistema de gestión de PCs</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <StatCard
        title="Total de PCs"
        :value="stats.totalPCs"
        :icon="Monitor"
        color="primary"
        :trend="{ value: 12, isPositive: true }"
      />
      <StatCard title="PCs Activos" :value="stats.activePCs" :icon="Activity" color="success" />
      <StatCard
        title="En Mantenimiento"
        :value="stats.maintenancePCs"
        :icon="AlertTriangle"
        color="warning"
      />
      <StatCard title="Total Componentes" :value="stats.totalComponents" :icon="Cpu" color="primary" />
      <StatCard
        title="Componentes Disponibles"
        :value="stats.availableComponents"
        :icon="TrendingUp"
        color="success"
      />
      <StatCard title="Usuarios Registrados" :value="stats.totalUsers" :icon="Users" color="primary" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-xl text-foreground mb-4">PCs por Estado</h2>
        <div class="space-y-3">
          <div
            v-for="item in chartData"
            :key="item.name"
            class="flex items-center gap-4"
          >
            <div class="w-32 text-sm text-muted-foreground">{{ item.name }}</div>
            <div class="flex-1 bg-secondary/30 rounded-full h-4 overflow-hidden">
              <div
                class="h-4 rounded-full"
                :class="barColor(item.name)"
                :style="{ width: barWidth(item.count), minWidth: '10px' }"
              />
            </div>
            <div class="w-12 text-right text-sm font-semibold text-foreground">{{ item.count }}</div>
          </div>

          <p v-if="stats.totalPCs === 0" class="text-sm text-muted-foreground mt-4">
            No hay PCs registrados aún. Crea uno en el módulo de PCs para comenzar.
          </p>
        </div>
      </div>

      <div class="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="text-xl text-foreground mb-4">Componentes por Estado</h2>
        <div class="space-y-3">
          <div
            v-for="(item, index) in pieData"
            :key="item.name"
            class="flex items-center justify-between gap-3"
          >
            <div class="flex items-center gap-3">
              <span
                class="h-3 w-3 rounded-full"
                :style="{ backgroundColor: pieColors[index % pieColors.length] }"
              />
              <span class="text-sm text-muted-foreground">{{ item.name }}</span>
            </div>
            <span class="text-sm font-semibold text-foreground">{{ item.value }}</span>
          </div>

          <p v-if="stats.totalComponents === 0" class="text-sm text-muted-foreground mt-4">
            No hay componentes registrados aún. Agrega uno para que se muestre en el dashboard.
          </p>

          <div class="mt-4">
            <div class="text-sm text-muted-foreground mb-2">Distribución</div>
            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="(item, index) in pieData"
                :key="`progress-${item.name}`"
                class="flex items-center gap-3"
              >
                <div class="w-12 text-xs text-muted-foreground">{{ item.name }}</div>
                <div class="flex-1 bg-secondary/30 rounded-full h-3 overflow-hidden">
                  <div
                    class="h-3 rounded-full"
                    :style="{
                      width: piePercent(item.value) + '%',
                      backgroundColor: pieColors[index % pieColors.length],
                    }"
                  />
                </div>
                <div class="w-12 text-right text-xs font-semibold text-foreground">
                  {{ piePercent(item.value) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 bg-card rounded-2xl p-6 border border-border shadow-sm">
      <h2 class="text-xl text-foreground mb-4">Resumen del Sistema</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm text-muted-foreground mb-3">Estado de PCs</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Tasa de Disponibilidad</span>
              <span class="text-sm text-primary">
                {{ availabilityRate }}%
              </span>
            </div>
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Requieren Atención</span>
              <span class="text-sm text-destructive">{{ stats.maintenancePCs }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-sm text-muted-foreground mb-3">Estado de Componentes</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Disponibles para Uso</span>
              <span class="text-sm text-primary">{{ stats.availableComponents }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">En Uso</span>
              <span class="text-sm text-foreground">{{ stats.totalComponents - stats.availableComponents }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
