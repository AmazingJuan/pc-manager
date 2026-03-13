<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import AuthLayout from '@layouts/AuthLayout.vue';
import MainLayout from '@layouts/MainLayout.vue';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAuthRoute = computed(() => route.meta.layout === 'auth');
</script>

<template>
  <AuthLayout v-if="isAuthRoute" />
  <MainLayout v-else />
</template>
