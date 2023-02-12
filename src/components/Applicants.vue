<template>
  <div v-if="applicants">
    <div class="flex justify-between py-6">
      <h5 class="text-neutrals-100">Total Applicants: {{applicants.length}}</h5>
      <div class="flex items-center gap-x-8">
        <form>
          <input type="text" placeholder="Search Applicants" class="border-neutrals-20" />
        </form>
        <div class="bg-light-blue p-1">
          <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'pipeline'}" @click="view='pipeline'">Pipeline View</button>
          <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'table'}" @click="view='table'">Table View</button>
        </div>
      </div>
    </div>
    <section v-if="applicants.length > 0">
      <table class="lg:table-auto w-full" v-if="view=='table'">
        <tr class="border-y border-neutrals-20">
          <th class="p-6">Cbx</th>
          <th class="p-6">Full Name</th>
          <th class="p-6">Score</th>
          <th class="p-6">Hiring Stage</th>
          <th class="p-6">Applied date</th>
          <th class="p-6">Job role</th>
          <th class="p-6">Action</th>
        </tr>
        <tr v-for="applicant in applicants" :key="applicant.id" class="even:bg-white odd:bg-neutrals-10i text-neutrals-100 font-medium">
          <td>cbx</td>
          <td class="py-7 px-6 font-medium">{{ applicant.name }}</td>
          <td class="py-7 px-6 font-medium">{{ applicant.score }}</td>
          <td class="py-7 px-6 font-medium">{{ applicant.stage }}</td>
          <td class="py-7 px-6 font-medium">
            <time class="font-medium" :datetime="applicant.created_at" format="YYYY MM DD">
              {{ $filters.formatDate(applicant.created_at) }}
            </time>
          </td>
          <td class="py-7 px-6 text-center font-medium">{{ applicant.job_role }}</td>
          <td class="py-7 px-6">
            <RouterLink :to="{name: 'Applicant', params: { id: applicant.id}}" class="text-primary bg-tertiary border border-primary py-3 px-6 flex items-center justify-center">
              <span class="text-sm font-bold">
                View Applicant
              </span>
            </RouterLink>
            <!-- <ApplicantActionComponent :applicant="applicant" /> -->
          </td>
        </tr>
      </table>
      <div v-if="view=='pipeline'" class="flex gap-4 justify-stretch">
        <div class="bg-green bg-yellow bg-red bg-blue bg-purple
          border-t-green border-t-yellow border-t-red border-t-blue border-t-purple
         hidden">
        </div>
        <div v-for="stage in Object.keys(stages)" class="flex-1">
          <Pipeline :pipeline="stages[stage].text" :applicants="getApplicants(stage)" :color="stages[stage].color"/>
        </div>
      </div>
    </section>
    <section v-else class="text-center pt-8 flex flex-col items-center">
      <i>
        <NoSymbolIcon class="flex-shrink h-5 w-5 text-heading" aria-hidden="true" />
      </i>
      <h4 class="text-neutrals-100">No applicants</h4>
      <p class="text-sm leading-5">There are currently no applicants in this hiring stage</p>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import Pipeline from "@/components/Pipeline.vue";

const props = defineProps({
  applicants:{ type: Array, default: () => [] },
})

const view = ref('table')
const stages = {
  review: { text: 'In Review', color: 'yellow' },
  shortlisted: { text: 'Shortlisted', color: 'purple' },
  interview: { text: 'Interview', color: 'blue' },
  hired: { text: 'Hired', color: 'green' },
  declined: { text: 'Declined', color: 'red' }
}

function getApplicants(stage) {
  return props.applicants.filter(a=> a.stage  == stage)
}
</script>
