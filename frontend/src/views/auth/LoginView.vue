<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { LoginDTO } from '@dtos/auth/LoginDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { AuthService } from '@services/AuthService';
import { UserService } from '@services/UserService';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Lock, User } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const router = useRouter();

// -------------------------------
// Reactive Variables
// -------------------------------
const errorMessages = ref<string[]>([]);
const users = ref<UserInterface[]>([]);
const username = ref('');
const password = ref('');
const firstAdminUser = computed(() => users.value.find((user) => user.role === 'admin'));
const firstStandardUser = computed(() => users.value.find((user) => user.role === 'user'));

// -------------------------------
// Functions
// -------------------------------
async function handleSubmit(): Promise<void> {
  const credentials: LoginDTO = { username: username.value, password: password.value };

  try {
    await AuthService.login(credentials);
    errorMessages.value = [];
    router.push({ name: 'dashboard' });
  } catch (requestError: unknown) {
    if (Array.isArray(requestError)) {
      errorMessages.value = requestError as string[];
    } else {
      errorMessages.value = ['Invalid credentials'];
    }
  }
}

async function loadUsers(): Promise<void> {
  users.value = await UserService.getAll();
}

onMounted(loadUsers);
</script>

<template>
  <!-- Login Form -->
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Username field -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Username </label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="username"
          type="text"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Enter your username"
          required
        />
      </div>
    </div>

    <!-- Password field -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Password </label>
      <div class="relative">
        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="password"
          type="password"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Enter your password"
          required
        />
      </div>
    </div>

    <!-- Error message card -->
    <div v-if="errorMessages.length" role="alert" aria-live="polite" class="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
      <p class="text-sm font-medium text-destructive-foreground">Login error</p>
      <ul class="mt-1 list-disc pl-5 text-xs text-destructive-foreground/90">
        <li v-for="message in errorMessages" :key="message">{{ message }}</li>
      </ul>
    </div>

    <!-- Login Button -->
    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Sign In
    </button>
  </form>

  <!-- Register Anchor -->
  <div class="mt-6 text-center">
    <p class="text-sm text-muted-foreground mb-2">Don't have an account?</p>
    <RouterLink to="/register" class="text-sm text-primary hover:text-primary/80 transition-colors"> Sign up </RouterLink>
  </div>

  <div v-if="firstAdminUser || firstStandardUser" class="mt-6 p-4 bg-secondary/50 rounded-lg">
    <p class="text-xs text-muted-foreground text-center mb-2">Test credentials:</p>
    <div class="text-xs space-y-1">
      <p v-if="firstAdminUser" class="text-foreground">
        <span class="text-primary">Admin:</span> {{ firstAdminUser.username }} / {{ firstAdminUser.password }}
      </p>
      <p v-if="firstStandardUser" class="text-foreground">
        <span class="text-primary">User:</span> {{ firstStandardUser.username }} / {{ firstStandardUser.password }}
      </p>
    </div>
  </div>
</template>
