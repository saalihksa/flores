<script setup lang="ts">
import { company } from '~/data/content'

const { hovering, openMenu, openContact, introReady } = useUi()
const route = useRoute()

function startsOnImage(path: string) {
  if (path === '/' || path === '') return true
  if (path === '/kariyer' || path === '/iletisim') return true
  return /^\/projects\/[^/]+/.test(path)
}

const onImage = ref(startsOnImage(route.path))
const atTop = ref(true)

function syncNav(source?: { scroll?: number }) {
  const yScroll = typeof source?.scroll === 'number' ? source.scroll : (window.scrollY || 0)
  atTop.value = yScroll < 12
  const y = 16
  let mode: string | null = null
  let bestTop = Number.NEGATIVE_INFINITY
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
    if (el.closest('[data-nav-skip], .page-leave-active')) return
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return
    if (r.top <= y && r.bottom > y && r.top >= bestTop) {
      bestTop = r.top
      mode = el.dataset.nav || 'dark'
    }
  })
  if (mode == null) {
    onImage.value = startsOnImage(route.path)
    return
  }
  onImage.value = mode === 'light'
}

function scheduleSync() {
  nextTick(() => {
    syncNav()
    requestAnimationFrame(syncNav)
  })
}

onMounted(() => {
  scheduleSync()
  window.addEventListener('scroll', syncNav, { passive: true })
  const lenis = useNuxtApp().$lenis as { on: Function; off: Function } | undefined
  lenis?.on('scroll', syncNav)
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', scheduleSync)
  nuxtApp.hook('page:transition:finish', scheduleSync)
  onUnmounted(() => {
    window.removeEventListener('scroll', syncNav)
    lenis?.off('scroll', syncNav)
  })
})

watch(() => route.fullPath, () => {
  onImage.value = startsOnImage(route.path)
  atTop.value = true
})

watch(introReady, (ready) => {
  if (ready) scheduleSync()
})

onUnmounted(() => {
  window.removeEventListener('scroll', syncNav)
})
</script>

<template>
  <header
    class="pointer-events-none fixed top-0 left-0 z-40 h-auto w-full transition-[opacity,background-color] duration-300 ease-in-out"
    :class="[
      introReady ? 'opacity-100' : 'opacity-0',
      onImage && atTop
        ? 'text-primary'
        : onImage
          ? 'bg-secondary/40 text-primary backdrop-blur-md'
          : atTop
            ? 'border-b border-secondary/10 bg-primary text-secondary'
            : 'border-b border-secondary/10 bg-primary/90 text-secondary backdrop-blur-md',
    ]"
  >
    <div class="layout-grid h-auto items-center pt-[max(0.7rem,env(safe-area-inset-top))] pb-3 sm:items-start sm:pt-[1.5vw] sm:pb-[1.15vw]">
      <div class="col-span-3 flex h-12 items-center sm:col-span-6 sm:h-fit">
        <NuxtLink
          to="/"
          class="pointer-events-auto relative z-20 flex h-full w-fit cursor-pointer items-center"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <span
            class="block h-10 sm:h-[3.35vw]"
            :class="onImage ? 'drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]' : ''"
          >
            <BrandLogo :invert="!onImage" />
          </span>
        </NuxtLink>
      </div>

      <div class="col-span-3 flex h-12 min-w-0 items-center justify-end gap-3.5 sm:hidden">
        <a
          :href="company.phoneHref"
          class="pointer-events-auto inline-flex h-full shrink-0 items-center gap-1.5 text-[16px] font-medium leading-none whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>{{ company.phone }}</span>
        </a>
        <button
          type="button"
          class="pointer-events-auto inline-flex h-full items-center text-[16px] font-medium leading-none"
          @click="openMenu()"
        >
          Menü
        </button>
      </div>

      <div class="col-span-6 hidden h-fit items-center justify-between extraSmallText sm:flex">
        <div
          class="pointer-events-auto flex h-fit"
          :class="onImage ? 'drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]' : ''"
        >
          <NavItem to="/projects">Projeler</NavItem>
          <NavItem to="/studio">Kurumsal</NavItem>
          <NavItem to="/journal">Haberler</NavItem>
          <NavItem to="/kariyer">Kariyer</NavItem>
          <NavItem to="/iletisim">İletişim</NavItem>
        </div>
        <div class="pointer-events-auto flex items-center gap-[1.2vw]">
          <a
            :href="company.phoneHref"
            class="group inline-flex shrink-0 items-center gap-[0.4vw] extraSmallText whitespace-nowrap"
            :class="onImage ? 'drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]' : ''"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[0.85vw] w-[0.85vw] shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>
              <span class="block whitespace-nowrap transition-transform duration-200 ease-out group-hover:translate-y-[-0.25vw]">{{ company.phone }}</span>
              <span class="underline-grow w-full" />
            </span>
          </a>
          <button
            type="button"
            class="inline-flex items-center justify-between gap-[1.6vw] rounded-full bg-cyan py-[0.55vw] pl-[0.95vw] pr-[0.85vw] extraSmallText text-primary"
            @click="openContact()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            <span>Talep formu</span>
            <span class="flex h-[1.55vw] w-[1.55vw] shrink-0 items-center justify-center" aria-hidden="true">
              <BurstMark size="xs" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
