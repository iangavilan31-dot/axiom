import type { TopicNode } from '../types'

// Tier 5-12. The mathematics of separate things — and of computation.

export const DISCRETE: TopicNode[] = [
  {
    id: 'sets', title: 'Sets', tag: 'collections, taken seriously', branch: 'discrete', tier: 5, year: 1874,
    prereqs: ['counting'],
    why: { counting: 'Counting is secretly pairing sets: five sheep, five fingers. Cantor took "collection" seriously as an object — and mathematics found its bedrock (and its paradoxes).' },
    explain: 'The simplest possible idea — a bag of things — turned out to be strong enough to build ALL of mathematics on. Numbers, functions, spaces: officially, everything is a set.',
    problems: [
      { q: '{1,2,3} ∩ {2,3,4} = ?', a: '{2, 3}' },
      { q: 'How many subsets does a 3-element set have?', a: '8' },
    ],
  },
  {
    id: 'set-operations', title: 'Set Operations', tag: 'union, intersection, complement', branch: 'discrete', tier: 6, year: 1880,
    prereqs: ['sets'],
    explain: 'AND, OR, NOT for collections — drawn as Venn’s overlapping circles. Database queries, search filters, and probability events all compute with exactly these.',
    problems: [
      { q: '30 like math, 25 like music, 12 like both. Either?', a: '43' },
      { q: 'A ∪ (B ∩ C) distributes to…?', a: '(A∪B) ∩ (A∪C)' },
    ],
  },
  {
    id: 'proof-techniques', title: 'Proof Techniques', tag: 'the arsenal of certainty', branch: 'discrete', tier: 6, year: -300,
    prereqs: ['euclidean-proof', 'sets'],
    explain: 'Direct, contrapositive, contradiction, construction: the standard weapons. Contradiction is the boldest — assume the enemy’s position and watch it self-destruct (√2, infinite primes).',
    problems: [
      { q: 'To prove "if n² is even then n is even", easiest weapon?', a: 'Contrapositive' },
      { q: 'What does a single counterexample do?', a: 'Kills a universal claim' },
    ],
  },
  {
    id: 'induction', title: 'Induction', tag: 'the infinite domino run', branch: 'discrete', tier: 7, year: 1654,
    prereqs: ['proof-techniques', 'sequences'],
    why: { sequences: 'Prove it for 1; prove each case pushes the next — and infinitely many statements fall like dominoes. The only way finite minds certify infinite claims, one rung at a time.' },
    explain: 'Pascal formalized the ladder: base case plus inductive step equals proof for ALL n. Every formula "for all natural numbers" you have ever used was certified this way.',
    problems: [
      { q: 'The two mandatory parts of induction?', a: 'Base case + inductive step' },
      { q: 'Prove-by-induction target: 1+3+5+…+(2n−1) = ?', a: 'n²' },
    ],
  },
  {
    id: 'recursion', title: 'Recursion', tag: 'defined by itself', branch: 'discrete', tier: 7, year: 1888,
    prereqs: ['induction', 'sequences'],
    why: { induction: 'Recursion builds DOWN the same ladder induction climbs UP: solve the problem by solving a smaller self. Two views of one staircase.' },
    explain: 'Factorial calls factorial; the Sierpinski triangle contains three of itself. Programming’s most elegant idea and mathematics’ favorite mirror — anything self-similar speaks recursion.',
    problems: [
      { q: 'f(1)=1, f(n)=n·f(n−1). What is f?', a: 'Factorial' },
      { q: 'What must every recursion have to avoid falling forever?', a: 'A base case' },
    ],
  },
  {
    id: 'recurrence-relations', title: 'Recurrence Relations', tag: 'sequences with a rule engine', branch: 'discrete', tier: 9, year: 1202,
    prereqs: ['recursion', 'fibonacci-sequence'],
    explain: 'aₙ from earlier terms: Fibonacci, Towers of Hanoi, loan balances, population models. Solving one means finding a closed form — Binet’s formula computes Fibonacci #100 without the 99 before it.',
    problems: [
      { q: 'Hanoi: moves(n) = 2·moves(n−1)+1, moves(1)=1. moves(4)?', a: '15' },
      { q: 'Closed form of aₙ = 2aₙ₋₁, a₀ = 3?', a: '3 · 2ⁿ' },
    ],
  },
  {
    id: 'pigeonhole', title: 'Pigeonhole Principle', tag: 'too many pigeons', branch: 'discrete', tier: 7, year: 1834,
    prereqs: ['counting-principle', 'sets'],
    explain: 'More pigeons than holes forces a shared hole. Sounds like a joke; proves that two Londoners have identical hair counts, that any 5 points in a unit square include a close pair, and half of Ramsey theory.',
    problems: [
      { q: 'Socks of 2 colors in the dark: pulls to guarantee a pair?', a: '3' },
      { q: '13 people: two share a birth month — why?', a: '13 pigeons, 12 holes' },
    ],
  },
  {
    id: 'inclusion-exclusion', title: 'Inclusion–Exclusion', tag: 'count, subtract the double-counts', branch: 'discrete', tier: 8, year: 1854,
    prereqs: ['set-operations', 'counting-principle'],
    explain: 'Add the sets, subtract the overlaps, add back the triple-overlaps… The seesaw formula behind derangements — the famous "no one gets their own hat" count, which tends to n!/e.',
    problems: [
      { q: 'Multiples of 2 or 3 up to 30?', a: '15 + 10 − 5 = 20' },
      { q: 'P(no one gets their own hat), many hats?', a: '≈ 1/e ≈ 37%' },
    ],
  },
  {
    id: 'graph-theory', title: 'Graph Theory', tag: 'dots and connections', branch: 'discrete', tier: 7, year: 1736,
    prereqs: ['sets'],
    why: { sets: 'A graph is just two sets — vertices, and pairs of them (edges). From that austerity: social networks, molecules, circuits, the internet, and this very AXIOM board you are flying through.' },
    explain: 'Euler, asked whether Königsberg’s seven bridges could be walked once each, threw away everything but connection itself — and invented the mathematics of networks in one paper.',
    problems: [
      { q: 'Sum of all vertex degrees = ?', a: 'Twice the edge count' },
      { q: 'Edges in a complete graph on 5 vertices?', a: '10' },
    ],
  },
  {
    id: 'euler-paths', title: 'Euler Paths', tag: 'the seven bridges', branch: 'discrete', tier: 8, year: 1736,
    prereqs: ['graph-theory'],
    why: { 'graph-theory': 'Königsberg answered: a route crossing every edge once exists exactly when 0 or 2 vertices have odd degree. The first theorem of graph theory, and still the cleanest.' },
    explain: 'Every child who tried drawing the envelope-with-an-X without lifting the pen was doing Euler path theory. Snowplow routes and DNA sequencing still use it.',
    problems: [
      { q: 'Königsberg had 4 odd-degree vertices. Walkable?', a: 'No' },
      { q: 'When does a graph have an Euler CIRCUIT (return to start)?', a: 'All degrees even' },
    ],
  },
  {
    id: 'hamiltonian-paths', title: 'Hamiltonian Paths', tag: 'visit every city once', branch: 'discrete', tier: 8, year: 1857,
    prereqs: ['graph-theory'],
    explain: 'Visit every VERTEX once — deceptively similar to Euler’s problem, catastrophically harder. No fast test is known; this innocent-looking cousin sits at the heart of P vs NP.',
    problems: [
      { q: 'Euler easy, Hamilton hard — what changed?', a: 'Edges once → vertices once' },
      { q: 'Does a cube’s corner graph have a Hamiltonian cycle?', a: 'Yes' },
    ],
  },
  {
    id: 'trees', title: 'Trees', tag: 'graphs with no loops', branch: 'discrete', tier: 8, year: 1857,
    prereqs: ['graph-theory'],
    explain: 'Connected, cycle-free, and always exactly n−1 edges: the skeleton of hierarchy. File systems, family trees, tournament brackets, decision trees, and every database index are trees.',
    problems: [
      { q: 'A tree with 50 vertices has how many edges?', a: '49' },
      { q: 'Removing one tree edge does what?', a: 'Disconnects it' },
    ],
  },
  {
    id: 'graph-coloring', title: 'Graph Coloring', tag: 'the four color theorem', branch: 'discrete', tier: 9, year: 1852,
    prereqs: ['graph-theory'],
    explain: 'Any flat map needs only four colors — conjectured by a student coloring England’s counties, proved in 1976 by a COMPUTER checking 1,936 cases. Mathematicians are still arguing about whether that counts.',
    problems: [
      { q: 'Colors needed for a triangle of mutual neighbors?', a: '3' },
      { q: 'Exam scheduling is secretly which problem?', a: 'Graph coloring (conflicts = edges)' },
    ],
  },
  {
    id: 'planar-graphs', title: 'Planar Graphs', tag: 'drawable without crossings', branch: 'discrete', tier: 9, year: 1930,
    prereqs: ['graph-theory'],
    explain: 'Which networks lie flat? Kuratowski’s answer: exactly those avoiding two forbidden shapes (K₅ and the utilities graph K₃,₃). Circuit-board designers fight this theorem daily.',
    problems: [
      { q: 'Three houses, three utilities, no crossing lines: possible?', a: 'No — K₃,₃ is not planar' },
      { q: 'Euler’s formula for planar graphs?', a: 'V − E + F = 2' },
    ],
  },
  {
    id: 'ramsey-theory', title: 'Ramsey Theory', tag: 'total disorder is impossible', branch: 'discrete', tier: 10, year: 1930,
    prereqs: ['pigeonhole', 'graph-coloring'],
    explain: 'Among any 6 people, some 3 are mutual friends or mutual strangers — guaranteed. Scale it up and the numbers explode: R(5,5) is unknown, and Erdős said if aliens demand R(6,6), we should attack the aliens.',
    problems: [
      { q: 'R(3,3) = ?', a: '6' },
      { q: 'What does Ramsey theory guarantee inside any large enough system?', a: 'Pockets of order' },
    ],
  },
  {
    id: 'generating-functions', title: 'Generating Functions', tag: 'counting with power series', branch: 'discrete', tier: 10, year: 1730,
    prereqs: ['power-series', 'combinations'],
    why: { 'power-series': 'Stuff a counting sequence into the coefficients of a series and algebra does your combinatorics: multiply series = combine choices. "A clothesline on which we hang numbers" — Herbert Wilf.' },
    explain: 'The most magical technique in counting: ways to make change, partition numbers, Fibonacci in closed form — all fall to multiplying polynomials that were never meant to be evaluated.',
    problems: [
      { q: '(1+x)ⁿ generates which numbers?', a: 'The binomial coefficients' },
      { q: 'Generating function of 1,1,1,1,…?', a: '1/(1−x)' },
    ],
  },
  {
    id: 'boolean-algebra', title: 'Boolean Algebra', tag: 'algebra of true and false', branch: 'discrete', tier: 8, year: 1847,
    prereqs: ['propositional-logic', 'set-operations'],
    why: { 'propositional-logic': 'Boole turned AND/OR/NOT into equations you can calculate with — logic became arithmetic on {0, 1}. A century later Shannon noticed circuits do exactly this, and the computer was conceptually born.' },
    explain: 'Every chip in every device is Boolean algebra etched in silicon: billions of AND/OR/NOT gates evaluating your taps. The bridge from Aristotle to your phone.',
    problems: [
      { q: '1 AND (0 OR 1) = ?', a: '1' },
      { q: 'De Morgan: NOT(A AND B) = ?', a: '(NOT A) OR (NOT B)' },
    ],
  },
  {
    id: 'algorithms', title: 'Algorithms', tag: 'recipes for machines', branch: 'discrete', tier: 8, year: 820,
    prereqs: ['long-division', 'recursion'],
    why: { 'long-division': 'Long division was your first: a finite recipe of steps guaranteed to finish. The word itself is al-Khwarizmi’s name, worn smooth by Latin scribes.' },
    explain: 'Precise procedures that always terminate with an answer. Euclid wrote one 2,300 years ago; today they route your traffic, rank your feed, and match organ donors.',
    problems: [
      { q: 'The word "algorithm" comes from…?', a: 'al-Khwarizmi' },
      { q: 'Three required properties of an algorithm?', a: 'Precise steps, finite, produces output' },
    ],
  },
  {
    id: 'algorithm-analysis', title: 'Algorithm Analysis', tag: 'Big-O — the cost of steps', branch: 'discrete', tier: 9, year: 1965,
    prereqs: ['algorithms', 'functions'],
    why: { functions: 'Running time is a FUNCTION of input size; Big-O keeps only its growth shape. O(n log n) vs O(n²) decides whether the internet feels instant or unusable.' },
    explain: 'Why binary search finds one name in a billion in 30 steps, and why the naive shuffle check would outlive the sun. The difference between clever and brute-force, quantified.',
    problems: [
      { q: 'Binary search on 1,000,000 items: about how many steps?', a: '~20' },
      { q: 'Which grows faster: O(2ⁿ) or O(n¹⁰⁰)?', a: 'O(2ⁿ) — eventually crushes any polynomial' },
    ],
  },
  {
    id: 'automata', title: 'Automata', tag: 'the simplest machines', branch: 'discrete', tier: 10, year: 1943,
    prereqs: ['algorithms', 'boolean-algebra'],
    explain: 'Finite-state machines: a handful of states, transitions on input — vending machines, regex engines, game AI, traffic lights. The bottom rung of the ladder that ends at Turing machines.',
    problems: [
      { q: 'What does a finite automaton lack that a Turing machine has?', a: 'Unbounded memory (tape)' },
      { q: 'Text "find/replace" patterns run on which machine?', a: 'Finite automata (regex)' },
    ],
  },
  {
    id: 'complexity-theory', title: 'Complexity Theory', tag: 'what is feasibly computable?', branch: 'discrete', tier: 11, year: 1971,
    prereqs: ['algorithm-analysis', 'hamiltonian-paths'],
    why: { 'hamiltonian-paths': 'Some problems (Hamilton tours, scheduling, protein folding) have answers easy to CHECK but seemingly brutal to FIND — complexity theory names that wall: NP.' },
    explain: 'P: solvable fast. NP: checkable fast. Thousands of vital problems are "NP-complete" — crack one fast and you crack them all. The map of what computers can realistically ever do.',
    problems: [
      { q: 'Sudoku: checking vs solving — which class does each suggest?', a: 'Check = P-style, solve = NP-style' },
      { q: 'What does NP-complete mean for a problem?', a: 'Hardest in NP; fast-solve one ⇒ fast-solve all' },
    ],
  },
  {
    id: 'p-vs-np', title: 'P vs NP', tag: 'the million-dollar question', branch: 'discrete', tier: 12, year: 1971,
    prereqs: ['complexity-theory'],
    why: { 'complexity-theory': 'THE question: is checking secretly no easier than solving? If P = NP, cryptography dies and creativity becomes mechanical; most experts bet P ≠ NP — none can prove it.' },
    explain: 'A Millennium Prize problem with civilization-scale stakes: an efficient algorithm for any NP-complete problem would break encryption, optimize everything, and arguably automate mathematical insight itself.',
    problems: [
      { q: 'If P = NP, what happens to RSA-style encryption?', a: 'Broken — keys findable fast' },
      { q: 'Expert consensus (unproved)?', a: 'P ≠ NP' },
    ],
  },
  {
    id: 'bipartite-matching', title: 'Matching Theory', tag: 'pairing people to places', branch: 'discrete', tier: 10, year: 1962,
    prereqs: ['graph-theory'],
    explain: 'Gale–Shapley’s stable marriage algorithm pairs doctors to hospitals and students to schools so that NO pair would rather elope — it runs the real medical residency match and won a Nobel.',
    problems: [
      { q: 'A matching is "stable" when…?', a: 'No two would prefer each other over their matches' },
      { q: 'Which real system runs Gale–Shapley?', a: 'Medical residency match (NRMP)' },
    ],
  },
  {
    id: 'traveling-salesman', title: 'Traveling Salesman', tag: 'the shortest grand tour', branch: 'discrete', tier: 11, year: 1930,
    prereqs: ['hamiltonian-paths', 'algorithm-analysis'],
    explain: 'Cheapest route through all cities: NP-hard, yet planners must answer daily — so mathematics learned to settle for provably-near-best. A 85,900-city instance has been solved EXACTLY; general fast solutions would prove P = NP.',
    problems: [
      { q: 'Brute force on 20 cities: roughly how many routes?', a: '19!/2 ≈ 6×10¹⁶' },
      { q: 'Practical response to NP-hardness?', a: 'Approximation/heuristics with guarantees' },
    ],
  },
]
