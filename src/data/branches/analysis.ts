import type { TopicNode } from '../types'

// Tier 12-17. Calculus, rebuilt on bedrock — then aimed at infinity.

export const ANALYSIS: TopicNode[] = [
  {
    id: 'real-numbers', title: 'The Real Numbers', tag: 'the line, finally completed', branch: 'analysis', tier: 12, year: 1872,
    prereqs: ['irrational-numbers', 'limits'],
    why: {
      'irrational-numbers': 'The fraction line is riddled with holes (√2, π live in them). Dedekind’s cuts fill EVERY hole at once — the continuum, constructed rather than assumed.',
      limits: 'Calculus had used "the real line" for 200 years on credit. Analysis begins by finally paying the debt: defining the thing limits converge IN.',
    },
    explain: 'What IS a real number? Dedekind answered in 1872: a cut of the rationals into left and right. With that, the number line stopped being a picture and became a theorem factory.',
    problems: [
      { q: 'Which axiom separates ℝ from ℚ?', a: 'Completeness (no holes)' },
      { q: 'Is 0.999… equal to 1?', a: 'Yes — exactly' },
    ],
  },
  {
    id: 'epsilon-delta', title: 'Epsilon–Delta', tag: 'infinity, caged in inequalities', branch: 'analysis', tier: 12, year: 1861,
    prereqs: ['limits', 'absolute-value'],
    why: {
      limits: 'Newton’s "infinitely small" drew a century of mockery (Berkeley: "ghosts of departed quantities"). Weierstrass replaced ghosts with a challenge game: ANY error tolerance ε can be met by some input tolerance δ.',
      'absolute-value': 'The whole definition is two absolute values: |x − a| < δ forces |f(x) − L| < ε. Distance-on-the-line does all the work.',
    },
    explain: 'The definition that made calculus rigorous — no infinities harmed. Every analysis course since begins here, and every "for any ε > 0" in mathematics is Weierstrass’ challenge echoing.',
    problems: [
      { q: 'In the game, who moves first: ε or δ?', a: 'ε (the challenger)' },
      { q: 'For f(x)=3x at a=2, ε=0.3: a working δ?', a: '0.1' },
    ],
  },
  {
    id: 'convergent-sequences', title: 'Convergence, Rigorous', tag: 'arrival, defined', branch: 'analysis', tier: 12, year: 1821,
    prereqs: ['sequences', 'epsilon-delta'],
    explain: 'A sequence converges to L when eventually — past some N — every term stays within any ε of L. "Eventually forever close": four words that carry the rest of this branch.',
    problems: [
      { q: 'Does (−1)ⁿ converge?', a: 'No — it never settles' },
      { q: 'Limit of (n+1)/n?', a: '1' },
    ],
  },
  {
    id: 'cauchy-sequences', title: 'Cauchy Sequences', tag: 'converging without a destination', branch: 'analysis', tier: 13, year: 1821,
    prereqs: ['convergent-sequences'],
    why: { 'convergent-sequences': 'Cauchy’s trick: terms huddling ever closer to EACH OTHER must be going somewhere — you can certify arrival without naming the destination.' },
    explain: 'The internal test for convergence. In ℚ, Cauchy sequences can aim at holes (1, 1.4, 1.41, … chasing √2); in ℝ, every one lands. That property IS completeness.',
    problems: [
      { q: '1, 1.4, 1.41, 1.414, … is Cauchy in ℚ. Does it converge in ℚ?', a: 'No — √2 is missing there' },
      { q: 'In ℝ, Cauchy implies…?', a: 'Convergent' },
    ],
  },
  {
    id: 'completeness', title: 'Completeness', tag: 'no holes, guaranteed', branch: 'analysis', tier: 13, year: 1872,
    prereqs: ['cauchy-sequences', 'real-numbers'],
    explain: 'Every bounded-above set has a LEAST upper bound; every Cauchy sequence lands. The single property powering the intermediate value theorem, extreme values, and all of calculus’ existence guarantees.',
    problems: [
      { q: 'Supremum of {x : x² < 2}?', a: '√2' },
      { q: 'Does ℚ satisfy completeness?', a: 'No' },
    ],
  },
  {
    id: 'bolzano-weierstrass', title: 'Bolzano–Weierstrass', tag: 'crowded sequences must cluster', branch: 'analysis', tier: 13, year: 1817,
    prereqs: ['convergent-sequences', 'completeness'],
    explain: 'Infinitely many points trapped in a bounded interval MUST pile up somewhere: every bounded sequence has a convergent subsequence. The compactness seed — proved by repeatedly halving the box.',
    problems: [
      { q: 'Does (−1)ⁿ have a convergent subsequence?', a: 'Yes — take every other term' },
      { q: 'The proof repeatedly does what to the interval?', a: 'Halves it (bisection)' },
    ],
  },
  {
    id: 'intermediate-value-theorem', title: 'Intermediate Value Thm', tag: 'no teleporting allowed', branch: 'analysis', tier: 13, year: 1817,
    prereqs: ['continuity', 'completeness'],
    why: { continuity: 'A continuous path from below zero to above zero must CROSS zero — obvious to the eye, provable only with completeness. Bolzano insisted on proving the obvious; analysis was born of that stubbornness.' },
    explain: 'Guarantees solutions exist before you find them. Corollary of fame: at every instant, two antipodal points on Earth’s equator share the same temperature.',
    problems: [
      { q: 'f(1) = −3, f(2) = 5, f continuous: root between?', a: 'Yes — somewhere in (1, 2)' },
      { q: 'Why does a wobbly table always stabilize by rotating?', a: 'IVT on the height difference' },
    ],
  },
  {
    id: 'mean-value-theorem', title: 'Mean Value Theorem', tag: 'your average speed happened', branch: 'analysis', tier: 13, year: 1823,
    prereqs: ['derivatives', 'intermediate-value-theorem'],
    explain: 'Averaging 60 mph over an hour means at some instant you did exactly 60. The hinge lemma of calculus — nearly every honest proof about derivatives routes through it (and speed cameras could ticket with it).',
    problems: [
      { q: '100 miles in 2 hours: MVT guarantees an instant at exactly…?', a: '50 mph' },
      { q: 'f′ = 0 everywhere implies f is…?', a: 'Constant (via MVT)' },
    ],
  },
  {
    id: 'uniform-convergence', title: 'Uniform Convergence', tag: 'all points converge in step', branch: 'analysis', tier: 14, year: 1841,
    prereqs: ['convergent-sequences', 'functions'],
    explain: 'Functions converging pointwise can betray you — continuous ones can limit to a broken one. Uniform convergence (one N works for ALL x) is the discipline that lets limits, integrals, and sums commute safely.',
    problems: [
      { q: 'xⁿ on [0,1] converges to a discontinuous limit — which convergence fails?', a: 'Uniform' },
      { q: 'Uniform limits of continuous functions are…?', a: 'Continuous' },
    ],
  },
  {
    id: 'weierstrass-monster', title: 'Weierstrass’ Monster', tag: 'spiky everywhere, smooth nowhere', branch: 'analysis', tier: 14, year: 1872,
    prereqs: ['uniform-convergence', 'derivatives'],
    why: { derivatives: 'A function continuous EVERYWHERE yet differentiable NOWHERE — infinite jaggedness at every zoom. Intuition said impossible; a sum of shrinking cosines said otherwise.' },
    explain: 'Hermite recoiled "in horror"; Poincaré called such functions a plague. Then Brownian motion turned out to move exactly this way — the monster was a photograph of pollen in water.',
    problems: [
      { q: 'What natural motion is nowhere-differentiable?', a: 'Brownian motion' },
      { q: 'What did the monster kill?', a: '"Continuous ⇒ mostly differentiable" intuition' },
    ],
  },
  {
    id: 'metric-spaces', title: 'Metric Spaces', tag: 'distance, abstracted', branch: 'analysis', tier: 14, year: 1906,
    prereqs: ['epsilon-delta', 'sets'],
    why: { 'epsilon-delta': 'Every ε-δ argument used only ONE fact about numbers: there is a distance. Fréchet kept the distance axioms, discarded the numbers — and analysis ran unchanged on spaces of functions, words, and genomes.' },
    explain: 'Any set plus a sane notion of distance. Sequences of functions converge; "spaces" of DNA strings have geometry. The abstraction that let analysis leave the number line forever.',
    problems: [
      { q: 'The three metric axioms?', a: 'Positivity, symmetry, triangle inequality' },
      { q: 'Is "edits needed to change one word to another" a metric?', a: 'Yes — edit distance' },
    ],
  },
  {
    id: 'measure-theory', title: 'Measure Theory', tag: 'how big is a set, really?', branch: 'analysis', tier: 15, year: 1901,
    prereqs: ['real-numbers', 'sets'],
    explain: 'Length for monstrous sets: the rationals — infinitely many points — have total length ZERO. Lebesgue’s measure sorts every set by true size, and (via the axiom of choice) some sets have no size at all.',
    problems: [
      { q: 'Measure of ℚ inside [0,1]?', a: '0' },
      { q: 'Probability is secretly a…?', a: 'Measure of total size 1' },
    ],
  },
  {
    id: 'lebesgue-integration', title: 'Lebesgue Integration', tag: 'integrate the unintegratable', branch: 'analysis', tier: 15, year: 1902,
    prereqs: ['measure-theory', 'definite-integrals'],
    why: { 'definite-integrals': 'Riemann slices the x-axis; Lebesgue slices the y-axis — "I sort my coins by value, not by pocket order." Functions Riemann chokes on (1 on rationals, 0 elsewhere) integrate effortlessly.' },
    explain: 'The adult version of the integral: robust under limits, at home with probability, and the foundation under Fourier analysis and quantum mechanics.',
    problems: [
      { q: 'Lebesgue integral of the "1 on rationals" function on [0,1]?', a: '0' },
      { q: 'Who slices which axis?', a: 'Riemann: x. Lebesgue: y.' },
    ],
  },
  {
    id: 'functional-analysis', title: 'Functional Analysis', tag: 'spaces whose points are functions', branch: 'analysis', tier: 16, year: 1932,
    prereqs: ['vector-spaces', 'metric-spaces'],
    why: { 'vector-spaces': 'Functions add and scale — so a set of functions IS a vector space, usually infinite-dimensional. Banach added a norm and completeness, and analysis gained whole new universes.' },
    explain: 'Do linear algebra where each "vector" is an entire function. Differential equations become fixed-point problems; signals become geometry. The 20th century’s workhorse abstraction.',
    problems: [
      { q: 'Dimension of the space of all polynomials?', a: 'Infinite' },
      { q: 'A complete normed vector space is called a…?', a: 'Banach space' },
    ],
  },
  {
    id: 'hilbert-spaces', title: 'Hilbert Spaces', tag: 'infinite dimensions, with angles', branch: 'analysis', tier: 16, year: 1912,
    prereqs: ['inner-product-spaces', 'functional-analysis'],
    why: { 'inner-product-spaces': 'Keep the inner product in infinite dimensions and geometry survives: orthogonal functions, projections, Pythagoras for series. The one infinite-dimensional space that still feels like home.' },
    explain: 'Where quantum mechanics lives: every quantum state is a vector in a Hilbert space, every measurement a projection. Fourier series are literally coordinates in one.',
    problems: [
      { q: 'Quantum states are vectors in a…?', a: 'Hilbert space' },
      { q: 'Fourier coefficients are which geometric operation?', a: 'Projections onto orthogonal waves' },
    ],
  },
  {
    id: 'fourier-series', title: 'Fourier Series', tag: 'everything is made of waves', branch: 'analysis', tier: 14, year: 1822,
    prereqs: ['trig-graphs', 'infinite-series'],
    why: {
      'trig-graphs': 'Fourier’s heresy: ANY repeating signal — even a square wave with corners — is a sum of smooth sines. The committee (Lagrange included) refused to believe it.',
      'infinite-series': 'It takes infinitely many harmonics; how such sums behave forced analysis to invent half its rigor. Fourier’s claim was the stress test.',
    },
    explain: 'Studying heat flow, Fourier decomposed everything into pure tones. Your ears do it mechanically; MP3, JPEG, and noise-canceling headphones do it digitally. The most applied theorem in this sector.',
    problems: [
      { q: 'A square wave uses which harmonics?', a: 'Odd ones: sin x + sin 3x/3 + sin 5x/5 + …' },
      { q: 'What do MP3 and JPEG discard?', a: 'Weak/imperceptible frequency components' },
    ],
  },
  {
    id: 'fourier-transform', title: 'Fourier Transform', tag: 'the frequency X-ray', branch: 'analysis', tier: 15, year: 1822,
    prereqs: ['fourier-series', 'improper-integrals'],
    why: { 'fourier-series': 'Let the period go to infinity: discrete harmonics smear into a continuous spectrum. Series → integral; song → spectrum.' },
    explain: 'Converts any signal into its frequency content and back, losslessly. MRI machines, radio, Shazam, LIGO’s gravitational-wave chirp: one integral transform runs them all — the FFT made it fast enough for everything.',
    problems: [
      { q: 'Time domain ↔ ? domain', a: 'Frequency' },
      { q: 'Which algorithm made it fast (1965)?', a: 'The FFT (Cooley–Tukey)' },
    ],
  },
  {
    id: 'complex-analysis', title: 'Complex Analysis', tag: 'calculus in the complex plane', branch: 'analysis', tier: 14, year: 1825,
    prereqs: ['complex-plane', 'derivatives'],
    why: {
      'complex-plane': 'Differentiate with respect to a 2D variable and rigidity appears: one derivative implies infinitely many, and a function’s values on a circle dictate everything inside.',
      derivatives: 'Complex-differentiable is a far stronger demand than real — the survivors ("holomorphic" functions) are the aristocracy of mathematics.',
    },
    explain: 'The most elegant subject on the board — everything true is beautifully true. Liouville: bounded everywhere means constant. One line of it proves the fundamental theorem of algebra.',
    problems: [
      { q: 'A bounded entire function must be…?', a: 'Constant (Liouville)' },
      { q: '∮ dz/z around the origin = ?', a: '2πi' },
    ],
  },
  {
    id: 'residues', title: 'Residue Calculus', tag: 'integrals by walking circles', branch: 'analysis', tier: 15, year: 1826,
    prereqs: ['complex-analysis'],
    explain: 'Real integrals that resist every technique fall instantly: loop through the complex plane, count the poles inside, multiply by 2πi. Feels like cheating; is a theorem.',
    problems: [
      { q: 'The residue theorem counts what inside the loop?', a: 'Poles (times their residues)' },
      { q: '∫ dx/(1+x²) over all reals, by residues?', a: 'π' },
    ],
  },
  {
    id: 'analytic-continuation', title: 'Analytic Continuation', tag: 'a function’s unique afterlife', branch: 'analysis', tier: 15, year: 1859,
    prereqs: ['complex-analysis', 'power-series'],
    why: { 'power-series': 'A holomorphic function is so rigid that its values on any tiny arc determine its unique extension everywhere possible — grow the series patch by patch, like reconstructing a fossil from one bone.' },
    explain: 'How ζ(s) escapes its original domain and acquires the zeros of the Riemann Hypothesis. Also the honest story behind the infamous "1+2+3+… = −1/12" — a continuation’s value, not a sum.',
    problems: [
      { q: 'ζ(−1) via continuation "equals"…?', a: '−1/12' },
      { q: 'How many valid continuations can a function have?', a: 'One — uniqueness is the theorem' },
    ],
  },
  {
    id: 'pde', title: 'Partial Differential Equations', tag: 'physics’ native tongue', branch: 'analysis', tier: 15, year: 1750,
    prereqs: ['differential-equations', 'partial-derivatives'],
    why: { 'partial-derivatives': 'Let laws involve rates in space AND time: the wave equation, the heat equation, Schrödinger, Einstein. Reality is a system of PDEs; solving them is most of applied mathematics.' },
    explain: 'D’Alembert wrote the first for a vibrating string. Weather, quantum states, option prices, gravitational waves — each is a PDE being solved, mostly numerically, at planetary compute scale.',
    problems: [
      { q: 'Heat spreading obeys which canonical PDE?', a: 'The heat equation uₜ = k·uₓₓ' },
      { q: 'Name a PDE with a million-dollar existence question.', a: 'Navier–Stokes' },
    ],
  },
  {
    id: 'calculus-of-variations', title: 'Calculus of Variations', tag: 'optimizing over all curves', branch: 'analysis', tier: 15, year: 1696,
    prereqs: ['optimization', 'differential-equations'],
    why: { optimization: 'Not "which x" but "which CURVE": fastest slide, shortest path, least energy. The Bernoullis’ brachistochrone challenge (Newton solved it overnight, anonymously — "I know the lion by his claw") founded the field.' },
    explain: 'Nature is lazy, provably: light, orbits, soap films all minimize something. The Euler–Lagrange equation extracts physics from a single principle of least action — modern physics’ deepest habit.',
    problems: [
      { q: 'The fastest slide between two points is which curve?', a: 'A cycloid (brachistochrone)' },
      { q: 'Soap films minimize…?', a: 'Surface area' },
    ],
  },
  {
    id: 'dynamical-systems', title: 'Dynamical Systems', tag: 'the long run of everything', branch: 'analysis', tier: 15, year: 1890,
    prereqs: ['differential-equations'],
    explain: 'Poincaré, failing to solve the three-body problem exactly, invented asking instead: where do systems END UP? Fixed points, cycles, strange attractors — the qualitative theory of fate, and the doorway to chaos.',
    problems: [
      { q: 'A pendulum with friction ends at a…?', a: 'Fixed point (hanging still)' },
      { q: 'Who traded exact solutions for long-run behavior?', a: 'Poincaré' },
    ],
  },
  {
    id: 'gamma-function', title: 'The Gamma Function', tag: '(½)! exists, and it’s √π/2', branch: 'analysis', tier: 14, year: 1729,
    prereqs: ['factorials', 'improper-integrals'],
    why: { factorials: 'Euler interpolated the factorial: Γ(n) = (n−1)!, defined by an integral that accepts ANY number — fractions, even complex ones. The smoothest possible curve through the factorial dots.' },
    explain: 'The factorial, freed from the integers. It appears uninvited in statistics (the bell curve’s √π is Γ(½)), string theory’s first formula, and the functional equation of ζ.',
    problems: [
      { q: 'Γ(5) = ?', a: '24' },
      { q: 'Γ(½) = ?', a: '√π' },
    ],
  },
  {
    id: 'basel-problem', title: 'The Basel Problem', tag: '1 + ¼ + ⅑ + … = π²/6', branch: 'analysis', tier: 13, year: 1735,
    prereqs: ['infinite-series', 'pi'],
    why: {
      'infinite-series': 'Sum the reciprocal squares — the best minds of a century couldn’t. Euler, 28, cracked it and became famous overnight.',
      pi: 'Why does π — a CIRCLE constant — emerge from adding square reciprocals? That shock still teaches: the board’s regions are secretly one country.',
    },
    explain: 'Euler’s audacious move: treat sin(x)/x as an infinite polynomial and read off its roots. The answer π²/6 opened the study of ζ(s) — this innocent sum is ζ(2), first stone on the road to the Riemann Hypothesis.',
    problems: [
      { q: 'ζ(2) = ?', a: 'π²/6' },
      { q: 'P(two random integers are coprime)?', a: '6/π²' },
    ],
  },
]
