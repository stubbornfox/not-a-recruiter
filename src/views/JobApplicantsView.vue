<template>
  <div class="w-full p-2" v-if="job">
    <Applicants :applicants="applicants" class="w-full"/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Applicants from "@/components/Applicants.vue";
import { storeToRefs } from 'pinia'
import { useJobStore } from '@/stores/job'

const jobStore = useJobStore()
const { applicants } = storeToRefs(jobStore)
const { fetchApplicants } = jobStore

const props = defineProps({
  job: Object,
})

fetchApplicants(props.job.id)
</script>
