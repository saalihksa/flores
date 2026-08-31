<script setup lang="ts">
import { projects } from '~/data/content'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Proje bulunamadı' })
}

useSeoMeta({
  title: `${project.value.title} | FLORES`,
  description: project.value.excerpt,
})

const others = computed(() =>
  projects.filter((p) => p.slug !== project.value!.slug).slice(0, 2),
)

const galleryImages = computed(() => {
  const rest = project.value!.gallery.slice(1)
  if (project.value!.slug === 'flores-konaklari') return rest.slice(3)
  return rest
})
const galleryHalfIndices = computed(() =>
  project.value!.slug === 'flores-konaklari' ? [3, 4] : undefined,
)
const heroCover = computed(() => project.value!.gallery[0]?.src ?? project.value!.cover)
const floorPlans = computed(() => ('plans' in project.value! ? project.value.plans : []) ?? [])
const unitMix = computed(() => ('mix' in project.value! ? project.value.mix : undefined))
</script>

<template>
  <div v-if="project" class="relative h-fit bg-primary">
    <ProjectHero
      :location="project.location"
      :type="project.type"
      :year="project.year"
      :title="project.title"
      :excerpt="project.excerpt"
      :cover="heroCover"
      :on-sale="!!project.onSale"
      :project-slug="project.slug"
    />

    <ProjectGallery :images="galleryImages" :half-indices="galleryHalfIndices" />

    <KuulaTour
      v-if="project.tour"
      :src="project.tour"
      :title="`${project.title} 360 sanal tur`"
    />

    <ProjectFloorPlans
      v-if="floorPlans.length"
      :plans="floorPlans"
      :mix="unitMix"
    />

    <div data-nav="dark" class="bg-primary text-secondary">
      <ExplorePair
        compact
        title="Benzer projeleri inceleyin"
        :cta="{ label: 'Tüm projeler', to: '/projects' }"
        :images="others.map((p) => ({
          src: p.cover,
          to: `/projects/${p.slug}`,
          alt: p.title,
          title: `Flores ${p.title.replace(/^FLORES\s+/i, '')}`,
        }))"
      >
        Satıştaki diğer Flores konut projeleri.
      </ExplorePair>
    </div>
  </div>
</template>
