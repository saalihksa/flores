<script setup lang="ts">
import { company } from '~/data/content'
import { img } from '~/utils/media'
import gsap from 'gsap'

const ctaRoot = ref<HTMLElement | null>(null)
const ctaImage = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!ctaRoot.value || !ctaImage.value) return
  if (window.matchMedia('(max-width: 640px)').matches) return
  const ctx = gsap.context(() => {
    gsap.to(ctaImage.value, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: ctaRoot.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, ctaRoot.value)
  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div>
    <HeroCarousel />
    <ProjectMarquee />

    <section
      ref="ctaRoot"
      data-nav="light"
      class="relative min-h-[100svh] w-full overflow-hidden bg-secondary text-primary sm:h-[160svh] sm:min-h-[100vw]"
    >
      <div
        ref="ctaImage"
        class="absolute inset-0 overflow-hidden sm:top-0 sm:left-0 sm:h-full sm:w-full sm:scale-[1.2] sm:overflow-y-clip"
      >
        <img
          :src="img('/images/post2-cblok.jpg')"
          alt=""
          class="h-full w-full object-cover object-center saturate-[1.05]"
        >
      </div>
      <div
        class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/65"
        aria-hidden="true"
      />

      <div class="relative z-10 flex min-h-[100svh] w-full flex-col sm:min-h-0">
        <div class="flex flex-1 flex-col items-center justify-center gap-7 px-[var(--margin)] py-16 sm:h-[110svh] sm:min-h-[50vw] sm:gap-[7vw] sm:py-0">
          <div class="w-full max-w-[92vw] text-center sm:w-[50vw] sm:max-w-none sm:pt-[15vw]">
            <h2 class="text-[10.5vw] font-medium leading-[1.08] text-balance drop-shadow-[0_2px_28px_rgb(0_0_0_/_0.55)] sm:largeText sm:text-[8vw] sm:leading-none">
              {{ company.tagline }}
            </h2>
          </div>
          <PillButton to="/studio">Kurumsalı keşfet</PillButton>
        </div>

        <div class="pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex sm:h-[50svh] sm:min-h-[30vw] sm:items-center sm:pb-0">
          <div class="layout-grid w-full gap-y-3.5 sm:gap-y-0">
            <p class="col-span-5 col-start-2 rounded-2xl bg-secondary/35 px-4 py-3.5 text-[4.2vw] leading-relaxed backdrop-blur-md sm:col-span-3 sm:col-start-7 sm:rounded-[0.55vw] sm:px-[0.75vw] sm:py-[0.55vw] sm:text-[1.6vw] sm:leading-snug">
              Flores, modern yaşamın ihtiyaçlarını karşılamak için yenilikçi projeler geliştiren ve MİSEK İnşaat’ın gücünü arkasına alan bir markadır.
            </p>
            <p class="col-span-5 col-start-2 rounded-2xl bg-secondary/35 px-4 py-3.5 text-[4.2vw] leading-relaxed backdrop-blur-md sm:col-span-3 sm:col-start-auto sm:rounded-[0.55vw] sm:px-[0.75vw] sm:py-[0.55vw] sm:text-[1.6vw] sm:leading-snug">
              Konfor, güvenlik ve estetiği bir araya getirerek kentsel dönüşüm projeleriyle şehre değer katmayı hedefliyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>

    <LocationsMapCanvas />

    <JournalPreview />
  </div>
</template>
