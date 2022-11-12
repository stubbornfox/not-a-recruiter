<template>
  <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
    <div class="h-full flex flex-col flex-grow">
      <JobBoard :job="job"/>
    </div>
  </div>
</template>

<script setup>
  import JobBoard from "../components/JobBoard.vue";
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import { useRoute}  from "vue-router"

  const job = ref({})
  let error = ref([])

  onMounted(() => {
    const slug = useRoute().params.slug
    axios.get(`/jobs/${slug}`)
    .then((response) => {
      job.value = response.data;
    })
   .catch((e) => {
      error.value.push(e);
    })
  })
</script>
