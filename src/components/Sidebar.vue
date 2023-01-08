<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <div class="fixed inset-0 z-40 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col border-r border-color pt-5 pb-4">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <RouterLink :to="{name: 'Organizations'}" class="inline-block h-10 w-10 rounded-md bg-mute flex items-center justify-center">
                <span class="text-heading text-lg font-semibold">{{organization?.name ? organization?.name[0] : ''}}</span>
              </RouterLink>
              <h5 class="text-heading text-md font-semibold ml-4">{{organization?.name}}</h5>
            </div>
            <nav class="mt-5 h-full flex-shrink-0 divide-y divide-border-color overflow-y-auto" aria-label="Sidebar">
              <div class="space-y-1 px-2">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-pink-700 text-white' : 'text-blue-100 hover:text-white hover:bg-soft', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                  <!-- <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-blue-200" aria-hidden="true" /> -->
                  {{ item.name }}
                </a>
              </div>
              <div class="mt-6 pt-6">
                <div class="space-y-1 px-2">
                  <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-blue-100 hover:bg-soft hover:text-white">
                    <!-- <component :is="item.icon" class="mr-4 h-6 w-6 text-color-text" aria-hidden="true" /> -->
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </nav>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-40" id="sidebar">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="menu w-full">
      <div class="logo-container">
        <img :src="Logo" width="87" />
      </div>
      <nav class="main-menu divide-y divide-secondary overflow-y-auto" aria-label="Sidebar">
        <div class="space-y-1 px-2 w-full">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }" :aria-current="item.current ? 'page' : undefined">
            <i aria-hidden="true" class="navigation-icon">
              <component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined"/>
            </i>
            <span class="navigation-caption">{{ item.name }}</span>
          </RouterLink>
        </div>
        <div class="py-8 w-full">
          <div class="space-y-1 px-2">
            <h3 class="settings">SETTINGS</h3>
            <RouterLink v-for="item in secondaryNavigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }">
              <i aria-hidden="true" class="navigation-icon"><component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined"/></i>
              <span class="navigation-caption">{{ item.name }}</span>
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

import Logo from '@/assets/images/logo.svg';
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconMessages from '@/components/icons/IconMessages.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconCompany from '@/components/icons/IconCompany.vue'
import IconHr from '@/components/icons/IconHr.vue'
import IconJobListing from '@/components/icons/IconJobListing.vue'
import IconSetings from '@/components/icons/IconSettings.vue'
import IconHelp from '@/components/icons/IconHelp.vue'

const sidebarOpen = ref(false)

const applicantNavigation = [
  { name: 'Dashboard', href: '/', icon: IconDashboard },
  { name: 'Messages', href: '/messages', icon: IconDashboard },
  { name: 'My Applications', href: '/applicantions', icon: IconDashboard },
  { name: 'Find Jobs', href: '/jobs', icon: IconDashboard },
  { name: 'Browse Companies', href: '/company', icon: IconDashboard },
  { name: 'My Public Profile', href: '/profile', icon: IconDashboard },
]

const companyNavigation = [
  { name: 'Dashboard', href: '/', icon: IconDashboard },
  { name: 'Messages', href: '/messages', icon: IconMessages },
  { name: 'Company Profile', href: '/company', icon: IconCompany },
  { name: 'All Applicants', href: '/applicants', icon: IconHr },
  { name: 'Job Listing', href: '/jobs', icon: IconJobListing },
  { name: 'My Schedule', href: '/schedule', icon: IconCalendar },
]

const navigation = companyNavigation

const secondaryNavigation = [
  { name: 'Settings', href: '/settings/organization', icon: IconSetings },
  { name: 'Help center', href: 'help', icon: IconHelp },
]

const router = useRouter()


function isActive(href) {
  return router.currentRoute.value.fullPath == href
}
</script>
<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 0px;
  gap: 126px;
  position: relative;
  width: 272px;
  background: #E8E8E8;
  height: 100%;
  box-shadow: 1px 0px 0px #D3D6DB;
}

.navigation-icon {
  width: 24px;
  height: 24px;
}

.navigation-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px 12px 32px;
  gap: 16px;
  width: 100%;
  height: 48px;
}

.navigation-link.active {
  background-color: #F1EAFC;
}

.active .navigation-caption {
  color: #7330DF;

}

.active path {
  stroke: #7330DF !important;
}

.navigation-caption {
  height: 24px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #747474;
}

.main-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 100%;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 32px;
}

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 64px 0px 0px;
  gap: 8px;

  width: 191px;
  height: 36px;
}

h3.settings {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.04em;
  color: #202430;
  opacity: 0.5;
  padding: 12px 16px 12px 32px;

}
</style>
