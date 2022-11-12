<script setup>
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
} from '@heroicons/vue/24/outline'
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'History', href: '#', icon: ClockIcon, current: false },
  { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
  { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '#', icon: DocumentChartBarIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const sidebarOpen = ref(false)
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 pt-5 pb-4">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300" alt="Easywire logo" />
            </div>
            <nav class="mt-5 h-full flex-shrink-0 divide-y divide-blue-800 overflow-y-auto" aria-label="Sidebar">
              <div class="space-y-1 px-2">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-blue-800 text-white' : 'text-blue-100 hover:text-white hover:bg-blue-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                  <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-blue-200" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
              <div class="mt-6 pt-6">
                <div class="space-y-1 px-2">
                  <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-blue-100 hover:bg-blue-600 hover:text-white">
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
  <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-grow flex-col overflow-y-auto bg-blue-700 pt-5 pb-4">
      <div class="flex flex-shrink-0 items-center px-4">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300" alt="Easywire logo" />
      </div>
      <nav class="mt-5 flex flex-1 flex-col divide-y divide-blue-800 overflow-y-auto" aria-label="Sidebar">
        <div class="space-y-1 px-2">
          <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-blue-800 text-white' : 'text-blue-100 hover:text-white hover:bg-blue-600', 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
            <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-blue-200" aria-hidden="true" />
            {{ item.name }}
          </a>
        </div>
        <div class="mt-6 pt-6">
          <div class="space-y-1 px-2">
            <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-blue-100 hover:bg-blue-600 hover:text-white">
              <component :is="item.icon" class="mr-4 h-6 w-6 text-blue-200" aria-hidden="true" />
              {{ item.name }}
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
