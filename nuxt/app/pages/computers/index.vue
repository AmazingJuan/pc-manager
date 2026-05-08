<script setup lang="ts">
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

const { data: computers, pending, error } = await useFetch<Computer[]>('/api/computers')

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
  title: 'Computers | Computer Manager',
  description: 'SSR directory of computers served by the Nuxt server layer.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Inventory</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Computers
        </h1>
        <p class="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
          Machines loaded from Nuxt server endpoints and rendered as SSR pages.
        </p>
      </div>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-red-600 hover:text-red-500"
      >
        Back home
      </NuxtLink>
    </header>

    <div
      v-if="pending"
      class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400"
    >
      Loading computers...
    </div>

    <div
      v-else-if="error"
      class="mt-10 rounded-lg border border-red-900/60 bg-red-950/40 p-6 text-sm text-red-200"
    >
      Computers could not be loaded.
    </div>

    <ul v-else class="mt-10 grid gap-4 md:grid-cols-2">
      <li v-for="computer in computers" :key="computer.id">
        <NuxtLink
          :to="`/computers/${computer.id}`"
          class="group flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-5 shadow-sm ring-1 ring-white/5 transition-colors hover:border-red-600/80 hover:bg-zinc-900/80"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-zinc-50 group-hover:text-red-500">
                {{ computer.name }}
              </h2>
              <p class="mt-1 text-sm text-zinc-400">{{ computer.location }}</p>
            </div>
            <span
              class="shrink-0 rounded-full border px-3 py-1 text-xs font-medium"
              :class="statusClasses[computer.status]"
            >
              {{ statusLabels[computer.status] }}
            </span>
          </div>

          <dl class="mt-5 grid gap-4 border-t border-zinc-800 pt-5 sm:grid-cols-2">
            <div>
              <dt class="text-xs uppercase tracking-widest text-zinc-500">Purchase</dt>
              <dd class="mt-1 text-sm text-zinc-200">{{ computer.purchaseDate }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-widest text-zinc-500">Warranty</dt>
              <dd class="mt-1 text-sm text-zinc-200">{{ computer.warrantyExpirationDate }}</dd>
            </div>
          </dl>

          <p class="mt-5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {{ computer.notes }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
