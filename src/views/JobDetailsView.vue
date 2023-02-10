<template>
  <div class="py-8" v-if="job">
    <div class="border border-neutrals-20 p-6 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <img :src="job.logo_image" class="w-12 h-12" />
        <h3 class="text-neutrals-100">{{job.title}}</h3>
      </div>
      <RouterLink :to="{name: 'JobDetails'}" class="flex items-center gap-x-3 border border-secondary px-4 py-3 rounded-lg">
        <i>
          <IconEditJob /></i>
        <span class="font-bold text-primary">Edit Job Details</span>
      </RouterLink>
    </div>
    <div class="flex py-8 gap-8">
      <div class="basis-3/4">
        <div class="mb-10">
          <h4 class="mb-4 text-neutrals-100">Description</h4>
          <p v-html="job.description" class="text-neutrals-80"></p>
        </div>
        <div class="mb-10">
          <h4 class="mb-4 text-neutrals-100">Responsibilities</h4>
          <p v-html="job.responsibilities" class="text-neutrals-80"></p>
        </div>
        <div class="mb-10">
          <h4 class="mb-4 text-neutrals-100">Who you are</h4>
          <p v-html="job.who_you_are" class="text-neutrals-80"></p>
        </div>
        <div class="mb-10">
          <h4 class="mb-4 text-neutrals-100">Nice-to-haves</h4>
          <p v-html="job.nice_to_have" class="text-neutrals-80"></p>
        </div>
      </div>
      <div class="basis-1/4 flex flex-col divide-y divide-neutrals-20">
        <div class="pb-10">
          <h4 class="mb-4 text-neutrals-100">About this role</h4>
          <div>
            <div class="progress my-6 bg-neutrals-10i p-4">
              <span class="font-bold text-neutrals-100">{{job.applicants}} applied</span> of {{job.needs}} capacity
              <div class="progress-bar  h-2 mt-3" style="background: #D1D1D1">
                <div class="h-full left-0 top-0 bottom-0 bg-green" :style="`width: ${job.applicants/job.needs*100}%`"></div>
              </div>
            </div>
            <div class="flex items-center justify-between mb-6">
              <label class="flex-1">Applied Before</label>
              <time :datetime="job.due_date" format="YYYY MM DD" class="font-semibold text-neutrals-100 flex-1">
                {{ $filters.formatDate(job.due_date) }}
              </time>
            </div>
            <div class="flex items-center justify-between mb-6">
              <label class="flex-1">Job posted</label>
              <time :datetime="job.created_at" format="YYYY MM DD" class="flex-1 font-semibold text-neutrals-100">
                {{ $filters.formatDate(job.created_at) }}
              </time>
            </div>
            <div class="flex items-center justify-between mb-6">
              <label class="flex-1">Job type</label>
              <div class="flex-1 font-semibold text-neutrals-100">{{job.display_type_of_employments.join(', ')}}</div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex-1">Salary</label>
              <div class="flex-1 font-semibold text-neutrals-100">{{$filters.currencyUSD(job.min_salary)}}-{{$filters.currencyUSD(job.max_salary)}}</div>
            </div>
          </div>
        </div>
        <div class="py-10">
          <h4 class="mb-4 text-neutrals-100">Categories</h4>
          <div class="flex flex-wrap gap-3">
            <span v-for="(category, index) in job.categories" :class="`text-sm font-semibold bg-${bg[index]} text-${color[index]} py-2 px-3`" :style="`border-radius: 80px; background: ${bg[index]}`">
              {{category}}
            </span>
          </div>
        </div>
        <div class="pt-10">
          <h4 class="mb-4 text-neutrals-100">Required Skills</h4>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in job.skills" class="text-primary px-3 py-1 bg-neutrals-10i">
              {{skill}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <hr class="mb-10" />
    <div class="mt-10">
      <h4 class="mb-4 text-neutrals-100">Perks & Benefits</h4>
      <p class="text-neutrals-80 mb-6">This job comes with several perks and benefits</p>
      <div class="grid lg:grid-cols-4 lg:gap-8">
        <div class="p-4" v-for="benefit in getBenefitsCard(job.benefits)">
          <div class="flex items-center justify-between pb-6">
            <component :is="benefit.icon" />
          </div>
          <h5 class="text-neutrals-100">{{benefit.header}}</h5>
          <div class="mt-3 text-neutrals-60">{{benefit.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import IconEditJob from '@/components/icons/IconEditJob.vue'
import BenefitCard from '@/components/BenefitCard.vue'
import defaultBenefits from '@/benefits.js'

function getBenefitsCard(benefits) {
  return benefits.map((b) => defaultBenefits[b])
}

const props = defineProps({
  job: Object,
})

const color = ['yellow', 'green', 'red', 'primary']
const bg = ['rgba(235, 133, 51, 0.1)', ' rgba(86, 205, 173, 0.1)', 'rgba(#FF6550, 0.1)', '#F1EAFC']
</script>
