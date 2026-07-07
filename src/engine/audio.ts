// Tiny procedural sound: chalk ticks + ignite chimes. Init on first gesture.

let ac: AudioContext | null = null
let master: GainNode | null = null

export function initAudio(): void {
  if (ac) return
  try {
    ac = new AudioContext()
    master = ac.createGain()
    master.gain.value = 0.22
    master.connect(ac.destination)
  } catch { /* no audio */ }
}

function noiseBuffer(ctx: AudioContext, dur: number): AudioBuffer {
  const b = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate)
  const d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return b
}

/** soft chalk tap — hover/click */
export function tick(): void {
  if (!ac || !master) return
  const t = ac.currentTime
  const src = ac.createBufferSource()
  src.buffer = noiseBuffer(ac, 0.04)
  const bp = ac.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 2600
  bp.Q.value = 1.2
  const g = ac.createGain()
  g.gain.setValueAtTime(0.5, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
  src.connect(bp).connect(g).connect(master)
  src.start(t)
}

/** warm chime — a node ignites */
export function chime(up = true): void {
  if (!ac || !master) return
  const t = ac.currentTime
  const freqs = up ? [523.25, 659.25, 783.99] : [523.25, 415.3]
  freqs.forEach((f, i) => {
    const o = ac!.createOscillator()
    o.type = 'sine'
    o.frequency.value = f
    const g = ac!.createGain()
    const at = t + i * 0.07
    g.gain.setValueAtTime(0, at)
    g.gain.linearRampToValueAtTime(0.16, at + 0.015)
    g.gain.exponentialRampToValueAtTime(0.001, at + 1.1)
    o.connect(g).connect(master!)
    o.start(at)
    o.stop(at + 1.2)
  })
  if (up) {
    // chalk sparkle on top
    const src = ac.createBufferSource()
    src.buffer = noiseBuffer(ac, 0.25)
    const hp = ac.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 5200
    const g = ac.createGain()
    g.gain.setValueAtTime(0.12, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
    src.connect(hp).connect(g).connect(master)
    src.start(t)
  }
}

/** low soft thump — open panel / enter */
export function thump(): void {
  if (!ac || !master) return
  const t = ac.currentTime
  const o = ac.createOscillator()
  o.type = 'sine'
  o.frequency.setValueAtTime(140, t)
  o.frequency.exponentialRampToValueAtTime(60, t + 0.18)
  const g = ac.createGain()
  g.gain.setValueAtTime(0.25, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25)
  o.connect(g).connect(master)
  o.start(t)
  o.stop(t + 0.3)
}
