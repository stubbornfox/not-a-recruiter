<template>
  <div class="flex flex-1">
    <form class="flex w-full md:ml-0" action="#" method="GET">
      <label for="search-field" class="sr-only">Search</label>
      <div class="relative w-full text-gray-400 focus-within:">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
        </div>
        <input id="search-field" name="search-field" class="bg-transparent block h-full w-full border-transparent py-2 pl-8 pr-3 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" placeholder="Search jobs" type="search" />
      </div>
    </form>
  </div>
</template>
