<script setup lang="ts">
import { careers, projects } from '~/data/content'

const props = withDefaults(
  defineProps<{
    variant?: 'talep' | 'contact' | 'career'
    dark?: boolean
  }>(),
  { variant: 'talep', dark: false },
)

const { hovering, contactOpen, contactProject } = useUi()
const route = useRoute()

const sent = ref(false)
const name = ref('')
const email = ref('')
const phone = ref('')
const project = ref('')
const role = ref('')
const message = ref('')

const copy = computed(() => {
  if (props.variant === 'contact') {
    return {
      title: 'İletişim Formu',
      lead: 'Satış, randevu veya genel sorularınız için formu doldurun. Ekibimiz sizinle iletişime geçsin.',
      submit: 'Mesajı gönder',
      done: 'Mesajınız alındı',
      doneLead: 'Teşekkürler. En kısa sürede dönüş yapacağız.',
    }
  }
  if (props.variant === 'career') {
    return {
      title: 'Başvur',
      lead: 'Pozisyonu seçin, kısa bir not bırakın. İnsan kaynakları sizinle iletişime geçsin.',
      submit: 'Başvuruyu gönder',
      done: 'Başvurunuz alındı',
      doneLead: 'Teşekkürler. Uygun bir eşleşme olursa sizinle iletişime geçeriz.',
    }
  }
  return {
    title: 'Ön talep',
    lead: 'Flores projeleri için bilgilerinizi bırakın. Satış ekibimiz sizinle iletişime geçsin.',
    submit: 'Talebi gönder',
    done: 'Talebiniz alındı',
    doneLead: 'Teşekkürler. Satış ekibimiz sizinle iletişime geçsin.',
  }
})

const fieldClass = computed(() =>
  props.dark
    ? 'w-full border-b border-white/15 bg-transparent py-3 extraSmallText text-primary outline-none placeholder:text-white/25 focus:border-cyan transition-colors sm:py-[0.75vw]'
    : 'w-full border-b border-secondary/20 bg-transparent py-3 extraSmallText text-secondary outline-none placeholder:text-black/30 focus:border-cyan sm:py-[0.75vw]',
)

watch(
  () => route.query.rol,
  (value) => {
    if (typeof value === 'string' && careers.some((item) => item.slug === value)) {
      role.value = value
    }
  },
  { immediate: true },
)

function preferredProjectSlug() {
  const fromUi = contactProject.value
  const fromRoute = typeof route.params.slug === 'string' ? route.params.slug : ''
  const slug = fromUi || fromRoute
  return projects.some((item) => item.slug === slug) ? slug : ''
}

function resetForm() {
  sent.value = false
  name.value = ''
  email.value = ''
  phone.value = ''
  project.value = preferredProjectSlug()
  role.value = ''
  message.value = ''
}

watch(contactOpen, (open) => {
  if (open) project.value = preferredProjectSlug()
})

function submit() {
  sent.value = true
}

defineExpose({
  reset: resetForm,
})
</script>

