<script setup lang="ts">
import { testimonials } from '~/data/content'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SLIDE_DURATION = 10
const index = ref(0)
const trigger = ref<HTMLElement | null>(null)
const section = ref<HTMLElement | null>(null)
const imageRoot = ref<HTMLElement | null>(null)
const imageWrap = ref<HTMLElement | null>(null)
const overlay = ref<HTMLElement | null>(null)
const measureEls = ref<HTMLElement[]>([])
const quoteMinHeight = ref(0)
const slideEls = ref<HTMLElement[]>([])
const avatarEls = ref<HTMLElement[]>([])
const tracks = ref<HTMLElement[]>([])
const fills = ref<HTMLElement[]>([])
let running: gsap.core.Tween | null = null

function setSlideEl(el: Element | null, i: number) {
  if (el) slideEls.value[i] = el as HTMLElement
}

function setAvatarEl(el: Element | null, i: number) {
  if (el) avatarEls.value[i] = el as HTMLElement
}

function setMeasureEl(el: Element | null, i: number) {
  if (el) measureEls.value[i] = el as HTMLElement
}

function measureQuote() {
  const heights = measureEls.value.map((el) => el?.offsetHeight ?? 0).filter((h) => h > 0)
  quoteMinHeight.value = heights.length ? Math.max(...heights) : 0
}

function fillBar(i: number) {
  running?.kill()
  const fill = fills.value[i]
  if (!fill) return
  gsap.killTweensOf(fill)
  fill.style.transformOrigin = 'left center'
  gsap.set(fill, { scaleX: 0 })
  running = gsap.to(fill, {
    scaleX: 1,
    duration: SLIDE_DURATION,
    ease: 'none',
    onComplete: () => {
      index.value = (index.value + 1) % testimonials.length
    },
  })
}

function go(i: number) {
  if (i === index.value) return
  index.value = i
}

watch(index, (next, prev) => {
  if (prev != null && fills.value[prev]) {
    gsap.killTweensOf(fills.value[prev])
    fills.value[prev].style.transformOrigin = 'right center'
    gsap.to(fills.value[prev], { scaleX: 0, duration: 0.5, ease: 'power2.out' })
    if (tracks.value[prev]) {
      gsap.to(tracks.value[prev], { width: '16.666667%', duration: 0.5, ease: 'power2.out' })
    }
    if (slideEls.value[prev]) {
      gsap.to(slideEls.value[prev], { scale: 1.05, opacity: 0, duration: 0.5, ease: 'power4.out', overwrite: 'auto' })
    }
    if (avatarEls.value[prev]) {
      gsap.to(avatarEls.value[prev], { scale: 1.05, opacity: 0, duration: 0.5, ease: 'power4.out', overwrite: 'auto' })
    }
  }

  if (next != null) {
    fillBar(next)
    if (tracks.value[next]) {
      gsap.to(tracks.value[next], { width: '50%', duration: 0.5, ease: 'power2.out' })
    }
    if (slideEls.value[next]) {
      gsap.to(slideEls.value[next], {
        scale: 1,
        opacity: 1,
        delay: 0.2,
        duration: 1,
        ease: 'power4.out',
        overwrite: 'auto',
      })
    }
    if (avatarEls.value[next]) {
      gsap.to(avatarEls.value[next], {
        scale: 1,
        opacity: 1,
        delay: 0.2,
        duration: 1,
        ease: 'power4.out',
        overwrite: 'auto',
      })
    }
  }
})

onMounted(async () => {
  await nextTick()
  tracks.value.forEach((el, i) => gsap.set(el, { width: i === 0 ? '50%' : '16.666667%' }))
  slideEls.value.forEach((el, i) => {
    gsap.set(el, i === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 })
  })
  avatarEls.value.forEach((el, i) => {
    gsap.set(el, i === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 })
  })
  measureQuote()
  window.addEventListener('resize', measureQuote)

  const ctx = gsap.context(() => {
    if (imageWrap.value && imageRoot.value) {
      gsap.set(imageWrap.value, { force3D: true })
      gsap.to(imageWrap.value, {
        yPercent: 12,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: imageRoot.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      })
    }

    if (overlay.value && imageRoot.value) {
      gsap.to(overlay.value, {
        opacity: 0,
        duration: 0.25,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imageRoot.value,
          start: 'top 90%',
          once: true,
        },
      })
    }
  }, section.value)

  fillBar(0)
  requestAnimationFrame(() => ScrollTrigger.refresh())

  onUnmounted(() => {
    running?.kill()
    window.removeEventListener('resize', measureQuote)
    ctx.revert()
  })
})
</script>

