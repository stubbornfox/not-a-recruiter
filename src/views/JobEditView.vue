<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8 h-full overflow-y-auto">
    <JobForm :job="job" @submit="saveJob" v-if="job" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from "../services/api"
import { useRoute, useRouter } from "vue-router";
import JobForm from "../components/JobForm.vue";
import { useJobStore } from "../stores/job";
import { storeToRefs } from 'pinia'
const router = useRouter()
const slug = useRoute().params.slug
const jobStore = useJobStore()
const { job, error, loading } = storeToRefs(jobStore)
const { fetchJob, updateJob } = jobStore
fetchJob(slug)

async function saveJob(modifiedJob) {
  updateJob(slug, { job: modifiedJob }).then(()=>{
     router.push({ name: 'Jobs' })
  })
}
</script>
