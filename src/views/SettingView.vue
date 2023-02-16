<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full py-4 lg:p-8">
    <TabGroup>
      <TabList class="flex gap-10 border-b border-neutrals-20">
        <Tab v-for="tab in tabs" :key="tab.name" class='hover:text-neutrals-80 hover:border-neutrals-80 py-3 hover:border-b-4 font-semibold outline-none'>{{ tab.name }}</Tab>
      </TabList>
      <TabPanels class="py-8">
        <TabPanel><CompanyBasicInformation /></TabPanel>
        <TabPanel><CompanySocialLink /></TabPanel>
        <TabPanel><CompanyTeam /></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import CompanyBasicInformation from '@/components/CompanyBasicInformation.vue'
import CompanySocialLink from '@/components/CompanySocialLink.vue'
import CompanyTeam from '@/components/CompanyTeam.vue'

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
