<template>
  <div class="flex items-center justify-center h-full">
    <slot />
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  console.log(route.meta)
</script>
