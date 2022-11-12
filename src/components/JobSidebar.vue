<script setup>
  import {
    CogIcon,
    ShareIcon,
    InboxIcon,
    FolderIcon,
    DocumentCheckIcon,
    ArchiveBoxIcon,
  } from '@heroicons/vue/24/outline'

  import { RouterLink } from "vue-router";

  const jobStages = [
            {text: 'Inbox', code: 'inbox', icon: InboxIcon},
            {text: 'Screen', code: 'screen', icon: FolderIcon},
            {text: 'Interview', code: 'interview', icon: FolderIcon},
            {text: 'Decide', code: 'decide', icon: FolderIcon},
            {text: 'Offer', code: 'offer', icon: FolderIcon},
            {text: 'Hired', code: 'hired', icon: DocumentCheckIcon},
            {text: 'Archived', code: 'archived', icon: ArchiveBoxIcon},
          ]
  defineProps({
    job: {
      type: Object,
      default(rawProps) {
        return { inbox: 0, screen: 0, interview: 0, decide: 0, offer: 0, archived: 0, hired: '0' }
      }
    },
    currentStage: {
      type: String,
      default: 'inbox',
    }
})
</script>

<template>
  <div id="jobsidebar" class="pt-4">
    <RouterLink v-for="item in jobStages"
      :key="item.code"
      :to="{ name: 'JobStageApplicant', params: {stage: item.code}}"
      @click="$emit('changeStage', item.code, item.text)"
      :class="[item.text == currentStage ? 'bg-gray-100 text-gray-900' :'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'stage-stat justify-between']">
       <div class="flex">
        <component :is="item.icon" class="flex-shrink h-6 w-6" aria-hidden="true" />
        <span class="ml-2">{{item.text}}</span>
      </div>
      <span>{{job[item.code]}}</span>
    </RouterLink>
    <hr class="my-6 border-0">
    <div class="mt-3">
      <RouterLink
        :to="{ name: 'JobSetupDetails'}"
        :class="[currentStage == 'Job setup' ? 'bg-gray-100 text-gray-900' :'text-gray-600 hover:bg-gray-50 hover:text-gray-900','flex']"
        @click="$emit('setupJob')">
        <i>
          <CogIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
        </i>
        <span class="ml-2 flex-grow-1">Job setup</span>
      </RouterLink>
      <a :class="[currentStage == 'Distribution' ? 'bg-gray-100 text-gray-900' :'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'flex']">
        <ShareIcon class="h-6 w-6  flex-shrink-0" aria-hidden="true" />
        <span class="ml-2 flex-grow-1">Distribution</span>
      </a>
    </div>

  </div>
</template>

<style scoped>
  #jobsidebar {
    color: rgb(82, 82, 82);
    border-right: 1px solid rgb(229, 229, 229);
    overflow-y: auto;
  }

  #jobsidebar a {
    height: 32px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    padding-left: 0.625rem;
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

