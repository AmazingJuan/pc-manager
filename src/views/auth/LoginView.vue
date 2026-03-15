<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import type { LoginDTO } from '@dtos/auth/LoginDTO';
import { LoginSchema } from '@schemas/user/LoginSchema';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ErrorMessage, Field, Form } from 'vee-validate';
import { Lock, User } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// -------------------------------
// Non Reactive Variables
// -------------------------------
const router = useRouter();
const authService = AuthService.getInstance();

// -------------------------------
// Reactive Variables
// -------------------------------
const error = ref('');

// -------------------------------
// Functions
// -------------------------------
function handleSubmit(values: Record<string, unknown>): void {
  const credentials: LoginDTO = {
    username: String(values.username),
    password: String(values.password),
  };

  const success = authService.login(credentials);

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
  <Form @submit="handleSubmit" :validation-schema="LoginSchema" class="space-y-6">
    <!-- Username field -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Username </label>
      <Field
        v-slot="{ field, errorMessage }"
        name="username"
        :validate-on-blur="false"
        :validate-on-change="false"
        :validate-on-input="false"
        :validate-on-model-update="false"
      >
        <div class="relative">
          <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            v-bind="field"
            type="text"
            class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="Enter your username"
          />
        </div>
      </Field>
      <ErrorMessage name="username" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <!-- Password field -->
    <div>
      <label class="block text-sm text-foreground mb-2"> Password </label>
      <Field
        v-slot="{ field, errorMessage }"
        name="password"
        :validate-on-blur="false"
        :validate-on-change="false"
        :validate-on-input="false"
        :validate-on-model-update="false"
      >
        <div class="relative">
          <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            v-bind="field"
            type="password"
            class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="Enter your password"
          />
        </div>
      </Field>
      <ErrorMessage name="password" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <!-- Error message card -->
    <div v-if="error" role="alert" aria-live="polite" class="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
      <p class="text-sm font-medium text-destructive-foreground">Login error</p>
      <p class="mt-1 text-xs text-destructive-foreground/90">{{ error }}</p>
    </div>

    <!-- Login Button -->
    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Sign In
    </button>
  </Form>

  <!-- Register Anchor -->
  <div class="mt-6 text-center">
    <p class="text-sm text-muted-foreground mb-2">Don't have an account?</p>
    <RouterLink to="/register" class="text-sm text-primary hover:text-primary/80 transition-colors"> Sign up </RouterLink>
  </div>
</template>