<template>
  <div ref="trigger" class="relative -mt-[25%]">
    <section
      ref="section"
      data-nav="light"
      class="relative h-fit w-full overflow-y-clip bg-secondary py-[30%] text-primary"
    >
      <div class="layout-grid relative z-10 w-full">
        <div class="col-span-6 mb-[50vw] sm:mb-0">
          <div
            ref="imageRoot"
            class="relative aspect-[16/12] w-full overflow-hidden bg-secondary"
          >
            <div ref="imageWrap" class="h-full w-full origin-bottom scale-[1.2]">
              <div
                v-for="(item, i) in testimonials"
                :key="item.name"
                :ref="(el) => setSlideEl(el, i)"
                class="absolute top-0 left-0 h-full w-full"
                :class="i === 0 ? '' : 'scale-[1.05] opacity-0'"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-full w-full object-cover saturate-150"
                >
              </div>
            </div>
            <div ref="overlay" class="absolute top-0 left-0 z-10 h-full w-full bg-secondary" />
          </div>

          <div class="flex w-full gap-[var(--gutter)]">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              ref="tracks"
              type="button"
              class="cursor-pointer py-[var(--gutter)]"
              :class="i === 0 ? 'w-1/2' : 'w-1/6'"
              @click="go(i)"
            >
              <div class="h-[3px] w-full bg-cyan/35">
                <div
                  ref="fills"
                  class="h-full w-full origin-left scale-x-0 bg-gold"
                />
              </div>
            </button>
          </div>

          <div class="grid grid-cols-6 items-end gap-[var(--gutter)]">
            <div class="relative col-span-3">
              <div class="pointer-events-none invisible absolute inset-0" aria-hidden="true">
                <p
                  v-for="(item, i) in testimonials"
                  :key="`${item.name}-ghost`"
                  :ref="(el) => setMeasureEl(el, i)"
                  class="smallText"
                >
                  {{ item.quote }}
                </p>
              </div>
              <div
                class="overflow-hidden"
                :style="quoteMinHeight ? { minHeight: `${quoteMinHeight}px` } : undefined"
              >
                <p :key="index" class="smallText testimonial-copy">
                  {{ testimonials[index].quote }}
                </p>
              </div>
            </div>

            <div class="col-span-3 self-start">
              <div class="grid grid-cols-3 gap-[var(--gutter)]">
                <div class="col-span-1 flex justify-end">
                  <div class="relative aspect-square w-full overflow-hidden bg-secondary sm:w-2/3">
                    <div
                      v-for="(item, i) in testimonials"
                      :key="`${item.name}-avatar`"
                      :ref="(el) => setAvatarEl(el, i)"
                      class="absolute top-0 left-0 h-full w-full"
                      :class="i === 0 ? '' : 'scale-[1.05] opacity-0'"
                    >
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="h-full w-full object-cover grayscale"
                      >
                    </div>
                  </div>
                </div>
                <div class="col-span-2 space-y-[0.25vw] opacity-50">
                  <p :key="`name-${index}`" class="testimonial-copy whitespace-nowrap text-[2.5vw] sm:text-[1.1vw]">
                    {{ testimonials[index].name }}
                  </p>
                  <p
                    :key="`studio-${index}`"
                    class="testimonial-copy block pr-[2vw] font-mono text-[2.5vw] sm:text-[1.1vw]"
                    style="animation-delay: 0.08s"
                  >
                    {{ testimonials[index].studio }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-6 -mt-[5vw]">
          <div class="grid grid-cols-6 gap-[var(--gutter)]">
            <p class="col-span-6 smallText sm:col-span-3">
              Flores olarak bireylerin ve ailelerin ihtiyaçlarını ön planda tutuyor; teknolojiyi ve çağdaş mimariyi birleştirerek benzersiz çözümler sunuyoruz.
            </p>
            <p class="col-span-6 smallText sm:col-span-3">
              Yaşam alanları inşa etmenin ötesinde, yaşam kalitesini artırmayı ve topluma sosyal fayda sağlamayı misyon ediniyoruz.
            </p>
          </div>
        </div>
      </div>

      <BackgroundLogoSpinner :trigger="trigger" />
    </section>
  </div>
</template>

<style scoped>
.testimonial-copy {
  animation: testimonial-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes testimonial-up {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
