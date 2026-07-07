// Draws the whole universe every frame: board, strands, nodes, medallions.

import type { BranchId, EdgeKey } from '../data/types'
import type { WebLayout, LaidNode, LaidEdge, LaidPerson } from './layout'
import { Camera } from './camera'
import { chalkCircle, hashStr, makeBoardTexture, strokePolyline } from './chalk'
import type { Effects } from './effects'

export interface RenderCtx {
  mode: 'web' | 'time'
  mastered: Set<string>
  hovered: string | null
  selected: string | null
  selectedEdge: EdgeKey | null
  pathActive: boolean
  pathNodes: Set<string>
  pathEdges: Set<EdgeKey>
  timelineYear: number
  /** seconds since ENTER; drives the draw-on intro. Infinity = fully drawn */
  introT: number
}

const CHALK = '#e9e4d4'
const GOLD = '#ffd166'

function mix(hex: string, amt: number): string {
  // lighten a hex color toward white by amt (0..1)
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const f = (c: number) => Math.round(c + (255 - c) * amt)
  return `rgb(${f(r)},${f(g)},${f(b)})`
}

export class Renderer {
  private dpr = Math.min(2, window.devicePixelRatio || 1)
  private board: HTMLCanvasElement | null = null
  private glows = new Map<string, HTMLCanvasElement>()
  private time = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private layout: WebLayout,
    private colors: Record<BranchId, string>,
    public camera: Camera,
    private effects: Effects,
  ) {
    this.resize()
  }

  resize(): void {
    const w = window.innerWidth, h = window.innerHeight
    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr
    this.canvas.style.width = `${w}px`
    this.canvas.style.height = `${h}px`
    this.camera.resize(w, h)
    this.board = makeBoardTexture(w, h)
  }

  private glow(color: string): HTMLCanvasElement {
    let g = this.glows.get(color)
    if (g) return g
    g = document.createElement('canvas')
    g.width = 128; g.height = 128
    const c = g.getContext('2d')!
    const grad = c.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, color)
    grad.addColorStop(0.35, color.startsWith('rgb') ? color : color + 'aa')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    c.globalAlpha = 0.85
    c.fillStyle = grad
    c.fillRect(0, 0, 128, 128)
    this.glows.set(color, g)
    return g
  }

  private nodeDelay(l: LaidNode): number {
    return l.node.tier * 0.26 + (hashStr(l.node.id) % 100) / 100 * 0.22
  }

  /** timeline: does this node exist yet at the scrub year? */
  private born(l: { year?: number } , year: number): boolean {
    return (l.year ?? 2000) <= year
  }

  render(dt: number, rc: RenderCtx): void {
    this.time += dt
    const { ctx, camera, dpr } = this
    const w = camera.viewW, h = camera.viewH
    const z = camera.z

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, w * dpr, h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (this.board) ctx.drawImage(this.board, 0, 0)

    camera.applyTo(ctx, dpr)

    // viewport in world coords (+margin)
    const tl = camera.screenToWorld(0, 0)
    const br = camera.screenToWorld(w, h)
    const m = 260
    const vMinX = tl.x - m, vMinY = tl.y - m, vMaxX = br.x + m, vMaxY = br.y + m
    const inView = (x: number, y: number, pad = 0) =>
      x > vMinX - pad && x < vMaxX + pad && y > vMinY - pad && y < vMaxY + pad

    const veil = rc.pathActive ? 0.16 : 1

    // ---------- edges ----------
    for (const e of this.layout.edges) {
      if (e.maxX < vMinX || e.minX > vMaxX || e.maxY < vMinY || e.minY > vMaxY) continue
      this.drawEdge(e, rc, veil, z)
    }

    // ---------- branch labels (far zoom only) ----------
    const blAlpha = smooth(0.55, 0.3, z) // 1 when far, 0 when close
    if (blAlpha > 0.02 && rc.introT > 2) {
      ctx.save()
      ctx.fillStyle = CHALK
      ctx.globalAlpha = 0.34 * blAlpha * Math.min(1, (rc.introT - 2) / 1.5)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `600 92px Caveat, cursive`
      for (const bl of this.layout.branchLabels) {
        if (!inView(bl.x, bl.y, 400)) continue
        ctx.save()
        ctx.translate(bl.x, bl.y)
        ctx.rotate(bl.rot)
        ctx.fillText(bl.name, 0, 0)
        ctx.restore()
      }
      ctx.restore()
    }

    // ---------- nodes ----------
    const dotsOnly = z < 0.12
    for (const l of this.layout.nodes.values()) {
      if (!inView(l.x, l.y, l.r + 130)) continue
      this.drawNode(l, rc, veil, z, dotsOnly)
    }

    // ---------- people ----------
    if (!dotsOnly) {
      for (const p of this.layout.people.values()) {
        if (!inView(p.x, p.y, 140)) continue
        this.drawPerson(p, rc, veil, z)
      }
    }

    // ---------- effects ----------
    this.effects.draw(ctx, this.time)

    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  private edgeIntroProgress(e: LaidEdge, rc: RenderCtx): number {
    if (rc.introT === Infinity) return 1
    const a = this.layout.nodes.get(e.a)!, b = this.layout.nodes.get(e.b)!
    const delay = Math.max(this.nodeDelay(a), this.nodeDelay(b)) + 0.15
    return Math.max(0, Math.min(1, (rc.introT - delay) / 0.55))
  }

  private drawEdge(e: LaidEdge, rc: RenderCtx, veil: number, z: number): void {
    const { ctx } = this
    const prog = this.edgeIntroProgress(e, rc)
    if (prog <= 0) return

    const na = this.layout.nodes.get(e.a)!
    const nb = this.layout.nodes.get(e.b)!
    const onPath = rc.pathActive && rc.pathEdges.has(e.key)
    const isSelected = rc.selectedEdge === e.key

    if (rc.mode === 'time') {
      const aBorn = this.born(na.node, rc.timelineYear)
      const bBorn = this.born(nb.node, rc.timelineYear)
      if (aBorn && bBorn) {
        const color = this.colors[nb.node.tier >= na.node.tier ? nb.node.branch : na.node.branch]
        strokePolyline(ctx, e.pts, { color, width: 2.2, alpha: 0.5, single: z < 0.3 })
      } else {
        strokePolyline(ctx, e.pts, { color: CHALK, width: 1.6, alpha: 0.07, single: true })
      }
      return
    }

    const aM = rc.mastered.has(e.a), bM = rc.mastered.has(e.b)
    const deeper = nb.node.tier >= na.node.tier ? nb.node : na.node
    const color = this.colors[deeper.branch]

    if (onPath || isSelected) {
      // glowing marching chalk dashes
      ctx.save()
      ctx.strokeStyle = GOLD
      ctx.lineCap = 'round'
      ctx.globalAlpha = 0.9
      ctx.lineWidth = 3.4
      ctx.setLineDash([16, 12])
      ctx.lineDashOffset = -this.time * 40
      ctx.beginPath()
      ctx.moveTo(e.pts[0].x, e.pts[0].y)
      for (let i = 1; i < e.pts.length; i++) ctx.lineTo(e.pts[i].x, e.pts[i].y)
      ctx.stroke()
      ctx.globalAlpha = 0.22
      ctx.lineWidth = 9
      ctx.setLineDash([])
      ctx.stroke()
      ctx.restore()
      return
    }

    if (aM && bM) {
      strokePolyline(ctx, e.pts, { color, width: 2.6, alpha: 0.62 * veil, progress: prog, single: z < 0.25 })
      if (z > 0.25) strokePolyline(ctx, e.pts, { color, width: 7, alpha: 0.1 * veil, progress: prog, single: true })
    } else if (aM || bM) {
      // half-lit: color bleeds from the mastered end
      const from = aM ? { x: e.ax, y: e.ay } : { x: e.bx, y: e.by }
      const to = aM ? { x: e.bx, y: e.by } : { x: e.ax, y: e.ay }
      ctx.save()
      const g = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
      g.addColorStop(0, color)
      g.addColorStop(0.55, 'rgba(233,228,212,0.32)')
      g.addColorStop(1, 'rgba(233,228,212,0.2)')
      ctx.strokeStyle = g
      ctx.lineCap = 'round'
      ctx.globalAlpha = 0.42 * veil
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(e.pts[0].x, e.pts[0].y)
      const last = prog >= 1 ? e.pts.length - 1 : Math.max(1, Math.floor((e.pts.length - 1) * prog))
      for (let i = 1; i <= last; i++) ctx.lineTo(e.pts[i].x, e.pts[i].y)
      ctx.stroke()
      ctx.restore()
    } else {
      strokePolyline(ctx, e.pts, { color: CHALK, width: 1.7, alpha: 0.19 * veil, progress: prog, single: z < 0.3 })
    }
  }

  private drawNode(l: LaidNode, rc: RenderCtx, veil: number, z: number, dotsOnly: boolean): void {
    const { ctx } = this
    const n = l.node
    const seed = hashStr(n.id)

    // intro pop-in
    let scale = 1
    if (rc.introT !== Infinity) {
      const t = (rc.introT - this.nodeDelay(l)) / 0.45
      if (t <= 0) return
      scale = t >= 1 ? 1 : easeOutBack(Math.min(1, t))
    }

    const inTime = rc.mode === 'time'
    const born = this.born(n, rc.timelineYear)
    const mastered = inTime ? born : rc.mastered.has(n.id)
    const onPath = rc.pathActive && rc.pathNodes.has(n.id)
    const dim = (rc.pathActive && !onPath ? 0.25 : 1) * (inTime && !born ? 0.16 : 1)
    const color = this.colors[n.branch]
    const isHover = rc.hovered === n.id
    const isSel = rc.selected === n.id
    const r = l.r * scale * (isHover ? 1.1 : 1)

    if (dotsOnly) {
      ctx.save()
      ctx.globalAlpha = (mastered ? 0.95 : 0.4) * dim
      ctx.fillStyle = mastered ? color : CHALK
      ctx.beginPath()
      ctx.arc(l.x, l.y, mastered ? 13 : 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      return
    }

    ctx.save()
    ctx.globalAlpha = dim

    if (mastered) {
      // wet paint: glow + colored fill + specular
      const g = this.glow(color)
      const pulse = 1 + Math.sin(this.time * 1.6 + seed) * 0.06
      ctx.globalAlpha = 0.5 * dim
      ctx.drawImage(g, l.x - r * 2.6 * pulse, l.y - r * 2.6 * pulse, r * 5.2 * pulse, r * 5.2 * pulse)
      ctx.globalAlpha = dim
      chalkCircle(ctx, l.x, l.y, r, {
        seed, color: mix(color, 0.5), width: 2.4, alpha: 0.95,
        fill: color, fillAlpha: 0.92,
      })
      // specular arc
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,255,0.65)'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(l.x, l.y, r * 0.62, Math.PI * 1.05, Math.PI * 1.5)
      ctx.stroke()
      ctx.restore()
    } else {
      chalkCircle(ctx, l.x, l.y, r, {
        seed, color: CHALK, width: n.tier === 0 ? 3 : 2,
        alpha: (isHover ? 0.95 : 0.6) * dim,
        fill: '#13201a', fillAlpha: 0.85,
      })
    }

    if (isSel) {
      ctx.save()
      ctx.strokeStyle = GOLD
      ctx.globalAlpha = 0.9
      ctx.lineWidth = 2.2
      ctx.setLineDash([10, 9])
      ctx.lineDashOffset = -this.time * 26
      ctx.beginPath()
      ctx.arc(l.x, l.y, r + 10, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    // label
    const labelA = n.tier === 0 ? 1 : smooth(0.26, 0.42, z)
    if (labelA > 0.03) {
      ctx.globalAlpha = labelA * dim * (mastered ? 1 : 0.8)
      ctx.fillStyle = mastered ? mix(color, 0.55) : CHALK
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const fs = n.tier === 0 ? 30 : l.r > 26 ? 20 : 16.5
      ctx.font = `600 ${fs}px Caveat, cursive`
      ctx.save()
      ctx.translate(l.x, l.y + r + 7)
      ctx.rotate(((seed % 100) / 100 - 0.5) * 0.07)
      ctx.fillText(n.title, 0, 0)
      ctx.restore()
    }

    ctx.restore()
  }

  private drawPerson(p: LaidPerson, rc: RenderCtx, veil: number, z: number): void {
    const { ctx } = this
    const seed = hashStr(p.person.id)

    let scale = 1
    if (rc.introT !== Infinity) {
      const t = (rc.introT - 3.2 - (seed % 100) / 100) / 0.5
      if (t <= 0) return
      scale = t >= 1 ? 1 : easeOutBack(Math.min(1, t))
    }
    if (rc.mode === 'time' && !this.born(p.person, rc.timelineYear)) return

    const isHover = rc.hovered === p.person.id
    const isSel = rc.selected === p.person.id
    const dim = rc.pathActive ? 0.25 : 1
    const r = p.r * scale * (isHover ? 1.08 : 1)

    ctx.save()
    ctx.globalAlpha = dim

    // medallion: double ring
    chalkCircle(ctx, p.x, p.y, r, { seed, color: GOLD, width: 2, alpha: isHover || isSel ? 0.95 : 0.55, fill: '#182015', fillAlpha: 0.9 })
    chalkCircle(ctx, p.x, p.y, r * 0.82, { seed: seed + 7, color: CHALK, width: 1.2, alpha: 0.35, single: true })

    const labelA = smooth(0.24, 0.4, z)
    if (labelA > 0.03) {
      ctx.globalAlpha = dim * labelA
      ctx.textAlign = 'center'
      // initials inside
      ctx.fillStyle = GOLD
      ctx.textBaseline = 'middle'
      ctx.font = `700 ${r * 0.78}px Caveat, cursive`
      const initials = p.person.name.split(' ').map(s => s[0]).join('').slice(0, 2)
      ctx.fillText(initials, p.x, p.y + 2)
      // name + glyph under
      ctx.textBaseline = 'top'
      ctx.fillStyle = CHALK
      ctx.font = `600 15px Caveat, cursive`
      ctx.fillText(p.person.name, p.x, p.y + r + 6)
      ctx.fillStyle = GOLD
      ctx.globalAlpha = dim * labelA * 0.9
      ctx.font = `600 14px Caveat, cursive`
      ctx.fillText(p.person.glyph, p.x, p.y + r + 24)
    }

    if (isSel) {
      ctx.strokeStyle = GOLD
      ctx.globalAlpha = 0.9
      ctx.lineWidth = 2
      ctx.setLineDash([8, 8])
      ctx.lineDashOffset = -this.time * 26
      ctx.beginPath()
      ctx.arc(p.x, p.y, r + 9, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.restore()
  }
}

function smooth(e0: number, e1: number, x: number): number {
  // smoothstep that works with e0 > e1 (descending) too
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function easeOutBack(t: number): number {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
