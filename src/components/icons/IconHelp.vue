<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_29461_7370)">
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 17V17.01" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 13.5C11.9816 13.1754 12.0692 12.8536 12.2495 12.5831C12.4299 12.3125 12.6933 12.1079 13 12C13.3759 11.8563 13.7132 11.6273 13.9856 11.331C14.2579 11.0347 14.4577 10.6793 14.5693 10.2926C14.6809 9.906 14.7013 9.49874 14.6287 9.10291C14.5562 8.70708 14.3928 8.33349 14.1513 8.01156C13.9099 7.68962 13.597 7.42813 13.2373 7.24766C12.8776 7.0672 12.4809 6.97268 12.0785 6.97157C11.6761 6.97045 11.2789 7.06276 10.9182 7.24123C10.5576 7.4197 10.2432 7.67945 10 8.00004" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_29461_7370">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
<script setup>
defineProps({
  color: { type: String, default: '#747474' },
})
</script>
