<script setup lang="ts">
const { hovering } = useUi()
defineProps<{
  to?: string
  label?: string
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="group pr-[1vw] h-fit extraSmallText"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out">
      <slot>{{ label }}</slot>
    </div>
    <div class="underline-grow w-full" />
  </NuxtLink>
  <button
    v-else
    type="button"
    class="group extraSmallText text-left"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="group-hover:translate-y-[-0.25vw] transition-transform duration-200 ease-out">
      <slot>{{ label }}</slot>
    </div>
    <div class="underline-grow w-full" />
  </button>
</template>
