<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit name="title" label="Job title" id="title" type="text" help="At least 8 characters" placeholder="e.g. Software Engineer" validation="required|length:8," value="" wrapper-class="lg:flex lg:w-full lg:gap-x-28 lg:content-start" inner-class="lg:basis-96 lg:mt-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4">
            <template #label="context">
              <div class="lg:basis-64">
                <label :class="context.classes.label">Job Title</label>
                <span class="text-neutrals-60">Job titles must be describe one position</span>
              </div>
            </template>
          </FormKit>
          <hr />
          <FormKit type="checkbox" name="type_of_employments" label="Employment Type" :options="employmentType" fieldset-class="lg:flex lg:w-full lg:gap-x-28 lg:content-start" inner-class="lg:mt-0 lg:mr-4" help-class="lg:pl-64 lg:ml-28 lg:-mt-4" options-class="lg:basis-96 lg:mt-0 grid grid-cols-2 lg:grid-cols-1">
            <template #legend="context">
              <div class="lg:basis-64">
                <label class="block font-semibold text-neutrals-100">Type of Employment</label>
                <span class="text-neutrals-60">You can select multiple type of employment</span>
              </div>
            </template>
          </FormKit>
          <hr />
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Salary</label>
              <span class="text-neutrals-60">Please specify the estimated salary range for the role. *You can leave this blank</span>
            </div>
            <div class="flex items-center gap-x-12 lg:basis-96">
              <FormKit name="min_salary" type="number" v-model="min_salary" input-class="pl-16 text-neutrals-100 font-semibold">
                <template #prefix="context">
                  <div class="absolute top-3 left-4 flex items-center font-semibold text-neutrals-60 text-lg pr-3 border-r border-neutrals-20">
                    <div class="w-6 h-6">$</div>
                  </div>
                </template>
              </FormKit>
              <span class="text-neutrals-60 mt-4">to</span>
              <FormKit name="max_salary" type="number" v-model="max_salary" input-class="pl-16 text-neutrals-100 font-semibold">
                <template #prefix="context">
                  <div class="absolute top-3 left-4 flex items-center font-semibold text-neutrals-60 text-lg pr-3 border-r border-neutrals-20">
                    <div class="w-6 h-6">$</div>
                  </div>
                </template>
              </FormKit>
            </div>
          </div>
          <hr />
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <FormKit :type="selectInput" :options="categories" :multiple="true" name="categories" outer-class="w-full" inner-class="$reset mt-4 lg:basis-96 lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
              <template #label="context">
                <div class="lg:basis-64">
                  <label class="block font-semibold text-neutrals-100">Categories</label>
                  <span class="text-neutrals-60">You can select multiple job categories</span>
                </div>
              </template>
            </FormKit>
          </div>
          <hr />
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <FormKit :type="tagInput" name="skills" outer-class="w-full" inner-class="$reset mt-4 lg:basis-96 lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
              <template #label="context">
                <div class="lg:basis-64">
                  <label class="block font-semibold text-neutrals-100">Required Skills</label>
                  <span class="text-neutrals-60">Add required skills for the job</span>
                </div>
              </template>
            </FormKit>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold">Next Step</button>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import TagsInput from '@/components/TagsInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { createInput } from '@formkit/vue'
import { categories } from '@/const'
const tags = []
const tag = ''
const job_categories = ref(null)

const values = ref({})
const selectInput = createInput(SelectInput, {
  props: ['options', 'multiple'],
})
const tagInput = createInput(TagsInput, {
  props: [],
})

const employmentType = {
  "full_time": "Full time",
  "internship": "Internship",
  "part_time": "Part time",
  "contract": "Contract",
  "remote": "Remote",
}
const props = defineProps({
  job: Object,
  default: {}
})

let editJob = props.job;

const emit = defineEmits(['saveJob'])

async function saveJob(modifiedJob) {
  emit('saveJob', modifiedJob)
}
</script>
