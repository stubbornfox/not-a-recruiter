<template>
  <JobSetup class="max-w-sidebar w-full" />
  <div class="w-full h-full">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import JobSetup from "../components/JobSetup.vue";
</script>
