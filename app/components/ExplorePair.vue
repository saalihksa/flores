<script setup lang="ts">
import gsap from 'gsap'

const { hovering } = useUi()

const props = defineProps<{
  title?: string
  images: { src: string; to: string; alt: string; title?: string }[]
  cta?: { label: string; to: string }
  compact?: boolean
}>()

const aspects = computed(() =>
  props.compact ? ['aspect-[16/10]', 'aspect-[16/10]'] : ['aspect-[12/16]', 'aspect-[14/12]'],
)
const cardRoots = ref<HTMLElement[]>([])
const imgWraps = ref<HTMLElement[]>([])
const overlays = ref<HTMLElement[]>([])

function setCard(el: Element | null, i: number) {
  if (el) cardRoots.value[i] = el as HTMLElement
}
function setImg(el: Element | null, i: number) {
  if (el) imgWraps.value[i] = el as HTMLElement
}
function setOverlay(el: Element | null, i: number) {
  if (el) overlays.value[i] = el as HTMLElement
}

onMounted(async () => {
  await nextTick()
  const mobile = window.matchMedia('(max-width: 640px)').matches
  const ctx = gsap.context(() => {
    cardRoots.value.forEach((root, i) => {
      if (!root) return
      if (mobile) {
        if (imgWraps.value[i]) gsap.set(imgWraps.value[i], { yPercent: 0, scale: 1 })
        if (overlays.value[i]) gsap.set(overlays.value[i], { opacity: 0 })
        return
      }
      if (imgWraps.value[i]) {
        gsap.fromTo(
          imgWraps.value[i],
          { yPercent: 18, scale: 1.2 },
          {
            yPercent: -8,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: root,
              start: 'top 95%',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
      }
      if (overlays.value[i]) {
        gsap.fromTo(
          overlays.value[i],
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 1.1,
            },
          },
        )
      }
    })
  })

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section class="w-full">
    <div
      v-if="title || $slots.default"
      class="layout-grid relative w-full items-start"
      :class="compact ? 'mt-[8vw] sm:mt-[4vw]' : 'mt-[20vw]'"
    >
      <div class="col-span-6 sm:col-span-7">
        <h2 v-if="title" class="font-medium" :class="compact ? 'mediumText' : 'largeText'">{{ title }}</h2>
        <p v-if="$slots.default && compact" class="smallText mt-[1.2vw] text-secondary/70">
          <slot />
        </p>
      </div>
      <div
        v-if="!compact"
        class="col-span-6 flex flex-col justify-between sm:col-span-4 sm:col-start-8"
        :class="'my-[5vw] sm:my-0'"
      >
        <div class="mt-[2vw] w-full">
          <p v-if="$slots.default" class="smallText text-secondary">
            <slot />
          </p>
        </div>
        <div v-if="cta" class="mt-[5vw] sm:mt-0">
          <PillButton :to="cta.to" tone="dark">{{ cta.label }}</PillButton>
        </div>
      </div>
      <div v-else-if="cta" class="col-span-6 mt-4 flex sm:col-span-5 sm:mt-0 sm:justify-end">
        <PillButton :to="cta.to" tone="dark">{{ cta.label }}</PillButton>
      </div>
    </div>

    <div
      class="layout-grid h-fit w-full bg-primary"
      :class="compact ? 'mt-6 gap-y-10 pb-16 sm:mt-[3vw] sm:gap-y-0 sm:pb-[4vw]' : 'mt-[10vw] gap-y-10 sm:gap-y-0'"
      :data-nav="compact ? 'dark' : 'light'"
    >
      <NuxtLink
        v-for="(image, i) in images"
        :key="image.to + image.src"
        :to="image.to"
        class="group col-span-6 cursor-pointer"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div :ref="(el) => setCard(el, i)" class="w-full" :class="aspects[i] ?? 'aspect-[12/16]'">
          <div class="relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-secondary sm:rounded-[0.9vw]">
            <div class="relative h-full w-full overflow-hidden">
              <div
                :ref="(el) => setOverlay(el, i)"
                class="absolute inset-0 z-10 bg-secondary"
              />
              <div
                :ref="(el) => setImg(el, i)"
                class="h-full w-full origin-bottom object-cover sm:scale-[1.2]"
              >
                <img
                  :src="image.src"
                  :alt="image.alt"
                  class="h-full w-full object-cover saturate-150"
                >
              </div>
              <ImageHoverChip v-if="!compact" label="İncele" />
            </div>
          </div>
        </div>
        <p
          v-if="image.title"
          class="mediumText mt-4 text-center font-medium text-secondary sm:mt-[1.1vw]"
        >
          {{ image.title }}
        </p>
        <span v-if="image.title" class="mx-auto mt-2 block h-[2px] w-10 bg-gold sm:mt-[0.55vw] sm:h-px sm:w-[2.4vw]" />
        <span
          v-if="image.title"
          class="mx-auto mt-3 mb-2 flex w-fit items-center gap-2 rounded-full bg-cyan px-4 py-2.5 text-[15px] leading-none text-primary sm:mt-[1.1vw] sm:mb-0 sm:gap-[0.65vw] sm:px-[0.9vw] sm:py-[0.5vw] sm:text-[1.1vw]"
        >
          İncele
          <ChipArrow />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
