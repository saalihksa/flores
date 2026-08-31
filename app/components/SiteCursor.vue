<script setup lang="ts">
const { hovering } = useUi()
const route = useRoute()
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

watch(() => route.fullPath, () => {
  hovering.value = false
})

onMounted(() => {
  const x = { d: 0, r: 0 }
  const y = { d: 0, r: 0 }
  let mx = window.innerWidth / 2
  let my = window.innerHeight / 2
  let raf = 0

  const move = (e: PointerEvent) => {
    mx = e.clientX
    my = e.clientY
  }

  const loop = () => {
    x.d += (mx - x.d) * 0.35
    y.d += (my - y.d) * 0.35
    x.r += (mx - x.r) * 0.16
    y.r += (my - y.r) * 0.16
    if (dot.value) {
      dot.value.style.transform = `translate3d(${x.d}px, ${y.d}px, 0) translate(-50%, -50%)`
    }
    if (ring.value) {
      ring.value.style.transform = `translate3d(${x.r}px, ${y.r}px, 0) translate(-50%, -50%)`
    }
    raf = requestAnimationFrame(loop)
  }

  window.addEventListener('pointermove', move, { passive: true })
  loop()

  onUnmounted(() => {
    window.removeEventListener('pointermove', move)
    cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="dot"
      class="cursor-dot pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
      :class="{ 'is-hover': hovering }"
    />
    <div
      ref="ring"
      class="cursor-ring pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
      :class="{ 'is-hover': hovering }"
    />
  </Teleport>
</template>
