<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
    <div class="h-full flex flex-col flex-grow">
      <div class="flex flex-col flex-grow">
        <div :key="job.id" class='job-header'>
          <div class="flex items-center ">
            <RouterLink :to="{name: 'Home'}">
              <fa :icon="['fas', 'fa-arrow-left']"></fa>
            </RouterLink>
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
    </div>
  </div>
</template>

<script setup>
  import JobStageSidebar from "../components/JobStageSidebar.vue";
  import { RouterLink, RouterView } from "vue-router";
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import { useRoute}  from "vue-router"

  const job = ref({})
  let error = ref([])

  onMounted(() => {
    const slug = useRoute().params.slug
    axios.get(`/jobs/${slug}`)
    .then((response) => {
      job.value = response.data;
    })
   .catch((e) => {
      error.value.push(e);
    })
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
