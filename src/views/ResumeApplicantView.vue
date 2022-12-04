<template>
  <div class="border border-soft w-full p-2 h-full overflow-y-auto" v-if="candidate">
    <div class="overflow-y-auto flex flex-col h-full">
      <div class="flex justify-between  mb-3">
        <h2 class="text-heading text-xl font-bold">Resume </h2>
        <a class="text-heading flex bg-pink-600 hover:bg-pink-400 rounded items-center px-2" :href="candidate.resume" target="_blank">
          <i class="mr-2"><ArrowDownTrayIcon class="w-5 h-5"/></i>
          <span>Download</span>
        </a>
      </div>
      <div class="overflow-y-auto h-full">
        <vue-pdf-embed :source="candidate.resume" class="overflow-hidden"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import VuePdfEmbed from 'vue-pdf-embed'
import {
  ArrowDownTrayIcon,
} from '@heroicons/vue/24/outline'
const props = defineProps({
  candidate: { type: Object, default: {} }
})
</script>
