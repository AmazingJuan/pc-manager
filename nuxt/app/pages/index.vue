<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Setup
useTitleComplement(' - Home');
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="relative pl-5 sm:pl-6">
      <div class="absolute left-0 top-0 h-full w-1 rounded-full bg-red-600 sm:w-1.5" aria-hidden="true" />
      <p class="text-xs font-semibold uppercase tracking-widest text-red-600">PC Manager</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Computer Manager</h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        Helps IT teams keep computer records, installed components, and user assignments in one system. The deployed application adds status history
        and reporting on a shared database instead of maintaining parallel spreadsheets.
      </p>
    </header>

    <section class="mt-14">
      <h2 class="text-lg font-semibold text-zinc-50">What the system covers</h2>

      <ul class="mt-8 grid gap-4 sm:grid-cols-3">
        <li class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm ring-1 ring-white/5">
          <h3 class="text-sm font-semibold text-zinc-50">Computer inventory</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
            Store host names, location, operating system, and whether the unit is active, in maintenance, or out of service.
          </p>
        </li>
        <li class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm ring-1 ring-white/5">
          <h3 class="text-sm font-semibold text-zinc-50">Components</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
            Link parts to a computer and record purchase and warranty dates for planning replacements.
          </p>
        </li>
        <li class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm ring-1 ring-white/5">
          <h3 class="text-sm font-semibold text-zinc-50">Access control</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
            Role-based screens so operators and administrators see the actions that match their permissions.
          </p>
        </li>
      </ul>
    </section>

    <section class="mt-14 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800/60 p-6 sm:p-8">
      <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-zinc-50">Sections</h2>
          <p class="mt-1 text-sm text-zinc-400">Blog articles, computer catalog, and tools area.</p>
        </div>
      </div>

      <ul class="mt-6 grid gap-3 sm:grid-cols-3">
        <li>
          <NuxtLink
            to="/blog"
            class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 transition-colors hover:border-red-600/80 hover:bg-zinc-900 sm:min-h-[100px]"
          >
            <span class="text-sm font-semibold text-red-600">Blog</span>
            <span class="mt-1 text-xs text-zinc-400">Articles on IT asset management</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/computers"
            class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 transition-colors hover:border-red-600/80 hover:bg-zinc-900 sm:min-h-[100px]"
          >
            <span class="text-sm font-semibold text-red-600">Computers</span>
            <span class="mt-1 text-xs text-zinc-400">Directory of machines and per-device details</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/tools"
            class="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 transition-colors hover:border-red-600/80 hover:bg-zinc-900 sm:min-h-[100px]"
          >
            <span class="text-sm font-semibold text-red-600">Tools</span>
            <span class="mt-1 text-xs text-zinc-400">Extra pages such as FAQs or small utilities</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
