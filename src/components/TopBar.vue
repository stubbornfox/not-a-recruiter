<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
<template>
  <div class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
    <div class="flex flex-1">
      <form class="flex w-full md:ml-0" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <div class="relative w-full text-gray-400 focus-within:">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
          </div>
          <input id="search-field" name="search-field" class="block h-full w-full border-transparent py-2 pl-8 pr-3  placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" placeholder="Search jobs" type="search" />
        </div>
      </form>
    </div>
    <div class="ml-4 flex items-center md:ml-6">
      <button type="button" class="rounded-full  p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <span class="sr-only">View notifications</span>
        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Profile dropdown -->
      <Menu as="div" class="relative ml-3">
        <div>
          <MenuButton class="flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-soft">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <span class="ml-3 hidden text-sm font-medium text-color-text lg:block"><span class="sr-only">Open user menu for </span>Emilia Birch</span>
            <ChevronDownIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
          </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-color-text']">Your Profile</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-color-text']">Settings</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-color-text']">Logout</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
