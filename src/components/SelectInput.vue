<template>
  <v-select :clearable="false" :options="options" :multiple="multiple" :taggable="taggable" class="text-neutrals-60 w-full" v-model="selected" :value="selected" @update:modelValue="setSelected" :reduce="reduce">
  </v-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
const props = defineProps({
  context: Object,
})

const { options, multiple, taggable, reduce } = props.context
const selected = ref(props.context.value || '')

function setSelected(val) {
  selected.value = val
  props.context.node.input(val)
}

</script>
