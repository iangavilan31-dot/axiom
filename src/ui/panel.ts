// The chalk side panel: topics, people, and edge-why views. Minimal text.

import type { BranchId, Person, TopicNode } from '../data/types'
import { edgeKey } from '../data/types'
import { genericScene, getScene, type SceneFn } from './scenes'

export interface PanelDeps {
  getNode(id: string): TopicNode | undefined
  getPerson(id: string): Person | undefined
  colors: Record<BranchId, string>
  branchNames: Record<BranchId, string>
  isMastered(id: string): boolean
  onMark(id: string): void
  onShowPath(id: string): void
  onJump(id: string): void
  onClose(): void
}

export class Panel {
  private raf = 0

  constructor(private el: HTMLElement, private deps: PanelDeps) {}

  hide(): void {
    this.stopScene()
    this.el.classList.add('hidden')
  }

  private open(): void { this.el.classList.remove('hidden') }

  private stopScene(): void {
    if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0 }
  }

  private header(closeExtra?: () => void): string {
    return `<button class="close" title="close">×</button>`
  }

  private wireClose(): void {
    this.el.querySelector('.close')?.addEventListener('click', () => { this.hide(); this.deps.onClose() })
  }

  showTopic(id: string): void {
    const n = this.deps.getNode(id)
    if (!n) return
    this.stopScene()
    const color = this.deps.colors[n.branch]
    const mastered = this.deps.isMastered(id)
    const problems = (n.problems ?? []).map((p, i) => `
      <div class="problem">
        <div class="q">${esc(p.q)}</div>
        <div class="a veiled" data-i="${i}">${esc(p.a)}</div>
        <button class="reveal" data-i="${i}">show answer</button>
      </div>`).join('')

    this.el.innerHTML = `
      ${this.header()}
      <span class="branch-chip" style="color:${color};border-color:${color}">${esc(this.deps.branchNames[n.branch])}</span>
      <h2>${esc(n.title)}</h2>
      <div class="tag">${esc(n.tag)}</div>
      <div class="explain">${esc(n.explain)}</div>
      <div class="actions">
        <button class="chalk-btn mark" style="${mastered ? `border-color:${color};color:${color}` : ''}">${mastered ? 'PAINTED — unmark' : 'MARK MASTERED'}</button>
        <button class="chalk-btn path">SHOW PATH</button>
      </div>
      ${problems ? `<div class="problems"><h3>try it</h3>${problems}</div>` : ''}
    `
    this.wireClose()
    this.el.querySelector('.mark')?.addEventListener('click', () => {
      this.deps.onMark(id)
      this.showTopic(id) // refresh button state
    })
    this.el.querySelector('.path')?.addEventListener('click', () => this.deps.onShowPath(id))
    this.el.querySelectorAll('button.reveal').forEach(b => {
      b.addEventListener('click', () => {
        const i = (b as HTMLElement).dataset.i
        this.el.querySelector(`.a[data-i="${i}"]`)?.classList.remove('veiled')
        ;(b as HTMLElement).style.display = 'none'
      })
    })
    this.open()
  }

  showPerson(id: string): void {
    const p = this.deps.getPerson(id)
    if (!p) return
    this.stopScene()
    const chips = p.near
      .map(tid => this.deps.getNode(tid))
      .filter((t): t is TopicNode => !!t)
      .map(t => `<span class="topic-chip" data-id="${t.id}">${esc(t.title)}</span>`)
      .join('')
    this.el.innerHTML = `
      ${this.header()}
      <span class="branch-chip" style="color:#ffd166;border-color:#ffd166">mathematician</span>
      <h2>${esc(p.name)}</h2>
      <div class="person-years">${esc(p.years)}</div>
      <div class="explain">${esc(p.legend)}</div>
      <div class="glyph">${esc(p.glyph)}</div>
      ${chips ? `<div class="linked"><h3>their web</h3><div class="chips">${chips}</div></div>` : ''}
    `
    this.wireClose()
    this.el.querySelectorAll('.topic-chip').forEach(c => {
      c.addEventListener('click', () => this.deps.onJump((c as HTMLElement).dataset.id!))
    })
    this.open()
  }

  showEdge(aId: string, bId: string): void {
    const a = this.deps.getNode(aId)
    const b = this.deps.getNode(bId)
    if (!a || !b) return
    this.stopScene()
    // direction: a should be the prerequisite (lower tier)
    const [from, to] = a.tier <= b.tier ? [a, b] : [b, a]
    const why = to.why?.[from.id] ?? from.why?.[to.id]
      ?? `${to.title} stands on ${from.title} — master the first and the second opens.`
    this.el.innerHTML = `
      ${this.header()}
      <span class="branch-chip" style="color:#ffd166;border-color:#ffd166">why they connect</span>
      <h2 style="font-size:30px">${esc(from.title)} → ${esc(to.title)}</h2>
      <div class="mini-wrap"><canvas class="mini"></canvas></div>
      <div class="explain">${esc(why)}</div>
    `
    this.wireClose()
    const canvas = this.el.querySelector('canvas.mini') as HTMLCanvasElement
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const w = canvas.clientWidth || 300, h = 170
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')!
    const scene: SceneFn = getScene(edgeKey(from.id, to.id))
      ?? genericScene(from.title, to.title, this.deps.colors[from.branch], this.deps.colors[to.branch])
    const t0 = performance.now()
    const loop = (): void => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      scene(ctx, (performance.now() - t0) / 1000, w, h)
      this.raf = requestAnimationFrame(loop)
    }
    loop()
    this.open()
  }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
