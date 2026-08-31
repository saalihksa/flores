<script setup lang="ts">
const HALF_DEFAULT = new Set([0, 1, 6, 7, 11, 12])

const props = defineProps<{
  images: { src: string; alt: string }[]
  halfIndices?: number[]
}>()

const halves = computed(() =>
  props.halfIndices ? new Set(props.halfIndices) : HALF_DEFAULT,
)
</script>

<template>
  <section data-nav="light" class="h-fit w-full bg-primary py-[var(--gutter)]">
    <div class="layout-grid w-full">
      <ProjectGalleryItem
        v-for="(image, i) in images"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        :half="halves.has(i)"
      />
    </div>
  </section>
</template>
