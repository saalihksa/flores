<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: string
  }>(),
  { size: 'max(12px, 1.15vw)' },
)
</script>

<template>
  <svg
    :style="{ width: size, height: size }"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3.2 12.8 12.8 3.2M6.2 3.2h6.6v6.6"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="square"
      stroke-linejoin="miter"
    />
  </svg>
</template>
