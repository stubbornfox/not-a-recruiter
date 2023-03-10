<template>
  <FormKit type="form" id="customDomainForm" @submit="submitHandler" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="company" novalidate>
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <div class="flex flex-col lg:flex-row gap-6 lg:w-full lg:gap-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Basic Information</label>
              <span class="text-neutrals-60">Here's where you can specify the custom domain configured for your job board.</span>
            </div>
            <hr class="lg:hidden" />
            <div class="lg:basis-96 flex flex-col gap-6 grow max-w-xl">
              <FormKit type="url" name="custom_domain_url" id="custom_domain_url" label="Custom Domain" v-model="custom_domain_url" :sections-schema=" {
            prefix: {
              $el: 'div',
              attrs: {
                class: 'flex text-color-text items-center rounded-l px-2 border border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-mute',
              },
              children: 'https://',
            },
          }" @input="removeProtocol" />
              <div v-if="cname">
                <label class="block text-sm font-medium text-heading">CName</label>
                <p class="text-xs text-color-text mb-3">
                  Supply this to your DNS provider for the destination of CNAME or ALIAS records.
                </p>
                <div class="mt-2 coppy-field p-2 text-color-text border border-color bg-transparent sm:text-sm rounded-md flex justify-between">
                  <span>{{cname}}</span>
                  <i @click="copyCname" class="cursor-pointer">
                    <ClipboardDocumentIcon class="w-5 h-5 text-heading" />
                  </i>
                </div>
                <div class="border-l-4 pl-4 border-soft mt-3">
                  <label class="block text-sm font-medium text-heading">SSL Certificate</label>
                  <p class="my-2">
                    <span v-if="custom_domain_valid" class="flex items-center text-green-600">
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
                  <button type="button" @click="refresh" class="justify-center rounded-md border border-transparent bg-soft py-2 px-4 text-sm font-medium text-heading shadow-sm hover:bg-mute focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Refresh</button>
                </div>
              </div>
            </div>
          </div>
          <hr class="" />
          <div class="mt-6 grid grid-cols-1 gap-y-6">
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center my-6 justify-end">
      <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold">Save Changes</button>
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
  company: { type: Object, default: () => {} },
})

let company = props.company
let custom_domain_url = ref(props.company.custom_domain_url)
let custom_domain_valid = ref(props.company.custom_domain_valid)
let cname = ref(props.company.hostname)

const jobBoardStore = useJobBoardStore()
const { customDomain, refreshSSL } = jobBoardStore
const { job_board } = storeToRefs(jobBoardStore)

const submitHandler = async (data) => {
  customDomain(props.company.job_board_id, { custom_domain_url: custom_domain_url.value }).then(() => {
    cname.value = job_board.value.hostname
    custom_domain_valid.value = job_board.value.custom_domain_valid
  })
}

function removeProtocol(url) {
  custom_domain_url.value = url.replace(/^https?:\/\//, '')
}

function copyCname() {
  navigator.clipboard.writeText(cname.value).then((clipText) =>
    useToast().info('Copied')
  )
}

function refresh() {
  refreshSSL(props.company.job_board_id).then(
    () =>
    custom_domain_valid.value = job_board.value.custom_domain_valid)
}
</script>
