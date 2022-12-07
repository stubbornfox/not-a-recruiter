<template>
  <div class="h-full w-full flex items-center flex-col overflow-y-auto" v-if="organization">
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
    <div class="job-view w-full max-w-5xl px-3" v-if="job">
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
    <section v-if="!applied" class="w-full max-w-5xl px-3 my-10">
      <FormKit type="form" id="jobForm" @submit="submitCandidate" form-class="flex-grow-1 space-y-8 border border-color-soft p-6 rounded-md max-w-2xl" :actions=false :incomplete-message=false>
        <h3 class="text-2xl font-bold leading-6 text-heading text-heading">Apply here!
        </h3>
        <div class="grid grid-cols-1 mx-auto gap-y-3">
          <FormKitSchema :schema="schema" />
        </div>
        <div class="">
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit Application</button>
        </div>
      </FormKit>
    </section>
    <section v-else class="w-full max-w-5xl px-3  mt-10">
      <div class=" border rounded-lg border-mute py-10 text text-center flex flex-col items-center">
        <i>
          <PaperAirplaneIcon class="h-5 w-5" /></i>
        <h5 class="text-md text-heading font-medium">Your application has been sent!</h5>
        <p class="text-color-text text-sm">You can expect to receive a confirmation email shortly.</p>
      </div>
    </section>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';

import { ChevronLeftIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { usePublicJobStore } from '@/stores/public_job'

const route = useRoute()
const publicJobStore = usePublicJobStore()

const { job_board, job, organization, applied } = storeToRefs(publicJobStore)
const { fetchJobBoard, fetchJob, fetchOrganization, applyJob } = publicJobStore
const { slug, job_slug } = route.params

fetchOrganization(slug)
fetchJobBoard(slug)
fetchJob(slug, job_slug)

function submitCandidate(candidate) {
  const body = new FormData()
  body.append('candidate[name]', candidate.name)
  body.append('candidate[email]', candidate.email)
  body.append('candidate[phone]', candidate.phone)
  body.append('candidate[location]', candidate.location)

  candidate.resume.forEach((fileItem) => {
    body.append('candidate[resume]', fileItem.file)
  })
  applyJob(slug, job_slug, body)
}
const schema = [{
    $formkit: 'text',
    name: 'name',
    label: 'Name',
    validation: 'required',
  },
  {
    $formkit: 'email',
    name: 'email',
    label: 'Email address',
    validation: 'required|email',
  },
  {
    $formkit: 'tel',
    name: 'phone',
    validation: "matches:/^[0-9]{2}-[0-9]{4}-[0-9]{4}$/",
    placeholder: 'xx-xxxx-xxxx',
    label: 'Phone number',
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
    validation: 'required',
  }
]
</script>
