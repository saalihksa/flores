<script setup lang="ts">
import gsap from 'gsap'
import type { RouteLocationRaw } from 'vue-router'

const { hovering } = useUi()

defineProps<{
  to: RouteLocationRaw
  src: string
  title: string
  aspect?: string
  location?: string
  chip?: string
  badge?: string
  external?: boolean
}>()

const root = ref<HTMLElement | null>(null)
const imgEl = ref<HTMLElement | null>(null)
const cover = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  const ctx = gsap.context(() => {
    if (imgEl.value) {
      gsap.fromTo(
        imgEl.value,
        { yPercent: 18, scale: 1.2 },
        {
          yPercent: -8,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 95%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }
    if (cover.value) {
      gsap.fromTo(
        cover.value,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 88%',
            end: 'top 55%',
            scrub: true,
          },
        },
      )
    }
  }, root.value)
  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="root" class="w-full">
    <NuxtLink
      :to="to"
      :external="external"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener noreferrer' : undefined"
      class="group flex w-full flex-col"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div
        class="relative w-full overflow-hidden rounded-xl bg-secondary sm:rounded-[0.9vw]"
        :style="{ aspectRatio: aspect ?? '16 / 10' }"
      >
        <div ref="cover" class="absolute inset-0 z-10 bg-secondary" />
        <div ref="imgEl" class="h-full w-full origin-bottom scale-[1.2]">
          <img :src="src" :alt="title" class="h-full w-full object-cover saturate-150">
        </div>
        <span
          v-if="badge"
          class="absolute top-3 left-3 z-20 rounded-full bg-[#004860] px-3.5 py-2 smallText font-medium leading-none text-white shadow-[0_6px_18px_rgb(0_30_45_/_0.45)] ring-2 ring-white sm:top-[0.85vw] sm:left-[0.85vw] sm:px-[1.05vw] sm:py-[0.55vw] sm:text-[1.05vw]"
        >
          {{ badge }}
        </span>
        <ImageHoverChip :label="chip ?? 'İncele'" />
      </div>
      <div class="flex w-full flex-col items-center pt-[1.2vw] text-center">
        <span class="smallText font-medium leading-none">{{ title.replace(/^FLORES\s+/i, 'Flores ') }}</span>
        <span v-if="location" class="extraSmallText mt-[0.45vw] leading-none text-black/40">{{ location }}</span>
        <span class="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2.5 text-[15px] leading-none text-primary sm:mt-[0.85vw] sm:gap-[0.65vw] sm:px-[0.9vw] sm:py-[0.5vw] sm:text-[1.1vw]">
          <span>{{ chip ?? 'İncele' }}</span>
          <ChipArrow />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
