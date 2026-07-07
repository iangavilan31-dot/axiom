import type { TopicNode } from '../types'

// Tier 2-8. Shape enters the board — as old as counting itself.

export const GEOMETRY: TopicNode[] = [
  {
    id: 'points-lines-planes', title: 'Points, Lines & Planes', tag: 'the atoms of shape', branch: 'geometry', tier: 2, year: -600,
    prereqs: ['counting'],
    why: { counting: 'Egyptian rope-stretchers re-measured fields after every Nile flood — counting paces became measuring space. Geometry means "earth-measuring".' },
    explain: 'A point has no size; a line no width; a plane no thickness. Perfect objects that exist only in the mind — and yet they measure the real world better than anything real.',
    problems: [
      { q: 'How many lines pass through two distinct points?', a: 'Exactly one' },
      { q: 'How many points do two non-parallel lines share?', a: 'One' },
    ],
  },
  {
    id: 'angles', title: 'Angles', tag: 'how much things turn', branch: 'geometry', tier: 3, year: -600,
    prereqs: ['points-lines-planes'],
    explain: 'The amount of turn between two rays. Babylonians split the circle into 360 — we still live with their choice every time we say "degrees".',
    problems: [
      { q: 'Angles on a straight line sum to?', a: '180°' },
      { q: 'Two angles are complementary; one is 37°. The other?', a: '53°' },
    ],
  },
  {
    id: 'parallel-lines', title: 'Parallel Lines', tag: 'lines that never meet', branch: 'geometry', tier: 4, year: -300,
    prereqs: ['angles'],
    explain: 'Euclid needed a whole axiom just to say how parallels behave — the famous Fifth Postulate. Mathematicians spent 2,000 years trying to prove it and instead discovered new universes.',
    problems: [
      { q: 'A transversal crosses parallels; one angle is 65°. Its alternate interior partner?', a: '65°' },
      { q: 'Can two distinct parallel lines share a point?', a: 'No — never' },
    ],
  },
  {
    id: 'triangles', title: 'Triangles', tag: 'the strongest shape', branch: 'geometry', tier: 4, year: -600,
    prereqs: ['angles'],
    why: { angles: 'A triangle is three angles handcuffed together — they always split exactly 180° between them, no matter the shape.' },
    explain: 'The simplest polygon and the skeleton key of geometry: every polygon splits into triangles, every structure leans on them, and trigonometry is literally "triangle measuring".',
    problems: [
      { q: 'Two angles are 48° and 71°. The third?', a: '61°' },
      { q: 'Can a triangle have sides 3, 4, 9?', a: 'No — 3 + 4 < 9' },
    ],
  },
  {
    id: 'pythagorean-theorem', title: 'Pythagorean Theorem', tag: 'a² + b² = c²', branch: 'geometry', tier: 5, year: -530,
    prereqs: ['triangles', 'exponents'],
    why: {
      triangles: 'Right triangles hide a perfect law: the squares on the two legs exactly fill the square on the hypotenuse.',
      exponents: 'The theorem literally speaks in squares — areas of actual drawn squares, a² and b² as pictures.',
    },
    explain: 'The most-proved theorem in existence (400+ proofs, one by a US president). It computes every distance you will ever measure — GPS runs on it, and so does the distance formula upstairs.',
    problems: [
      { q: 'Legs 5 and 12. Hypotenuse?', a: '13' },
      { q: 'Is a 6-8-10 triangle right-angled?', a: 'Yes (36+64=100)' },
    ],
  },
  {
    id: 'congruence', title: 'Congruence', tag: 'same shape, same size', branch: 'geometry', tier: 5, year: -300,
    prereqs: ['triangles'],
    explain: 'Two figures that match exactly if you slide, spin, or flip one onto the other. The SSS/SAS/ASA shortcuts prove sameness from just three facts — proof at its most efficient.',
    problems: [
      { q: 'Two triangles share three equal sides. Congruent?', a: 'Yes — SSS' },
      { q: 'Are two triangles with equal angles always congruent?', a: 'No — could be different sizes (similar)' },
    ],
  },
  {
    id: 'similarity', title: 'Similarity', tag: 'same shape, any size', branch: 'geometry', tier: 5, year: -600,
    prereqs: ['triangles', 'ratios'],
    why: { ratios: 'Similar shapes are ratio statements: every length scales by the SAME factor. Thales measured the Great Pyramid with its shadow and this one idea.' },
    explain: 'Zoom a shape without distorting it. Maps, models, shadows, and camera lenses all run on similarity — and it is the secret engine inside trigonometry.',
    problems: [
      { q: 'A 6 ft person casts a 4 ft shadow; a tree casts 30 ft. Tree height?', a: '45 ft' },
      { q: 'Triangles similar with ratio 3: area scales by?', a: '9' },
    ],
  },
  {
    id: 'polygons', title: 'Polygons', tag: 'many-cornered figures', branch: 'geometry', tier: 4, year: -300,
    prereqs: ['angles'],
    explain: 'Closed figures with straight sides. Their interior angles obey one clean law — (n−2)·180° — because every polygon is secretly a fan of triangles.',
    problems: [
      { q: 'Interior angle sum of a hexagon?', a: '720°' },
      { q: 'Each angle of a regular octagon?', a: '135°' },
    ],
  },
  {
    id: 'quadrilaterals', title: 'Quadrilaterals', tag: 'the four-sided family tree', branch: 'geometry', tier: 5, year: -300,
    prereqs: ['polygons'],
    explain: 'Squares inside rectangles inside parallelograms inside trapezoids — a nested family where each definition inherits from the one above. Your first taxonomy of mathematical objects.',
    problems: [
      { q: 'Is every square a rectangle?', a: 'Yes' },
      { q: 'A parallelogram’s diagonals always…?', a: 'Bisect each other' },
    ],
  },
  {
    id: 'perimeter-area', title: 'Perimeter & Area', tag: 'around vs. inside', branch: 'geometry', tier: 4, year: -1800,
    prereqs: ['multiplication', 'polygons'],
    why: { multiplication: 'Area IS multiplication made visible: a 3-by-4 rectangle holds 3 × 4 unit squares. The times table is a geometry fact.' },
    explain: 'The two basic sizes of a flat shape. Babylonian tax collectors computed field areas 4,000 years ago — geometry was bureaucracy before it was philosophy.',
    problems: [
      { q: 'Rectangle 7 × 12: perimeter and area?', a: 'P = 38, A = 84' },
      { q: 'Same perimeter, different areas — possible?', a: 'Yes (e.g. 1×5 vs 3×3)' },
    ],
  },
  {
    id: 'area-formulas', title: 'Area Formulas', tag: 'triangles, circles, trapezoids', branch: 'geometry', tier: 5, year: -250,
    prereqs: ['perimeter-area', 'triangles'],
    explain: 'Every formula is a rearrangement story: a triangle is half a rectangle; a circle unrolls into almost-triangles. Archimedes got πr² by slicing — calculus, 1,900 years early.',
    problems: [
      { q: 'Triangle base 10, height 7. Area?', a: '35' },
      { q: 'Circle radius 3. Area?', a: '9π ≈ 28.3' },
    ],
  },
  {
    id: 'heron-formula', title: 'Heron’s Formula', tag: 'area from sides alone', branch: 'geometry', tier: 6, year: 60,
    prereqs: ['area-formulas', 'square-roots'],
    explain: 'No height needed: feed in the three side lengths and the area appears under a square root. A 2,000-year-old formula that still feels like a magic trick.',
    problems: [
      { q: 'Sides 3, 4, 5: area by Heron?', a: '6 (s=6; √(6·3·2·1))' },
      { q: 'What is s in Heron’s formula?', a: 'Half the perimeter' },
    ],
  },
  {
    id: 'circles', title: 'Circles', tag: 'all points, one distance', branch: 'geometry', tier: 4, year: -1800,
    prereqs: ['points-lines-planes'],
    explain: 'The set of points at a fixed distance from a center — the most symmetric shape possible. Wheels, orbits, ripples: nature keeps choosing it.',
    problems: [
      { q: 'Diameter 14. Radius?', a: '7' },
      { q: 'How many degrees in a full circle?', a: '360°' },
    ],
  },
  {
    id: 'pi', title: 'π', tag: 'the circle’s secret number', branch: 'geometry', tier: 5, year: -250,
    prereqs: ['circles', 'ratios'],
    why: { ratios: 'π is a ratio: every circle’s circumference divided by its diameter — the SAME number for a coin and a galaxy.' },
    explain: 'Archimedes trapped π between polygons: 3.1408 < π < 3.1429. It is irrational, it is transcendental, and it appears in probability, statistics, and quantum physics — far from any circle.',
    problems: [
      { q: 'Circumference of a circle with diameter 10?', a: '10π ≈ 31.4' },
      { q: 'Is π a fraction?', a: 'No — irrational (proved 1761)' },
    ],
  },
  {
    id: 'circle-theorems', title: 'Circle Theorems', tag: 'angles trapped in arcs', branch: 'geometry', tier: 6, year: -300,
    prereqs: ['circles', 'angles'],
    explain: 'An angle inscribed in a semicircle is always right — Thales knew it 2,600 years ago. Chords, tangents, and arcs obey a small pack of elegant laws.',
    problems: [
      { q: 'Central angle is 80°. Inscribed angle on the same arc?', a: '40°' },
      { q: 'Angle inscribed in a semicircle?', a: '90°' },
    ],
  },
  {
    id: 'solid-geometry', title: 'Solid Geometry', tag: 'volume — space itself', branch: 'geometry', tier: 5, year: -250,
    prereqs: ['area-formulas'],
    explain: 'Boxes, spheres, cones, cylinders. Archimedes proved a sphere fills exactly ⅔ of its wrapping cylinder and asked for that picture on his tombstone.',
    problems: [
      { q: 'Box 3 × 4 × 5: volume?', a: '60' },
      { q: 'A cone vs cylinder, same base & height: volume ratio?', a: '1 : 3' },
    ],
  },
  {
    id: 'platonic-solids', title: 'Platonic Solids', tag: 'only five exist — ever', branch: 'geometry', tier: 6, year: -360,
    prereqs: ['solid-geometry', 'polygons'],
    explain: 'Perfectly regular 3D shapes: tetrahedron, cube, octahedron, dodecahedron, icosahedron. The proof that no sixth can exist is one of the oldest "impossible" results in mathematics.',
    problems: [
      { q: 'How many faces does an icosahedron have?', a: '20' },
      { q: 'Why no regular solid from hexagons?', a: 'Three hexagons at a corner already flatten to 360°' },
    ],
  },
  {
    id: 'euclidean-proof', title: 'Euclidean Proof', tag: 'truth from axioms alone', branch: 'geometry', tier: 5, year: -300,
    prereqs: ['triangles', 'parallel-lines'],
    why: { triangles: 'Euclid’s Elements takes five humble assumptions and builds hundreds of certainties — the triangle theorems are its first trophies.' },
    explain: 'Euclid’s Elements is the second-most printed book in history. Its real invention is not geometry but the axiomatic method itself: assume little, prove everything. All rigorous mathematics imitates it.',
    problems: [
      { q: 'What is a proof’s starting material?', a: 'Axioms (and prior theorems)' },
      { q: 'Why did Euclid prove "obvious" things?', a: 'Certainty must be built, not assumed' },
    ],
  },
  {
    id: 'constructions', title: 'Compass & Straightedge', tag: 'geometry with two tools', branch: 'geometry', tier: 5, year: -300,
    prereqs: ['circles', 'euclidean-proof'],
    explain: 'The Greeks’ sacred game: what can you build with only a compass and an unmarked ruler? Bisect anything, yes — but trisecting an angle is IMPOSSIBLE, and proving that took 2,100 years and abstract algebra.',
    problems: [
      { q: 'Can you bisect any angle with compass & straightedge?', a: 'Yes' },
      { q: 'Can you trisect any angle?', a: 'No — proved impossible (1837)' },
    ],
  },
  {
    id: 'coordinate-plane', title: 'The Coordinate Plane', tag: 'two number lines, crossed', branch: 'geometry', tier: 5, year: 1637,
    prereqs: ['number-line'],
    why: { 'number-line': 'Descartes crossed two number lines at zero — and every point in the plane got an address (x, y). Shape became number; number became shape.' },
    explain: 'Legend says Descartes watched a fly on his ceiling and realized its position was just two numbers. That grid is the single busiest crossroads on this board: algebra, geometry, and calculus all meet here.',
    problems: [
      { q: 'Which quadrant holds (−3, 5)?', a: 'II' },
      { q: 'Midpoint of (2, 3) and (8, 11)?', a: '(5, 7)' },
    ],
  },
  {
    id: 'distance-formula', title: 'Distance Formula', tag: 'Pythagoras, everywhere at once', branch: 'geometry', tier: 6, year: 1637,
    prereqs: ['coordinate-plane', 'pythagorean-theorem'],
    why: { 'pythagorean-theorem': 'The distance formula IS the Pythagorean theorem wearing coordinates: the gap in x and the gap in y are the legs; distance is the hypotenuse.' },
    explain: 'd = √((x₂−x₁)² + (y₂−y₁)²). One old triangle law, industrialized to measure any two points — in 2D, 3D, or the 1000-dimensional spaces of machine learning.',
    problems: [
      { q: 'Distance from (1, 2) to (4, 6)?', a: '5' },
      { q: 'Distance from origin to (6, 8)?', a: '10' },
    ],
  },
  {
    id: 'transformations', title: 'Transformations', tag: 'slide, spin, flip, scale', branch: 'geometry', tier: 6, year: 1872,
    prereqs: ['coordinate-plane', 'congruence'],
    why: { congruence: 'Congruence secretly WAS transformations all along: two shapes are congruent exactly when some slide/spin/flip carries one onto the other.' },
    explain: 'Klein’s revolution: geometry is not about shapes but about the motions that preserve them. This idea — study the transformations, not the objects — becomes group theory and modern physics.',
    problems: [
      { q: 'Rotate (3, 0) by 90° counterclockwise about the origin.', a: '(0, 3)' },
      { q: 'Which transformation reverses orientation?', a: 'Reflection' },
    ],
  },
  {
    id: 'symmetry', title: 'Symmetry', tag: 'sameness under motion', branch: 'geometry', tier: 5, year: -500,
    prereqs: ['polygons'],
    explain: 'A shape is symmetric when some motion leaves it looking untouched. Count those motions and you are secretly doing group theory — the far side of this board.',
    problems: [
      { q: 'Lines of symmetry in a regular pentagon?', a: '5' },
      { q: 'What rotation maps a square onto itself (smallest, nonzero)?', a: '90°' },
    ],
  },
  {
    id: 'tessellations', title: 'Tessellations', tag: 'tiling the infinite floor', branch: 'geometry', tier: 6, year: 1300,
    prereqs: ['symmetry', 'polygons'],
    explain: 'Covering the plane with repeating shapes, no gaps, no overlaps — the Alhambra’s artists found deep patterns centuries before mathematicians proved there are exactly 17 kinds.',
    problems: [
      { q: 'Which regular polygons tile the plane alone?', a: 'Triangle, square, hexagon' },
      { q: 'Why do bees build hexagons?', a: 'Least wall material per cell area' },
    ],
  },
  {
    id: 'golden-ratio', title: 'The Golden Ratio', tag: 'φ ≈ 1.618…', branch: 'geometry', tier: 6, year: -450,
    prereqs: ['ratios', 'irrational-numbers'],
    why: { ratios: 'Cut a stick so whole:long = long:short — that self-similar ratio is φ, the number that contains its own recipe: φ = 1 + 1/φ.' },
    explain: 'The "most irrational" number — hardest of all to approximate by fractions, which is exactly why sunflowers and pinecones use it to pack seeds. Beloved, mythologized, and genuinely strange.',
    problems: [
      { q: 'φ satisfies which equation?', a: 'x² = x + 1' },
      { q: '1/φ equals…?', a: 'φ − 1 ≈ 0.618' },
    ],
  },
  {
    id: 'conic-sections', title: 'Conic Sections', tag: 'slice a cone, get the universe', branch: 'geometry', tier: 7, year: -200,
    prereqs: ['circles', 'coordinate-plane'],
    explain: 'Slice a cone at different angles: circle, ellipse, parabola, hyperbola. Apollonius studied them for beauty; 1,800 years later Kepler found planets riding his ellipses. Pure math, cashing in late.',
    problems: [
      { q: 'Which conic do orbiting planets trace?', a: 'Ellipse' },
      { q: 'x²/9 + y²/4 = 1 is which conic?', a: 'Ellipse' },
    ],
  },
  {
    id: 'triangle-centers', title: 'Triangle Centers', tag: 'one triangle, many hearts', branch: 'geometry', tier: 6, year: -300,
    prereqs: ['triangles', 'constructions'],
    explain: 'Medians meet at the centroid, altitudes at the orthocenter, bisectors at the incenter — every triangle hides a whole family of special points, and three of them always line up on Euler’s line.',
    problems: [
      { q: 'Which center balances a cardboard triangle on a pin?', a: 'Centroid' },
      { q: 'The centroid cuts each median in what ratio?', a: '2 : 1' },
    ],
  },
  {
    id: 'pick-theorem', title: 'Pick’s Theorem', tag: 'area by counting dots', branch: 'geometry', tier: 7, year: 1899,
    prereqs: ['perimeter-area', 'coordinate-plane'],
    explain: 'For any polygon on a dot grid: Area = inside dots + edge dots/2 − 1. Counting beats measuring — a tiny perfect theorem you can verify on graph paper in one minute.',
    problems: [
      { q: 'Polygon with 7 interior dots and 8 boundary dots: area?', a: '10' },
      { q: 'What do you count — nothing else?', a: 'Grid points (inside and on the edge)' },
    ],
  },
  {
    id: 'spherical-geometry', title: 'Spherical Geometry', tag: 'triangles on a globe', branch: 'geometry', tier: 8, year: 150,
    prereqs: ['triangles', 'solid-geometry'],
    explain: 'On a sphere, "straight lines" are great circles, and triangle angles sum to MORE than 180°. Sailors and astronomers used it for centuries — non-Euclidean geometry hiding in plain sight.',
    problems: [
      { q: 'Can a spherical triangle have three right angles?', a: 'Yes — pole + equator' },
      { q: 'Shortest flight path NYC→Tokyo looks curved on a map because…?', a: 'It follows a great circle' },
    ],
  },
  {
    id: 'non-euclidean-geometry', title: 'Non-Euclidean Geometry', tag: 'break one axiom, get a universe', branch: 'geometry', tier: 8, year: 1830,
    prereqs: ['parallel-lines', 'euclidean-proof'],
    why: { 'parallel-lines': 'Deny the parallel postulate — let many parallels pass through a point — and geometry does not collapse. It becomes a NEW, perfectly consistent world.' },
    explain: 'Gauss kept it secret; Bolyai and Lobachevsky published and were ignored. Eighty years later Einstein needed exactly this curved geometry for spacetime itself. The board’s greatest plot twist.',
    problems: [
      { q: 'In hyperbolic geometry, triangle angles sum to…?', a: 'Less than 180°' },
      { q: 'Which physics theory runs on curved geometry?', a: 'General relativity' },
    ],
  },
  {
    id: 'projective-geometry', title: 'Projective Geometry', tag: 'where parallels finally meet', branch: 'geometry', tier: 8, year: 1639,
    prereqs: ['parallel-lines', 'similarity'],
    explain: 'Born from Renaissance perspective painting: add a "horizon" where parallel rails meet, and geometry gains a stunning symmetry — every theorem about points becomes one about lines, for free.',
    problems: [
      { q: 'In a perspective painting, parallel train tracks appear to…?', a: 'Meet at a vanishing point' },
      { q: 'How many points do two distinct lines share in projective geometry?', a: 'Exactly one — always' },
    ],
  },
]
