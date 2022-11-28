<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full">
    <div class="w-full py-6 lg:border-t border-color">
      <JobForm @save-job="addJob" />
    </div>
</div>
</template>

<script setup>
  import JobForm from "../components/JobForm.vue";
  import api from '../services/api';

  async function addJob (job) {
    const res = await api.post('/jobs', job)
    .then((response) => {
      alert('Created!')
    })
    .catch((e) => {
      console.log(e)
    })
  }
</script>
