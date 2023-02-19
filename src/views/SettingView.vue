<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full p-4 lg:p-8" v-if="company">
    <div class="flex gap-10 border-b border-neutrals-20">
      <RouterLink v-for="tab in tabs" :key="tab.name" :to="{name: 'Settings', params: {tab: tab.key}}" @click="current_tab = tab.key" href="#" class='hover:text-neutrals-80 hover:border-neutrals-80 py-3 border-b-4  font-semibold outline-none' :class="current_tab == tab.key ? 'border-purple' : 'border-transparent' ">{{ tab.name }}</RouterLink>
    </div>
    <div>
      <div v-show="current_tab == 'overview'">
        <CompanyBasicInformation :company="company" @save="updateProfile" />
      </div>
      <div v-show="current_tab == 'social'">
        <CompanySocialLink :company="company" @save="updateProfile" />
      </div>
      <div v-show="current_tab == 'team'">
        <CompanyTeam />
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import CompanyBasicInformation from '@/components/CompanyBasicInformation.vue'
import CompanySocialLink from '@/components/CompanySocialLink.vue'
import CompanyTeam from '@/components/CompanyTeam.vue'
import { useCompanyStore } from '@/stores/company';

const route = useRoute()
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const { fetchProfile, updateProfile } = companyStore


onMounted(() => {
  fetchProfile()
})

const current_tab = ref(route.params.tab || 'overview')
const tabs = [
  { name: 'Overview', key: 'overview' },
  { name: 'Social Links', key: 'social' },
  { name: 'Team', key: 'team' },
]
</script>
<style>
button[data-headlessui-state=selected] {
  color: #25324B;
  border-bottom: 4px solid #4640DE;
}
</style>
