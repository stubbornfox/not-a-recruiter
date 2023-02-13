<template>
  <div class="flex flex-wrap gap-3">
    <span v-for="(badge, index) in badges" :class="`text-sm font-semibold text-${color[index]} ${getClass(index)} py-2 px-3`" :style="getStyle(index)">
      {{typeOfEmployments[badge]}}
    </span>
  </div>
</template>
<script setup>
import { typeOfEmployments } from '@/const'

const props = defineProps({
  badges: { type: Array, default: () => [] },
  outline: { type: Boolean, default: () => false }
})

function getClass(index) {
  if (props.outline) {
    return `border border-${color[index]}`
  }
}


function getStyle(index) {
  if (!props.outline) {
    return `border-radius: 80px; background: ${bg[index]}`
  } else {
    return `border-radius: 80px;`
  }
}

const color = ['yellow', 'green', 'blue', 'red', 'primary']
const bg = ['rgba(235, 133, 51, 0.1)', ' rgba(86, 205, 173, 0.1)','#E9EBFD', 'rgba(#FF6550, 0.1)', '#F1EAFC']
</script>
