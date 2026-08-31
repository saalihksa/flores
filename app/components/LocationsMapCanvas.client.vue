<script setup lang="ts">
import { locations } from '~/data/content'

const { hovering } = useUi()
const mapEl = ref<HTMLElement | null>(null)
const active = ref(0)
const items = computed(() => locations)

let leaflet: any = null
let map: any = null
const markers: any[] = []

function shortName(title: string) {
  return title.replace(/^FLORES\s+/i, 'Flores ')
}

function pinCopy(index: number) {
  const loc = items.value[index]
  const rest = (loc?.title ?? '').replace(/^FLORES\s+/i, '').trim()
  return {
    name: rest.toLocaleUpperCase('tr-TR'),
    place: (loc?.district ?? '').toLocaleUpperCase('tr-TR'),
  }
}

function isPhone() {
  return window.innerWidth < 640
}

function pinHtml(index: number, on: boolean) {
  const loc = items.value[index]
  if (!loc) return ''
  const { name, place } = pinCopy(index)
  const compact = isPhone() && !on
  if (compact) {
    return `
      <div class="flores-tabela is-mini">
        <svg class="flores-tabela-shape" viewBox="0 0 88 114" aria-hidden="true">
          <path d="M44 113C44 113 6 72 6 43.5C6 21.5 23 4 44 4s38 17.5 38 39.5C82 72 44 113 44 113z"/>
        </svg>
      </div>
    `
  }
  return `
    <div class="flores-tabela ${on ? 'is-on' : ''} ${isPhone() ? 'is-phone' : ''}">
      <svg class="flores-tabela-shape" viewBox="0 0 88 114" aria-hidden="true">
        <path d="M44 113C44 113 6 72 6 43.5C6 21.5 23 4 44 4s38 17.5 38 39.5C82 72 44 113 44 113z"/>
      </svg>
      <div class="flores-tabela-copy">
        <span class="flores-tabela-brand">FLORES</span>
        <span class="flores-tabela-name">${name}</span>
        ${place ? `<span class="flores-tabela-place">${place}</span>` : ''}
      </div>
    </div>
  `
}

function pinIcon(index: number, on: boolean) {
  const phone = isPhone()
  const size = phone ? (on ? 64 : 28) : on ? 80 : 70
  const h = phone ? (on ? 84 : 36) : on ? 104 : 90
  return leaflet.divIcon({
    className: 'flores-map-pin',
    html: pinHtml(index, on),
    iconSize: [size, h],
    iconAnchor: [size / 2, h - 2],
  })
}

function paintPins() {
  if (!leaflet) return
  markers.forEach((marker, i) => {
    if (!items.value[i]) return
    const on = i === active.value
    marker.setIcon(pinIcon(i, on))
    marker.setZIndexOffset(on ? 800 : 10 + i)
  })
}

function focusIndex(index: number, fly = true) {
  active.value = index
  paintPins()
  const loc = items.value[index]
  if (fly && map && loc) {
    map.flyTo([loc.lat, loc.lng], 13, { duration: 0.7 })
  }
}

function fitAll() {
  if (!map || !leaflet) return
  map.invalidateSize()
  const bounds = leaflet.latLngBounds(items.value.map((location) => [location.lat, location.lng]))
  const pad = window.innerWidth < 640 ? [28, 48] : [20, 28]
  map.fitBounds(bounds, { padding: pad, maxZoom: window.innerWidth < 640 ? 12 : 13 })
}

onMounted(async () => {
  if (!import.meta.client) return
  const mod = await import('leaflet')
  leaflet = mod.default ?? mod
  await nextTick()
  if (!mapEl.value || !leaflet) return

  map = leaflet.map(mapEl.value, {
    scrollWheelZoom: false,
    attributionControl: false,
    zoomControl: false,
    zoomSnap: 0.25,
    minZoom: 10,
    maxZoom: 13,
  })

  leaflet
    .tileLayer('https://{s}.google.com/vt/lyrs=m&hl=tr&x={x}&y={y}&z={z}', {
      maxZoom: 13,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    })
    .addTo(map)

  items.value.forEach((location, index) => {
    const marker = leaflet.marker([location.lat, location.lng], {
      icon: pinIcon(index, index === 0),
      zIndexOffset: index === 0 ? 800 : 10 + index,
      title: shortName(location.title),
    })
    marker.on('click', () => {
      if (active.value === index) {
        navigateTo(`/projects/${location.slug}`)
        return
      }
      focusIndex(index)
    })
    marker.addTo(map)
    markers.push(marker)
  })

  requestAnimationFrame(fitAll)
  setTimeout(fitAll, 180)
  setTimeout(fitAll, 480)

  const onResize = () => {
    map?.invalidateSize()
    paintPins()
    fitAll()
  }
  window.addEventListener('resize', onResize)
  const ro = new ResizeObserver(onResize)
  ro.observe(mapEl.value)
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    ro.disconnect()
  })
})

