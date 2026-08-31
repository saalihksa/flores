<script setup lang="ts">
import { projects, saleBadgeLabel } from '~/data/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { hovering } = useUi()
const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const wrapEls = ref<HTMLElement[]>([])
const cardEls = ref<HTMLElement[]>([])
const printEls = ref<HTMLElement[]>([])
const compact = ref(false)

const items = computed(() => projects)
const count = computed(() => items.value.length)

function coverOf(project: (typeof projects)[number]) {
  if (project.slug === 'flores-nova') return '/images/hero/nova.png'
  if (project.slug === 'flores-konaklari') return '/images/hero/konaklari.png'
  if (project.slug === 'flores-deluxe') return '/images/hero/deluxe.png'
  return project.cover
}

function asHtml(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) return el
  const nested = el as { $el?: HTMLElement } | null
  if (nested?.$el instanceof HTMLElement) return nested.$el
  return null
}

function bindWrap(el: unknown, index: number) {
  const html = asHtml(el)
  if (html) wrapEls.value[index] = html
}

function bindCard(el: unknown, index: number) {
  const html = asHtml(el)
  if (html) cardEls.value[index] = html
}

function bindPrint(el: unknown, index: number) {
  if (el instanceof HTMLElement) printEls.value[index] = el
}

function lockMobileStage() {
  if (!compact.value || !root.value || !stage.value) return
  const vh = window.innerHeight
  const vw = window.innerWidth
  root.value.style.height = `${count.value * vh}px`
  stage.value.style.height = `${vh}px`
  const w = Math.min(Math.round(vw * 0.88), 400)
  const h = Math.round((w * 5) / 4)
  for (const print of printEls.value) {
    if (!print) continue
    print.style.width = `${w}px`
    print.style.height = `${h}px`
  }
  for (const card of cardEls.value) {
    if (!card) continue
    card.style.width = `${w}px`
  }
}

function applyPos(pos: number) {
  const n = count.value
  const mobile = compact.value
  const stepPx = Math.round(window.innerWidth * (mobile ? 0.94 : 0.38))
  for (let i = 0; i < n; i++) {
    const wrap = wrapEls.value[i]
    const card = cardEls.value[i]
    if (!wrap || !card) continue
    let d = i - pos
    while (d > n / 2) d -= n
    while (d < -n / 2) d += n
    const ad = Math.abs(d)
    if (ad > 1.7) {
      wrap.style.visibility = 'hidden'
      wrap.style.pointerEvents = 'none'
      continue
    }
    wrap.style.visibility = 'visible'
    wrap.style.pointerEvents = ad < 1.2 ? 'auto' : 'none'
    wrap.style.zIndex = String(Math.round((1 - ad) * 30))

    if (mobile) {
      wrap.style.opacity = '1'
      wrap.style.filter = 'none'
      wrap.style.transform = 'none'
      const x = Math.round(d * stepPx)
      card.style.transform = `translate3d(${x}px,0,0)`
      const print = printEls.value[i]
      if (print) {
        print.style.transform = 'none'
        print.style.boxShadow = 'none'
      }
      continue
    }

    const fade = ad > 1.2 ? 1 - (ad - 1.2) / 0.5 : 1
    wrap.style.opacity = String(Math.max(0, fade))
    wrap.style.transform = `translate3d(${d * 38}vw, 0, 0)`
    wrap.style.filter = `blur(${ad < 0.12 ? 0 : Math.min(ad * 3.2, 4.5)}px)`
    card.style.transform = 'none'
    const print = printEls.value[i]
    if (print) {
      print.style.transform = `translate3d(0,0,0) scale(${Math.max(1.05 - ad * 0.16, 0.84)})`
      print.style.boxShadow = ad < 0.28 ? '0 1.4vw 3.2vw rgb(10 10 10 / 0.2)' : 'none'
    }
  }
}

onMounted(() => {
  const mq = window.matchMedia('(max-width: 640px)')
  const sync = () => {
    compact.value = mq.matches
    lockMobileStage()
    applyPos(0)
  }
  compact.value = mq.matches
  mq.addEventListener('change', sync)
  window.addEventListener('orientationchange', lockMobileStage)

  if (!root.value || !stage.value) {
    onUnmounted(() => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('orientationchange', lockMobileStage)
    })
    return
  }

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: compact.value ? true : 0.45,
      invalidateOnRefresh: !compact.value,
      onUpdate: (self) => {
        applyPos(self.progress * count.value)
      },
    })
  }, root.value)

  nextTick(() => {
    sync()
    requestAnimationFrame(() => {
      lockMobileStage()
      applyPos(0)
      ScrollTrigger.refresh()
    })
  })
  onUnmounted(() => {
    mq.removeEventListener('change', sync)
    window.removeEventListener('orientationchange', lockMobileStage)
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
      height: `${Math.max(count, 1) * 100}svh`,
      background: 'linear-gradient(180deg, #ececec 0%, #f4f4f4 45%, #fafafa 100%)',
    }"
  >
    <div
      ref="stage"
      data-nav="dark"
      class="sticky top-0 h-svh w-full overflow-hidden"
    >
      <div class="relative z-10 h-full w-full">
        <NuxtLink
          v-for="(project, i) in items"
          :key="project.slug"
          :ref="(el) => bindWrap(el, i)"
          :to="project.tour ? `/projects/${project.slug}#sanal-tur` : `/projects/${project.slug}`"
          class="absolute inset-0 flex items-center justify-center"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <article
            :ref="(el) => bindCard(el, i)"
            class="relative flex w-[88vw] max-w-[400px] flex-col items-center bg-transparent sm:w-[29vw] sm:max-w-none"
          >
            <div
              :ref="(el) => bindPrint(el, i)"
              class="relative w-full sm:overflow-hidden sm:rounded-[0.9vw]"
            >
              <img
                :src="coverOf(project)"
                :alt="project.title"
                class="marquee-photo h-full w-full object-cover"
                draggable="false"
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

      <div class="pointer-events-none absolute bottom-[max(1.6rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-secondary/50 sm:left-auto sm:right-[2.2vw] sm:bottom-[2.4vw] sm:translate-x-0 sm:gap-[0.55vw]">
        <div class="flex flex-col items-center sm:hidden" aria-hidden="true">
          <svg class="h-11 w-11" viewBox="0 0 24 24" fill="none">
            <path class="gallery-chevron gallery-chevron-1" d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            <path class="gallery-chevron gallery-chevron-2" d="M6 19l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="mt-0.5 text-[14px] tracking-wide">Kaydır</span>
        </div>
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
.marquee-photo {
  display: block;
  border-radius: 10px;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
@media (min-width: 641px) {
  .marquee-photo {
    border-radius: 0;
    transform: none;
    height: auto;
    aspect-ratio: 4 / 5;
  }
}

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
