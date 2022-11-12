<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import {
    UserIcon,
  } from '@heroicons/vue/24/outline'

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
 <div id="candidates" class="pt-4">
  <div class="flex justify-between items-center">
    <h5 class="font-semibold text-gray-900 pl-3">{{jobStage}}</h5>
  </div>
  <div v-for="(candidate, index) in candidates" :key="candidate.id">
    <a class="flex">
      <UserIcon class="flex-shrink h-5 w-5" aria-hidden="true"></UserIcon>
      <span class="ml-2 text-md">
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
    margin-left: 0.125rem;
    margin-right: 0.125rem;
    padding-left: 0.375rem;
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

