<script setup lang="ts">
import { projects, saleBadgeLabel } from '~/data/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { hovering, contactOpen, menuOpen } = useUi()
const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const mobileRoot = ref<HTMLElement | null>(null)
const mobileStage = ref<HTMLElement | null>(null)
const mobileCards = ref<HTMLElement[]>([])
const wrapEls = ref<HTMLElement[]>([])
const cardEls = ref<HTMLElement[]>([])
const printEls = ref<HTMLElement[]>([])
const compact = ref(false)
const mobileTrackPx = ref(0)

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

function bindMobileCard(el: unknown, index: number) {
  const html = asHtml(el)
  if (html) mobileCards.value[index] = html
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

function wrappedDelta(index: number, pos: number, n: number) {
  let d = index - pos
  while (d > n / 2) d -= n
  while (d < -n / 2) d += n
  return d
}

function layoutMobile() {
  if (!mobileStage.value) return
  const vh = window.innerHeight
  const vw = window.innerWidth
  const n = count.value
  mobileTrackPx.value = n * vh
  mobileStage.value.style.height = `${vh}px`

  const photoW = Math.min(Math.round(vw * 0.88), 400)
  const photoH = Math.round((photoW * 5) / 4)
  const blockH = photoH + 76
  const top = Math.max(Math.round((vh - blockH) / 2), 64)
  const left = Math.round((vw - photoW) / 2)

  mobileCards.value.forEach((el) => {
    if (!el) return
    el.style.top = `${top}px`
    el.style.left = `${left}px`
    el.style.width = `${photoW}px`
    const photo = el.querySelector<HTMLElement>('[data-photo]')
    if (photo) photo.style.height = `${photoH}px`
  })
}

function applyMobile(pos: number) {
  const n = count.value
  const step = Math.round(window.innerWidth * 0.94)
  for (let i = 0; i < n; i++) {
    const el = mobileCards.value[i]
    if (!el) continue
    const d = wrappedDelta(i, pos, n)
    const x = Math.round(d * step)
    el.style.zIndex = String(Math.round((1 - Math.abs(d)) * 30))
    el.style.pointerEvents = Math.abs(d) < 1.2 ? 'auto' : 'none'
    gsap.set(el, { x, y: 0, z: 0, force3D: true })
  }
}

function applyDesktop(pos: number) {
  const n = count.value
  for (let i = 0; i < n; i++) {
    const wrap = wrapEls.value[i]
    const card = cardEls.value[i]
    if (!wrap || !card) continue
    const d = wrappedDelta(i, pos, n)
    const ad = Math.abs(d)
    if (ad > 1.7) {
      wrap.style.visibility = 'hidden'
      wrap.style.pointerEvents = 'none'
      continue
    }
    const fade = ad > 1.2 ? 1 - (ad - 1.2) / 0.5 : 1
    wrap.style.visibility = 'visible'
    wrap.style.pointerEvents = ad < 1.2 ? 'auto' : 'none'
    wrap.style.zIndex = String(Math.round((1 - ad) * 30))
    wrap.style.opacity = String(Math.max(0, fade))
    wrap.style.transform = `translate3d(${d * 38}vw, 0, 0)`
    wrap.style.filter = `blur(${ad < 0.12 ? 0 : Math.min(ad * 3.2, 4.5)}px)`
    const print = printEls.value[i]
    if (print) {
      print.style.transform = `translate3d(0,0,0) scale(${Math.max(1.05 - ad * 0.16, 0.84)})`
      print.style.boxShadow = ad < 0.28 ? '0 1.4vw 3.2vw rgb(10 10 10 / 0.2)' : 'none'
    }
  }
}

watch([contactOpen, menuOpen], ([c, m]) => {
  if (!compact.value) return
  ScrollTrigger.normalizeScroll(!(c || m))
})

onMounted(() => {
  const mq = window.matchMedia('(max-width: 640px)')
  compact.value = mq.matches

  const ctx = gsap.context(() => {
    if (compact.value && mobileRoot.value) {
      ScrollTrigger.normalizeScroll(true)
      layoutMobile()
      applyMobile(0)
      ScrollTrigger.create({
        trigger: mobileRoot.value,
        start: 'top top',
        end: 'bottom bottom',
        pin: mobileStage.value,
        pinSpacing: false,
        pinType: 'transform',
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: false,
        onUpdate: (self) => applyMobile(self.progress * count.value),
      })
    }
    else if (root.value) {
      ScrollTrigger.create({
        trigger: root.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyDesktop(self.progress * count.value),
      })
      applyDesktop(0)
    }
  })

  const onOrient = () => {
    if (!compact.value) return
    layoutMobile()
    applyMobile(0)
  }
  window.addEventListener('orientationchange', onOrient)

  nextTick(() => {
    layoutMobile()
    applyMobile(0)
    applyDesktop(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  onUnmounted(() => {
    window.removeEventListener('orientationchange', onOrient)
    ScrollTrigger.normalizeScroll(false)
    ctx.revert()
  })
})
</script>

<template>
  <section
    ref="mobileRoot"
    id="intro-section-container"
    class="relative w-full text-secondary sm:hidden"
    :style="{
      height: mobileTrackPx ? `${mobileTrackPx}px` : `${Math.max(count, 1) * 100}svh`,
      background: 'linear-gradient(180deg, #ececec 0%, #f4f4f4 45%, #fafafa 100%)',
    }"
  >
    <div
      ref="mobileStage"
      data-nav="dark"
      class="relative w-full overflow-hidden"
    >
      <NuxtLink
        v-for="(project, i) in items"
        :key="`m-${project.slug}`"
        :ref="(el) => bindMobileCard(el, i)"
        :to="project.tour ? `/projects/${project.slug}#sanal-tur` : `/projects/${project.slug}`"
        class="marquee-m-card"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div
          data-photo
          class="marquee-m-photo"
          :style="{ backgroundImage: `url('${coverOf(project)}')` }"
          role="img"
          :aria-label="project.title"
        >
          <span
            v-if="project.onSale"
            class="pointer-events-none absolute top-2.5 left-2.5 z-10 rounded-full bg-[#004860] px-2.5 py-1.5 extraSmallText font-medium leading-none text-white shadow-[0_6px_18px_rgb(0_30_45_/_0.45)] ring-2 ring-white"
          >
            {{ saleBadgeLabel }}
          </span>
          <span
            v-if="project.tour"
            class="pointer-events-none absolute bottom-3 left-1/2 z-10 inline-flex w-max -translate-x-1/2 items-center gap-1.5 rounded-full bg-cyan px-2.5 py-1.5 extraSmallText text-primary"
          >
            Sanal tur yap
            <ChipArrow />
          </span>
        </div>
        <h3 class="mt-5 text-center text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-secondary">
          Flores {{ project.title.replace(/^FLORES\s+/i, '') }}
        </h3>
        <span class="mx-auto mt-3 block h-[2px] w-12 bg-gold" />
      </NuxtLink>

      <div class="pointer-events-none absolute bottom-[max(1.6rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-secondary/50">
        <svg class="h-11 w-11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path class="gallery-chevron gallery-chevron-1" d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path class="gallery-chevron gallery-chevron-2" d="M6 19l6-6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="mt-0.5 text-[14px] tracking-wide">Kaydır</span>
      </div>
    </div>
  </section>

  <!-- Masaüstü -->
  <section
    ref="root"
    class="relative hidden w-full text-secondary sm:block"
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
            class="relative flex w-[29vw] flex-col items-center bg-transparent"
          >
            <div
              :ref="(el) => bindPrint(el, i)"
              class="relative w-full overflow-hidden rounded-[0.9vw]"
            >
              <img
                :src="coverOf(project)"
                :alt="project.title"
                class="aspect-[4/5] w-full origin-center object-cover [backface-visibility:hidden]"
              >
              <span
                v-if="project.onSale"
                class="pointer-events-none absolute top-[0.9vw] left-[0.9vw] z-10 rounded-full bg-[#004860] px-[1.05vw] py-[0.55vw] extraSmallText font-medium leading-none text-white shadow-[0_6px_18px_rgb(0_30_45_/_0.45)] ring-2 ring-white sm:text-[1.05vw]"
              >
                {{ saleBadgeLabel }}
              </span>
              <span
                v-if="project.tour"
                class="pointer-events-none absolute bottom-[1.1vw] left-1/2 z-10 inline-flex w-max -translate-x-1/2 items-center gap-[0.65vw] rounded-full bg-cyan px-[0.85vw] py-[0.45vw] extraSmallText text-primary"
              >
                Sanal tur yap
                <ChipArrow />
              </span>
            </div>
            <h3 class="mt-[2.2vw] text-center text-[2.2vw] font-medium leading-tight tracking-[-0.03em] text-secondary">
              Flores {{ project.title.replace(/^FLORES\s+/i, '') }}
            </h3>
            <span class="mt-[0.7vw] block h-px w-[2.4vw] bg-gold" />
          </article>
        </NuxtLink>
      </div>

      <div class="pointer-events-none absolute right-[2.2vw] bottom-[2.4vw] z-20 flex flex-col items-center gap-[0.55vw] text-secondary/50">
        <svg class="h-[2.6vw] w-[1.45vw]" viewBox="0 0 20 36" fill="none" aria-hidden="true">
          <rect x="1.2" y="1.2" width="17.6" height="33.6" rx="8.8" stroke="currentColor" stroke-width="1.15" />
          <rect class="gallery-scroll-wheel" x="8.4" y="7" width="3.2" height="5.2" rx="1.6" fill="currentColor" />
        </svg>
        <span class="extraSmallText tracking-[-0.03em]">Kaydır</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-m-card {
  position: absolute;
  display: block;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.marquee-m-photo {
  position: relative;
  width: 100%;
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
