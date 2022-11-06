<script setup>
  import { FormKitSchema } from '@formkit/vue'
  import axios from 'axios'

  const schema = [
    {
      $formkit: 'text',
      name: 'first_name',
      label: 'First name',
      validation: 'required',
    },
    {
      $formkit: 'text',
      name: 'last_name',
      label: 'Last name',
      validation: 'required',
    }
  ]

  async function addCandidate (candidate) {
    const res = await axios.post('/candidates', candidate)
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
    <h1 class="text-3xl">New Candidate</h1>
    <div class="mt-5">
      <FormKit type="form" @submit="addCandidate" submit-label="Add">
        <FormKitSchema :schema="schema"/>
      </FormKit>
    </div>
</div>
</template>
