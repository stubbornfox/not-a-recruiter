<template>
  <div class="h-full w-full flex items-center flex-col overflow-y-auto">
    <header class="header w-full max-w-5xl px-3">
      <div class="h-20 flex items-center justify-between">
        <div v-if="job_board">
          <div v-if="job_board.header_setup == 'name_only'">
            <h3 class="text-2xl font-semibold">{{organization?.name}}</h3>
          </div>
          <div v-else-if="job_board.header_setup == 'logo_only' && job_board.logo_image">
            <img :src="job_board.logo_image" :alt="organization?.name" class="w-16 h-16 rounded-lg border-4 border-mute" />
          </div>
          <div v-else class="flex items-center gap-1">
            <img :src="job_board.logo_image" :alt="organization?.name" class="w-16 h-16 rounded-lg border-4 border-mute" v-if="job_board.logo_image"/>
            <h3 class="text-2xl font-semibold">{{organization?.name}}</h3>
          </div>
        </div>
        <div>
          <a v-if="organization?.website_url" class="text-color-text hover:underline" :href="`https://${organization?.website_url}`" target="_blank">Visit website</a>
        </div>
      </div>
    </header>
    <div class="text-sm bg-pink-100 px-3 py-1 w-full text-center">This is a temporary preview of your job board—the jobs displayed are not active!</div>
    <section class="billboard py-6 text-center mt-10 mb-10 px-3">
      <h3 class="text-5xl font-semibold my-5 text-heading">{{job_board?.title}}</h3>
      <p class="text-color-text mb-10">{{job_board?.intro}}</p>
    </section>
    <section class="w-full max-w-5xl px-3">
      <FormKit type="form" id="jobForm" @submit="saveJob" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200 mb-10" :actions=false :incomplete-message=false :value="editJob">
        <div class="grid lg:grid-cols-4 lg:gap-3 grid-cols-1 mx-auto">
          <FormKitSchema :schema="schema" />
        </div>
      </FormKit>
      <div class="h-full">
        <div class="overflow-hidden  shadow sm:rounded-md">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="job in jobs" :key="job.id">
              <RouterLink :to="{ name: 'JobPreview', params: { slug: organization?.slug, job_slug: job.slug } }" class="block hover:bg-soft">
                <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div class="">
                    <h3 class="truncate text-2xl font-bold my-3">{{ job.title }}
                    </h3>
                    <div class="flex gap-1">
                      <p class="inline-flex rounded-md px-2 text-xs leading-5 text-color-text border boder-soft" v-if="job.department">
                        {{ job.department }}
                      </p>
                      <p class="inline-flex rounded-md px-2 text-xs leading-5 text-color-text border boder-soft">
                        {{ job.location }}
                      </p>
                      <p class="inline-flex rounded-md px-2 text-xs leading-5 text-color-text border boder-soft">{{ job.employment_type }}</p>
                      <p class="inline-flex rounded-md px-2 text-xs leading-5 text-color-text border boder-soft"  v-if="job.base_salary">{{ job.base_salary }}</p>
                    </div>
                  </div>
                  <div class="font-semibold">
                    Job view
                  </div>
                </div>
             </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import api from '../services/api';
import { useJobBoardStore } from '@/stores/job_board';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/vue/20/solid'

const jobs = ref([])
const { me, organization } = storeToRefs(useUserStore());
useUserStore().getMe()
const { job_board } = storeToRefs(useJobBoardStore());
const { fetchJobBoards } = useJobBoardStore()
fetchJobBoards()
onMounted(() => {
  api.get('/jobs')
    .then((response) => {
      jobs.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})

const schema = [{
    $formkit: 'select',
    name: 'job_location',
    label: 'Job Location',
    validation: '',
    options: [
      { label: "Full time", value: "full_time" },
    ],
    outerClass: "mb-3",
    wrapperClass: "max-w-none"
  },
  {
    $formkit: 'select',
    name: 'job_category',
    label: 'Job Category',
    validation: '',
    options: [
      { label: "All Categories", value: "all_categories" },
    ],
    outerClass: "mb-3",
    wrapperClass: "max-w-none",
  },
  {
    $formkit: 'select',
    name: 'job_type',
    label: 'Job Type',
    validation: '',
    options: [
      { label: "All types", value: "all_types" },
    ],
    outerClass: "mb-3",
    wrapperClass: "max-w-none",
  },
]
</script>
