<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="$emit('closeSidebar')">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-neutrals-10i" />
      </TransitionChild>
      <div class="fixed inset-0 z-40 flex w-full">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full flex-1 flex-col pb-4">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="flex py-6 items-center">
                <button type="button" class="ml-4 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none" @click="$emit('closeSidebar')">
                  <span class="sr-only">Close sidebar</span>
                  <IconXMark aria-hidden="true" />
                </button>
                <div class="logo-container ml-20">
                  <img :src="Logo" width="87" />
                </div>
              </div>
            </TransitionChild>
            <nav class="h-full flex-shrink-0 divide-y divide-secondary overflow-y-auto flex flex-col" aria-label="Sidebar">
              <div class="w-full mb-6">
                <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }" :aria-current="item.current ? 'page' : undefined" @click="$emit('closeSidebar')">
                  <div class="navigation-link-content">
                    <i aria-hidden="true" class="navigation-icon">
                      <component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined" />
                    </i>
                    <span class="navigation-caption">{{ item.name }}</span>
                  </div>
                </RouterLink>
              </div>
              <div class="py-6 w-full flex-1">
                <div class="">
                  <h3 class="settings">SETTINGS</h3>
                  <RouterLink v-for="item in secondaryNavigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }" @click="$emit('closeSidebar')">
                    <div class="navigation-link-content">
                      <i aria-hidden="true" class="navigation-icon">
                        <component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined" /></i>
                      <span class="navigation-caption">{{ item.name }}</span>
                    </div>
                  </RouterLink>
                </div>
                <div class="navigation-link-content">
                <Menu as="div" class="relative">
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute -top-full bg-white left-16 z-10 mt-2 w-40 origin-top-left ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-slot="{ active }">
                      <RouterLink :to="{ name: 'AccountSettingProfile' }" :class="[active ? 'bg-gray-100' : '', 'block p-3']">Settings</RouterLink>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                      <a href="#" @click="logout" :class="[active ? 'bg-gray-100' : '', 'block p-3']">Logout</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                  <MenuButton class="flex p-0 items-center rounded-full  text-sm focus:outline-none" id="profile" v-if="user">
                    <div class="avatar">
                      <img v-if="user.profile_picture" :src="user.profile_picture">
                      <div v-else>
                        <span class="rounded-full h-10 w-10 bg-mute text-color-text flex items-center justify-center font-bold">{{me?.first_name && me?.first_name[0]}}</span>
                        </div>
                      </div>
                      <div>
                        <div class="name">{{user.first_name}}</div>
                        <div class="email">{{user.email}}</div>
                      </div>
                      <span class="ml-3 hidden text-sm font-medium text-color-text lg:block">
                        <span class="sr-only">Open user menu for {{user.first_name}}</span>
                      </span>
                      <ChevronDownIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
                    </MenuButton>
                  </Menu>
                </div>
                <div id="mobilePostJob" class="p-4 absolute left-0 right-0 bottom-20">
                  <RouterLink type="button" to="/jobs/new" class="btn btn-primary flex" @click="$emit('closeSidebar')">
                    <IconPlus />
                    <span>Post a job</span>
                  </RouterLink>
                </div>
              </div>
            </nav>
          </DialogPanel>
        </TransitionChild>
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
        <div class="w-full">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }" :aria-current="item.current ? 'page' : undefined">
            <div class="navigation-link-content">
              <i aria-hidden="true" class="navigation-icon">
                <component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined" />
              </i>
              <span class="navigation-caption">{{ item.name }}</span>
            </div>
          </RouterLink>
        </div>
        <div class="py-8 w-full">
          <div class="">
            <h3 class="settings">SETTINGS</h3>
            <RouterLink v-for="item in secondaryNavigation" :key="item.name" :to="item.href" class="navigation-link" :class="{ active: isActive(item.href) }">
              <div class="navigation-link-content">
                <i aria-hidden="true" class="navigation-icon">
                  <component :is="item.icon" :color="isActive(item.href)? '#7330DF': undefined" /></i>
                <span class="navigation-caption">{{ item.name }}</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
    <div class="navigation-link-content">
    <Menu as="div" class="relative">
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute -top-full bg-white left-16 z-10 mt-2 w-40 origin-top-left ring-black ring-opacity-5 focus:outline-none">
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{ name: 'AccountSettingProfile' }" :class="[active ? 'bg-gray-100' : '', 'block p-3']">Settings</RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="#" @click="logout" :class="[active ? 'bg-gray-100' : '', 'block p-3']">Logout</a>
          </MenuItem>
        </MenuItems>
      </transition>
      <MenuButton class="flex p-0 items-center rounded-full  text-sm focus:outline-none" id="profile" v-if="user">
        <div class="avatar">
          <img v-if="user.profile_picture" :src="user.profile_picture">
          <div v-else>
            <span class="rounded-full h-10 w-10 bg-mute text-color-text flex items-center justify-center font-bold">{{me?.first_name && me?.first_name[0]}}</span>
          </div>
        </div>
        <div>
          <div class="name">{{user.first_name}}</div>
          <div class="email">{{user.email}}</div>
        </div>
        <span class="ml-3 hidden text-sm font-medium text-color-text lg:block">
          <span class="sr-only">Open user menu for {{user.first_name}}</span>
        </span>
        <ChevronDownIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
      </MenuButton>
    </Menu>
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
import IconXMark from '@/components/icons/IconXMark.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useAuthStore } from '../stores/auth'

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

defineProps({
  user: { type: Object, default: { email: '', name: '', profile_picture: '' } },
  sidebarOpen: Boolean,
})

const { logout } = useAuthStore()
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
  { name: 'Settings', href: '/settings', icon: IconSetings },
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
  background-color: #E8E8E8;
  height: 100%;
  box-shadow: 1px 0px 0px #D3D6DB;
  background-image: url('@/assets/images/sidebar-bg.svg') bottom left;
}

.navigation-icon {
  width: 24px;
  height: 24px;
}

.navigation-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: relative;
  gap: 12px;
}

.navigation-link-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 16px;
  width: 100%;
  height: 48px;
  margin: 0 16px;
}

.active .navigation-link-content {
  background-color: #F1EAFC;
}

.navigation-link.active:before {
  content: '';
  border-left: 4px solid var(--qrh-primary);
  position: absolute;
  left: 0;
  top: 8px;
  height: 32px;
  z-index: 1;
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

#profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 32px 0;
  gap: 16px;
}

#profile .avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
}

#profile .name {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 160%;
  /* identical to box height, or 29px */

  display: flex;
  align-items: center;

  /* Neutrals/100 */

  color: #171717;
}

#profile .email {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  display: flex;
  align-items: center;

  /* Neutrals/80 */

  color: #454545;

  opacity: 0.5;
}

#mobilePostJob .btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 10px;
  height: 50px;
  background: #7330DF;
  border-radius: 8px;
}

#mobilePostJob .btn span {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #FFFFFF;
  white-space: nowrap;
}
</style>
