<script setup lang="ts">
import { journal } from '~/data/content'

const posts = journal.slice(0, 3)
</script>

<template>
  <section data-nav="dark" class="relative z-10 h-fit w-full overflow-x-clip bg-primary py-8 text-secondary sm:py-[3.2vw]">
    <div class="layout-grid items-end">
      <h2 class="col-span-6 text-[5.4vw] font-medium sm:col-span-7 sm:text-[2.2vw]">
        Haberler
      </h2>
      <div class="col-span-6 mt-3 flex flex-col gap-3 sm:col-span-4 sm:col-start-9 sm:mt-0 sm:items-end sm:gap-[0.8vw]">
        <p class="extraSmallText leading-relaxed text-black/55 sm:text-right">
          FLORES ve MİSEK İnşaat’tan projeler ve kentsel dönüşüm.
        </p>
        <PillButton to="/journal" tone="dark" size="sm" class="w-fit">
          Tüm haberler
        </PillButton>
      </div>
    </div>

    <div class="layout-grid mt-6 gap-y-6 sm:mt-[1.8vw] sm:gap-y-0">
      <JournalCard
        v-for="post in posts"
        :key="post.slug"
        :to="`/journal/${post.slug}`"
        :title="post.title"
        :src="post.cover"
        :date="post.date"
        compact
        aspect="16 / 10"
      />
    </div>
  </section>
</template>
