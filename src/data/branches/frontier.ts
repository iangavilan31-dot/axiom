import type { TopicNode } from '../types'

// Tier 13-18. The outer rim — where mathematics touches everything else
// and where it is still being written. Placed at the angle of its roots.

export const FRONTIER: TopicNode[] = [
  {
    id: 'chaos-theory', title: 'Chaos Theory', tag: 'the butterfly’s ledger', branch: 'frontier', tier: 16, year: 1963,
    prereqs: ['dynamical-systems'],
    why: { 'dynamical-systems': 'Lorenz reran a weather model from rounded inputs — and got a different storm. Deterministic equations, unpredictable futures: sensitivity is a property, not an accident.' },
    explain: 'Simple rules, wild behavior: the flap of a butterfly’s wings rewriting a hurricane’s date. Chaos killed the dream of long-range forecasting and replaced it with the strange beauty of attractors.',
    problems: [
      { q: 'Deterministic and predictable — same thing?', a: 'No — chaos is deterministic yet unpredictable' },
      { q: 'Why do forecasts cap at ~2 weeks?', a: 'Errors double every few days (sensitivity)' },
    ],
  },
  {
    id: 'fractals', title: 'Fractals', tag: 'infinite coastlines, one formula', branch: 'frontier', tier: 15, year: 1980,
    prereqs: ['complex-plane', 'recursion'],
    why: {
      'complex-plane': 'Iterate z² + c over the complex plane, color by escape speed — the Mandelbrot set: infinite intricacy from a one-line rule.',
      recursion: 'Self-similarity is recursion made visible: coastlines, ferns, lungs, markets — each piece echoing the whole.',
    },
    explain: 'Mandelbrot asked "how long is Britain’s coastline?" and the honest answer was "depends on your ruler" — nature’s roughness has fractional dimension. Geometry finally fit clouds instead of cones.',
    problems: [
      { q: 'The Mandelbrot set iterates which map?', a: 'z → z² + c' },
      { q: 'A fractal’s dimension can be…?', a: 'Non-integer (e.g. ~1.26 for Koch)' },
    ],
  },
  {
    id: 'game-theory', title: 'Game Theory', tag: 'the math of strategy', branch: 'frontier', tier: 13, year: 1944,
    prereqs: ['expected-value', 'matrices'],
    why: {
      'expected-value': 'Rational play maximizes expected payoff — poker bluffing frequencies drop out of an equation.',
      matrices: 'A game is literally a payoff MATRIX; solving it is linear algebra with an adversary.',
    },
    explain: 'Von Neumann (poker) and Morgenstern axiomatized conflict itself. Auctions, evolution, nuclear standoffs, dating markets: wherever choices collide, this is the physics.',
    problems: [
      { q: 'In Prisoner’s Dilemma, mutual defection is…?', a: 'The equilibrium — though both do worse' },
      { q: 'Rock-paper-scissors optimal play?', a: 'Random thirds (mixed strategy)' },
    ],
  },
  {
    id: 'nash-equilibrium', title: 'Nash Equilibrium', tag: 'no one moves first', branch: 'frontier', tier: 14, year: 1950,
    prereqs: ['game-theory', 'fixed-point-theorems'],
    why: { 'fixed-point-theorems': 'Nash’s 28-page thesis: map strategies to best responses; Brouwer/Kakutani guarantees a point mapping to itself — a strategy profile no player regrets. Topology certifying economics.' },
    explain: 'Every finite game has one. It reshaped economics (Nobel 1994), explains traffic jams and price wars, and — per A Beautiful Mind — was born alongside Nash’s own struggle with schizophrenia.',
    problems: [
      { q: 'At equilibrium, a unilateral deviation makes you…?', a: 'No better off' },
      { q: 'Which theorem underwrites existence?', a: 'A fixed-point theorem' },
    ],
  },
  {
    id: 'information-theory', title: 'Information Theory', tag: 'surprise, measured in bits', branch: 'frontier', tier: 14, year: 1948,
    prereqs: ['probability', 'logarithms'],
    why: {
      logarithms: 'Information = −log₂(probability): rare events carry more bits. Twenty questions works because each good question halves the possibilities — that IS the logarithm.',
      probability: 'Shannon treated messages as random processes; entropy — expected surprise — set the exact limits of compression and transmission.',
    },
    explain: 'One 1948 paper created the information age: every ZIP file, JPEG, QR code, and 5G packet lives inside Shannon’s limits. He also built juggling robots and rode a unicycle through Bell Labs.',
    problems: [
      { q: 'Bits to identify one of 64 equally likely items?', a: '6' },
      { q: 'A fair coin flip carries how much entropy?', a: '1 bit' },
    ],
  },
  {
    id: 'cryptography', title: 'Modern Cryptography', tag: 'primes guarding secrets', branch: 'frontier', tier: 14, year: 1977,
    prereqs: ['eulers-theorem', 'algorithms'],
    why: {
      'eulers-theorem': 'RSA is Euler’s theorem, weaponized: encrypt by raising to e mod n, decrypt with d — the round trip works because a^φ(n) ≡ 1. An 18th-century identity carries your credit card.',
      algorithms: 'Security = asymmetry of effort: multiplying primes is instant, un-multiplying is eons. Cryptography lives in that computational gap.',
    },
    explain: 'The public-key revolution: locks anyone can click shut, only one can open. Every https padlock, message app, and blockchain runs on number theory Hardy proudly called useless.',
    problems: [
      { q: 'RSA’s hard problem?', a: 'Factoring huge semiprimes' },
      { q: 'What arrives with quantum computers (Shor)?', a: 'RSA/ECC break — hence post-quantum crypto' },
    ],
  },
  {
    id: 'coding-theory', title: 'Error-Correcting Codes', tag: 'messages that heal themselves', branch: 'frontier', tier: 15, year: 1950,
    prereqs: ['information-theory', 'finite-fields'],
    why: { 'finite-fields': 'Reed–Solomon treats data as polynomial values over a finite field — scratch the disc, lose some points, the polynomial reconstructs the rest. Galois repairing your QR code.' },
    explain: 'Hamming, furious at weekend computer crashes, taught data to fix itself. Voyager whispers across 24 billion km through noise because its bits carry mathematical armor.',
    problems: [
      { q: 'Why does a scratched QR code still scan?', a: 'Reed–Solomon error correction' },
      { q: 'Repetition 111/000 with one flip: recoverable?', a: 'Yes — majority vote' },
    ],
  },
  {
    id: 'numerical-analysis', title: 'Numerical Analysis', tag: 'calculus with error bars', branch: 'frontier', tier: 14, year: 1946,
    prereqs: ['taylor-series', 'algorithms'],
    why: { 'taylor-series': 'Computers cannot take limits — they truncate Taylor series and BOUND the crime. Every simulation is calculus approximated, with the error tracked like a fugitive.' },
    explain: 'The mathematics of scientific computing: stable vs explosive algorithms, step sizes, floating-point traps (a Patriot missile clock drift killed 28 people in 1991). Simulation is now science’s third leg.',
    problems: [
      { q: 'Why is 0.1 + 0.2 ≠ 0.3 in floating point?', a: '0.1 has no finite binary expansion' },
      { q: 'What does a stable algorithm not do to errors?', a: 'Amplify them' },
    ],
  },
  {
    id: 'linear-programming', title: 'Linear Programming', tag: 'the best corner of the possible', branch: 'frontier', tier: 14, year: 1947,
    prereqs: ['systems-of-equations', 'inequalities', 'optimization'],
    why: { inequalities: 'Constraints carve a polytope of feasible plans; the optimum always sits at a CORNER. Dantzig’s simplex method walks corner to corner — optimizing the entire economy of a war.' },
    explain: 'Airlines, refineries, diets, kidney exchanges: "maximize this, subject to that" at industrial scale. Dantzig famously solved two "homework problems" that were actually open — the legend behind Good Will Hunting.',
    problems: [
      { q: 'Where does an LP optimum live?', a: 'At a vertex of the feasible polytope' },
      { q: 'Name any industry running LP daily.', a: 'Airlines (crew/fleet scheduling)' },
    ],
  },
  {
    id: 'monte-carlo-frontier', title: 'Computational Simulation', tag: 'science by dice and grid', branch: 'frontier', tier: 15, year: 1946,
    prereqs: ['monte-carlo', 'numerical-analysis'],
    explain: 'Weather, galaxies, pandemics, chip design: when equations outgrow pencils, we simulate. Modern science’s experiments increasingly run on silicon — mathematics as microscope.',
    problems: [
      { q: 'Weather models solve which kind of equations on a grid?', a: 'PDEs (fluid + thermodynamics)' },
      { q: 'Simulation complements which two classic pillars?', a: 'Theory and experiment' },
    ],
  },
  {
    id: 'machine-learning-math', title: 'Machine Learning Math', tag: 'learning = downhill on loss', branch: 'frontier', tier: 16, year: 1986,
    prereqs: ['least-squares', 'partial-derivatives', 'probability'],
    why: {
      'partial-derivatives': 'Training is gradient descent: compute the loss surface’s slope in a billion dimensions, step downhill, repeat. The chain rule (as backpropagation) does the bookkeeping.',
      'least-squares': 'Gauss fitting Ceres and a neural net fitting images are the same act: minimize squared error. ML is regression that ate the world.',
      probability: 'Models output distributions; training maximizes likelihood; regularization is a prior. Statistics is the skeleton under the hype.',
    },
    explain: 'Calculus, linear algebra, and probability, industrialized: the mathematics you flew past on this board — gradients, matrices, Bayes — is exactly what writes and reads these very words.',
    problems: [
      { q: 'Backpropagation is which calculus rule at scale?', a: 'The chain rule' },
      { q: 'The gradient points which way; training steps which way?', a: 'Uphill; opposite (downhill)' },
    ],
  },
  {
    id: 'neural-networks', title: 'Neural Networks', tag: 'matrices, stacked and bent', branch: 'frontier', tier: 17, year: 2012,
    prereqs: ['machine-learning-math', 'linear-transformations'],
    why: { 'linear-transformations': 'A layer is a matrix multiply plus a nonlinear bend; stack enough and any function becomes approximable. Deep learning is linear algebra with attitude.' },
    explain: 'From a 1958 perceptron the New York Times said would "walk, talk, and be conscious", through winters, to 2012’s ImageNet moment — and to the transformer architectures generating this sentence.',
    problems: [
      { q: 'Without nonlinearities, a deep net collapses into…?', a: 'One matrix (a linear map)' },
      { q: 'The 2017 architecture behind modern LLMs?', a: 'The Transformer ("Attention Is All You Need")' },
    ],
  },
  {
    id: 'quantum-math', title: 'Quantum Mathematics', tag: 'reality runs on eigenvalues', branch: 'frontier', tier: 17, year: 1925,
    prereqs: ['hilbert-spaces', 'eigenvalues', 'complex-numbers'],
    why: {
      'hilbert-spaces': 'A quantum state is a unit vector in a Hilbert space; superposition is vector addition. The strangest physics is the plainest linear algebra.',
      eigenvalues: 'Measure energy and you get — only — an eigenvalue of the Hamiltonian. The discrete spectra lighting neon signs are eigenvalue lists.',
      'complex-numbers': 'Amplitudes are complex; interference is their addition. Cardano’s embarrassing √−1 turned out to be the bookkeeping of reality.',
    },
    explain: 'Heisenberg reinvented matrices unknowingly; von Neumann supplied the Hilbert-space frame. Chemistry, lasers, and semiconductors — a third of GDP — are this sector’s applied homework.',
    problems: [
      { q: 'Measurement outcomes are which linear-algebra objects?', a: 'Eigenvalues' },
      { q: 'Superposition is which vector operation?', a: 'Addition (linear combination)' },
    ],
  },
  {
    id: 'quantum-computing', title: 'Quantum Computing', tag: 'computing with superposition', branch: 'frontier', tier: 18, year: 1994,
    prereqs: ['quantum-math', 'turing-machines'],
    why: {
      'turing-machines': 'A genuinely NEW model of computation — qubits explore amplitudes no tape can. The Church–Turing story gains its first serious plot twist.',
      'quantum-math': 'Algorithms are unitary matrices; Shor’s factoring dance runs a quantum Fourier transform to crack RSA’s one hard problem.',
    },
    explain: 'Feynman’s dare ("Nature isn’t classical, dammit") became an industry. Shor’s 1994 algorithm made spies fund physics; the race between qubits and post-quantum codes is live right now.',
    problems: [
      { q: 'Shor’s algorithm threatens which lock?', a: 'RSA (fast factoring)' },
      { q: 'A qubit differs from a bit how?', a: 'It holds a complex superposition of 0 and 1' },
    ],
  },
  {
    id: 'tensors-relativity', title: 'Tensors & Relativity', tag: 'gravity is curvature', branch: 'frontier', tier: 17, year: 1915,
    prereqs: ['manifolds', 'vector-calculus'],
    why: {
      manifolds: 'Einstein needed geometry that works ON the curved thing itself — Riemann’s 60-year-old manifolds were waiting. Matter tells spacetime how to curve; curvature tells matter how to move.',
      'vector-calculus': 'Tensors generalize vectors so equations survive ANY coordinate change — physics with no privileged observer.',
    },
    explain: 'Einstein spent eight years learning this sector (with Grossmann’s help) to write ten equations. GPS corrects for both his relativities daily; skip the math and positions drift 10 km per day.',
    problems: [
      { q: 'In GR, gravity is not a force but…?', a: 'Curvature of spacetime' },
      { q: 'What breaks if GPS ignores relativity?', a: '~10 km/day position drift' },
    ],
  },
  {
    id: 'navier-stokes', title: 'Navier–Stokes Problem', tag: 'million-dollar turbulence', branch: 'frontier', tier: 16, year: 2000,
    prereqs: ['pde'],
    why: { pde: 'The fluid equations, written in 1845, run every aircraft simulation — yet no one can prove their 3D solutions stay smooth forever. A Clay million waits on the answer.' },
    explain: 'Feynman called turbulence "the most important unsolved problem of classical physics". We fly planes on equations we cannot fully tame — engineering outrunning theorems.',
    problems: [
      { q: 'What must be proved (or refuted) for the prize?', a: '3D smoothness/existence of solutions' },
      { q: 'The equations describe what substance?', a: 'Fluids (air, water…)' },
    ],
  },
  {
    id: 'tda', title: 'Topological Data Analysis', tag: 'the shape of data', branch: 'frontier', tier: 17, year: 2002,
    prereqs: ['homology', 'data-visualization'],
    why: { homology: 'Grow balls around data points and track which holes persist across scales — persistent homology finds structure clustering can’t see. The purest math on the board, hired by biotech.' },
    explain: 'Rubber-sheet geometry reading cancer genomics, sensor networks, and brain scans. A century of "useless" topology became a data microscope in one decade.',
    problems: [
      { q: 'TDA’s signature tool?', a: 'Persistent homology' },
      { q: 'A loop in the data cloud shows up as a persistent…?', a: '1-dimensional hole' },
    ],
  },
  {
    id: 'computer-proofs', title: 'Computer-Assisted Proof', tag: 'when the machine holds the chalk', branch: 'frontier', tier: 15, year: 1976,
    prereqs: ['graph-coloring', 'type-theory'],
    why: {
      'graph-coloring': 'Four Colors, 1976: the first major theorem proved by exhaustive machine check — 1,936 cases no human will ever read. "Is that a proof?" — the argument continues.',
      'type-theory': 'Proof assistants answer the doubt: Lean/Coq verify every inference down to axioms. Flyspeck formalized Kepler; big proofs increasingly ship with certificates.',
    },
    explain: 'Mathematics’ newest instrument and identity crisis at once: if no human can survey a proof, what is understanding? Meanwhile the formal-math libraries grow daily — and AI has started contributing lemmas.',
    problems: [
      { q: 'First famous computer-checked theorem?', a: 'The Four Color Theorem (1976)' },
      { q: 'What does a proof assistant guarantee?', a: 'Every step follows from axioms' },
    ],
  },
  {
    id: 'voting-theory', title: 'Voting & Social Choice', tag: 'no perfect democracy — proved', branch: 'frontier', tier: 14, year: 1951,
    prereqs: ['game-theory', 'proof-techniques'],
    explain: 'Arrow’s impossibility theorem: no ranked voting system can satisfy a short list of obviously fair demands simultaneously. Every electoral debate is a choice of which fairness to sacrifice — mathematics said so.',
    problems: [
      { q: 'Arrow proved perfect ranked voting is…?', a: 'Impossible (axioms conflict)' },
      { q: 'Splitting the vote between similar candidates is which failure?', a: 'Spoiler effect / IIA violation' },
    ],
  },
  {
    id: 'origami-math', title: 'Origami Mathematics', tag: 'folds beat the compass', branch: 'frontier', tier: 14, year: 1989,
    prereqs: ['constructions', 'transformations'],
    why: { constructions: 'Paper folding TRISECTS angles and doubles cubes — the compass’ two famous impossibles fall to creases. A stronger geometry hiding in an art form.' },
    explain: 'The Huzita–Hatori axioms formalized folding; now origami algorithms pack telescope mirrors (JWST), stents, and airbags. An ancient art became deployable-structures engineering.',
    problems: [
      { q: 'Which "impossible" construction can folding do?', a: 'Angle trisection (and cube doubling)' },
      { q: 'Name a spacecraft using origami folds.', a: 'JWST (mirror/sunshield packing)' },
    ],
  },
  {
    id: 'langlands-program', title: 'The Langlands Program', tag: 'the grand unified conjecture', branch: 'frontier', tier: 18, year: 1967,
    prereqs: ['representation-theory', 'analytic-number-theory'],
    why: {
      'representation-theory': 'A vast conjectured dictionary: symmetry’s representations on one shore, number theory’s L-functions on the other, translation exact. Wiles crossed one plank of it to slay Fermat.',
      'analytic-number-theory': 'Langlands mailed Weil a 17-page letter — "if you read it as pure speculation, I apologize" — sketching bridges between continents of mathematics. Armies have built on it since.',
    },
    explain: 'Called mathematics’ Rosetta Stone: a web of conjectures unifying numbers, symmetry, and analysis. Partly proved, Fields Medals scattered along its length, and decades of chalk left to go. The board is still growing.',
    problems: [
      { q: 'Which famous 1995 proof walked a Langlands bridge?', a: 'Fermat’s Last Theorem (modularity)' },
      { q: 'What does the program conjecture, in one word?', a: 'Correspondence (numbers ↔ symmetry)' },
    ],
  },
]
