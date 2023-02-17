<template>
  <FormKit type="form" @submit="(data) => $emit('save', serialize(data))" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="company" novalidate>
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <div class="flex flex-col lg:flex-row gap-6 lg:w-full lg:gap-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Basic Information</label>
              <span class="text-neutrals-60">Add elsewhere links to your company profile. You can add only username without full https links.</span>
            </div>
            <hr class="lg:hidden" />
            <div class="lg:basis-96 flex flex-col gap-6 grow max-w-xl">
              <FormKit v-for="s in socials" :name="s" :id="s" type="url" :label="s" inner-class="mt-1" label-class="capitalize" validation="url" />
            </div>
          </div>
          <hr class="hidden lg:block" />
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
const socials = ['instagram', 'twitter', 'facebook', 'linkedin', 'youtube']
const props = defineProps({
  company: { type: Object, default: () => {} },
})
let company = props.company;
const serialize = (data) => {
  const { id, instagram, twitter, facebook, linkedin, youtube, ..._ } = data;
  return { id, instagram, twitter, facebook, linkedin, youtube }
}
</script>
