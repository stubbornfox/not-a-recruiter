<template>
  <FormKit type="form" id="jobForm" @submit="saveJob" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="editJob">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Basic Information</label>
              <span class="text-neutrals-60">Add elsewhere links to your company profile. You can add only username without full https links.</span>
            </div>
            <div class="lg:basis-96 flex flex-col gap-6 grow max-w-xl">
              <FormKit v-for="s in socials" :name="s" :id="s" type="url" :label="s" inner-class="mt-1"  label-class="capitalize"/>
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
const socials = ['instaram','twitter', 'facebook', 'linkedin', 'youtube']
</script>
