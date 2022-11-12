<template>
    <div class="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 h-full flex flex-col flex-grow h-full">
        <div class="h-full flex flex-col flex-grow mt-4">
            <JobForm :job="job" @save-job="updateJob" v-if="job.id" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from "vue-router";
import JobForm from "../components/JobForm.vue";

const job = ref({})
const error = ref([])
const slug = useRoute().params.slug

onMounted(() => {
    axios.get(`/jobs/${slug}`)
        .then((response) => {
            job.value = response.data;
        })
        .catch((e) => {
            error.value.push(e);
        })
})

async function updateJob(modifiedJob) {
    const res = await axios.put(`/jobs/${slug}`, modifiedJob)
        .then((response) => {
            alert('Updated!')
        })
        .catch((e) => {
            console.log(e)
        })
}
</script>
