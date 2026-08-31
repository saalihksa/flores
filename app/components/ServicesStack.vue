<script setup lang="ts">
import { services } from '~/data/content'
</script>

<template>
  <section
    data-nav="dark"
    class="relative w-full overflow-y-clip bg-primary text-secondary"
  >
    <div class="layout-grid items-end mt-10 mb-8 sm:mt-[3vw] sm:mb-[2.2vw]">
      <div class="col-span-6 sm:col-span-7">
        <p class="extraSmallText mb-3 tracking-wide text-gold sm:mb-[0.65vw]">MİSEK İnşaat güvencesi</p>
        <h2 class="mediumText font-medium">Neden Flores?</h2>
      </div>
      <div class="col-span-6 mt-5 sm:col-span-4 sm:col-start-9 sm:mt-0">
        <p class="smallText text-black/70">
          Yenilikçi projeler ve MİSEK İnşaat’ın gücüyle konfor, güvenlik ve estetiği bir araya getiren bir yaşam markası.
        </p>
        <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1 extraSmallText text-secondary/55 sm:mt-[0.9vw] sm:gap-x-[1.2vw]">
          <li>Konfor</li>
          <li class="text-gold">·</li>
          <li>Güvenlik</li>
          <li class="text-gold">·</li>
          <li>Estetik</li>
        </ul>
      </div>
    </div>

    <article
      v-for="service in services"
      :key="service.n"
      class="relative h-fit w-full border-t border-gold/35 bg-primary"
    >
      <div class="layout-grid w-full py-8 sm:py-[2.2vw]">
        <p class="col-span-6 mediumText font-medium sm:col-span-3">{{ service.title }}</p>
        <p class="col-span-6 mt-4 smallText sm:col-span-5 sm:col-start-7 sm:mt-0">{{ service.copy }}</p>
      </div>
    </article>
  </section>
</template>
