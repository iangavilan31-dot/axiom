import type { TopicNode } from '../types'

// Tier 6-9. Triangles become waves.

export const TRIGONOMETRY: TopicNode[] = [
  {
    id: 'right-triangle-trig', title: 'Right-Triangle Trig', tag: 'SOH CAH TOA', branch: 'trigonometry', tier: 6, year: -150,
    prereqs: ['triangles', 'similarity'],
    why: { similarity: 'Similar triangles make the ratios depend only on the ANGLE — so sin 30° means one thing forever. Trig is similarity, tabulated.' },
    explain: 'Hipparchus built the first trig table to track the heavens. Sine, cosine, tangent: three ratios that turn one measured angle into every unmeasurable distance — mountain heights, star positions, wall angles.',
    problems: [
      { q: 'sin 30° = ?', a: '1/2' },
      { q: 'A 20 ft ladder leans at 60°. Height reached?', a: '20·sin 60° ≈ 17.3 ft' },
    ],
  },
  {
    id: 'triangulation', title: 'Triangulation', tag: 'measuring the unreachable', branch: 'trigonometry', tier: 7, year: 1615,
    prereqs: ['right-triangle-trig'],
    explain: 'Measure one baseline and two angles, and a distant point is pinned exactly. Snellius surveyed a whole country this way; GPS satellites still triangulate you the same way today.',
    problems: [
      { q: 'GPS needs signals from at least how many satellites (2D idea → 3D)?', a: '4 (3 spheres + clock fix)' },
      { q: 'What two things does a surveyor measure?', a: 'A baseline and angles' },
    ],
  },
  {
    id: 'law-of-sines', title: 'Law of Sines', tag: 'any triangle, not just right ones', branch: 'trigonometry', tier: 7, year: 1000,
    prereqs: ['right-triangle-trig'],
    explain: 'a/sin A = b/sin B = c/sin C — every side over its opposite angle gives the same number (the circumcircle’s diameter). Trig escapes the right angle.',
    problems: [
      { q: 'A = 30°, a = 5, B = 90°. Find b.', a: '10' },
      { q: 'The common ratio a/sin A equals…?', a: 'The circumscribed circle’s diameter' },
    ],
  },
  {
    id: 'law-of-cosines', title: 'Law of Cosines', tag: 'Pythagoras, with a correction term', branch: 'trigonometry', tier: 7, year: 1579,
    prereqs: ['right-triangle-trig', 'pythagorean-theorem'],
    why: { 'pythagorean-theorem': 'c² = a² + b² − 2ab·cos C. Set C = 90° and the correction vanishes — Pythagoras is the special case.' },
    explain: 'The Pythagorean theorem, generalized to every triangle. That −2ab·cos C term measures how far from "right" the angle is — and it secretly becomes the dot product in linear algebra.',
    problems: [
      { q: 'a=5, b=7, C=60°. Find c.', a: '√39 ≈ 6.24' },
      { q: 'When does the law of cosines reduce to Pythagoras?', a: 'When C = 90°' },
    ],
  },
  {
    id: 'angles-radians', title: 'Radians', tag: 'the circle’s own angle unit', branch: 'trigonometry', tier: 7, year: 1714,
    prereqs: ['circles', 'pi'],
    why: { pi: 'A radian is "one radius of arc". A full turn is 2π radians because the circumference is 2π radii — π stops being trivia and becomes the unit.' },
    explain: 'Degrees are Babylonian bureaucracy; radians are nature’s choice. Only in radians does sin x ≈ x for small angles — the identity calculus cannot live without.',
    problems: [
      { q: '180° in radians?', a: 'π' },
      { q: 'Arc length for angle 2 rad, radius 3?', a: '6' },
    ],
  },
  {
    id: 'unit-circle', title: 'The Unit Circle', tag: 'all of trig in one picture', branch: 'trigonometry', tier: 7, year: 1650,
    prereqs: ['right-triangle-trig', 'coordinate-plane', 'angles-radians'],
    why: {
      'right-triangle-trig': 'Put the triangle inside a radius-1 circle and the hypotenuse becomes 1: cosine and sine are just the x and y of the moving point.',
      'coordinate-plane': 'The circle x² + y² = 1 gives every angle a coordinate address — trig becomes geometry you can read off axes.',
    },
    explain: 'One circle of radius 1 replaces every trig table. Angles beyond 90°, negative angles, why sine repeats — all become visible at a glance. The single best picture in precalculus.',
    problems: [
      { q: 'Coordinates at angle π/2?', a: '(0, 1)' },
      { q: 'cos 180° = ?', a: '−1' },
    ],
  },
  {
    id: 'trig-graphs', title: 'Trig Graphs', tag: 'the shape of a wave', branch: 'trigonometry', tier: 8, year: 1748,
    prereqs: ['unit-circle', 'functions'],
    why: { 'unit-circle': 'Unroll the circling point’s height over time and you get the sine wave — circular motion and wave motion are the same thing seen from different chairs.' },
    explain: 'Sound, light, tides, alternating current, your heartbeat monitor: everything that oscillates draws this curve. Fourier will later prove that EVERY signal is built from these waves.',
    problems: [
      { q: 'Period of y = sin(2x)?', a: 'π' },
      { q: 'Amplitude of y = 3cos x?', a: '3' },
    ],
  },
  {
    id: 'trig-identities', title: 'Trig Identities', tag: 'sin² + cos² = 1, and friends', branch: 'trigonometry', tier: 8, year: 150,
    prereqs: ['unit-circle', 'pythagorean-theorem'],
    why: { 'pythagorean-theorem': 'sin²θ + cos²θ = 1 IS Pythagoras on the unit circle: legs sin and cos, hypotenuse 1. The oldest theorem on the board, wearing new clothes.' },
    explain: 'Equalities true for every angle — the algebra of waves. They collapse monstrous expressions into clean ones and power every integral of a trig function upstairs.',
    problems: [
      { q: 'If sin θ = 3/5 (acute), cos θ = ?', a: '4/5' },
      { q: 'Simplify tan θ · cos θ.', a: 'sin θ' },
    ],
  },
  {
    id: 'sum-angle-formulas', title: 'Angle-Sum Formulas', tag: 'sin(a+b), unlocked', branch: 'trigonometry', tier: 8, year: 150,
    prereqs: ['trig-identities'],
    explain: 'Ptolemy derived them to build finer star tables. sin(a+b) = sin a cos b + cos a sin b — the formula behind double angles, half angles, and (secretly) the rotation matrices of computer graphics.',
    problems: [
      { q: 'Use the formula: sin 90° from 30° + 60°.', a: '(1/2)(1/2) + (√3/2)(√3/2) = 1' },
      { q: 'cos(2θ) in terms of cos²θ?', a: '2cos²θ − 1' },
    ],
  },
  {
    id: 'inverse-trig', title: 'Inverse Trig', tag: 'from ratio back to angle', branch: 'trigonometry', tier: 8, year: 1729,
    prereqs: ['trig-graphs', 'inverse-functions'],
    why: { 'inverse-functions': 'arcsin runs the sine machine backwards: given the ratio 0.5, recover the angle 30°. Same mirror-across-y=x move as every inverse.' },
    explain: 'The functions that answer "what angle did this?" Robots, game cameras, and your phone’s tilt sensor call arctan thousands of times a second.',
    problems: [
      { q: 'arctan 1 = ? (in degrees)', a: '45°' },
      { q: 'arcsin(sin 150°) = ?', a: '30° (range restriction!)' },
    ],
  },
  {
    id: 'polar-coordinates', title: 'Polar Coordinates', tag: 'address by angle and distance', branch: 'trigonometry', tier: 8, year: 1691,
    prereqs: ['unit-circle', 'angles-radians'],
    explain: 'Instead of (x, y), give a direction and a distance — like a radar operator. Spirals, rose curves, and orbital mechanics become one-line equations here.',
    problems: [
      { q: 'Convert (r=2, θ=π/2) to (x, y).', a: '(0, 2)' },
      { q: 'What does r = θ draw?', a: 'A spiral (Archimedean)' },
    ],
  },
  {
    id: 'parametric-equations', title: 'Parametric Equations', tag: 'curves with a clock inside', branch: 'trigonometry', tier: 9, year: 1700,
    prereqs: ['polar-coordinates', 'functions'],
    explain: 'Let x and y each depend on time t and curves gain motion: a thrown ball, a spirograph, a planet. Every video game object’s path is parametric.',
    problems: [
      { q: 'x = cos t, y = sin t traces…?', a: 'The unit circle' },
      { q: 'x = t, y = t² traces…?', a: 'The parabola y = x²' },
    ],
  },
  {
    id: 'hyperbolic-functions', title: 'Hyperbolic Functions', tag: 'trig’s shadow twins', branch: 'trigonometry', tier: 9, year: 1760,
    prereqs: ['trig-graphs', 'exponential-functions'],
    why: { 'exponential-functions': 'sinh and cosh are built from eˣ: cosh x = (eˣ + e⁻ˣ)/2. Trig run on the exponential engine instead of the circle.' },
    explain: 'Swap the circle for a hyperbola and sine becomes sinh. A hanging chain droops in exactly cosh — the catenary — and special relativity measures spacetime "angles" in hyperbolic units.',
    problems: [
      { q: 'cosh² x − sinh² x = ?', a: '1' },
      { q: 'What real object hangs in a cosh curve?', a: 'A chain/cable (catenary)' },
    ],
  },
]
