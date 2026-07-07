import type { TopicNode } from '../types'

// Tier 11-15. Operations themselves become the object of study.

export const ABSTRACT_ALGEBRA: TopicNode[] = [
  {
    id: 'binary-operations', title: 'Binary Operations', tag: 'what "+" and "×" have in common', branch: 'abstract-algebra', tier: 11, year: 1830,
    prereqs: ['functions', 'sets'],
    why: { functions: 'An operation is just a function eating PAIRS: +(3,4) = 7. Once you see that, you can ask which properties (associativity, identity, inverses) really matter — and study all operations at once.' },
    explain: 'The abstraction turn: stop computing with operations, start classifying them. Rotations compose, moves of a Rubik’s cube compose, encryption steps compose — "compose" is the new arithmetic.',
    problems: [
      { q: 'Is subtraction associative?', a: 'No: (5−3)−1 ≠ 5−(3−1)' },
      { q: 'Identity element for multiplication?', a: '1' },
    ],
  },
  {
    id: 'groups', title: 'Groups', tag: 'symmetry, made algebra', branch: 'abstract-algebra', tier: 12, year: 1832,
    prereqs: ['binary-operations', 'symmetry'],
    why: {
      symmetry: 'Collect ALL symmetries of an object; composing two gives a third, each undoes. That closed system IS a group — symmetry stopped being an adjective and became an algebra.',
      'binary-operations': 'Four axioms — closure, associativity, identity, inverses — and nothing else. From that poverty, a theory rich enough to run particle physics.',
    },
    explain: 'Galois invented them the night before his fatal duel (legend exaggerates — but barely). Rubik’s cubes, wallpaper patterns, quarks, and card shuffles are all groups. The 20th century’s master key.',
    problems: [
      { q: 'Do the integers form a group under +?', a: 'Yes' },
      { q: 'Under ×?', a: 'No — no inverse for 2 (or 0)' },
    ],
  },
  {
    id: 'cyclic-groups', title: 'Cyclic Groups', tag: 'one generator, round and round', branch: 'abstract-algebra', tier: 12, year: 1801,
    prereqs: ['groups', 'modular-arithmetic'],
    why: { 'modular-arithmetic': 'The clock IS the simplest group: repeat "+1" and you generate everything, wrapping at 12. Every cyclic group is a clock of some size — arithmetic mod n, rediscovered from above.' },
    explain: 'Groups spun from a single element. They classify completely (one for each size), underlie every periodic pattern, and Diffie–Hellman key exchange hides secrets in their exponents.',
    problems: [
      { q: 'Is (ℤ₇, +) cyclic? Generator?', a: 'Yes — 1 (or any nonzero)' },
      { q: 'Rotations of a pentagon form a cyclic group of order…?', a: '5' },
    ],
  },
  {
    id: 'permutation-groups', title: 'Permutation Groups', tag: 'shuffles under composition', branch: 'abstract-algebra', tier: 12, year: 1770,
    prereqs: ['groups', 'permutations'],
    why: { permutations: 'Shuffles compose and invert — the n! rearrangements form the symmetric group Sₙ. Cayley’s theorem: EVERY group secretly lives inside some Sₙ. Shuffling is universal.' },
    explain: 'The proto-groups Lagrange and Galois actually worked with. The 15-puzzle’s unsolvable half, the Rubik’s cube’s 4.3×10¹⁹ states, and the quintic’s doom all live here.',
    problems: [
      { q: '|S₄| = ?', a: '24' },
      { q: 'Swapping two puzzle tiles changes the permutation’s…?', a: 'Parity (even ↔ odd)' },
    ],
  },
  {
    id: 'subgroups', title: 'Subgroups', tag: 'groups within groups', branch: 'abstract-algebra', tier: 12, year: 1832,
    prereqs: ['groups'],
    explain: 'Closed sub-worlds inside a group: even integers inside all integers, rotations inside all cube moves. The internal anatomy — normal subgroups especially — is where a group hides its secrets.',
    problems: [
      { q: 'Are the even integers a subgroup of (ℤ, +)?', a: 'Yes' },
      { q: 'The odds?', a: 'No — 3+5 escapes' },
    ],
  },
  {
    id: 'lagranges-theorem', title: 'Lagrange’s Theorem', tag: 'size divides size', branch: 'abstract-algebra', tier: 13, year: 1770,
    prereqs: ['subgroups'],
    why: { subgroups: 'A subgroup’s order always divides the group’s — its copies (cosets) tile the group perfectly, no overlap, no gaps. Arithmetic constraining structure.' },
    explain: 'The first structural theorem every algebra student meets. Fermat’s Little Theorem falls out as a two-line corollary — number theory captured by pure structure.',
    problems: [
      { q: 'Can a group of order 15 contain a subgroup of order 4?', a: 'No — 4 ∤ 15' },
      { q: 'Possible subgroup orders in a group of order 12?', a: '1, 2, 3, 4, 6, 12' },
    ],
  },
  {
    id: 'homomorphisms', title: 'Homomorphisms', tag: 'maps that respect structure', branch: 'abstract-algebra', tier: 13, year: 1870,
    prereqs: ['groups', 'functions'],
    why: { functions: 'Not all functions between groups are equal: the good ones satisfy f(a·b) = f(a)·f(b) — they carry the multiplication along. Structure-preserving maps become the real protagonists of algebra.' },
    explain: 'The exponential is one: it turns + into × (e^{a+b} = e^a·e^b) — logarithm tables were exploiting a homomorphism 350 years before the word existed.',
    problems: [
      { q: 'Why is exp: (ℝ,+) → (ℝ⁺,×) a homomorphism?', a: 'e^{a+b} = e^a e^b' },
      { q: 'A homomorphism must send identity to…?', a: 'Identity' },
    ],
  },
  {
    id: 'isomorphism', title: 'Isomorphism', tag: 'same structure, different costume', branch: 'abstract-algebra', tier: 13, year: 1870,
    prereqs: ['homomorphisms'],
    why: { homomorphisms: 'A homomorphism that is also a perfect matching: the two groups are the SAME machine relabeled. Mathematics’ deepest notion of equality — caring only about structure.' },
    explain: 'The clock’s rotations and ℤ₁₂ are isomorphic: one is geometry, one is arithmetic, both are one abstract thing. "Up to isomorphism" is how modern mathematics says "really".',
    problems: [
      { q: 'Rotations of a square ≅ which ℤₙ?', a: 'ℤ₄' },
      { q: 'Are (ℝ,+) and (ℝ⁺,×) isomorphic?', a: 'Yes — via exp/log' },
    ],
  },
  {
    id: 'quotient-groups', title: 'Quotient Groups', tag: 'collapse what you ignore', branch: 'abstract-algebra', tier: 13, year: 1889,
    prereqs: ['subgroups', 'homomorphisms'],
    explain: 'Declare a (normal) subgroup to be "zero" and the group collapses into a smaller one: ℤ mod evens = {even, odd}. Every homomorphism is secretly a collapse — that is the First Isomorphism Theorem.',
    problems: [
      { q: 'ℤ / 2ℤ has how many elements?', a: '2 (even, odd)' },
      { q: 'Parity arithmetic: odd + odd = ?', a: 'Even' },
    ],
  },
  {
    id: 'rings', title: 'Rings', tag: 'two operations, one system', branch: 'abstract-algebra', tier: 13, year: 1871,
    prereqs: ['groups', 'polynomials'],
    why: {
      groups: 'Add a second operation (×) on top of an additive group, demand distributivity, and you have a ring — the integers’ abstract portrait.',
      polynomials: 'Polynomials add and multiply exactly like integers do. Rings capture what those two worlds share — theorems proved once now apply to both.',
    },
    explain: 'Dedekind forged rings to repair unique factorization where it breaks. Integers, polynomials, matrices, clock arithmetic: one axiom set, countless worlds.',
    problems: [
      { q: 'Do 2×2 matrices form a ring?', a: 'Yes (non-commutative)' },
      { q: 'Which ring operation may lack inverses?', a: 'Multiplication' },
    ],
  },
  {
    id: 'ideals', title: 'Ideals', tag: 'the absorbing subsets', branch: 'abstract-algebra', tier: 14, year: 1871,
    prereqs: ['rings'],
    explain: 'Subsets that swallow multiplication: multiples of 5 times ANYTHING stay multiples of 5. Named for Kummer’s "ideal numbers" — invented ghosts that restored unique factorization and nearly proved Fermat.',
    problems: [
      { q: 'Are the multiples of 3 an ideal of ℤ?', a: 'Yes' },
      { q: 'Quotienting ℤ by the ideal (n) gives…?', a: 'ℤₙ — clock arithmetic' },
    ],
  },
  {
    id: 'fields', title: 'Fields', tag: 'where division always works', branch: 'abstract-algebra', tier: 13, year: 1871,
    prereqs: ['rings', 'fractions'],
    why: { fractions: 'Fields are rings where every nonzero element divides — the fraction instinct axiomatized. ℚ, ℝ, ℂ… and stranger worlds with finitely many numbers.' },
    explain: 'The arithmetic aristocracy: all four operations, no excuses. Every vector space stands on one; every polynomial factors over one; Galois theory is the study of how they nest.',
    problems: [
      { q: 'Is ℤ a field?', a: 'No — 1/2 missing' },
      { q: 'Smallest possible field size?', a: '2 ({0,1})' },
    ],
  },
  {
    id: 'finite-fields', title: 'Finite Fields', tag: 'complete arithmetic, finitely many numbers', branch: 'abstract-algebra', tier: 14, year: 1830,
    prereqs: ['fields', 'modular-arithmetic'],
    why: { 'modular-arithmetic': 'ℤₚ (p prime) is a FIELD: even division works on the clock. Galois built the rest — one field of every prime-power size, none other. Perfect little arithmetics.' },
    explain: 'Every QR code, CD, and deep-space photo survives damage because Reed–Solomon codes compute in finite fields. AES encryption lives in GF(256). Galois’ toys guard your bytes.',
    problems: [
      { q: 'In ℤ₅, what is 1/2?', a: '3 (2·3 = 6 ≡ 1)' },
      { q: 'Is there a field with 6 elements?', a: 'No — 6 is not a prime power' },
    ],
  },
  {
    id: 'polynomial-rings', title: 'Polynomial Rings', tag: 'polynomials as first-class numbers', branch: 'abstract-algebra', tier: 14, year: 1880,
    prereqs: ['rings', 'polynomial-division'],
    explain: 'F[x] behaves like a mirror of ℤ: division algorithm, primes (irreducibles), unique factorization. Quotient by an irreducible and NEW fields are born — this is literally how ℂ arises from ℝ.',
    problems: [
      { q: 'The "primes" of a polynomial ring are called…?', a: 'Irreducible polynomials' },
      { q: 'ℝ[x]/(x²+1) ≅ ?', a: 'ℂ' },
    ],
  },
  {
    id: 'galois-theory', title: 'Galois Theory', tag: 'why the quintic has no formula', branch: 'abstract-algebra', tier: 15, year: 1832,
    prereqs: ['fields', 'permutation-groups', 'quadratic-formula'],
    why: {
      'quadratic-formula': 'Degree 2, 3, 4 have formulas in radicals. Degree 5 does NOT — ever. Galois explained why: the answer lives not in cleverness but in the structure of a group.',
      'permutation-groups': 'Each equation carries a group permuting its roots; a radical formula exists exactly when that group unwinds ("is solvable"). S₅ does not unwind — the quintic falls.',
    },
    explain: 'Évariste Galois: expelled, jailed, twice refused by the Academy, dead in a duel at 20 — after a night spent scrawling "I have no time" in the margins of his theory. It became the deepest idea in algebra: symmetry decides solvability.',
    problems: [
      { q: 'Is there a radical formula for degree-5 equations?', a: 'No — Abel–Galois' },
      { q: 'How old was Galois when he died?', a: '20' },
    ],
  },
  {
    id: 'wallpaper-groups', title: 'Wallpaper Groups', tag: 'exactly 17 ways to repeat', branch: 'abstract-algebra', tier: 13, year: 1891,
    prereqs: ['groups', 'tessellations'],
    why: { tessellations: 'Every repeating flat pattern — Alhambra tile, wrapping paper, honeycomb — has a symmetry group, and a census proves there are exactly SEVENTEEN possible. Art, exhaustively classified.' },
    explain: 'Fedorov counted them in 1891; the Alhambra’s medieval artisans had already realized most on its walls. In 3D the same census gives the 230 crystal groups that organize all of crystallography.',
    problems: [
      { q: 'How many wallpaper groups exist?', a: '17' },
      { q: 'Their 3D crystal cousins number…?', a: '230' },
    ],
  },
  {
    id: 'monster-group', title: 'The Monster Group', tag: '8×10⁵³ symmetries of… something', branch: 'abstract-algebra', tier: 15, year: 2004,
    prereqs: ['groups', 'lagranges-theorem'],
    explain: 'The classification of finite simple groups — thousands of pages, hundreds of authors — ends with 26 loners, the largest a monster of order ~8×10⁵³ living in 196,883 dimensions. Its spooky link to modular functions ("monstrous moonshine") won a Fields Medal to explain.',
    problems: [
      { q: 'How many sporadic groups end the classification?', a: '26' },
      { q: 'The Monster naturally lives in how many dimensions?', a: '196,883' },
    ],
  },
  {
    id: 'representation-theory', title: 'Representation Theory', tag: 'groups, played by matrices', branch: 'abstract-algebra', tier: 15, year: 1896,
    prereqs: ['groups', 'linear-transformations'],
    why: { 'linear-transformations': 'Cast each group element as a matrix and abstract symmetry becomes computable linear algebra. Chemistry reads molecular vibrations from it; physics reads particles.' },
    explain: 'The dictionary between symmetry and matrices. Its "characters" are fingerprints so sharp they carried the classification of finite groups — and quantum mechanics is representation theory in a lab coat.',
    problems: [
      { q: 'A representation sends group elements to…?', a: 'Matrices (respecting the operation)' },
      { q: 'Which science reads molecule spectra with it?', a: 'Chemistry (spectroscopy)' },
    ],
  },
  {
    id: 'lie-groups', title: 'Lie Groups', tag: 'smooth, continuous symmetry', branch: 'abstract-algebra', tier: 15, year: 1873,
    prereqs: ['groups', 'manifolds'],
    why: { manifolds: 'Rotations form a group AND a smooth surface — a group you can do calculus on. Discrete symmetry counts moves; Lie symmetry flows.' },
    explain: 'Noether’s theorem crowns them: every continuous symmetry buys a conservation law — time symmetry pays energy, rotation pays angular momentum. The Standard Model’s name, SU(3)×SU(2)×U(1), is three Lie groups.',
    problems: [
      { q: 'Rotational symmetry conserves which quantity?', a: 'Angular momentum' },
      { q: 'Whose theorem trades symmetry for conservation?', a: 'Emmy Noether’s' },
    ],
  },
  {
    id: 'category-theory', title: 'Category Theory', tag: 'mathematics about mathematics', branch: 'abstract-algebra', tier: 15, year: 1945,
    prereqs: ['isomorphism', 'functions'],
    why: { isomorphism: 'Forget elements entirely: keep only objects and the arrows between them. "Same structure" becomes definable across ALL of mathematics at once — the isomorphism idea, weaponized.' },
    explain: 'Born as "general abstract nonsense" (its inventors’ own joke), now the connective tissue of modern math and functional programming — Haskell programmers meet functors and monads by name.',
    problems: [
      { q: 'The two ingredients of a category?', a: 'Objects and arrows (morphisms)' },
      { q: 'Which programming paradigm borrowed monads?', a: 'Functional programming' },
    ],
  },
]
