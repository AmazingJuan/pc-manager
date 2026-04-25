<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import type { RegisterDTO } from '@dtos/auth/RegisterDTO';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ArrowLeft, Lock, Mail, User } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const router = useRouter();

// -------------------------------
// Reactive Variables
// -------------------------------
const errorMessages = ref<string[]>([]);
const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');

// -------------------------------
// Functions
// -------------------------------
async function onSubmit(): Promise<void> {
  const registerData: RegisterDTO = { name: name.value, username: username.value, email: email.value, password: password.value };

  try {
    await AuthService.register(registerData);
    errorMessages.value = [];
    router.push({ name: 'dashboard' });
  } catch (requestError: unknown) {
    if (Array.isArray(requestError)) {
      errorMessages.value = requestError as string[];
    } else {
      errorMessages.value = ['Registration failed'];
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-5">
    <!-- Name Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Full Name</label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="name"
          type="text"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Enter your full name"
          required
        />
      </div>
    </div>

    <!-- Username Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Username</label>
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

    <!-- Email Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Email</label>
      <div class="relative">
        <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="email"
          type="email"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="example@email.com"
          required
        />
      </div>
    </div>

    <!-- Password Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Password</label>
      <div class="relative">
        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="password"
          type="password"
          class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Minimum 8 characters"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Create Account
    </button>
  </form>

  <!-- Error message card -->
  <div v-if="errorMessages.length" role="alert" aria-live="polite" class="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
    <p class="text-sm font-medium text-destructive-foreground">Registration error</p>
    <ul class="mt-1 list-disc pl-5 text-xs text-destructive-foreground/90">
      <li v-for="message in errorMessages" :key="message">{{ message }}</li>
    </ul>
  </div>

  <!-- Back to login link -->
  <div class="mt-6 text-center">
    <RouterLink to="/login" class="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
      <ArrowLeft class="w-4 h-4" />
      Back to login
    </RouterLink>
  </div>
</template>
