<script setup lang="ts">
// Author: Juan Pablo Avendaño
// -------------------------------
// Own Imports
// -------------------------------
import AuthLayout from '@layouts/AuthLayout.vue';
import { AuthService } from '@services/AuthService';
import MainLayout from '@layouts/MainLayout.vue';
</script>

<template>
  <MainLayout v-if="AuthService.hasLoggedInUser()" />
  <AuthLayout v-else />
</template>
