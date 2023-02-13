<template>
  <div class="flex items-center gap-3 py-4">
    <button type="button" class="inline-flex items-center" @click="$router.go(-1)">
      <IconArrowBack />
    </button>
    <h4 class="text-neutrals-100">{{ job?.id ? 'Edit job':'Post a job'}}</h4>
  </div>
  <JobStepper :step="step" />
  <JobFormStep1 v-if="step==1" :job="job" @save-job="saveJob" />
  <JobFormStep2 v-if="step==2" :job="job" @save-job="saveJob" />
  <JobFormStep3 v-if="step==3" :job="job" @save-job="saveJob" />
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

let tmpJob = {}

const emit = defineEmits(['submit'])

async function saveJob(job) {
  tmpJob = {
    ...tmpJob,
    ...job,
  };

  if (step.value == 3) {
    emit('submit', tmpJob)
  } else {
    step.value += 1;
  }
}
</script>
