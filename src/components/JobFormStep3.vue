<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start mt-6">
      <FormKit :type="benefitInput" name="benefits" outer-class="w-full" inner-class="$reset mt-4 lg:mt-0 lg:grow lg:max-w-lg" wrapper-class="$reset lg:flex lg:w-full lg:gap-x-28 lg:content-start">
        <template #label="context">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Perks and Benefits</label>
            <span class="text-neutrals-60">Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees</span>
          </div>
        </template>
      </FormKit>
    </div>
    <hr class="mt-6" />
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold">Do review</button>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BenefitInput from '@/components/BenefitInput.vue';
import { createInput } from '@formkit/vue'

const benefitInput = createInput(BenefitInput, {
  props: [],
})

const props = defineProps({
  job: Object,
  default: {}
})

let editJob = props.job;

const emit = defineEmits(['saveJob'])
async function saveJob(modifiedJob) {
  const { benefits } = modifiedJob;
  emit('saveJob', { benefits })
}
</script>
