<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{
  src: string
  alt: string
  half?: boolean
}>()

const root = ref<HTMLElement | null>(null)
const imgWrap = ref<HTMLElement | null>(null)
const overlay = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return

  const ctx = gsap.context(() => {
    if (imgWrap.value) {
        gsap.fromTo(
        imgWrap.value,
        { yPercent: 18, scale: 1.2 },
        {
          yPercent: -8,
          scale: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: root.value,
            start: 'top 95%',
            end: 'bottom top',
            scrub: 1.1,
          },
        },
      )
    }
    if (overlay.value) {
      gsap.fromTo(
        overlay.value,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1.1,
          },
        },
      )
    }
  }, root.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div
    ref="root"
    class="mb-[var(--gutter)] h-[110svh]"
    :class="half ? 'col-span-12 sm:col-span-6' : 'col-span-12'"
  >
    <div class="relative h-full w-full overflow-hidden">
      <div ref="overlay" class="absolute top-0 left-0 z-10 h-full w-full bg-secondary" />
      <div ref="imgWrap" class="h-full w-full origin-bottom scale-[1.2] object-cover">
        <img :src="src" :alt="alt" class="h-full w-full object-cover">
      </div>
    </div>
  </div>
</template>
