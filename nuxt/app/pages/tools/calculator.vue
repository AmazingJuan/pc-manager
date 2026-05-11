<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Setup
useTitleComplement(' - Calculators');
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <NuxtLink to="/tools" class="text-sm font-medium text-red-500 hover:underline">← Tools</NuxtLink>
        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-50">Calculators</h1>
        <p class="mt-1 text-sm text-zinc-400">Pick a utility below. State stays on your device.</p>
      </div>
    </div>

    <nav aria-label="Calculator sections" class="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
      <NuxtLink
        to="/tools/calculator"
        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
        exact-active-class="bg-red-600/20 text-red-400"
      >
        Overview
      </NuxtLink>
      <NuxtLink
        to="/tools/calculator/arithmetic"
        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
        exact-active-class="bg-red-600/20 text-red-400"
      >
        Arithmetic
      </NuxtLink>
      <NuxtLink
        to="/tools/calculator/tip"
        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
        exact-active-class="bg-red-600/20 text-red-400"
      >
        Tip
      </NuxtLink>
    </nav>

    <div class="mt-8">
      <NuxtPage />
    </div>
  </div>
</template>
