<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
import { APP_TITLE_COMPLEMENT_KEY } from '~/constants/app-title-complement-key.constant';

// -------------------------------
// Reactive Variables / Computed
const titleComplement = useState<string>(APP_TITLE_COMPLEMENT_KEY, () => '');

const documentTitle = computed(() => (titleComplement.value ? `Computer Manager${titleComplement.value}` : 'Computer Manager'));
</script>

<template>
  <Head>
    <Title>{{ documentTitle }}</Title>
  </Head>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
