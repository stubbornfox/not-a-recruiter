<template>
  <form class="mt-6">
    <div class="lg:flex lg:items-start lg:gap-x-28">
      <div class="mt-6 mb-4 lg:basis-64">
        <label class="block font-semibold text-neutrals-100">Job Descriptions</label>
        <span class="text-neutrals-60">Job titles must be describe one position</span>
      </div>
      <TextEditor v-model="description" />
    </div>
    <hr class="my-6" />
    <div class="lg:flex lg:items-start lg:gap-x-28">
      <div class="mt-6 mb-4 lg:basis-64">
        <label class="block font-semibold text-neutrals-100">Responsibilities</label>
        <span class="text-neutrals-60">Outline the core responsibilities of the position</span>
      </div>
      <TextEditor v-model="responsibilites" />
    </div>
    <hr class="my-6" />
    <div class="lg:flex lg:items-start lg:gap-x-28">
      <div class="mt-6 mb-4 lg:basis-64">
        <label class="block font-semibold text-neutrals-100">Who are you</label>
        <span class="text-neutrals-60">Add your preferred candidates qualifications</span>
      </div>
      <TextEditor v-model="whoyouare" />
    </div>
    <hr class="my-6" />
    <div class="lg:flex lg:items-start lg:gap-x-28">
      <div class="mt-6 mb-4 lg:basis-64">
        <label class="block font-semibold text-neutrals-100">Nice-to-haves</label>
        <span class="text-neutrals-60">Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply</span>
      </div>
      <TextEditor v-model="nicetohaves" />
    </div>
    <hr class="mt-6" />
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold" @click="emit('nextStep')">Next Step</button>
    </div>
  </form>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import TextEditor from '@/components/TextEditor.vue'
const description = ref(null)
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
