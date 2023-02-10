<template>
  <div class="lg:hidden" v-if="isMobile()">
    <div v-for="job in jobs" class="job-card p-4 border border-neutrals-20 mt-3" :key="job.slug">
      <div class="flex items-center justify-between">
        <div class="text-neutrals-100 font-bold">{{job.title}}</div>
        <JobActionComponent :job="job" />
      </div>
      <div class="flex items-center justify-between border-b border-neutrals-20 py-3">
        <div>
          <div class="text-neutrals-60">Date posted</div>
          <div class="text-neutrals-80 font-medium"> {{ formatDate(job.created_at) }}</div>
        </div>
        <div>
          <div class="text-neutrals-60">Applicants</div>
          <div class="text-neutrals-80 font-medium"> {{ job.applicants }}</div>
        </div>
        <div>
          <div class="text-neutrals-60">Needs</div>
          <div class="text-neutrals-80 font-medium"> {{ job.needs }}</div>
        </div>
      </div>
      <div class="pt-3 flex gap-x-2">
        <div class="flex gap-2 flex-wrap">
        <span class="badge" :class="statusClass(job.status)">{{ job.display_status }}</span>
         <span class="badge" v-for="(type, index) in job.type_of_employments" :class="typeClass(type)">{{ job.display_type_of_employments[index] }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <table class="lg:table-auto w-full">
      <tr class="border-y border-neutrals-20">
        <th class="p-6">Roles</th>
        <th class="p-6">Status</th>
        <th class="p-6">Date Posted</th>
        <th class="p-6">Due Date</th>
        <th class="p-6">Job Types</th>
        <th class="p-6">Applicants</th>
        <th class="p-6">Needs</th>
        <th class="p-6"></th>
      </tr>
      <tr v-for="job in jobs" :key="job.id" class="even:bg-white odd:bg-neutrals-10i">
        <td class="py-7 px-6 font-medium">{{ job.title }}</td>
        <td class="py-7 px-6">
          <span class="badge" :class="statusClass(job.status)">{{ job.display_status }}</span></td>
        <td class="py-7 px-6">
          <time :datetime="job.created_at" format="YYYY MM DD">
            {{ formatDate(job.created_at) }}
          </time>
        </td>
        <td class="py-7 px-6">
          <time :datetime="job.due_date" format="YYYY MM DD">
            {{ formatDate(job.due_date) }}
          </time>
        </td>
        <td class="py-7 px-6">
          <div class="grid gap-2"> <span class="badge" v-for="(type, index) in job.type_of_employments" :class="typeClass(type)">{{ job.display_type_of_employments[index] }}</span>
          </div>
        </td>
        <td class="py-7 px-6 text-center">{{ job.applicants }}</td>
        <td class="py-7 px-6 text-center">{{ job.needs }}</td>
        <td class="py-7 px-6">
          <JobActionComponent :job="job" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
  import { RouterLink } from "vue-router";
  import { ref } from "vue";
  import JobActionComponent from '@/components/JobActionComponent.vue'
  import dayjs from 'dayjs';

  const isMobile = () => screen.width <= 768

  const props = defineProps({
    jobs: [],
    paginate: {}
  })

  function formatDate(dateData) {
    return dayjs(dateData).format('D MMM YYYY')
  }

  function statusClass(status) {
    switch(status) {
      case 'live':
        return 'text-green border-green'
        break;
      case 'closed':
         return 'text-red border-red'
        break;
      default:
        return 'text-yellow border-yellow'
    }
  }

  function typeClass(type) {
    switch(type) {
      case 'full_time':
        return 'text-primary border-primary'
        break;
      case 'freelance':
         return 'text-yellow border-yellow'
        break;
      default:
        return 'text-yellow border-yellow'
    }
  }
</script>
<style type="scoped">
  table th {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #202430;
    opacity: 0.5;
    flex: none;
    order: 0;
    flex-grow: 0;
    text-align: left;
  }
</style>
