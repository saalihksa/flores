<script setup lang="ts">
import { company } from '~/data/content'

useSeoMeta({
  title: 'İletişim | FLORES',
  description:
    'Flores genel merkez, destek hattı ve ön talep. Üsküdar\u2019daki ofisimize gelin veya formu doldurun.',
})

const { hovering } = useUi()

const channels = [
  {
    title: company.phone,
    location: 'Destek hattı',
    to: company.phoneHref,
    chip: 'Hemen ara',
    external: false,
    icon: 'phone',
  },
  {
    title: company.email,
    location: 'Satış ve bilgi',
    to: `mailto:${company.email}`,
    chip: 'E-posta yaz',
    external: true,
    icon: 'email',
  },
  {
    title: company.address,
    location: 'Genel merkez',
    to: company.maps,
    chip: 'Yol tarifi',
    external: true,
    icon: 'location',
  },
]


</script>

<template>
  <div class="relative h-fit bg-primary">
    <ProjectHero
      location="Üsküdar"
      type="Genel merkez"
      year="444 0 917"
      title="İletişim"
      excerpt="Size en yakın projeyi birlikte bulalım. Satış ekibimiz her gün 09:00–18:00 arasında hizmetinizde."
      cover="/images/hero/peyzaj.jpg"
      compact
    />

    <section data-nav="dark" class="bg-primary pb-[4vw] text-secondary">
      <div class="layout-grid pt-[10vw] sm:pt-[4.5vw]">
        <h2 class="col-span-6 largeText font-medium sm:col-span-7">
          Bize ulaşın
        </h2>
        <p class="col-span-6 mt-[6vw] smallText sm:col-span-4 sm:col-start-9 sm:mt-[0.6vw]">
          Satış ve proje bilgisi için destek hattımız, e-posta adresimiz veya Üsküdar’daki genel merkezimiz üzerinden bize ulaşabilirsiniz.
        </p>
      </div>

      <!-- İletişim kanalları -->
      <div class="layout-grid mt-[10vw] gap-y-[4vw] sm:mt-[4vw] sm:gap-y-0">
        <a
          v-for="item in channels"
          :key="item.title"
          :href="item.to"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="group col-span-6 flex flex-col gap-[4vw] border-t border-secondary/10 py-[5vw] transition-colors hover:border-gold/40 sm:col-span-4 sm:gap-[1.8vw] sm:border-l sm:border-t-0 sm:px-[2.5vw] sm:py-[2.5vw] sm:first:border-l-0"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <!-- İkon -->
          <div class="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/15 bg-primary text-secondary transition-colors group-hover:border-gold/40 group-hover:text-gold sm:h-[3vw] sm:w-[3vw]">
            <!-- Telefon -->
            <svg v-if="item.icon === 'phone'" class="h-5 w-5 sm:h-[1.3vw] sm:w-[1.3vw]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <!-- E-posta -->
            <svg v-else-if="item.icon === 'email'" class="h-5 w-5 sm:h-[1.3vw] sm:w-[1.3vw]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <!-- Konum -->
            <svg v-else-if="item.icon === 'location'" class="h-5 w-5 sm:h-[1.3vw] sm:w-[1.3vw]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>

          <!-- Bilgi -->
          <div class="flex flex-col gap-[1.5vw] sm:gap-[0.4vw]">
            <p class="smallText font-medium leading-snug">{{ item.title }}</p>
            <p class="extraSmallText text-black/40">{{ item.location }}</p>
          </div>

          <!-- CTA -->
          <div class="mt-auto">
            <span class="inline-flex items-center gap-2 rounded-full bg-cyan px-3 py-2 extraSmallText text-primary transition-opacity group-hover:opacity-85 sm:gap-[0.65vw] sm:px-[0.9vw] sm:py-[0.5vw]">
              {{ item.chip }}
              <ChipArrow />
            </span>
          </div>
        </a>
      </div>
    </section>

    <section data-nav="dark" class="flex flex-col bg-primary text-secondary sm:flex-row">
      <div class="min-w-0 flex-1">
        <ContactForm variant="contact" />
      </div>
      <div class="relative h-[56vw] shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-[38%] sm:rounded-[0.8vw]">
        <iframe
          src="https://maps.google.com/maps?q=41.0214,29.0706+(FLORES)&z=17&hl=tr&iwloc=A&output=embed"
          class="h-full w-full border-0"
          loading="lazy"
          title="FLORES — Üsküdar, İstanbul"
          referrerpolicy="no-referrer-when-downgrade"
        />
        <div class="pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-[1.2vw] sm:left-[1.2vw] sm:right-[1.2vw]">
          <div class="inline-flex flex-col gap-1 rounded-xl bg-primary/90 px-4 py-3 backdrop-blur-sm sm:gap-[0.3vw] sm:px-[1vw] sm:py-[0.7vw] sm:rounded-[0.6vw]">
            <p class="extraSmallText font-medium">{{ company.name }}</p>
            <p class="extraSmallText text-black/50">{{ company.address }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="h-[8vw] bg-primary sm:h-[3.5vw]" />

  </div>
</template>
