import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    autoRaf: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  nuxtApp.hook('page:finish', () => {
    lenis.resize()
    ScrollTrigger.refresh()
    const hash = window.location.hash
    const target = hash ? document.querySelector(hash) : null
    if (target instanceof HTMLElement) {
      requestAnimationFrame(() => lenis.scrollTo(target, { immediate: true, offset: -40 }))
    }
    else {
      lenis.scrollTo(0, { immediate: true })
    }
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    })
  }

  return {
    provide: { lenis },
  }
})
