<template>
  <div class="flex flex-grow h-full">
    <SettingsJobboardSidebar class="lg:w-1/4 md:w-1/3" :slug="job_board?.slug"/>
    <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
      <div class="h-full flex flex-col flex-grow mt-4" v-if="job_board">
        <RouterView class="w-full" @save-setting="saveSetting" :job_board="job_board" />
      </div>
    </div>
  </div>
</template>
<script setup>
import SettingsJobboardSidebar from "../components/SettingsJobboardSidebar.vue";
import { RouterView } from "vue-router";
import { useJobBoardStore } from '@/stores/job_board';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const userStore = useUserStore()
const { me } = storeToRefs(userStore);
userStore.getMe()

const { updateJobBoard, fetchJobBoards } = useJobBoardStore()
const { job_board } = storeToRefs(useJobBoardStore());
const slug = job_board.slug

fetchJobBoards()

async function saveSetting(id, job_board_params) {
  await updateJobBoard(id, job_board_params)
}
</script>
