<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-800 bg-zinc-900 text-zinc-50">
    <div class="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-md">
          <p class="text-sm font-medium text-zinc-50">Computer Manager</p>
          <p class="mt-1 text-sm text-zinc-400">Centralized inventory for computers and components.</p>
        </div>
        <nav aria-label="Footer">
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <NuxtLink
                to="/blog"
                class="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
              >
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/computers"
                class="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
              >
                Computers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/tools"
                class="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-red-600 hover:underline"
              >
                Tools
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mt-8 border-t border-zinc-800 pt-6 text-xs text-zinc-400">
        <p>© {{ currentYear }} Computer Manager</p>
      </div>
    </div>
  </footer>
</template>
