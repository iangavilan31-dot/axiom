// SAT MATH mode — the engagement-optimized campaign built on the research in
// docs/ENGAGEMENT.md. Solve real problems (retrieval) to light the skill graph;
// the score-ring projects toward 800; streak/XP/daily-goal keep you coming back;
// misses feed a spaced-repetition review queue.

import './sat.css'
import { SAT_DOMAINS, SAT_SKILLS, SAT_SKILL_MAP, projectedScore, answerMatches, type SatSkill, type SatProblem } from './data'
import { SatState } from './state'
import { chime, tick, thump } from '../engine/audio'

interface QItem { skillId: string; idx: number }
interface Session { mode: 'skill' | 'review' | 'mixed'; label: string; queue: QItem[]; pos: number; tried: boolean; hits: number }

const VB_W = 1440, VB_H = 1070
const CLUSTER: Record<string, { cx: number; cy: number; r: number }> = {
  algebra: { cx: 350, cy: 300, r: 175 },
  advanced: { cx: 1090, cy: 300, r: 205 },
  data: { cx: 350, cy: 800, r: 185 },
  geometry: { cx: 1090, cy: 800, r: 175 },
}

export class SatMode {
  private st = new SatState()
  private el!: HTMLElement
  private pos = new Map<string, { x: number; y: number }>()
  private session: Session | null = null

  mount(parent: HTMLElement): void {
    this.computeLayout()
    this.el = document.createElement('div')
    this.el.id = 'sat-screen'
    this.el.className = 'hidden'
    this.el.innerHTML = this.shell()
    parent.appendChild(this.el)
    this.wireStatic()
    this.renderAll()
  }

  show(): void { this.el.classList.remove('hidden'); this.renderAll() }
  hide(): void { this.el.classList.add('hidden'); this.closeModal() }

  // ---------- layout ----------
  private computeLayout(): void {
    for (const d of SAT_DOMAINS) {
      const skills = SAT_SKILLS.filter(s => s.domain === d.id)
      const c = CLUSTER[d.id]
      skills.forEach((s, i) => {
        const a = (i / skills.length) * Math.PI * 2 - Math.PI / 2
        this.pos.set(s.id, { x: c.cx + Math.cos(a) * c.r, y: c.cy + Math.sin(a) * c.r })
      })
    }
  }

  // ---------- shell ----------
  private shell(): string {
    return `
      <div id="sat-hud">
        <div id="sat-title"><h2>SAT MATH</h2><p>solve the graph → 800</p></div>
        <div id="sat-ring">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(233,228,212,.14)" stroke-width="11"/>
            <circle id="ring-arc" cx="64" cy="64" r="54" fill="none" stroke="#ffd166" stroke-width="11"
              stroke-linecap="round" stroke-dasharray="339.29" stroke-dashoffset="339.29"/>
          </svg>
          <div class="score"><b id="ring-score">200</b><span>projected / 800</span></div>
        </div>
        <div id="sat-stats">
          <div class="sat-stat streak"><div class="val" id="stat-streak">🔥 0</div><div class="lbl">day streak</div></div>
          <div class="sat-stat xp"><div class="val" id="stat-xp">0</div><div class="lbl">XP</div></div>
          <div class="sat-stat"><div class="val" id="stat-daily">0/5</div><div class="lbl">today</div></div>
        </div>
      </div>
      <div id="sat-subbar">
        ${SAT_DOMAINS.map(d => `
          <div class="dom-bar" data-dom="${d.id}">
            <div class="top"><span class="n" style="color:${d.color}">${d.name}</span><span class="c" id="bar-c-${d.id}">0/0</span></div>
            <div class="track"><div class="fill" id="bar-f-${d.id}" style="background:${d.color};width:0%"></div></div>
          </div>`).join('')}
        <div id="sat-actions">
          <button class="chalk-btn" id="btn-review">REVIEW <span id="review-n">(0)</span></button>
          <button class="chalk-btn" id="btn-mixed">MIXED MODULE</button>
        </div>
      </div>
      <div id="sat-map-wrap">${this.mapSvg()}</div>`
  }

