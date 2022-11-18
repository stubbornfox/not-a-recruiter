<template>
  <FormKit type="form" id="jobSeoForm" @submit="saveJobboard" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6">Job board custom domain</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can specify the custom domain configured for your job board.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
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

const schema = [{
    $formkit: 'url',
    name: 'custom_domain',
    label: 'Custom Domain',
    validation: 'required',
    placeholder: 'jobs.company.com',
    sectionsSchema: {
      prefix: {
        $el: 'div',
        attrs: {
          class: 'flex items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
        },
        children: 'https://',
      },
    }
  },
]

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
