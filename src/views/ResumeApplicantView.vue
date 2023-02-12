<template>
  <div class="w-full p-2 h-full overflow-y-auto" v-if="applicant">
    <div class="overflow-y-auto flex flex-col h-full">
      <div class="flex justify-end  mb-3">
        <a class="flex rounded items-center p-2 border border-primary" :href="applicant.resume" target="_blank">
          <i class="mr-2"><ArrowDownTrayIcon class="w-5 h-5"/></i>
          <span class="text-primary font-bold">Download</span>
        </a>
      </div>
      <div class="overflow-y-auto h-full  border border-neutrals-20">
        <vue-pdf-embed :source="applicant.resume" class="overflow-hidden"/>
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
  applicant: { type: Object, default: {} }
})
</script>
