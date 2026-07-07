// Transient spectacle: ignite blooms, strand pulses, chalk dust.

import type { LaidEdge } from './layout'
import { srand } from './chalk'

interface Bloom { x: number; y: number; color: string; t: number; dur: number }
interface Pulse { edge: LaidEdge; fromA: boolean; color: string; t: number; dur: number }
interface Dust { x: number; y: number; vx: number; vy: number; t: number; life: number; size: number; color: string }

interface Mote { x: number; y: number; drift: number; phase: number; size: number; a: number }

export class Effects {
  private blooms: Bloom[] = []
  private pulses: Pulse[] = []
  private dust: Dust[] = []
  private motes: Mote[] = []
  private rnd = srand(12345)

  constructor() {
    // ambient chalk dust hanging in the air, seeded across the whole board
    const r = srand(777)
    for (let i = 0; i < 140; i++) {
      this.motes.push({
        x: (r() - 0.5) * 4200,
        y: (r() - 0.5) * 4200,
        drift: 4 + r() * 10,
        phase: r() * Math.PI * 2,
        size: 0.8 + r() * 1.8,
        a: 0.05 + r() * 0.16,
      })
    }
  }

  addBloom(x: number, y: number, color: string): void {
    this.blooms.push({ x, y, color, t: 0, dur: 0.9 })
    this.burst(x, y, color, 16)
  }

  addPulse(edge: LaidEdge, fromId: string, color: string): void {
    this.pulses.push({ edge, fromA: edge.a === fromId, color, t: 0, dur: 0.75 })
  }

  burst(x: number, y: number, color: string, n = 10): void {
    for (let i = 0; i < n; i++) {
      const a = this.rnd() * Math.PI * 2
      const s = 30 + this.rnd() * 140
      this.dust.push({
        x, y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        t: 0, life: 0.5 + this.rnd() * 0.7,
        size: 1.5 + this.rnd() * 2.5,
        color: this.rnd() > 0.4 ? color : '#e9e4d4',
      })
    }
  }

  update(dt: number): void {
    for (const b of this.blooms) b.t += dt
    this.blooms = this.blooms.filter(b => b.t < b.dur)
    for (const p of this.pulses) p.t += dt
    this.pulses = this.pulses.filter(p => p.t < p.dur)
    for (const d of this.dust) {
      d.t += dt
      d.x += d.vx * dt
      d.y += d.vy * dt
      d.vx *= Math.pow(0.1, dt)
      d.vy *= Math.pow(0.1, dt)
    }
    this.dust = this.dust.filter(d => d.t < d.life)
  }

  /** ambient motes drawn UNDER everything (call at frame start, in world space) */
  drawAmbient(ctx: CanvasRenderingContext2D, time: number): void {
    ctx.save()
    ctx.fillStyle = '#e9e4d4'
    for (const m of this.motes) {
      const sway = Math.sin(time * 0.3 + m.phase) * m.drift
      const bob = Math.cos(time * 0.22 + m.phase * 1.7) * m.drift * 0.6
      ctx.globalAlpha = m.a * (0.6 + 0.4 * Math.sin(time * 0.8 + m.phase))
      ctx.beginPath()
      ctx.arc(m.x + sway, m.y + bob, m.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  draw(ctx: CanvasRenderingContext2D, time: number): void {
    for (const b of this.blooms) {
      const t = b.t / b.dur
      const r = 18 + t * 92
      ctx.save()
      ctx.globalAlpha = (1 - t) * 0.8
      ctx.strokeStyle = b.color
      ctx.lineWidth = 3 * (1 - t) + 0.5
      ctx.beginPath()
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = (1 - t) * 0.32
      ctx.beginPath()
      ctx.arc(b.x, b.y, r * 0.6, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
    for (const p of this.pulses) {
      const t = p.t / p.dur
      const pts = p.edge.pts
      const idxF = t * (pts.length - 1)
      const idx = p.fromA ? idxF : (pts.length - 1) - idxF
      const i = Math.max(0, Math.min(pts.length - 1, Math.round(idx)))
      const pt = pts[i]
      ctx.save()
      ctx.globalAlpha = 0.9 * (1 - t * 0.5)
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2)
      ctx.fill()
      // short trail
      ctx.globalAlpha = 0.4 * (1 - t)
      ctx.strokeStyle = p.color
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.beginPath()
      const back = p.fromA ? Math.max(0, i - 3) : Math.min(pts.length - 1, i + 3)
      ctx.moveTo(pts[back].x, pts[back].y)
      ctx.lineTo(pt.x, pt.y)
      ctx.stroke()
      ctx.restore()
    }
    for (const d of this.dust) {
      const a = 1 - d.t / d.life
      ctx.save()
      ctx.globalAlpha = a * 0.75
      ctx.fillStyle = d.color
      ctx.fillRect(d.x, d.y, d.size, d.size)
      ctx.restore()
    }
  }
}
