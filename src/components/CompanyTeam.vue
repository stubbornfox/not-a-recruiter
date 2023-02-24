<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <div class="overflow-y-auto">
      <div class="mt-6 grid grid-cols-1 gap-y-6">
        <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
          <div class="lg:basis-64">
            <label class="block font-semibold text-neutrals-100">Basic Information</label>
            <span class="text-neutrals-60">Add team members of your company</span>
          </div>
          <div class="lg:basis-96 grow">
            <div class="flex justify-between items-center">
              <h4 class="text-neutrals-100">{{members.length}} {{members.length == 1 ? 'Member': 'Members'}}</h4>
              <div class="flex items-center gap-12">
                <button type="submit" class="inline-flex justify-center rounded-md border border-transparent py-2 px-4  bg-primary" @click="showAddMemberModal=true">
                  <i>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_29612_32526)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_29612_32526">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </i>
                  <span class="text-white font-bold">Add Member</span>
                </button>
                <div class="flex">
                  <button @click="view='grid'" class="w-10 h-10 items-center flex rounded justify-center" :class="view=='grid'? 'bg-tertiary':''">
                    <IconGridView :color="view=='grid' ? '#7330DF' : '#A8ADB7'" />
                  </button>
                  <button @click="view='list'" class="w-10 h-10 items-center flex rounded justify-center" :class="view=='list'? 'bg-tertiary':''">
                    <IconListView :color="view=='list' ? '#7330DF' : '#A8ADB7'" />
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <div :class="view == 'grid' ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-6'">
                <div v-for="member in members" class="flex items-center justify-center border border-neutrals-20 rounded p-6" :class="view == 'grid'? 'flex-col':'flex-row justify-between'">
                  <img :src="member.profile_picture" class="w-20 h-20 rounded-full" v-if="member.profile_picture"/>
                  <div v-else class="w-20 h-20 rounded-full bg-light-gray flex items-center justify-center text-4xl font-bold text-primary">
                    {{member.full_name[0]}}
                  </div>
                  <p class="text-neutrals-100 mt-4 font-semibold">{{member.full_name}}</p>
                  <p class="text-neutrals-60 mt-1">{{member.position || 'Human Resouce'}}</p>
                  <div class="mt-4 flex gap-1">
                    <a class="" :href="member.instagram">
                      <IconTeamInstagram />
                    </a>
                    <a class="" :href="member.linkedin">
                      <IconTeamLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NewMember :open="showAddMemberModal" @add="addMemberHandler" @close="showAddMemberModal = false" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import IconListView from '@/components/icons/IconListView.vue'
import IconGridView from '@/components/icons/IconGridView.vue'
import IconTeamLinkedin from '@/components/icons/IconTeamLinkedin.vue'
import IconTeamInstagram from '@/components/icons/IconTeamInstagram.vue'
import { useCompanyStore } from '@/stores/company'
import { storeToRefs } from 'pinia'
import NewMember from '@/components/NewMember.vue'
const showAddMemberModal = ref(false)

const companyStore = useCompanyStore()
const { members } = storeToRefs(companyStore)
const { fetchTeam, addMember } = companyStore

const view = ref('grid')
onMounted(() => { fetchTeam() })
async function addMemberHandler(data) {
  await addMember(data).then(() => showAddMemberModal.value = false)
}
</script>
