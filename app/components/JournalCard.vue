<script setup lang="ts">
import gsap from 'gsap'

const { hovering } = useUi()

const props = defineProps<{
  to: string
  title: string
  src: string
  aspect?: string
  date?: string
  compact?: boolean
}>()

const root = ref<HTMLElement | null>(null)
const imgWrap = ref<HTMLElement | null>(null)
const overlay = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return

  const ctx = gsap.context(() => {
    if (imgWrap.value) {
      gsap.fromTo(
        imgWrap.value,
        { yPercent: 18, scale: 1.2 },
        {
          yPercent: -8,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 95%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }
    if (overlay.value) {
      gsap.fromTo(
        overlay.value,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 88%',
            end: 'top 55%',
            scrub: true,
          },
        },
      )
    }
  }, root.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div
    ref="root"
    class="h-fit cursor-pointer"
    :class="compact ? 'col-span-6 sm:col-span-4' : 'col-span-6'"
  >
    <NuxtLink
      :to="to"
      class="group flex h-full w-full flex-col"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="relative min-h-0 w-full overflow-hidden rounded-xl sm:rounded-[0.9vw]" :style="{ aspectRatio: props.aspect ?? '1 / 1' }">
        <div class="relative h-full w-full overflow-hidden bg-secondary">
          <div class="relative h-full w-full overflow-hidden">
            <div ref="overlay" class="absolute inset-0 z-10 bg-secondary" />
            <div ref="imgWrap" class="h-full w-full origin-bottom scale-[1.2]">
              <img
                :src="props.src"
                :alt="title"
                class="h-full w-full object-cover saturate-150"
              >
            </div>
            <ImageHoverChip label="Haberi oku" />
          </div>
        </div>
      </div>

      <div
        class="flex w-full flex-col items-center text-center"
        :class="compact ? 'pt-2.5 sm:pt-[0.75vw]' : 'pt-3 sm:pt-[1.2vw]'"
      >
        <span
          class="font-medium leading-snug text-pretty"
          :class="compact ? 'extraSmallText' : 'smallText'"
        >{{ title }}</span>
        <span v-if="date" class="extraSmallText mt-1.5 leading-none text-black/40 sm:mt-[0.45vw]">{{ date }}</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-cyan extraSmallText leading-none text-primary"
          :class="compact
            ? 'mt-2.5 px-2 py-1 sm:mt-[0.55vw] sm:gap-[0.45vw] sm:px-[0.65vw] sm:py-[0.38vw]'
            : 'mt-3 px-2.5 py-1.5 sm:mt-[0.85vw] sm:gap-[0.65vw] sm:px-[0.9vw] sm:py-[0.5vw]'"
        >
          <span>Haberi oku</span>
          <ChipArrow />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
