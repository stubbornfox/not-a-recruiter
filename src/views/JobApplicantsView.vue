<template>
  <div class="w-full p-2" v-if="job">
    <div class="flex justify-between items-center">
      <h5 class="font-semibold pl-3 text-lg text-heading capitalize">{{stage}}</h5>
    </div>
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
