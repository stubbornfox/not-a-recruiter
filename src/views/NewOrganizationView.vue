<template>
  <div>
    <div class="rounded bg-soft p-8 md:w-96 min-w-full">
      <h2 class="text-heading text-2xl font-semibold leading-10">Create new organization</h2>
      <FormKit type="form" id="saveOrganization" @submit="saveOrganization" form-class="space-y-8" :actions=false :incomplete-message=false novalidate>
        <div class="space-y-8">
          <div class="mt-6">
            <FormKitSchema :schema="schema" />
          </div>
        </div>
        <div class="">
          <div class="flex">
            <button type="submit" class="mr-3 inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Create organization</button>
            <RouterLink :to="{name: 'Organizations'}" class="hover:bg-smoke rounded-md p-2 flex items-center justify-center">
              Cancel
            </RouterLink>

          </div>
        </div>
      </FormKit>
    </div>
    <button @click="useAuthStore().logout()" class="block text-left px-4 py-2 text-sm w-full hover:">Logout</button>
  </div>
</template>
<script setup>
import { FormKitSchema } from '@formkit/vue'
import { storeToRefs } from 'pinia'
import { useOrganizationStore } from '../stores/organization'
import { useAuthStore } from '../stores/auth'
import { useRouter, RouterLink } from 'vue-router'
const { organizations, error } = storeToRefs(useOrganizationStore())
const { fetchOrganizations, setOrganization, createOrganization } = useOrganizationStore()
const router = useRouter()
const schema = [{
  $formkit: 'text',
  name: 'name',
  label: 'Organization name',
  validation: 'required',
}]
fetchOrganizations()

function viewOrganization(organization_id) {
  setOrganization(organization_id)
  router.push({ name: 'Home' })
}

async function saveOrganization(new_organization) {
  await createOrganization(new_organization)
  if (error.value == undefined) {
    router.push({ name: 'Home' })
  }
}
</script>
