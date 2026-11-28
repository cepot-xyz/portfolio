import { useEffect } from "react"

import { playClick } from "@/lib/audio"

const INTERACTIVE_SELECTOR =
  "a, button, input, select, textarea, summary, label, [role='button'], [role='link']"

export function SoundEffects() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return

      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest(INTERACTIVE_SELECTOR)) return

      playClick()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  return null
}
