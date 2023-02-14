<template>
  <div class="w-full lg:py-8 py-4">
    <div class="flex flex-col lg:flex-row  gap-6">
      <div class="lg:basis-2/3">
        <div class="flex flex-col gap-6 lg:flex-row">
          <div class="border border-neutrals-20 p-4 flex-1">
            <div class="flex justify-between">
              <div class="text-lg text-neutrals-60 font-semibold">
                Total Views
              </div>
              <i class="aria-hidden">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="18" fill="#26A4FF" />
                  <path d="M26.267 17.6668C24.5836 13.7585 21.417 11.3335 18.0003 11.3335C14.5836 11.3335 11.417 13.7585 9.73363 17.6668C9.68775 17.772 9.66406 17.8854 9.66406 18.0002C9.66406 18.1149 9.68775 18.2284 9.73363 18.3335C11.417 22.2418 14.5836 24.6668 18.0003 24.6668C21.417 24.6668 24.5836 22.2418 26.267 18.3335C26.3129 18.2284 26.3365 18.1149 26.3365 18.0002C26.3365 17.8854 26.3129 17.772 26.267 17.6668ZM18.0003 23.0002C15.3503 23.0002 12.8586 21.0918 11.417 18.0002C12.8586 14.9085 15.3503 13.0002 18.0003 13.0002C20.6503 13.0002 23.142 14.9085 24.5836 18.0002C23.142 21.0918 20.6503 23.0002 18.0003 23.0002ZM18.0003 14.6668C17.341 14.6668 16.6966 14.8623 16.1484 15.2286C15.6002 15.5949 15.173 16.1155 14.9207 16.7246C14.6684 17.3336 14.6024 18.0039 14.731 18.6505C14.8596 19.2971 15.1771 19.891 15.6433 20.3572C16.1095 20.8234 16.7034 21.1408 17.35 21.2694C17.9966 21.3981 18.6668 21.3321 19.2759 21.0798C19.885 20.8275 20.4056 20.4002 20.7719 19.8521C21.1381 19.3039 21.3336 18.6594 21.3336 18.0002C21.3336 17.1161 20.9824 16.2683 20.3573 15.6431C19.7322 15.018 18.8844 14.6668 18.0003 14.6668ZM18.0003 19.6668C17.6707 19.6668 17.3484 19.5691 17.0743 19.3859C16.8003 19.2028 16.5866 18.9425 16.4605 18.638C16.3344 18.3334 16.3013 17.9983 16.3657 17.675C16.43 17.3517 16.5887 17.0547 16.8218 16.8217C17.0549 16.5886 17.3518 16.4298 17.6751 16.3655C17.9985 16.3012 18.3336 16.3342 18.6381 16.4604C18.9426 16.5865 19.2029 16.8001 19.3861 17.0742C19.5692 17.3483 19.667 17.6705 19.667 18.0002C19.667 18.4422 19.4914 18.8661 19.1788 19.1787C18.8663 19.4912 18.4423 19.6668 18.0003 19.6668Z" fill="white" />
                </svg>
              </i>
            </div>
            <div class="flex mt-6 items-center gap-2">
              <p class="text-neutrals-100 text-5xl font-semibold">{{ new Intl.NumberFormat('en-US').format(job.total_views)}}</p>
              <p class="flex items-center">
                <span class="text-lg font-medium" :class="job.job_views_increased ? 'text-purple': 'text-red'">{{job.job_views_changed_by}}%
                </span>
                <i>
                  <IconIncrease v-if="job.job_views_increased" />
                  <IconDecrease v-else />
                </i>
              </p>
            </div>
            <span class="">vs last day</span>
          </div>
          <div class="border border-neutrals-20 p-4 flex-1">
            <div class="flex justify-between">
              <div class="text-lg text-neutrals-60 font-semibold">
                Total Applied
              </div>
              <i class="aria-hidden">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="18" fill="#7B61FF" />
                  <path d="M25.5 19.0457C23.1171 20.0092 20.5704 20.503 18 20.4998C15.3475 20.4998 12.8167 19.9832 10.5 19.0457M18 17.9998H18.0083M21.3333 12.9998V11.3332C21.3333 10.8911 21.1577 10.4672 20.8452 10.1547C20.5326 9.8421 20.1087 9.6665 19.6667 9.6665H16.3333C15.8913 9.6665 15.4674 9.8421 15.1548 10.1547C14.8423 10.4672 14.6667 10.8911 14.6667 11.3332V12.9998H21.3333ZM12.1667 24.6665H23.8333C24.2754 24.6665 24.6993 24.4909 25.0118 24.1783C25.3244 23.8658 25.5 23.4419 25.5 22.9998V14.6665C25.5 14.2245 25.3244 13.8006 25.0118 13.488C24.6993 13.1754 24.2754 12.9998 23.8333 12.9998H12.1667C11.7246 12.9998 11.3007 13.1754 10.9882 13.488C10.6756 13.8006 10.5 14.2245 10.5 14.6665V22.9998C10.5 23.4419 10.6756 23.8658 10.9882 24.1783C11.3007 24.4909 11.7246 24.6665 12.1667 24.6665Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </i>
            </div>
            <div class="flex mt-6 items-center gap-2">
              <p class="text-neutrals-100 text-5xl font-semibold">{{ new Intl.NumberFormat('en-US').format(job.total_applied)}}</p>
              <p class="flex items-center">
                <span class="text-lg font-medium" :class="job.job_applied_increased ? 'text-purple': 'text-red'">{{job.job_applied_changed_by}}%
                </span>
                <i>
                  <IconIncrease v-if="job.job_applied_increased" />
                  <IconDecrease v-else />
                </i>
              </p>
            </div>
            <span class="">vs last day</span>
          </div>
        </div>
        <div class="p-4 lg:p-6 mt-6 border border-neutrals-20">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between time-select gap-4">
            <h5 class="text-neutrals-100">Job Listing View stats</h5>
            <v-select v-model="selected" :searchable="false" :clearable="false" :options="['Last 7 days', 'Last Month', 'Last Year', 'Custom']" class="text-neutrals-60 w-full lg:w-auto">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                  <IconChervonDown /></span>
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div class="lg:basis-1/3">
        <div class="border border-neutrals-20 p-4 lg:p-6 mb-6">
          <h5 class="text-neutrals-100 mb-4">Traffic channel</h5>
        </div>
        <div class="border border-neutrals-20 p-4 lg:p-6">
          <h5 class="text-neutrals-100 mb-4">Visitors by country</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import IconIncrease from '@/components/icons/IconIncrease.vue'
import IconDecrease from '@/components/icons/IconDecrease.vue'
const selected = ref('Last 7 days')
import IconChervonDown from '@/components/icons/IconChervonDown.vue'

const job = ref({
  total_views: 23232,
  job_views_increased: true,
  job_views_changed_by: 6.4,
  total_applied: 21,
  job_applied_increased: false,
  job_applied_changed_by: 0.4,
})
</script>
<style>
.time-select .vs-select {
  height: 50px;
}

.time-select .vs__selected {
  height: 48px;
}

.time-select .vs__search {
  display: none;
}

.time-select .vs__dropdown-toggle {
/*  width: 200px;*/
}
</style>
