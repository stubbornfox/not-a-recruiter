<template>
  <div class="flex flex-grow border-t border-color">
    <div class="lg:w-1/4 md:w-1/3">
      <div id="setting-sidebar" class="pt-5 flex flex-col flex-grow h-full">
        <nav class="flex-1 space-y-1  px-2" aria-label="Sidebar">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name.includes(item.href.key) ? 'bg-soft' : 'hover:bg-mute', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
            <span class="flex-1 text-heading">{{ item.name }}</span>
          </RouterLink>
        </nav>
      </div>
    </div>
    <div class="w-full h-full">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
const navigation = [
  { name: 'Organization', href: { name: 'SettingOrganization', key: 'SettingOrganization' } },
  { name: 'Job board', href: { name: 'SettingJobBoardBranding', key: 'SettingJobBoard'} },
]
</script>
<style scoped>
#setting-sidebar {
  color: rgb(82, 82, 82);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}
</style>
