<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'

  const candidates = ref([])
  let error = ref([])

  onMounted(() => {
    axios.get('http://localhost:3000/candidates')
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
   <p>{{candidate.first_name}}</p>
  </div>
 </div>
</template>

