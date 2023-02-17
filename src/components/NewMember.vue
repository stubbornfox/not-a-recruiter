<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="flex justify-between items-center">
                  <DialogTitle as="h4" class="text-neutrals-100 font-semibiold">Add new member</DialogTitle>
                  <button type="button" class="rounded-md bg-white text-gray-400 hover:bg-tertiary focus:outline-none p-2" @click="$emit('close')">
                    <span class="sr-only">Close</span>
                    <IconXMark aria-hidden="true" />
                  </button>
                </div>
                <hr class="my-6 -mx-6" />
                <FormKit type="form" @submit="(data) => $emit('add', data)" form-class="flex flex-col gap-6" :actions=false :incomplete-message=false novalidate>
                  <FormKit type="email" name="email" label="Email" wrapper-class="" inner-class="grow mt-0" validation="required|email" />
                  <FormKit type="text" name="name" label="Name" wrapper-class="" inner-class="grow mt-0"  validation="required" />
                  <FormKit type="text" name="position" label="Position" wrapper-class="" inner-class="grow mt-0" />
                  <div class="flex items-center justify-end">
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-pink-700 py-2 px-4 font-medium text-white bg-primary font-bold">Save member</button>
                  </div>
                </FormKit>
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
import IconXMark from '@/components/icons/IconXMark.vue'

defineProps({
  open: { type: Boolean, default: false },
})
</script>
