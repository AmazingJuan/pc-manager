<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import StatCardComponent from '@components/ui/StatCardComponent.vue';

// -------------------------------
// Third Party Imports
// -------------------------------
import { Activity, CheckCircle2, PauseCircle, Wrench } from 'lucide-vue-next';

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
    <StatCardComponent title="Total Changes" :value="props.stats.total" :icon="Activity" />
    <StatCardComponent title="To Active" :value="props.stats.toActive" :icon="CheckCircle2" />
    <StatCardComponent title="To Maintenance" :value="props.stats.toMaintenance" :icon="Wrench" />
    <StatCardComponent title="To Inactive" :value="props.stats.toInactive" :icon="PauseCircle" />
  </div>
</template>
