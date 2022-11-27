<template>
  <div class="flex flex-grow" v-if="organization">
    <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
      <div class="h-full flex flex-col flex-grow mt-4 text-color-text">
        <FormKit type="form" id="saveOrganization" @submit="(o) => {updateOrganization(o)}" form-class="space-y-8 divide-y divide-gray-200" v-model="organization" :actions=false :incomplete-message=false novalidate>
          <div class="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 class="text-lg font-medium leading-6 text-heading text-heading">Organization management</h3>
                <p class="mt-1 text-sm text-gray-500">Here's where you can edit and update your organization's information.</p>
              </div>
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <FormKitSchema :schema="schema" />
              </div>
            </div>
          </div>
          <div class="pt-5">
            <div class="flex">
              <button type="button" class="rounded-md border border-gray-300  py-2 px-4 text-sm font-medium text-color-text shadow-sm hover:bg-soft focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" @click="$formkit.reset('saveOrganization')">Reset</button>
              <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
            </div>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user';
import { useOrganizationStore } from '@/stores/organization';

const { updateOrganization } = useOrganizationStore()
const userStore = useUserStore()
const { me, organization } = storeToRefs(userStore);
userStore.getMe()
// const org = ref(me.value.organization)

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
          class: 'flex text-color-text items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
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
</script>
