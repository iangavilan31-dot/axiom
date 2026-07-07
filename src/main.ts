import './styles.css'
import { BRANCH_COLORS, BRANCH_NAMES, NODES, NODE_MAP, PEOPLE, PEOPLE_MAP } from './data'
import { edgeKey, type EdgeKey } from './data/types'
import { layoutWeb } from './engine/layout'
import { Camera } from './engine/camera'
import { Renderer, type RenderCtx } from './engine/renderer'
import { Effects } from './engine/effects'
import { InputController } from './engine/input'
import { Progress } from './state/progress'
import { Panel } from './ui/panel'
import { Timeline } from './ui/timeline'
import { chime, initAudio, thump, tick } from './engine/audio'

const $ = <T extends HTMLElement = HTMLElement>(sel: string): T => document.querySelector(sel) as T

const layout = layoutWeb(NODES, PEOPLE, BRANCH_NAMES)
const canvas = $('#board') as unknown as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
const camera = new Camera(window.innerWidth, window.innerHeight)
const effects = new Effects()
const renderer = new Renderer(canvas, ctx2d, layout, BRANCH_COLORS, camera, effects)
const progress = new Progress()

const rc: RenderCtx = {
  mode: 'web',
  mastered: progress.mastered,
  hovered: null,
  selected: null,
  selectedEdge: null,
  pathActive: false,
  pathNodes: new Set(),
  pathEdges: new Set(),
  timelineYear: 2026,
  introT: -1,
}

// ---------- helpers ----------

const topicCount = NODES.length

function fitZoom(): number {
  const b = layout.bounds
  const w = b.maxX - b.minX, h = b.maxY - b.minY
  return Math.min(camera.viewW / w, camera.viewH / h) * 0.94
}

function updateLitCount(): void {
  $('#lit-count').innerHTML = `<b>${progress.mastered.size}</b> / ${topicCount} lit`
}

function clearPath(): void {
  rc.pathActive = false
  rc.pathNodes.clear()
  rc.pathEdges.clear()
}

function clearSelection(): void {
  rc.selected = null
  rc.selectedEdge = null
  panel.hide()
}

// ---------- panel ----------

const panel = new Panel($('#panel'), {
  getNode: id => NODE_MAP.get(id),
  getPerson: id => PEOPLE_MAP.get(id),
  colors: BRANCH_COLORS,
  branchNames: BRANCH_NAMES,
  isMastered: id => progress.has(id),
  onMark(id) {
    const now = progress.toggle(id)
    updateLitCount()
    const l = layout.nodes.get(id)
    if (l) {
      const color = BRANCH_COLORS[l.node.branch]
      if (now) {
        effects.addBloom(l.x, l.y, color)
        for (const e of layout.edgesByNode.get(id) ?? []) effects.addPulse(e, id, color)
        chime(true)
      } else {
        effects.burst(l.x, l.y, '#e9e4d4', 8)
        chime(false)
      }
    }
  },
  onShowPath(id) { showPath(id) },
  onJump(id) { selectNode(id, true) },
  onClose() { rc.selected = null; rc.selectedEdge = null },
})

// ---------- show me the path ----------

function showPath(targetId: string): void {
  clearPath()
  const need = new Set<string>()
  const frontier: string[] = [targetId]
  while (frontier.length) {
    const id = frontier.pop()!
    if (need.has(id)) continue
    need.add(id)
    if (progress.has(id)) continue // mastered nodes anchor the path; don't expand past them
    const n = NODE_MAP.get(id)
    for (const p of n?.prereqs ?? []) frontier.push(p)
  }
  rc.pathNodes = need
  rc.pathEdges = new Set(
    layout.edges.filter(e => need.has(e.a) && need.has(e.b)).map(e => e.key),
  )
  rc.pathActive = true
  panel.hide()
  rc.selected = targetId
  // fly out to fit the whole path
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const id of need) {
    const l = layout.nodes.get(id)
    if (!l) continue
    minX = Math.min(minX, l.x); maxX = Math.max(maxX, l.x)
    minY = Math.min(minY, l.y); maxY = Math.max(maxY, l.y)
  }
  if (minX < Infinity) {
    const z = Math.min(2, Math.min(camera.viewW / (maxX - minX + 500), camera.viewH / (maxY - minY + 500)))
    camera.flyTo((minX + maxX) / 2, (minY + maxY) / 2, z, 1.1)
  }
  thump()
}

// ---------- selection ----------

function selectNode(id: string, fly = false): void {
  clearPath()
  rc.selected = id
  rc.selectedEdge = null
  panel.showTopic(id)
  thump()
  const l = layout.nodes.get(id)
  if (l && (fly || camera.z < 0.4)) camera.flyTo(l.x, l.y, Math.max(camera.z, 0.85), 0.9)
}

// ---------- input ----------

