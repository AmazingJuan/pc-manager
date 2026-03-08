<script setup lang="ts">
// Third-Party Imports
import { Lock, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const form = ref({
  username: '',
  password: '',
})

function handleSubmit() {}
</script>

<template>
  <!-- Login Form -->
  <form @submit.prevent="{ handleSubmit }" class="space-y-6">
    <!-- Username input -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Usuario </label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          v-model="form.username"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Ingrese su usuario"
        />
      </div>
    </div>

    <!-- Password input -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Contraseña </label>
      <div class="relative">
        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="password"
          v-model="form.password"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Ingrese su contraseña"
        />
      </div>
    </div>

    <!-- Login Button -->
    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Iniciar Sesión
    </button>
  </form>

  <!-- Register Anchor -->
  <div class="mt-6 text-center">
    <p className="text-sm text-muted-foreground mb-2">¿No tienes una cuenta?</p>
    <RouterLink to="/register" class="text-sm text-primary hover:text-primary/80 transition-colors">
      Crear cuenta nueva
    </RouterLink>
  </div>
</template>
