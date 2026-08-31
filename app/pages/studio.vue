<script setup lang="ts">
import { studioAbout, team } from '~/data/content'

useSeoMeta({
  title: 'Kurumsal | FLORES',
  description:
    'Flores, modern yaşam için yenilikçi projeler geliştirerek konfor, güvenlik ve estetiği bir araya getiriyor. MİSEK İnşaat güvencesiyle şehir hayatına değer katıyoruz.',
})

const stats = team.slice(0, 4)
</script>

<template>
  <div class="relative h-fit bg-primary">
    <ProjectHero
      location="İstanbul"
      type="MİSEK İnşaat"
      year="1992"
      title="Kurumsal"
      :excerpt="studioAbout.heroExcerpt"
      cover="/images/hero/peyzaj.jpg"
      compact
    />

    <section data-nav="dark" class="bg-primary text-secondary">
      <div class="mx-auto max-w-[860px] px-[var(--margin)] pt-[12vw] pb-[8vw] sm:px-0 sm:pt-[5vw] sm:pb-[4vw]">
        <h2 class="mediumText font-medium leading-snug">{{ studioAbout.intro.lead }}</h2>
        <div class="mt-[5vw] space-y-[2.5vw] border-t border-secondary/10 pt-[5vw] sm:mt-[2.5vw] sm:space-y-[1vw] sm:pt-[2vw]">
          <p class="extraSmallText leading-relaxed text-black/55">{{ studioAbout.intro.body }}</p>
          <p class="extraSmallText leading-relaxed text-black/55">{{ studioAbout.flagship.body }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 border-t border-secondary/10 sm:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="border-r border-secondary/10 px-[var(--margin)] py-[5vw] last:border-r-0 sm:py-[2vw]"
        >
          <p class="smallText font-medium">{{ stat.name }}</p>
          <p class="mt-[1.5vw] extraSmallText text-black/40 sm:mt-[0.5vw]">{{ stat.role }}</p>
        </div>
      </div>
    </section>

    <section data-nav="dark" class="bg-primary border-t border-secondary/10 text-secondary">
      <div class="mx-auto max-w-[860px] px-[var(--margin)] py-[10vw] sm:px-0 sm:py-[4.5vw]">
        <p class="extraSmallText tracking-wide text-gold">Misyonumuz</p>
        <h2 class="mt-[2.5vw] smallText font-medium sm:mt-[0.8vw]">{{ studioAbout.mission.title }}</h2>
        <p class="mt-[3vw] extraSmallText leading-relaxed text-black/55 sm:mt-[1.2vw]">{{ studioAbout.mission.body }}</p>

        <div class="mt-[8vw] border-t border-secondary/10 pt-[8vw] sm:mt-[3.5vw] sm:pt-[3.5vw]">
          <p class="extraSmallText tracking-wide text-gold">Altyapımız</p>
          <h2 class="mt-[2.5vw] smallText font-medium sm:mt-[0.8vw]">{{ studioAbout.misek.title }}</h2>
          <p class="mt-[3vw] extraSmallText font-medium sm:mt-[1.2vw]">{{ studioAbout.misek.lead }}</p>
          <p class="mt-[2vw] extraSmallText leading-relaxed text-black/55 sm:mt-[0.8vw]">{{ studioAbout.misek.body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
