<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full p-4 lg:p-8">
    <TabGroup>
      <TabList class="flex gap-10 border-b border-neutrals-20">
        <Tab v-for="tab in tabs" :key="tab.name" class='hover:text-neutrals-80 hover:border-neutrals-80 py-3 hover:border-b-4 font-semibold outline-none'>{{ tab.name }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><CompanyBasicInformation @save="updateProfile"/></TabPanel>
        <TabPanel><CompanySocialLink @save="updateProfile" :company="organization" /></TabPanel>
        <TabPanel><CompanyTeam /></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import CompanyBasicInformation from '@/components/CompanyBasicInformation.vue'
import CompanySocialLink from '@/components/CompanySocialLink.vue'
import CompanyTeam from '@/components/CompanyTeam.vue'
import { useCompanyStore } from '@/stores/company';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const { updateProfile } = useCompanyStore()
const { me, organization } = storeToRefs(userStore);
userStore.getMe()

const tabs = [
  { name: 'Overview', key: 'overview' },
  { name: 'Social Links', key: 'social_link' },
  { name: 'Team', key: 'team' },
]
</script>
<style>
  button[data-headlessui-state=selected] {
    color: #25324B;
    border-bottom: 4px solid #4640DE;
  }
</style>
