<template>
  <div class="border border-neutrals-20 p-6 flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <img :src="job.logo_url" class="w-12 h-12 rounded-full" />
      <TypeOfEmployments :badges="job.type_of_employments" :outline="false" />
    </div>
    <div>
      <p class="text-lg text-neutrals-100 font-semibold">{{job.title}}</p>
      <p>{{job.location}}</p>
    </div>
    <Badges :badges="job.categories" :outline="true" />
    <AppliedProgress :applied="job.applied" :needs="job.needs" />
  </div>
</template>
<script setup>
import AppliedProgress from '@/components/AppliedProgress.vue'
import Badges from '@/components/Badges.vue'
import TypeOfEmployments from '@/components/TypeOfEmployments.vue'
const props = defineProps({
  job: [],
})
</script>
