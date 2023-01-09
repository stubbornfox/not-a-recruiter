<template>
  <div class="">
    <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div class="py-6 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <!-- Profile -->
          <div class="flex items-center">
            <div v-if="me?.profile_picture">
              <img class="hidden h-16 w-16 rounded-full sm:block" :src="me?.profile_picture" :alt="me?.first_name" />
            </div>
            <div v-else>
              <span class="hidden rounded-full h-16 w-16 bg-mute text-color-text sm:flex items-center justify-center font-bold text-2xl">{{me?.first_name && me?.first_name[0]}}</span>
            </div>
            <div>
              <div class="flex items-center">
                <div v-if="me?.profile_picture">
                  <img class="h-16 w-16 rounded-full sm:hidden" :src="me?.profile_picture" :alt="me?.first_name" />
                </div>
                <div v-else>
                  <span class="rounded-full h-16 w-16 bg-mute text-color-text flex items-center justify-center font-bold text-2xl sm:hidden">{{me?.first_name && me?.first_name[0]}}</span>
                </div>
                <h1 class="ml-3 text-2xl text-heading font-bold leading-7  sm:truncate sm:leading-9">Good morning, {{me?.first_name}}</h1>
              </div>
              <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                <dt class="sr-only">Company</dt>
                <dd class="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <BuildingOfficeIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Duke street studio
                </dd>
                <dt class="sr-only">Account status</dt>
                <dd class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                  <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                  Verified account
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <RouterLink type="button" to="/jobs/new" class="inline-flex items-center rounded-md border border-transparent bg-pink-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Post a job</RouterLink>
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

const jobs = ref([])
let error = ref([])


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { me } = storeToRefs(useUserStore());

onMounted(() => {
  api.get('/jobs')
    .then((response) => {
      jobs.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})
</script>
