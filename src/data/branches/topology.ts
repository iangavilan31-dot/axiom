import type { TopicNode } from '../types'

// Tier 13-16. Rubber-sheet geometry: what survives stretching.

export const TOPOLOGY: TopicNode[] = [
  {
    id: 'euler-characteristic', title: 'Euler’s Formula V−E+F', tag: 'the number shapes can’t hide', branch: 'topology', tier: 13, year: 1758,
    prereqs: ['planar-graphs', 'platonic-solids'],
    why: {
      'platonic-solids': 'Count any polyhedron: vertices − edges + faces = 2. Cube: 8−12+6. Dodecahedron: 20−30+12. Always 2 — the first number in history that ignores all geometry and sees only shape.',
      'planar-graphs': 'The same law rules flat networks — Euler’s formula is why K₅ can’t be drawn without crossings.',
    },
    explain: 'The founding fossil of topology: a quantity untouched by bending, stretching, or denting. A donut scores 0, a two-holed pretzel −2 — the number counts holes before "hole" was defined.',
    problems: [
      { q: 'Soccer ball: 60 vertices, 90 edges. Faces?', a: '32' },
      { q: 'Euler characteristic of a torus?', a: '0' },
    ],
  },
  {
    id: 'mobius-strip', title: 'Möbius Strip', tag: 'the one-sided world', branch: 'topology', tier: 13, year: 1858,
    prereqs: ['solid-geometry', 'transformations'],
    explain: 'Half-twist a paper band and glue: one side, one edge. An ant walks "both" faces without crossing a rim; cut it down the middle and it stays in one piece. Conveyor belts use it to wear evenly.',
    problems: [
      { q: 'Cut a Möbius strip along its center line — result?', a: 'One longer two-sided loop' },
      { q: 'How many sides does it have?', a: 'One' },
    ],
  },
  {
    id: 'klein-bottle', title: 'Klein Bottle', tag: 'no inside, no outside', branch: 'topology', tier: 14, year: 1882,
    prereqs: ['mobius-strip'],
    why: { 'mobius-strip': 'Glue two Möbius strips along their single edges: a closed surface with no interior at all. It cannot exist in 3D without passing through itself — it lives natively in four dimensions.' },
    explain: 'A bottle whose neck plunges "through" the glass to join the base from inside. Fill it with water and the water is already outside. Topology’s favorite impossible souvenir.',
    problems: [
      { q: 'Does a Klein bottle hold liquid?', a: 'No — no inside exists' },
      { q: 'Minimum dimensions to embed it without self-crossing?', a: '4' },
    ],
  },
  {
    id: 'point-set-topology', title: 'Point-Set Topology', tag: 'space, reduced to open sets', branch: 'topology', tier: 13, year: 1914,
    prereqs: ['metric-spaces', 'sets'],
    why: { 'metric-spaces': 'Hausdorff noticed convergence and continuity never used distance itself — only "neighborhoods". Keep the open sets, discard the ruler: geometry with no numbers left.' },
    explain: 'The minimal definition of "space": a set plus its family of open sets. Astonishingly, that skeleton supports continuity, limits, and connectedness — the operating system every other geometry runs on.',
    problems: [
      { q: 'The two sets open in EVERY topology?', a: '∅ and the whole space' },
      { q: 'What did topology throw away that geometry kept?', a: 'Distance (and angle)' },
    ],
  },
  {
    id: 'continuity-topological', title: 'Topological Continuity', tag: 'no tearing — that’s all', branch: 'topology', tier: 14, year: 1914,
    prereqs: ['point-set-topology', 'epsilon-delta'],
    why: { 'epsilon-delta': 'The ε-δ definition, translated once more: preimages of open sets are open. Shorter than Weierstrass’ version — and it works in spaces with no numbers at all.' },
    explain: 'Continuity stripped to its soul: nearby stays nearby. This is the final form of a concept that began with "don’t lift the chalk".',
    problems: [
      { q: 'The one-line topological definition of continuous?', a: 'Preimages of open sets are open' },
      { q: 'Is tearing a sheet continuous?', a: 'No — neighbors separate' },
    ],
  },
  {
    id: 'compactness', title: 'Compactness', tag: 'infinity that acts finite', branch: 'topology', tier: 14, year: 1906,
    prereqs: ['point-set-topology', 'bolzano-weierstrass'],
    why: { 'bolzano-weierstrass': 'Bounded-and-closed forced sequences to cluster; compactness is that miracle bottled as an axiom: every open cover has a finite subcover. Infinite situations, finite control.' },
    explain: 'The most load-bearing adjective in analysis: on compact spaces, continuous functions achieve maxima, sequences cluster, and proofs that need "finitely many" get their wish.',
    problems: [
      { q: 'Is [0, 1] compact? Is (0, 1)?', a: 'Yes; no' },
      { q: 'Continuous function on a compact set attains its…?', a: 'Maximum and minimum' },
    ],
  },
  {
    id: 'connectedness', title: 'Connectedness', tag: 'one piece or several?', branch: 'topology', tier: 14, year: 1911,
    prereqs: ['point-set-topology'],
    explain: 'Can the space be split into two separated open chunks? The formal answer to "is it one piece" — and the property that powers every intermediate-value argument.',
    problems: [
      { q: 'Is ℝ minus one point connected?', a: 'No — two rays' },
      { q: 'Is the plane minus one point connected?', a: 'Yes — walk around it' },
    ],
  },
  {
    id: 'homeomorphism', title: 'Homeomorphism', tag: 'coffee cup = donut', branch: 'topology', tier: 14, year: 1895,
    prereqs: ['continuity-topological'],
    why: { 'continuity-topological': 'A continuous bijection with continuous inverse: stretch, bend, never tear or glue. Topology’s equals sign — the mug and the torus are literally the same object here.' },
    explain: 'The joke that defines the field: a topologist can’t tell their coffee cup from their donut. Both have exactly one hole; everything else is negotiable.',
    problems: [
      { q: 'Sphere vs cube: homeomorphic?', a: 'Yes — inflate the cube' },
      { q: 'Sphere vs donut?', a: 'No — the hole is invariant' },
    ],
  },
  {
    id: 'knot-theory', title: 'Knot Theory', tag: 'tangled circles, classified', branch: 'topology', tier: 14, year: 1867,
    prereqs: ['homeomorphism'],
    explain: 'Kelvin guessed atoms were knotted ether; the physics died, the mathematics thrived. Telling knots apart needs invariants — polynomial fingerprints — and today knot theory reads knotted DNA and designs molecules.',
    problems: [
      { q: 'The simplest true knot?', a: 'The trefoil' },
      { q: 'Modern lab application?', a: 'Knotted DNA / enzyme action' },
    ],
  },
  {
    id: 'fixed-point-theorems', title: 'Fixed-Point Theorems', tag: 'somewhere, nothing moved', branch: 'topology', tier: 15, year: 1911,
    prereqs: ['compactness', 'continuity-topological'],
    explain: 'Stir your coffee: some point ends exactly where it began. Crumple a map of the city and drop it anywhere in the city: one point lies exactly over itself. Brouwer’s theorem — and Nash equilibria in economics are its corollary.',
    problems: [
      { q: 'Crumpled-map fact: which theorem?', a: 'Brouwer fixed-point' },
      { q: 'Which Nobel-winning concept leans on fixed points?', a: 'Nash equilibrium' },
    ],
  },
  {
    id: 'hairy-ball-theorem', title: 'Hairy Ball Theorem', tag: 'you can’t comb a coconut', branch: 'topology', tier: 15, year: 1912,
    prereqs: ['fixed-point-theorems'],
    explain: 'No smooth nonvanishing field of tangent hairs exists on a sphere — some hair must stand up. Real corollary: at every moment, somewhere on Earth the horizontal wind is exactly zero.',
    problems: [
      { q: 'Can you comb a hairy TORUS flat?', a: 'Yes — Euler characteristic 0' },
      { q: 'Weather corollary?', a: 'A point of zero horizontal wind always exists' },
    ],
  },
  {
    id: 'fundamental-group', title: 'The Fundamental Group', tag: 'loops remember holes', branch: 'topology', tier: 15, year: 1895,
    prereqs: ['homeomorphism', 'groups'],
    why: { groups: 'Loops from a base point multiply (walk one, then the other) and invert (walk backwards) — a GROUP. Poincaré welded algebra to shape, and algebraic topology was born.' },
    explain: 'Loops that can shrink to a point are trivial; loops trapped around holes are not. The group of loop-classes hears the space’s holes — algebra as a hole-detector.',
    problems: [
      { q: 'Fundamental group of the sphere?', a: 'Trivial — every loop shrinks' },
      { q: 'Of the circle?', a: 'ℤ — winding number' },
    ],
  },
  {
    id: 'homology', title: 'Homology', tag: 'counting holes in every dimension', branch: 'topology', tier: 16, year: 1895,
    prereqs: ['fundamental-group', 'euler-characteristic'],
    why: { 'euler-characteristic': 'V−E+F was the shadow: homology counts d-dimensional holes for every d, and their alternating sum recovers Euler’s number exactly. The fossil, explained.' },
    explain: 'Loops catch 1D holes; homology catches them all — tunnels, cavities, voids — with linear algebra doing the counting. Now applied to data clouds: the shape of datasets, computed.',
    problems: [
      { q: 'The torus has how many independent 1D holes?', a: '2' },
      { q: 'Which applied field computes homology of point clouds?', a: 'Topological data analysis' },
    ],
  },
  {
    id: 'classification-of-surfaces', title: 'Classification of Surfaces', tag: 'every surface, catalogued', branch: 'topology', tier: 15, year: 1863,
    prereqs: ['homeomorphism', 'euler-characteristic'],
    explain: 'A complete periodic table of closed surfaces: sphere, torus, two-holed torus, … plus their non-orientable cousins. Count holes, check orientability — done. Topology’s first total victory.',
    problems: [
      { q: 'What single number classifies orientable surfaces?', a: 'The genus (hole count)' },
      { q: 'Is there a complete list of closed surfaces?', a: 'Yes — fully classified' },
    ],
  },
  {
    id: 'manifolds', title: 'Manifolds', tag: 'locally flat, globally wild', branch: 'topology', tier: 15, year: 1854,
    prereqs: ['homeomorphism', 'multivariable-functions'],
    why: { 'multivariable-functions': 'Spaces that look like ordinary ℝⁿ up close — so calculus works locally — while curving globally. Earth looks flat from your street; Riemann asked what "space" itself might look like from ours.' },
    explain: 'Riemann’s 1854 lecture (Gauss chose the topic to test him) invented curved n-dimensional geometry with no ambient space needed. Sixty years later Einstein moved in: spacetime is a 4-manifold.',
    problems: [
      { q: 'Spacetime is a manifold of dimension…?', a: '4' },
      { q: 'A manifold looks like what, locally?', a: 'Flat ℝⁿ' },
    ],
  },
  {
    id: 'poincare-conjecture', title: 'Poincaré Conjecture', tag: 'the million dollars left on the table', branch: 'topology', tier: 16, year: 2003,
    prereqs: ['fundamental-group', 'manifolds'],
    why: {
      'fundamental-group': 'If every loop in a closed 3-manifold shrinks to a point, must it be the 3-sphere? Poincaré asked in 1904; the question consumed a century.',
      manifolds: 'The only Millennium Problem solved: Perelman ran Ricci flow — heat-equation smoothing for the shape of space itself — through the surgeries everyone else feared.',
    },
    explain: 'Grigori Perelman posted the proof online (2002-03), declined the Fields Medal, declined the $1,000,000, and returned to Saint Petersburg. "I’m not interested in money or fame." The theorem — and the refusal — are both legend.',
    problems: [
      { q: 'What tool did Perelman wield?', a: 'Ricci flow (with surgery)' },
      { q: 'What did he do with the prize?', a: 'Declined it — medal and million both' },
    ],
  },
]