onUnmounted(() => {
  map?.remove()
  map = null
  markers.length = 0
  leaflet = null
})
</script>

<template>
  <section data-nav="dark" class="relative z-10 bg-primary py-5 text-secondary sm:py-[1.8vw]">
    <div class="px-[var(--margin)] sm:px-[2.2vw]">
      <div class="relative h-[68svh] min-h-[420px] overflow-hidden rounded-[1.25rem] sm:h-[min(78vh,48vw)] sm:min-h-[580px] sm:rounded-[1.35vw]">
        <div ref="mapEl" class="flores-leaflet h-full w-full" />
      </div>

      <div class="mt-4 -mx-[var(--margin)] overflow-x-auto px-[var(--margin)] pb-1 [scrollbar-width:none] sm:mx-0 sm:mt-[1.05vw] sm:overflow-x-auto sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div class="flex w-max items-center gap-2.5 pr-14 sm:justify-center sm:gap-[0.55vw] sm:pr-0">
          <button
            v-for="(location, i) in items"
            :key="location.slug"
            type="button"
            class="flex shrink-0 snap-start items-center rounded-full px-5 py-3 text-[16px] font-medium leading-none text-primary sm:px-[1.2vw] sm:py-[0.65vw] sm:text-[1.05vw] sm:font-normal"
            :class="i === active ? 'bg-[#004860]' : 'bg-[#004860]/35'"
            @click="focusIndex(i)"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            {{ shortName(location.title) }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.flores-map-pin {
  background: none !important;
  border: none !important;
  overflow: visible !important;
}
.flores-leaflet.leaflet-container,
.leaflet-container.flores-leaflet {
  width: 100% !important;
  height: 100% !important;
  font-family: "New Grotesk", system-ui, sans-serif;
  background: #e7efe3;
}
.flores-tabela {
  position: relative;
  width: 70px;
  height: 90px;
  filter: drop-shadow(0 6px 10px rgb(10 10 10 / 0.26));
  pointer-events: none;
}
.flores-tabela.is-mini {
  width: 28px;
  height: 36px;
}
.flores-tabela.is-on {
  width: 80px;
  height: 104px;
}
.flores-tabela.is-phone {
  width: 64px;
  height: 84px;
}
.flores-tabela.is-phone .flores-tabela-brand {
  font-size: 10px;
}
.flores-tabela.is-phone .flores-tabela-name {
  font-size: 6px;
}
.flores-tabela.is-phone .flores-tabela-place {
  font-size: 4.5px;
}
.flores-tabela-shape {
  display: block;
  width: 100%;
  height: 100%;
  fill: #054b67;
}
.flores-tabela.is-on .flores-tabela-shape {
  fill: #00a8e0;
}
.flores-tabela-copy {
  position: absolute;
  inset: 10% 10% 28% 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  line-height: 1.05;
}
.flores-tabela-brand {
  font-family: Palatino, "Palatino Linotype", "Times New Roman", serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.flores-tabela.is-on .flores-tabela-brand {
  font-size: 12.5px;
}
.flores-tabela-name {
  margin-top: 2px;
  font-family: "New Grotesk", system-ui, sans-serif;
  font-size: 6.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
}
.flores-tabela.is-on .flores-tabela-name {
  font-size: 7.5px;
}
.flores-tabela-place {
  margin-top: 3px;
  font-family: "New Grotesk", system-ui, sans-serif;
  font-size: 5px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: #d4b87a;
}
</style>
