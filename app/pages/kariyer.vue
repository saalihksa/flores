<script setup lang="ts">
import { careers } from '~/data/content'

useSeoMeta({
  title: 'Kariyer | FLORES',
  description:
    'Flores ekibine katılın. Satış, müşteri deneyimi, pazarlama ve açık başvurular.',
})

const route = useRoute()
const { $lenis } = useNuxtApp()

function applyTo(slug: string) {
  return { path: '/kariyer', hash: 'basvuru', query: { rol: slug } }
}

function scrollToForm() {
  if (route.hash !== '#basvuru') return
  const el = document.getElementById('basvuru')
  if (!el) return
  const lenis = $lenis as { scrollTo: (target: HTMLElement, opts?: object) => void } | undefined
  requestAnimationFrame(() => {
    lenis?.scrollTo(el, { offset: -48 })
  })
}

watch(() => [route.hash, route.query.rol], () => {
  nextTick(scrollToForm)
})
</script>

<template>
  <div class="relative h-fit bg-primary">
    <ProjectHero
      location="İstanbul"
      type="Açık pozisyonlar"
      year="2026"
      title="Kariyer"
      excerpt="Şehri birlikte inşa ediyoruz. Satış ofisinden merkeze, Flores'in görsel dilini ve sahadaki temposunu taşıyan insanları arıyoruz."
      cover="/images/hero/peyzaj.jpg"
      compact
    />

    <section data-nav="dark" class="bg-primary text-secondary">
      <div class="layout-grid pt-[10vw] sm:pt-[4.5vw]">
        <h2 class="col-span-6 largeText font-medium sm:col-span-8">
          Açık roller
        </h2>
        <p class="col-span-6 mt-[6vw] smallText sm:col-span-4 sm:col-start-9 sm:mt-[0.6vw]">
          Bir pozisyona tıklayın, başvuru formunda otomatik gelsin.
        </p>
      </div>

      <!-- Kariyer listesi -->
      <div class="mt-[10vw] border-t border-secondary/10 sm:mt-[4vw]">
        <NuxtLink
          v-for="job in careers"
          :key="job.slug"
          :to="applyTo(job.slug)"
          class="group block border-b border-secondary/10 transition-colors hover:bg-secondary/5"
        >
          <div class="layout-grid py-[5vw] sm:py-[1.8vw]">
            <div class="col-span-4 sm:col-span-5">
              <p class="smallText font-medium transition-colors group-hover:text-gold">{{ job.title }}</p>
              <p class="mt-[1.5vw] extraSmallText text-black/40 sm:mt-[0.4vw]">{{ job.place }}</p>
            </div>
            <div class="col-span-2 hidden sm:col-span-5 sm:block">
              <p class="extraSmallText leading-relaxed text-black/45">{{ job.excerpt }}</p>
            </div>
            <div class="col-span-2 flex items-center justify-end sm:col-span-2">
              <span class="inline-flex items-center gap-2 rounded-full bg-cyan px-3 py-2 extraSmallText text-primary sm:gap-[0.65vw] sm:px-[0.9vw] sm:py-[0.5vw]">
                Başvur
                <ChipArrow />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section
      id="basvuru"
      data-nav="dark"
      class="scroll-mt-[18vw] bg-primary pt-[8vw] text-secondary sm:scroll-mt-[8vw] sm:pt-[4vw]"
    >
      <ContactForm variant="career" />
    </section>
  </div>
</template>
