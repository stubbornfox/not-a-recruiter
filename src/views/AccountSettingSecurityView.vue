<template>
  <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
    <div class="py-6 md:flex md:items-center md:justify-between">
      <FormKit type="form" id="editAccountForm" @submit="save" form-class="flex-grow-1 space-y-8 lg:w-96" :actions=false :incomplete-message=false novalidate>
        <div class="space-y-8">
          <h3 class="text-lg font-medium leading-6 text-heading text-heading">Change password
          </h3>
          <div class="mt-6 grid grid-cols-1 gap-y-6">
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
import { storeToRefs } from 'pinia';
import api from '../services/api';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';

const toast = useToast()
const { logout } = useAuthStore()
const { me } = storeToRefs(useUserStore());

const schema = [{
    $formkit: 'password',
    name: 'password',
    label: 'New password',
    validation: 'required|length:6',
  },
  {
    $formkit: 'password',
    name: 'password_confirmation',
    label: 'Confirm new password',
    validation: "required|confirm:password"
  },
]

async function save(data, node) {
  node.clearErrors()
  const res = await api.put(`/users/${me.value.id}`, { user: data })
    .then((response) => {
      toast.success("Updated account password!", { onClose: logout })
    })
    .catch((e) => {
      if (e.response && e.response.status == 422 && e.response.data)
        node.setErrors([], e.response.data)
      else
        node.setErrors([e.message], {})
    })
}
</script>
