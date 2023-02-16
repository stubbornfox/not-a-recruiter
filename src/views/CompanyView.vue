<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full p-4 lg:p-8" v-if="company">
    <div>
      <div class="flex">
        <img :src="company.logo" />
        <div></div>
      </div>
      <div>
        <h2 class="text-neutrals-100">{{company.name}}</h2>
        <div v-if="company.website_url" class="mt-3">
          <a :href="company.website_url" class="mt-3 font-semibold text-primary">{{company.website_url}}</a>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="flex items-center justify-between">
        <h4 class="text-neutrals-100">Company Profile</h4>
        <EditCompanyButton @edit="" />
      </div>
      <p class="mt-4 text-neutrals-80" v-html="company.description">
      </p>
    </div>
    <hr class="my-6">
    <div>
      <div class="flex items-center justify-between">
        <h4 class="text-neutrals-100">Contact</h4>
        <EditCompanyButton @edit="" />
      </div>
      <p class="mt-4 text-neutrals-80">
        {{company.description}}
      </p>
    </div>
    <hr class="my-6">
    <div>
      <div class="flex items-center justify-between">
        <h4 class="text-neutrals-100">Perks & Benefits</h4>
        <EditCompanyButton @edit="" />
      </div>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8 mt-6">
        <div class="" v-for="benefit in defaultBenefits">
          <div class="flex items-center justify-between pb-6">
            <component :is="benefit.icon" />
          </div>
          <h5 class="text-neutrals-100">{{benefit.header}}</h5>
          <div class="mt-3 text-neutrals-60">{{benefit.description}}</div>
        </div>
      </div>
    </div>
    <hr class="my-6">
    <div>
      <h4 class="text-neutrals-100 mb-6">Open positions</h4>
      <div class="flex flex-col gap-2">
        <div v-for="job in company.opening_jobs" class="border border-neutrals-20 p-4 flex flex-col gap-2">
          <div class="text-neutrals-100 text-xl font-semibold">{{job.title}}</div>
          <div class="text-neutrals-80">{{job.location}}</div>
          <div class="flex flex-wrap divide-x gap-2">
            <Badges :badges="job.categories" :outline="true" class="pr-2" />
            <TypeOfEmployments :badges="job.type_of_employments" :outline="false" class="pl-2" />
          </div>
        </div>
        <RouterLink :to="{name: 'Jobs'}" class="flex items-center gap-2 self-center lg:hidden">
          <span class="text-primary font-semibold">Show all jobs</span>
          <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 11.7256L4.75 11.7256" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </RouterLink>
        <div v-if="company.opening_jobs.length == 0" class="text-neutrals-80">
          Job openings coming soon
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/stores/company'
import EditCompanyButton from "@/components/EditCompanyButton.vue";
import Badges from '@/components/Badges.vue'
import TypeOfEmployments from '@/components/TypeOfEmployments.vue'
import defaultBenefits from '@/benefits.js'

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const { fetchProfile } = companyStore

fetchProfile()
</script>
