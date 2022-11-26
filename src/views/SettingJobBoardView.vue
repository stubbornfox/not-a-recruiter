<template>
  <div class="flex flex-grow h-full">
    <SettingsJobboardSidebar class="lg:w-1/4 md:w-1/3" />
    <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
      <div class="h-full flex flex-col flex-grow mt-4" v-if="job_board">
        <RouterView class="w-full" @save-setting="saveSetting" :job_board="job_board"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import SettingsJobboardSidebar from "../components/SettingsJobboardSidebar.vue";
import { RouterView } from "vue-router";
import { useJobBoardStore } from '@/stores/job_board';
import { storeToRefs } from 'pinia';
const { saveJobBoard, fetchJobBoards } = useJobBoardStore()
const { job_board } = storeToRefs(useJobBoardStore());

fetchJobBoards()

async function saveSetting(job_board_params) {
  await saveJobBoard(job_board_params)
}
</script>
