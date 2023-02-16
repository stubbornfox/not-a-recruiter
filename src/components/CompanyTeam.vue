<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Basic Information</label>
              <span class="text-neutrals-60">Add team members of your company</span>
            </div>
            <div class="lg:basis-96 grow flex justify-between items-center">
              <h4 class="text-neutrals-100">1 Member</h4>
              <button type="submit" class="inline-flex justify-center rounded-md border border-transparent py-2 px-4 font-medium text-white bg-primary font-bold">
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
                Add Member</button>
            </div>
          </div>
          <hr />
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
</script>
