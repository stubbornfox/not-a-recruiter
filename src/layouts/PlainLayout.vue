<template>
  <div class="flex items-center h-full">
    <div class="bg-neutrals bg-side">
    </div>
    <div class="authentication-side flex items-center justify-center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
</script>
