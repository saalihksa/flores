<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{
  trigger?: HTMLElement | null
}>()

const spinner = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween | null = null

function bind() {
  tween?.scrollTrigger?.kill()
  tween?.kill()
  tween = null
  if (!props.trigger || !spinner.value) return

  tween = gsap.to(spinner.value, {
    rotateZ: 100,
    transformOrigin: '50% 50%',
    ease: 'none',
    scrollTrigger: {
      trigger: props.trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.1,
    },
  })
}

watch(() => props.trigger, () => nextTick(bind), { immediate: true })

onUnmounted(() => {
  tween?.scrollTrigger?.kill()
  tween?.kill()
})
</script>

<template>
  <div
    class="pointer-events-none absolute bottom-0 left-1/2 z-0 h-fit w-fit -translate-x-3/4 opacity-25 sm:translate-y-[45%]"
  >
    <div
      class="relative"
      style="width: 114.4vw; height: 114.4vw; perspective: 132vw"
    >
      <div
        class="size-full preserve-3d"
        style="transform: rotate3d(0.27, -1.005, 1.5, 85deg)"
      >
        <div
          ref="spinner"
          id="background-logo-spinner"
          class="relative size-full preserve-3d"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="pointer-events-none absolute inset-0"
            :style="{ transform: `rotate(${(i - 1) * 45}deg)` }"
          >
            <div
              class="absolute left-1/2 -translate-x-1/2 bg-primary opacity-30"
              style="width: 13.2vw; height: 11.12vw; bottom: calc(50% + 44vw)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
