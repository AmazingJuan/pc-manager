<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { useUsersStore } from '@stores/UsersStore';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Monitor, Users, Settings, BarChart3, LogOut } from 'lucide-vue-next';

// -------------------------------
// Setup
// -------------------------------
const usersStore = useUsersStore();
const router = useRouter();

const loggedInUser = computed(() => usersStore.loggedInUser);

onMounted(() => {
  if (!loggedInUser.value) {
    router.push({ name: 'login' });
  }
});

function logout() {
  usersStore.setLoggedInUser(null);
  router.push({ name: 'login' });
}

function navigateTo(routeName: string) {
  router.push({ name: routeName });
}
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="bg-red-900 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <Monitor class="w-8 h-8 text-white mr-3" />
            <h1 class="text-2xl font-bold text-white">PC Manager</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white">Bienvenido, {{ loggedInUser?.name }}</span>
            <button
              @click="logout"
              class="flex items-center px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut class="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Dashboard Principal</h2>
        <p class="text-gray-300">Gestión completa de equipos de TI</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gray-800 rounded-lg p-6 border border-red-700">
          <div class="flex items-center">
            <Monitor class="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p class="text-gray-400 text-sm">Equipos Registrados</p>
              <p class="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 border border-red-700">
          <div class="flex items-center">
            <Settings class="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p class="text-gray-400 text-sm">Componentes</p>
              <p class="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 border border-red-700">
          <div class="flex items-center">
            <Users class="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p class="text-gray-400 text-sm">Usuarios</p>
              <p class="text-2xl font-bold text-white">{{ usersStore.users.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 border border-red-700">
          <div class="flex items-center">
            <BarChart3 class="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p class="text-gray-400 text-sm">Reportes</p>
              <p class="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-red-700">
        <h3 class="text-xl font-bold text-white mb-4">Acciones Rápidas</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            @click="navigateTo('pcs')"
            class="flex items-center p-4 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors"
          >
            <Monitor class="w-6 h-6 mr-3" />
            <div class="text-left">
              <p class="font-semibold">Gestionar PCs</p>
              <p class="text-sm text-gray-300">Agregar, editar, eliminar equipos</p>
            </div>
          </button>

          <button
            @click="navigateTo('components')"
            class="flex items-center p-4 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors"
          >
            <Settings class="w-6 h-6 mr-3" />
            <div class="text-left">
              <p class="font-semibold">Gestionar Componentes</p>
              <p class="text-sm text-gray-300">Administrar hardware</p>
            </div>
          </button>

          <button
            @click="navigateTo('reports')"
            class="flex items-center p-4 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors"
          >
            <BarChart3 class="w-6 h-6 mr-3" />
            <div class="text-left">
              <p class="font-semibold">Ver Reportes</p>
              <p class="text-sm text-gray-300">Estadísticas e inventario</p>
            </div>
          </button>
        </div>
      </div>

      <div class="mt-8 bg-gray-800 rounded-lg p-6 border border-red-700">
        <h3 class="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
        <div class="space-y-3">
          <div class="flex items-center p-3 bg-gray-700 rounded-lg">
            <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <p class="text-gray-300">Bienvenido al sistema de gestión de PCs</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
