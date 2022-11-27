<template v-if="organization">
  <FormKit type="form" id="jobSeoForm" @submit="submitHandler" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board" #default="{ value }" novalidate>
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job board SEO</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can configure how your job board appears in search results and when linked on social media.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none text-color-text" @click="$formkit.reset('jobSeoForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user';
import { getNode } from '@formkit/core'
const userStore = useUserStore()
const { organization } = storeToRefs(userStore);

const error = ref([])
const props = defineProps({
  job_board: {
    type: Object
  }
})


const schema = [{
    $formkit: 'text',
    name: 'seo_title',
    id: 'seo_title',
    label: 'Title',
    help: `If left blank we will show "Jobs at organization" as the title of the main careers page.`
  },
  {
    $formkit: 'textarea',
    name: 'seo_description',
    id: 'seo_description',
    label: 'Description',
    help: 'If left blank we will show "View our open jobs at organization." as the description of the main careers page.'
  }
]
onMounted(() => {
  getNode('seo_title').props.help = `If left blank we will show "Jobs at ${organization.value.name}" as the title of the main careers page.`
  getNode('seo_description').props.help = `If left blank we will show "View our open jobs at  ${organization.value.name}." as the description of the main careers page.`

})
const emit = defineEmits(['saveSetting'])
const submitHandler = async (data) => {
  const body = new FormData()
  body.append('job_board[id]', props.job_board.id)
  body.append('job_board[seo_title]', data.seo_title)
  body.append('job_board[seo_description]', data.seo_description)

  emit('saveSetting', props.job_board.id, body)
}
</script>
