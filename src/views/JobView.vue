<template>
  <div v-if="job" class="w-full h-full flex flex-col flex-grow">
    <div class="h-full flex flex-col flex-grow">
      <div class="flex flex-col flex-grow h-full">
        <div class="flex items-center justify-between lg:py-6 lg:px-8">
          <div class="flex items-center gap-6">
            <a @click.prevent="$router.go(-1)" href="#">
              <IconArrowBackLarge />
            </a>
            <div>
              <h4 class="text-neutrals-100">{{job.title}}</h4>
              <div class="flex items-center gap-2 mt-2 text-neutrals-100">
                <div>{{job.categories.join(', ')}}</div>
                <span class="w-1 h-1 bg-neutrals-100 rounded"></span>
                <div>{{job.display_type_of_employments.join(', ')}}</div>
                <span class="w-1 h-1 bg-neutrals-100 rounded"></span>
                <div>{{job.hired}}/{{job.needs}} Hired</div>
              </div>
            </div>
          </div>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="inline-flex items-center border rounded-lg justify-center border-primary py-3 px-4 gap-x-3">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8327 7.5835L9.99935 13.4168L4.16602 7.5835" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="text-primary font-bold ">More action</span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                  <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Applicants</RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Job Detail</RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Job</RouterLink>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="h-full lg:px-8">
          <div class="flex border-b border-neutrals-20 gap-x-10 pt-3">
            <RouterLink :to="{name:'JobApplicants'}" :class="[$route.name == 'JobApplicants' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Applicants</RouterLink>
            <RouterLink :to="{name:'JobDetails'}" :class="[$route.name == 'JobDetails' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Job Details</RouterLink>
            <RouterLink :to="{name:'JobAnalytics'}" :class="[$route.name == 'JobAnalytics' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Analytics</RouterLink>
          </div>
          <RouterView :key="$route.params.stage" :job="job"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import JobStageSidebar from "../components/JobStageSidebar.vue";
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { useJobStore } from '@/stores/job'
import { storeToRefs } from 'pinia';

import IconArrowBackLarge from '@/components/icons/IconArrowBackLarge.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'


const jobStore = useJobStore()
const { job } = storeToRefs(jobStore)
const { fetchJob } = jobStore

onMounted(() => {
  const slug = useRoute().params.slug
  fetchJob(slug)
})
</script>
