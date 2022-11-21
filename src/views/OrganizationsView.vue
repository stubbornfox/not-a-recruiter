<template>
  <div>
    <div class="rounded bg-soft p-8">
      <div class="flex justify-between items-center">
        <h2 class="text-heading text-2xl font-semibold leading-10">Your organizations</h2>
        <RouterLink :to="{name: 'NewOrganization'}" class="hover:bg-smoke rounded-md p-2 flex items-center justify-center h-8 w-8">
          <PlusIcon class="flex-shrink h-5 w-5 mr-0" aria-hidden="true"></PlusIcon>
        </RouterLink>
      </div>
      <p class="mt-1 text-sm text-gray-500">You can join other existing organizations by receiving an invitation from them.</p>
      <h4 class="text-heading my-5 text-base leading-6 font-semibild">Membership</h4>
      <div v-for="organization in organizations" key="organization.id" class="flex justify-between items-center mt-3">
        <div class="flex items-center">
          <div class="inline-block h-14 w-14 rounded-md bg-mute flex items-center justify-center">
            <span class="text-heading text-lg font-bold">{{organization.name[0]}}</span>
          </div>
          <h5 class="text-heading text-md font-semibold ml-4">{{organization.name}}</h5>
        </div>
        <button class="rounded-md py-2 px-4 text-sm font-medium bg-mute shadow-sm hover:bg-smoke focus:outline-none" @click="viewOrganization(organization.id)">View</button>
      </div>
    </div>
    <button @click="useAuthStore().logout()" class="block text-left px-4 py-2 text-sm w-full hover:">Logout</button>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useOrganizationStore } from '../stores/organization'
import { useAuthStore } from '../stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/24/outline'
const { organizations } = storeToRefs(useOrganizationStore())
const { fetchOrganizations, setOrganization } = useOrganizationStore()
const router = useRouter()
fetchOrganizations()

function viewOrganization(organization_id) {
  setOrganization(organization_id)
  router.push({ name: 'Home' })
}
</script>
