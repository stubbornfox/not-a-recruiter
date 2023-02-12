<template>
  <div class="border border-neutrals-20 p-2">
    <div class="flex items-center justify-between border border-neutrals-20 py-4 px-6 text-neutrals-100 border-t-4" :class="`border-t-${color}`">
      <div class="flex gap-3 items-center">
        <div class="w-2 h-2 rounded-full" :class="`bg-${color}`"></div>
        <div class="font-medium">{{pipeline}}</div>
        <div class="bg-tertiary w-8 h-8 flex items-center justify-center font-medium">{{applicants.length}}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div v-for="applicant in applicants" class="boder border-neutrals-20">
        {{applicant.name}}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

defineProps({
  applicants: Array,
  pipeline: String,
  color: String,
})
</script>
