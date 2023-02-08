<template>
  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
  <div class="p-4 border border-neutrals-20 rounded" v-if="show">
    <div class="flex items-center justify-between pb-6">
      <component :is="benefit.icon"/>
      <button @click="show=false">
        <IconXMark />
      </button>
      </div>
      <h5 class="text-neutrals-100">{{benefit.header}}</h5>
        <div class="mt-3 text-neutrals-60">{{benefit.description}}</div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import IconXMark from '@/components/icons/IconXMark.vue'
const props = defineProps({
  benefit: Object,
})
let show = ref(true);
</script>
