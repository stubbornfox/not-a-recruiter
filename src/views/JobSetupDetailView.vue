<template>
  <div class="w-full h-full p-4">
    <JobForm :job="job" @save-job="saveJob" v-if="job" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from "../services/api"
import { useRoute } from "vue-router";
import JobForm from "../components/JobForm.vue";
import { useJobStore } from "../stores/job";
import { storeToRefs } from 'pinia'

const slug = useRoute().params.slug
const jobStore = useJobStore()
const { job, error, loading } = storeToRefs(jobStore)
const { fetchJob, updateJob } = jobStore
fetchJob(slug)

async function saveJob(modifiedJob) {
  updateJob(slug, { job: modifiedJob })
}
</script>
