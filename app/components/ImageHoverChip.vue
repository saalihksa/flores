<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    rest?: 'none' | 'top-left' | 'bottom-center'
  }>(),
  { rest: 'none' },
)

const { hovering } = useUi()
const root = ref<HTMLElement | null>(null)
const chip = ref<HTMLElement | null>(null)
const following = ref(false)
const x = ref(0)
const y = ref(0)

function pad() {
  return (window.innerWidth / 100) * 1.1
}

function snapRest() {
  const host = root.value?.parentElement
  const el = chip.value
  if (!host || !el || props.rest === 'none') return
  const r = host.getBoundingClientRect()
  const w = el.offsetWidth
  const h = el.offsetHeight
  if (props.rest === 'bottom-center') {
    x.value = Math.max((r.width - w) / 2, 0)
    y.value = Math.max(r.height - h - pad(), 0)
    return
  }
  x.value = 0
  y.value = 0
}

function place(e: PointerEvent) {
  const host = root.value?.parentElement
  if (!host) return
  const r = host.getBoundingClientRect()
  const w = chip.value?.offsetWidth ?? 0
  const h = chip.value?.offsetHeight ?? 0
  const nx = e.clientX - r.left
  const ny = e.clientY - r.top
  x.value = Math.min(Math.max(nx, 0), Math.max(r.width - w, 0))
  y.value = Math.min(Math.max(ny, 0), Math.max(r.height - h, 0))
  following.value = true
  hovering.value = false
}

function hide(e: PointerEvent) {
  following.value = false
  snapRest()
  const host = root.value?.parentElement
  const link = host?.closest('a')
  const next = e.relatedTarget
  hovering.value = !!(link && next instanceof Node && link.contains(next))
}

onMounted(() => {
  const host = root.value?.parentElement
  if (!host) return
  snapRest()
  host.addEventListener('pointermove', place, { passive: true })
  host.addEventListener('pointerenter', place, { passive: true })
  host.addEventListener('pointerleave', hide)
  window.addEventListener('resize', snapRest)
  onUnmounted(() => {
    host.removeEventListener('pointermove', place)
    host.removeEventListener('pointerenter', place)
    host.removeEventListener('pointerleave', hide)
    window.removeEventListener('resize', snapRest)
  })
})
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden sm:block"
  >
    <div
      ref="chip"
      class="absolute top-0 left-0 inline-flex items-center gap-1.5 rounded-full bg-cyan px-2.5 py-1.5 extraSmallText text-primary sm:gap-[0.65vw] sm:px-[0.85vw] sm:py-[0.45vw]"
      :class="following || rest !== 'none' ? 'opacity-100' : 'opacity-0'"
      :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    >
      <span>{{ label }}</span>
      <ChipArrow />
    </div>
  </div>
</template>
