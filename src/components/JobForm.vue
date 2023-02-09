<template>
  <div class="flex items-center gap-3 py-4">
    <button type="button" class="inline-flex items-center" @click="$router.go(-1)">
      <IconArrowBack />
    </button>
    <h4 class="text-neutrals-100">Post a job</h4>
  </div>
  <JobStepper :step="step" />
  <JobFormStep1 v-if="step==1" @save-job="saveJob"/>
  <JobFormStep2 v-if="step==2" @save-job="saveJob"/>
  <JobFormStep3 v-if="step==3" @save-job="saveJob"/>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import JobStepper from '@/components/JobStepper.vue'
import JobFormStep1 from '@/components/JobFormStep1.vue'
import JobFormStep2 from '@/components/JobFormStep2.vue'
import JobFormStep3 from '@/components/JobFormStep3.vue'
import TagsInput from '@/components/TagsInput.vue';
const step = ref(1)
const props = defineProps({
  job: Object,
  default: {}
})

let tmpJob = props.job;

const emit = defineEmits(['submit'])

async function saveJob(job) {
  debugger
  // step.value = step.value + 1;
  tmpJob = {
      ...tmpJob,
      ...job
  };

  if (step.value == 3) {
    emit('submit', tmpJob)
  } else {
    step.value += 1;
  }
}
</script>
