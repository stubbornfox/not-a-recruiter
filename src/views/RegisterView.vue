<template>
  <div>
  <FormKit type="form" id="registerForm" @submit="register" form-class="flex-grow-1 space-y-8 w-96  bg-soft p-6 rounded-md" :actions=false :incomplete-message=false novalidate>
    <div class="space-y-8">
      <h3 class="text-lg font-medium leading-6 text-heading text-heading">Create an account
      </h3>
      <div class="mt-6 grid grid-cols-1 gap-y-6">
        <FormKitSchema :schema="schema" />
      </div>
    </div>
    <div class="">
      <div class="flex">
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Register</button>
      </div>
    </div>
  </FormKit>
   <div class="flex text-xs text-color-text">
      <RouterLink :to="{ name: 'Login'}" class="py-4 px-2 hover:underline">Already have an account?</RouterLink>
    </div>
  </div>
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
    validation: 'required|email',
  },
  {
    $formkit: 'text',
    name: 'first_name',
    label: 'First Name',
    validation: 'required',
  },
  {
    $formkit: 'text',
    name: 'last_name',
    label: 'Last Name',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required|length:6',
  },
  {
    $formkit: 'password',
    name: 'password_confirmation',
    label: 'Password Confirmation',
    validation: "required|confirm:password"
  },
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
