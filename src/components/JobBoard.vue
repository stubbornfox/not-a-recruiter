<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import JobSidebar from "./JobSidebar.vue";
</script>


<template>
  <div id="jobboard">
    <JobSidebar class="mr-2"/>
  </div>
</template>

<style scoped>
  #jobboard{
    flex: 1 1 0%;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    position: relative;
  }
</style>
