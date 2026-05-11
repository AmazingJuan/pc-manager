<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Setup
useTitleComplement(' - Tools');
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Utilities</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Tools</h1>
        <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
          Quick calculators and reference material for everyday IT work. Your inputs stay on this device unless you copy or print them yourself.
        </p>
      </div>
      <UiBackHomeLink />
    </header>

    <ul class="mt-12 grid gap-6 sm:grid-cols-2">
      <li>
        <NuxtLink
          to="/tools/calculator"
          class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 transition-colors hover:border-red-600/70 hover:bg-zinc-900/90"
        >
          <span class="text-sm font-semibold text-red-600">Calculators</span>
          <span class="mt-2 text-sm leading-relaxed text-zinc-400">Arithmetic and tip calculator for quick estimates.</span>
          <span class="mt-4 text-xs font-medium text-zinc-500">Several sections inside</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/tools/help"
          class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 transition-colors hover:border-red-600/70 hover:bg-zinc-900/90"
        >
          <span class="text-sm font-semibold text-red-600">Quick help</span>
          <span class="mt-2 text-sm leading-relaxed text-zinc-400">Short FAQs for common IT desk questions.</span>
          <span class="mt-4 text-xs font-medium text-zinc-500">Several sections inside</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
