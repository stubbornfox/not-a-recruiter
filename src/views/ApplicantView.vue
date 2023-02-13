<template>
  <div class="h-full">
    <div class="flex items-center justify-between lg:py-6 lg:px-8">
      <div class="flex items-center gap-6">
        <a @click.prevent="$router.go(-1)" href="#">
          <IconArrowBackLarge />
        </a>
        <div>
          <h4 class="text-neutrals-100">Applicant Details</h4>
        </div>
      </div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton class="inline-flex items-center border rounded-lg justify-center border-primary py-3 px-4 gap-x-3">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8327 7.5835L9.99935 13.4168L4.16602 7.5835" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-primary font-bold ">More action</span>
          </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
              <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Applicants</RouterLink>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View Job Detail</RouterLink>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <RouterLink :to="{name: 'Job', params: {slug: job.slug}}" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Job</RouterLink>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div class="flex lg:px-8 gap-8">
      <div class="border border-neutrals-20 p-6 basis-1/3" v-if="applicant">
        <div>
          <div class="flex items-center mb-6">
            <div></div>
            <div>
              <h4 class="text-neutrals-100">{{applicant.name}}</h4>
              <p class="flex items-center gap-2">
                <i>
                  <IconRate /></i>
                <span class="text-neutrals-100 font-medium">{{applicant.score}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-neutrals-10i flex flex-col gap-2 ">
          <div class="text-sm">
            <dl class="flex items-center justify-between">
            <dt class="text-neutrals-100">Applied job</dt>
            <dd>2 days ago</dd>
          </dl>
          </div>
          <div class="border-t border-neutrals-30 pt-2">
            <div class="font-semibold text-neutrals-100">{{applicant.job_role}}</div>
            <span class="text-neutrals-80 text-sm">{{applicant.job_categories?.join(' ● ')}}</span>
            <span> ● </span>
            <span class="text-neutrals-80 text-sm">{{applicant.job_type_of_employments?.join(' ● ')}}</span>
          </div>
        </div>
        <div class="mt-6 bg-neutrals-10i p-4">
          <div class="flex justify-between">
            <span class="text-neutrals-100">Stage</span>
            <div class="flex items-center gap-2 items-center">
              <span class="w-2 h-2 rounded-full" :class="`bg-${stages[applicant.stage].color}`"></span>
              <span :class="`text-${stages[applicant.stage].color} text-sm font-medium`">{{stages[applicant.stage].text}}</span>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-px mt-2">
            <div :class="`${stages[applicant.stage].index >= index ? 'bg-blue':'bg-neutrals-40' } h-3`" v-for="index in 4" />
          </div>
        </div>
        <div class="flex items-center gap-x-2 mt-6">
          <RouterLink :to="{name: 'Home'}" class="text-primary flex-grow border border-secondary py-3 text-center rounded-md font-bold">Schedule Interview</RouterLink>
          <RouterLink :to="{name: 'Home'}" class="border border-secondary p-3 text-center rounded-md"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_29612_29611)">
                <path d="M12.9996 22.75L9.09961 18.85H6.49961C5.46527 18.85 4.47329 18.4391 3.74189 17.7077C3.0105 16.9763 2.59961 15.9843 2.59961 14.95V7.15C2.59961 6.11566 3.0105 5.12368 3.74189 4.39228C4.47329 3.66089 5.46527 3.25 6.49961 3.25H19.4996C20.534 3.25 21.5259 3.66089 22.2573 4.39228C22.9887 5.12368 23.3996 6.11566 23.3996 7.15V14.95C23.3996 15.9843 22.9887 16.9763 22.2573 17.7077C21.5259 18.4391 20.534 18.85 19.4996 18.85H16.8996L12.9996 22.75Z" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.7998 8.4502H18.1998" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.7998 13.6499H15.5998" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_29612_29611">
                  <rect width="26" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </RouterLink>
        </div>
        <hr class="my-6">
        <div class="contact flex flex-col gap-4">
          <h6 class="text-lg font-medium text-neutrals-100">Contact</h6>
          <div class="flex gap-4">
            <i>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_29612_29621)">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3 7L12 13L21 7" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_29612_29621">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <div>
              <label>Email</label>
              <p class="text-neutrals-100">{{applicant.email}}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_29612_29629)">
                  <path d="M16 4H8C7.44772 4 7 4.44772 7 5V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V5C17 4.44772 16.5523 4 16 4Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11 5H13" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 17V17.01" stroke="#171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_29612_29629">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <div>
              <label>Phone</label>
              <p class="text-neutrals-100">{{applicant.phone}}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_29612_29469)">
                  <path d="M22 4.01001C21 4.50001 20.02 4.69901 19 5.00001C17.879 3.73501 16.217 3.66501 14.62 4.26301C13.023 4.86101 11.977 6.32301 12 8.00001V9.00001C8.755 9.08301 5.865 7.60501 4 5.00001C4 5.00001 -0.182 12.433 8 16C6.128 17.247 4.261 18.088 2 18C5.308 19.803 8.913 20.423 12.034 19.517C15.614 18.477 18.556 15.794 19.685 11.775C20.0218 10.5527 20.189 9.28987 20.182 8.02201C20.18 7.77301 21.692 5.25001 22 4.00901V4.01001Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_29612_29469">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <div>
              <label>Linkedin</label>
              <p class="text-neutrals-100">{{applicant.linkedin}}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_29612_29654)">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3.59961 9H20.3996" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3.59961 15H20.3996" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.4997 3C9.81501 5.69961 8.92188 8.81787 8.92188 12C8.92188 15.1821 9.81501 18.3004 11.4997 21" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.5 3C14.1847 5.69961 15.0778 8.81787 15.0778 12C15.0778 15.1821 14.1847 18.3004 12.5 21" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_29612_29654">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <div>
              <label>Website</label>
              <p class="text-neutrals-100">{{applicant.website}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-2/3 border border-neutrals-20">
        <div class="lg:px-8 border-b border-neutrals-20">
          <div class="flex gap-x-10 pt-3">
            <RouterLink :to="{name:'ProfileApplicant'}" :class="[$route.name == 'ProfileApplicant' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Applicant Profile</RouterLink>
            <RouterLink :to="{name:'ResumeApplicant'}" :class="[$route.name == 'ResumeApplicant' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Resume</RouterLink>
            <RouterLink :to="{name:'StageApplicant'}" :class="[$route.name == 'StageApplicant' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Hiring Progress</RouterLink>
            <RouterLink :to="{name:'InterviewApplicant'}" :class="[$route.name == 'InterviewApplicant' ? 'border-b-4 border-primary text-neutrals-100' : '', 'font-semibold pb-3']">Interview Schedule</RouterLink>
          </div>
        </div>
        <RouterView :applicant="applicant" v-if="applicant" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterView, RouterLink } from "vue-router";
import { useApplicantStore } from '../stores/applicant'
import { storeToRefs } from 'pinia'
import IconArrowBackLarge from '@/components/icons/IconArrowBackLarge.vue'
import IconRate from '@/components/icons/IconRate.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { stages } from '@/const'
const route = useRoute()
const applicantStore = useApplicantStore()
const { id } = route.params
const { applicant } = storeToRefs(applicantStore)
const { fetchApplicant } = applicantStore
fetchApplicant(id)
</script>
