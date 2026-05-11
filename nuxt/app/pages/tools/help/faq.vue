<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
const faqItems = [
  {
    q: 'Why keep location fields consistent?',
    a: 'Matching room labels on tickets and on the floor speeds audits. Pick one naming scheme (e.g. building + room) and stick to it.',
  },
  {
    q: 'How often should warranty dates be reviewed?',
    a: 'At least quarterly for production gear, or monthly if you are planning a refresh. Tie reviews to budget cycles.',
  },
  {
    q: 'What belongs in maintenance notes?',
    a: 'Enough detail that the next technician knows what was tried: symptoms, parts ordered, and whether the device is safe to deploy.',
  },
] as const;
</script>

<template>
  <div class="space-y-4">
    <article v-for="(item, i) in faqItems" :key="i" class="rounded-xl border border-zinc-800 bg-zinc-900 p-5 ring-1 ring-white/5">
      <h2 class="text-base font-semibold text-zinc-100">{{ item.q }}</h2>
      <p class="mt-3 text-sm leading-relaxed text-zinc-400">{{ item.a }}</p>
    </article>
  </div>
</template>
