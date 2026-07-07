// SAT campaign state: mastery, streak, XP, daily goal, spaced-repetition review.
// Persisted locally so progress is durable across sessions.

import { SAT_SKILL_MAP } from './data'

const KEY = 'axiom-sat-v1'

export interface SatSave {
  mastered: string[]
  /** per skill: which problem indices have been answered correctly */
  correct: Record<string, number[]>
  review: string[]
  xp: number
  streak: number
  lastActive: string // YYYY-MM-DD of last correct answer
  dailyDate: string
  dailyCount: number
  dailyGoal: number
}

const today = (): string => new Date().toISOString().slice(0, 10)
const dayDiff = (a: string, b: string): number =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86400000)

export class SatState {
  mastered = new Set<string>()
  correct = new Map<string, Set<number>>()
  review = new Set<string>()
  xp = 0
  streak = 0
  lastActive = ''
  dailyDate = today()
  dailyCount = 0
  dailyGoal = 5

  constructor() {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const s = JSON.parse(raw) as SatSave
        this.mastered = new Set(s.mastered ?? [])
        this.correct = new Map(Object.entries(s.correct ?? {}).map(([k, v]) => [k, new Set(v)]))
        this.review = new Set(s.review ?? [])
        this.xp = s.xp ?? 0
        this.streak = s.streak ?? 0
        this.lastActive = s.lastActive ?? ''
        this.dailyDate = s.dailyDate ?? today()
        this.dailyCount = s.dailyCount ?? 0
        this.dailyGoal = s.dailyGoal ?? 5
      }
    } catch { /* fresh */ }
    // roll the daily counter if it's a new day
    if (this.dailyDate !== today()) { this.dailyDate = today(); this.dailyCount = 0 }
    // a >1 day gap since last activity breaks the streak
    if (this.lastActive && dayDiff(this.lastActive, today()) > 1) this.streak = 0
  }

  private save(): void {
    const s: SatSave = {
      mastered: [...this.mastered],
      correct: Object.fromEntries([...this.correct].map(([k, v]) => [k, [...v]])),
      review: [...this.review],
      xp: this.xp, streak: this.streak, lastActive: this.lastActive,
      dailyDate: this.dailyDate, dailyCount: this.dailyCount, dailyGoal: this.dailyGoal,
    }
    try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* private mode */ }
  }

  /** touch the daily streak on a correct answer */
  private touchStreak(): void {
    const t = today()
    if (this.lastActive !== t) {
      if (this.lastActive && dayDiff(this.lastActive, t) === 1) this.streak += 1
      else this.streak = Math.max(1, this.streak === 0 ? 1 : this.streak) // first ever, or resumed
      if (!this.lastActive) this.streak = 1
      this.lastActive = t
    }
    if (this.dailyDate !== t) { this.dailyDate = t; this.dailyCount = 0 }
  }

  /** record a first-try (or retried) correct answer to a problem */
  recordCorrect(skillId: string, problemIdx: number, firstTry: boolean): { mastered: boolean; xpGain: number } {
    this.touchStreak()
    this.dailyCount += 1
    let set = this.correct.get(skillId)
    if (!set) { set = new Set(); this.correct.set(skillId, set) }
    const isNew = !set.has(problemIdx)
    set.add(problemIdx)
    const xpGain = firstTry ? 12 : 6
    this.xp += xpGain
    // skill mastered when every problem has a correct answer on record
    const skill = SAT_SKILL_MAP.get(skillId)
    let mastered = false
    if (skill && set.size >= skill.problems.length && !this.mastered.has(skillId)) {
      this.mastered.add(skillId)
      this.review.delete(skillId)
      this.xp += 40
      mastered = true
    }
    this.save()
    return { mastered, xpGain: xpGain + (mastered ? 40 : 0) }
  }

  /** a wrong first attempt flags the skill for spaced review */
  recordMiss(skillId: string): void {
    if (!this.mastered.has(skillId)) this.review.add(skillId)
    this.save()
  }

  setGoal(n: number): void { this.dailyGoal = n; this.save() }

  isMastered(id: string): boolean { return this.mastered.has(id) }
  correctCount(id: string): number { return this.correct.get(id)?.size ?? 0 }
  get masteredCount(): number { return this.mastered.size }
  get dailyMet(): boolean { return this.dailyCount >= this.dailyGoal }
}
