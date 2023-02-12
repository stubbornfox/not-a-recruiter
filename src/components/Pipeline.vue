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
      <div v-if="applicants.length > 0" class="flex flex-col gap-2">
      <div v-for="applicant in applicants" class="border border-neutrals-20 lg:p-6 ">
        <div class="flex">
          <div>
            <div class="font-bold text-neutrals-100">{{applicant.name}}</div>
            <RouterLink :to="{}" class="font-semibold text-primary text-sm">View profile</RouterLink>
          </div>
        </div>
        <div class="flex justify-between mt-6">
          <div class="flex flex-col">
            <label class="text-neutrals-60 text-sm">Applied on</label>
            <time class="font-medium text-sm text-neutrals-100 font-semibold" :datetime="applicant.created_at" format="YYYY MM DD">
              {{ $filters.formatDate(applicant.created_at) }}
            </time>
          </div>
         <div class="flex flex-col">
            <label class="text-neutrals-60 text-sm">Score</label>
            <span class="font-medium text-sm text-neutrals-100 font-semibold">
              {{ applicant.score }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="border border-neutrals-20 lg:p-6">
        No applicants in this stage
      </div>
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
