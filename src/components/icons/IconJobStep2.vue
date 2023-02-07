<template>
  <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28.5" cy="28" r="28" :fill="fill" />
    <g clip-path="url(#clip0_29564_36484)">
      <path d="M25.5 21H23.5C22.9696 21 22.4609 21.2107 22.0858 21.5858C21.7107 21.9609 21.5 22.4696 21.5 23V35C21.5 35.5304 21.7107 36.0391 22.0858 36.4142C22.4609 36.7893 22.9696 37 23.5 37H33.5C34.0304 37 34.5391 36.7893 34.9142 36.4142C35.2893 36.0391 35.5 35.5304 35.5 35V23C35.5 22.4696 35.2893 21.9609 34.9142 21.5858C34.5391 21.2107 34.0304 21 33.5 21H31.5" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M29.5 19H27.5C26.3954 19 25.5 19.8954 25.5 21C25.5 22.1046 26.3954 23 27.5 23H29.5C30.6046 23 31.5 22.1046 31.5 21C31.5 19.8954 30.6046 19 29.5 19Z" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M25.5 28H25.51" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M29.5 28H31.5" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M25.5 32H25.51" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M29.5 32H31.5" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_29564_36484">
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
