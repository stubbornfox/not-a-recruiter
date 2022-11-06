<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import JobSidebar from "./JobSidebar.vue";
  import CandidateList from "./CandidateList.vue";

  let jobStage = ref('Inbox');

  function changeStage(code, text) {
    jobStage.value = text
  }

  const job = ref([])
  let error = ref([])

  onMounted(() => {
    axios.get('/job_boards/1')
    .then((response) => {
      job.value = response.data;
    })
   .catch((e) => {
      error.value.push(e);
    })
  })
</script>


<template>
  <div>
    <div :key="job.id" class='job-header'>
      <div class="flex items-center">
        <a>
          <fa :icon="['fas', 'fa-arrow-left']"></fa>
        </a>
        <h2 class="font-semibold text-xl pl-2">{{job.title}}</h2>
      </div>
      <a>
        <fa :icon="['fas', 'fa-ellipsis-vertical']"></fa>
      </a>
    </div>
    <div id="jobboard">
      <JobSidebar class="mr-2" @change-stage="changeStage"/>
      <CandidateList :job-stage="jobStage" />
    </div>
    <router-link to="/about">About</router-link>
  </div>
</template>

<style scoped>
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
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

  #jobboard{
    display: flex;
    flex: 1 1 0%;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    display: flex;
    overflow-y: hidden;
    position: relative;
  }
</style>
