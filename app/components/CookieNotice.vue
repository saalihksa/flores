<script setup lang="ts">
const { hovering, introReady, menuOpen, contactOpen } = useUi()
const open = ref(false)
const ready = ref(false)

const STORAGE_KEY = 'flores-cookie-consent'

onMounted(() => {
  try {
    open.value = localStorage.getItem(STORAGE_KEY) !== '1'
  }
  catch {
    open.value = true
  }

  if (introReady.value) {
    ready.value = true
    return
  }

  const t = window.setTimeout(() => {
    ready.value = true
  }, 1800)

  const stop = watch(introReady, (value) => {
    if (!value) return
    ready.value = true
    window.clearTimeout(t)
    stop()
  })
})

function accept() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  }
  catch {
    /* ignore */
  }
  open.value = false
}

const show = computed(
  () => open.value && ready.value && !menuOpen.value && !contactOpen.value,
)
</script>

<template>
  <div
    v-if="show"
    class="pointer-events-auto fixed right-4 bottom-[max(1.1rem,env(safe-area-inset-bottom))] z-[80] max-w-[21rem] rounded-2xl border border-secondary/10 bg-primary p-4 text-secondary sm:right-[var(--margin)] sm:bottom-[1.8vw] sm:rounded-[1vw] sm:p-[1.15vw]"
    role="dialog"
    aria-label="Çerez bildirimi"
  >
    <p class="text-[13px] leading-snug text-black/65 sm:extraSmallText">
      Sitede temel işlev ve deneyim için çerezler kullanılır.
      <NuxtLink
        to="/cookie-policy"
        class="text-secondary underline decoration-secondary/25 underline-offset-2 hover:decoration-gold"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        Çerez politikası
      </NuxtLink>
    </p>
    <button
      type="button"
      class="mt-3 inline-flex items-center rounded-full bg-cyan px-3 py-2 text-[13px] text-primary sm:mt-[0.75vw] sm:px-[0.9vw] sm:py-[0.5vw] sm:extraSmallText"
      @click="accept"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      Kabul et
    </button>
  </div>
</template>
