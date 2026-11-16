const BASE = import.meta.env.BASE_URL

let clickSound: HTMLAudioElement | null = null
let hoverSound: HTMLAudioElement | null = null

function createSound(file: string) {
  const audio = new Audio(`${BASE}Assets/Audio/${file}`)
  audio.preload = "auto"
  return audio
}

function play(audio: HTMLAudioElement) {
  audio.currentTime = 0
  void audio.play().catch(() => {})
}

export function playClick() {
  clickSound ??= createSound("click.ogg")
  play(clickSound)
}

export function playHover() {
  hoverSound ??= createSound("hover.ogg")
  play(hoverSound)
}
