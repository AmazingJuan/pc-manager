<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Third-Party Imports
// -------------------------------
import type { Component as ComponentType } from 'vue';
import { Inbox } from 'lucide-vue-next';

// -------------------------------
// Props
// -------------------------------
interface Props {
  title: string;
  description?: string;
  /** Lucide icon; defaults to Inbox */
  icon?: ComponentType;
  /** `compact` fits inside chart card height (min-h-60) */
  size?: 'default' | 'compact';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'compact',
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center w-full"
    :class="props.size === 'compact' ? 'min-h-[14rem] py-6 px-4' : 'min-h-[12rem] py-10 px-6'"
  >
    <div
      class="rounded-2xl bg-muted/50 flex items-center justify-center mb-4"
      :class="props.size === 'compact' ? 'w-14 h-14' : 'w-20 h-20'"
    >
      <component
        :is="props.icon ?? Inbox"
        class="text-muted-foreground"
        :class="props.size === 'compact' ? 'w-7 h-7' : 'w-10 h-10'"
      />
    </div>
    <p :class="props.size === 'compact' ? 'text-sm font-medium text-foreground max-w-sm' : 'text-base font-medium text-foreground max-w-md'">
      {{ title }}
    </p>
    <p v-if="description" class="text-muted-foreground max-w-sm mt-2" :class="props.size === 'compact' ? 'text-xs' : 'text-sm'">
      {{ description }}
    </p>
  </div>
</template>
