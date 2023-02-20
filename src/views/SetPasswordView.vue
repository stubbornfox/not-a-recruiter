<template>
  <div class="form-wrapper lg:w-full px-4">
    <FormKit type="form" id="loginForm" @submit="handleSubmit" form-class="flex-grow-1 py-14 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-heading mb-6  text-center">Choose a Password
        </h3>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
      <div class="mt-6">
        <button type="submit" class="btn qrh-btn w-full qrh-btn--primary">Save and Login</button>
      </div>
    </FormKit>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const authStore = useAuthStore();
const { setPassword } = authStore
const { token } = route.params

const schema = [{
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required|length:6',
    innerClass: 'mt-2'
  },
  {
    $formkit: 'password',
    name: 'password_confirmation',
    label: 'Confirm Password',
    validation: 'required|confirm:password',
    innerClass: 'mt-2',
    'validation-label': "Password confirmation"
  },
]

const handleSubmit = async (data, node) => {
  data.reset_password_token = token
  await setPassword(data, node)
}
</script>
