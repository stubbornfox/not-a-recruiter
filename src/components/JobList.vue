<template>
  <div class="text-neutrals-100 border border-neutrals-20">
    <div class="flex items-center justify-between py-5 px-6">
      <div class="title-2">
        Job List
      </div>
      <div class="">
        Filter
      </div>
    </div>
    <table class="table-auto w-full">
      <tr class="border-y border-neutrals-20">
        <th class="p-6">Roles</th>
        <th>Status</th>
        <th>Date Posted</th>
        <th>Due Date</th>
        <th>Job Types</th>
        <th>Applicants</th>
        <th>Needs</th>
        <th></th>
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
          <span class="badge" :class="typeClass(job.employment_type)">{{ job.display_employment_type }}</span></td>
        <td class="py-7 px-6">{{ job.applicants }}</td>
        <td class="py-7 px-6">{{ job.needs }}</td>
        <td class="py-7 px-6">
          <IconHorizontalDot />
        </td>
      </tr>
    </table>
    <div class="p-6 text-neutrals-60 font-medium flex items-center justify-between">
      <div id="per-page">
        View
        <select class="mx-3">
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
        Jobs per page
      </div>
      <div id="paginage">
        <ul>
          <button class="btn bg-primary w-12 h-12 mr-1 rounded-lg text-white">1</button>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { RouterLink } from "vue-router";
  import IconHorizontalDot from '@/components/icons/IconHorizontalDot.vue'
  import dayjs from 'dayjs';

  defineProps({
    jobs: [],
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
        // code block
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
        // code block
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
