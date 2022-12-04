<script setup>
import {
  UserCircleIcon,
  NoSymbolIcon
} from '@heroicons/vue/24/outline'

import { RouterLink } from 'vue-router'

defineProps({
  candidates: Array
})
</script>
<template>
  <div id="candidates">
    <section v-if="candidates.length > 0">
      <div v-for="(candidate, index) in candidates" :key="candidate.id">
        <RouterLink
          :class="[$route.params.candidate_id == candidate.id ? 'bg-soft' :'', 'h-8 flex items-center px-2 hover:bg-mute block rounded-lg text-color-text text-sm']" :to="{name: 'Applicant', params: { candidate_id: candidate.id}}">
          <UserCircleIcon class="flex-shrink h-5 w-5" aria-hidden="true" />
          <span class="ml-2 text-md">
            {{candidate.name}}
          </span>
        </RouterLink>
      </div>
    </section>
    <section v-else class="text-center pt-8 flex flex-col items-center">
      <i>
        <NoSymbolIcon class="flex-shrink h-5 w-5 text-heading" aria-hidden="true" />
      </i>
      <h4 class="text-heading font-semibold mt-1">No candidates</h4>
      <p class="text-color-text text-xs leading-5">There are currently no candidates in this hiring stage</p>
    </section>
  </div>
</template>
<style scoped>
#candidates a {
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
  padding-left: 0.375rem;
  padding-right: 10px;
  margin-bottom: 2px;
  flex-shrink: 0;
  cursor: pointer;
}

#jobsidebar a span {
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
