<template>
  <FormKit type="form" id="loginForm" @submit="authStore.login" form-class="flex-grow-1 space-y-8 w-96" :actions=false :incomplete-message=false novalidate>
    <div class="space-y-8">
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
        <FormKitSchema :schema="schema" />
      </div>
    </div>
    <div class="flex justify-end">
      <RouterLink :to="{ name: 'Register'}">Sign up</RouterLink>
    </div>
    <div class="">
      <div class="flex justify-center">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('loginForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const schema = [{
    $formkit: 'email',
    name: 'email',
    label: 'Email',
    validation: 'required|email',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required',
  },
]
</script>
