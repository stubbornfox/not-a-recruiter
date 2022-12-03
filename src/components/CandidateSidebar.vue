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

  defineProps({
    jobStage: {
      type: String,
      default: 'Inbox'
    },
  })
</script>


<template>
 <div id="candidates" class="px-3 lg:w-64">
  <div class="flex justify-between items-center">
    <h5 class="font-semibold">{{jobStage}}</h5>
    <fa :icon="['fas', 'fa-ellipsis-vertical']"></fa>
  </div>
  <div v-for="(candidate, index) in candidates" :key="candidate.id">
    <a>
      <fa icon="fa-regular fa-user"></fa>
      <span class="ml-2">
        {{candidate.first_name}} {{candidate.last_name}}
      </span>
    </a>
  </div>
 </div>
</template>

<style scoped>
  #candidates {
    color: rgb(82, 82, 82);
    border-right: 1px solid rgb(229, 229, 229);
    overflow-y: auto;
  }

  #candidates a {
    height: 32px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    padding-left: 0.625rem;
    padding-right: 10px;
    margin-bottom: 2px;
    flex-shrink: 0;
    cursor: pointer;
  }
  #jobsidebar a span {
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
</style>

