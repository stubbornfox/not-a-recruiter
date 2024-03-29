<template>
  <div class="p-4 lg:mx-auto lg:max-w-7xl lg:p-8 w-full">
    <div class="w-full">
      <div class="md:flex md:items-center md:justify-between">
        <div>
          <h4 class="text-neutrals-100">Job listing</h4>
          <p class="mt-2 text-neutrals-60">Here is your jobs listing status from {{rangeDate}}.</p>
        </div>
        <div class="mt-6 flex items-center space-x-3 md:mt-0 md:ml-4 justify-between">
          <v-date-picker v-model="range" :masks="{ input: 'D MMM' }" is-range @update:modelValue="test">
            <template v-slot="{ inputValue, inputEvents }">
              <div class="flex justify-center items-center">
                <input :value="formatRangeDate(inputValue)" v-on="inputEvents.start || inputEvents.end" class="border border-neutrals-20 px-4 py-3 w-48 focus:outline-none focus:border-primary text-neutrals-100" />
                <IconCalendar color="#7330DF" class="absolute right-4 top-3" />
              </div>
            </template>
          </v-date-picker>
          <div class="md:hidden text-neutrals-100">
            <button class="border border-neutrals-20 flex items-center px-4 py-3 gap-2">
              <i>
                <IconFilter /></i>
              <span class="text-neutrals-100 font-medium">Filter</span>
            </button>
          </div>
        </div>
      </div>
      <div class="min-h-full">
        <div class="text-neutrals-100 lg:border lg:border-neutrals-20">
          <div class="hidden lg:flex items-center justify-between py-5 px-6">
            <div class="title-2">
              Job List
            </div>
            <div class="">
              <button class="border border-neutrals-20 flex items-center px-4 py-3 gap-2">
                <i>
                  <IconFilter /></i>
                <span class="text-neutrals-100 font-medium">Filter</span>
              </button>
            </div>
          </div>
          <div class="">
            <JobList :jobs="jobs" />
            <div class="p-6 text-neutrals-60 font-medium lg:flex items-center justify-between border-t border-neutrals-20 hidden" v-if="paginate">
              <div id="per-page">
                View
                <select class="mx-3" :v-model="per_page" @change="reloadJobs">
                  <option v-for="p in pages" :value="p">{{p}}</option>
                </select>
                Jobs per page
              </div>
              <div id="paginage">
                <div>
                  <button v-for="index in paginate.total_pages" :key="index" class="btn  w-12 h-12 mr-1 rounded-lg font-semibold " :class="index==paginate.current_page ? 'bg-primary text-white' : 'text-neutrals-80 bg-white'" @click="gotoPage(index)">{{index}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import IconFilter from '@/components/icons/IconFilter.vue'

const jobStore = useJobStore()
const { jobs, paginate } = storeToRefs(jobStore)
const { fetchJobs } = jobStore
const pages = [10, 20, 50, 100]
let per_page = ref(10)
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

let startDate = new Date()
let endDate = new Date()
const rangeDate = ref(null)

endDate.setDate(endDate.getDate())
startDate.setDate(startDate.getDate() - 365)
let range = {
  start: startDate,
  end: endDate,
}

fetchJobs(range)

function test(range) {
  fetchJobs(range)
}

function reloadJobs(event) {
  fetchJobs({ per_page: event.target.value, ...range })
}

function gotoPage(page) {
  fetchJobs({ per_page: per_page.value, page: page, ...range })
}

function formatRangeDate(inputValue) {
  rangeDate.value = `${inputValue.start} - ${inputValue.end}`
  return rangeDate.value
}
</script>
