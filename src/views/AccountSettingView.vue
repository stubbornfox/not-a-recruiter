<template>
  <div class="flex flex-grow border-t border-color">
    <div class="lg:w-1/4 md:w-1/3">
      <AccountSettingSidebar />
    </div>
  <div class="w-full">
    <RouterView />
  </div>
</div>
</template>
<script setup>
import { useRouter, useRoute, RouterView } from 'vue-router'
import AccountSettingSidebar from '../components/AccountSettingSidebar.vue'
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
</script>
