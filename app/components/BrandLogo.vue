<script setup lang="ts">
withDefaults(
  defineProps<{
    invert?: boolean
  }>(),
  { invert: false },
)
</script>

<template>
  <img
    :src="invert ? '/images/brand/yatay_renkli_flores.svg' : '/images/brand/yatay_flores.svg'"
    alt="Flores"
    class="h-full w-auto object-contain object-left"
  >
</template>
