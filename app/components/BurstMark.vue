<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'dot' | 'xs' | 'sm' | 'md'
  }>(),
  { size: 'sm' },
)

const dims = {
  dot: { box: 'max(14px, 1.15vw)', spoke: 'max(2px, 0.17vw)', arm: 'max(6px, 0.5vw)', dash: 'max(2px, 0.15vw)' },
  xs: { box: 'max(16px, 1.55vw)', spoke: 'max(2px, 0.22vw)', arm: 'max(8px, 0.68vw)', dash: 'max(2px, 0.18vw)' },
  sm: { box: 'max(18px, 3.4vw)', spoke: 'max(3px, 0.5vw)', arm: 'max(8px, 1.5vw)', dash: 'max(3px, 0.4vw)' },
  md: { box: '7.1vw', spoke: '0.95vw', arm: '3.17vw', dash: '0.77vw' },
}

const spokes = [45, 90, 135, 180, 225, 270, 315, 360]
</script>

<template>
  <div
    class="relative"
    :style="{ width: dims[size].box, height: dims[size].box }"
    aria-hidden="true"
  >
    <div
      v-for="deg in spokes"
      :key="deg"
      class="absolute top-0 left-1/2 h-fit origin-bottom -translate-x-1/2"
      :style="{
        width: dims[size].spoke,
        paddingBottom: dims[size].arm,
        transform: `rotate(${deg}deg)`,
      }"
    >
      <div
        class="w-full bg-current"
        :style="{ height: dims[size].dash }"
      />
    </div>
  </div>
</template>
