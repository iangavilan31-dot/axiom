// Self-mark mastery, persisted locally. Problems NEVER gate (Ian's lock).

const KEY = 'axiom-progress-v1'

export class Progress {
  mastered = new Set<string>()

  constructor() {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) this.mastered = new Set(JSON.parse(raw) as string[])
    } catch { /* fresh board */ }
  }

  has(id: string): boolean { return this.mastered.has(id) }

  toggle(id: string): boolean {
    const now = !this.mastered.has(id)
    if (now) this.mastered.add(id)
    else this.mastered.delete(id)
    this.save()
    return now
  }

  private save(): void {
    try { localStorage.setItem(KEY, JSON.stringify([...this.mastered])) } catch { /* private mode */ }
  }
}
