<script setup>
  import { FormKitSchema } from '@formkit/vue'
  import axios from 'axios'
  const schema = [
      {
          $formkit: 'text',
          name: 'title',
          label: 'Position',
          validation: 'required',
        },
        {
          $formkit: 'text',
          name: 'location',
          label: 'Location',
          validation: 'required',
        },
        {
          $formkit: 'text',
          name: 'category',
          label: 'Category',
          validation: 'required',
        },
        {
          $formkit: 'textarea',
          name: 'description',
          label: 'Description',
          validation: 'required',
          help: 'Write a few sentences to describe your job and your criteria.'
        }

  ]

  async function addJob (job) {
    const res = await axios.post('/jobs', job)
    .then((response) => {
      console.log(response)
      alert('Created!')
    })
    .catch((e) => {
      console.log(e)
    })
  }
</script>

<template>
  <div class="bg-white">
    <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <FormKit type="form"
                  id="newJobForm"
                  @submit="addJob"
                  form-class="space-y-8 divide-y divide-gray-200"
                  :actions=false
                  :incomplete-message=false
        >
          <div class="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">Job Post</h3>
                <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
              </div>

              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <FormKitSchema :schema="schema"/>
              </div>
            </div>
          </div>
          <div class="pt-5">
            <div class="flex justify-end">
              <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="$formkit.reset('newJobForm')">Reset</button>
              <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
