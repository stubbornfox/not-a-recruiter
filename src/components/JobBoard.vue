<template>
  <div class="flex flex-col flex-grow">
    <div :key="job.id" class='job-header'>
      <div class="flex items-center ">
        <a @click="$router.back()">
          <fa :icon="['fas', 'fa-arrow-left']"></fa>
        </a>
        <h2 class="font-semibold text-xl pl-2 ">{{job.title}}</h2>
      </div>
      <a>
        <fa :icon="['fas', 'fa-ellipsis-vertical']"></fa>
      </a>
    </div>
    <div id="jobboard">
      <JobStageSidebar class="lg:w-1/5 md:w-1/3" />
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import JobStageSidebar from "./JobStageSidebar.vue";
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router"

let currentStage = ref('Inbox');
let error = ref([])

function changeStage(code, text) {
  currentStage.value = text
}

defineProps({
  job: Object,
})
</script>
<style scoped>
.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid;
}

.job-header a {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease 0s;
}

#jobboard {
  display: flex;
  flex: 1 1 0%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  overflow-y: hidden;
  position: relative;
  width: 100%;
}
</style>
