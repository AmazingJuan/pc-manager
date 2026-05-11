<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Own Imports
import { BadgeUtils } from '~/utils/badge.utils';
import { ComputerService } from '~/services/computer.service';

// -------------------------------
// Reactive Variables / Computed
const { data: computers, pending, error } = await ComputerService.findAll();

// -------------------------------
// Setup
useTitleComplement(' - Computers inventory');
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Inventory</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Computers</h1>
      </div>
      <UiBackHomeLink />
    </header>

    <div v-if="pending" class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">Loading computers...</div>

    <div v-else-if="error" class="mt-10 rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200">
      Computers could not be loaded.
    </div>

    <ul v-else class="mt-10 grid gap-4 md:grid-cols-2">
      <li v-for="computer in computers" :key="computer.id">
        <NuxtLink
          :to="`/computers/${computer.id}`"
          class="group flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-5 shadow-sm ring-1 ring-white/5 transition-colors hover:border-red-600/80 hover:bg-zinc-900/80"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-semibold text-zinc-50 group-hover:text-red-500">
                {{ computer.name }}
              </h2>
              <p class="mt-1 text-sm text-zinc-400">{{ computer.location }}</p>
            </div>
            <span class="shrink-0 rounded-full border px-3 py-1 text-xs font-medium" :class="BadgeUtils.statusClasses[computer.status]">
              {{ BadgeUtils.statusLabels[computer.status] }}
            </span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
