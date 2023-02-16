<template>
  <div class="flex items-center gap-3 py-4">
    <button type="button" class="inline-flex items-center" @click="$router.go(-1)">
      <IconArrowBack />
    </button>
    <h4 class="text-neutrals-100">{{ job?.id ? 'Edit job':'Post a job'}}</h4>
  </div>
  <JobStepper :step="step" />
  <JobFormStep1 v-if="step==1" :job="tmpJob" @save-job="saveJob" />
  <JobFormStep2 v-if="step==2" :job="tmpJob" @save-job="saveJob" />
  <JobFormStep3 v-if="step==3" :job="tmpJob" @save-job="saveJob" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import JobStepper from '@/components/JobStepper.vue'
import JobFormStep1 from '@/components/JobFormStep1.vue'
import JobFormStep2 from '@/components/JobFormStep2.vue'
import JobFormStep3 from '@/components/JobFormStep3.vue'
import TagsInput from '@/components/TagsInput.vue';
import { getCompletion } from '@/services/openai.js'

const step = ref(1)
const props = defineProps({
  job: Object,
  default: {}
})

let tmpJob = ref(props.job)

const emit = defineEmits(['submit'])

async function saveJob(job) {
  tmpJob.value = {
    ...tmpJob.value,
    ...job,
  };

  if (step.value == 3) {
    emit('submit', tmpJob.value)
  } else {
    if (step.value == 1) {
      const prompt = [`Write a ${tmpJob.value.title} job description`, `Write a list of ${tmpJob.value.title} 's responsibilities`]
      const a = await getCompletion(prompt)
      const choice = a.data.choices
      tmpJob.value.description = choice[0].text
      tmpJob.value.responsibilities = toHtmlList(choice[1].text)
    }
    step.value += 1;
  }
}

function toHtmlList(list) {
  const html = list.split('\n\n').filter(x => x.length > 0).map((x) => `<li><p>${x}</p></li>`).join('')

  return `<ol>${html}</ol>`;
}
</script>
