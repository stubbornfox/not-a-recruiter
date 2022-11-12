<template>
  <FormKit  type="form"
            id="jobForm"
            @submit="saveJob"
            form-class="flex-grow-1 space-y-8 divide-y divide-gray-200"
            :actions=false
            :incomplete-message=false
            :value="editJob"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900">Job Details</h2>
          <p class="mt-1 text-sm text-gray-500">Write a perfect job detail with AI help.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormKitSchema :schema="schema"/>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="$formkit.reset('jobForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </FormKit>
</template>

<script setup>
  import { FormKitSchema } from '@formkit/vue'
  import {ref, onMounted} from 'vue'

  const employmentType = [
    { label: "Full time", value: "full_time"},
    { label: "Part time", value: "part_time"},
    { label: "Contractor", value: "contractor"},
    { label: "Temporary", value: "temporary"},
    { label: "Intern", value: "intern"},
    { label: "Volunteer", value: "volunteer"},
    { label: "Per diem", value: "per_diem"},
    { label: "Other", value: "other"},
  ]

  const props = defineProps({
    job: Object,
    default: {}
  })

  let editJob = props.job;

  const schema = [
  {
      $formkit: 'text',
      name: 'title',
      label: 'Position',
      validation: 'required',
    },
    {
      $formkit: 'text',
      name: 'category',
      label: 'Category',
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
      name: 'applicant_requirement_location',
      label: 'Applicant Requirement Location',
    },
    {
      $formkit: 'text',
      name: 'base_salary',
      label: 'Salary',
      validation: '',
    },
    {
      $formkit: 'select',
      name: 'employment_type',
      label: 'Contract',
      validation: '',
      options: employmentType
    },
    {
      $formkit: 'textarea',
      name: 'description',
      label: 'Description',
      validation: 'required',
      help: 'Write a few sentences to describe your job and your criteria.'
    }
  ]
  const emit = defineEmits(['saveJob'])

  async function saveJob(modifiedJob) {
    emit('saveJob', modifiedJob)
  }
</script>
