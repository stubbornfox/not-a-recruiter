<script setup>
  import {ref} from 'vue'
  import axios from 'axios'

  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

  import JobList from "../components/JobList.vue";
  import { PlusIcon as PlusIconOutline } from '@heroicons/vue/24/outline'
  import {
    BarsArrowUpIcon,
    CheckBadgeIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    RectangleStackIcon,
    StarIcon,
  } from '@heroicons/vue/20/solid'

  let jobs = ref([])
  async function searchJob (searchText) {
    const res = await axios.get('/jobs', searchText)
    .then((response) => {
      jobs.value =  [{
          id: 1,
          title: 'Back End Developer',
          type: 'Full-time',
          location: 'Remote',
          department: 'Engineering',
          closeDate: '2020-01-07',
          closeDateFull: 'January 7, 2020',
        },
        {
          id: 2,
          title: 'Front End Developer',
          type: 'Full-time',
          location: 'Remote',
          department: 'Engineering',
          closeDate: '2020-01-07',
          closeDateFull: 'January 7, 2020',
        },
        {
          id: 3,
          title: 'User Interface Designer',
          type: 'Full-time',
          location: 'Remote',
          department: 'Design',
          closeDate: '2020-01-14',
          closeDateFull: 'January 14, 2020',
        },
      ]
    })
    .catch((e) => {
      console.log(e)
    })
  }
</script>

<template>
  <div class="relative flex min-h-full flex-col">
    <!-- Navbar -->
    <Disclosure as="nav" class="flex-shrink-0" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 justify-center lg:justify-end">
            <div class="w-full px-2 lg:px-6">
              <div class="relative text-indigo-200 focus-within:text-gray-400">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                 <FormKit
                  type="search"
                  name="search"
                  @input="searchJob"
                  placeholder="Search..."
                  value="Butler"
                  inner-class= "$reset w-full"
                  outer-class= "$reset w-full"
                  wrapper-class= "$reset w-full"
                  input-class= "$reset block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-indigo-100 placeholder-indigo-200   focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
         <div class="w-full flex justify-end lg:px-6 mt-3">
          <RouterLink to="/jobs/new" tag="button" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <PlusIconOutline class="h-6 w-6" aria-hidden="true" />
        </RouterLink>
        </div>
      </div>
    </Disclosure>
    <JobList class="mt-5" :jobs="jobs"/>
  </div>
</template>
