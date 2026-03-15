<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import type { RegisterDTO } from '@dtos/auth/RegisterDTO';
import { RegisterSchema } from '@schemas/user/RegisterSchema';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ArrowLeft, Lock, Mail, User } from 'lucide-vue-next';
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
function onSubmit(values: Record<string, unknown>): void {
  const registerData: RegisterDTO = {
    name: String(values.name ?? ''),
    username: String(values.username ?? ''),
    email: String(values.email ?? ''),
    password: String(values.password ?? ''),
  };

  const success = authService.register(registerData);

  if (success) {
    error.value = '';
    router.push({ name: 'dashboard' });
    return;
  }

  error.value = 'Username or email already exists';
}
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="RegisterSchema" class="space-y-5">
    <!-- Name Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Full Name</label>
      <Field
        v-slot="{ field, errorMessage }"
        name="name"
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
            placeholder="Enter your full name"
          />
        </div>
      </Field>
      <ErrorMessage name="name" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <!-- Username Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Username</label>
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

    <!-- Email Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Email</label>
      <Field
        v-slot="{ field, errorMessage }"
        name="email"
        :validate-on-blur="false"
        :validate-on-change="false"
        :validate-on-input="false"
        :validate-on-model-update="false"
      >
        <div class="relative">
          <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            v-bind="field"
            type="email"
            class="w-full pl-11 pr-4 py-3 bg-input rounded-lg border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            :class="errorMessage ? 'border-destructive' : 'border-border'"
            placeholder="example@email.com"
          />
        </div>
      </Field>
      <ErrorMessage name="email" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <!-- Password Field -->
    <div>
      <label class="block text-sm text-foreground mb-2">Password</label>
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
            placeholder="Minimum 8 characters"
          />
        </div>
      </Field>
      <ErrorMessage name="password" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <button
      type="submit"
      class="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
    >
      Create Account
    </button>
  </Form>

  <!-- Error message card -->
  <div v-if="error" role="alert" aria-live="polite" class="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
    <p class="text-sm font-medium text-destructive-foreground">Registration error</p>
    <p class="mt-1 text-xs text-destructive-foreground/90">{{ error }}</p>
  </div>

  <!-- Back to login link -->
  <div class="mt-6 text-center">
    <RouterLink to="/login" class="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
      <ArrowLeft class="w-4 h-4" />
      Back to login
    </RouterLink>
  </div>
</template>
