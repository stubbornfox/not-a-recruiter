<template>
  <FormKit type="form" id="customDomainForm" @submit="submitHandler" form-class="flex-grow-1 space-y-8 divide-y divide-gray-200" :actions=false :incomplete-message=false :value="job_board" #default="{ value }" novalidate>
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h2 class="text-lg font-medium leading-6 text-heading">Job board custom domain</h2>
          <p class="mt-1 text-sm text-gray-500">Here's where you can specify the custom domain configured for your job board.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit type="url" name="custom_domain_url" id="custom_domain_url" label="Custom Domain" v-model="custom_domain_url" :sections-schema=" {
            prefix: {
              $el: 'div',
              attrs: {
                class: 'flex text-color-text items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
              },
              children: 'https://',
            },
          }" @input="removeProtocol" />
          <div>
            <label class="block text-sm font-medium text-heading">CName</label>
            <p class="text-xs text-color-text mb-3">
              Supply this to your DNS provider for the destination of CNAME or ALIAS records.
            </p>
            <div class="mt-2 coppy-field p-2 text-color-text border border-color bg-transparent sm:text-sm rounded-md flex justify-between">
              <span>{{job_board.cname}}</span>
              <i @click="copyCname">
                <ClipboardDocumentIcon class="w-5 h-5 text-heading" />
              </i>
            </div>
            <div class="border-l-4 pl-4 border-soft mt-3">
              <label class="block text-sm font-medium text-heading">SSL Certificate</label>
              <p class="my-2">
                <span v-if="job_board.custom_domain_valid" class="flex items-center text-green-600">
                  <span>Valid</span>
                  <i>
                    <CheckCircleIcon class="w-5 h-5 ml-1" />
                  </i>
                </span>
                <span v-else class="flex items-center text-red-400">
                  <span>Invalid</span>
                  <i>
                    <XCircleIcon class="w-5 h-5 ml-1" />
                  </i>
                </span>
              </p>
              <button class="inline-flex justify-center rounded-md border border-transparent bg-soft py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-smoke focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
    </div>
  </FormKit>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user';
import { getNode } from '@formkit/core'
import { useJobBoardStore } from '@/stores/job_board';
import { useToast } from 'vue-toastification'
import { ClipboardDocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  job_board: {
    type: Object
  }
})

let custom_domain_url = ref(props.job_board.custom_domain_url)
const { customDomain } = useJobBoardStore()

const submitHandler = async (data) => {
  customDomain(props.job_board.id, { custom_domain_url: custom_domain_url.value })
}

function removeProtocol(url) {
  custom_domain_url.value = url.replace(/^https?:\/\//, '')
}

function copyCname() {
  navigator.clipboard.writeText(props.job_board.cname).then((clipText) =>
    useToast().info('Copied')
  )
}
</script>
