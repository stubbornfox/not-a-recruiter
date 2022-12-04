<template>
  <div class="border border-soft w-full p-2">
    {{candidate.resume}}
  </div>
</template>
<script setup>
props = defineProps({
  candidate: Object
})
console.log(props.candidate.resume)
</script>
