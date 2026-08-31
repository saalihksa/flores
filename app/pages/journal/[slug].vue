<script setup lang="ts">
import { journal, projects } from '~/data/content'

const route = useRoute()
const post = computed(() => journal.find((p) => p.slug === route.params.slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Haber bulunamadı' })
}

useSeoMeta({
  title: `${post.value.title} | FLORES`,
  description: post.value.body[0],
})

type Block =
  | { kind: 'text'; text: string }
  | { kind: 'image'; src: string; caption: string }

const hero = computed(() => post.value!.images[0])
const blocks = computed<Block[]>(() => {
  const paras = post.value!.body
  const extras = post.value!.images.slice(1)
  const out: Block[] = []
  let n = 0
  paras.forEach((text, i) => {
    out.push({ kind: 'text', text })
    if ((i === 2 || i === 5) && extras[n]) {
      out.push({ kind: 'image', src: extras[n].src, caption: extras[n].caption })
      n += 1
    }
  })
  extras.slice(n).forEach((image) => {
    out.push({ kind: 'image', src: image.src, caption: image.caption })
  })
  return out
})

const related = computed(() =>
  projects.slice(0, 2).map((p) => ({
    src: p.cover,
    to: `/projects/${p.slug}`,
    alt: p.title,
    title: `Flores ${p.title.replace(/^FLORES\s+/i, '')}`,
  })),
)
</script>

<template>
  <article v-if="post" data-nav="dark" class="bg-primary pt-[16vw] text-secondary sm:pt-[14vw]">
    <header class="layout-grid">
      <p class="col-span-6 extraSmallText text-black/40 sm:col-span-12">{{ post.date }} · {{ post.read }}</p>
      <h1 class="col-span-6 mt-[3vw] largeText font-medium sm:col-span-10 sm:mt-[1.2vw]">
        {{ post.title }}
      </h1>
    </header>

    <div class="layout-grid mt-[5vw] items-end sm:mt-[2.4vw]">
      <div class="col-span-6 flex items-end gap-[3vw] sm:col-span-6 sm:gap-[1.1vw]">
        <img
          :src="post.portrait"
          :alt="post.author"
          class="h-[14vw] w-[14vw] object-cover sm:h-[4.4vw] sm:w-[4.4vw]"
        >
        <div class="pb-[0.15vw]">
          <p class="extraSmallText text-black/40">{{ post.role }}</p>
          <p class="smallText mt-[0.35vw] font-medium">{{ post.author }}</p>
        </div>
      </div>
    </div>

    <figure v-if="hero" class="mt-[6vw] px-[var(--margin)] sm:mt-[3.2vw]">
      <img
        :src="hero.src"
        :alt="hero.caption || post.title"
        class="aspect-[16/10] w-full object-cover"
      >
      <figcaption v-if="hero.caption" class="mt-[0.7vw] extraSmallText text-black/40">
        {{ hero.caption }}
      </figcaption>
    </figure>

    <div class="layout-grid mt-[8vw] pb-[8vw] sm:mt-[4.5vw] sm:pb-[2vw]">
      <template v-for="(block, i) in blocks" :key="i">
        <p
          v-if="block.kind === 'text'"
          class="col-span-6 mb-[6vw] smallText leading-[1.25] text-secondary sm:col-span-8 sm:mb-[2.4vw]"
        >
          {{ block.text }}
        </p>
        <figure
          v-else
          class="col-span-6 mb-[6vw] sm:col-span-10 sm:col-start-2 sm:mb-[3.2vw]"
        >
          <img :src="block.src" :alt="block.caption" class="aspect-[16/10] w-full object-cover">
          <figcaption class="mt-[0.7vw] extraSmallText text-black/40">
            {{ block.caption }}
          </figcaption>
        </figure>
      </template>
    </div>

    <div data-nav="dark" class="bg-primary text-secondary">
      <ExplorePair
        compact
        title="Bilgiyi projelerde görün"
        :cta="{ label: 'Tüm projeler', to: '/projects' }"
        :images="related"
      >
        Satıştaki konut projelerimiz: Flores Konakları, Nova, Deluxe, Optimist ve Evleri.
      </ExplorePair>
    </div>
  </article>
</template>
