<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import { FormatUtils } from '@utils/FormatUtils';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed } from 'vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  stats: { totalComputers: number; activeComputers: number; totalComponents: number; availableComponents: number };
}

const props = defineProps<Props>();

// -------------------------------
// Reactive Variables / Computed
// -------------------------------
const inUseComponents = computed(() => props.stats.totalComponents - props.stats.availableComponents);
const availabilityRate = computed(() => {
  if (!props.stats.totalComputers) {
    return 0;
  }

  return (props.stats.activeComputers / props.stats.totalComputers) * 100;
});
</script>

<template>
  <section class="bg-card border border-border rounded-xl p-8">
    <h2 class="text-xl font-semibold mb-6">System Summary</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-widest">Computers Status</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-4 bg-secondary/20 rounded-lg border border-border/40">
            <span class="text-foreground font-medium">Availability Rate</span>
            <span class="text-primary font-bold text-lg">{{ FormatUtils.formatPercentage(availabilityRate) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-widest">Components Status</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-4 bg-secondary/20 rounded-lg border border-border/40">
            <span class="text-foreground font-medium">Available for Use</span>
            <span class="text-primary font-bold text-lg">{{ props.stats.availableComponents }}</span>
          </div>
          <div class="flex justify-between items-center p-4 bg-secondary/20 rounded-lg border border-border/40">
            <span class="text-foreground font-medium">In Use</span>
            <span class="text-foreground font-bold text-lg">{{ inUseComponents }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
