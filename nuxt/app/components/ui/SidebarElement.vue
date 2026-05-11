<!-- Author: Juan Pablo Avendaño -->
 
<script setup lang="ts">
// -------------------------------
// Third-Party Imports
import { computed } from 'vue';

// -------------------------------
// Props
const props = defineProps<{ to: string }>();

// -------------------------------
// Non-Reactive Variables
const route = useRoute();

// -------------------------------
// Reactive Variables / Computed
const isActive = computed(() => {
  if (props.to === '/') {
    return route.path === '/';
  }

  return route.path === props.to || route.path.startsWith(`${props.to}/`);
});
</script>

<template>
  <li>
    <NuxtLink
      :to="to"
      class="flex items-center rounded-lg px-4 py-2.5 text-sm transition-all"
      :class="isActive ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' : 'text-zinc-50 hover:bg-zinc-800'"
    >
      <slot />
    </NuxtLink>
  </li>
</template>
