<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { UserService } from '@/services/UserService';
import type { LoginDTO } from '@/dtos/user/LoginDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { ref, watch } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { Lock, User } from 'lucide-vue-next';

// -------------------------------
// Setup
// -------------------------------
const router = useRouter();
const userService = UserService.getInstance();

const form = ref<{ username: string; password: string }>({
  username: '',
  password: '',
});

const error = ref<string>('');

// -------------------------------
// Watchers
// -------------------------------
watch(
  form,
  () => {
    if (error.value) error.value = '';
  },
  { deep: true },
);

// -------------------------------
// Functions
// -------------------------------
function login(): void {
  const credentials: LoginDTO = {
    username: form.value.username,
    password: form.value.password,
  };

  if (!credentials.username || !credentials.password) {
    error.value = 'You need to provide valid credentials (non empty username or password)';
  }

  const success = userService.login(credentials);

  if (success) {
    error.value = '';
    router.push({ name: 'dashboard' });
    return;
  }

  error.value = 'Invalid credentials';
}
</script>

<template>
  <!-- Login Form -->
  <form @submit.prevent="login" class="space-y-6">
    <!-- Username input -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Username </label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          v-model="form.username"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Enter your username"
        />
      </div>
    </div>

    <!-- Password input -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Password </label>
      <div class="relative">
        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="password"
          v-model="form.password"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Enter your password"
        />
      </div>
    </div>

    <!-- Login Button -->
    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Sign In
    </button>
  </form>

  <!-- Error message card -->
  <div
    v-if="error"
    role="alert"
    aria-live="polite"
    class="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3"
  >
    <p class="text-sm font-medium text-destructive-foreground">An error has occured</p>
    <p class="mt-1 text-xs text-destructive-foreground/90">{{ error }}</p>
  </div>

  <!-- Register Anchor -->
  <div class="mt-6 text-center">
    <p className="text-sm text-muted-foreground mb-2">¿No tienes una cuenta?</p>
    <RouterLink to="/register" class="text-sm text-primary hover:text-primary/80 transition-colors">
      Crear cuenta nueva
    </RouterLink>
  </div>
</template>
