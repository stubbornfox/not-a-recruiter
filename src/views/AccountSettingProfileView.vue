<template>
  <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
    <div class="py-6 md:flex md:items-center md:justify-between">
      <FormKit type="form" id="editAccountForm" @submit="save" form-class="flex-grow-1 space-y-8 lg:w-96" :value="me" :actions=false :incomplete-message=false novalidate>
        <div class="space-y-8">
          <h3 class="text-lg font-medium leading-6 text-heading text-heading">Your profile
          </h3>
          <div class="mt-6 grid grid-cols-1 gap-y-6">
            <FormKit type="text" label="First name" name="first_name" validation="required" />
            <FormKit type="text" label="Last name" name="last_name" validation="required" />
            <FormKit type="email" label="Email" name="email" validation="required|email" />
            <FormKit type="file" label="Profile picture" accept=".png,.jpg,.svg,.jpeg" help="Your picture should be a square image with dimensions of at least 80px. PNG, JPG, and SVG file types are acceptable." @change="onFileChange" name="profile_picture" />
            <div v-show="url || me?.profile_picture">
              <img :src="url || me?.profile_picture" class="w-20 h-20 rounded border-4 border-mute" />
            </div>
          </div>
        </div>
        <div class="pt-5">
          <div class="flex">
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
import { useUserStore } from '@/stores/user';

const { me } = storeToRefs(useUserStore());
const { getMe } = useUserStore()
let urlHasChanged = false
let url = ref(null)
import { useToast } from 'vue-toastification'
const toast = useToast()

function onFileChange(e) {
  const file = e.target.files[0];
  url.value = URL.createObjectURL(file);
  urlHasChanged = true
}

async function save(data, node) {
  node.clearErrors()
  const body = new FormData()
  body.append('user[id]', data.id)
  body.append('user[first_name]', data.first_name)
  body.append('user[last_name]', data.last_name)
  body.append('user[email]', data.email)

  if (urlHasChanged)
    data.profile_picture.forEach((fileItem) => {
      body.append('user[profile_picture]', fileItem.file)
    })

  const res = await api.put(`/users/${data.id}`, body)
    .then((response) => {
      getMe()
      toast.success("Updated account profile!")
    })
    .catch((e) => {
      if (e.response && e.response.status == 422 && e.response.data)
        node.setErrors([], e.response.data)
      else
        node.setErrors([e.message], {})
    })
}
</script>
