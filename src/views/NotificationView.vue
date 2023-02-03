<template>
  <div class="w-full h-full flex flex-col flex-grow">
    <div class="h-full flex flex-col flex-grow">
      <div class="flex flex-col flex-grow h-full">
        <div class="mt-6 max-w-lg w-full mx-auto border border-tertiary rounded overflow-hidden">
          <div v-for="item in notices" :key="item.id" @click="notificationClickHandler(item)" class="notification group flex items-center p-4 py-6 text-md font-medium text-color-text justify-between" :class="[item.read ? 'bg-white hover:bg-mute' : 'bg-tertiary hover:bg-secondary']">
            <div v-if="!item.read" class="bg-primary rounded w-2 h-2 absolute">

            </div>
            <span class="flex-1 ml-4">{{item.message}}</span>
            <span class="text-heading text-xs">{{ item.time_ago }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification'
import { storeToRefs } from 'pinia'
import router from "../router";

const notificationStore = useNotificationStore()
const { notices, error, loading } = storeToRefs(notificationStore)

const { fetchNotifications, markAsRead } = notificationStore

fetchNotifications()

function notificationClickHandler(item) {
  if (!item.read) {
    markAsRead(item.id)
  }
  if (item.candidate_id && item.job_id) {
     router.push({name: "Applicant", params: {slug: item.job_id, stage: 'inbox', candidate_id: item.candidate_id}})
  }
  if (item.message_id) {
     router.push({name: "Messages", params: {message_id: item.message_id} })
  }
}
</script>

