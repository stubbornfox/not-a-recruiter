<script setup>
  import { RouterLink } from "vue-router";

  const navigation = [
    { name: 'Job details', href: '#', current: true },
    { name: 'Job description', href: '#', current: false },
    { name: 'Hiring Stages', href: '#',  current: false },
  ]
</script>

<template>
  <div id="jobsetup" class="pt-5 flex flex-col">
    <nav class="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
      <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
        <span class="flex-1">{{ item.name }}</span>
      </a>
      <div class="pt-6">
        <RouterLink type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" to="">
          Publish job post
        </RouterLink>
    </div>
    </nav>
  </div>
</template>

<style scoped>
  #jobsetup {
    color: rgb(82, 82, 82);
    border-right: 1px solid rgb(229, 229, 229);
    overflow-y: auto;
  }
</style>

