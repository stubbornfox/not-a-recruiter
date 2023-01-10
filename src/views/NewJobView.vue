<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full overflow-y-auto">
    <div class="w-full py-6">
      <JobForm @save-job="addJob" />
    </div>
  </div>
</template>
<script setup>
import JobForm from "../components/JobForm.vue";
import api from '../services/api';
import router from "../router";

async function addJob(job) {
  const res = await api.post('/jobs', job)
    .then((response) => {
      router.push({name: 'Home'})
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
