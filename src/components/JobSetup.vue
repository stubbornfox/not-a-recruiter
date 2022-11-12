<script setup>
  import { RouterLink } from "vue-router";

  const navigation = [
    { name: 'Job details', href: { name: 'JobSetupDetails' } },
    { name: 'Job description',  href: { name: 'JobSetupDescription' }, current: false },
    { name: 'Hiring Stages', href: '#',  current: false },
  ]
</script>

<template>
  <div id="jobsetup" class="pt-5 flex flex-col">
    <nav class="flex-1 space-y-1  px-2" aria-label="Sidebar">
      <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name==item.href.name ? 'bg-gray-100 ' : 'text-gray-600 hover:bg-gray-50 hover:', 'group flex items-center px-2 py-2 text-md font-medium rounded-md']">
        <span class="flex-1">{{ item.name }}</span>
      </RouterLink>
      <div class="pt-6">
        <RouterLink type="button" class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" to="">
          Publish job post
        </RouterLink>
    </div>
    </nav>
  </div>
</template>

<style scoped>
  #jobsetup {
    color: rgb(82, 82, 82);
    border-right: 1px solid var(--color-border);
    overflow-y: auto;
  }
</style>

