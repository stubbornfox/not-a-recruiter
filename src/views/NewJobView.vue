<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full overflow-y-auto">
    <div class="w-full py-6">
      <JobForm @submit="createJob" />
    </div>
  </div>
</template>
<script setup>
import JobForm from "../components/JobForm.vue";
import api from '../services/api';
import router from "../router";
import { useJobStore } from "../stores/job";
const jobStore = useJobStore()
const { createJob } = jobStore
</script>
