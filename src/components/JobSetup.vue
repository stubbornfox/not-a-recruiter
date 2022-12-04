<script setup>
  import { RouterLink } from "vue-router";

  const navigation = [
    { name: 'Job details', href: { name: 'JobSetupDetails' } },
    { name: 'Job description',  href: { name: 'JobSetupDescription' }, current: false },
  ]
</script>

<template>
  <div id="jobsetup" class="pt-5 flex flex-col">
    <nav class="flex-1 space-y-1  px-2" aria-label="Sidebar">
      <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[$route.name==item.href.name ? 'bg-soft' : '', 'h-8 flex items-center px-2 hover:bg-mute block rounded-lg text-color-text text-sm']">
        <span class="flex-1">{{ item.name }}</span>
      </RouterLink>
      <div class="pt-6">
        <RouterLink type="button" class="inline-flex items-center rounded-md border border-transparent bg-pink-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" to="">
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

