<template>
  <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
    <div class="mt-6 mb-4 lg:basis-64">
      <label class="block font-semibold text-neutrals-100">Perks and Benefits</label>
      <span class="text-neutrals-60">Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees</span>
    </div>
    <div class="mt-4 lg:grid lg:grid-cols-2 lg:gap-x-4">
      <BenefitCard v-for="benefit in benefits" :benefit="benefit" class="mb-4 lg:w-64"/>
    </div>
  </div>
  <hr/>
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold" @click="step+=1">Do review</button>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import TagsInput from '@/components/TagsInput.vue';
import BenefitCard from '@/components/BenefitCard.vue';
import IconFullHealth from '@/components/icons/IconFullHealth.vue';
import IconUnlimitedVacation from '@/components/icons/IconUnlimitedVacation.vue';
import IconSkillDevelopment from '@/components/icons/IconSkillDevelopment.vue';
const benefits = [
  {
    icon: IconFullHealth,
    value: 'full_healcare',
    header: 'Full Healthcare',
    description: 'We believe in thriving communities and that starts with our team being happy and healthy.'
  },
  {
    icon: IconUnlimitedVacation,
    value: 'unlimited_vacation',
    header: 'Unlimited Vacation',
    description: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.'
  },
  {
    icon: IconSkillDevelopment,
    value: 'skill_development',
    header: 'Skill Development',
    description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course."
  }
]
</script>
