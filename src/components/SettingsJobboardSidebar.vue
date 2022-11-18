<template>
  <div id="setting-jobboarb-sidebar" class="pt-5 flex flex-col flex-grow h-full">
    <nav class="flex-1 space-y-1  px-2" aria-label="Sidebar">
      <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name==item.href.name ? 'bg-gray-100 ' : ' hover:bg-gray-50 hover:', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
        <span class="flex-1">{{ item.name }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";

const navigation = [
  { name: 'Branding', href: { name: 'SettingJobBoardBranding' } },
  { name: 'Content', href: { name: 'SettingJobBoardContent' } },
  { name: 'SEO', href: { name: 'SettingJobBoardSeo' } },
  { name: 'Navigation', href: { name: 'SettingJobBoardNavigation' } },
  { name: 'Custom Domain', href: { name: 'SettingJobBoardCustomDomain' } },
]
</script>
<style scoped>
#setting-jobboarb-sidebar {
  color: rgb(82, 82, 82);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}
</style>
