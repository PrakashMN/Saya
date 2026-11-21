import { useEffect, useRef } from 'react'

export default function useParallax(speed = 0.5, axis = 'y', scale = 1) {
  const ref = useRef(null)
  const current = useRef(0)
  const target = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.willChange = 'transform'

    const applyTransform = () => {
      const x = axis === 'x' || axis === 'both' ? current.current : 0
      const y = axis === 'y' || axis === 'both' ? current.current : 0
      const transforms = []
      if (x !== 0 || y !== 0) transforms.push(`translate3d(${x}px, ${y}px, 0)`)
      if (scale !== 1) transforms.push(`scale(${scale})`)
      el.style.transform = transforms.join(' ')
    }

    const animate = () => {
      const distance = target.current - current.current
      current.current += distance * 0.08

      // Stop the loop when we have caught up; scroll restarts it.
      if (Math.abs(distance) < 0.01) {
        current.current = target.current
        applyTransform()
        rafId.current = null
        return
      }

      applyTransform()
      rafId.current = requestAnimationFrame(animate)
    }

    const start = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    const onScroll = () => {
      target.current = window.scrollY * speed
      start()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [speed, axis, scale])

  return ref
}
