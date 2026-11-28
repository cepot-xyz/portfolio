import { useEffect, useState, type RefObject } from "react"

type UseInViewOptions = {
  rootMargin?: string
  threshold?: number
}

export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin, threshold = 0 }: UseInViewOptions = {}
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold])

  return inView
}
