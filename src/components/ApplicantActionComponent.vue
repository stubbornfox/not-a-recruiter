<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex w-full justify-center border-0">
        <IconVerticalDot />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{name: 'JobApplicants', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Declined Applicants</RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{name: 'JobDetails', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Next Stage</RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{name: 'JobAnalytics', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Interviewed</RouterLink>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import IconVerticalDot from '@/components/icons/IconVerticalDot.vue'
const props = defineProps({
  job: {},
})
</script>
