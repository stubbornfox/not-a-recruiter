<template>
  <div class="flex items-center h-full">
    <div class="bg-neutrals bg-side hidden lg:flex">
    </div>
    <div class="authentication-side flex items-center flex-col">
      <div class="flex-1"></div>
      <router-view></router-view>
      <div class="flex-1"></div>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
</script>
