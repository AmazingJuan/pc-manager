<!-- Author: PC Manager -->
<script setup lang="ts">
// -------------------------------
// Third-Party Imports
import { computed } from 'vue';
import type { NuxtError } from '#app';

// -------------------------------
// Props
const props = defineProps<{ error: NuxtError }>();

// -------------------------------
// Reactive Variables / Computed
const code = computed(() => {
  const e = props.error as NuxtError & { statusCode?: number };
  return Number(e.statusCode ?? e.status) || 500;
});

const message = computed(() => {
  const e = props.error as NuxtError & { statusMessage?: string };
  return e.statusMessage ?? e.statusText ?? e.message ?? '';
});

const isNotFound = computed(() => code.value === 404);

const heading = computed(() => (isNotFound.value ? 'This page could not be found' : 'Something went wrong'));

// -------------------------------
// Functions
function goHome() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="relative pl-5 sm:pl-6">
        <div class="absolute left-0 top-0 h-full w-1 rounded-full bg-red-600 sm:w-1.5" aria-hidden="true" />
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Error</p>
        <p class="mt-2 text-5xl font-semibold tabular-nums tracking-tight text-zinc-100 sm:text-6xl">
          {{ code }}
        </p>
        <h1 class="mt-6 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {{ heading }}
        </h1>
        <p v-if="message" class="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {{ message }}
        </p>
        <div class="mt-10">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-red-600 hover:text-red-500"
            @click="goHome"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
