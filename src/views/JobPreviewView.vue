<template>
  <div class="h-full w-full flex items-center flex-col">
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
            <img :src="job_board.logo_image" :alt="organization?.name" class="w-16 h-16 rounded-lg border-4 border-mute" v-if="job_board.logo_image" />
            <h3 class="text-2xl font-semibold">{{organization?.name}}</h3>
          </div>
        </div>
        <div>
          <a v-if="organization?.website_url" class="text-color-text hover:underline" :href="`https://${organization?.website_url}`" target="_blank">Visit website</a>
        </div>
      </div>
    </header>
    <div class="text-sm bg-pink-100 px-3 py-1 w-full text-center">This is a temporary preview of your job board—the jobs displayed are not active!</div>
    <div class="job-view w-full max-w-5xl px-3">
      <div class="job-details mt-4">
        <RouterLink v-if="organization" :to="{ name: 'JobBoardPreview', params: { slug: organization?.slug } }" class="text-color-text flex items-center gap-2">
          <i>
            <ChevronLeftIcon class="w-4 h-4 font-bold" />
          </i>
          <span class="font-semibold text-sm hover:underline">All jobs</span>
        </RouterLink>
        <h1 class="mt-10 mb-5 text-4xl font-bold">{{job.title}}</h1>
        <div class="flex gap-3">
          <p class="inline-flex rounded px-2 py-1 text-sm leading-5 text-color-text border boder-soft" v-if="job.department">
            {{ job.department }}
          </p>
          <p class="inline-flex rounded px-2 py-1 text-sm leading-5 text-color-text border boder-soft">
            {{ job.location }}
          </p>
          <p class="inline-flex rounded px-2 py-1 text-sm leading-5 text-color-text border boder-soft">{{ job.employment_type }}</p>
          <p class="inline-flex rounded px-2 py-1 text-xs leading-5 text-color-text border boder-soft" v-if="job.base_salary">{{ job.base_salary }}</p>
        </div>
      </div>
    </div>
    <section class="w-full max-w-5xl px-3">
      <FormKit type="form" id="jobForm" @submit="saveJob" form-class="flex-grow-1 space-y-8 border border-color-soft p-6 rounded-md max-w-2xl mt-10" :actions=false :incomplete-message=false :value="editJob">
        <h3 class="text-2xl font-bold leading-6 text-heading text-heading">Apply here!
        </h3>
        <div class="grid grid-cols-1 mx-auto gap-y-3">
          <FormKitSchema :schema="schema" />
        </div>
        <div class="">
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit Application</button>
      </div>
      </FormKit>
      <div class="min-h-full">
        <div class="overflow-hidden  shadow sm:rounded-md">
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
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { useRouter, useRoute } from 'vue-router'

const job = ref({})
const { me, organization } = storeToRefs(useUserStore());
useUserStore().getMe()
const { job_board } = storeToRefs(useJobBoardStore());
const { fetchJobBoards } = useJobBoardStore()
const route = useRoute()

fetchJobBoards()
onMounted(() => {
  api.get(`/publics/organizations/${route.params.slug}/jobs/${route.params.job_slug}`)
    .then((response) => {
      job.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})

const schema = [{
    $formkit: 'text',
    name: 'first_name',
    label: 'First name',
    validation: 'required',
  },
  {
    $formkit: 'text',
    name: 'last_name',
    label: 'Last name',
    validation: 'required',
  },
  {
    $formkit: 'email',
    name: 'email',
    label: 'Email address',
    validation: 'required',
  },
  {
    $formkit: 'text',
    name: 'phone',
    label: 'Phone number',
    validation: 'Location',
  },
   {
    $formkit: 'text',
    name: 'location',
    label: 'Location',
    validation: '',
    placeholder: 'City, State, etc',
  },
  {
    $formkit: 'file',
    name: 'resume',
    label: 'Resume',
    validation: '',
  }
]
</script>
