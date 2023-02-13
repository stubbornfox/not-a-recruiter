<template>
  <div class="py-4 lg:mx-auto lg:max-w-6xl lg:p-8">
    <div class="mb-6 px-4 lg:flex lg:justify-between">
      <div>
        <h4 class="text-neutrals-100">
          {{greetings()}}, {{me?.first_name}}
        </h4>
        <p class="mt-2 mb-4 font-medium">Here is your job listings statistic report from {{rangeDate}}.</p>
      </div>
      <v-date-picker v-model="range" :masks="{ input: 'D MMM' }" is-range @update:modelValue="test">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <input :value="formatRangeDate(inputValue)" v-on="inputEvents.start || inputEvents.end" class="flex-1 border border-neutrals-20 px-4 py-3 w-48 focus:outline-none focus:border-primary text-neutrals-100" />
            <IconCalendar color="#7330DF" class="absolute right-4 top-3" />
          </div>
        </template>
      </v-date-picker>
    </div>
    <div class="flex flex-col gap-y-2 mb-4 px-4 lg:grid lg:grid-cols-3 lg:gap-6">
      <div class="bg-primary text-white flex items-center p-6">
        <div class="text-5xl font-semibold text-white">
          {{report.candidates}}
        </div>
        <p class="text-white ml-3 text-lg font-medium grow">
          New candidates to review
        </p>
        <IconChervonRight />
      </div>
      <div class="bg-green text-white flex items-center p-6">
        <div class="text-5xl font-semibold text-white">
          {{report.schedules}}
        </div>
        <p class="text-white ml-3 text-lg font-medium grow">
          Schedule for today
        </p>
        <IconChervonRight />
      </div>
      <div class="bg-blue text-white flex items-center p-6">
        <div class="text-5xl font-semibold text-white">
          {{report.messages}}
        </div>
        <p class="text-white ml-3 text-lg font-medium grow">
          Messages received
        </p>
        <IconChervonRight />
      </div>
    </div>
    <hr class="my-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="px-4 lg:basis-2/3 lg:px-0">
        <div class="flex items-center justify-between gap-x-3">
          <div class="grow">
            <h5 class="text-neutrals-100">Job statistics</h5>
            <p class="text-sm">Showing Jobstatistics {{rangeDate}}.</p>
          </div>
          <div class="basis-28 time-selected">
            <v-select v-model="selected" :searchable="false" :clearable="false" :options="['Week', 'Month', 'Year']" class="text-neutrals-60 w-full lg:hidden">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                  <IconChervonDown /></span>
              </template>
            </v-select>
            <div class="bg-light-blue p-1 hidden lg:flex">
              <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'week'}" @click="view='week'">Week</button>
              <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'month'}" @click="view='month'">Month</button>
               <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'year'}" @click="view='year'">Year</button>
            </div>
          </div>
        </div>
        <div class="border-b border-neutrals-20 mt-4">
          <nav class="-mb-px flex justify-between lg:justify-start lg:gap-10" aria-label="Tabs">
            <a v-for="tab in tabs" :key="tab.name" @click="current_tab = tab.key" :class="[tab.key == current_tab ? 'border-purple text-neutrals-100' : 'border-transparent text-neutrals-60 hover:text-neutrals-80 hover:border-neutrals-40', 'py-4 px-1 border-b-4 font-semibold']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
          </nav>
        </div>
        <div class="mt-6 overview flex flex-col gap-6">
          <div class="border border-neutrals-20 p-4">
            <div class="flex justify-between">
              <div class="text-lg text-neutrals-100 font-semibold">
                Job Views
              </div>
              <i class="aria-hidden">
                <IconJobView />
              </i>
            </div>
            <div class="flex mt-4 items-center gap-2">
              <p class="text-neutrals-100 text-4xl font-semibold">{{ new Intl.NumberFormat('en-US').format(report.job_views)}}</p>
              <span class="font-medium">This week</span>
              <p class="flex items-center">
                <span class="text-lg font-medium" :class="report.job_views_increased ? 'text-purple': 'text-red'">{{report.job_views_changed_by}}%
                </span>
                <i>
                  <IconIncrease v-if="report.job_views_increased" />
                  <IconDecrease v-else />
                </i>
              </p>
            </div>
          </div>
          <div class="border border-neutrals-20 p-4">
            <div class="flex justify-between">
              <div class="text-lg text-neutrals-100 font-semibold">
                Job applied
              </div>
              <i class="aria-hidden">
                <IconJobApplied />
              </i>
            </div>
            <div class="flex mt-4 items-center gap-2">
              <p class="text-neutrals-100 text-4xl font-semibold">{{ new Intl.NumberFormat('en-US').format(report.job_applied)}}</p>
              <span class="font-medium">This week</span>
              <p class="flex items-center">
                <span class="text-lg font-medium" :class="report.job_applied_increased ? 'text-purple': 'text-red'">{{report.job_applied_changed_by}}%
                </span>
                <i>
                  <IconIncrease v-if="report.job_applied_increased" />
                  <IconDecrease v-else />
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/3 px-4 flex flex-col gap-6">
        <div class="border border-neutrals-20 p-4">
          <div class="flex justify-between">
            <div class="text-lg text-neutrals-100 font-semibold">
              Job Open
            </div>
          </div>
          <div class="flex mt-4 items-center gap-2">
            <p class="text-neutrals-100 text-7xl font-semibold">{{ new Intl.NumberFormat('en-US').format(report.job_opened)}}</p>
            <span class="font-medium">Jobs Opened</span>
          </div>
        </div>
        <div class="border border-neutrals-20 p-4">
          <div class="flex justify-between">
            <div class="text-lg text-neutrals-100 font-semibold">
              Applicants Summary
            </div>
          </div>
          <div class="flex mt-4 items-center gap-2">
            <p class="text-neutrals-100 text-7xl font-semibold">{{ new Intl.NumberFormat('en-US').format(report.total_applicants)}}</p>
            <span class="font-medium">Applicants</span>
          </div>
          <div class="w-full mt-6" v-if="report.total_applicants > 0">
            <span v-for="a in Object.keys(report.applicants)" :class="`bg-${stages[a].color}`" class="inline-block h-4" :style="`width:${ report.applicants[a]/report.total_applicants * 100}%`">
            </span>
            <div class="grid grid-cols-2 gap-2 mt-6">
              <div v-for="a in Object.keys(report.applicants)" class="flex gap-2 items-center">
                <div :class="`bg-${stages[a].color}`" class="rounded w-5 h-5">
                </div>
                <div>{{stages[a].text}}: <span class="text-neutrals-100 font-medium">{{report.applicants[a]}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-6">
    <div class="px-4 flex flex-col gap-6 ">
      <div class="flex items-center justify-between">
        <h5 class="text-neutrals-100">Job Updates</h5>
        <RouterLink :to="{name: 'Jobs'}" class="hidden lg:flex items-center gap-2 self-center">
          <span class="text-primary font-semibold">View All</span>
          <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 11.7256L4.75 11.7256" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </RouterLink>
      </div>
      <div class="flex flex-col gap-6 lg:flex-row lg:mt-6">
        <JobCard v-for="job in report.jobs" :job="job" />
      </div>
      <RouterLink :to="{name: 'Jobs'}" class="flex items-center gap-2 self-center lg:hidden">
        <span class="text-primary font-semibold">View All</span>
        <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.75 11.7256L4.75 11.7256" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </i>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import JobList from "../components/JobList.vue";
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconChervonRight from '@/components/icons/IconChervonRight.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import IconJobView from '@/components/icons/IconJobView.vue'
import IconJobApplied from '@/components/icons/IconJobApplied.vue'
import IconIncrease from '@/components/icons/IconIncrease.vue'
import IconDecrease from '@/components/icons/IconDecrease.vue'
import JobCard from '@/components/JobCard.vue'
import { stages } from "@/const"

import api from '../services/api';
let error = ref([])
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { me } = storeToRefs(useUserStore());
let startDate = new Date()
let endDate = new Date()
const rangeDate = ref(null)
const view=ref('week')
const report = ref({
  candidates: 76,
  schedules: 3,
  messages: 24,
  job_views: 2342,
  job_views_increased: true,
  job_views_changed_by: 5.6,
  job_applied: 645,
  job_applied_increased: false,
  job_applied_changed_by: 0.5,
  job_opened: 12,
  total_applicants: 5,
  applicants: {
    review: 1,
    shortlisted: 1,
    interview: 1,
    hired: 1,
    declined: 1,
  },
  jobs: [{
      title: 'Designer',
      location: 'Germany',
      categories: ['Marketing', 'Design'],
      type_of_employments: ['full_time'],
      needs: 12,
      applied: 3,
      logo_url: ''
    },
    {
      title: 'Developer',
      location: 'Germany',
      categories: ['Marketing', 'Design'],
      type_of_employments: ['full_time'],
      needs: 12,
      applied: 3,
      logo_url: ''
    }
  ]
})
endDate.setDate(endDate.getDate() + 7)
startDate.setDate(startDate.getDate() - 7)
let range = {
  start: startDate,
  end: endDate,
}
const selected = ref('Week')
const current_tab = ref('jobs_overview')
const tabs = [
  { name: 'Overview', key: 'jobs_overview' },
  { name: 'Jobs View', key: 'jobs_view' },
  { name: 'Jobs Applied', key: 'jobs_applied' },
]

function formatRangeDate(inputValue) {
  rangeDate.value = `${inputValue.start} - ${inputValue.end}`
  return rangeDate.value
}

function greetings() {
  const today = new Date().getHours();

  let greeting;

  if (today < 12) {
    greeting = "Good Morning"
  } else if (today < 18) {
    greeting = "Good Afternoon"
  } else {
    greeting = "Good Night"
  }
  return greeting
}
</script>
<style>
.time-selected .vs-select {
  height: 50px;
}

.time-selected .vs__selected {
  height: 48px;
}

.time-selected .vs__search {
  display: none;
}

.time-selected .vs__dropdown-toggle {
  width: 112px;
}
</style>
