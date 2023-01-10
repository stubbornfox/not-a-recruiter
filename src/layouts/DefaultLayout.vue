<template>
  <div class="h-full text-mute">
    <Sidebar :user="me" />
    <div class="main-content flex flex-1 flex-col lg:min-h-screen h-full w-full">
      <div class="flex">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <TopbarCompany :user="me" :company="organization" :has-unread="hasUnread"/>
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
import TopbarCompany from '../components/TopbarCompany.vue'

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
.main-content {
  padding-left: 272px;
}
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
