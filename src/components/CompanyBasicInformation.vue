<template>
  <div class="py-6 border-b border-neutrals-20">
    <div class="text-lg text-neutrals-100 font-semibold">Basic Information</div>
    <p class="text-neutrals-60">This is company information that you can update anytime.</p>
  </div>
  <FormKit type="form" @submit="(data) => $emit('save', serialize(data))" form-class="h-full overflow-y-scroll" :actions=false :incomplete-message=false :value="company">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="overflow-y-auto">
        <div class="mt-6 grid grid-cols-1 gap-y-6">
          <FormKit type="file" label="Job board logo" accept=".png,.jpg,.svg,.jpeg, .gif" help="Your logo should be a square image with dimensions of at least 128px. PNG, JPG, and SVG file types are acceptable" @change="onFileChange" name="logo_image" wrapper-class="lg:flex lg:w-full lg:gap-x-28 lg:content-start" inner-class="lg:basis-96 lg:mt-0" help-class="lg:pl-64 lg:ml-28 lg:-mt-4">
            <template #label="context">
              <div class="lg:basis-64">
                <label :class="context.classes.label">Company Logo</label>
                <span class="text-neutrals-60">This image will be shown publicly as company logo.</span>
              </div>
            </template>
          </FormKit>
          <div v-show="url">
            <img :src="url" class="w-20 h-20 rounded border-4 border-mute" />
          </div>
          <hr />
          <div class="flex flex-col lg:flex-row gap-y-4 lg:w-full lg:gap-x-28 lg:content-start">
            <div class="lg:basis-64">
              <label class="block font-semibold text-neutrals-100">Company Details</label>
              <span class="text-neutrals-60">Introduce your company core info quickly to users by fill up company details</span>
            </div>
            <div class="lg:basis-96 flex flex-col gap-6 grow max-w-xl">
              <FormKit name="name" id="name" type="text" label="Company Name" inner-class=" mt-1" />
              <FormKit name="website_url" id="website_url" type="text" label="Website" inner-class=" mt-1" />
              <FormKit :type="selectInput" :multiple="true" name="locations" inner-class="mt-1" label="Location" :taggable="true">
              </FormKit>
              <div class="flex flex-col lg:flex-row lg: gap-6">
                <div class="flex-1">
                  <FormKit :type="selectInput" :options="businessSizes" name="size" inner-class="mt-1" label="Employee" :reduce="(size) => size.code" />
                </div>
                <div class="flex-1">
                  <FormKit :type="selectInput" :options="industries" name="industry" inner-class="mt-1" label="Industry" />
                </div>
              </div>
              <div>
                <label class="block font-semibold text-neutrals-100">Date founded</label>
                <div class="flex gap-4 lg:gap-6 items-end">
                  <div class="flex-1">
                    <FormKit :type="selectInput" :options="getDays()" name="day" inner-class="mt-1"/>
                  </div>
                  <div class="flex-1">
                    <FormKit :type="selectInput" :options="months" name="month" inner-class="mt-1" :reduce="(month) => month.code"/>
                  </div>
                  <div class="flex-1">
                    <FormKit :type="selectInput" :options="getYears()" :clearable="false" name="year" inner-class="mt-1" />
                  </div>
                </div>
              </div>
              <FormKit :type="selectInput" :taggable="true" :multiple="true" name="tech_stacks" inner-class="mt-1" label="Tech Stack" tagable>
              </FormKit>
            </div>
          </div>
          <hr />
          <div class="lg:flex lg:w-full lg:gap-x-28 lg:content-start">
            <div class="lg:basis-64 w-full">
              <label class="block font-semibold text-neutrals-100">About Company</label>
              <span class="text-neutrals-60">Brief description for your company. URLs are hyperlinked.</span>
            </div>
            <div class="lg:basis-96 grow">
              <FormKit :type="textAreaInput" name="description" outer-class="w-full" label="Description">
              </FormKit>
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
import TagsInput from '@/components/TagsInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import TextEditor from '@/components/TextEditor.vue'
import { createInput } from '@formkit/vue'
import { categories, businessSizes, industries, months } from '@/const'
const yearsList = ref([])

const selectInput = createInput(SelectInput, {
  props: ['options', 'multiple', 'taggable', 'reduce'],
})
const textAreaInput = createInput(TextEditor, {
  props: [],
})
const props = defineProps({
  company: { type: Object, default: () => {} },
})
let company = props.company;
if (company.date_founded) {
  const df = new Date(company.date_founded)
  company.day = df.getDate();
  company.month = '0';
  company.year = df.getFullYear();
}
const getYears = () => {
  const startYear = 1900;
  const endYear = new Date().getFullYear();
  return Array.from({ length: (endYear - startYear) + 1 },
    (value, index) =>  endYear - index
  );
}

const getDays = () => {
  return Array.from({ length: 31 },
    (value, index) =>  index + 1
  );
}

const serialize = (data) => {
  if (data.year !== undefined && data.month !== undefined)
    return {...data, date_founded: new Date(Date.UTC(data.year, data.month, data.day)) }
  else
    return data
}
</script>
