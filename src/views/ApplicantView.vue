<template>
  <div class="border-r border-soft max-w-xs w-full p-2">
    <h2 class="text-heading text-xl font-bold">{{candidate.name}}</h2>
    <div class="my-4">
      <RouterLink v-for="item in applicantSidebar" :to="{name: item.name}" class="h-8 flex items-center px-2 hover:bg-mute block rounded-lg text-color-text text-sm">
        <i class="mr-2">
          <component :is="item.icon" class="flex-shrink h-5 w-5" aria-hidden="true" />
        </i>
        <span>{{item.text}}</span>
      </RouterLink>
    </div>
    <h4 class="text-heading font-semibold text-sm">Contact information</h4>
    <address class="flex items-center h-6 text-color-text text-sm mt-1 not-italic">
      <i class="mr-2">
        <EnvelopeIcon class="h-5 w-5" aria-hidden="true" />
      </i>
      <a :href="`mailto:${candidate.email}`" target="_blank" class="hover:underline">{{candidate.email}}</a>
    </address>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CandidateList from "../components/CandidateList.vue";
import { useRoute, RouterView } from "vue-router";
import api from "../services/api"

import {
  EnvelopeIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { slug, stage, candidate_id } = route.params
const candidate = ref({})
const job = ref({})
let error = ref([])
const applicantSidebar = [
  { text: 'Overview', name: 'OverviewApplicant', icon: DocumentMagnifyingGlassIcon },
  { text: 'Resume', name: 'OverviewApplicant', icon: DocumentTextIcon },
  { text: 'Messages', name: 'OverviewApplicant', icon: ChatBubbleLeftIcon },
  { text: 'Private notes', name: 'OverviewApplicant', icon: PencilSquareIcon },
]
onMounted(() => {
  api.get(`/jobs/${slug}/candidates/${candidate_id}?stage=${stage}`)
    .then((response) => {
      candidate.value = response.data;
    })
    .catch((e) => {
      error.value.push(e);
    })
})
</script>
