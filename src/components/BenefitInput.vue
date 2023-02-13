<template>
  <v-select :options="options" multiple class="text-neutrals-60 w-full" @update:modelValue="setSelected"  append-to-body v-model="selected" >
    <template #open-indicator="{ attributes }">
      <span v-bind="attributes">
      </span>
    </template>
    <template #option="{label}">
      <span>{{defaultBenefits[label].header}}</span>
    </template>
    <template #selected-option-container="{ option, deselect, multiple, disabled }">
      <div class="vs__selected hidden">
      </div>
    </template>
    <template #footer="{ search, loading, searching, filteredOptions, deselect }">
      <div class="mt-4 lg:grid lg:grid-cols-2 lg:gap-x-4">
        <BenefitCard v-for="(benefit,index) in selected" :benefit="defaultBenefits[benefit]" class="mb-4 lg:w-64" @remove="deselect(benefit)" />
      </div>
    </template>
  </v-select>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import defaultBenefits from '@/benefits'
import BenefitCard from '@/components/BenefitCard.vue';
import IconFullHealth from '@/components/icons/IconFullHealth.vue';
import IconUnlimitedVacation from '@/components/icons/IconUnlimitedVacation.vue';
import IconSkillDevelopment from '@/components/icons/IconSkillDevelopment.vue';
const props = defineProps({
  context: Object,
})

const options = Object.keys(defaultBenefits)
const selected = ref(props.context.value || [])
const benefits = ref(selected)


function setSelected(val) {
  selected.value = val
   props.context.node.input(val)
}
</script>
