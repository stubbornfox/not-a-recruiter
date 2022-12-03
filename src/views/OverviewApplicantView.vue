<template>
  <div class="border-r border-soft max-w-xs w-full p-2">
    <div class="flex justify-between items-center">
      <h5 class="font-semibold pl-3 text-lg text-heading capitalize">{{stage}}</h5>
    </div>
    <CandidateList :candidates="candidates" class="max-w-xs w-full" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CandidateList from "../components/CandidateList.vue";
import { useRoute, RouterView } from "vue-router";
import api from "../services/api"

const route = useRoute()
const { slug, stage } = route.params
const candidates = ref([])
const job = ref({})
let error = ref([])

onMounted(() => {
  api.get(`/jobs/${slug}/candidates?stage=${stage}`)
    .then((response) => {
      candidates.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})
</script>
