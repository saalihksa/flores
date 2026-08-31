<script setup lang="ts">
import { journal } from '~/data/content'

useSeoMeta({
  title: 'Haberler | FLORES',
  description:
    'FLORES ve MİSEK İnşaat’tan İstanbul’daki yeni yaşam alanları, kentsel dönüşüm ve kurumsal gelişmeler.',
})
</script>

<template>
  <div data-nav="dark" class="bg-primary pb-[10vw] text-secondary sm:pb-[4.5vw]">
    <section class="layout-grid h-fit bg-primary pt-[16vw] sm:pt-[14vw]">
      <h1 class="col-span-6 largeText font-medium">
        Haberler
      </h1>
      <p class="col-span-6 mt-[8vw] smallText sm:col-span-4 sm:col-start-9 sm:mt-[1.4vw]">
        FLORES ve MİSEK İnşaat’tan İstanbul’daki yeni yaşam alanları, kentsel dönüşüm ve kurumsal gelişmeler.
      </p>
    </section>

    <section class="layout-grid mt-[12vw] gap-y-[8vw] h-fit sm:mt-[4.5vw] sm:gap-y-[3.2vw]">
      <JournalCard
        v-for="post in journal"
        :key="post.slug"
        :to="`/journal/${post.slug}`"
        :title="post.title"
        :src="post.cover"
        :date="post.date"
        aspect="16 / 10"
      />
    </section>
  </div>
</template>
