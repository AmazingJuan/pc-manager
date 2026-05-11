<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Third-Party Imports
import { computed } from 'vue';

// -------------------------------
// Own Imports
import { BadgeUtils } from '~/utils/badge.utils';
import { ComputerService } from '~/services/computer.service';

// -------------------------------
// Non-Reactive Variables
const route = useRoute();

// -------------------------------
// Reactive Variables / Computed
const id = computed((): number => {
  const raw = route.params.id;
  const segment = typeof raw === 'string' ? raw : raw?.[0];
  return Number(segment);
});

const { data: computer } = await ComputerService.findById(id);

// -------------------------------
// Setup
useTitleComplement(computer.value ? ` - Computer #${computer.value?.id}` : '');
</script>

<template>
  <div v-if="computer" class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <NuxtLink to="/computers" class="inline-flex items-center text-sm font-medium text-red-500 underline-offset-4 hover:underline">
      Back to computers
    </NuxtLink>

    <header class="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 sm:p-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Computer #{{ computer.id }}</p>
          <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {{ computer.name }}
          </h1>
          <p class="mt-3 text-base text-zinc-400">{{ computer.location }}</p>
        </div>
        <span class="w-fit rounded-full border px-3 py-1 text-xs font-medium" :class="BadgeUtils.statusClasses[computer.status]">
          {{ BadgeUtils.statusLabels[computer.status] }}
        </span>
      </div>

      <p class="mt-8 max-w-3xl text-sm leading-relaxed text-zinc-300">
        {{ computer.notes }}
      </p>
    </header>

    <section class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <p class="text-xs uppercase tracking-widest text-zinc-500">Purchase date</p>
        <p class="mt-2 text-sm font-medium text-zinc-100">{{ computer.purchaseDate }}</p>
      </div>
      <div class="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <p class="text-xs uppercase tracking-widest text-zinc-500">Warranty expires</p>
        <p class="mt-2 text-sm font-medium text-zinc-100">
          {{ computer.warrantyExpirationDate }}
        </p>
      </div>
      <div class="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <p class="text-xs uppercase tracking-widest text-zinc-500">Created at</p>
        <p class="mt-2 text-sm font-medium text-zinc-100">
          {{ new Date(computer.createdAt).toLocaleDateString('en-US') }}
        </p>
      </div>
    </section>
  </div>
</template>
