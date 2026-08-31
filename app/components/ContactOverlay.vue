<script setup lang="ts">
import gsap from 'gsap'

const { contactOpen, closeContact, hovering } = useUi()
const root = ref<HTMLElement | null>(null)
const form = ref<{ reset: () => void } | null>(null)

watch(contactOpen, async (open) => {
  await nextTick()
  if (!root.value) return
  if (open) form.value?.reset()
  gsap.to(root.value, {
    height: open ? '100lvh' : 0,
    duration: 0.7,
    ease: 'power3.inOut',
  })
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="root"
      class="fixed top-0 left-0 z-[60] h-0 w-full overflow-hidden bg-[#004860] text-primary"
      :class="contactOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <div class="relative h-[100lvh] overflow-y-auto pt-[max(0.7rem,env(safe-area-inset-top))]">
        <div class="relative flex items-center justify-center pt-4 pb-2 sm:pt-[1.5vw] sm:pb-[0.5vw]">
          <NuxtLink
            to="/"
            class="flex items-center justify-center"
            @click="closeContact()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            <img
              src="/images/brand/dikey_renkli_flores.svg?v=3"
              alt="Flores"
              class="block h-24 w-auto sm:h-[7vw]"
            >
          </NuxtLink>
          <button
            type="button"
            class="absolute right-[var(--margin)] top-1/2 -translate-y-1/2 extraSmallText text-primary/60 transition-colors hover:text-primary"
            @click="closeContact()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            Kapat
          </button>
        </div>

        <div class="mt-[8vw] sm:mt-[5vw]">
          <ContactForm ref="form" dark />
        </div>
      </div>
    </div>
  </Teleport>
</template>
