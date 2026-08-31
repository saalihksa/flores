<script setup lang="ts">
import { company, nav, projects } from '~/data/content'

const { hovering } = useUi()

const projectLinks = projects.map((p) => ({
  to: `/projects/${p.slug}`,
  label: p.title.replace(/^FLORES\s+/i, 'Flores '),
}))
</script>

<template>
  <div data-nav-skip class="relative w-full bg-[#004860] pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-primary sm:pt-[2.6vw] sm:pb-[3.2vw]">
    <div data-nav="light" class="layout-grid relative z-10 items-start bg-[#004860] gap-y-8 sm:gap-y-0">
      <div class="col-span-3">
        <p class="mb-3 smallText font-semibold tracking-wide sm:mb-[0.85vw]">Site haritası</p>
        <ul class="space-y-2 extraSmallText sm:space-y-[0.3vw]">
          <li v-for="item in nav" :key="item.to" class="w-fit">
            <NavItem :to="item.to">{{ item.label }}</NavItem>
          </li>
        </ul>
      </div>

      <div class="col-span-3">
        <p class="mb-3 smallText font-semibold tracking-wide sm:mb-[0.85vw]">Projeler</p>
        <ul class="space-y-2 extraSmallText sm:space-y-[0.3vw]">
          <li v-for="item in projectLinks" :key="item.to" class="w-fit">
            <NavItem :to="item.to">{{ item.label }}</NavItem>
          </li>
        </ul>
      </div>

      <div class="col-span-3">
        <p class="mb-3 smallText font-semibold tracking-wide sm:mb-[0.85vw]">Yasal</p>
        <ul class="space-y-2 extraSmallText sm:space-y-[0.3vw]">
          <li class="w-fit"><NavItem to="/privacy-policy">KVKK</NavItem></li>
          <li class="w-fit"><NavItem to="/terms-of-use">Kullanım koşulları</NavItem></li>
          <li class="w-fit"><NavItem to="/cookie-policy">Çerez politikası</NavItem></li>
        </ul>
      </div>

      <div class="col-span-3">
        <p class="mb-3 smallText font-semibold tracking-wide sm:mb-[0.85vw]">İletişim</p>
        <ul class="space-y-2 extraSmallText sm:space-y-[0.3vw]">
          <li class="w-fit">
            <a
              :href="`mailto:${company.email}`"
              class="group pr-[1vw] h-fit extraSmallText"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              <div class="transition-transform duration-200 ease-out group-hover:translate-y-[-0.25vw]">
                {{ company.email }}
              </div>
              <div class="underline-grow w-full" />
            </a>
          </li>
          <li class="w-fit">
            <a
              :href="company.phoneHref"
              class="group pr-[1vw] h-fit extraSmallText"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              <div class="transition-transform duration-200 ease-out group-hover:translate-y-[-0.25vw]">
                {{ company.phone }}
              </div>
              <div class="underline-grow w-full" />
            </a>
          </li>
          <li class="w-fit">
            <a
              :href="company.maps"
              target="_blank"
              rel="noopener noreferrer"
              class="group pr-[1vw] h-fit extraSmallText"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              <div class="max-w-full leading-snug break-words transition-transform duration-200 ease-out group-hover:translate-y-[-0.25vw] sm:max-w-[18vw]">
                {{ company.address }}
              </div>
              <div class="underline-grow w-full" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout-grid relative z-10 mt-12 items-center gap-y-6 sm:mt-[2.8vw] sm:gap-y-0">
      <p class="col-span-6 text-center extraSmallText leading-snug text-primary/45 sm:col-span-3 sm:text-left">
        {{ company.copyright }}
      </p>
      <NuxtLink
        to="/"
        class="col-span-6 flex h-[7.25rem] items-center justify-center overflow-hidden sm:col-span-6 sm:h-[9.5vw] sm:max-h-[148px]"
        aria-label="Flores"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <img
          src="/images/brand/dikey_renkli_flores.svg?v=3"
          alt="Flores"
          width="158"
          height="153"
          class="block h-full w-auto max-h-full object-contain"
        >
      </NuxtLink>
      <a
        href="https://pistoncreative.com"
        target="_blank"
        rel="noopener noreferrer"
        class="col-span-6 flex items-center justify-center sm:col-span-3 sm:justify-end"
        aria-label="Piston Creative"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <img
          src="/images/brand/piston.svg"
          alt="Piston Creative"
          class="block h-8 w-auto sm:h-[2.15vw]"
        >
      </a>
    </div>
  </div>
</template>
