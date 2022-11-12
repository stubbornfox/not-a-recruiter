<template>
  <div class="flex items-center justify-center h-full">
    <slot />
    {{route.meta}}
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>
