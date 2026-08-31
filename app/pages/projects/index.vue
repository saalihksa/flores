<script setup lang="ts">
import { contractProjects, projects, saleBadgeLabel } from '~/data/content'

useSeoMeta({
  title: 'Projeler | FLORES',
  description:
    'Flores’in yenilikçi inşaat projelerini keşfedin. Devam eden, tamamlanan ve MİSEK İnşaat taahhüt projeleri.',
})

type Filter = 'all' | 'ongoing' | 'completed' | 'contract'

const { hovering } = useUi()
const filter = ref<Filter>('all')

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tüm projeler' },
  { id: 'ongoing', label: 'Devam eden projeler' },
  { id: 'completed', label: 'Tamamlanan projeler' },
  { id: 'contract', label: 'Taahhüt projeleri' },
]

const copy: Record<Filter, { title: string; text: string }> = {
  all: {
    title: 'Projeler',
    text: 'Satıştaki Flores konutları, tamamlanan işler ve MİSEK İnşaat taahhüt projeleri.',
  },
  ongoing: {
    title: 'Devam eden projeler',
    text: 'Şu an satışta ve inşaatı süren Flores konut projeleri.',
  },
  completed: {
    title: 'Tamamlanan projeler',
    text: 'Teslim edilmiş Flores yaşam alanları.',
  },
  contract: {
    title: 'Taahhüt projeleri',
    text: 'MİSEK İnşaat güvencesiyle yürütülen altyapı, üstyapı ve sağlık işleri.',
  },
}

const floresList = computed(() => {
  if (filter.value === 'ongoing') return projects.filter((p) => p.status === 'ongoing')
  if (filter.value === 'completed') return projects.filter((p) => p.status === 'completed')
  if (filter.value === 'contract') return []
  return projects
})

const showContract = computed(() => filter.value === 'all' || filter.value === 'contract')
</script>

<template>
  <div data-nav="dark" class="bg-primary pb-[10vw] text-secondary sm:pb-[4.5vw]">
    <section class="layout-grid h-fit bg-primary pt-[16vw] sm:pt-[14vw]">
      <h1 class="col-span-6 largeText font-medium">
        {{ copy[filter].title }}
      </h1>
      <p class="col-span-6 mt-[8vw] smallText sm:col-span-4 sm:col-start-9 sm:mt-[1.4vw]">
        {{ copy[filter].text }}
      </p>
    </section>

    <nav class="mt-6 sm:mt-[2.4vw]" aria-label="Proje sınıfları">
      <div class="overflow-x-auto px-[var(--margin)] pb-1 [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        <ul class="flex w-max items-center gap-2 sm:flex-wrap sm:w-full sm:gap-[0.55vw]">
          <li v-for="item in filters" :key="item.id">
            <button
              type="button"
              class="inline-flex shrink-0 items-center rounded-full px-4 py-3 text-[14px] font-medium leading-none transition-colors sm:px-[1.15vw] sm:py-[0.65vw] sm:text-[1.05vw]"
              :class="filter === item.id ? 'bg-[#004860] text-primary' : 'bg-[#004860]/12 text-secondary'"
              @click="filter = item.id"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <section
      v-if="floresList.length"
      class="layout-grid mt-[12vw] gap-y-[8vw] h-fit sm:mt-[4.5vw] sm:gap-y-[3.2vw]"
    >
      <div
        v-for="project in floresList"
        :key="project.slug"
        class="col-span-6"
      >
        <ProjectCard
          :to="`/projects/${project.slug}`"
          :src="project.cover"
          :title="project.title"
          :location="project.location"
          :badge="project.onSale ? saleBadgeLabel : undefined"
          aspect="16 / 10"
        />
      </div>
    </section>

    <section v-if="showContract" class="mt-[14vw] sm:mt-[6vw]">
      <div v-if="filter === 'all'" class="layout-grid mb-[8vw] sm:mb-[3vw]">
        <h2 class="col-span-6 mediumText font-medium sm:col-span-7">Taahhüt projeleri</h2>
        <p class="col-span-6 mt-[3vw] extraSmallText text-black/45 sm:col-span-4 sm:col-start-9 sm:mt-0">
          MİSEK İnşaat tarafından yürütülen kamu ve altyapı işleri.
        </p>
      </div>
      <div class="layout-grid gap-y-[8vw] h-fit sm:gap-y-[3vw]">
        <div
          v-for="project in contractProjects"
          :key="project.slug"
          class="col-span-6 h-fit"
        >
          <ProjectCard
            external
            :to="project.href"
            :src="project.cover"
            :title="project.title"
            :location="`${project.location} · ${project.year}`"
            chip="Daha fazla bilgi"
            aspect="16 / 10"
          />
        </div>
      </div>
      <div class="layout-grid mt-[2vw]">
        <div class="col-span-6 sm:col-span-12">
          <PillButton
            to="https://www.misek.com.tr/Projeler"
            tone="dark"
            size="sm"
          >
            Tüm taahhüt projeleri
          </PillButton>
        </div>
      </div>
    </section>
  </div>
</template>
