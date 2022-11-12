<template>
  <FormKit type="form" id="registerForm" @submit="register" form-class="flex-grow-1 space-y-8 w-96" :actions=false :incomplete-message=false>
    <div class="space-y-8">
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
        <FormKitSchema :schema="schema" />
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-center">
        <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('registerForm')">Reset</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Register</button>
      </div>
    </div>
  </FormKit>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const schema = [{
    $formkit: 'email',
    name: 'email',
    label: 'Email',
    validation: 'required',
  },
  {
    $formkit: 'text',
    name: 'name',
    label: 'Full Name',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password_confirmation',
    label: 'Password Confirmation',
    validation: "required"
  },
]
import axios from 'axios'

async function register(user) {
  debugger
  const res = await axios.post('/users', { user })
  .then((response) => {
    console.log(response)
    alert('Created')
    router.push({
      name: 'Login',
    })
  })
  .catch((e) => {
    console.log(e)
  })
}
</script>
