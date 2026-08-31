<script setup lang="ts">
import { projects, saleBadgeLabel } from '~/data/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { hovering } = useUi()
const root = ref<HTMLElement | null>(null)
const scrollPos = ref(0)
const compact = ref(false)

const items = computed(() => projects)
const count = computed(() => items.value.length)
const trackHeight = computed(() => `${Math.max(count.value, 1) * 100}vh`)

function coverOf(project: (typeof projects)[number]) {
  if (project.slug === 'flores-nova') return '/images/hero/nova.png'
  if (project.slug === 'flores-konaklari') return '/images/hero/konaklari.png'
  if (project.slug === 'flores-deluxe') return '/images/hero/deluxe.png'
  return project.cover
}

function wrappedDelta(index: number) {
  const n = count.value
  let d = index - scrollPos.value
  while (d > n / 2) d -= n
  while (d < -n / 2) d += n
  return d
}

function cardStyle(index: number) {
  const d = wrappedDelta(index)
  const ad = Math.abs(d)
  if (ad > 1.7) {
    return { visibility: 'hidden' as const, pointerEvents: 'none' as const }
  }
  const x = d * (compact.value ? 94 : 38)
  const fade = ad > 1.2 ? 1 - (ad - 1.2) / 0.5 : 1
  const blur = ad < 0.12 ? 0 : Math.min(ad * 3.2, 4.5)
  return {
    transform: `translate3d(${x}vw, 0, 0)`,
    zIndex: String(Math.round((1 - ad) * 30)),
    opacity: String(Math.max(0, fade)),
    filter: `blur(${blur}px)`,
    pointerEvents: (ad < 1.2 ? 'auto' : 'none') as 'auto' | 'none',
  }
}

function printStyle(index: number) {
  const d = wrappedDelta(index)
  const ad = Math.abs(d)
  const scale = compact.value ? 1 : 1.05 - ad * 0.16
  return {
    transform: `rotate(0deg) scale(${Math.max(scale, 0.84)})`,
    boxShadow: ad < 0.28 ? '0 1.4vw 3.2vw rgb(10 10 10 / 0.2)' : 'none',
  }
}

onMounted(() => {
  const mq = window.matchMedia('(max-width: 640px)')
  const sync = () => {
    compact.value = mq.matches
  }
  sync()
  mq.addEventListener('change', sync)
  if (!root.value) {
    onUnmounted(() => mq.removeEventListener('change', sync))
    return
  }
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.45,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollPos.value = self.progress * count.value
      },
    })
  }, root.value)

  requestAnimationFrame(() => ScrollTrigger.refresh())
  onUnmounted(() => {
    mq.removeEventListener('change', sync)
    ctx.revert()
  })
})
</script>

<template>
  <section
    ref="root"
    id="intro-section-container"
    class="relative w-full text-secondary"
    :style="{
      height: trackHeight,
      background: 'linear-gradient(180deg, #ececec 0%, #f4f4f4 45%, #fafafa 100%)',
    }"
  >
    <div
      data-nav="dark"
      class="sticky top-0 h-svh w-full overflow-hidden"
    >

      <div class="relative z-10 flex h-full w-full items-center justify-center">
        <div class="absolute inset-0">
          <NuxtLink
            v-for="(project, i) in items"
            :key="project.slug"
            :to="project.tour ? `/projects/${project.slug}#sanal-tur` : `/projects/${project.slug}`"
            class="absolute left-1/2 top-[48%] w-[88vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 will-change-transform will-change-filter sm:top-[54%] sm:w-[29vw] sm:max-w-none"
            :style="cardStyle(i)"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            <article class="relative flex flex-col items-center bg-transparent">
              <div
                class="relative w-full overflow-hidden rounded-[10px] sm:rounded-[0.9vw]"
                :style="printStyle(i)"
              >
                <img
                  :src="coverOf(project)"
                  :alt="project.title"
                  class="aspect-[4/5] w-full origin-center object-cover shadow-none ring-0 outline-none"
                >
                <span
                  v-if="project.onSale"
                  class="pointer-events-none absolute top-2.5 left-2.5 z-10 rounded-full bg-[#004860] px-2.5 py-1.5 extraSmallText font-medium leading-none text-white shadow-[0_6px_18px_rgb(0_30_45_/_0.45)] ring-2 ring-white sm:top-[0.9vw] sm:left-[0.9vw] sm:px-[1.05vw] sm:py-[0.55vw] sm:text-[1.05vw]"
                >
                  {{ saleBadgeLabel }}
                </span>
                <span
                  v-if="project.tour"
                  class="pointer-events-none absolute bottom-3 left-1/2 z-10 inline-flex w-max -translate-x-1/2 items-center gap-1.5 rounded-full bg-cyan px-2.5 py-1.5 extraSmallText text-primary sm:bottom-[1.1vw] sm:gap-[0.65vw] sm:px-[0.85vw] sm:py-[0.45vw]"
                >
                  Sanal tur yap
                  <ChipArrow />
                </span>
              </div>
              <h3 class="mt-5 text-center text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-secondary sm:mt-[2.2vw] sm:text-[2.2vw]">
                Flores {{ project.title.replace(/^FLORES\s+/i, '') }}
              </h3>
              <span class="mt-3 block h-[2px] w-12 bg-gold sm:mt-[0.7vw] sm:h-px sm:w-[2.4vw]" />
            </article>
          </NuxtLink>
        </div>
      </div>

      <div class="pointer-events-none absolute right-4 bottom-[max(1.4rem,env(safe-area-inset-bottom))] z-20 flex flex-col items-center gap-1 text-secondary/50 sm:right-[2.2vw] sm:bottom-[2.4vw] sm:gap-[0.55vw]">
        <!-- Mobil: yukarı kaydır animasyonu -->
        <div class="flex flex-col items-center sm:hidden" aria-hidden="true">
          <svg class="gallery-swipe-chevrons h-8 w-8" viewBox="0 0 24 24" fill="none">
            <path class="gallery-chevron gallery-chevron-1" d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            <path class="gallery-chevron gallery-chevron-2" d="M6 19l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="mt-0.5 text-[11px] tracking-wide">Kaydır</span>
        </div>
        <!-- Masaüstü: mouse tekeri -->
        <div class="hidden flex-col items-center sm:flex">
          <svg
            class="h-[2.6vw] w-[1.45vw]"
            viewBox="0 0 20 36"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1.2"
              y="1.2"
              width="17.6"
              height="33.6"
              rx="8.8"
              stroke="currentColor"
              stroke-width="1.15"
            />
            <rect
              class="gallery-scroll-wheel"
              x="8.4"
              y="7"
              width="3.2"
              height="5.2"
              rx="1.6"
              fill="currentColor"
            />
          </svg>
          <span class="extraSmallText tracking-[-0.03em]">Kaydır</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-scroll-wheel {
  animation: gallery-scroll-wheel 1.7s ease-in-out infinite;
}

@keyframes gallery-scroll-wheel {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  55% {
    transform: translateY(7px);
    opacity: 0.25;
  }
}

.gallery-chevron {
  animation: gallery-swipe 1.5s ease-in-out infinite;
}
.gallery-chevron-2 {
  animation-delay: 0.18s;
}

@keyframes gallery-swipe {
  0%,
  100% {
    transform: translateY(4px);
    opacity: 0.2;
  }
  40% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
</style>
