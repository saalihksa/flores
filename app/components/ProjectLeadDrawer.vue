<script setup lang="ts">
const props = defineProps<{
  open: boolean
  projectTitle: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { hovering } = useUi()
const sent = ref(false)
const name = ref('')
const phone = ref('')
const email = ref('')

const fieldClass =
  'w-full border-b border-black/10 bg-transparent py-3 extraSmallText text-secondary outline-none placeholder:text-black/25 transition-colors focus:border-cyan sm:py-[0.65vw]'

watch(
  () => props.open,
  (open) => {
    if (open) {
      sent.value = false
      name.value = ''
      phone.value = ''
      email.value = ''
      const lenis = useNuxtApp().$lenis as { stop?: () => void } | undefined
      lenis?.stop?.()
    }
    else {
      const lenis = useNuxtApp().$lenis as { start?: () => void } | undefined
      lenis?.start?.()
    }
  },
)

function submit() {
  sent.value = true
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  const lenis = useNuxtApp().$lenis as { start?: () => void } | undefined
  lenis?.start?.()
})
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-0 z-[70]">
      <button
        type="button"
        class="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        :class="open ? 'pointer-events-auto opacity-100' : 'opacity-0'"
        aria-label="Kapat"
        @click="emit('close')"
      />

      <aside
        class="absolute top-0 right-0 flex h-[100dvh] w-[min(88vw,22rem)] flex-col overflow-hidden shadow-[-4px_0_48px_rgb(0_0_0_/_0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[22vw] sm:max-w-[380px] sm:min-w-[300px]"
        :class="open ? 'pointer-events-auto translate-x-0' : 'translate-x-full'"
        :aria-hidden="!open"
      >
        <!-- Üst koyu başlık -->
        <div class="shrink-0 bg-[#004860] px-6 pt-[max(1.4rem,env(safe-area-inset-top))] pb-7 sm:px-[1.6vw] sm:pt-[1.6vw] sm:pb-[2vw]">
          <div class="flex items-start justify-between">
            <img
              src="/images/brand/dikey_renkli_flores.svg?v=3"
              alt="Flores"
              class="h-12 w-auto sm:h-[3.2vw]"
            >
            <button
              type="button"
              class="mt-1 extraSmallText text-white/50 transition-colors hover:text-white"
              @click="emit('close')"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              Kapat
            </button>
          </div>
          <div class="mt-6 sm:mt-[1.4vw]">
            <p class="extraSmallText text-white/45">
              {{ projectTitle.replace(/^FLORES\s+/i, 'Flores ') }}
            </p>
            <h2 class="mt-1 text-[1.55rem] font-medium leading-tight text-white sm:text-[2vw]">
              Satış danışmanıyla görüş
            </h2>
          </div>
        </div>

        <!-- Beyaz form alanı -->
        <div class="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-8 sm:px-[1.6vw] sm:pb-[1.8vw]">
          <form v-if="!sent" class="flex flex-col gap-5 pt-7 sm:gap-[1.2vw] sm:pt-[1.6vw]" @submit.prevent="submit">
            <label class="flex flex-col gap-1.5 sm:gap-[0.35vw]">
              <span class="extraSmallText text-black/50">Ad soyad</span>
              <input
                v-model="name"
                required
                autocomplete="name"
                placeholder="Adınızı yazın"
                :class="fieldClass"
              >
            </label>
            <label class="flex flex-col gap-1.5 sm:gap-[0.35vw]">
              <span class="extraSmallText text-black/50">Telefon</span>
              <input
                v-model="phone"
                type="tel"
                required
                autocomplete="tel"
                inputmode="tel"
                placeholder="5xx xxx xx xx"
                :class="fieldClass"
              >
            </label>
            <label class="flex flex-col gap-1.5 sm:gap-[0.35vw]">
              <span class="extraSmallText text-black/50">E-posta</span>
              <input
                v-model="email"
                type="email"
                required
                autocomplete="email"
                placeholder="ornek@mail.com"
                :class="fieldClass"
              >
            </label>

            <button
              type="submit"
              class="mt-3 inline-flex w-full items-center justify-between rounded-full bg-cyan px-5 py-3.5 extraSmallText font-medium text-primary transition-opacity hover:opacity-90 sm:mt-[0.6vw] sm:px-[1.1vw] sm:py-[0.8vw]"
              @mouseenter="hovering = true"
              @mouseleave="hovering = false"
            >
              <span>Talebi gönder</span>
              <span class="flex h-4 w-4 shrink-0 items-center justify-center sm:h-[1.4vw] sm:w-[1.4vw]" aria-hidden="true">
                <BurstMark size="xs" />
              </span>
            </button>

            <p class="extraSmallText leading-snug text-black/30">
              Göndererek
              <a href="https://flores.com.tr/kvkk" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-black/60 transition-colors">aydınlatma metnini</a>
              okuduğunuzu kabul edersiniz.
            </p>
          </form>

          <div v-else class="flex flex-col gap-3 pt-7 sm:gap-[0.6vw] sm:pt-[1.6vw]">
            <p class="smallText font-medium text-secondary">Talebiniz alındı</p>
            <p class="extraSmallText leading-relaxed text-black/50">
              Teşekkürler. Satış ekibimiz en kısa sürede sizinle iletişime geçecek.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
