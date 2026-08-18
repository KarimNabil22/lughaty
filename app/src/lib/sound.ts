// أصوات مؤقتة بالـ Web Audio (تُرکَّب برمجيًا، مفيش ملفات) — نفس فكرة البروتوتايب.
// بديل احتياطي لحد ما نستبدلها بأصوات Lahajati/بشرية حقيقية.

type SfxKind = 'tap' | 'correct' | 'wrong' | 'pop' | 'win'

let ctx: AudioContext | null = null
let muted = false

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx = new AudioCtor()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, vol: number) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.connect(gain)
  gain.connect(c.destination)
  const t = c.currentTime + start
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(vol, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.start(t)
  osc.stop(t + dur + 0.03)
}

export function setMuted(value: boolean) {
  muted = value
}

export function isMuted() {
  return muted
}

export function playSfx(kind: SfxKind) {
  if (muted) return
  try {
    switch (kind) {
      case 'tap':
        tone(330, 0, 0.08, 'triangle', 0.15)
        break
      case 'correct':
        tone(523, 0, 0.12, 'sine', 0.2)
        tone(784, 0.1, 0.18, 'sine', 0.2)
        break
      case 'wrong':
        tone(150, 0, 0.28, 'sawtooth', 0.14)
        break
      case 'pop':
        tone(700, 0, 0.08, 'sine', 0.18)
        break
      case 'win':
        ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.22, 'sine', 0.2))
        break
    }
  } catch {
    // صوت اختياري بس، لو فشل منكملش عادي
  }
}

export function vibrate(pattern: number | number[]) {
  if (muted) return
  try {
    navigator.vibrate?.(pattern)
  } catch {
    // اهتزاز اختياري
  }
}
