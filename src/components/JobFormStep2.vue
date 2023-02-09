<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start mt-6">
      <FormKit :type="textAreaInput" name="description" outer-class="w-full" inner-class="$reset mt-4 lg:grow lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
        <template #label="context">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Job Descriptions</label>
            <span class="text-neutrals-60">Job description must be describe job in details</span>
          </div>
        </template>
      </FormKit>
    </div>
    <hr class="my-6" />
    <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start mt-6">
      <FormKit :type="textAreaInput" name="responsibilities" outer-class="w-full" inner-class="$reset mt-4 lg:grow lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
        <template #label="context">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Responsibilities</label>
            <span class="text-neutrals-60">Outline the core responsibilities of the position</span>
          </div>
        </template>
      </FormKit>
    </div>
    <hr class="my-6" />

    <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start mt-6">
      <FormKit :type="textAreaInput" name="who_you_are" outer-class="w-full" inner-class="$reset mt-4 lg:grow lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
        <template #label="context">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Who are you</label>
            <span class="text-neutrals-60">Add your preferred candidates qualifications</span>
          </div>
        </template>
      </FormKit>
    </div>
    <hr class="my-6" />
    <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start mt-6">
      <FormKit :type="textAreaInput" name="nice_to_have" outer-class="w-full" inner-class="$reset mt-4 lg:grow lg:mt-0" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
        <template #label="context">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Nice-to-haves</label>
            <span class="text-neutrals-60">Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply</span>
          </div>
        </template>
      </FormKit>
    </div>
    <hr class="mt-6" />
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold">Next Step</button>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import TextEditor from '@/components/TextEditor.vue'
import { createInput } from '@formkit/vue'

const textAreaInput = createInput(TextEditor, {
  props: [],
})

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
