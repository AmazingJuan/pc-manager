<!-- Author: Juan Pablo Avendaño -->
 
<script setup lang="ts">
// -------------------------------
// Own Imports
import { ArticleService } from '~/services/article.service';

// -------------------------------
// Non-Reactive Variables
const route = useRoute();
const slugParam = route.params.slug;
const slug = typeof slugParam === 'string' ? slugParam : (slugParam?.[0] ?? '');

// -------------------------------
// Reactive Variables / Computed
const article = ArticleService.findBySlug(slug);

// -------------------------------
// Setup
useTitleComplement(` - ${article.title}`);
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
    <NuxtLink to="/blog" class="inline-flex items-center text-sm font-medium text-red-500 underline-offset-4 hover:underline">
      Back to blog
    </NuxtLink>

    <header class="mt-8">
      <p class="text-xs text-zinc-500">{{ article.publishedAt }} · {{ article.author }}</p>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {{ article.title }}
      </h1>
      <p class="mt-4 text-lg text-zinc-400">
        {{ article.overview }}
      </p>
    </header>

    <div class="prose prose-invert prose-zinc mt-10 max-w-none">
      <p class="whitespace-pre-wrap text-base leading-relaxed text-zinc-300">
        {{ article.body }}
      </p>
    </div>
  </article>
</template>
