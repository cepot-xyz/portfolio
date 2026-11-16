import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

const BG_SRC = `${import.meta.env.BASE_URL}Assets/Audio/bgm.ogg`
const TARGET_VOLUME = 1
const FADE_DURATION = 1000

export function BgmToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const enabledRef = useRef(enabled)
  const startedRef = useRef(false)
  const fadeFrameRef = useRef<number | null>(null)

  enabledRef.current = enabled

  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current)
    }

    const from = audio.volume
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / FADE_DURATION, 1)
      const eased = progress * progress * (3 - 2 * progress)
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * eased))

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(tick)
      } else {
        fadeFrameRef.current = null
      }
    }

    fadeFrameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (startedRef.current) {
      fadeTo(enabled ? TARGET_VOLUME : 0)
    }
  }, [enabled, fadeTo])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cancelled = false
    audio.volume = 0
    startedRef.current = false

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", handleFirstGesture)
      window.removeEventListener("keydown", handleFirstGesture)
    }

    const announceStarted = () => {
      if (cancelled) return
      startedRef.current = true
      removeGestureListeners()
      fadeTo(enabledRef.current ? TARGET_VOLUME : 0)
    }

    const startPlayback = () => {
      if (startedRef.current) return
      const promise = audio.play()
      if (promise) {
        promise.then(announceStarted).catch(() => {})
      } else {
        announceStarted()
      }
    }

    function handleFirstGesture() {
      startPlayback()
    }

    startPlayback()
    window.addEventListener("pointerdown", handleFirstGesture)
    window.addEventListener("keydown", handleFirstGesture)

    return () => {
      cancelled = true
      removeGestureListeners()
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current)
        fadeFrameRef.current = null
      }
      startedRef.current = false
      audio.pause()
    }
  }, [fadeTo])

  return (
    <>
      <audio
        ref={audioRef}
        src={BG_SRC}
        loop
        preload="auto"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => setEnabled((value) => !value)}
        aria-pressed={enabled}
        aria-label={enabled ? "Matikan musik" : "Nyalakan musik"}
        className={cn(className)}
      >
        {enabled ? <Volume2 /> : <VolumeX />}
        <span className="sr-only">
          {enabled ? "Matikan musik" : "Nyalakan musik"}
        </span>
      </button>
    </>
  )
}
