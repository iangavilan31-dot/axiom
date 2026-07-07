// Radial web layout: Counting at the origin, branches fan out in sectors,
// tier = prerequisite depth = radius. Deterministic (seeded by node id).

import type { TopicNode, Person, BranchId, EdgeKey } from '../data/types'
import { edgeKey } from '../data/types'
import { chalkPath, hashStr, srand } from './chalk'

export interface LaidNode { node: TopicNode; x: number; y: number; r: number }
export interface LaidPerson { person: Person; x: number; y: number; r: number }
export interface LaidEdge {
  a: string; b: string; key: EdgeKey
  pts: { x: number; y: number }[]
  ax: number; ay: number; bx: number; by: number
  minX: number; minY: number; maxX: number; maxY: number
}
export interface BranchLabel { branch: BranchId; name: string; x: number; y: number; rot: number }

export interface WebLayout {
  nodes: Map<string, LaidNode>
  people: Map<string, LaidPerson>
  edges: LaidEdge[]
  edgesByNode: Map<string, LaidEdge[]>
  branchLabels: BranchLabel[]
  bounds: { minX: number; minY: number; maxX: number; maxY: number }
}

const R0 = 120
const TIER_R = 150
export const radiusOfTier = (tier: number): number => (tier <= 0 ? 0 : R0 + tier * TIER_R)

/** angular sector per branch, degrees. null = special placement. */
const SECTORS: Record<BranchId, [number, number] | null> = {
  arithmetic: null,           // golden-angle spiral around the core
  algebra: [0, 36],
  'number-theory': [36, 66],
  discrete: [66, 94],
  logic: [94, 128],
  probability: [128, 162],
  'linear-algebra': [162, 188],
  calculus: [188, 224],
  analysis: [224, 254],
  topology: [254, 278],
  'abstract-algebra': [278, 304],
  geometry: [304, 338],
  trigonometry: [338, 360],
  frontier: null,             // rides the angle of its primary prereq, outer rim
}

const D2R = Math.PI / 180
const GOLDEN = 137.508 * D2R

