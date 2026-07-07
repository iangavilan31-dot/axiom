# AXIOM — session boot file
*Read this first after any /clear. Keep it current.*

- **What this is:** the math universe on a blackboard — a flyable chalk spider-web where all of math visibly connects. Full spec + goal-lock: `BRIEF.md` (the GOAL wins over everything).
- **Run:** `npm run dev` → http://localhost:5127 (strict port). Build: `npm run build` → single self-contained `dist/index.html` that opens by double-click (file://).
- **Vault page:** `ObsidianPKM\entities\axiom.md`
- **QA rig:** `node scripts/shoot.mjs <name> "<steps>"` (visible Playwright, real pixel clicks). Disk-open check: `node scripts/diskcheck.mjs`.

## Status — Built v1 (2026-07-07)
All 12 build tasks done. Blind critics **88/100** (`docs/GRADES.md`), clears the 85 gate.
- 335 topic nodes across 14 branches (counting → research frontier) + 70 mathematician medallions, ~700 practice problems, real prerequisite edges.
- 5 signature features all real-click verified: self-mark ignite + colour-spread + localStorage; edge-click "why they connect" chalk animations (bespoke + generic); show-me-the-path glowing prereq chain; mathematician medallions with gold threads; scrubbable history-timeline tab.
- Dive-in hero intro, ambient chalk dust, procedural audio. Single-file offline build verified opening from disk with zero errors.

## SAT MATH mode (added same session, 2026-07-07)
Engagement-optimized SAT prep, research-grounded (`docs/ENGAGEMENT.md`). A **SAT tab** takes over: solve real SAT problems (retrieval practice) to light a **28-skill graph** across the 4 College Board domains; **score-ring projects toward 800**; streak flame + XP + self-set daily goal; misses feed a **spaced-repetition review queue**; **Mixed Module** = interleaved test-like set. Celebrations on skill/domain clear + "800 READY". All localStorage-persisted. Real-click verified end-to-end.
- Lives in `src/sat/`: `data.ts` (28 skills / 66 problems, MC + grid-in, lenient matching), `state.ts` (mastery/streak/xp/daily/review persistence), `sat.ts` (controller: HUD + SVG chalk skill-map + practice engine + celebrations), `sat.css`.
- Wiring: floating nav (`#tabs`, z-48) always clickable above the SAT screen; `body.sat-active` hides web chrome; main loop pauses the canvas render while SAT is active.

## Architecture (where things live)
- `src/engine/` — chalk.ts (stroke primitives), camera.ts, layout.ts (radial web), renderer.ts, input.ts (hit-testing), effects.ts (blooms/dust), audio.ts
- `src/data/branches/*.ts` — one file per branch; `data/people.ts`; `data/index.ts` aggregates + dev-validates prereqs
- `src/ui/` — panel.ts, scenes.ts (bespoke edge animations), timeline.ts
- `src/main.ts` — wiring, tabs, find, intro, loop

## Next (post-ship follow-ups, from GRADES.md — none blocking)
1. Upgrade the generic edge-scene fallback (particle-along-arrow + branch-coloured tags).
2. Optional branch colour legend (toggle, respects no-text rule).
3. Label de-collision at mid-zoom.
4. "Start here" nudge on first load.

## Decisions
- Blackboard universe look (Ian-picked; banned list holds — no neon cyan/scanlines/mono microtype). Verified clean.
- Self-mark mastery, problems never gate (boss-gating declined).
- Single-file build (vite-plugin-singlefile) so the downloadable truly opens from disk.
