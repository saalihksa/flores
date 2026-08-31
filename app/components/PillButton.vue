<script setup lang="ts">
const { hovering } = useUi()

withDefaults(
  defineProps<{
    to?: string
    tone?: 'light' | 'dark'
    size?: 'sm' | 'lg' | 'hero'
  }>(),
  { size: 'lg' },
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-between rounded-full extraSmallText"
    :class="[
      tone === 'dark' ? 'bg-cyan text-primary' : 'bg-primary text-secondary',
      size === 'sm'
        ? 'gap-3 py-2.5 pl-3 pr-3.5 sm:gap-[2.3vw] sm:px-[0.9vw] sm:py-[0.7vw]'
        : size === 'hero'
          ? 'gap-4 py-3 pl-4 pr-4 sm:gap-[2.5vw] sm:px-[0.5vw] sm:py-[0.4vw]'
          : 'gap-5 py-3.5 pl-4 pr-4 sm:gap-[5vw] sm:py-[0.8vw] sm:pl-[1.2vw] sm:pr-[1.4vw]',
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <span><slot /></span>
    <span
      class="flex shrink-0 items-center justify-end"
      :class="size === 'sm' ? 'h-4 w-4 sm:h-[2vw] sm:w-[1.2vw]' : size === 'hero' ? 'h-4 w-4 sm:h-auto sm:w-[2vw]' : 'h-4 w-4 sm:h-[1.6vw] sm:w-[1.7vw]'"
      aria-hidden="true"
    >
      <BurstMark :size="size === 'sm' || size === 'hero' ? 'dot' : 'xs'" />
    </span>
  </NuxtLink>
  <button
    v-else
    type="button"
    class="inline-flex items-center justify-between gap-[3vw] rounded-full py-[1vw] pl-[2vw] pr-[3vw] extraSmallText sm:gap-[2.3vw] sm:px-[0.9vw] sm:py-[0.7vw]"
    :class="tone === 'light' ? 'bg-primary text-secondary' : 'bg-cyan text-primary'"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <span><slot /></span>
    <span class="flex w-[1.2vw] items-center justify-end" style="height: 2vw" aria-hidden="true">
      <BurstMark />
    </span>
  </button>
</template>
