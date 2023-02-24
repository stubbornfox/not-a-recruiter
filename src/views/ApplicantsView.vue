<template>
  <div class="lg:mx-auto lg:max-w-7xl lg:px-8 w-full">
    <Applicants :applicants="applicants" @search="searchApplicant"/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Applicants from "@/components/Applicants.vue";
import { storeToRefs } from 'pinia'
import { useApplicantStore } from '@/stores/applicant'

const applicantStore = useApplicantStore()
const { applicants } = storeToRefs(applicantStore)
const { fetchApplicants } = applicantStore

fetchApplicants()

async function searchApplicant(searchQuery) {
  fetchApplicants(searchQuery)
}
</script>
