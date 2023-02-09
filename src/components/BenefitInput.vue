<template>
  <v-select :options="options" label="header" multiple class="text-neutrals-60 w-full" :value="selected" @update:modelValue="setSelected" @option:selected="addBenefit" @option:deselected="removeBenefit"  append-to-body >
    <template #open-indicator="{ attributes }">
      <span v-bind="attributes">
      </span>
    </template>
    <template #selected-option-container="{ option, deselect, multiple, disabled }">
      <div class="vs__selected hidden">
      </div>
    </template>
    <template #footer="{ search, loading, searching, filteredOptions, deselect }">
      <div class="mt-4 lg:grid lg:grid-cols-2 lg:gap-x-4">
        <BenefitCard v-for="(benefit,index) in benefits" :benefit="benefit" class="mb-4 lg:w-64" @remove="debugger;deselect(benefit)" />
      </div>
    </template>
  </v-select>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BenefitCard from '@/components/BenefitCard.vue';
import IconFullHealth from '@/components/icons/IconFullHealth.vue';
import IconUnlimitedVacation from '@/components/icons/IconUnlimitedVacation.vue';
import IconSkillDevelopment from '@/components/icons/IconSkillDevelopment.vue';
const props = defineProps({
  context: Object,
})

const benefits = ref([])

const defaultBenefits = [{
    id: 0,
    icon: IconFullHealth,
    value: 'full_healcare',
    header: 'Full Healthcare',
    description: 'We believe in thriving communities and that starts with our team being happy and healthy.'
  },
  {
    id: 1,
    icon: IconUnlimitedVacation,
    value: 'unlimited_vacation',
    header: 'Unlimited Vacation',
    description: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.'
  },
  {
    id: 2,
    icon: IconSkillDevelopment,
    value: 'skill_development',
    header: 'Skill Development',
    description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course."
  }
]

const options = defaultBenefits
const selected = ref(props.context.value || [])

function setSelected(val) {
  selected.value = val
  setNodeValue(val)
}

function setNodeValue(val) {
  props.context.node.input(val.map(v => v.value))
}

function addBenefit(val) {
  benefits.value = val
}

function removeBenefit(value) {
  selected.value = selected.value.filter((t) => t != value)
  setNodeValue(selected.value)
  benefits.value = selected.value
}
</script>
