// Mini chalk animations for "why do these two connect?" — the marquee edges
// get bespoke scenes; everything else gets the generic builds-on animation.
// All scenes loop, draw in a ~304x170 canvas, t in seconds.

import { edgeKey, type EdgeKey } from '../data/types'
import { chalkCircle, chalkLine } from '../engine/chalk'

export type SceneFn = (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => void

const CHALK = '#e9e4d4'
const GOLD = '#ffd166'

function txt(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size = 20, color = CHALK, align: CanvasTextAlign = 'center'): void {
  ctx.save()
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${size}px Caveat, cursive`
  ctx.fillText(s, x, y)
  ctx.restore()
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r = 7, color = CHALK, a = 1): void {
  ctx.save()
  ctx.globalAlpha = a
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

const scenes = new Map<EdgeKey, SceneFn>()
function reg(a: string, b: string, fn: SceneFn): void { scenes.set(edgeKey(a, b), fn) }

// ---------- arithmetic marquee ----------

reg('counting', 'addition', (ctx, t, w, h) => {
  const T = t % 5
  const cy = h * 0.45
  for (let i = 0; i < 3; i++) if (T > 0.3 + i * 0.25) dot(ctx, w * 0.22 + i * 26, cy, 8, CHALK)
  if (T > 1.3) txt(ctx, '3', w * 0.3, cy + 38, 26)
  if (T > 1.7) txt(ctx, '+', w * 0.47, cy, 30, GOLD)
  for (let i = 0; i < 2; i++) if (T > 2.0 + i * 0.25) dot(ctx, w * 0.58 + i * 26, cy, 8, GOLD)
  if (T > 2.6) txt(ctx, '2', w * 0.62, cy + 38, 26)
  if (T > 3.2) txt(ctx, '= 5', w * 0.82, cy, 30, GOLD)
  txt(ctx, 'adding is just counting on', w / 2, h - 16, 19, 'rgba(233,228,212,.6)')
})

reg('addition', 'subtraction', (ctx, t, w, h) => {
  const T = t % 5
  const cy = h * 0.42
  for (let i = 0; i < 7; i++) dot(ctx, w * 0.16 + i * 30, cy, 8, CHALK)
  for (let i = 0; i < 3; i++) {
    const p = clamp01((T - 1 - i * 0.5) / 0.4)
    if (p > 0) {
      const x = w * 0.16 + (6 - i) * 30
      ctx.save()
      ctx.globalAlpha = p
      chalkLine(ctx, x - 9, cy - 9, x - 9 + 18 * p, cy - 9 + 18 * p, { color: '#ff6b5e', width: 3, seed: i + 3 })
      chalkLine(ctx, x + 9, cy - 9, x + 9 - 18 * p, cy - 9 + 18 * p, { color: '#ff6b5e', width: 3, seed: i + 9 })
      ctx.restore()
    }
  }
  if (T > 3) txt(ctx, '7 − 3 = 4', w / 2, cy + 46, 28, GOLD)
  txt(ctx, 'subtracting is adding, undone', w / 2, h - 14, 19, 'rgba(233,228,212,.6)')
})

reg('addition', 'multiplication', (ctx, t, w, h) => {
  const T = t % 5.5
  for (let r = 0; r < 3; r++) {
    if (T < 0.4 + r * 0.6) continue
    for (let c = 0; c < 4; c++) dot(ctx, w * 0.3 + c * 30, h * 0.24 + r * 30, 7.5, r === 0 ? CHALK : r === 1 ? GOLD : '#ff9558')
    txt(ctx, r === 0 ? '4' : '+ 4', w * 0.72, h * 0.24 + r * 30, 22, 'rgba(233,228,212,.75)', 'left')
  }
  if (T > 3) txt(ctx, '3 × 4 = 12', w / 2, h * 0.78, 30, GOLD)
  txt(ctx, '× is repeated +', w / 2, h - 12, 19, 'rgba(233,228,212,.6)')
})

reg('multiplication', 'division', (ctx, t, w, h) => {
  const T = t % 5
  let i = 0
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    dot(ctx, w * 0.26 + c * 28, h * 0.26 + r * 34, 7, CHALK)
    i++
  }
  for (let g = 0; g < 3; g++) {
    const p = clamp01((T - 1.2 - g * 0.6) / 0.5)
    if (p > 0) {
      ctx.save()
      ctx.globalAlpha = p
      chalkCircle(ctx, w * 0.26 + 1.5 * 28, h * 0.26 + g * 34, 52, { seed: g + 2, color: GOLD, width: 2.4, wobble: 0.08 })
      ctx.restore()
    }
  }
  if (T > 3.4) txt(ctx, '12 ÷ 3 = 4 each', w / 2, h * 0.85, 27, GOLD)
  txt(ctx, '÷ un-does ×: split into equal groups', w / 2, h - 12, 18, 'rgba(233,228,212,.6)')
})

reg('subtraction', 'division', (ctx, t, w, h) => {
  const T = t % 5.5
  const y = h * 0.55
  chalkLine(ctx, w * 0.08, y, w * 0.92, y, { color: CHALK, width: 2, seed: 5, alpha: 0.7 })
  for (let i = 0; i <= 12; i += 4) {
    const x = w * 0.08 + (i / 12) * w * 0.84
    chalkLine(ctx, x, y - 6, x, y + 6, { color: CHALK, width: 2, seed: i, alpha: 0.7 })
    txt(ctx, String(i), x, y + 20, 17, 'rgba(233,228,212,.7)')
  }
  for (let hop = 0; hop < 3; hop++) {
    const p = clamp01((T - 0.8 - hop * 0.9) / 0.7)
    if (p <= 0) continue
    const x1 = w * 0.08 + ((12 - hop * 4) / 12) * w * 0.84
    const x2 = w * 0.08 + ((12 - (hop + 1) * 4) / 12) * w * 0.84
    ctx.save()
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2.6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc((x1 + x2) / 2, y, (x1 - x2) / 2, Math.PI, Math.PI + Math.PI * p, false)
    ctx.stroke()
    ctx.restore()
    if (p >= 1) txt(ctx, '−4', (x1 + x2) / 2, y - 34, 20, GOLD)
  }
  if (T > 3.8) txt(ctx, '12 ÷ 4 = 3 hops', w / 2, h * 0.16, 27, GOLD)
  txt(ctx, '÷ is repeated −', w / 2, h - 10, 19, 'rgba(233,228,212,.6)')
})

reg('multiplication', 'exponents', (ctx, t, w, h) => {
  const T = t % 5
  const labels = ['2', '2²', '2³', '2⁴']
  const counts = [2, 4, 8, 16]
  for (let k = 0; k < 4; k++) {
    if (T < 0.4 + k * 0.8) continue
    const cx = w * (0.14 + k * 0.24)
    const n = counts[k]
    const cols = Math.ceil(Math.sqrt(n))
    for (let i = 0; i < n; i++) {
      dot(ctx, cx - (cols - 1) * 6 + (i % cols) * 12, h * 0.4 - (cols - 1) * 6 + Math.floor(i / cols) * 12, 3.6, k === 3 ? GOLD : CHALK)
    }
    txt(ctx, labels[k], cx, h * 0.72, 26, k === 3 ? GOLD : CHALK)
  }
  txt(ctx, '^ is repeated ×', w / 2, h - 14, 19, 'rgba(233,228,212,.6)')
})

reg('division', 'fractions', (ctx, t, w, h) => {
  const T = t % 5
  const cx = w * 0.3, cy = h * 0.45, r = 44
  chalkCircle(ctx, cx, cy, r, { seed: 3, color: CHALK, width: 2.2 })
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 2
    chalkLine(ctx, cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, { color: CHALK, width: 1.8, seed: i, alpha: 0.7 })
  }
  for (let i = 0; i < 3; i++) {
    const p = clamp01((T - 1 - i * 0.5) / 0.4)
    if (p <= 0) continue
    const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.globalAlpha = 0.8 * p
    ctx.fillStyle = GOLD
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r - 3, a0, a0 + Math.PI / 2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  if (T > 2.8) txt(ctx, '3 ÷ 4 = ¾', w * 0.68, h * 0.38, 30, GOLD, 'left')
  if (T > 3.4) txt(ctx, 'a fraction IS a division', w * 0.66, h * 0.6, 19, 'rgba(233,228,212,.7)', 'left')
})

reg('fractions', 'decimals', (ctx, t, w, h) => {
  const T = t % 4.5
  const cx = w * 0.28, cy = h * 0.45, r = 42
  chalkCircle(ctx, cx, cy, r, { seed: 4, color: CHALK, width: 2.2 })
  const fill = clamp01((T - 0.5) / 1.6) * 0.75
  ctx.save()
  ctx.globalAlpha = 0.8
  ctx.fillStyle = GOLD
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.arc(cx, cy, r - 3, -Math.PI / 2, -Math.PI / 2 + fill * Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
  txt(ctx, '¾', w * 0.58, h * 0.32, 32)
  if (T > 2.4) txt(ctx, '= 0.75', w * 0.74, h * 0.32, 32, GOLD, 'left')
  if (T > 3) txt(ctx, 'same number, base-ten clothes', w * 0.6, h * 0.62, 18, 'rgba(233,228,212,.7)')
})

// ---------- geometry / trig ----------

reg('triangles', 'pythagorean-theorem', (ctx, t, w, h) => {
  const T = t % 5.5
  const ox = w * 0.34, oy = h * 0.72, a = 66, b = 50
  chalkLine(ctx, ox, oy, ox + a, oy, { color: CHALK, width: 2.4, seed: 1 })
  chalkLine(ctx, ox, oy, ox, oy - b, { color: CHALK, width: 2.4, seed: 2 })
  chalkLine(ctx, ox, oy - b, ox + a, oy, { color: CHALK, width: 2.4, seed: 3 })
  if (T > 1) {
    ctx.save(); ctx.globalAlpha = clamp01((T - 1) / 0.5)
    ctx.strokeStyle = '#7f9cff'; ctx.lineWidth = 2
    ctx.strokeRect(ox, oy, a, a * 0.3)
    txt(ctx, 'a²', ox + a / 2, oy + a * 0.15, 20, '#7f9cff')
    ctx.restore()
  }
  if (T > 1.8) {
    ctx.save(); ctx.globalAlpha = clamp01((T - 1.8) / 0.5)
    ctx.strokeStyle = '#ff8fb3'; ctx.lineWidth = 2
    ctx.strokeRect(ox - b * 0.3, oy - b, b * 0.3, b)
    txt(ctx, 'b²', ox - b * 0.15, oy - b / 2, 20, '#ff8fb3')
    ctx.restore()
  }
  if (T > 2.6) {
    ctx.save(); ctx.globalAlpha = clamp01((T - 2.6) / 0.5)
    ctx.strokeStyle = GOLD; ctx.lineWidth = 2
    ctx.save()
    ctx.translate(ox, oy - b)
    ctx.rotate(Math.atan2(b, a))
    ctx.strokeRect(0, -Math.hypot(a, b) * 0.3, Math.hypot(a, b), Math.hypot(a, b) * 0.3)
    ctx.restore()
    ctx.restore()
  }
  if (T > 3.4) txt(ctx, 'a² + b² = c²', w * 0.74, h * 0.3, 28, GOLD)
})

reg('unit-circle', 'trig-graphs', (ctx, t, w, h) => {
  const cx = w * 0.2, cy = h * 0.5, r = 38
  const ang = -t * 1.4
  chalkCircle(ctx, cx, cy, r, { seed: 6, color: CHALK, width: 2 })
  const px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r
  chalkLine(ctx, cx, cy, px, py, { color: GOLD, width: 2, seed: 8 })
  dot(ctx, px, py, 5, GOLD)
  // unrolled sine
  ctx.save()
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.9
  ctx.beginPath()
  const x0 = w * 0.4
  for (let i = 0; i <= 120; i++) {
    const x = x0 + (i / 120) * (w * 0.55)
    const y = cy + Math.sin(ang + (i / 120) * Math.PI * 4) * r
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.setLineDash([4, 5])
  ctx.globalAlpha = 0.4
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x0, py); ctx.stroke()
  ctx.restore()
  txt(ctx, 'the circle, unrolled, is the wave', w / 2, h - 12, 19, 'rgba(233,228,212,.65)')
})

// ---------- calculus ----------

reg('limits', 'derivatives', (ctx, t, w, h) => {
  const T = (Math.sin(t * 0.9) + 1) / 2 // slide back and forth
  const f = (x: number) => h * 0.75 - Math.pow((x - w * 0.2) / (w * 0.16), 2) * -1 * 0 - ((x - w * 0.15) * (x - w * 0.15)) / (w * 0.5)
  ctx.save()
  ctx.strokeStyle = CHALK
  ctx.lineWidth = 2.2
  ctx.globalAlpha = 0.85
  ctx.beginPath()
  for (let i = 0; i <= 100; i++) {
    const x = w * 0.08 + (i / 100) * w * 0.84
    const y = f(x)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.restore()
  const xa = w * 0.3
  const xb = xa + (w * 0.5 - w * 0.02) * (1 - T) + w * 0.02
  const ya = f(xa), yb = f(xb)
  const slope = (yb - ya) / (xb - xa || 1)
  ctx.save()
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.moveTo(xa - 60, ya - slope * 60)
  ctx.lineTo(xb + 60, yb + slope * 60)
  ctx.stroke()
  ctx.restore()
  dot(ctx, xa, ya, 5, GOLD)
  dot(ctx, xb, yb, 5, '#ff6b5e')
  txt(ctx, 'slide the second point in — the limit of the slope is the derivative', w / 2, h - 12, 16.5, 'rgba(233,228,212,.65)')
})

reg('riemann-sums', 'definite-integrals', (ctx, t, w, h) => {
  const n = 3 + Math.floor(((t % 6) / 6) * 22)
  const f = (x: number) => h * 0.8 - (Math.sin((x / w) * 3.4 + 0.4) * 0.5 + 0.55) * h * 0.5
  const x0 = w * 0.1, x1 = w * 0.9
  ctx.save()
  for (let i = 0; i < n; i++) {
    const xa = x0 + ((x1 - x0) * i) / n
    const xw = (x1 - x0) / n
    const y = f(xa + xw / 2)
    ctx.fillStyle = GOLD
    ctx.globalAlpha = 0.3
    ctx.fillRect(xa + 1, y, xw - 2, h * 0.8 - y)
    ctx.globalAlpha = 0.8
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1.2
    ctx.strokeRect(xa + 1, y, xw - 2, h * 0.8 - y)
  }
  ctx.strokeStyle = CHALK
  ctx.lineWidth = 2.4
  ctx.globalAlpha = 0.95
  ctx.beginPath()
  for (let i = 0; i <= 100; i++) {
    const x = x0 + (i / 100) * (x1 - x0)
    const y = f(x)
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.restore()
  txt(ctx, `${n} slices → ∞ slices = exact area`, w / 2, h - 12, 18, 'rgba(233,228,212,.7)')
})

// ---------- generic fallback ----------

export function genericScene(titleA: string, titleB: string, colorA: string, colorB: string): SceneFn {
  return (ctx, t, w, h) => {
    const T = t % 3
    const ax = w * 0.24, bx = w * 0.76, cy = h * 0.42
    chalkCircle(ctx, ax, cy, 34, { seed: 11, color: colorA, width: 2.4 })
    chalkCircle(ctx, bx, cy, 34, { seed: 22, color: colorB, width: 2.4 })
    txt(ctx, titleA, ax, cy + 54, 18)
    txt(ctx, titleB, bx, cy + 54, 18)
    // arrow draws over and over
    const p = clamp01(T / 1.2)
    const x2 = ax + 44 + (bx - ax - 88) * p
    chalkLine(ctx, ax + 44, cy, x2, cy, { color: GOLD, width: 2.6, seed: 7 })
    if (p >= 1) {
      chalkLine(ctx, x2, cy, x2 - 12, cy - 8, { color: GOLD, width: 2.6, seed: 8 })
      chalkLine(ctx, x2, cy, x2 - 12, cy + 8, { color: GOLD, width: 2.6, seed: 9 })
    }
    const pulse = 1 + Math.sin(t * 3) * 0.05
    ctx.save()
    ctx.globalAlpha = 0.55
    txt(ctx, 'stands on', w / 2, cy - 26 * pulse, 19, 'rgba(233,228,212,.8)')
    ctx.restore()
  }
}

export function getScene(key: EdgeKey): SceneFn | undefined {
  return scenes.get(key)
}
