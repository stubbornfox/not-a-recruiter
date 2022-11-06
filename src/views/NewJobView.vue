<script setup>
  import { FormKitSchema } from '@formkit/vue'
  import axios from 'axios'

  const schema = [
    {
      $formkit: 'text',
      name: 'title',
      label: 'Job Title',
      validation: 'required',
    },
    {
      $formkit: 'text',
      name: 'location',
      label: 'Location',
      validation: 'required',
    },
    {
      $formkit: 'text',
      name: 'category',
      label: 'Category',
      validation: 'required',
    },
    {
      $formkit: 'textarea',
      name: 'description',
      label: 'Description',
      validation: 'required',
    }
  ]

  async function addJob (job) {
    const res = await axios.post('/jobs', job)
    .then((response) => {
      console.log(response)
      alert('Created!')
    })
    .catch((e) => {
      console.log(e)
    })
  }
</script>

<template>
  <div>
    <h1 class="text-3xl">New Job post</h1>
    <div class="mt-5">
      <FormKit type="form" @submit="addJob" submit-label="Post">
        <FormKitSchema :schema="schema"/>
      </FormKit>
    </div>
</div>
</template>
