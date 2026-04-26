<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import UiResourceEmptyStateComponent from '@components/ui/UiResourceEmptyStateComponent.vue';
import { FormatUtils } from '@utils/FormatUtils';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Sparkles } from 'lucide-vue-next';
import { computed } from 'vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  stats: { totalComputers: number; activeComputers: number; totalComponents: number; availableComponents: number };
  loading?: boolean;
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
const isInventoryEmpty = computed(() => !props.stats.totalComputers && !props.stats.totalComponents);
</script>

<template>
  <section
    v-if="props.loading"
    class="bg-card border border-border rounded-xl p-8 h-56 animate-pulse"
    aria-busy="true"
    aria-label="Loading system summary"
  />
  <section v-else class="bg-card border border-border rounded-xl p-8">
    <h2 class="text-xl font-semibold mb-6">System Summary</h2>
    <UiResourceEmptyStateComponent
      v-if="isInventoryEmpty"
      :icon="Sparkles"
      size="default"
      class="!min-h-0"
      title="No computers or components yet"
      description="Add computers and components in the system to unlock availability metrics and stock insights."
    />
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12">
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
