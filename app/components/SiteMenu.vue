<script setup lang="ts">
import { company, nav } from '~/data/content'
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
        <div class="relative px-[var(--margin)] pt-3 sm:layout-grid sm:px-0 sm:pt-[1.5vw]">
          <NuxtLink
            to="/"
            class="mx-auto flex w-fit items-center sm:col-span-6 sm:mx-0"
            @click="closeMenu()"
          >
            <img
              src="/images/brand/dikey_renkli_flores.svg?v=3"
              alt="Flores"
              class="block h-28 w-auto sm:h-[4.5vw]"
            >
          </NuxtLink>
          <button
            type="button"
            class="absolute top-6 right-[var(--margin)] text-[16px] text-primary/60 transition-colors hover:text-primary sm:hidden"
            @click="closeMenu()"
          >
            Kapat
          </button>
          <div class="col-span-6 hidden justify-end extraSmallText sm:flex">
            <button class="mediumText text-primary/70 hover:text-primary" @click="closeMenu()">Kapat</button>
          </div>
        </div>

        <nav class="mt-[6svh] flex w-full flex-col items-center gap-4 sm:mt-[18svh] sm:layout-grid sm:items-stretch sm:gap-0 sm:space-y-[1svh]">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            data-link
            class="text-center text-[2.15rem] font-medium leading-none sm:col-span-6 sm:text-left sm:mediumText"
            @click="closeMenu()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="mt-12 flex w-full flex-col items-center gap-3 px-[var(--margin)] text-center text-[18px] leading-snug text-primary/80 sm:mt-[16svh] sm:layout-grid sm:items-start sm:gap-0 sm:space-y-[1svh] sm:px-0 sm:text-left sm:smallText">
          <a :href="`mailto:${company.email}`" class="sm:col-span-4">{{ company.email }}</a>
          <a :href="company.phoneHref" class="sm:col-span-3">{{ company.phone }}</a>
          <p class="max-w-[18rem] text-[16px] leading-snug text-primary/55 sm:col-span-6 sm:max-w-[22vw] sm:text-[1.1vw]">
            {{ company.address }}
          </p>
          <button
            type="button"
            class="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-cyan px-6 py-3.5 text-[16px] font-medium text-primary sm:col-span-6 sm:mt-0 sm:w-fit sm:gap-[1.6vw] sm:px-[0.95vw] sm:py-[0.55vw] sm:text-[1.1vw] sm:font-normal"
            @click="closeMenu(); openContact()"
          >
            <span>Talep formu</span>
            <span class="flex h-5 w-5 shrink-0 items-center justify-center sm:h-[1.55vw] sm:w-[1.55vw]" aria-hidden="true">
              <BurstMark size="xs" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
