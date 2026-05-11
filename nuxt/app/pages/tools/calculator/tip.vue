<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
import { computed, ref } from 'vue';

const bill = ref<number>(0);
const tipPercent = ref<number>(18);

const tipAmount = computed(() => {
  const base = Number(bill.value);
  const pct = Number(tipPercent.value);
  if (Number.isNaN(base) || Number.isNaN(pct) || base < 0 || pct < 0) {
    return null;
  }
  return Math.round(base * (pct / 100) * 100) / 100;
});

const total = computed(() => {
  if (tipAmount.value === null) {
    return null;
  }
  const base = Number(bill.value);
  return Math.round((base + tipAmount.value) * 100) / 100;
});
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5">
    <h2 class="text-lg font-semibold text-zinc-50">Tip calculator</h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="text-xs uppercase tracking-widest text-zinc-500">Bill amount</span>
        <input v-model.number="bill" type="number" min="0" step="0.01" class="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600" />
      </label>
      <label class="block">
        <span class="text-xs uppercase tracking-widest text-zinc-500">Tip (%)</span>
        <input v-model.number="tipPercent" type="number" min="0" step="1" class="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600" />
      </label>
    </div>
    <div class="mt-8 grid gap-4 rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-4 sm:grid-cols-2">
      <div>
        <p class="text-xs uppercase tracking-widest text-zinc-500">Tip</p>
        <p class="mt-1 font-mono text-xl tabular-nums text-red-400">{{ tipAmount === null ? '-' : tipAmount }}</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-zinc-500">Total with tip</p>
        <p class="mt-1 font-mono text-xl tabular-nums text-zinc-100">{{ total === null ? '-' : total }}</p>
      </div>
    </div>
  </div>
</template>
