<script setup lang="ts">
const props = withDefaults(defineProps<{
  scale?: number
  color?: 'primary' | 'secondary'
}>(), {
  scale: 1.2,
  color: 'primary',
})

const size = computed(() => `${props.scale * 13}vw`)
const barWidth = computed(() => `${props.scale * 1.5}vw`)
const barHeight = computed(() => `${props.scale * 1.15}vw`)
const paddingBottom = computed(() => `${props.scale * 5}vw`)
const perspective = computed(() => `${props.scale * 12}vw`)
const barColor = computed(() => props.color === 'primary' ? 'bg-primary' : 'bg-secondary')
</script>

<template>
  <div
    class="relative"
    :style="{
      width: size,
      height: size,
      transform: `perspective(${perspective}) rotate3d(0.29, -1.01, 1.32, 91deg)`,
    }"
  >
    <div
      v-for="deg in [45, 90, 135, 180, 225, 270, 315, 360]"
      :key="deg"
      class="absolute top-0 left-1/2 h-fit origin-bottom -translate-x-1/2"
      :style="{ width: barWidth, paddingBottom, transform: `rotate(${deg}deg)` }"
    >
      <div class="w-full" :class="barColor" :style="{ height: barHeight }" />
    </div>
  </div>
</template>
