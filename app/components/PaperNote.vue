<script setup lang="ts">
import { img } from '~/utils/media'

const lines = [
  'Hayallerinizdeki evi inşa ediyoruz',
  'Konfor, güvenlik, estetik',
  'MİSEK İnşaat güvencesi',
  'Kentsel dönüşümle değere',
  'Modern yaşam, güvenli gelecek',
  'Şehre değer katan projeler',
]

const active = ref(0)
const note = ref<HTMLElement | null>(null)
const clip = ref<HTMLElement | null>(null)

function rotateNote() {
  active.value = (active.value + 1) % lines.length
}
</script>

<template>
  <div class="relative h-full w-full cursor-pointer" @click="rotateNote">
    <div ref="clip" class="absolute top-[-3.85vw] left-[1vw] z-10 h-fit w-fit origin-top">
      <img
        :src="img('/images/misc/paperclip.png')"
        alt=""
        aria-hidden="true"
        class="h-auto w-[5.5vw] object-cover"
      >
    </div>

    <div
      ref="note"
      class="relative flex h-full w-full flex-col justify-between bg-form px-[10%] pt-[10%] pb-[8%] text-[1vw] text-formSecondary"
    >
      <div class="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply">
        <img
          :src="img('/images/misc/paper.webp')"
          alt=""
          aria-hidden="true"
          class="h-[200%] w-[200%] object-cover opacity-[0.45]"
        >
      </div>

      <div class="relative z-10 mb-[10%] flex items-center justify-between">
        <span class="w-[35%] font-mono">FLORES NOTU</span>
        <span class="block h-[1.7vw]">
          <BrandLogo invert />
        </span>
      </div>

      <div class="relative z-10 h-full w-full">
        <div
          v-for="i in 6"
          :key="i"
          class="flex h-[14%] items-end whitespace-nowrap border-b border-formSecondary"
        >
          <span v-if="i === 1" class="font-biro text-[1vw] text-gray-700">{{ lines[active] }}</span>
        </div>
      </div>

      <div class="relative z-10 flex w-full justify-between font-mono text-[0.8vw]">
        <span>FL / MSK</span>
        <span>TEŞEKKÜRLER</span>
        <span>FLORES</span>
      </div>
    </div>
  </div>
</template>