<template>
  <form class="layout-grid pb-[12vw] sm:pb-[4vw]" @submit.prevent="submit">
    <input
      type="checkbox"
      name="extension"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
    >

    <template v-if="!sent">
      <h2 class="col-span-6 mediumText font-medium sm:col-span-7" :class="dark ? 'text-primary' : ''">{{ copy.title }}</h2>
      <p class="col-span-6 mt-4 extraSmallText leading-snug sm:col-span-4 sm:col-start-9 sm:mt-[0.4vw] sm:text-right" :class="dark ? 'text-white/50' : 'text-black/50'">
        {{ copy.lead }}
      </p>

      <label class="col-span-6 mt-10 flex flex-col gap-2 sm:col-span-6 sm:mt-[3vw] sm:gap-[0.45vw]">
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">Ad soyad</span>
        <input
          v-model="name"
          required
          autocomplete="name"
          placeholder="Adınızı yazın"
          :class="fieldClass"
        >
      </label>
      <label class="col-span-6 mt-8 flex flex-col gap-2 sm:col-span-6 sm:mt-[3vw] sm:gap-[0.45vw]">
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">Telefon</span>
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
      <label class="col-span-6 mt-8 flex flex-col gap-2 sm:col-span-6 sm:mt-[2.2vw] sm:gap-[0.45vw]">
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">E-posta</span>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="ornek@mail.com"
          :class="fieldClass"
        >
      </label>

      <label
        v-if="variant !== 'career'"
        class="col-span-6 mt-8 flex flex-col gap-2 sm:col-span-6 sm:mt-[2.2vw] sm:gap-[0.45vw]"
      >
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">İlgilendiğiniz proje</span>
        <select
          v-model="project"
          :required="variant === 'talep'"
          :class="fieldClass"
        >
          <option value="" :disabled="variant === 'talep'">
            {{ variant === 'talep' ? 'Proje seçin' : 'Proje seçin (isteğe bağlı)' }}
          </option>
          <option v-for="item in projects" :key="item.slug" :value="item.slug">
            {{ item.title.replace(/^FLORES\s+/i, 'Flores ') }}
          </option>
        </select>
      </label>

      <label
        v-if="variant === 'career'"
        class="col-span-6 mt-8 flex flex-col gap-2 sm:col-span-6 sm:mt-[2.2vw] sm:gap-[0.45vw]"
      >
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">Pozisyon</span>
        <select
          v-model="role"
          required
          :class="fieldClass"
        >
          <option value="" disabled>Pozisyon seçin</option>
          <option v-for="item in careers" :key="item.slug" :value="item.slug">
            {{ item.title }}
          </option>
        </select>
      </label>

      <label
        v-if="variant !== 'talep'"
        class="col-span-6 mt-8 flex flex-col gap-2 sm:col-span-12 sm:mt-[2.2vw] sm:gap-[0.45vw]"
      >
        <span class="extraSmallText" :class="dark ? 'text-white/60' : ''">{{ variant === 'career' ? 'Kısa not' : 'Mesajınız' }}</span>
        <textarea
          v-model="message"
          rows="3"
          :required="variant === 'contact'"
          :placeholder="variant === 'career' ? 'Deneyiminiz veya portfolyo bağlantınız' : 'Nasıl yardımcı olalım?'"
          :class="[fieldClass, 'resize-none leading-snug']"
        />
      </label>

      <div class="col-span-6 mt-10 sm:col-span-12 sm:mt-[2.8vw]">
        <button
          type="submit"
          class="inline-flex items-center justify-between gap-[1.6vw] rounded-full bg-cyan py-3 pl-4 pr-4 extraSmallText text-primary sm:py-[0.55vw] sm:pl-[0.95vw] sm:pr-[0.85vw]"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <span>{{ copy.submit }}</span>
          <span class="flex h-4 w-4 shrink-0 items-center justify-center sm:h-[1.55vw] sm:w-[1.55vw]" aria-hidden="true">
            <BurstMark size="xs" />
          </span>
        </button>
        <p class="mt-4 extraSmallText leading-snug sm:mt-[1vw]" :class="dark ? 'text-white/30' : 'text-black/40'">
          Göndererek
          <a href="https://flores.com.tr/kvkk" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">aydınlatma metnini</a>
          okuduğunuzu kabul edersiniz.
        </p>
      </div>
    </template>

    <template v-else>
      <h2 class="col-span-6 mediumText font-medium sm:col-span-8" :class="dark ? 'text-primary' : ''">{{ copy.done }}</h2>
      <p class="col-span-6 mt-4 extraSmallText leading-snug sm:col-span-7 sm:mt-[1vw]" :class="dark ? 'text-white/50' : 'text-black/50'">
        {{ copy.doneLead }}
      </p>
    </template>
  </form>
</template>