  private mapSvg(): string {
    const strands: string[] = []
    for (const s of SAT_SKILLS) {
      const a = this.pos.get(s.id)!
      for (const p of s.prereqs ?? []) {
        const b = this.pos.get(p)
        if (b) strands.push(`<line class="strand" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="rgba(233,228,212,.22)" stroke-width="2" filter="url(#chalkf)"/>`)
      }
    }
    const labels = SAT_DOMAINS.map(d => {
      const c = CLUSTER[d.id]
      return `<text class="dom-label" x="${c.cx}" y="${c.cy + 5}" font-size="23" fill="${d.color}">${d.name.toUpperCase()}</text>`
    }).join('')
    const nodes = SAT_SKILLS.map(s => this.nodeSvg(s)).join('')
    return `<svg id="sat-map" viewBox="0 0 ${VB_W} ${VB_H}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="chalkf"><feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="7" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5"/></filter>
      </defs>
      ${strands.join('')}
      ${labels}
      ${nodes}
    </svg>`
  }

  private nodeSvg(s: SatSkill): string {
    const p = this.pos.get(s.id)!
    const dom = SAT_DOMAINS.find(d => d.id === s.domain)!
    const lines = this.wrapTitle(s.title)
    const tspans = lines.map((ln, i) => `<tspan x="${p.x}" dy="${i === 0 ? 0 : 18}">${esc(ln)}</tspan>`).join('')
    const labelY = p.y + 44
    return `<g class="skill-node" data-id="${s.id}" transform="translate(0,0)">
      <circle class="glow" cx="${p.x}" cy="${p.y}" r="42" fill="${dom.color}" opacity="0" style="filter:blur(9px)"/>
      <circle class="ring" cx="${p.x}" cy="${p.y}" r="30" fill="#13201a" stroke="${dom.color}" stroke-width="2.5" filter="url(#chalkf)"/>
      <text class="prog" x="${p.x}" y="${p.y + 5}" data-role="prog"></text>
      <text x="${p.x}" y="${labelY}">${tspans}</text>
      <circle class="hit" cx="${p.x}" cy="${p.y}" r="46"/>
    </g>`
  }

  private wrapTitle(t: string): string[] {
    const words = t.split(' ')
    if (t.length <= 14 || words.length === 1) return [t]
    const lines: string[] = ['']
    for (const w of words) {
      if ((lines[lines.length - 1] + ' ' + w).trim().length > 15 && lines[lines.length - 1]) lines.push(w)
      else lines[lines.length - 1] = (lines[lines.length - 1] + ' ' + w).trim()
    }
    return lines.slice(0, 2)
  }

  // ---------- static wiring ----------
  private wireStatic(): void {
    this.el.querySelectorAll('.skill-node').forEach(n => {
      n.addEventListener('click', () => { tick(); this.openSkill((n as HTMLElement).dataset.id!) })
    })
    this.el.querySelector('#btn-review')!.addEventListener('click', () => this.startReview())
    this.el.querySelector('#btn-mixed')!.addEventListener('click', () => this.startMixed())
  }

