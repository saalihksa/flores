<script setup lang="ts">
import { img } from '~/utils/media'
</script>

<template>
  <div class="relative flex h-full w-full flex-col justify-between bg-form px-[10%] pt-[10%] pb-[8%] text-[1vw] text-formSecondary">
    <div class="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-multiply">
      <img
        :src="img('/images/misc/paper.webp')"
        alt=""
        aria-hidden="true"
        class="h-[200%] w-[200%] object-cover opacity-[0.45]"
      >
    </div>
    <div class="relative z-20 mb-[10%] flex items-center justify-between">
      <span class="w-[45%] font-mono">FLORES NOTU</span>
      <span class="block h-[1.7vw]">
        <BrandLogo invert />
      </span>
    </div>
    <div class="relative z-20 h-full w-full">
      <div v-for="n in 6" :key="n" class="h-[14%] w-full border-b border-formSecondary" />
    </div>
    <div class="relative z-20 flex w-full justify-between font-mono text-[0.8vw]">
      <span>FL / MSK</span>
      <span>TEŞEKKÜRLER</span>
      <span>FLORES</span>
    </div>
  </div>
</template>
