<template>
  <FormKit type="form" #default="{ value }" @submit="submitHandler" id="jobBoardBrandingForm" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job board branding</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can configure how your brand is represented on your job board and links shared on social media.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKit type="select" label="Header visuals" name="header_setup" :options="{
              logo_and_name: 'Show logo and name',
              logo_only: 'Show logo only',
              name_only: 'Show name only',
            }" help="Choose what to display at the top of your job board. If no logo image is provided, your organization name will be displayed." />
          <div v-if="value.header_setup == 'logo_only' || value.header_setup == 'logo_and_name'" class="sm:col-span-4">
            <FormKit type="file" label="Job board logo" accept=".png,.jpg,.svg,.jpeg" help="Your logo should be a square image with dimensions of at least 128px. PNG, JPG, and SVG file types are acceptable. The image you use on your company's Twitter, Facebook, or LinkedIn account should work great." @change="onFileChange" name="logo_image" />
            <div class="sm:col-span-4" v-show="url">
              <img :src="url" class="w-20 h-20 rounded border-4 border-mute" />
            </div>
          </div>
          <FormKit type="select" label="Job board social media image" name="og_image_setup" :options="{
              default: 'Default',
              custom: 'Custom',
              nothing: 'None',
            }" help="The image that will be displayed when your job board is shared on sites such as LinkedIn, Twitter, and Facebook." />
          <div v-if="value.og_image_setup == 'custom'" class="sm:col-span-4">
            <FormKit type="file" label="Custom social media image" accept=".png,.jpg,.svg,.jpeg" help="Provide the custom image to use. It should be an 1.9:1 ratio image with dimensions of 1200 x 630. PNG and JPG file types are acceptable. If no image is provided, the default will be used." @change="socialMediaImageChange" name="social_media_image" />
            <div class="sm:col-span-4" v-show="socialMediaImageUrl">
              <img :src="socialMediaImageUrl" class="w-40 h-20 rounded border-4 border-mute" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none text-color-text" @click="$formkit.reset('jobBoardBrandingForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const emit = defineEmits(['saveSetting'])
const error = ref([])

let urlHasChanged = false
let socialMediaImageUrlHasChanged = false
const props = defineProps({
  job_board: Object,
})

const url = ref(null)
const socialMediaImageUrl = ref(null)

onMounted(() => {
  url.value = props.job_board.logo_image
  socialMediaImageUrl.value = props.job_board.social_media_image
})

function onFileChange(e) {
  const file = e.target.files[0];
  url.value = URL.createObjectURL(file);
  urlHasChanged = true
}


function socialMediaImageChange(e) {
  const file = e.target.files[0];
  socialMediaImageUrl.value = URL.createObjectURL(file);
  socialMediaImageUrlHasChanged = true
}

const submitHandler = async (data) => {
  const body = new FormData()
  body.append('job_board[id]', props.job_board.id)
  body.append('job_board[header_setup]', data.header_setup)
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
