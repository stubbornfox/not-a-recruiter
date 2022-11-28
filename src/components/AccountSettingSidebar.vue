<template>
  <div id="account-setting-sidebar" class="pt-5 flex flex-col flex-grow h-full">
    <nav class="flex-1 px-2" aria-label="Sidebar">
      <div class="space-y-1">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name==item.href.name ? 'bg-soft' : ' hover:bg-mute', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
          <i class="text-heading">
            <component :is="item.icon" class="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          </i>
          <span class="flex-1 text-heading">{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import {
  UserCircleIcon,
  MoonIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Profile', href: { name: 'AccountSettingProfile' }, icon: UserCircleIcon },
  { name: 'Preferences', href: { name: 'AccountSettingPreferences' }, icon: MoonIcon },
  { name: 'Password', href: { name: 'AccountSettingSecurity' }, icon: ShieldCheckIcon },
]
</script>
<style scoped>
#account-setting-sidebar {
  color: rgb(82, 82, 82);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}
</style>
