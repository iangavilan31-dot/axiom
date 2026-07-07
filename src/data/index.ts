import type { BranchId, Person, TopicNode } from './types'
import { ARITHMETIC } from './branches/arithmetic'
import { ALGEBRA } from './branches/algebra'
import { GEOMETRY } from './branches/geometry'
import { TRIGONOMETRY } from './branches/trigonometry'
import { CALCULUS } from './branches/calculus'
import { LINEAR_ALGEBRA } from './branches/linear-algebra'
import { PROBABILITY } from './branches/probability'
import { NUMBER_THEORY } from './branches/number-theory'
import { DISCRETE } from './branches/discrete'
import { ANALYSIS } from './branches/analysis'
import { TOPOLOGY } from './branches/topology'
import { ABSTRACT_ALGEBRA } from './branches/abstract-algebra'
import { LOGIC } from './branches/logic'
import { FRONTIER } from './branches/frontier'
import { PEOPLE } from './people'

export { PEOPLE }

export const NODES: TopicNode[] = [
  ...ARITHMETIC, ...ALGEBRA, ...GEOMETRY, ...TRIGONOMETRY, ...CALCULUS,
  ...LINEAR_ALGEBRA, ...PROBABILITY, ...NUMBER_THEORY, ...DISCRETE,
  ...ANALYSIS, ...TOPOLOGY, ...ABSTRACT_ALGEBRA, ...LOGIC, ...FRONTIER,
]

export const NODE_MAP = new Map<string, TopicNode>(NODES.map(n => [n.id, n]))
export const PEOPLE_MAP = new Map<string, Person>(PEOPLE.map(p => [p.id, p]))

export const BRANCH_NAMES: Record<BranchId, string> = {
  arithmetic: 'Arithmetic',
  algebra: 'Algebra',
  geometry: 'Geometry',
  trigonometry: 'Trigonometry',
  calculus: 'Calculus',
  'linear-algebra': 'Linear Algebra',
  probability: 'Probability & Stats',
  'number-theory': 'Number Theory',
  discrete: 'Discrete Math',
  analysis: 'Analysis',
  topology: 'Topology',
  'abstract-algebra': 'Abstract Algebra',
  logic: 'Logic & Foundations',
  frontier: 'The Frontier',
}

// wet chalk paint — one hue per branch (banned-list safe: no neon cyan)
export const BRANCH_COLORS: Record<BranchId, string> = {
  arithmetic: '#ffd166',
  algebra: '#ff9558',
  geometry: '#7f9cff',
  trigonometry: '#ff8fb3',
  calculus: '#ff6b5e',
  'linear-algebra': '#c9a6ff',
  probability: '#7bd88f',
  'number-theory': '#e0c068',
  discrete: '#b5e061',
  analysis: '#e07be0',
  topology: '#63d0a8',
  'abstract-algebra': '#9376ff',
  logic: '#d78fff',
  frontier: '#f6f1e0',
}

// dev-time sanity: every prereq and person anchor must exist
if (import.meta.env.DEV) {
  for (const n of NODES) {
    for (const p of n.prereqs ?? []) {
      if (!NODE_MAP.has(p)) console.warn(`[axiom data] "${n.id}" prereq missing: "${p}"`)
    }
  }
  for (const p of PEOPLE) {
    for (const t of p.near) {
      if (!NODE_MAP.has(t)) console.warn(`[axiom data] person "${p.id}" anchor missing: "${t}"`)
    }
  }
  const ids = new Set<string>()
  for (const n of NODES) {
    if (ids.has(n.id)) console.warn(`[axiom data] duplicate id: "${n.id}"`)
    ids.add(n.id)
  }
}
