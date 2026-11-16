import { useEffect, useState, type RefObject } from "react"

export function useInView(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return inView
}
