// Pointer handling: pan/zoom/pinch, hover, and REAL hit-testing for
// nodes, medallions, and strands.

import type { EdgeKey } from '../data/types'
import type { WebLayout } from './layout'
import { Camera } from './camera'

export interface InputCallbacks {
  onNodeClick(id: string): void
  onPersonClick(id: string): void
  onEdgeClick(key: EdgeKey): void
  onBackgroundClick(): void
  onHover(id: string | null): void
  onFirstInteract(): void
}

export class InputController {
  private pointers = new Map<number, { x: number; y: number }>()
  private downAt: { x: number; y: number; t: number } | null = null
  private dragging = false
  private lastPinchD = 0
  private interacted = false

  constructor(
    private canvas: HTMLCanvasElement,
    private camera: Camera,
    private layout: WebLayout,
    private cb: InputCallbacks,
  ) {
    canvas.addEventListener('pointerdown', this.onDown)
    canvas.addEventListener('pointermove', this.onMove)
    canvas.addEventListener('pointerup', this.onUp)
    canvas.addEventListener('pointercancel', this.onUp)
    canvas.addEventListener('wheel', this.onWheel, { passive: false })
    canvas.addEventListener('dblclick', this.onDbl)
  }

  private markInteract(): void {
    if (!this.interacted) { this.interacted = true; this.cb.onFirstInteract() }
  }

  private onDown = (e: PointerEvent): void => {
    this.canvas.setPointerCapture(e.pointerId)
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (this.pointers.size === 1) {
      this.downAt = { x: e.clientX, y: e.clientY, t: performance.now() }
      this.dragging = false
      this.camera.stop()
    } else if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()]
      this.lastPinchD = Math.hypot(a.x - b.x, a.y - b.y)
    }
  }

  private onMove = (e: PointerEvent): void => {
    if (this.pointers.has(e.pointerId)) {
      const prev = this.pointers.get(e.pointerId)!
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (this.pointers.size === 1 && this.downAt) {
        if (!this.dragging && Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 5) {
          this.dragging = true
          this.canvas.classList.add('dragging')
          this.markInteract()
        }
        if (this.dragging) this.camera.panBy(dx, dy)
      } else if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
        if (this.lastPinchD > 0) this.camera.zoomAt(mx, my, d / this.lastPinchD)
        this.lastPinchD = d
        this.camera.panBy(dx / 2, dy / 2)
      }
      return
    }
    // pure hover
    const hit = this.hitTest(e.clientX, e.clientY)
    this.cb.onHover(hit ? hit.id : null)
    this.canvas.classList.toggle('pointing', !!hit)
  }

  private onUp = (e: PointerEvent): void => {
    this.pointers.delete(e.pointerId)
    if (this.pointers.size < 2) this.lastPinchD = 0
    this.canvas.classList.remove('dragging')
    if (this.downAt && !this.dragging && this.pointers.size === 0) {
      const dt = performance.now() - this.downAt.t
      if (dt < 600) {
        this.markInteract()
        const hit = this.hitTest(e.clientX, e.clientY)
        if (!hit) this.cb.onBackgroundClick()
        else if (hit.kind === 'node') this.cb.onNodeClick(hit.id)
        else if (hit.kind === 'person') this.cb.onPersonClick(hit.id)
        else this.cb.onEdgeClick(hit.id as EdgeKey)
      }
    }
    this.downAt = null
    this.dragging = false
  }

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault()
    this.markInteract()
    const f = Math.pow(1.0016, -e.deltaY)
    this.camera.zoomAt(e.clientX, e.clientY, f)
  }

  private onDbl = (e: MouseEvent): void => {
    this.camera.zoomAt(e.clientX, e.clientY, 1.9)
  }

  hitTest(px: number, py: number): { kind: 'node' | 'person' | 'edge'; id: string } | null {
    const wpt = this.camera.screenToWorld(px, py)
    const z = this.camera.z
    const slack = Math.max(10, 14 / z)

    // people first (drawn on top)
    let best: { kind: 'node' | 'person' | 'edge'; id: string } | null = null
    let bestD = Infinity
    for (const p of this.layout.people.values()) {
      const d = Math.hypot(wpt.x - p.x, wpt.y - p.y)
      if (d < p.r + slack * 0.6 && d < bestD) { best = { kind: 'person', id: p.person.id }; bestD = d }
    }
    for (const l of this.layout.nodes.values()) {
      const d = Math.hypot(wpt.x - l.x, wpt.y - l.y)
      if (d < l.r + slack * 0.6 && d < bestD) { best = { kind: 'node', id: l.node.id }; bestD = d }
    }
    if (best) return best

    // strands (only when zoomed in enough that they're distinguishable)
    if (z > 0.16) {
      const thresh = Math.max(7, 9 / z)
      let bestEdge: string | null = null
      let bestED = Infinity
      for (const e of this.layout.edges) {
        if (wpt.x < e.minX - thresh || wpt.x > e.maxX + thresh || wpt.y < e.minY - thresh || wpt.y > e.maxY + thresh) continue
        for (let i = 0; i < e.pts.length - 1; i += 2) {
          const d = distToSeg(wpt.x, wpt.y, e.pts[i], e.pts[Math.min(i + 2, e.pts.length - 1)])
          if (d < thresh && d < bestED) { bestED = d; bestEdge = e.key }
        }
      }
      if (bestEdge) return { kind: 'edge', id: bestEdge }
    }
    return null
  }
}

function distToSeg(px: number, py: number, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x, dy = b.y - a.y
  const len2 = dx * dx + dy * dy
  if (len2 === 0) return Math.hypot(px - a.x, py - a.y)
  let t = ((px - a.x) * dx + (py - a.y) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy))
}