export function layoutWeb(topics: TopicNode[], people: Person[], branchNames: Record<BranchId, string>): WebLayout {
  const nodes = new Map<string, LaidNode>()

  // --- arithmetic core: golden-angle spiral ---
  let coreI = 0
  for (const n of topics) {
    if (n.branch !== 'arithmetic') continue
    const rnd = srand(hashStr(n.id))
    if (n.tier <= 0) { nodes.set(n.id, { node: n, x: 0, y: 0, r: 48 }); continue }
    const ang = n.angle !== undefined ? n.angle * D2R : coreI * GOLDEN + 0.7
    coreI++
    const rad = radiusOfTier(n.tier) * (0.94 + rnd() * 0.16)
    nodes.set(n.id, { node: n, x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, r: n.tier <= 1 ? 30 : 24 })
  }

  // --- sectored branches ---
  const byBranchTier = new Map<string, TopicNode[]>()
  for (const n of topics) {
    if (n.branch === 'arithmetic' || n.branch === 'frontier') continue
    const k = `${n.branch}:${n.tier}`
    if (!byBranchTier.has(k)) byBranchTier.set(k, [])
    byBranchTier.get(k)!.push(n)
  }
  for (const [k, group] of byBranchTier) {
    const branch = k.split(':')[0] as BranchId
    const sector = SECTORS[branch]!
    const [a0d, a1d] = sector
    const a0 = a0d * D2R, a1 = a1d * D2R
    group.forEach((n, i) => {
      const rnd = srand(hashStr(n.id))
      const t = n.angle !== undefined
        ? 0 // unused
        : (i + 0.7 + (rnd() - 0.5) * 0.5) / (group.length + 0.4)
      const ang = n.angle !== undefined ? n.angle * D2R : a0 + t * (a1 - a0)
      const rad = radiusOfTier(n.tier) * (0.95 + rnd() * 0.12)
      nodes.set(n.id, { node: n, x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, r: 24 })
    })
  }

  // --- frontier: outer rim at the angle of the primary prereq ---
  for (const n of topics) {
    if (n.branch !== 'frontier') continue
    const rnd = srand(hashStr(n.id))
    const p = n.prereqs && n.prereqs.length ? nodes.get(n.prereqs[0]) : undefined
    const baseAng = n.angle !== undefined
      ? n.angle * D2R
      : p ? Math.atan2(p.y, p.x) + (rnd() - 0.5) * 0.34 : rnd() * Math.PI * 2
    const rad = radiusOfTier(n.tier) * (0.96 + rnd() * 0.1)
    nodes.set(n.id, { node: n, x: Math.cos(baseAng) * rad, y: Math.sin(baseAng) * rad, r: 24 })
  }

  // --- light overlap relaxation (same-radius neighbours pushed apart) ---
  const all = [...nodes.values()].filter(l => l.node.tier > 0)
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const A = all[i], B = all[j]
        const dx = B.x - A.x, dy = B.y - A.y
        const d = Math.hypot(dx, dy)
        const min = 92
        if (d > 0.01 && d < min) {
          const push = (min - d) / 2 / d
          A.x -= dx * push; A.y -= dy * push
          B.x += dx * push; B.y += dy * push
        }
      }
    }
  }

  // --- people: near the centroid of their topics, pushed outward ---
  const laidPeople = new Map<string, LaidPerson>()
  for (const p of people) {
    const anchors = p.near.map(id => nodes.get(id)).filter((x): x is LaidNode => !!x)
    const rnd = srand(hashStr(p.id))
    let cx = 0, cy = 0
    if (anchors.length) {
      for (const a of anchors) { cx += a.x; cy += a.y }
      cx /= anchors.length; cy /= anchors.length
    }
    const d = Math.hypot(cx, cy) || 1
    const out = 120 + rnd() * 60
    let px = cx + (cx / d) * out + (rnd() - 0.5) * 120
    let py = cy + (cy / d) * out + (rnd() - 0.5) * 120
    // nudge off any topic node
    for (const l of all) {
      const dx = px - l.x, dy = py - l.y
      const dist = Math.hypot(dx, dy)
      if (dist < 85 && dist > 0.01) { px += (dx / dist) * (85 - dist); py += (dy / dist) * (85 - dist) }
    }
    laidPeople.set(p.id, { person: p, x: px, y: py, r: 30 })
  }

  // --- edges ---
  const edges: LaidEdge[] = []
  const edgesByNode = new Map<string, LaidEdge[]>()
  const seen = new Set<EdgeKey>()
  for (const n of topics) {
    if (!n.prereqs) continue
    const to = nodes.get(n.id)!
    for (const pid of n.prereqs) {
      const from = nodes.get(pid)
      if (!from) { console.warn(`[axiom] missing prereq "${pid}" for "${n.id}"`); continue }
      const key = edgeKey(pid, n.id)
      if (seen.has(key)) continue
      seen.add(key)
      const len = Math.hypot(to.x - from.x, to.y - from.y)
      const curve = (hashStr(key) % 2 === 0 ? 1 : -1) * len * (len > 900 ? 0.09 : 0.03)
      const pts = chalkPath(from.x, from.y, to.x, to.y, hashStr(key), 4, curve)
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      for (const q of pts) {
        if (q.x < minX) minX = q.x; if (q.x > maxX) maxX = q.x
        if (q.y < minY) minY = q.y; if (q.y > maxY) maxY = q.y
      }
      const e: LaidEdge = { a: pid, b: n.id, key, pts, ax: from.x, ay: from.y, bx: to.x, by: to.y, minX, minY, maxX, maxY }
      edges.push(e)
      if (!edgesByNode.has(pid)) edgesByNode.set(pid, [])
      if (!edgesByNode.has(n.id)) edgesByNode.set(n.id, [])
      edgesByNode.get(pid)!.push(e)
      edgesByNode.get(n.id)!.push(e)
    }
  }

  // --- branch labels ---
  const branchLabels: BranchLabel[] = []
  const branchRadii = new Map<BranchId, { min: number; max: number }>()
  for (const l of nodes.values()) {
    const b = l.node.branch
    if (b === 'arithmetic' || b === 'frontier') continue
    const r = Math.hypot(l.x, l.y)
    const cur = branchRadii.get(b) ?? { min: Infinity, max: -Infinity }
    cur.min = Math.min(cur.min, r); cur.max = Math.max(cur.max, r)
    branchRadii.set(b, cur)
  }
  for (const [b, rr] of branchRadii) {
    const sector = SECTORS[b]
    if (!sector) continue
    const mid = ((sector[0] + sector[1]) / 2) * D2R
    const rad = (rr.min + rr.max) / 2
    branchLabels.push({
      branch: b,
      name: branchNames[b].toUpperCase(),
      x: Math.cos(mid) * rad,
      y: Math.sin(mid) * rad,
      rot: ((hashStr(b) % 100) / 100 - 0.5) * 0.12,
    })
  }

  // --- bounds ---
  let minX = -300, minY = -300, maxX = 300, maxY = 300
  for (const l of nodes.values()) {
    minX = Math.min(minX, l.x - 200); maxX = Math.max(maxX, l.x + 200)
    minY = Math.min(minY, l.y - 200); maxY = Math.max(maxY, l.y + 200)
  }

  return { nodes, people: laidPeople, edges, edgesByNode, branchLabels, bounds: { minX, minY, maxX, maxY } }
}
