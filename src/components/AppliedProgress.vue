<template>
  <div class="progress">
    <span class="font-bold text-neutrals-100">{{applied}} applied</span> of {{needs}} capacity
    <div class="progress-bar  h-2 mt-3" style="background: #D1D1D1">
      <div class="h-full left-0 top-0 bottom-0 bg-green" :style="`width: ${Math.min(applied/needs*100, 100)}%`"></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  applied: Number,
  needs: Number,
})
</script>
