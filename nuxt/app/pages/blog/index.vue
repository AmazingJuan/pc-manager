<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
import { ArticleService } from '~/services/article.service';

// -------------------------------
// Reactive Variables / Computed
const articles = ArticleService.getAll();

// -------------------------------
// Setup
useTitleComplement(' - Blog articles');
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-red-600">Blog</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Articles</h1>
      </div>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-red-600 hover:text-red-500"
      >
        Back home
      </NuxtLink>
    </header>

    <ul class="mt-10 flex flex-col gap-6">
      <li v-for="article in articles" :key="article.id">
        <article class="rounded-lg border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 transition-colors hover:border-red-600/60">
          <p class="text-xs text-zinc-500">{{ article.publishedAt }} · {{ article.author }}</p>
          <h2 class="mt-2 text-xl font-semibold text-zinc-50">
            <NuxtLink :to="`/blog/${article.slug}`" class="hover:text-red-500">
              {{ article.title }}
            </NuxtLink>
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-zinc-400">
            {{ article.overview }}
          </p>
          <NuxtLink :to="`/blog/${article.slug}`" class="mt-4 inline-block text-sm font-medium text-red-500 hover:underline"> Read more </NuxtLink>
        </article>
      </li>
    </ul>
  </div>
</template>
