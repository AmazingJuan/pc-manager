<!-- Author: Juan Pablo Avendaño -->

<script setup lang="ts">
// -------------------------------
// Own Imports
import { ArticleService } from '~/services/article.service';

// -------------------------------
// Non-Reactive Variables
const route = useRoute();
const raw = route.params.slug;
const slug = typeof raw === 'string' ? raw : raw?.[0] ?? '';

const article = ArticleService.findBySlug(slug);

// -------------------------------
// Setup
useTitleComplement(` - ${article.title}`);
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
    <NuxtLink to="/blog" class="inline-flex text-sm font-medium text-red-500 underline-offset-4 hover:underline"> Back to blog </NuxtLink>

    <header class="mt-8 border-b border-zinc-800 pb-8">
      <h1 class="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">{{ article.title }}</h1>
      <p class="mt-4 text-sm text-zinc-500">
        {{ article.publishedAt }}
        <span class="text-zinc-600">·</span>
        {{ article.author }}
      </p>
    </header>

    <div class="mt-10">
      <p class="whitespace-pre-line text-base leading-relaxed text-zinc-300">{{ article.body }}</p>
    </div>
  </article>
</template>
