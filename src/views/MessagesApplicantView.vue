<template>
  <div class="border-r border-soft max-w-xs w-full p-2">
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
</script>
