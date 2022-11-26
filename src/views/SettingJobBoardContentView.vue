<template>
  <FormKit type="form" id="jobSeoForm" #default="{ value }" @submit="submitHandler" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job board content</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can define optional, additional content to be displayed on your job board.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKit type="select" label="Job board banner" name="banner_setup" :options="{
              none: 'None',
              image: 'Image',
              video: 'Video',
            }" help="An optional, large image or video displayed at the top of your job board." />
          <FormKit type="text" label="Job board title" name="title" help="An optional, page title that will be displayed at the top of your job board." />
          <FormKit type="textarea" label="Job board intro" name="intro" help="An optional, short statement displayed at the top of your job board. Limited to a maximum of 280 characters." />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('jobSeoForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from "vue-router";

const error = ref([])
const props = defineProps({
  job_board: Object,
})
const emit = defineEmits(['saveSetting'])

const submitHandler = async (data) => {
  const body = new FormData()
  body.append('job_board[id]', props.job_board.id)
  body.append('job_board[title]', data.title)
  body.append('job_board[og_image_setup]', data.og_image_setup)
  body.append('job_board[organization_id]', props.job_board.organization_id)

  if (urlHasChanged)
    data.logo_image.forEach((fileItem) => {
      body.append('job_board[logo_image]', fileItem.file)
    })
  if (socialMediaImageUrlHasChanged)
    data.social_media_image.forEach((fileItem) => {
      body.append('job_board[social_media_image]', fileItem.file)
    })

  emit('saveSetting', body)
}
</script>
