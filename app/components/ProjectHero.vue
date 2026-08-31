<script setup lang="ts">
import gsap from 'gsap'

const props = withDefaults(
  defineProps<{
    location: string
    type: string
    year: string
    title: string
    excerpt: string
    cover: string
    onSale?: boolean
    compact?: boolean
    projectSlug?: string
  }>(),
  { compact: false },
)

const { hovering, openContact } = useUi()

const root = ref<HTMLElement | null>(null)
const media = ref<HTMLElement | null>(null)
const mediaInner = ref<HTMLElement | null>(null)
const metaEls = ref<HTMLElement[]>([])
const excerptEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (!root.value) return

  const ctx = gsap.context(() => {
    gsap.to(metaEls.value, {
      opacity: 1,
      delay: 0.25,
      stagger: 0.05,
      ease: 'power4.out',
      duration: 3,
      overwrite: 'auto',
    })

    if (mediaInner.value) {
      gsap.to(mediaInner.value, {
        scale: 1,
        opacity: 1,
        delay: 1,
        ease: 'power4.out',
        duration: 1.5,
        overwrite: 'auto',
      })
    }

    if (excerptEl.value) {
      gsap.fromTo(
        excerptEl.value,
        { yPercent: 110 },
        {
          yPercent: 0,
          delay: 1.1,
          duration: 1.5,
          ease: 'power4.out',
          overwrite: 'auto',
        },
      )
    }

    if (media.value) {
      gsap.to(media.value, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      })
    }
  }, root.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section
    ref="root"
    data-nav="light"
    class="relative z-0 w-full overflow-hidden bg-secondary text-primary"
    :class="compact ? 'h-[62svh] min-h-[360px] sm:h-[min(52vh,40vw)] sm:min-h-[420px]' : 'h-[130svh]'"
  >
    <div
      class="layout-grid relative z-10 h-fit w-full"
      :class="compact ? 'pt-[22svh] sm:pt-[10vw]' : 'pt-[50svh] sm:pt-[20vw]'"
    >
      <div class="col-span-6">
        <div class="extraSmallText mb-[2vw] w-fit space-x-[1vw] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
          <span ref="metaEls" class="opacity-0">{{ location }}</span>
          <span ref="metaEls" class="opacity-0">{{ type }}</span>
          <span ref="metaEls" class="opacity-0">{{ year }}</span>
        </div>
        <div>
          <h1 ref="metaEls" class="largeText w-fit rounded-xl bg-secondary/25 px-3 py-1 font-medium opacity-0 backdrop-blur-md sm:rounded-[0.5vw] sm:px-[0.7vw] sm:py-[0.2vw]">
            {{ title }}
          </h1>
        </div>
      </div>
      <div
        class="col-span-6"
        :class="compact ? 'pt-[6vw] sm:col-span-4 sm:col-start-9 sm:pt-[1.2vw]' : 'pt-[20vw] sm:col-span-4 sm:col-start-9 sm:pt-[2vw]'"
      >
        <div class="relative block overflow-clip">
          <p ref="excerptEl" class="smallText rounded-xl bg-secondary/25 px-3 py-2.5 leading-snug backdrop-blur-md sm:rounded-[0.55vw] sm:px-[0.75vw] sm:py-[0.55vw]">
            {{ excerpt }}
          </p>
        </div>
        <button
          v-if="onSale"
          type="button"
          class="mt-4 inline-flex items-center justify-between gap-3 rounded-full bg-cyan px-5 py-3.5 text-[15px] font-medium leading-none text-primary sm:mt-[0.7vw] sm:gap-[0.7vw] sm:px-[0.85vw] sm:py-[0.55vw] sm:text-[1.1vw] sm:font-normal"
          @click="openContact(props.projectSlug)"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <span>Talep oluştur</span>
          <BurstMark size="xs" />
        </button>
      </div>
    </div>

    <div ref="media" class="absolute top-0 left-0 z-0 h-full w-full overflow-y-clip">
      <div ref="mediaInner" class="h-full w-full scale-[1.05] opacity-0">
        <img
          :src="cover"
          :alt="title"
          class="h-full w-full object-cover"
          :class="compact ? 'brightness-[0.62] saturate-[0.85] contrast-[0.95]' : 'opacity-80 saturate-150'"
          fetchpriority="high"
        >
        <div
          v-if="compact"
          class="pointer-events-none absolute inset-0 bg-black/35"
        />
      </div>
    </div>
  </section>
</template>
