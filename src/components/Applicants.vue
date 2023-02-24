<template>
  <div v-if="applicants">
    <div class="flex justify-between py-6">
      <h5 class="text-neutrals-100">Total Applicants: {{applicants.length}}</h5>
      <div class="flex items-center gap-x-8">
        <FormKit type="form" class="flex items-center gap-2" :actions="false" @submit="(data) => $emit('search', data)">
          <div class="flex items-center gap-2">
            <FormKit type="text" placeholder="Search command" name="query" class="pl-12 border-neutrals-20 lg:w-80" inner-class="flex items-center mt-0" input-class="pl-10">
              <template #prefixIcon="context">
                <i class="-mr-8  z-10">
                  <IconSearch /></i>
              </template>
            </FormKit>
            <Popover class="relative">
              <PopoverButton class="border border-neutrals-20 flex items-center px-4 py-3 gap-2 outline-none">
                <IconFilter aria-hidden="true" />
                <span class="text-neutrals-100 font-mediumn leading-none">Filter</span>
              </PopoverButton>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                  <div class="w-screen max-w-sm flex-auto overflow-hidden bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-2xl">
                    <div class="flex flex-col lg:flex-row gap-6 p-6">
                      <FormKit type="checkbox" name="stages" label="Employment Type" :options="hiringStage" fieldset-class="lg:w-full" inner-class="lg:mt-0 lg:mr-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4" options-class="lg:basis-96 lg:mt-0 grid grid-cols-2 lg:grid-cols-1">
                        <template #legend="context">
                          <div class="lg:basis-64">
                            <label class="block font-semibold text-neutrals-100 mb-4">Hiring Stage</label>
                          </div>
                        </template>
                      </FormKit>
                      <FormKit type="checkbox" name="scores" label="Employment Type" :options="scores" fieldset-class="lg:w-full" inner-class="lg:mt-0 lg:mr-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4" options-class="lg:basis-96 lg:mt-0 grid grid-cols-2 lg:grid-cols-1">
                        <template #legend="context">
                          <div class="lg:basis-64">
                            <label class="block font-semibold text-neutrals-100 mb-4">Ranking Score</label>
                          </div>
                        </template>
                      </FormKit>
                      <FormKit type="checkbox" name="experiences" label="Employment Type" :options="experiences" fieldset-class="lg:w-full" inner-class="lg:mt-0 lg:mr-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4" options-class="lg:basis-96 lg:mt-0 grid grid-cols-2 lg:grid-cols-1">
                        <template #legend="context">
                          <div class="lg:basis-64">
                            <label class="block font-semibold text-neutrals-100 mb-4">Years Experience</label>
                          </div>
                        </template>
                      </FormKit>
                      <FormKit type="checkbox" name="degrees" label="Employment Type" :options="degrees" fieldset-class="lg:w-full" inner-class="lg:mt-0 lg:mr-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4" options-class="lg:basis-96 lg:mt-0 grid grid-cols-2 lg:grid-cols-1">
                        <template #legend="context">
                          <div class="lg:basis-64">
                            <label class="block font-semibold text-neutrals-100 mb-4">Degree</label>
                          </div>
                        </template>
                      </FormKit>
                    </div>
                    <div class="bg-gray-50 p-6">
                      <div class="flex items-center gap-x-3">
                        <button type="submit" class="bg-indigo-600/10 py-1.5 px-2.5 font-semibold text-primary">Search</button>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </div>
        </FormKit>
        <div class="bg-light-blue p-1">
          <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'pipeline'}" @click="view='pipeline'">Pipeline View</button>
          <button class="font-semibold text-primary py-2 px-3" :class="{'bg-white': view == 'table'}" @click="view='table'">Table View</button>
        </div>
      </div>
    </div>
    <section v-if="applicants.length > 0">
      <table class="lg:table-auto w-full" v-if="view=='table'">
        <thead>
          <tr class="border border-neutrals-20">
            <th class="p-4">
              <input type="checkbox" class="focus:ring-0 focus:ring-transparent border-2 border-neutrals-20 rounded w-6 h-6 text-primary" name="allCbx" @change="selectAll"></th>
            <th class="p-4">Full Name</th>
            <th class="p-4">Score</th>
            <th class="p-4">Hiring Stage</th>
            <th class="p-4">Applied date</th>
            <th class="p-4">Job role</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>
        <tbody class="mt-2 border border-neutrals-20">
          <tr v-for="applicant in applicants" :key="applicant.id" class="even:bg-white odd:bg-light-gray text-neutrals-100 font-medium">
            <td class="px-4">
              <input type="checkbox" class="focus:ring-0 focus:ring-transparent border-2 border-neutrals-20 rounded w-6 h-6 text-primary" :name="`cbx-#{applicant.id}`" v-model="applicant.checked">
            </td>
            <td class="py-7 px-6 font-medium">{{ applicant.name }}</td>
            <td class="py-7 px-6 font-medium">
              <div class="flex items-center gap-2">
                <IconRate />
                <span class="font-medium text-neutrals-100">{{ applicant.score }}</span>
              </div>
            </td>
            <td class="py-7 px-6 font-medium">
              <span class="border px-3 py-2 text-sm font-semibold" :class="`text-${getColor(applicant)} border-${getColor(applicant)}`" style="border-radius: 80px;">
                {{ stages[applicant.stage].text }}
              </span>
            </td>
            <td class="py-7 px-6 font-medium">
              <time class="font-medium" :datetime="applicant.created_at" format="YYYY MM DD">
                {{ $filters.formatDate(applicant.created_at) }}
              </time>
            </td>
            <td class="py-7 px-6 text-center font-medium">{{ applicant.job_role }}</td>
            <td class="py-7 px-6">
              <div class="flex items-center gap-4">
                <RouterLink :to="{name: 'Applicant', params: { id: applicant.id}}" class="text-primary bg-light-blue border border-primary py-3 px-6 flex items-center justify-center">
                  <span class="text-sm font-bold">
                    See Applicantion
                  </span>
                </RouterLink>
                <ApplicantActionComponent :applicant="applicant" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="view=='pipeline'" class="flex gap-4 justify-stretch">
        <div class="bg-green bg-yellow bg-red bg-blue bg-purple
          border-t-green border-t-yellow border-t-red border-t-blue border-t-purple
         hidden text-green text-red text-purple text-blue text-red border-green border-yellow border-red border-blue border-purple">
        </div>
        <div v-for="stage in Object.keys(stages)" class="flex-1">
          <Pipeline :pipeline="stages[stage].text" :applicants="getApplicants(stage)" :color="stages[stage].color" />
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
import Pipeline from "@/components/Pipeline.vue"
import ApplicantActionComponent from "@/components/ApplicantActionComponent.vue"
import IconRate from "@/components/icons/IconRate.vue"
import IconSearch from '@/components/icons/IconSearch.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import { stages } from "@/const"
const props = defineProps({
  applicants: { type: Array, default: () => [] },
})

const hiringStage = {
  "review": "Review",
  "shortlisted": "Shortlisted",
  "interview": "Interview",
  "hired": "Hired",
  "declined": "Declined",
}

const scores = {
  "< 3": " < 3",
  ">=3": ">=3",
  "5": "5",
}

const degrees = {
  "Associate": "Associate degree",
  "bachelor": "Bachelor’s degree",
  "master": "Master’s degree",
  "doctoral": "Doctoral degree",
}

const experiences = {
  "0-1": "0-1 year",
  "1-2": "1-2 years",
  " > 3": " > 3 years",
  " > 5": "> 5 years",
}



const view = ref('table')

function getApplicants(stage) {
  return props.applicants.filter(a => a.stage == stage)
}

function getColor(applicant) {
  return stages[applicant.stage].color
}

function selectAll(event) {
  const value = event.currentTarget.checked
  props.applicants.forEach((a) => {
    a.checked = value
    console.log(a)
  })
}
</script>
<style scoped>
thead::after {
  content: "";
  display: block;
  height: 1.5em;
  width: 100%;
  background: white;
}
</style>
