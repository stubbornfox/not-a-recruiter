<template>
  <div class="h-full text-mute">
    <Sidebar />
    <div class="flex flex-1 flex-col lg:pl-64 lg:min-h-screen h-full">
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
            <RouterLink :to="{name: 'Notification'}" type="button" class="relative rounded-full" :class="{ unread: hasUnread }">
              <span class="sr-only">View notifications</span>
              <i aria-hidden="true"><img :src="NotificationIcon" /></i>
            </RouterLink>
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full  text-sm focus:outline-none lg:rounded-md lg:p-2 lg:hover:bg-soft">
                  <div v-if="me?.profile_picture">
                    <img class="h-10 w-10 rounded-full" :src="me.profile_picture" alt="" />
                  </div>
                  <div v-else>
                    <span class="rounded-full h-10 w-10 bg-mute text-color-text flex items-center justify-center font-bold">{{me?.first_name && me?.first_name[0]}}</span>
                  </div>
                  <span class="ml-3 hidden text-sm font-medium lg:block text-heading"><span class="sr-only">Open user menu for </span>{{me?.first_name}}</span>
                  <ChevronDownIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-mute text-heading">
                  <MenuItem v-slot="{ active }" class="hover:bg-soft">
                  <RouterLink :to="{name: 'AccountSettingProfile'}" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']"> Account Settings</RouterLink>
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
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
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
} from '@heroicons/vue/24/outline'

import NotificationIcon from '@/assets/images/notification.svg';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { createConsumer } from '@rails/actioncable';
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const authStore = useAuthStore();
const userStore = useUserStore();
const { me, organization } = storeToRefs(userStore);
userStore.getMe()
const WS_URL = import.meta.env.VITE_WS_URL
let consumer = createConsumer(getWebSocketURL());

function getWebSocketURL() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user)
    return `${WS_URL}?token=${user['token']}`
  else
    return WS_URL
}

const sidebarOpen = ref(false)
const hasUnread = ref(false)

onMounted(() => {
  consumer.subscriptions.create({
    channel: 'Noticed::NotificationChannel',
  }, {
    connected: () => console.log('connected'),
    disconnected() {
      console.log('disconnected')
    },
    rejected() {
    },
    received: data => {
      hasUnread.value = true
    }
  })

})
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
