<template>
  <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
    <div class="py-6 md:flex md:items-center md:justify-between">
      <FormKit type="form" id="editAccountForm" @submit="save" form-class="flex-grow-1 space-y-8 lg:w-96" :value="user" :actions=false :incomplete-message=false novalidate>
        <div class="space-y-8">
           <h3 class="text-lg font-medium leading-6 text-heading text-heading">Change password
          </h3>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
            <FormKitSchema :schema="schema" />
          </div>
        </div>
        <div class="pt-5">
          <div class="flex ">
            <button type="button" class="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm hover:bg-soft focus:outline-none text-color-text" @click="$formkit.reset('editAccountForm')">Reset</button>
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import api from '../services/api';
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const schema = [{
    $formkit: 'password',
    name: 'password',
    label: 'New password',
    validation: '?length:6',
  },
  {
    $formkit: 'password',
    name: 'password_confirmation',
    label: 'Confirm new password',
    validation: "confirm:password"
  },
]

async function save(data, node) {
  node.clearErrors()
  const res = await api.put(`/users/${data.id}`, { user: data })
    .then((response) => {
      const updatedUser = { ...authStore.user, ...response.data }
      localStorage.setItem('user', JSON.stringify(updatedUser));
      authStore.user = updatedUser;
      alert('Updated')
    })
    .catch((e) => {
      if (e.response && e.response.status == 422 && e.response.data)
        node.setErrors([], e.response.data)
      else
        node.setErrors([e.message], {})
    })
}
</script>
