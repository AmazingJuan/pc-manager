<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import StatCard from '@components/dashboard/StatCardComponent.vue';
import { UserService } from '@services/UserService';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Activity, AlertTriangle, Cpu, Monitor, TrendingUp, Users } from 'lucide-vue-next';
import { ref } from 'vue';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const userService = UserService.getInstance();
const componentService = ComponentService.getInstance();
const computerService = ComputerService.getInstance();

const computers = computerService.getAll();
const components = componentService.getAll();
const users = userService.getAll();

// -------------------------------
// Reactive Variables
// -------------------------------
const stats = ref({
  totalComputers: 0,
  activeComputers: 0,
  totalComponents: 0,
  availableComponents: 0,
  totalUsers: 0,
  maintenanceComputers: 0,
});

stats.value = {
  totalComputers: computers.length,
  activeComputers: computers.filter((computer) => computer.status === 'active').length,
  totalComponents: components.length,
  availableComponents: components.filter((component) => component.status === 'available').length,
  totalUsers: users.length,
  maintenanceComputers: computers.filter((computer) => computer.status === 'maintenance').length,
};
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl text-foreground mb-2">Main Dashboard</h1>
      <p class="text-muted-foreground">General overview of the computer management system</p>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Computers"
        :value="stats.totalComputers"
        :icon="Monitor"
        color="primary"
      />
      <StatCard
        title="Active Computers"
        :value="stats.activeComputers"
        :icon="Activity"
        color="success"
      />
      <StatCard
        title="In Maintenance"
        :value="stats.maintenanceComputers"
        :icon="AlertTriangle"
        color="warning"
      />
      <StatCard
        title="Total Components"
        :value="stats.totalComponents"
        :icon="Cpu"
        color="primary"
      />
      <StatCard
        title="Available Components"
        :value="stats.availableComponents"
        :icon="TrendingUp"
        color="success"
      />
      <StatCard title="Registered Users" :value="stats.totalUsers" :icon="Users" color="primary" />
    </div>
    <!--
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-card rounded-lg p-6 border border-border">
        <h2 class="text-xl text-foreground mb-4">Computers by Status</h2>
        <div class="space-y-3">
          <div v-for="item in chartData" :key="item.name" class="flex items-center gap-4">
            <div class="w-32 text-sm text-muted-foreground">{{ item.name }}</div>
            <div class="flex-1 bg-secondary/30 rounded-full h-4 overflow-hidden">
              <div
                class="h-4 rounded-full"
                :class="barColor(item.name)"
                :style="{ width: barWidth(item.count), minWidth: '10px' }"
              />
            </div>
            <div class="w-12 text-right text-sm font-semibold text-foreground">
              {{ item.count }}
            </div>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg p-6 border border-border">
        <h2 class="text-xl text-foreground mb-4">Components by Status</h2>
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

          <div class="mt-4">
            <div class="text-sm text-muted-foreground mb-2">Distribution</div>
            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="(item, index) in pieData"
                :key="`progress-${item.name}`"
                class="flex items-center gap-3"
              >
                <div class="w-16 text-xs text-muted-foreground">{{ item.name }}</div>
                <div class="flex-1 bg-secondary/30 rounded-full h-3 overflow-hidden">
                  <div
                    class="h-3 rounded-full"
                    :style="{
                      width: `${piePercent(item.value)}%`,
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

    <div class="bg-card rounded-lg p-6 border border-border">
      <h2 class="text-xl text-foreground mb-4">Resumen del Sistema</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm text-muted-foreground mb-3">Computer Status</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Tasa de Disponibilidad</span>
              <span class="text-sm text-primary">{{ availabilityRate }}%</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Need Attention</span>
              <span class="text-sm text-destructive">{{ stats.maintenancePCs }}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm text-muted-foreground mb-3">Component Status</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">Disponibles para Uso</span>
              <span class="text-sm text-primary">{{ stats.availableComponents }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span class="text-sm text-foreground">En Uso</span>
              <span class="text-sm text-foreground">
                {{ stats.totalComponents - stats.availableComponents }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>
