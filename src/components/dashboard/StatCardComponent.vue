<!-- Author: Juan Manuel Zapata -->

<script setup lang="ts">
// -------------------------------
// Third Party Imports
// -------------------------------
import type { Component } from 'vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  title: string;
  value: number | string;
  icon: Component;
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}

const props = defineProps<Props>();
</script>

<template>
  <div class="bg-card rounded-lg p-6 border border-border flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <component v-if="props.color === 'success'" :is="icon" class="w-6 h-6 text-emerald-400" />
        <component v-else-if="props.color === 'warning'" :is="icon" class="w-6 h-6 text-amber-400" />
        <component v-else-if="props.color === 'destructive'" :is="icon" class="w-6 h-6 text-destructive" />
        <component v-else :is="icon" class="w-6 h-6 text-primary" />
        <span class="text-sm font-medium text-muted-foreground">{{ title }}</span>
      </div>
    </div>

    <div class="text-3xl font-bold text-foreground">{{ value }}</div>
  </div>
</template>
