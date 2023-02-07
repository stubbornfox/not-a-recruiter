<template>
  <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28.5" cy="28" r="28" :fill="fill" />
    <g clip-path="url(#clip0_29564_36495)">
      <path d="M36.5 24H20.5C19.9477 24 19.5 24.4477 19.5 25V27C19.5 27.5523 19.9477 28 20.5 28H36.5C37.0523 28 37.5 27.5523 37.5 27V25C37.5 24.4477 37.0523 24 36.5 24Z" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M28.5 24V37" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M35.5 28V35C35.5 35.5304 35.2893 36.0391 34.9142 36.4142C34.5391 36.7893 34.0304 37 33.5 37H23.5C22.9696 37 22.4609 36.7893 22.0858 36.4142C21.7107 36.0391 21.5 35.5304 21.5 35V28" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M24 24C23.337 24 22.7011 23.7366 22.2322 23.2678C21.7634 22.7989 21.5 22.1631 21.5 21.5C21.5 20.837 21.7634 20.2011 22.2322 19.7322C22.7011 19.2634 23.337 19 24 19C24.9647 18.9832 25.91 19.4513 26.7127 20.3432C27.5154 21.2351 28.1383 22.5094 28.5 24C28.8617 22.5094 29.4846 21.2351 30.2873 20.3432C31.09 19.4513 32.0353 18.9832 33 19C33.663 19 34.2989 19.2634 34.7678 19.7322C35.2366 20.2011 35.5 20.837 35.5 21.5C35.5 22.1631 35.2366 22.7989 34.7678 23.2678C34.2989 23.7366 33.663 24 33 24" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_29564_36495">
        <rect width="24" height="24" fill="white" transform="translate(16.5 16)" />
      </clipPath>
    </defs>
  </svg>
</template>
<script setup>
defineProps({
  fill: { type: String, default: '#E9EBFD' },
  stroke: { type: String, default: '#747474' },
})
</script>
