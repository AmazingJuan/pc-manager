<script setup lang="ts">
// Third-Party Imports
import { computed } from 'vue'
import { Monitor } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

// Gather title and subtitle
const route = useRoute()
const title = computed(() => route.meta.title)
const subtitle = computed(() => route.meta.subtitle)
</script>

<template>
  <!--- Login & Register wrapper --->
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-card rounded-2xl shadow-2xl border border-border p-8">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-4"
          >
            <Monitor class="w-10 h-10 text-primary" />
          </div>

          <h1 class="text-3xl text-foreground mb-2">{{ title }}</h1>
          <p class="text-sm text-muted-foreground">{{ subtitle }}</p>
        </div>

        <!--- Form wrapper --->
        <RouterView />
      </div>
    </div>
  </div>
</template>
