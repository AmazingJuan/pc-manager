<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import AuthLayout from '@layouts/AuthLayout.vue';
import { AuthService } from '@services/AuthService';
import MainLayout from '@layouts/MainLayout.vue';

const authService = AuthService.getInstance();
</script>

<template>
  <MainLayout v-if="authService.hasLoggedInUser()" />
  <AuthLayout v-else />
</template>
