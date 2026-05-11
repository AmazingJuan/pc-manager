<!-- Author: Juan Pablo Avendaño -->
<script setup>
import { computed, ref } from 'vue';

function arithmeticResult(aVal, bVal, operation) {
  const x = Number(aVal);
  const y = Number(bVal);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    return null;
  }
  switch (operation) {
    case 'add':
      return x + y;
    case 'subtract':
      return x - y;
    case 'multiply':
      return x * y;
    case 'divide':
      return y === 0 ? null : x / y;
    default:
      return null;
  }
}

const a = ref(0);
const b = ref(0);
const operation = ref('add');

const result = computed(() => arithmeticResult(a.value, b.value, operation.value));
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5">
    <h2 class="text-lg font-semibold text-zinc-50">Arithmetic</h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="text-xs uppercase tracking-widest text-zinc-500">First value</span>
        <input v-model.number="a" type="number" step="any" class="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600" />
      </label>
      <label class="block">
        <span class="text-xs uppercase tracking-widest text-zinc-500">Second value</span>
        <input v-model.number="b" type="number" step="any" class="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600" />
      </label>
    </div>
    <label class="mt-4 block">
      <span class="text-xs uppercase tracking-widest text-zinc-500">Operation</span>
      <select v-model="operation" class="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:max-w-xs">
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
    </label>
    <div class="mt-8 rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3">
      <p class="text-xs uppercase tracking-widest text-zinc-500">Result</p>
      <p class="mt-1 font-mono text-2xl tabular-nums text-red-400">
        {{ result === null ? '-' : result }}
      </p>
      <p v-if="operation === 'divide' && Number(b) === 0" class="mt-2 text-sm text-amber-400">Cannot divide by zero.</p>
    </div>
  </div>
</template>
