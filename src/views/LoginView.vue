<template>
  <div>
    <FormKit type="form" id="loginForm" @submit="authStore.login" form-class="flex-grow-1  py-14 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-heading mb-6  text-center">Welcome Back, Dude
        </h3>
        <button class="btn qrh-btn w-full qrh-btn--secondary ">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6706 8.36788H17.9993V8.33329H10.4993V11.6666H15.2089C14.5219 13.607 12.6756 15 10.4993 15C7.7381 15 5.49935 12.7612 5.49935 9.99996C5.49935 7.23871 7.7381 4.99996 10.4993 4.99996C11.7739 4.99996 12.9335 5.48079 13.8164 6.26621L16.1735 3.90913C14.6852 2.52204 12.6943 1.66663 10.4993 1.66663C5.89727 1.66663 2.16602 5.39788 2.16602 9.99996C2.16602 14.602 5.89727 18.3333 10.4993 18.3333C15.1014 18.3333 18.8327 14.602 18.8327 9.99996C18.8327 9.44121 18.7752 8.89579 18.6706 8.36788Z" fill="#FFC107" />
            <path d="M3.12695 6.12121L5.86487 8.12913C6.6057 6.29496 8.39987 4.99996 10.4995 4.99996C11.774 4.99996 12.9336 5.48079 13.8165 6.26621L16.1736 3.90913C14.6853 2.52204 12.6945 1.66663 10.4995 1.66663C7.29862 1.66663 4.52279 3.47371 3.12695 6.12121Z" fill="#FF3D00" />
            <path d="M10.5008 18.3333C12.6533 18.3333 14.6091 17.5095 16.0879 16.1699L13.5087 13.9874C12.6439 14.6451 11.5872 15.0008 10.5008 14.9999C8.33328 14.9999 6.49286 13.6178 5.79953 11.6891L3.08203 13.7828C4.4612 16.4816 7.26203 18.3333 10.5008 18.3333Z" fill="#4CAF50" />
            <path d="M18.6713 8.36796H18V8.33337H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.988L13.5079 13.9871L16.0871 16.1696C15.9046 16.3355 18.8333 14.1667 18.8333 10C18.8333 9.44129 18.7758 8.89587 18.6713 8.36796Z" fill="#1976D2" />
          </svg>
          <span>Login with Google</span>
        </button>
        <div class="mt-6 body-normal text-color-text text-horizontal-line">
          Or login with email
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
      <div class="mt-6">
        <button type="submit" class="btn qrh-btn w-full qrh-btn--primary">Login</button>
      </div>
      <div class="mt-6 flex text-base text-color-text">
        <span>Don't have an account?</span>
        <RouterLink :to="{ name: 'Register'}" class="pl-1 text-primary hover:underline font-semibold">Sign up</RouterLink>
      </div>
    </FormKit>
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
    label: 'Email Address',
    validation: 'required|email',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required',
  },
  {
    $formkit: 'checkbox',
    name: 'remember_me',
    label: 'Remember me',
  },
]
</script>
