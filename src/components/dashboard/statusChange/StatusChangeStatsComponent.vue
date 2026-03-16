<script setup lang="ts">
// -------------------------------
// Props
// -------------------------------
interface Props {
  stats: { total: number; toActive: number; toMaintenance: number; toInactive: number };
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="rounded-lg border border-border bg-card p-4">
      <p class="text-xs text-muted-foreground mb-1">Total Changes</p>
      <p class="text-2xl font-semibold text-foreground">{{ props.stats.total }}</p>
    </div>
    <div class="rounded-lg border border-border bg-card p-4">
      <p class="text-xs text-muted-foreground mb-1">To Active</p>
      <p class="text-2xl font-semibold text-emerald-400">{{ props.stats.toActive }}</p>
    </div>
    <div class="rounded-lg border border-border bg-card p-4">
      <p class="text-xs text-muted-foreground mb-1">To Maintenance</p>
      <p class="text-2xl font-semibold text-yellow-400">{{ props.stats.toMaintenance }}</p>
    </div>
    <div class="rounded-lg border border-border bg-card p-4">
      <p class="text-xs text-muted-foreground mb-1">To Inactive</p>
      <p class="text-2xl font-semibold text-muted-foreground">{{ props.stats.toInactive }}</p>
    </div>
  </div>
</template>
