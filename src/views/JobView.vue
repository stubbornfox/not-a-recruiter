<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col flex-grow h-full">
    <div class="h-full flex flex-col flex-grow">
      <div class="flex flex-col flex-grow h-full">
        <div :key="job.id" class='job-header'>
          <div class="flex items-center ">
            <RouterLink :to="{name: 'Home'}" class="text-heading hover:bg-soft rounded w-8 h-8 mr-2" title="Back">
              <i>
                <ArrowLeftIcon class="h-4 w-4"/>
              </i>
            </RouterLink>
            <h2 class="font-medium text-lg text-heading">{{job.title}}</h2>
          </div>
        </div>
        <div id="jobboard" class="h-full">
          <JobStageSidebar :job="job" class="max-w-sidebar w-full pt-4"/>
          <RouterView :key="$route.params.stage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import JobStageSidebar from "../components/JobStageSidebar.vue";
  import { RouterLink, RouterView } from "vue-router";
  import {ref, onMounted} from 'vue'
  import { useRoute}  from "vue-router"
  import api from "../services/api"
  import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
  const job = ref({})
  let error = ref([])

  onMounted(() => {
    const slug = useRoute().params.slug
    api.get(`/jobs/${slug}`)
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
