<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="flex items-center gap-3 py-4">
          <button type="button" class="inline-flex items-center" @click="$router.go(-1)">
            <IconArrowBack />
          </button>
          <h4 class="text-neutrals-100">Post a job</h4>
        </div>
        <JobStepper :step="1" />
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit name="title" type="text" help="At least 80 characters" placeholder="e.g. Software Engineer" validation="required|length:80," value="">
            <template #label="context">
              <label :class="context.classes.label">Job Title</label>
              <span class="text-neutrals-60">Job titles must be describe one position</span>
            </template>
          </FormKit>
          <hr />
          <FormKit type="checkbox" :options="employmentType">
            <template #legend="context">
              <label class="block font-semibold text-neutrals-100">Type of Employment</label>
              <span class="text-neutrals-60">You can select multiple type of employment</span>
            </template>
          </FormKit>
          <hr />
          <div>
            <FormKit type="group" v-model="salary">
              <div>
                <label class="block font-semibold text-neutrals-100">Salary</label>
                <span class="text-neutrals-60">Please specify the estimated salary range for the role. *You can leave this blank</span>
              </div>
              <div class="flex items-center gap-x-12">
                <FormKit name="title" type="number" v-model="min_salary" input-class="pl-16 text-neutrals-100 font-semibold">
                  <template #prefix="context">
                    <div class="absolute top-3 left-4 flex items-center font-semibold text-neutrals-60 text-lg pr-3 border-r border-neutrals-20">
                      <div class="w-6 h-6">$</div>
                    </div>
                  </template>
                </FormKit>
                <span class="text-neutrals-60 mt-4">to</span>
                <FormKit name="title" type="text" v-model="max_salary" input-class="pl-16 text-neutrals-100 font-semibold">
                  <template #prefix="context">
                    <div class="absolute top-3 left-4 flex items-center font-semibold text-neutrals-60 text-lg pr-3 border-r border-neutrals-20">
                      <div class="w-6 h-6">$</div>
                    </div>
                  </template>
                </FormKit>
              </div>
            </FormKit>
          </div>
          <hr />
          <FormKit type="group">
            <div>
              <label class="block font-semibold text-neutrals-100">Categories</label>
              <span class="text-neutrals-60">You can select multiple job categories</span>
            </div>
            <v-select :options="books" label="title" multiple placeholder="Select Job Categories" class="text-neutrals-60">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                  <IconChervonDown /></span>
              </template>
            </v-select>
          </FormKit>
          <hr />
          <FormKit type="group">
            <div>
              <label class="block font-semibold text-neutrals-100">Required Skills</label>
              <span class="text-neutrals-60">Add required skills for the job</span>
            </div>
            <TagsInput v-model="tags" />
          </FormKit>
          <hr />
        </div>
      </div>
    </div>
    <div class="lg:h-20 flex items-center my-6 lg:my-10">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold" @click="step+=1">Next Step</button>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import JobStepper from '@/components/JobStepper.vue'
import TagsInput from '@/components/TagsInput.vue';
const tags=[]
const tag=''
const employmentType = {
  "full_time": "Full time",
  "internship": "Internship",
  "part_time": "Part time",
  "contract": "Contract",
  "remote": "Remote",
}
const books = [
  { title: "IT" },
  { title: "Designer" },
  { title: "Accountant" },
  { title: "Banker" },
  { title: "Restaurant" },
  { title: "Medicine" }
]
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
