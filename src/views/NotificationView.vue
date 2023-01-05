<template>
  <div class="w-full h-full flex flex-col flex-grow">
    <div class="h-full flex flex-col flex-grow">
      <div class="flex flex-col flex-grow h-full">
        <RouterLink v-for="item in notices" :key="item.id" :to="{name: 'Home'}" :class="[$route.name==item.id ? 'bg-soft' : ' hover:bg-mute', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
          <span class="flex-1 text-heading">{{ item.time_ago }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useNotificationStore } from '@/stores/notification'
  import { storeToRefs } from 'pinia'

  const notificationStore = useNotificationStore()
  const { notices, error, loading } = storeToRefs(notificationStore)

  const  { fetchNotifications } = notificationStore
  fetchNotifications()
</script>

<style scoped>
</style>
