<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full p-4 lg:p-8" v-if="company">
    <div class="flex flex-col lg:flex-row lg:items-center gap-6">
      <div class="flex g:basis-44">
        <div class="flex-1 lg:basis-44 ">
          <img :src="company.logo_image" class="w-14 h-14 lg:w-44 lg:h-44" />
        </div>
        <div class="flex lg:hidden gap-4 items-center">
          <RouterLink :to="{name: 'Settings'}" class="items-center gap-2 self-center lg:flex p-3 border border-secondary rounded-lg">
            <i>
               <IconEyeMobile />
            </i>
          </RouterLink>
          <RouterLink :to="{name: 'Settings'}" class="items-center gap-2 self-center lg:flex p-3 border border-secondary rounded-lg">
            <i>
               <IconCogMobile />
            </i>
          </RouterLink>
        </div>
      </div>
      <div class="flex-1">
        <div class="lg:flex lg:justify-between lg:items-center">
          <div>
            <h2 class="text-neutrals-100">{{company.name}}</h2>
            <a v-if="company.website_url" :href="company.website_url" class="mt-3 font-semibold text-primary">{{company.website_url}}</a>
          </div>
          <div class="flex gap-4 items-center">
            <RouterLink :to="{name: 'Settings'}" class="hidden items-center gap-2 self-center lg:flex p-3 rounded-lg">
              <i>
                <IconEye />
              </i>
              <span class="text-primary font-semibold">Public View</span>
            </RouterLink>
            <RouterLink :to="{name: 'Settings'}" class="hidden items-center gap-2 self-center lg:flex p-3 border border-secondary rounded-lg">
              <i>
                <IconCog />
              </i>
              <span class="text-primary font-semibold">Profile Settings</span>
            </RouterLink>
          </div>
        </div>
        <div>
          <dl class="mt-4 flex flex-col gap-4 lg:flex-row lg:gap-10 ">
            <div class="flex gap-4 items-center" v-for="info in brief(company)">
              <i class="w-11 h-11 flex items-center justify-center border border-neutrals-20 rounded-full p-2">
                <component :is="info.icon" /></i>
              <div>
                <dt class="text-neutrals-80">{{info.term}}</dt>
                <dd class="text-neutrals-100 font-semibold">{{info.value}}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <hr class="my-6" />
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="lg:basis-2/3">
        <div class="">
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">Company Profile</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings'})" />
          </div>
          <p class="mt-4 text-neutrals-80" v-html="company.description">
          </p>
        </div>
        <hr class="my-6">
        <div>
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">Contact</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings', params: {tab: 'social'}})" />
          </div>
          <div class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-4">
            <a v-for="social in Object.keys(socials).filter(s => company[s])" :href="company[social]" class="text-primary font-medium border border-primary p-2 flex items-center gap-2">
              <i class="">
                <component :is="socials[social]" />
              </i>
              {{company[social]}}
            </a>
          </div>
        </div>
        <hr class="my-6" />
      </div>
      <div class="lg:basis-1/3 lg:boder-0 border-b border-neutrals-20 pb-6">
        <div>
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">TechStack</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings'})" />
          </div>
          <div class="grid grid-cols-3 gap-2 mt-4">
            <p v-for="tech in company.tech_stacks" class="text-neutrals-100">{{tech}}</p>
          </div>
        </div>
        <hr class="my-6" />
        <div>
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">Office Locations</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings'})" />
          </div>
          <div class="mt-4">
            <p v-for="loc in company.locations" class="text-neutrals-100">{{loc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:flex">
      <div class="lg:basis-2/3  lg:mt-0 mt-6">
        <div>
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">Team</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings', params: {tab:'team'}})" />
          </div>
          <div class="mt-6">
            <div class="grid grid-cols-3 gap-6">
              <div v-for="member in members" class="flex items-center justify-center border border-neutrals-20 rounded p-6 flex-col">
                <img :src="member.profile_picture" class="w-20 h-20 rounded-full" v-if="member.profile_picture"/>
                <div v-else class="w-20 h-20 rounded-full bg-light-gray flex items-center justify-center text-4xl font-bold text-primary">
                  {{member.full_name[0]}}
                </div>
                <p class="text-neutrals-100 mt-4 font-semibold">{{member.full_name}}</p>
                <p class="text-neutrals-60 mt-1">{{member.position || 'Human Resouce'}}</p>
                <div class="mt-4 flex gap-1">
                  <a class="" :href="member.instagram">
                    <IconTeamInstagram />
                  </a>
                  <a class="" :href="member.linkedin">
                    <IconTeamLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <RouterLink :to="{name: 'Settings', params: {tab: 'team'}}" class="mt-3 flex items-center gap-2 self-center">
            <span class="text-primary font-semibold">View all core team</span>
            <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.75 11.7256L4.75 11.7256" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </i>
          </RouterLink>
        </div>
        <hr class="my-6" />
        <div>
          <div class="flex items-center justify-between">
            <h4 class="text-neutrals-100">Perks & Benefits</h4>
            <EditCompanyButton @edit="$router.push({name: 'Settings'})" />
          </div>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 mt-6">
            <div class="" v-for="benefit in defaultBenefits">
              <div class="flex items-center justify-between pb-6">
                <component :is="benefit.icon" />
              </div>
              <h5 class="text-neutrals-100">{{benefit.header}}</h5>
              <div class="mt-3 text-neutrals-60">{{benefit.description}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-6" />
    <div class="lg:flex">
      <div class="lg:basis-2/3">
        <div class="flex justify-between mb-6">
          <h4 class="text-neutrals-100">Open positions</h4>
          <RouterLink :to="{name: 'Jobs'}" class="hidden items-center gap-2 self-center lg:flex">
            <span class="text-primary font-semibold">Show all jobs</span>
            <i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.75 11.7256L4.75 11.7256" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </i>
          </RouterLink>
        </div>
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
import IconFounded from '@/components/icons/IconFounded.vue'
import IconSize from '@/components/icons/IconSize.vue'
import IconLocation from '@/components/icons/IconLocation.vue'
import IconIndustry from '@/components/icons/IconIndustry.vue'
import IconYoutubeLink from '@/components/icons/IconYoutubeLink.vue'
import IconInstagramLink from '@/components/icons/IconInstagramLink.vue'
import IconLinkedinLink from '@/components/icons/IconLinkedinLink.vue'
import IconFacebookLink from '@/components/icons/IconFacebookLink.vue'
import IconTwitterLink from '@/components/icons/IconTwitterLink.vue'
import IconCog from '@/components/icons/IconCog.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconEyeMobile from '@/components/icons/IconEyeMobile.vue'
import IconCogMobile from '@/components/icons/IconCogMobile.vue'
import IconTeamLinkedin from '@/components/icons/IconTeamLinkedin.vue'
import IconTeamInstagram from '@/components/icons/IconTeamInstagram.vue'
import { businessSizes } from '@/const'
const companyStore = useCompanyStore()
const { company, members } = storeToRefs(companyStore)
const { fetchProfile, fetchTeam } = companyStore
const socials = {
  instagram: IconInstagramLink,
  twitter: IconTwitterLink,
  facebook: IconFacebookLink,
  linkedin: IconLinkedinLink,
  youtube: IconYoutubeLink
}

fetchProfile()
fetchTeam()

const brief = (company) => {
  return [{
      icon: IconFounded,
      term: 'Founded',
      value: company.date_founded,
    },
    {
      icon: IconSize,
      term: 'Employees',
      value: businessSizes.find((s) => s.code == company.size)?.label,
    },
    {
      icon: IconLocation,
      term: 'Location',
      value: `${company.locations.length} countries`,
    },
    {
      icon: IconIndustry,
      term: 'Industry',
      value: company.industry,
    }
  ]
}
</script>
