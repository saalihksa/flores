import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!root.value) return

    const ctx = gsap.context(() => {
      const lines = root.value!.querySelectorAll('.reveal-line span')
      gsap.set(lines, { yPercent: 110 })

      ScrollTrigger.batch('.reveal-line', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => {
            const span = el.querySelector('span')
            if (!span) return
            gsap.to(span, {
              yPercent: 0,
              duration: 1.05,
              ease: 'power3.out',
            })
          })
        },
      })
    }, root.value)

    onUnmounted(() => ctx.revert())
  })
}
