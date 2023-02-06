<template>
  <div class="">
    <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div class="py-8 md:flex md:items-center md:justify-between">
        <div>
          <h4 class="text-neutrals-100">Job listing</h4>
          <p class="mt-2 text-neutrals-60">Here is your jobs listing status from {{rangeDate}}.</p>
        </div>
        <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <v-date-picker v-model="range"  :masks="{ input: 'D MMM' }" is-range @update:modelValue="test">
            <template v-slot="{ inputValue, inputEvents }">
              <div class="flex justify-center items-center">
                <input :value="formatRangeDate(inputValue)" v-on="inputEvents.start || inputEvents.end" class="border border-neutrals-20 px-4 py-3 w-48 focus:outline-none focus:border-primary text-neutrals-100" />

              </div>
            </template>
          </v-date-picker>
          <IconCalendar color="#7330DF" class="absolute right-4 top-3" />
        </div>
      </div>
      <div class="min-h-full">
        <JobList :jobs="jobs" />
      </div>
    </div>
  </div>
</template>
<script setup>
import JobList from "../components/JobList.vue";
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import api from '../services/api';
import IconCalendar from '@/components/icons/IconCalendar.vue'
import { useJobStore } from '@/stores/job'
const jobStore = useJobStore()
const { jobs } = storeToRefs(jobStore)
const { fetchJobs } = jobStore


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { me } = storeToRefs(useUserStore());
let startDate = new Date()

let endDate = new Date()
const rangeDate = ref(null)

endDate.setDate(endDate.getDate() + 7)
let range = {
  start: startDate,
  end: endDate,
}

fetchJobs(range)

function test(range) {
  fetchJobs(range)
}


function formatRangeDate(inputValue) {
  rangeDate.value = `${inputValue.start} - ${inputValue.end}`
  return rangeDate.value
}
</script>
