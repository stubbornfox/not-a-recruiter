<template>
  <div id="setting-jobboarb-sidebar" class="pt-5 flex flex-col flex-grow h-full">
    <nav class="flex-1 px-2" aria-label="Sidebar">
      <div class="space-y-1">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name==item.href.name ? 'bg-soft' : ' hover:bg-mute', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
          <span class="flex-1 text-heading">{{ item.name }}</span>
        </RouterLink>
      </div>
      <hr class="divide-y border-0 mt-8">
      <div class="text-xs">
        <h5 class="text-heading font-bold mb-3">Job board</h5>
        <button class="text-color-text flex items-center overflow-hidden" @click="previewJob">
          <i class="mr-2">
            <ArrowTopRightOnSquareIcon class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          </i>
          <span class="overflow-ellipsis whitespace-nowrap">Preview job board</span>
        </button>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import {
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/outline'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  slug: {
    type: String,
  },
})

const router = useRouter()

const navigation = [
  { name: 'Branding', href: { name: 'SettingJobBoardBranding' } },
  { name: 'Content', href: { name: 'SettingJobBoardContent' } },
  { name: 'SEO', href: { name: 'SettingJobBoardSeo' } },
  { name: 'Navigation', href: { name: 'SettingJobBoardNavigation' } },
  { name: 'Custom Domain', href: { name: 'SettingJobBoardCustomDomain' } },
]

function previewJob() {
  let route = router.resolve({ name: 'JobBoardPreview', params: { slug: props.slug } });
  window.open(route.href);
}
</script>
<style scoped>
#setting-jobboarb-sidebar {
  color: rgb(82, 82, 82);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}
</style>
