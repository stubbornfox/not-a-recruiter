<template>
  <div class="h-full">
    <Sidebar :user="me" :sidebarOpen="sidebarOpen" @closeSidebar="sidebarOpen = false"/>
    <div class="main-content flex flex-1 flex-col lg:min-h-screen h-full w-full lg:pl-sidebar">
      <div class="flex">
        <TopbarCompany :user="me" :company="organization" :has-unread="hasUnread" @openSideBar="sidebarOpen = true"/>
      </div>
      <main class="flex-1 h-full flex flex-col">
        <router-view :me="me" v-if="me"></router-view>
      </main>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
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
const hasUnread = ref(false)
const sidebarOpen = ref(false)
userStore.getMe().then(() => { hasUnread.value = me.value.has_unread })
const WS_URL =
  import.meta.env.VITE_WS_URL
let consumer = createConsumer(getWebSocketURL())

function getWebSocketURL() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user)
    return `${WS_URL}?token=${user['token']}`
  else
    return WS_URL
}

onMounted(() => {
  consumer.subscriptions.create({
    channel: 'Noticed::NotificationChannel',
  }, {
    connected: () => console.log('connected'),
    disconnected() {
      console.log('disconnected')
    },
    rejected() {},
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
