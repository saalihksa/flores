<script setup lang="ts">
defineProps<{
  src: string
  title?: string
}>()
</script>

<template>
  <section id="sanal-tur" data-nav="dark" class="scroll-mt-[8vw] bg-primary py-6 text-secondary sm:py-[var(--margin)]">
    <div class="layout-grid mb-4 sm:mb-[4vw]">
      <h2 class="col-span-6 text-[1.5rem] font-medium leading-tight sm:col-span-8 sm:largeText">
        360° sanal tur
      </h2>
      <p class="col-span-6 mt-2 extraSmallText leading-snug text-black/70 sm:col-span-4 sm:col-start-9 sm:mt-0 sm:smallText sm:text-secondary">
        Daireyi sürükleyerek gezin. Alt şeritten odalar arasında geçiş yapabilirsiniz.
      </p>
    </div>
    <div class="px-[var(--margin)]">
      <div class="relative h-[68svh] min-h-[480px] w-full overflow-hidden bg-secondary sm:h-auto sm:min-h-0 sm:aspect-[16/9]">
        <iframe
          class="absolute inset-0 h-full w-full border-0"
          :src="src"
          :title="title ?? '360 sanal tur'"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
</template>
