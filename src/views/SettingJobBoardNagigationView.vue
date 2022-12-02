<template>
  <FormKit type="form" #default="{ value }" @submit="submitHandler" id="navigationForm" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board" novalidate>
    <div>
      <div>
        <h2 class="text-lg font-medium leading-6 text-heading">Job board navigation</h2>
        <p class="mt-1 text-sm text-gray-500">Here's where you can edit the URL and navigation behavior of your job board.</p>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-y-6">
        <FormKitSchema :schema="schema" />
      </div>
    </div>
    <div class="pt-5">
      <div class="flex">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none text-color-text" @click="$formkit.reset('navigationForm')">Reset</button>
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
  $formkit: 'url',
  name: 'slug',
  label: 'Job board URL',
  sectionsSchema: {
    prefix: {
      $el: 'div',
      attrs: {
        class: 'flex text-color-text items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
      },
      children: import.meta.env.VITE_APP_URL,
    },
  }
}]
const emit = defineEmits(['saveSetting'])
const submitHandler = async (data) => {
  const body = new FormData()
  body.append('job_board[id]', props.job_board.id)
  body.append('job_board[slug]', data.slug)

  emit('saveSetting', props.job_board.id, body)
}
</script>
