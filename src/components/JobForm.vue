<template>
  <div class="flex items-center gap-3 py-4">
    <button type="button" class="inline-flex items-center" @click="$router.go(-1)">
      <IconArrowBack />
    </button>
    <h4 class="text-neutrals-100">Post a job</h4>
  </div>
  <JobStepper :step="step" />
  <JobFormStep1 v-if="step==1"/>
  <JobFormStep2 v-if="step==2"/>
  <JobFormStep3 v-if="step==3"/>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import JobStepper from '@/components/JobStepper.vue'
import JobFormStep1 from '@/components/JobFormStep1.vue'
import JobFormStep2 from '@/components/JobFormStep2.vue'
import JobFormStep3 from '@/components/JobFormStep3.vue'
import TagsInput from '@/components/TagsInput.vue';
const step = 1
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
