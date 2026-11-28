import { useEffect, useRef, useState, type ReactNode } from "react"

type ViewportMountProps = {
  children: ReactNode
  mode?: "active" | "once"
  rootMargin?: string
  className?: string
  fallback?: ReactNode
}

export function ViewportMount({
  children,
  mode = "active",
  rootMargin = "320px 0px",
  className,
  fallback = null,
}: ViewportMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  const show = mode === "once" ? mounted : visible

  return (
    <div ref={ref} className={className}>
      {show ? children : fallback}
    </div>
  )
}
