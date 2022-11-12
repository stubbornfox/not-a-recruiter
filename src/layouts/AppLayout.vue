<script setup lang="ts">
  import DefaultLayout from './DefaultLayout.vue'
  import PlainLayout from './PlainLayout.vue'
  import { markRaw, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const layout = ref()
  const route = useRoute()

  watch(
    () => route.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        if (metaLayout)
          layout.value = markRaw(PlainLayout)
        else
          layout.value = markRaw(DefaultLayout)
      } catch (e) {
        layout.value = markRaw(DefaultLayout)
      }
    },
    { immediate: true }
  )
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template>
