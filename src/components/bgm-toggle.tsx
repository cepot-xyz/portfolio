import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

import { setAudioEnabled } from "@/lib/audio"
import { cn } from "@/lib/utils"

const BG_SRC = `${import.meta.env.BASE_URL}Assets/Audio/bgm.ogg`
const TARGET_VOLUME = 0.5
const FADE_DURATION = 1000

export function BgmToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrameRef = useRef<number | null>(null)
  const pauseTimerRef = useRef<number | null>(null)

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
    setAudioEnabled(enabled)

    const audio = audioRef.current
    if (!audio) return

    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }

    if (!enabled) {
      if (audio.paused && audio.volume === 0) return

      fadeTo(0)
      pauseTimerRef.current = window.setTimeout(() => {
        audio.pause()
        pauseTimerRef.current = null
      }, FADE_DURATION)
      return
    }

    let cancelled = false
    audio.volume = 0

    const promise = audio.play()
    if (promise) {
      promise
        .then(() => {
          if (!cancelled) fadeTo(TARGET_VOLUME)
        })
        .catch(() => {})
    } else {
      fadeTo(TARGET_VOLUME)
    }

    return () => {
      cancelled = true
    }
  }, [enabled, fadeTo])

  useEffect(() => {
    return () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current)
      }
      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current)
      }
      audioRef.current?.pause()
    }
  }, [])

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
        aria-label={enabled ? "Matikan audio" : "Nyalakan audio"}
        className={cn(className)}
      >
        {enabled ? <Volume2 /> : <VolumeX />}
        <span className="sr-only">
          {enabled ? "Matikan audio" : "Nyalakan audio"}
        </span>
      </button>
    </>
  )
}
