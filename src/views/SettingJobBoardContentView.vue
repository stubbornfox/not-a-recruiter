<template>
  <FormKit type="form" id="contentForm" #default="{ value }" @submit="submitHandler" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board" novalidate>
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job board content</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can define optional, additional content to be displayed on your job board.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit type="select" label="Job board banner" name="banner_setup" :options="{
              no_banner: 'None',
              image: 'Image',
              video: 'Video',
            }" help="An optional, large image or video displayed at the top of your job board." />
          <div v-if="value.banner_setup == 'image'" class="sm:col-span-4 border-l-4 pl-4 border-soft">
            <FormKit type="file" label="Job board banner image" accept=".png,.jpg,.jpeg" help="Provide the image to use. It must be at least 1728px wide. PNG and JPG file types are acceptable. The maxium height of the banner is limited to a 16:9 aspect ratio." @change="onFileChange" name="banner_image" />
            <div class="sm:col-span-4" v-show="url">
              <img :src="url" class="rounded border-4 border-mute" />
            </div>
          </div>
          <div v-if="value.banner_setup == 'video'" class="sm:col-span-4 border-l-4 pl-4 border-soft">
            <FormKit type="url" name="banner_video_url" label="Job board banner video" help="Provide a YouTube or Vimeo web address for the video you would like displayed." :sections-schema=" {
      prefix: {
        $el: 'div',
        attrs: {
          class: 'flex text-color-text items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
        },
        children: 'https://',
      },
    }" />
          </div>
          <FormKit type="text" label="Job board title" name="title" help="An optional, page title that will be displayed at the top of your job board." />
          <FormKit type="textarea" label="Job board intro" name="intro" help="An optional, short statement displayed at the top of your job board. Limited to a maximum of 280 characters." />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none text-color-text" @click="$formkit.reset('contentForm')">Reset</button>
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
const url = ref(null)
let urlHasChanged = false

const emit = defineEmits(['saveSetting'])
onMounted(() => {
  if (props.job_board.banner_image)
    url.value = props.job_board.banner_image
})

function onFileChange(e) {
  const file = e.target.files[0];
  url.value = URL.createObjectURL(file);
  urlHasChanged = true
}
const submitHandler = async (data) => {
  const body = new FormData()
  body.append('job_board[id]', props.job_board.id)
  body.append('job_board[banner_setup]', data.banner_setup)
  body.append('job_board[banner_video_url]', data.banner_video_url)
  body.append('job_board[title]', data.title)
  body.append('job_board[intro]', data.intro)

  if (urlHasChanged)
    data.banner_image.forEach((fileItem) => {
      body.append('job_board[banner_image]', fileItem.file)
    })

  emit('saveSetting', props.job_board.id, body)
}
</script>
