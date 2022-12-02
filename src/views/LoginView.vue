<template>
  <div>
    <FormKit type="form" id="loginForm" @submit="authStore.login" form-class="flex-grow-1 space-y-8 w-96 bg-soft p-6 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-lg font-medium leading-6 text-heading text-heading">Login
        </h3>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
      <div class="">
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
      </div>
    </FormKit>
    <div class="flex text-xs text-color-text">
      <RouterLink :to="{ name: 'Register'}" class="py-4 px-2 hover:underline">Don't have an account?</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
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
