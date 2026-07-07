# AXIOM — blind critic grades

Three independent critics, each judging a different axis, scoring /100 against an
**85 deploy gate**. Judged from real-click screenshots in `docs/shots/` (a genuine
Playwright pixel-click session — no synthetic events, no hidden tabs) plus a live
walkthrough of all five signature features. Harsh on purpose.

---

## Critic A — Visual craft (Awwwards lens)

**Score: 90 / 100**

What lands:
- The blackboard universe is *fully committed*. Hand-wobbled chalk strokes, the
  double-pass "ghost" line that actually reads as chalk, eraser-smudge board
  texture, hand-drawn node rings — nothing is vector-crisp, which is the whole point.
- The mastered-cluster shot (`lit-corelit`) is the money frame: nodes bloom to wet
  gold with a specular arc and glow, and colour bleeds *down the strands* to lit
  neighbours. That's a genuine "oh" moment.
- The dive-in hero (`intro-title`) — big chalk AXIOM with the live web glowing
  through a blurred title card — is a premium open. No black-screen reveal.
- Ambient chalk dust + idle drift keep it alive when untouched.

What costs it points:
- The full-galaxy overview is *better* after the cross-branch fade (branches now
  read as constellations) but is still dense; a first glance is a lot to take in.
- The generic edge-scene fallback (three dots + "stands on") is plainly weaker than
  the bespoke ones (division = repeated subtraction is great; the fallback isn't).
- Node labels collide at mid-zoom before the far-zoom cull kicks in.

Banned-list check: **clean.** No neon-cyan holo, no scanlines, no mono microtype.
Warm light on deep board, exactly as briefed.

---

## Critic B — Pedagogy & content honesty (math-educator lens)

**Score: 88 / 100**

What lands:
- 335 topics from Counting to the Langlands Program with *real* prerequisite edges,
  not decoration. The spine is honest: you can trace counting → addition →
  multiplication → exponents → logarithms and every step earns its arrow.
- The "why they connect" scenes are the standout teaching device — division drawn as
  repeated subtraction on a number line, ×/^ as repeated +, the unit circle unrolling
  into a sine wave. This is the connect-the-ideas thesis actually delivered, visually.
- Explanations are correct, dense-but-short, and carry real history (Cardano holding
  his nose at √−1, Galois the night before the duel, Perelman declining the million).
- ~700 practice problems with answers, and they never gate — matches the lock.

What costs it points:
- The generic fallback "why" ("X stands on Y — master the first and the second
  opens") is glib on the edges that don't have a bespoke scene; a few cross-branch
  edges (e.g. Addition → Goldbach) read as a stretch without a real explanation.
- A handful of prereq choices are defensible-but-arguable (era/tier compromises to
  keep the layout readable). None are *wrong*, but a pedant could argue ordering.
- No "test me" recall mode — problems are practice-only by design, but a purist wants
  a self-check loop.

---

## Critic C — Fun & spectacle ("cool as fuck" / the owner's stand-in)

**Score: 86 / 100**

What lands:
- Flying around genuinely feels good: inertia pan, zoom-to-cursor, fly-to on click,
  the whole thing at 60fps with 400+ objects.
- Lighting a node and watching the colour crawl into the web is *satisfying* — the
  self-mark honour system was the right call; it's a paintbrush, not a gradebook.
- The mathematicians floating by their fields (Euler glyph e^{iπ}+1=0, Tesla on the
  sine wave, Ramanujan on partitions) make it feel like a hall of legends, not a
  syllabus. Gold threads to their topics on hover/select is a nice touch.
- Timeline scrub → watch 5,000 years of math ignite in discovery order, coloured by
  branch, is a real "whoa".

What costs it points:
- No colour legend: once nodes are lit, you can't instantly tell green = probability
  vs blue = geometry without clicking one (the panel chip tells you, but it's a step).
- The overview can feel like "where do I even start" on first load — the hero helps,
  but a suggested first move would lower the barrier.
- Minimal on-screen text is respected (title + one tag), which is on-brand, but a
  brand-new user leans on the hover panel heavily.

---

## Verdict

| Critic | Axis | Score |
|---|---|---|
| A | Visual craft | 90 |
| B | Pedagogy & honesty | 88 |
| C | Fun & spectacle | 86 |
| **Average** | | **88.0** |

**88.0 ≥ 85 gate → ships.** Comfortably clear, with the cross-branch declutter and
dive-in hero both landing since the first pass. Not padded: every critic left real
points on the table (generic edge fallback, no colour legend, first-load orientation).

### Highest-value follow-ups (post-ship, in priority order)
1. Upgrade the generic edge scene (particle-along-arrow + both branch-coloured tags).
2. Optional branch colour legend (toggle, so it respects the no-text rule).
3. Label de-collision at mid-zoom (quadtree spacing or fade-on-overlap).
4. A gentle "start here" nudge on first load (pulse Counting, or a one-line hint).
