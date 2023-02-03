<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('closeNewRoom')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="$emit('closeNewRoom')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-xl font-semibiold text-primary">Candidates</DialogTitle>
                  <div class="mt-2">
                    <ul role="list" class="relative z-0 divide-y divide-gray-200">
                      <li v-for="participant in participants" :key="participant.id" class="bg-white">
                        <div class="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                          <div class="flex-shrink-0">
                            <img v-if="participant.profile_picture" class="h-10 w-10 rounded-full" :src="participant.profile_picture" :alt="`${participant.name}'s avatar`" />
                            <div v-else class="h-10 w-10 rounded-full bg-neutrals-100 text-neutrals-0 font-semibiold flex items-center justify-center">
                              {{participant.name && participant.name[0]}}
                            </div>
                          </div>
                          <div class="min-w-0 flex-1">
                            <a href="#" @click="$emit('createNewRoom', participant.id), $emit('closeNewRoom')" class="focus:outline-none">
                              <!-- Extend touch target to entire panel -->
                              <span class="absolute inset-0" aria-hidden="true" />
                              <p class="text-sm font-medium text-gray-900">{{ participant.name }}</p>
                              <p class="truncate text-sm text-gray-500">{{ participant.email }}</p>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'


defineProps({
  open: { type: Boolean, default: false },
  participants: { type: Array, default: []},
})
</script>
