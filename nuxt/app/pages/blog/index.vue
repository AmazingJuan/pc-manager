<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
import { ArticleService } from '~/services/article.service';

// -------------------------------
// Non-Reactive Variables
const articles = ArticleService.getAll();

// -------------------------------
// Setup
useTitleComplement(' - Blog');
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Articles</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Blog</h1>
        <p class="mt-2 max-w-2xl text-sm text-zinc-400">Notes on inventory practices and lifecycle tracking.</p>
      </div>
      <UiBackHomeLink />
    </header>

    <ul class="mt-12 grid gap-4">
      <li v-for="article in articles" :key="article.id">
        <NuxtLink
          :to="`/blog/${article.slug}`"
          class="group block rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 transition-colors hover:border-red-600/80 hover:bg-zinc-900/90"
        >
          <h2 class="text-lg font-semibold text-zinc-50 group-hover:text-red-500">{{ article.title }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ article.overview }}</p>
          <p class="mt-4 text-xs text-zinc-500">
            {{ article.publishedAt }} · {{ article.author }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
