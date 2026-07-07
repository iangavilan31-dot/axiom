// Chalk drawing primitives — everything hand-drawn, deterministic per id.

export function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 — tiny seeded RNG */
export function srand(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface ChalkLineOpts {
  color?: string
  width?: number
  alpha?: number
  seed?: number
  /** perpendicular wobble in px */
  wobble?: number
  /** 0..1 draw-on progress */
  progress?: number
  /** skip the ghost second pass (cheaper) */
  single?: boolean
}

/** Precompute a wobbly polyline between two points (world coords, stable). */
export function chalkPath(
  x1: number, y1: number, x2: number, y2: number,
  seed: number, wobble = 3.5, curve = 0,
): { x: number; y: number }[] {
  const rnd = srand(seed)
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const n = Math.max(6, Math.min(22, Math.round(len / 46)))
  const nx = -dy / len, ny = dx / len
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    // quadratic bow for long cross-web edges + chalk wobble
    const bow = curve * Math.sin(t * Math.PI)
    const w = (i === 0 || i === n) ? 0 : (rnd() - 0.5) * 2 * wobble
    pts.push({ x: x1 + dx * t + nx * (bow + w), y: y1 + dy * t + ny * (bow + w) })
  }
  return pts
}

export function strokePolyline(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  opts: ChalkLineOpts = {},
): void {
  const { color = '#e9e4d4', width = 2, alpha = 1, progress = 1, single = false } = opts
  if (pts.length < 2 || progress <= 0) return
  const last = progress >= 1 ? pts.length - 1 : Math.max(1, Math.floor((pts.length - 1) * progress))
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.globalAlpha = alpha
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i <= last; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.stroke()
  if (!single) {
    // ghost pass — the double-stroke that sells "chalk"
    ctx.globalAlpha = alpha * 0.3
    ctx.lineWidth = width * 2.1
    ctx.stroke()
  }
  ctx.restore()
}

/** One-call wobbly chalk line (for UI-ish, non-cached drawing). */
export function chalkLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  opts: ChalkLineOpts = {},
): void {
  const seed = opts.seed ?? 1
  strokePolyline(ctx, chalkPath(x1, y1, x2, y2, seed, opts.wobble ?? 3), opts)
}

/** Wobbly hand-drawn circle with a small overshoot at the join. */
export function chalkCircle(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number,
  opts: ChalkLineOpts & { fill?: string; fillAlpha?: number } = {},
): void {
  const { color = '#e9e4d4', width = 2, alpha = 1, seed = 1, wobble = 0.06, single = false } = opts
  const rnd = srand(seed)
  const n = 26
  const start = rnd() * Math.PI * 2
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= n + 2; i++) { // +2 = overshoot overlap
    const a = start + (i / n) * Math.PI * 2
    const rr = r * (1 + (rnd() - 0.5) * 2 * wobble)
    pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
  }
  if (opts.fill) {
    ctx.save()
    ctx.globalAlpha = (opts.fillAlpha ?? 1) * alpha
    ctx.fillStyle = opts.fill
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i <= n; i++) ctx.lineTo(pts[i].x, pts[i].y)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  strokePolyline(ctx, pts, { color, width, alpha, single })
}

/** Generate the blackboard background texture once (screen-sized). */
export function makeBoardTexture(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75)
  g.addColorStop(0, '#182620')
  g.addColorStop(0.6, '#13201a')
  g.addColorStop(1, '#0b1310')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  // eraser ghosts — big soft lighter smudges
  const rnd = srand(97)
  for (let i = 0; i < 26; i++) {
    const x = rnd() * w, y = rnd() * h
    const r = 60 + rnd() * 260
    const sg = ctx.createRadialGradient(x, y, 0, x, y, r)
    sg.addColorStop(0, `rgba(233,228,212,${0.012 + rnd() * 0.02})`)
    sg.addColorStop(1, 'rgba(233,228,212,0)')
    ctx.fillStyle = sg
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rnd() * Math.PI)
    ctx.scale(1 + rnd() * 1.5, 0.35 + rnd() * 0.4)
    ctx.translate(-x, -y)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  // fine chalk speckle
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(233,228,212,${0.015 + rnd() * 0.035})`
    ctx.fillRect(rnd() * w, rnd() * h, 1, 1)
  }
  // vignette
  const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(5,9,7,0.55)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, w, h)
  return c
}
