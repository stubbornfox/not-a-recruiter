<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'

  const candidates = ref([])
  let error = ref([])

  onMounted(() => {
    axios.get('/candidates')
    .then((response) => {
      candidates.value = response.data;
    })
   .catch((e) => {
      error.value.push(e);
    })
  })
</script>


<template>
 <div id="candidates">
  <div v-for="(candidate, index) in candidates" :key="candidate.id">

   <p><fa icon="fa-regular fa-user"></fa><span class="ml-2">{{candidate.first_name}} {{candidate.last_name}}</span></p>
  </div>
 </div>
</template>

