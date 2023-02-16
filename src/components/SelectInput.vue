<template>
  <v-select :options="options" :multiple="multiple" class="text-neutrals-60 w-full" v-model="selected" :value="selected" @update:modelValue="setSelected">
    <template #open-indicator="{ attributes }">
      <span v-bind="attributes">
        <IconChervonDown /></span>
    </template>
  </v-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
const props = defineProps({
  context: Object,
})

const { options, multiple} = props.context
const selected = ref(props.context.value || '')

function setSelected(val) {
  selected.value = val
  props.context.node.input(val)
}

</script>
