<!-- Author: Juan Pablo Avendaño -->
 
<template>
  <div class="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
