<template>
  <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
    <div class="py-6 md:flex md:items-center md:justify-between">
      <FormKit type="form" id="editThemeForm" form-class="flex-grow-1 space-y-8 lg:w-96" :actions=false :incomplete-message=false novalidate>
        <div class="space-y-8">
          <h3 class="text-lg font-medium leading-6 text-heading text-heading">Your preferences
          </h3>
          <div class="mt-6 grid grid-cols-1 gap-y-6">
            <FormKit type="select" label="Theme" name="theme" :options="{
              system: 'Sync with system',
              light: 'Light Theme',
              dark: 'Dark Theme',
            }" help="Select a single theme, or sync with your system and automatically switch between light and dark themes." @change="changeTheme" :value="theme"/>
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import applyTheme from '../apply-theme'
const theme = localStorage.theme
function changeTheme(e) {
  localStorage.setItem('theme', e.target.value);
  applyTheme()
}
</script>
