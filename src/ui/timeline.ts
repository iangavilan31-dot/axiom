// The river of time: scrub (or press PLAY) and watch mathematics ignite
// in the order humanity discovered it.

const STOPS: { year: number; label: string }[] = [
  { year: -3000, label: '3000 BC' },
  { year: -600, label: '600 BC' },
  { year: 300, label: '300' },
  { year: 1200, label: '1200' },
  { year: 1550, label: '1550' },
  { year: 1700, label: '1700' },
  { year: 1820, label: '1820' },
  { year: 1900, label: '1900' },
  { year: 1950, label: '1950' },
  { year: 2026, label: 'now' },
]

const PLAY_SECONDS = 42

export class Timeline {
  /** 0..1 along the (non-linear) river */
  t = 0
  playing = false
  private dragging = false

  constructor(
    private bar: HTMLElement,
    private track: HTMLElement,
    private cursor: HTMLElement,
    private yearEl: HTMLElement,
    private playBtn: HTMLButtonElement,
    private onChange: (prevYear: number, year: number) => void,
  ) {
    const eras = track.querySelector('#time-eras') as HTMLElement
    for (let i = 0; i < STOPS.length - 1; i++) {
      const div = document.createElement('div')
      div.className = 'era'
      div.style.flex = '1'
      div.innerHTML = `<span>${STOPS[i].label}</span>`
      eras.appendChild(div)
    }

    track.addEventListener('pointerdown', e => {
      this.dragging = true
      this.playing = false
      this.updatePlayBtn()
      track.setPointerCapture(e.pointerId)
      this.scrubTo(e.clientX)
    })
    track.addEventListener('pointermove', e => { if (this.dragging) this.scrubTo(e.clientX) })
    track.addEventListener('pointerup', () => { this.dragging = false })

    playBtn.addEventListener('click', () => {
      if (!this.playing && this.t >= 0.999) this.setT(0)
      this.playing = !this.playing
      this.updatePlayBtn()
    })
    this.render()
  }

  get year(): number { return tToYear(this.t) }

  private updatePlayBtn(): void { this.playBtn.textContent = this.playing ? 'PAUSE' : 'PLAY' }

  private scrubTo(clientX: number): void {
    const r = this.track.getBoundingClientRect()
    this.setT((clientX - r.left) / r.width)
  }

  setT(t: number): void {
    const prev = this.year
    this.t = Math.max(0, Math.min(1, t))
    this.render()
    this.onChange(prev, this.year)
  }

  update(dt: number): void {
    if (!this.playing) return
    this.setT(this.t + dt / PLAY_SECONDS)
    if (this.t >= 1) { this.playing = false; this.updatePlayBtn() }
  }

  setVisible(v: boolean): void { this.bar.classList.toggle('hidden', !v) }

  private render(): void {
    this.cursor.style.left = `${this.t * 100}%`
    const y = this.year
    this.yearEl.textContent = y < 0 ? `${-y} BC` : `${y}`
  }
}

function tToYear(t: number): number {
  const seg = 1 / (STOPS.length - 1)
  const i = Math.min(STOPS.length - 2, Math.floor(t / seg))
  const f = (t - i * seg) / seg
  return Math.round(STOPS[i].year + (STOPS[i + 1].year - STOPS[i].year) * f)
}
