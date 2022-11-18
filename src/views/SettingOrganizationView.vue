<template>
  <div class="flex flex-grow">
    <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
      <div class="h-full flex flex-col flex-grow mt-4">
        <FormKit type="form" id="saveOrganization" @submit="saveOrganization" form-class="space-y-8 divide-y divide-gray-200" v-model="organization" :actions=false :incomplete-message=false novalidate>
          <div class="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 class="text-lg font-medium leading-6 ">Organization management</h3>
                <p class="mt-1 text-sm text-gray-500">Here's where you can edit and update your organization's information.</p>
              </div>
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <FormKitSchema :schema="schema" />
              </div>
            </div>
          </div>
          <div class="pt-5">
            <div class="flex">
              <button type="button" class="rounded-md border border-gray-300  py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('saveOrganization')">Reset</button>
              <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import axios from 'axios'
import authHeader from '../auth-header';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = authStore.user
const schema = [{
    $formkit: 'text',
    name: 'name',
    label: 'Organization name',
    validation: 'required',
  },
  {
    $formkit: 'url',
    name: 'website_url',
    label: 'Organization website URL',
    validation: '',
    help: 'If you supply a website URL, it will appear on your job board as a link.',
    sectionsSchema: {
      prefix: {
        $el: 'div',
        attrs: {
          class: 'flex items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
        },
        children: 'https://',
      },
    }
  },
  {
    $formkit: 'select',
    name: 'remote_level',
    label: 'How remote is your organization?',
    options: {
      some_remote: 'Some Remote',
      mostly_remote: 'Mostly Remote',
      fully_distributed: 'Fully Distributed',
      no_remote: 'No remote',
    }
  }
]

const organization = ref([])

onMounted(() => {
  debugger
  if (user.organization_ids && user.organization_ids.length > 0)
    axios.get(`/organizations/${user.organization_ids[0]}`, { headers: authHeader() })
    .then((response) => {
      organization.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})

async function saveOrganization(modifiedOrganization) {
  if (modifiedOrganization.id)
    await axios.put(`/organizations/${modifiedOrganization.id}`, { organization: modifiedOrganization }, { headers: authHeader() })
    .then((response) => {
      alert('Updated!')
    })
    .catch((e) => {
      console.log(e)
    })
  else
    await axios.post('/organizations', { organization: modifiedOrganization }, { headers: authHeader() })
    .then((response) => {
      alert('Created!')
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
