<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="job in jobs" :key="job.id">
        <a href="#" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="truncate text-sm font-medium text-indigo-600">{{ job.title }}</p>
              <div class="ml-2 flex flex-shrink-0">
                <p class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 capitalize">{{ job.employment_type }}</p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <UsersIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {{ job.department }}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {{ job.location }}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <p>
                  Closing on
                  {{ ' ' }}
                  <time :datetime="job.valid_through" format="YYYY MM DD">
                    {{ formatDate(job.valid_through) }}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/vue/20/solid'
  import * as dayjs from 'dayjs'

  defineProps({
    jobs: [],
  })

  function formatDate(date) {
    return dayjs(date).format('MMMM d, YYYY')
  }
</script>

