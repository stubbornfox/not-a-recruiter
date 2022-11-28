<template>
  <div class="h-full text-mute">
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
                  <span class="text-heading text-lg font-semibold">{{organization?.name[0]}}</span>
                </RouterLink>
                <h5 class="text-heading text-md font-semibold ml-4">{{organization?.name}}</h5>
              </div>
              <nav class="mt-5 h-full flex-shrink-0 divide-y divide-border-color overflow-y-auto" aria-label="Sidebar">
                <div class="space-y-1 px-2">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-pink-700 text-white' : 'text-blue-100 hover:text-white hover:bg-soft', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                    <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-blue-200" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </div>
                <div class="mt-6 pt-6">
                  <div class="space-y-1 px-2">
                    <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-blue-100 hover:bg-soft hover:text-white">
                      <component :is="item.icon" class="mr-4 h-6 w-6 text-blue-200" aria-hidden="true" />
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
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-40">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-grow flex-col overflow-y-auto border-r border-color pt-5 pb-4">
        <div class="flex flex-shrink-0 items-center px-4">
          <RouterLink :to="{name: 'Organizations'}" class="text-heading inline-block h-10 w-10 rounded-md bg-mute flex items-center justify-center change-current-organization" title="Change current organization" rel="acb">
            <span class="text-heading text-lg font-semibold organization-initial">{{organization?.name[0]}}</span>
            <i class="text-heading h-5 w-5">
              <ArrowPathRoundedSquareIcon />
            </i>
          </RouterLink>
          <h5 class="text-heading text-md font-semibold ml-4">{{organization?.name}}</h5>
        </div>
        <nav class="mt-5 flex flex-1 flex-col divide-y divide-border-color overflow-y-auto" aria-label="Sidebar">
          <div class="space-y-1 px-2">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-pink-700 text-white' : 'text-blue-100 hover:text-white hover:bg-soft', 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
              <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-blue-200" aria-hidden="true" />
              {{ item.name }}
            </a>
          </div>
          <div class="mt-6 pt-6">
            <div class="space-y-1 px-2">
              <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-blue-100 hover:bg-soft hover:text-white">
                <component :is="item.icon" class="mr-4 h-6 w-6 text-blue-200" aria-hidden="true" />
                {{ item.name }}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="flex flex-1 flex-col lg:pl-64 lg:min-h-screen">
      <div class="flex h-16 flex-shrink-0 border-b border-gray-200  lg:border-none">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <!-- Search bar -->
        <div class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div class="flex flex-1">
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button type="button" class="rounded-full  p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full  text-sm focus:outline-none lg:rounded-md lg:p-2 lg:hover:bg-soft">
                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <span class="ml-3 hidden text-sm font-medium lg:block text-heading"><span class="sr-only">Open user menu for </span>{{me?.name}}</span>
                  <ChevronDownIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-mute text-heading">
                  <MenuItem v-slot="{ active }" class="hover:bg-soft">
                  <RouterLink :to="{name: 'AccountProfile'}" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']"> Account Settings</RouterLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }" class="hover:bg-soft">
                  <button @click="authStore.logout()" class="block text-left px-4 py-2 text-sm w-full">Logout</button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1 h-full flex flex-col">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref } from 'vue'
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

import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/vue/24/outline'
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore()
const { me, organization } = storeToRefs(userStore);
userStore.getMe()

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
]
const secondaryNavigation = [
  { name: 'App Settings', href: '/settings/organization', icon: CogIcon },
]
const sidebarOpen = ref(false)
</script>
<style scoped>
.change-current-organization i {
  display: none;
}

.change-current-organization:hover i {
  display: flex;
}

.change-current-organization:hover span.organization-initial {
  display: none;
}
</style>