  // ---------- render state ----------
  private renderAll(): void {
    const score = projectedScore(this.st.masteredCount)
    const C = 2 * Math.PI * 54
    const frac = (score - 200) / 600
    const arc = this.el.querySelector('#ring-arc') as SVGCircleElement
    arc.style.strokeDashoffset = String(C * (1 - frac))
    ;(this.el.querySelector('#ring-score') as HTMLElement).textContent = String(score)
    ;(this.el.querySelector('#stat-streak') as HTMLElement).textContent = `🔥 ${this.st.streak}`
    ;(this.el.querySelector('#stat-xp') as HTMLElement).textContent = String(this.st.xp)
    ;(this.el.querySelector('#stat-daily') as HTMLElement).textContent = `${this.st.dailyCount}/${this.st.dailyGoal}`
    ;(this.el.querySelector('#review-n') as HTMLElement).textContent = `(${this.st.review.size})`

    for (const d of SAT_DOMAINS) {
      const skills = SAT_SKILLS.filter(s => s.domain === d.id)
      const m = skills.filter(s => this.st.isMastered(s.id)).length
      ;(this.el.querySelector(`#bar-c-${d.id}`) as HTMLElement).textContent = `${m}/${skills.length}`
      ;(this.el.querySelector(`#bar-f-${d.id}`) as HTMLElement).style.width = `${(m / skills.length) * 100}%`
    }

    for (const s of SAT_SKILLS) {
      const g = this.el.querySelector(`.skill-node[data-id="${s.id}"]`)!
      const lit = this.st.isMastered(s.id)
      const inReview = this.st.review.has(s.id)
      const dom = SAT_DOMAINS.find(d => d.id === s.domain)!
      const ring = g.querySelector('.ring') as SVGCircleElement
      const glow = g.querySelector('.glow') as SVGCircleElement
      const prog = g.querySelector('[data-role="prog"]') as SVGTextElement
      glow.setAttribute('opacity', lit ? '0.6' : '0')
      ring.setAttribute('fill', lit ? dom.color : '#13201a')
      ring.setAttribute('stroke', lit ? '#fff' : inReview ? '#ffd166' : dom.color)
      ring.setAttribute('stroke-width', inReview && !lit ? '3.5' : '2.5')
      if (lit) { prog.textContent = '✓'; prog.setAttribute('font-size', '24'); prog.setAttribute('fill', '#182015') }
      else {
        const c = this.st.correctCount(s.id)
        prog.textContent = c > 0 ? `${c}/${s.problems.length}` : ''
        prog.setAttribute('font-size', '13'); prog.setAttribute('fill', 'rgba(233,228,212,.6)')
      }
    }
  }

  // ---------- sessions ----------
  private openSkill(id: string): void {
    const s = SAT_SKILL_MAP.get(id); if (!s) return
    thump()
    this.session = { mode: 'skill', label: s.title, queue: s.problems.map((_, i) => ({ skillId: id, idx: i })), pos: 0, tried: false, hits: 0 }
    this.showModal(); this.renderProblem()
  }

  private startReview(): void {
    if (this.st.review.size === 0) { this.flash('Nothing to review — nice.'); return }
    const q: QItem[] = []
    for (const id of this.st.review) {
      const s = SAT_SKILL_MAP.get(id); if (!s) continue
      const done = this.correctSet(id)
      s.problems.forEach((_, i) => { if (!done.has(i)) q.push({ skillId: id, idx: i }) })
    }
    this.shuffle(q)
    if (!q.length) { this.flash('Nothing to review — nice.'); return }
    thump()
    this.session = { mode: 'review', label: 'Review', queue: q, pos: 0, tried: false, hits: 0 }
    this.showModal(); this.renderProblem()
  }

  private startMixed(): void {
    const all: QItem[] = []
    for (const s of SAT_SKILLS) s.problems.forEach((_, i) => all.push({ skillId: s.id, idx: i }))
    this.shuffle(all)
    thump()
    this.session = { mode: 'mixed', label: 'Mixed Module', queue: all.slice(0, 8), pos: 0, tried: false, hits: 0 }
    this.showModal(); this.renderProblem()
  }

  private correctSet(id: string): Set<number> {
    return (this.st as any).correct.get(id) ?? new Set<number>()
  }

  // ---------- modal ----------
  private showModal(): void {
    let m = document.getElementById('sat-modal')
    if (!m) { m = document.createElement('div'); m.id = 'sat-modal'; document.body.appendChild(m) }
    m.innerHTML = `<div id="sat-card"></div>`
    m.addEventListener('click', e => { if (e.target === m) this.closeModal() })
  }
  private closeModal(): void {
    document.getElementById('sat-modal')?.remove()
    this.session = null
    this.renderAll()
  }

