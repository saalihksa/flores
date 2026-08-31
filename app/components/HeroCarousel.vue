<script setup lang="ts">
import { heroSlides, heroCaptions } from '~/data/content'
import gsap from 'gsap'

const SLIDE_DURATION = 10
const KONAK_SLIDE = 1
const KONAK_TOUR = '/projects/flores-konaklari#sanal-tur'
const active = ref(0)
const slideEls = ref<HTMLElement[]>([])
const tracks = ref<HTMLElement[]>([])
const fills = ref<HTMLElement[]>([])
let running: gsap.core.Tween | null = null

function fillBar(i: number) {
  running?.kill()
  const fill = fills.value[i]
  if (!fill) return
  gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })
  running = gsap.to(fill, {
    scaleX: 1,
    duration: SLIDE_DURATION,
    ease: 'none',
    onComplete: () => go((i + 1) % heroSlides.length),
  })
}

function go(i: number) {
  if (i === active.value) return
  const prev = active.value
  const prevFill = fills.value[prev]
  if (prevFill) {
    gsap.killTweensOf(prevFill)
    gsap.set(prevFill, { transformOrigin: 'right center' })
    gsap.to(prevFill, { scaleX: 0, duration: 0.45, ease: 'power2.out' })
  }
  if (tracks.value[prev]) gsap.to(tracks.value[prev], { width: '16.666667%', duration: 0.45, ease: 'power2.out' })
  if (slideEls.value[prev]) {
    gsap.to(slideEls.value[prev], { scale: 1.05, opacity: 0, duration: 0.55, ease: 'power4.out', overwrite: 'auto' })
  }
  if (slideEls.value[i]) {
    gsap.to(slideEls.value[i], { scale: 1, opacity: 1, duration: 1, ease: 'power4.out', overwrite: 'auto' })
  }
  if (tracks.value[i]) gsap.to(tracks.value[i], { width: '50%', duration: 0.45, ease: 'power2.out' })
  active.value = i
  fillBar(i)
}

onMounted(async () => {
  await nextTick()
  tracks.value.forEach((el, i) => gsap.set(el, { width: i === 0 ? '50%' : '16.666667%' }))
  slideEls.value.forEach((el, i) => {
    gsap.set(el, i === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 })
  })
  fillBar(0)
})

onUnmounted(() => running?.kill())
</script>

<template>
  <section
    data-nav="light"
    class="relative z-10 m-0 h-dvh w-full min-h-svh overflow-hidden bg-secondary p-0 text-primary sm:h-[110svh]"
  >
    <div class="absolute inset-0 z-0 h-full w-full bg-secondary">
      <div
        v-for="(src, i) in heroSlides"
        :key="src"
        ref="slideEls"
        class="absolute inset-0 h-full w-full will-change-transform will-change-opacity"
        :class="i === 0 ? 'opacity-100' : 'scale-[1.05] opacity-0'"
      >
        <img
          :src="src"
          alt="FLORES"
          class="absolute inset-0 h-full w-full max-w-none object-cover object-center opacity-[0.85] saturate-150"
          :fetchpriority="i === 0 ? 'high' : undefined"
        >
      </div>
    </div>

    <div class="layout-grid absolute top-0 right-0 left-0 z-10 h-svh w-full content-end pb-[max(1.4rem,env(safe-area-inset-bottom))] sm:pb-[1.5vw]">
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 to-transparent sm:h-[28%] sm:from-black/25" aria-hidden="true" />
      <div class="relative col-span-6 flex min-w-0 flex-col">
        <div class="flex w-full gap-[var(--gutter)]">
          <button
            v-for="(_, i) in heroSlides"
            :key="i"
            ref="tracks"
            type="button"
            class="cursor-pointer py-3 sm:py-[var(--gutter)]"
            :class="i === 0 ? 'w-1/2' : 'w-1/6'"
            @click="go(i)"
          >
            <div class="h-[4px] w-full bg-white/50 sm:h-[3px]">
              <div
                ref="fills"
                class="h-full w-full origin-left scale-x-0 bg-gold"
              />
            </div>
          </button>
        </div>

        <p class="mt-3 w-full max-w-[96%] rounded-2xl bg-secondary/35 px-5 py-4 text-[5.4vw] leading-relaxed text-primary backdrop-blur-md sm:mt-[var(--gutter)] sm:w-fit sm:max-w-[38vw] sm:rounded-[0.55vw] sm:px-[0.7vw] sm:py-[0.45vw] sm:text-[1.6vw] sm:leading-snug">
          {{ heroCaptions[active] }}
        </p>
        <div class="mt-4 w-fit sm:mt-[var(--gutter)]">
          <PillButton
            v-if="active === KONAK_SLIDE"
            :to="KONAK_TOUR"
            class="!gap-4 !py-4 !pl-5 !pr-5 !text-[15px] sm:!gap-[5vw] sm:!py-[0.8vw] sm:!pl-[1.2vw] sm:!pr-[1.4vw] sm:!text-[1.1vw]"
          >
            Sanal tur yap
          </PillButton>
          <PillButton
            v-else
            to="/projects"
            class="!gap-4 !py-4 !pl-5 !pr-5 !text-[15px] sm:!gap-[5vw] sm:!py-[0.8vw] sm:!pl-[1.2vw] sm:!pr-[1.4vw] sm:!text-[1.1vw]"
          >
            Projeleri incele
          </PillButton>
        </div>
      </div>
    </div>
  </section>
</template>