new InputController(canvas, camera, layout, {
  onNodeClick(id) { selectNode(id) },
  onPersonClick(id) {
    clearPath()
    rc.selected = id
    rc.selectedEdge = null
    panel.showPerson(id)
    thump()
    const p = layout.people.get(id)
    if (p && camera.z < 0.4) camera.flyTo(p.x, p.y, 0.85, 0.9)
  },
  onEdgeClick(key: EdgeKey) {
    clearPath()
    const [a, b] = key.split('|')
    rc.selectedEdge = key
    rc.selected = null
    panel.showEdge(a, b)
    tick()
  },
  onBackgroundClick() {
    if (rc.pathActive) { clearPath(); return }
    clearSelection()
  },
  onHover(id) {
    if (id && id !== rc.hovered) tick()
    rc.hovered = id
  },
  onFirstInteract() { $('#hint').classList.add('fade') },
})

// ---------- tabs ----------

const timeline = new Timeline(
  $('#timebar'), $('#time-track'), $('#time-cursor'), $('#time-year'),
  $('#time-play') as HTMLButtonElement,
  (prevYear, year) => {
    rc.timelineYear = year
    if (year > prevYear && year - prevYear < 120) {
      // bloom the newly-born (skip on big jumps)
      let count = 0
      for (const l of layout.nodes.values()) {
        const y = l.node.year ?? 2000
        if (y > prevYear && y <= year && count < 24) {
          effects.addBloom(l.x, l.y, BRANCH_COLORS[l.node.branch])
          count++
        }
      }
      if (count) tick()
    }
  },
)

function setTab(tab: 'web' | 'time'): void {
  rc.mode = tab
  document.querySelectorAll('#tabs .tab').forEach(b => {
    b.classList.toggle('active', (b as HTMLElement).dataset.tab === tab)
  })
  timeline.setVisible(tab === 'time')
  if (tab === 'time') {
    clearSelection()
    clearPath()
    rc.timelineYear = timeline.year
  } else {
    rc.timelineYear = 2026
  }
}
document.querySelectorAll('#tabs .tab').forEach(b => {
  b.addEventListener('click', () => setTab((b as HTMLElement).dataset.tab as 'web' | 'time'))
})

// ---------- find ----------

const findBox = $('#find-box')
const findInput = $('#find-input') as HTMLInputElement
const findResults = $('#find-results')

function toggleFind(show?: boolean): void {
  const on = show ?? findBox.classList.contains('hidden')
  findBox.classList.toggle('hidden', !on)
  if (on) { findInput.value = ''; renderFind(''); findInput.focus() }
}
$('#find-btn').addEventListener('click', () => toggleFind())

function renderFind(q: string): void {
  const ql = q.trim().toLowerCase()
  const rows: { id: string; title: string; color: string; person?: boolean }[] = []
  for (const n of NODES) {
    if (!ql || n.title.toLowerCase().includes(ql)) rows.push({ id: n.id, title: n.title, color: BRANCH_COLORS[n.branch] })
    if (rows.length >= 14) break
  }
  if (rows.length < 14) {
    for (const p of PEOPLE) {
      if (ql && p.name.toLowerCase().includes(ql)) rows.push({ id: p.id, title: p.name, color: '#ffd166', person: true })
      if (rows.length >= 14) break
    }
  }
  findResults.innerHTML = rows
    .map(r => `<div class="find-row" data-id="${r.id}" data-person="${r.person ? 1 : 0}"><span class="dot" style="background:${r.color}"></span>${r.title}</div>`)
    .join('')
  findResults.querySelectorAll('.find-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = (row as HTMLElement).dataset.id!
      const isPerson = (row as HTMLElement).dataset.person === '1'
      toggleFind(false)
      if (isPerson) {
        const p = layout.people.get(id)
        if (p) camera.flyTo(p.x, p.y, 0.9, 1.1)
        rc.selected = id
        panel.showPerson(id)
      } else {
        const l = layout.nodes.get(id)
        if (l) camera.flyTo(l.x, l.y, 0.9, 1.1)
        rc.selected = id
        panel.showTopic(id)
      }
    })
  })
}
findInput.addEventListener('input', () => renderFind(findInput.value))

// ---------- keyboard ----------

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!findBox.classList.contains('hidden')) { toggleFind(false); return }
    if (rc.pathActive) { clearPath(); return }
    clearSelection()
  }
  if (e.key === '/' && document.activeElement !== findInput) {
    e.preventDefault()
    toggleFind(true)
  }
})

// ---------- intro ----------

let introStart = -1
$('#enter-btn').addEventListener('click', () => {
  initAudio()
  thump()
  $('#intro').classList.add('fading')
  setTimeout(() => $('#intro').classList.add('hidden'), 1100)
  introStart = performance.now()
  const fz = fitZoom()
  camera.x = 0; camera.y = 0; camera.z = fz * 2.1
  camera.flyTo(0, 0, fz, 4.2)
})

// ---------- loop ----------

window.addEventListener('resize', () => renderer.resize())
updateLitCount()

let last = performance.now()
function frame(now: number): void {
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  if (introStart >= 0 && rc.introT !== Infinity) {
    rc.introT = (now - introStart) / 1000
    if (rc.introT > 8) rc.introT = Infinity
  }
  camera.update(dt)
  effects.update(dt)
  timeline.update(dt)
  if (rc.mode === 'time') rc.timelineYear = timeline.year
  renderer.render(dt, rc)
  requestAnimationFrame(frame)
}

// wait for the chalk fonts so canvas text renders in Caveat, not Times
document.fonts.ready.then(() => requestAnimationFrame(frame))
