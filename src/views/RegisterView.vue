<template>
  <div class="form-wrapper lg:w-full px-4">
    <FormKit type="form" id="registerForm" @submit="register" form-class="flex-grow-1 py-14 rounded-md" :actions=false :incomplete-message=false novalidate>
      <div class="space-y-8">
        <h3 class="text-heading mb-6 text-center">Get more opportunities
        </h3>
        <a :href="getGoogleUrl('/')" class="btn qrh-btn w-full qrh-btn--secondary">
          <i><img :src="GoogleLogo" alt="Google Logo" /></i>
          <span>Sign Up with Google</span>
        </a>
        <div class="mt-6 body-normal text-color-text text-horizontal-line">
          Or sign up with email
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKitSchema :schema="schema" />
        </div>
      </div>
      <div class="mt-6">
        <button type="submit" class="btn qrh-btn w-full qrh-btn--primary">Continue</button>
      </div>
      <div class="mt-6 flex text-base text-color-text">
        <span>Already have an account?</span>
        <RouterLink :to="{ name: 'Login'}" class="pl-1 text-primary hover:underline font-semibold">Login</RouterLink>
      </div>
      <p class="font-medium text-sm mt-6">
        By clicking 'Continue', you acknowledge that you have read and accept the
        <a class="text-primary" href="#todo:terms">Terms of Service</a> and
        <a class="text-primary" href="#todo:privacy">Privacy Policy</a>.
      </p>
    </FormKit>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getGoogleUrl } from "@/services/google-auth"
import GoogleLogo from '@/assets/images/google.svg';

const router = useRouter()
const route = useRoute()

const schema = [{
    $formkit: 'email',
    name: 'email',
    label: 'Email Address',
    validation: 'required|email',
  },
  {
    $formkit: 'text',
    name: 'full_name',
    label: 'Full Name',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required|length:6',
  }
]
import axios from 'axios'

async function register(user, node) {
  node.clearErrors()

  const res = await axios.post('/users', { user })
    .then((response) => {
      router.push({
        name: 'Login',
      })
    })
    .catch((e) => {
      if (e.response && e.response.data)
        node.setErrors([], e.response.data)
      else
        node.setErrors([e.message], {})
    })
}
</script>