  private renderProblem(): void {
    const ses = this.session; if (!ses) return
    const card = document.getElementById('sat-card'); if (!card) return
    if (ses.pos >= ses.queue.length) { this.finishSession(); return }
    const item = ses.queue[ses.pos]
    const s = SAT_SKILL_MAP.get(item.skillId)!
    const p = s.problems[item.idx]
    const dom = SAT_DOMAINS.find(d => d.id === s.domain)!
    ses.tried = false

    const dots = ses.queue.map((_, i) => `<i class="${i < ses.pos ? 'done' : i === ses.pos ? 'cur' : ''}"></i>`).join('')
    const context = ses.mode === 'skill'
      ? `${ses.pos + 1} of ${ses.queue.length}`
      : `${ses.label} · ${ses.pos + 1} of ${ses.queue.length}`

    card.innerHTML = `
      <div class="head">
        <span class="chip" style="color:${dom.color};border-color:${dom.color}">${esc(s.title)}</span>
        <button class="close" title="close">×</button>
      </div>
      <div class="counter">${context}<span class="dots">${dots}</span></div>
      <div class="q">${esc(p.q)}</div>
      <div id="sat-answer">${this.answerHtml(p)}</div>
      <div id="sat-feedback"></div>`
    card.querySelector('.close')!.addEventListener('click', () => this.closeModal())
    this.wireAnswer(p)
  }

  private answerHtml(p: SatProblem): string {
    if (p.choices) {
      return `<div id="sat-choices">${p.choices.map((c, i) =>
        `<button class="choice" data-k="${'ABCD'[i]}"><span class="k">${'ABCD'[i]}</span><span>${esc(c)}</span></button>`).join('')}</div>`
    }
    return `<div id="sat-grid"><input type="text" autocomplete="off" spellcheck="false" placeholder="your answer…"/><button class="chalk-btn" id="sat-check">CHECK</button></div>`
  }

  private wireAnswer(p: SatProblem): void {
    const card = document.getElementById('sat-card')!
    if (p.choices) {
      card.querySelectorAll('.choice').forEach(b => {
        b.addEventListener('click', () => this.check(p, (b as HTMLElement).dataset.k!))
      })
    } else {
      const input = card.querySelector('#sat-grid input') as HTMLInputElement
      const go = () => this.check(p, input.value)
      card.querySelector('#sat-check')!.addEventListener('click', go)
      input.addEventListener('keydown', e => { if (e.key === 'Enter') go() })
      input.focus()
    }
  }

  private check(p: SatProblem, given: string): void {
    const ses = this.session; if (!ses) return
    const item = ses.queue[ses.pos]
    const correct = p.choices ? given === p.answer : answerMatches(given, p)
    const card = document.getElementById('sat-card')!
    const fb = card.querySelector('#sat-feedback') as HTMLElement

    // lock the inputs
    card.querySelectorAll('.choice').forEach(b => {
      const k = (b as HTMLElement).dataset.k!
      ;(b as HTMLButtonElement).disabled = true
      if (k === p.answer) b.classList.add('correct')
      else if (k === given) b.classList.add('wrong')
    })
    const gridInput = card.querySelector('#sat-grid input') as HTMLInputElement | null
    if (gridInput) { gridInput.disabled = true; const btn = card.querySelector('#sat-check') as HTMLButtonElement; if (btn) btn.disabled = true }

    if (correct) {
      tick()
      const res = this.st.recordCorrect(item.skillId, item.idx, !ses.tried)
      ses.hits++
      chime(true)
      fb.innerHTML = `<div class="verdict good">Correct! +${res.xpGain} XP</div>
        <div class="sol">${esc(p.solution)}</div>
        <div class="btnrow"><button class="chalk-btn" id="sat-next">${ses.pos + 1 >= ses.queue.length ? 'FINISH' : 'NEXT'} →</button></div>`
      card.querySelector('#sat-next')!.addEventListener('click', () => { ses.pos++; this.renderProblem() })
      if (res.mastered) this.onSkillMastered(item.skillId)
      this.renderAll()
    } else {
      chime(false)
      if (!ses.tried) this.st.recordMiss(item.skillId)
      ses.tried = true
      fb.innerHTML = `<div class="verdict bad">Not quite.</div>
        <div class="sol">${esc(p.solution)}</div>
        <div class="btnrow">
          <button class="chalk-btn" id="sat-retry">TRY AGAIN</button>
          <button class="chalk-btn" id="sat-skip">${ses.pos + 1 >= ses.queue.length ? 'FINISH' : 'SKIP'} →</button>
        </div>`
      card.querySelector('#sat-retry')!.addEventListener('click', () => this.renderProblem())
      card.querySelector('#sat-skip')!.addEventListener('click', () => { ses.pos++; this.renderProblem() })
      this.renderAll()
    }
  }

