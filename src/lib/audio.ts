const BASE = import.meta.env.BASE_URL
const SFX_VOLUME = 1

let enabled = false
let clickSound: HTMLAudioElement | null = null
let hoverSound: HTMLAudioElement | null = null

function createSound(file: string) {
  const audio = new Audio(`${BASE}Assets/Audio/${file}`)
  audio.preload = "auto"
  audio.volume = enabled ? SFX_VOLUME : 0
  return audio
}

function play(audio: HTMLAudioElement) {
  if (!enabled) return
  audio.volume = SFX_VOLUME
  audio.currentTime = 0
  void audio.play().catch(() => {})
}

export function setAudioEnabled(value: boolean) {
  enabled = value

  for (const sound of [clickSound, hoverSound]) {
    if (!sound) continue
    sound.volume = enabled ? SFX_VOLUME : 0
    if (!enabled) {
      sound.pause()
      sound.currentTime = 0
    }
  }
}

export function playClick() {
  clickSound ??= createSound("click.ogg")
  play(clickSound)
}

export function playHover() {
  hoverSound ??= createSound("hover.ogg")
  play(hoverSound)
}
