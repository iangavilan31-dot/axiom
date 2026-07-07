# AXIOM — goal-locked build brief
*Compiled 2026-07-07 via /brief. Ian locked: "Yes — AXIOM, go."*

## 1. GOAL / NON-GOALS / DONE-BAR

**GOAL:** Ian can fly around one beautiful chalk universe where *all of math visibly connects* — studying feels like exploring a game world, not reading a textbook. The spectacle is the point; understanding-by-connection is the payoff.

**NON-GOALS:**
- Not a gated curriculum or LMS — nothing ever locks; problems never gate anything.
- Not an Obsidian vault or note-taking tool.
- Not a text encyclopedia — no walls of text; visuals carry meaning.
- Not deep problem banks in v1 — full skeleton breadth first, starter problems per node only.

**DONE-BAR:** ~400–600 nodes across every branch (counting → research frontier) flyable at smooth framerate; all 5 signature features work via **real clicks** (edge-explains-why, show-me-the-path, mathematician portrait nodes, scrubbable timeline tab, self-mark ignite + localStorage persistence); offline build (`dist/`) opens from disk; 3 blind adversarial critics ≥ **85/100** — no ship under the gate.

> **If any instruction below conflicts with the GOAL, the GOAL wins. Re-read the GOAL before every major decision.**

## 2. Visual identity (Ian-picked; banned list non-negotiable)

**BLACKBOARD UNIVERSE** — Ian explicitly chose this over the house daylight palette, so it supersedes the default house style *for this project only*:
- Deep chalkboard black-green world. Everything hand-drawn in chalk: strands, node diagrams, frames, portraits, UI.
- Unmastered = dusty white/grey chalk. **Mastered = wet vivid color, like fresh paint on the board** — light spreads along the strands.
- Chalk texture everywhere: rough strokes, double-pass lines, dust, smudges, slightly uneven hand-drawn geometry. Nothing vector-crisp.

**BANNED (rejected 3+ times, never re-litigate):** neon cyan holo HUD, scanlines, mono microtype, cursive gold slop, generic "AI-made" template feel.

## 3. Ian's taste
- Visual-first: animation, spectacle, juice. **He hates on-screen text** — a title + one short tag max per surface; let animated chalk carry meaning.
- No emoji. Casual, premium, cinematic. He screenshots things and reacts to them.

## 4. Autonomy contract
Work continuously. If blocked: mock, scaffold, QA, polish, continue. Never idle, never ask mid-run. Decide everything within the GOAL.

## 5. Self-QA loop
- Screenshot/record your own work repeatedly and **actually look at it**.
- Real clicks only, never `dispatchEvent` (masked an invisible-overlay bug once).
- Canvas/WebGL: capture via a **visible Playwright page**, never the hidden preview tab (frozen rAF gotcha).
- Quality-critical: 3 blind adversarial critics → `docs/GRADES.md`, honest verdict vs the 85 gate. **Do not ship under the gate.**

## 6. Session durability
- Maintain `SESSION_START.md` at repo root (resume-after-/clear entry point).
- `/project-safe-reset` before context bloats; commit at every working state (use `"C:\Program Files\Git\cmd\git.exe"` or Bash — bare `git` in PowerShell is a broken shim).
- Update PROJECTS.md status + vault entity (`entities/axiom.md`) + auto-memory at milestones.

## 7. Build spec

**Stack:** Vite + vanilla TS + canvas 2D. Port **5127** `--strictPort` (registered). `base: './'` so `npm run build` → `dist/` opens straight from disk (the downloadable).

**The map (main view):**
- One giant spider-web/tree. Root = Counting. ~14 branches fan out radially: arithmetic → algebra, geometry, trigonometry → calculus, linear algebra, probability/statistics, number theory, discrete math, analysis, topology, abstract algebra, logic/foundations, applied/frontier (chaos, information theory, crypto, game theory, ML math…). Research frontier at the outer rim.
- ~400–600 nodes total (~450 topics + ~35 people). Real prerequisite edges. Fly around: pan/zoom with inertia; far out = whole galaxy of chalk; zoomed in = a branch becomes its own neighborhood.
- Performance: offscreen-cached node sprites, viewport culling, smooth on 500+ nodes.

**Node anatomy:** id, title, one-line tag, short chalk explanation (2–4 sentences max), branch, tier, prereq edges, era/year (timeline), 1–3 starter problems with reveal-answer. Click → chalk side panel, minimal text.

**Mastery (self-mark honor system, Ian-picked):** click "mark mastered" → node ignites in wet vivid color with a bloom animation; color bleeds down the connecting strands toward lit neighbors. Progress in localStorage. Problems are practice only — **never gate**.

**The 5 signature features (all in the DONE-BAR):**
1. **Edge explains why** — click a strand → animated chalk explanation of WHY the two topics connect (e.g. division = repeated subtraction, drawn not written).
2. **Show me the path** — click any far node → glowing prerequisite chain drawn from the mastered frontier to it: "here's exactly what you're missing."
3. **Mathematician medallions** — ~35 chalk portrait medallions (Pythagoras, Euclid, Archimedes, Al-Khwarizmi, Fibonacci, Descartes, Fermat, Pascal, Newton, Leibniz, Euler, Gauss, Galois, Riemann, Cantor, Hilbert, Noether, Ramanujan, Gödel, Turing, von Neumann, Shannon, Erdős, Grothendieck, Nash, Tao, Wiles, Perelman… plus philosophers Plato/Aristotle/Pythagoras-as-mystic and **Tesla** — Ian named him) floating near the fields they built, one-line legend each, linked to their topics.
4. **Timeline tab** — scrubbable river of time (~3000 BC → today); drag through history and watch nodes ignite on the web in discovery order; era labels, people markers.
5. **Self-mark ignite + persistence** — the light-spreads-as-you-learn spectacle, saved locally.

**Juice pass:** chalk dust particles, ignite bloom, subtle procedural Web Audio (chalk scratch, soft ignite chime), premium chalk title screen ("AXIOM" + one tag line). No text walls anywhere.

**Explicitly declined by Ian (do not add):** boss-problem gating (offered, he chose self-mark), Obsidian export in v1.
