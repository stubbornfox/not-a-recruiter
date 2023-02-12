<template>
  <div class="border-r border-soft max-w-sidebar w-full p-2">
    <div class="flex justify-between items-center">
      <h5 class="font-semibold pl-3 text-lg text-heading capitalize">{{stage}}</h5>
    </div>
    <CandidateList :candidates="candidates" class="max-w-sidebar w-full" v-if="!loading" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CandidateList from "@/components/CandidateList.vue";
import { storeToRefs } from 'pinia'
import { useJobStore } from '@/stores/job'
const route = useRoute()
const jobStore = useJobStore()
const { candidates } = storeToRefs(jobStore)
const { fetchApplicants } = jobStore
</script>
