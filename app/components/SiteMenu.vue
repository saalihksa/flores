<script setup lang="ts">
import { nav } from '~/data/content'
import gsap from 'gsap'

const { menuOpen, hovering, closeMenu, openContact } = useUi()
const root = ref<HTMLElement | null>(null)

watch(menuOpen, async (open) => {
  await nextTick()
  if (!root.value) return
  gsap.to(root.value, {
    height: open ? '100lvh' : 0,
    duration: 0.7,
    ease: 'power3.inOut',
  })
  if (open) {
    gsap.fromTo(
      root.value.querySelectorAll('[data-link]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, delay: 0.25, ease: 'power3.out' },
    )
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="root"
      class="fixed top-0 left-0 z-50 h-0 w-full overflow-hidden bg-[#004860] text-primary"
      :class="menuOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <div class="relative h-[100lvh] overflow-y-auto bg-[#004860] pt-[max(0.7rem,env(safe-area-inset-top))]">
        <div class="layout-grid h-auto items-center pt-2 sm:pt-[1.5vw]">
          <NuxtLink
            to="/"
            class="col-span-4 flex h-fit w-fit items-center sm:col-span-6"
            @click="closeMenu()"
          >
            <img
              src="/images/brand/dikey_renkli_flores.svg?v=3"
              alt="Flores"
              class="block h-16 w-auto sm:h-[4.5vw]"
            >
          </NuxtLink>
          <button
            type="button"
            class="col-span-2 text-right extraSmallText text-primary/60 transition-colors hover:text-primary sm:hidden"
            @click="closeMenu()"
          >
            Kapat
          </button>
          <div class="col-span-6 hidden justify-end extraSmallText sm:flex">
            <button class="mediumText text-primary/70 hover:text-primary" @click="closeMenu()">Kapat</button>
          </div>
        </div>

        <nav class="mt-[10svh] w-full layout-grid space-y-3 sm:mt-[18svh] sm:space-y-[1svh]">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            data-link
            class="col-span-6 mediumText"
            @click="closeMenu()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="mt-10 w-full layout-grid space-y-3 smallText text-primary/80 sm:mt-[16svh] sm:space-y-[1svh]">
          <a href="mailto:info@flores.com.tr" class="col-span-6 sm:col-span-4">info@flores.com.tr</a>
          <a href="tel:4440917" class="col-span-6 sm:col-span-3">444 0 917</a>
          <button
            type="button"
            class="col-span-6 mt-4 inline-flex w-fit items-center justify-between gap-3 rounded-full bg-cyan py-3 pl-4 pr-4 extraSmallText text-primary sm:mt-0 sm:gap-[1.6vw] sm:py-[0.55vw] sm:pl-[0.95vw] sm:pr-[0.85vw]"
            @click="closeMenu(); openContact()"
          >
            <span>Talep formu</span>
            <span class="flex h-4 w-4 shrink-0 items-center justify-center sm:h-[1.55vw] sm:w-[1.55vw]" aria-hidden="true">
              <BurstMark size="xs" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
