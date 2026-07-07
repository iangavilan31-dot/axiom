export type BranchId =
  | 'arithmetic' | 'algebra' | 'geometry' | 'trigonometry' | 'calculus'
  | 'linear-algebra' | 'probability' | 'number-theory' | 'discrete'
  | 'analysis' | 'topology' | 'abstract-algebra' | 'logic' | 'frontier'

export interface Problem { q: string; a: string }

export interface TopicNode {
  id: string
  title: string
  /** one short line under the title — the only text most surfaces show */
  tag: string
  /** 2-4 sentence chalk explanation for the side panel */
  explain: string
  branch: BranchId
  /** prerequisite depth from Counting; drives radius on the web */
  tier: number
  prereqs?: string[]
  /** prereqId -> one line explaining WHY that edge exists */
  why?: Record<string, string>
  /** approximate year the idea emerged; negative = BC. Drives the timeline. */
  year?: number
  problems?: Problem[]
  /** optional hand-tuned angle in degrees (layout hint) */
  angle?: number
}

export interface Person {
  id: string
  name: string
  years: string
  /** representative year for timeline placement */
  year: number
  legend: string
  /** signature formula / symbol chalked on the medallion */
  glyph: string
  /** topic ids this person floats near (first = primary) */
  near: string[]
}

export interface BranchMeta {
  id: BranchId
  name: string
  color: string
}

export type EdgeKey = string
export const edgeKey = (a: string, b: string): EdgeKey =>
  a < b ? `${a}|${b}` : `${b}|${a}`
