<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full divide-y divide-border-color overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job details</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can edit the general information for this job. This includes things such as the job-type, hiring location, and if it's remote-friendly.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
    </div>
    <div class="h-20 flex items-center my-10">
      <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save changes</button>
    </div>
  </FormKit>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'

const employmentType = [
  { label: "Full time", value: "full_time" },
  { label: "Part time", value: "part_time" },
  { label: "Contractor", value: "contractor" },
  { label: "Temporary", value: "temporary" },
  { label: "Intern", value: "intern" },
  { label: "Volunteer", value: "volunteer" },
  { label: "Per diem", value: "per_diem" },
  { label: "Other", value: "other" },
]

const displaySalaryType = [
  { label: "Not shown", value: "not_shown" },
  { label: "Range", value: "range" },
  { label: "Fixed amount", value: "fixed_amount" },
];

const timeframeType = [
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const props = defineProps({
  job: Object,
  default: {}
})

let editJob = props.job;

const schema = [{
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
    $el: "label",
    children: ["Salary"],
    attrs: {
      class: "text-color-text font-bold",
    },
  },
  {
    $el: "div",
    children: [
      {
        $formkit: "select",
        name: "display_salary_type",
        id: "display_salary_type",
        label: "Display",
        validation: "required",
        options: displaySalaryType,
      },
      {
        if: "$get(display_salary_type).value != 'not_shown'",
        then: {
          $el: "div",
          attrs: {
            class: "mt-4 pl-3 border-l-2 border-zinc-400 grid grid-cols-1 gap-y-6",
          },
          children: [
            {
              if: "$get(display_salary_type).value == 'fixed_amount'",
              then: {
                $formkit: "number",
                name: "salary_amount",
                label: "Amount",
                validation: "required",
              },
              else: {
                if: "$get(display_salary_type).value == 'range'",
                then: {
                  children: [
                    {
                      $formkit: "number",
                      name: "min_salary_amount",
                      label: "Minimum amount",
                      validation: "required",
                    },
                    {
                      $formkit: "number",
                      name: "max_salary_amount",
                      label: "Maximum amount",
                      validation: "required",
                    },
                  ],
                },
              },
            },
            {
              $formkit: "select",
              name: "salary_timeframe",
              label: "Timeframe",
              validation: "required",
              options: timeframeType,
            },
            {
              $formkit: "text",
              name: "salary_currency",
              label: "Currency",
              validation: "required",
            },
          ],
        },
      },
    ],
  },
  {
    $formkit: 'select',
    name: 'employment_type',
    label: 'Contract',
    validation: '',
    options: employmentType
  },
]
const emit = defineEmits(['saveJob'])

async function saveJob(modifiedJob) {
  emit('saveJob', modifiedJob)
}
</script>
