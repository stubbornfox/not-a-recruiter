<template>
  <FormKit type="form" id="jobSeoForm" @submit="saveJobboard" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6">Job board branding</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can configure how your brand is represented on your job board and links shared on social media.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKit
            type="select"
            label="Header visuals"
            name="header_visual"
            :options="{
              logo_and_name: 'Show logo and name',
              logo_only: 'Show logo only',
              name_only: 'Show name only',
            }"
           help= "Choose what to display at the top of your job board. If no logo image is provided, your organization name will be displayed."
          />

          <FormKit
            type="select"
            label="Job board social media image"
            name="jobboard_social_media"
            :options="{
              default: 'Default',
              custom: 'Custom',
              none: 'None',
            }"
           help= "The image that will be displayed when your job board is shared on sites such as LinkedIn, Twitter, and Facebook."
          />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('jobSeoForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from "vue-router";

const job = ref({})
const error = ref([])

async function saveJobboard(modifiedJobboard) {
  const res = await axios.put(`/jobs/${slug}`, modifiedJob)
    .then((response) => {
      alert('Updated!')
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
