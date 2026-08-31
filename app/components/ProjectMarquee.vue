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
const trackPx = ref(0)

const items = computed(() => projects)
const count = computed(() => items.value.length)
const lastIndex = computed(() => Math.max(count.value - 1, 0))

const movers: Array<((value: number) => gsap.core.Tween) | null> = []

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

function rebuildMovers() {
  cardEls.value.forEach((html, index) => {
    if (!html) return
    gsap.set(html, { x: 0, y: 0, z: 0, force3D: true })
    movers[index] = gsap.quickTo(html, 'x', {
      duration: compact.value ? 0.55 : 0.4,
      ease: 'power3.out',
      overwrite: true,
    })
  })
}

function lockStage() {
  if (!root.value || !stage.value) return
  if (!compact.value) {
    root.value.style.height = `${count.value * 100}svh`
    stage.value.style.height = ''
    return
  }
  const vh = window.innerHeight
  trackPx.value = count.value * vh
  root.value.style.height = `${trackPx.value}px`
  stage.value.style.height = `${vh}px`
}

function apply(pos: number) {
  const n = count.value
  const mobile = compact.value
  const step = window.innerWidth * (mobile ? 0.92 : 0.38)
  for (let i = 0; i < n; i++) {
    const wrap = wrapEls.value[i]
    const card = cardEls.value[i]
    if (!wrap || !card) continue
    const d = i - pos
    const ad = Math.abs(d)
    const x = d * step
    movers[i]?.(x)

    wrap.style.zIndex = String(Math.round((1 - ad) * 30))
    wrap.style.pointerEvents = ad < 0.55 ? 'auto' : 'none'
    wrap.style.opacity = String(ad > 1.65 ? 0 : ad > 1.15 ? 1 - (ad - 1.15) / 0.5 : 1)

    if (mobile) {
      const print = printEls.value[i]
      if (print) {
        print.style.filter = 'none'
        print.style.transform = 'none'
        print.style.boxShadow = 'none'
      }
      continue
    }

    const print = printEls.value[i]
    if (!print) continue
    const blur = ad < 0.12 ? 0 : Math.min(ad * 2.4, 3.6)
    print.style.filter = `blur(${blur}px)`
    print.style.transform = `scale(${Math.max(1.04 - ad * 0.12, 0.88)})`
    print.style.boxShadow = ad < 0.22 ? '0 1.4vw 3.2vw rgb(10 10 10 / 0.18)' : 'none'
  }
}

onMounted(() => {
  const mq = window.matchMedia('(max-width: 640px)')
  compact.value = mq.matches
  lockStage()
  rebuildMovers()

  if (!root.value) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: compact.value ? 0.65 : 0.35,
      invalidateOnRefresh: !compact.value,
      onUpdate: (self) => {
        apply(self.progress * lastIndex.value)
      },
    })
  }, root.value)

  const onOrient = () => {
    compact.value = mq.matches
    lockStage()
    rebuildMovers()
    apply(0)
    ScrollTrigger.refresh()
  }
  mq.addEventListener('change', onOrient)
  window.addEventListener('orientationchange', onOrient)

  nextTick(() => {
    lockStage()
    rebuildMovers()
    apply(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  onUnmounted(() => {
    mq.removeEventListener('change', onOrient)
    window.removeEventListener('orientationchange', onOrient)
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
      height: trackPx ? `${trackPx}px` : `${Math.max(count, 1) * 100}svh`,
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
              <div
                class="marquee-photo aspect-[4/5] w-full sm:hidden"
                :style="{ backgroundImage: `url('${coverOf(project)}')` }"
                role="img"
                :aria-label="project.title"
              />
              <img
                :src="coverOf(project)"
                :alt="project.title"
                class="hidden aspect-[4/5] w-full object-cover sm:block"
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
          <svg class="h-[2.6vw] w-[1.45vw]" viewBox="0 0 20 36" fill="none" aria-hidden="true">
            <rect x="1.2" y="1.2" width="17.6" height="33.6" rx="8.8" stroke="currentColor" stroke-width="1.15" />
            <rect class="gallery-scroll-wheel" x="8.4" y="7" width="3.2" height="5.2" rx="1.6" fill="currentColor" />
          </svg>
          <span class="extraSmallText tracking-[-0.03em]">Kaydır</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-photo {
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
