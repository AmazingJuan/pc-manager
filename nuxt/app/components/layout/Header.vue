<!-- Author: Juan Pablo Avendaño -->

<template>
  <header class="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-900 text-zinc-50">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90">
        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
        </span>
        <span class="text-left">
          <span class="flex items-center gap-2 text-xl font-medium text-red-600"> Computer Manager </span>
          <span class="block text-xs text-zinc-400">IT equipment management</span>
        </span>
      </NuxtLink>

      <nav aria-label="Main">
        <ul class="flex flex-wrap items-center gap-1 sm:justify-end">
          <UiSidebarElement to="/">Home</UiSidebarElement>
          <UiSidebarElement to="/blog">Blog</UiSidebarElement>
          <UiSidebarElement to="/computers">Computers</UiSidebarElement>
          <UiSidebarElement to="/tools">Tools</UiSidebarElement>
        </ul>
      </nav>
    </div>
  </header>
</template>
