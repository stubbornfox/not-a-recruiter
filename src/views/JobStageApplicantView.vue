<template>
  <div class="border-r border-soft max-w-xs w-full p-2">
    <div class="flex justify-between items-center">
      <h5 class="font-semibold pl-3 text-lg text-heading capitalize">{{stage}}</h5>
    </div>
    <CandidateList :candidates="candidates" class="max-w-xs w-full" v-if="!loading" />
  </div>
  <div class="w-full h-full">
    <div class="h-full flex flex-col flex-grow h-full">
      <RouterView :key="$route.params.candidate_id"/>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CandidateList from "../components/CandidateList.vue";
import { useRoute, RouterView } from "vue-router";
import {storeToRefs} from 'pinia'
import {useCandidateStore} from '../stores/candidate'
const route = useRoute()
const candidateStore = useCandidateStore()
const { slug, stage } = route.params
const { candidates , error, loading } = storeToRefs(candidateStore)
const {getCandidates, getCandidate, moveCandidate} = candidateStore
getCandidates(slug, stage)
</script>
