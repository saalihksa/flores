<script setup lang="ts">
</script>

<template>
  <div class="relative font-sans">
    <Preloader />
    <SiteCursor />
    <SiteHeader />
    <ContactSticky />
    <SiteMenu />
    <ContactOverlay />
    <div class="relative z-10">
      <slot />
    </div>
    <SiteFooter />
    <ClientOnly>
      <CookieNotice />
    </ClientOnly>
  </div>
</template>
