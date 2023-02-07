<template>
  <div class="py-4 px-3 border rounded border-neutrals-20">
    <div class=" flex items-center justify-between ">
      <IconJobStep1 :fill="step >= 1 ? '#7330DF':'#E9EBFD'" :stroke="step >= 1 ? '#FFF':'#747474'" />
      <div class="steps"></div>
      <IconJobStep2 :fill="step >= 2 ? '#7330DF':'#E9EBFD'" :stroke="step >= 2 ? '#FFF':'#747474'" />
      <div class="steps"></div>
      <IconJobStep3 :fill="step >= 3 ? '#7330DF':'#E9EBFD'" :stroke="step >= 3 ? '#FFF':'#747474'" />
    </div>
    <div class="flex items-center mt-4">
      <div class="text-primary font-normal pr-3 border-r border-neutrals-20">Step {{step}}/3</div>
      <h5 class="pl-3 text-neutrals-100">{{jobStepDesc[step]}}</h5>
    </div>
  </div>
  <div class="py-6 border-b border-neutrals-20">
    <div class="text-lg text-neutrals-100 font-semibold">Basic Information</div>
    <p class="text-neutrals-60">{{jobStepBasicInfo[step]}}</p>
  </div>
</template>
<script setup>
import IconJobStep1 from '@/components/icons/IconJobStep1.vue'
import IconJobStep2 from '@/components/icons/IconJobStep2.vue'
import IconJobStep3 from '@/components/icons/IconJobStep3.vue'

const props = defineProps({
  step: Number,
})

const jobStepDesc = {
  1: 'Job information',
  2: 'Job description',
  3: 'Perks & Benefits',
}

const jobStepBasicInfo = {
  1: 'This information will be displayed publicly',
  2: 'Add the description of the job, responsibilities, who you are, and nice-to-haves.',
  3: 'List out your top perks and benefits.',
}
</script>
<style scoped>
.steps {
  flex-grow: 1;
  display: flex;
}

.steps:before,
.steps:after {
  content: "";
  flex: 1 1;
  border-bottom: 2px solid #D1D1D1;
  margin: auto;
}

.steps:before {
  margin-left: 12px
}

.steps:after {
  margin-right: 12px
}
</style>
