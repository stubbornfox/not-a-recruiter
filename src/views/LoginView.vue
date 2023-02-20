<template>
  <div class="form-wrapper lg:w-full px-4">
    <FormKit type="form" id="loginForm" @submit="login" form-class="flex-grow-1 py-14 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-heading mb-6  text-center">Welcome Back, Dude
        </h3>
        <a :href="getGoogleUrl('/')" class="btn qrh-btn w-full qrh-btn--secondary">
          <i><img :src="GoogleLogo" alt="Google Logo" /></i>
          <span>Login with Google</span>
        </a>
        <div class="mt-6 body-normal text-color-text text-horizontal-line">
          Or login with email
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit type="email" name="email" label="Email Address" validation="required|email" />
          <FormKit type="password" name="password" label="Password" validation="required">
            <template #label="context">
              <div class="flex items-center justify-between">
                <label :class="context.classes.label">Password</label>
                <RouterLink :to="{ name: 'ForgetPassword'}" class="text-primary text-sm hover:underline">Forget Password?</RouterLink>
              </div>
            </template>
          </FormKit>
          <FormKit type="checkbox" name="remember_me" label="Remember me" />
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
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { getGoogleUrl } from "@/services/google-auth"
import GoogleLogo from '@/assets/images/google.svg';
const { login } = useAuthStore();
</script>
