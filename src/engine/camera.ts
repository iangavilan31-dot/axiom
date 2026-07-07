// Pan/zoom camera with inertia and animated fly-to.

export class Camera {
  x = 0
  y = 0
  z = 0.34
  private vx = 0
  private vy = 0
  private fly: { fromX: number; fromY: number; fromZ: number; toX: number; toY: number; toZ: number; t: number; dur: number } | null = null

  minZ = 0.05
  maxZ = 2.6

  constructor(public viewW: number, public viewH: number) {}

  resize(w: number, h: number): void { this.viewW = w; this.viewH = h }

  screenToWorld(px: number, py: number): { x: number; y: number } {
    return {
      x: (px - this.viewW / 2) / this.z + this.x,
      y: (py - this.viewH / 2) / this.z + this.y,
    }
  }

  worldToScreen(wx: number, wy: number): { x: number; y: number } {
    return {
      x: (wx - this.x) * this.z + this.viewW / 2,
      y: (wy - this.y) * this.z + this.viewH / 2,
    }
  }

  applyTo(ctx: CanvasRenderingContext2D, dpr: number): void {
    ctx.setTransform(
      this.z * dpr, 0, 0, this.z * dpr,
      (this.viewW / 2 - this.x * this.z) * dpr,
      (this.viewH / 2 - this.y * this.z) * dpr,
    )
  }

  panBy(dxScreen: number, dyScreen: number): void {
    this.fly = null
    this.x -= dxScreen / this.z
    this.y -= dyScreen / this.z
    this.vx = -dxScreen / this.z
    this.vy = -dyScreen / this.z
  }

  stop(): void { this.vx = 0; this.vy = 0; this.fly = null }

  zoomAt(px: number, py: number, factor: number): void {
    this.fly = null
    const before = this.screenToWorld(px, py)
    this.z = Math.min(this.maxZ, Math.max(this.minZ, this.z * factor))
    const after = this.screenToWorld(px, py)
    this.x += before.x - after.x
    this.y += before.y - after.y
  }

  flyTo(x: number, y: number, z: number, dur = 0.9): void {
    this.vx = 0; this.vy = 0
    this.fly = { fromX: this.x, fromY: this.y, fromZ: this.z, toX: x, toY: y, toZ: Math.min(this.maxZ, Math.max(this.minZ, z)), t: 0, dur }
  }

  get flying(): boolean { return this.fly !== null }

  update(dt: number): void {
    if (this.fly) {
      const f = this.fly
      f.t += dt
      const t = Math.min(1, f.t / f.dur)
      const e = 1 - Math.pow(1 - t, 3) // easeOutCubic
      this.x = f.fromX + (f.toX - f.fromX) * e
      this.y = f.fromY + (f.toY - f.fromY) * e
      // zoom through a slight midpoint dip for a "lift off then land" feel on long flights
      this.z = f.fromZ + (f.toZ - f.fromZ) * e
      if (t >= 1) this.fly = null
      return
    }
    // inertia
    if (Math.abs(this.vx) > 0.01 || Math.abs(this.vy) > 0.01) {
      this.x += this.vx * dt * 14
      this.y += this.vy * dt * 14
      const decay = Math.pow(0.0016, dt)
      this.vx *= decay
      this.vy *= decay
    }
  }
}
