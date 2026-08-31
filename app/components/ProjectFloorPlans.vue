<script setup lang="ts">
const { hovering } = useUi()

const props = defineProps<{
  title?: string
  copy?: string
  mix?: string[]
  plans: { label: string; src: string }[]
}>()

const active = ref(0)
const current = computed(() => props.plans[active.value] ?? props.plans[0])
</script>

<template>
  <section id="kat-planlari" data-nav="dark" class="bg-primary py-[var(--margin)] text-secondary">
    <div class="layout-grid">
      <div class="col-span-6 flex flex-col gap-[1.6vw] sm:col-span-12 sm:flex-row sm:items-end sm:justify-between sm:gap-[2vw]">
        <h2 class="mediumText font-medium">
          {{ title ?? 'Kat planları' }}
        </h2>
        <p class="extraSmallText text-black/55 sm:max-w-[28vw] sm:text-right">
          {{ copy ?? '124 m²’den 192 m²’ye kadar geniş yaşam alanları.' }}
        </p>
      </div>

      <p
        v-if="mix?.length"
        class="col-span-6 mt-[3vw] extraSmallText leading-relaxed text-black/50 sm:col-span-12 sm:mt-[1.2vw]"
      >
        <template v-for="(item, i) in mix" :key="item">
          <span>{{ item }}</span>
          <span v-if="i < mix.length - 1" class="mx-[0.7vw] text-black/20">·</span>
        </template>
      </p>

      <div class="col-span-6 mt-[4vw] sm:col-span-12 sm:mt-[1.6vw]">
        <div class="flex flex-wrap gap-2 overflow-hidden rounded-full border border-secondary/15">
          <button
            v-for="(plan, i) in plans"
            :key="plan.label"
            type="button"
            class="rounded-full px-4 py-2.5 text-[14px] leading-none transition-colors sm:px-[1.2vw] sm:py-[0.55vw] sm:text-[1.1vw]"
            :class="i === active ? 'bg-secondary text-primary' : 'bg-primary text-secondary hover:bg-secondary/[0.06]'"
            @click="active = i"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            {{ plan.label }}
          </button>
        </div>

        <figure class="mt-[0.8vw] overflow-hidden rounded-xl border border-secondary/15 bg-[#f4f1ea] sm:rounded-[0.7vw]">
          <img
            :src="current.src"
            :alt="current.label"
            class="mx-auto max-h-[52vw] w-full object-contain"
          >
        </figure>
      </div>
    </div>
  </section>
</template>
