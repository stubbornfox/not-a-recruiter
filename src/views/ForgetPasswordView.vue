<template>
  <div class="form-wrapper lg:w-full px-4">
    <FormKit type="form" @submit="forgetPassword" form-class="flex-grow-1 py-14 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-heading mb-6  text-center">You did it again, Dude
        </h3>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit type="email" name="email" label="Email Address" validation="required|email" />
        </div>
      </div>
      <div class="mt-6 mb-2">
        <button type="submit" class="btn qrh-btn w-full qrh-btn--primary">Reset Password</button>
      </div>
    </FormKit>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
const { forgetPassword } = useAuthStore();
</script>
