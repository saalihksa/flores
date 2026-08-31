<script setup lang="ts">
import gsap from 'gsap'

const { introReady } = useUi()
const root = ref<HTMLElement | null>(null)

const GIF_DURATION = 1000

onMounted(() => {
  if (!root.value) return
  const tl = gsap.timeline({
    onComplete: () => {
      introReady.value = true
    },
  })
  tl.to(root.value, {
    yPercent: -100,
    duration: 1.05,
    delay: GIF_DURATION / 1000 + 0.15,
    ease: 'power3.inOut',
  }).set(root.value, { display: 'none' })
})
</script>

<template>
  <div
    ref="root"
    data-cover
    class="pointer-events-none fixed top-0 left-0 z-[999999] flex h-screen w-full items-center justify-center bg-[#054b67]"
  >
    <img
      src="/images/brand/flores_amblem.gif"
      alt="Flores"
      class="w-52 sm:w-[16vw]"
      draggable="false"
    >
  </div>
</template>
