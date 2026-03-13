<!-- Author: Juan Manuel Zapata -->
<template>
  <div class="bg-card rounded-lg p-6 border border-border flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <component :is="icon" class="w-6 h-6" :class="iconColor" />
        <span class="text-sm font-medium text-muted-foreground">{{ title }}</span>
      </div>
      <template v-if="trend">
        <span
          class="text-sm font-semibold"
          :class="trend.isPositive ? 'text-emerald-400' : 'text-destructive'"
        >
          {{ trend.value }}%
        </span>
      </template>
    </div>

    <div class="text-3xl font-bold text-foreground">{{ value }}</div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';

interface Trend {
  value: number;
  isPositive: boolean;
}

const props = defineProps<{
  title: string;
  value: number | string;
  icon: Component;
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  trend?: Trend;
}>();

const iconColor = computed(() => {
  switch (props.color) {
    case 'success':
      return 'text-emerald-400';
    case 'warning':
      return 'text-amber-400';
    case 'destructive':
      return 'text-destructive';
    default:
      return 'text-primary';
  }
});
</script>
