<script setup lang="ts">
// -------------------------------
// Props
// -------------------------------
interface Props {
  isOpen: boolean;
  title: string;
  maxWidth?: string;
}

withDefaults(defineProps<Props>(), {
  maxWidth: 'max-w-lg',
});

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    @click.self="emit('close')"
  >
    <div
      class="w-full bg-card rounded-lg border border-border p-6 max-h-[90vh] overflow-y-auto"
      :class="maxWidth"
    >
      <h2 class="text-xl text-foreground mb-4">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>