  private finishSession(): void {
    const ses = this.session; if (!ses) return
    const card = document.getElementById('sat-card')
    if (ses.mode === 'mixed' || ses.mode === 'review') {
      if (card) {
        const pct = Math.round((ses.hits / ses.queue.length) * 100)
        card.innerHTML = `<div class="head"><span class="chip" style="color:#ffd166;border-color:#ffd166">${ses.label}</span>
          <button class="close">×</button></div>
          <h3>${ses.hits} / ${ses.queue.length} correct</h3>
          <div class="counter">${pct}% — ${pct >= 80 ? 'test-ready pace.' : pct >= 50 ? 'getting there.' : 'worth another lap.'}</div>
          <div class="btnrow"><button class="chalk-btn" id="sat-done">DONE</button></div>`
        card.querySelector('.close')!.addEventListener('click', () => this.closeModal())
        card.querySelector('#sat-done')!.addEventListener('click', () => this.closeModal())
      }
      if (this.st.dailyMet) this.maybeDailyCheer()
    } else {
      this.closeModal()
    }
    this.renderAll()
    if (this.st.masteredCount === SAT_SKILLS.length) this.cheer('800 READY', 'every skill lit — you can answer anything the test asks')
  }

  // ---------- celebrations ----------
  private onSkillMastered(skillId: string): void {
    const s = SAT_SKILL_MAP.get(skillId)!
    const dom = SAT_DOMAINS.find(d => d.id === s.domain)!
    const domSkills = SAT_SKILLS.filter(x => x.domain === s.domain)
    const domDone = domSkills.every(x => this.st.isMastered(x.id))
    this.confetti(dom.color)
    if (domDone) this.cheer(`${dom.name.toUpperCase()} CLEARED`, 'domain complete — one quarter of the test, owned')
  }

  private maybeDailyCheer(): void { this.confetti('#ffd166') }

  private cheer(big: string, sub: string): void {
    let c = document.getElementById('sat-cheer')
    if (!c) { c = document.createElement('div'); c.id = 'sat-cheer'; document.body.appendChild(c) }
    c.innerHTML = `<div class="banner"><div class="big">${esc(big)}</div><div class="sub">${esc(sub)}</div></div>`
    this.confetti('#ffd166'); chime(true)
    setTimeout(() => c && c.remove(), 2600)
  }

  private confetti(color: string): void {
    const host = document.body
    const cols = [color, '#e9e4d4', '#ffd166']
    for (let i = 0; i < 40; i++) {
      const d = document.createElement('div')
      const size = 5 + Math.random() * 7
      d.style.cssText = `position:fixed;z-index:60;pointer-events:none;width:${size}px;height:${size}px;
        left:${45 + Math.random() * 10}vw;top:40vh;background:${cols[i % 3]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};`
      host.appendChild(d)
      const ang = Math.random() * Math.PI * 2, spd = 120 + Math.random() * 320
      const dx = Math.cos(ang) * spd, dy = Math.sin(ang) * spd - 120
      d.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${dx}px,${dy + 500}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ], { duration: 1100 + Math.random() * 700, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => d.remove()
    }
  }

  private flash(msg: string): void {
    const t = document.createElement('div')
    t.textContent = msg
    t.style.cssText = `position:fixed;left:50%;top:20%;transform:translateX(-50%);z-index:60;
      font-family:'Caveat',cursive;font-size:24px;color:#ffd166;background:rgba(12,20,16,.9);
      border:2px solid rgba(233,228,212,.5);border-radius:200px 12px 180px 12px/12px 180px 12px 200px;padding:6px 22px;`
    document.body.appendChild(t)
    setTimeout(() => t.remove(), 1800)
  }

  private shuffle<T>(a: T[]): void {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] }
  }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
