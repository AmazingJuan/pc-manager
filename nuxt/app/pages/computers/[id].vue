<script setup lang="ts">
import { computed } from 'vue'

interface Computer {
  id: number
  name: string
  location: string
  status: 'active' | 'inactive' | 'maintenance'
  purchaseDate: string
  warrantyExpirationDate: string
  notes: string
  createdAt: string
  userId: number | null
}

const route = useRoute()
const id = computed(() => route.params.id)

const { data: computer, error } = await useFetch<Computer>(() => `/api/computers/${id.value}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || 'Computer not found',
  })
}

const statusLabels: Record<Computer['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  maintenance: 'Maintenance',
}

const statusClasses: Record<Computer['status'], string> = {
  active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  inactive: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300',
  maintenance: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
}

useSeoMeta({
  title: () => `${computer.value?.name || 'Computer'} | Computer Manager`,
  description: () =>
    computer.value
      ? `${computer.value.name} inventory detail rendered by Nuxt SSR.`
      : 'Computer detail rendered by Nuxt SSR.',
})
</script>

<template>
  <div v-if="computer" class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <NuxtLink
      to="/computers"
      class="inline-flex items-center text-sm font-medium text-red-500 underline-offset-4 hover:underline"
    >
      Back to computers
    </NuxtLink>

    <header class="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 sm:p-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-red-600">
            Computer #{{ computer.id }}
          </p>
          <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {{ computer.name }}
          </h1>
          <p class="mt-3 text-base text-zinc-400">{{ computer.location }}</p>
        </div>
        <span
          class="w-fit rounded-full border px-3 py-1 text-xs font-medium"
          :class="statusClasses[computer.status]"
        >
          {{ statusLabels[computer.status] }}
        </span>
      </div>

      <p class="mt-8 max-w-3xl text-sm leading-relaxed text-zinc-300">
        {{ computer.notes }}
      </p>
    </header>

    <section class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <p class="text-xs uppercase tracking-widest text-zinc-500">Assigned user</p>
        <p class="mt-2 text-sm font-medium text-zinc-100">
          {{ computer.userId ? `User #${computer.userId}` : 'Unassigned' }}
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
