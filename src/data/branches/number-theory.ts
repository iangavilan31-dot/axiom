import type { TopicNode } from '../types'

// Tier 6-14. The queen of mathematics.

export const NUMBER_THEORY: TopicNode[] = [
  {
    id: 'fundamental-theorem-arithmetic', title: 'Unique Factorization', tag: 'every number, one recipe', branch: 'number-theory', tier: 6, year: -300,
    prereqs: ['primes'],
    why: { primes: 'Every whole number is a product of primes in exactly ONE way — 84 is 2²·3·7 and nothing else, ever. Primes are not just atoms; the atomic decomposition is unique.' },
    explain: 'The theorem so fundamental it is named that. Uniqueness is the deep part — in exotic number systems it FAILS, and repairing that failure invented modern algebra.',
    problems: [
      { q: 'Factor 360 into primes.', a: '2³ · 3² · 5' },
      { q: 'How many distinct prime factorizations does 91 have?', a: 'One: 7 × 13' },
    ],
  },
  {
    id: 'infinitude-of-primes', title: 'Infinitude of Primes', tag: 'the supply never ends', branch: 'number-theory', tier: 6, year: -300,
    prereqs: ['primes', 'euclidean-proof'],
    why: { 'euclidean-proof': 'Euclid’s gem: multiply any finite list of primes, add 1 — the result dodges every prime on your list. Contradiction, beautifully cheap.' },
    explain: 'Perhaps the most elegant proof ever chalked, and 2,300 years old. Suppose the primes end; build a number they cannot divide; watch the assumption collapse in one line.',
    problems: [
      { q: '2·3·5 + 1 = 31. Divisible by 2, 3, or 5?', a: 'No — remainder 1 each time' },
      { q: 'What kind of proof is this?', a: 'Proof by contradiction' },
    ],
  },
  {
    id: 'sieve-of-eratosthenes', title: 'Sieve of Eratosthenes', tag: 'primes, harvested', branch: 'number-theory', tier: 6, year: -240,
    prereqs: ['primes', 'factors-multiples'],
    explain: 'List the numbers, strike out every multiple of each prime, and what survives is prime. A 2,200-year-old algorithm that modern computers still run essentially unchanged.',
    problems: [
      { q: 'Sieving to 30: which primes survive after striking 2, 3, 5?', a: '2,3,5,7,11,13,17,19,23,29' },
      { q: 'To sieve up to n you only strike multiples of primes up to…?', a: '√n' },
    ],
  },
  {
    id: 'modular-arithmetic', title: 'Modular Arithmetic', tag: 'clock math, weaponized', branch: 'number-theory', tier: 6, year: 1801,
    prereqs: ['clock-arithmetic'],
    why: { 'clock-arithmetic': 'Gauss, age 24, took the clock and made it an algebra: a ≡ b (mod n) turns remainders into a number system you can add, multiply, and prove theorems in.' },
    explain: 'Arithmetic where only remainders matter. Checksums, card numbers, calendars, and ALL modern cryptography compute mod n. The Disquisitiones (1801) opens with this and reinvents the field.',
    problems: [
      { q: '3⁴ mod 5 = ?', a: '1' },
      { q: 'What weekday is 1000 days after a Friday?', a: 'Sunday (1000 mod 7 = 6)' },
    ],
  },
  {
    id: 'congruences', title: 'Congruences', tag: 'equations on the clock', branch: 'number-theory', tier: 7, year: 1801,
    prereqs: ['modular-arithmetic', 'equations'],
    explain: 'Solve 3x ≡ 1 (mod 7) like a linear equation — but division only works when gcd says so. Barcode check digits catch typos with exactly this machinery.',
    problems: [
      { q: 'Solve 3x ≡ 1 (mod 7).', a: 'x ≡ 5' },
      { q: 'Does 2x ≡ 1 (mod 4) have a solution?', a: 'No — gcd(2,4) ∤ 1' },
    ],
  },
  {
    id: 'fermats-little-theorem', title: 'Fermat’s Little Theorem', tag: 'primes tame exponents', branch: 'number-theory', tier: 8, year: 1640,
    prereqs: ['congruences', 'exponents'],
    why: { exponents: 'For prime p: aᵖ⁻¹ ≡ 1 (mod p). Gigantic powers collapse to tiny remainders — the trick that makes computing 2^(10^9) mod p instant.' },
    explain: 'Fermat stated it in a letter, proof "too long to include" (his signature move). It powers primality testing and is the mathematical heart of RSA encryption.',
    problems: [
      { q: '2¹⁰⁰ mod 101 = ? (101 prime)', a: '1' },
      { q: '3⁶ mod 7 = ?', a: '1' },
    ],
  },
  {
    id: 'euler-totient', title: 'Euler’s Totient φ(n)', tag: 'counting the coprimes', branch: 'number-theory', tier: 8, year: 1763,
    prereqs: ['modular-arithmetic', 'gcd-lcm'],
    why: { 'gcd-lcm': 'φ(n) counts numbers below n sharing NO factor with it — gcd = 1. A counting function that turns out to guard internet banking.' },
    explain: 'φ(12) = 4 because only 1, 5, 7, 11 are coprime to 12. Innocent bookkeeping — until RSA needs φ(n) to be secret for its lock to hold.',
    problems: [
      { q: 'φ(10) = ?', a: '4 (1,3,7,9)' },
      { q: 'φ(p) for prime p?', a: 'p − 1' },
    ],
  },
  {
    id: 'eulers-theorem', title: 'Euler’s Theorem', tag: 'Fermat, generalized', branch: 'number-theory', tier: 9, year: 1763,
    prereqs: ['fermats-little-theorem', 'euler-totient'],
    why: { 'fermats-little-theorem': 'Drop the "p must be prime": a^φ(n) ≡ 1 (mod n) whenever gcd(a,n)=1. Euler widened Fermat’s key to fit every lock.' },
    explain: 'The exact theorem RSA encryption stands on: encrypt by raising to e, decrypt by raising to d, and Euler guarantees the round trip lands home.',
    problems: [
      { q: '3^φ(10) = 3⁴ mod 10 = ?', a: '1' },
      { q: 'Which internet protocol family leans on this?', a: 'RSA public-key cryptography' },
    ],
  },
  {
    id: 'chinese-remainder-theorem', title: 'Chinese Remainder Thm', tag: 'many clocks, one time', branch: 'number-theory', tier: 8, year: 400,
    prereqs: ['congruences'],
    explain: 'Sunzi, 4th century: "a number leaves 2 mod 3, 3 mod 5, 2 mod 7 — find it" (23). Remainders on coprime clocks pin a number uniquely; computers use it to split giant arithmetic into parallel small pieces.',
    problems: [
      { q: 'x ≡ 1 (mod 2), x ≡ 2 (mod 3): smallest positive x?', a: '5' },
      { q: 'Why must the moduli be coprime?', a: 'Otherwise clocks can contradict or overlap' },
    ],
  },
  {
    id: 'diophantine-equations', title: 'Diophantine Equations', tag: 'whole-number solutions only', branch: 'number-theory', tier: 7, year: 250,
    prereqs: ['equations', 'gcd-lcm'],
    why: { 'gcd-lcm': 'ax + by = c has integer solutions exactly when gcd(a,b) divides c — Euclid’s algorithm, run backwards, constructs them.' },
    explain: 'Equations that demand integer answers — you cannot buy 2.7 stamps. Diophantus’ book, scribbled in whose margin Fermat left his famous taunt, gave the genre its name.',
    problems: [
      { q: 'Integer solutions to 6x + 9y = 5?', a: 'None — gcd 3 doesn’t divide 5' },
      { q: 'One solution to 3x + 5y = 1?', a: 'x = 2, y = −1' },
    ],
  },
  {
    id: 'pythagorean-triples', title: 'Pythagorean Triples', tag: '3-4-5 and its infinite family', branch: 'number-theory', tier: 7, year: -1800,
    prereqs: ['pythagorean-theorem', 'diophantine-equations'],
    why: { 'pythagorean-theorem': 'Whole-number right triangles: which integers satisfy a² + b² = c²? Babylonians tabulated them on Plimpton 322 a millennium before Pythagoras breathed.' },
    explain: 'Infinitely many, all generated by one two-parameter formula. The innocent question "what about cubes?" hangs here like a loaded gun — see Fermat’s Last Theorem.',
    problems: [
      { q: 'Complete the triple: 8, 15, ?', a: '17' },
      { q: 'Is 5-12-13 a Pythagorean triple?', a: 'Yes (25+144=169)' },
    ],
  },
  {
    id: 'perfect-numbers', title: 'Perfect Numbers', tag: 'equal to their parts', branch: 'number-theory', tier: 7, year: -300,
    prereqs: ['factors-multiples'],
    explain: '6 = 1+2+3: a number equal to the sum of its proper divisors. Euclid tied them to Mersenne primes; Euler closed the loop 2,000 years later. No odd one has ever been found — still open.',
    problems: [
      { q: 'Verify 28 is perfect.', a: '1+2+4+7+14 = 28' },
      { q: 'Are any odd perfect numbers known?', a: 'No — open problem' },
    ],
  },
  {
    id: 'amicable-numbers', title: 'Amicable Numbers', tag: 'numbers in love', branch: 'number-theory', tier: 7, year: -500,
    prereqs: ['perfect-numbers'],
    explain: '220’s divisors sum to 284; 284’s sum to 220 — each is the other’s total. Pythagoreans exchanged them as friendship tokens; teenage Gauss-era prodigy Paganini found the pair 1184/1210 everyone had missed.',
    problems: [
      { q: 'The smallest amicable pair?', a: '220 and 284' },
      { q: 'A number amicable with itself is called…?', a: 'Perfect' },
    ],
  },
  {
    id: 'mersenne-primes', title: 'Mersenne Primes', tag: '2ᵖ − 1, the giants', branch: 'number-theory', tier: 8, year: 1644,
    prereqs: ['primes', 'exponents'],
    explain: 'Primes one less than a power of two. Every record-breaking largest-known prime is one — the current champions have tens of millions of digits, found by volunteers’ idle computers (GIMPS).',
    problems: [
      { q: 'Is 2⁵ − 1 = 31 prime?', a: 'Yes' },
      { q: 'Is 2¹¹ − 1 = 2047 prime?', a: 'No — 23 × 89' },
    ],
  },
  {
    id: 'fibonacci-sequence', title: 'Fibonacci Sequence', tag: '1, 1, 2, 3, 5, 8…', branch: 'number-theory', tier: 7, year: 1202,
    prereqs: ['sequences', 'golden-ratio'],
    why: {
      sequences: 'Each term is the sum of the previous two — the simplest possible memory-rule, generating structure everywhere from pinecones to Sanskrit poetry (which found it first).',
      'golden-ratio': 'Divide neighbors: 8/5, 13/8, 21/13… the ratios sneak up on φ forever. The rabbit sequence and the golden cut are one phenomenon.',
    },
    explain: 'Fibonacci posed it as a rabbit-breeding puzzle; India’s prosodists knew it centuries earlier. Sunflower spirals count 34/55 because Fibonacci packing is nature’s most efficient.',
    problems: [
      { q: 'Continue: 13, 21, 34, ?', a: '55' },
      { q: 'F(1)+F(2)+…+F(n) equals…?', a: 'F(n+2) − 1' },
    ],
  },
  {
    id: 'collatz-conjecture', title: 'Collatz Conjecture', tag: 'the 3n+1 trap', branch: 'number-theory', tier: 7, year: 1937,
    prereqs: ['sequences', 'division'],
    explain: 'Even? Halve it. Odd? Triple and add one. Every start ever tried falls to 1 — and nobody can prove it always does. Erdős: "Mathematics is not yet ripe for such questions." A child can play; no one can win.',
    problems: [
      { q: 'Run 6 through the rule until 1.', a: '6→3→10→5→16→8→4→2→1' },
      { q: 'Is the conjecture proved?', a: 'No — open since 1937' },
    ],
  },
  {
    id: 'continued-fractions', title: 'Continued Fractions', tag: 'numbers as infinite staircases', branch: 'number-theory', tier: 8, year: 1695,
    prereqs: ['fractions', 'gcd-lcm'],
    why: { 'gcd-lcm': 'Run Euclid’s gcd algorithm and KEEP the quotients — that trail of numbers is the continued fraction. The oldest algorithm, discovered to be a number’s truest name.' },
    explain: 'π = 3 + 1/(7 + 1/(15 + …)): cutting the staircase early gives the best possible fraction approximations — 22/7 and 355/113 fall right out. φ’s staircase is all 1s, which is why it is the "most irrational".',
    problems: [
      { q: 'The continued fraction of φ is…?', a: '[1; 1, 1, 1, …]' },
      { q: 'Which famous approximation comes from cutting π’s staircase?', a: '355/113 (and 22/7)' },
    ],
  },
  {
    id: 'quadratic-reciprocity', title: 'Quadratic Reciprocity', tag: 'Gauss’s golden theorem', branch: 'number-theory', tier: 10, year: 1801,
    prereqs: ['congruences', 'quadratic-equations'],
    explain: 'Whether p is a square mod q secretly mirrors whether q is a square mod p — two unrelated-looking questions, locked in reciprocity. Gauss loved it enough to prove it eight different ways.',
    problems: [
      { q: 'Is 2 a square mod 7?', a: 'Yes — 3² = 9 ≡ 2' },
      { q: 'How many proofs did Gauss himself publish?', a: 'Eight' },
    ],
  },
  {
    id: 'prime-distribution', title: 'Prime Distribution', tag: 'the rhythm of the primes', branch: 'number-theory', tier: 10, year: 1896,
    prereqs: ['primes', 'logarithms'],
    why: { logarithms: 'The Prime Number Theorem: near n, roughly 1 in ln(n) numbers is prime. The primes thin out on a logarithmic schedule — chaos with a drumbeat.' },
    explain: 'Individually lawless, collectively lawful: π(n) ≈ n/ln(n), conjectured by teenage Gauss from tables, proved a century later. The precision of that rhythm is the Riemann Hypothesis.',
    problems: [
      { q: 'About how many primes below 1,000,000?', a: '≈ 72,000 (actual 78,498)' },
      { q: 'Do primes eventually stop?', a: 'No — but they thin out like 1/ln n' },
    ],
  },
  {
    id: 'goldbach-conjecture', title: 'Goldbach Conjecture', tag: 'every even = prime + prime', branch: 'number-theory', tier: 9, year: 1742,
    prereqs: ['primes', 'addition'],
    explain: 'Every even number past 2 seems to be two primes: 28 = 5+23. Checked to 4×10¹⁸, proved never. A letter from 1742 that three centuries of genius has not answered.',
    problems: [
      { q: 'Write 36 as two primes.', a: '7 + 29 (or 5+31, 13+23, 17+19)' },
      { q: 'Status of the conjecture?', a: 'Open — verified enormously, proved never' },
    ],
  },
  {
    id: 'twin-primes', title: 'Twin Primes', tag: 'primes holding hands', branch: 'number-theory', tier: 9, year: 1849,
    prereqs: ['primes'],
    explain: 'Pairs like 11,13 and 101,103 — do they ever run out? Unknown. But in 2013 Yitang Zhang, an unknown lecturer, stunned mathematics by proving SOME gap repeats forever; the world then raced it down from 70 million to 246.',
    problems: [
      { q: 'Find the twin pair after 17, 19.', a: '29, 31' },
      { q: 'What did Zhang prove in 2013?', a: 'Infinitely many prime pairs within a bounded gap' },
    ],
  },
  {
    id: 'partitions', title: 'Partitions', tag: 'how many ways to break a number', branch: 'number-theory', tier: 9, year: 1918,
    prereqs: ['combinations', 'addition'],
    explain: '4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1: five partitions. Ramanujan, self-taught in Madras, saw patterns here nobody dreamed of — p(5k+4) is always divisible by 5. His notebooks still yield theorems.',
    problems: [
      { q: 'p(5) = ?', a: '7' },
      { q: 'Whose "lost notebook" revolutionized partitions?', a: 'Ramanujan’s' },
    ],
  },
  {
    id: 'transcendental-numbers', title: 'Transcendental Numbers', tag: 'beyond all equations', branch: 'number-theory', tier: 11, year: 1844,
    prereqs: ['irrational-numbers', 'polynomials'],
    why: { polynomials: 'Some numbers satisfy NO polynomial equation with integer coefficients at all — not just irrational but algebraically untouchable. π is one; that is why circle-squaring is impossible.' },
    explain: 'Liouville built the first on purpose; Hermite proved e transcendental (1873), Lindemann got π (1882) and killed the 2,000-year circle-squaring dream in one stroke. Almost ALL numbers are transcendental — we can name almost none.',
    problems: [
      { q: 'Is √2 transcendental?', a: 'No — it solves x² = 2 (algebraic)' },
      { q: 'Which 1882 result ended circle-squaring?', a: 'π is transcendental' },
    ],
  },
  {
    id: 'elliptic-curves', title: 'Elliptic Curves', tag: 'cubic curves with a secret law', branch: 'number-theory', tier: 12, year: 1901,
    prereqs: ['polynomial-graphs', 'modular-arithmetic'],
    why: { 'polynomial-graphs': 'y² = x³ + ax + b: on this cubic, two points ADD to give a third — the curve carries a hidden arithmetic. Geometry that computes.' },
    explain: 'The most load-bearing objects in modern number theory: they encrypt your messages (ECC), they proved Fermat’s Last Theorem, and their deepest secrets (BSD conjecture) carry a million-dollar bounty.',
    problems: [
      { q: 'What shape is the equation y² = x³ + ax + b?', a: 'An elliptic curve' },
      { q: 'Name one place they guard data.', a: 'ECC keys (Bitcoin, TLS, Signal)' },
    ],
  },
  {
    id: 'fermats-last-theorem', title: 'Fermat’s Last Theorem', tag: 'the 358-year margin note', branch: 'number-theory', tier: 13, year: 1995,
    prereqs: ['pythagorean-triples', 'elliptic-curves'],
    why: {
      'pythagorean-triples': 'Squares split into squares infinitely often. Cubes never do, nor any higher power — Fermat scribbled "I have a truly marvelous proof… this margin is too narrow" and died leaving nothing.',
      'elliptic-curves': 'The actual proof (Wiles, 1995): a solution would forge an elliptic curve too strange to exist. Three centuries of failure ended by connecting two unrelated continents of math.',
    },
    explain: 'Andrew Wiles read the problem at age 10, worked in secret for 7 years, announced, found a hole, and with one former student repaired it in a final year. The most famous single problem in the history of mathematics.',
    problems: [
      { q: 'Does a³ + b³ = c³ have positive integer solutions?', a: 'No — FLT, n=3' },
      { q: 'Who proved it, and when?', a: 'Andrew Wiles, 1994/95' },
    ],
  },
  {
    id: 'analytic-number-theory', title: 'Analytic Number Theory', tag: 'calculus invades the integers', branch: 'number-theory', tier: 12, year: 1837,
    prereqs: ['prime-distribution', 'infinite-series'],
    why: { 'infinite-series': 'Dirichlet proved primes fill every valid arithmetic progression — using infinite series to count discrete things. Continuous weapons, discrete war.' },
    explain: 'Euler noticed Σ1/nˢ factors over the primes; Riemann made s complex and the zeta function was born. The bridge on which analysis and arithmetic trade their deepest secrets.',
    problems: [
      { q: 'Euler’s product links ζ(s) to…?', a: 'A product over all primes' },
      { q: 'ζ(2) = ?', a: 'π²/6' },
    ],
  },
  {
    id: 'riemann-hypothesis', title: 'Riemann Hypothesis', tag: 'the greatest unsolved problem', branch: 'number-theory', tier: 14, year: 1859,
    prereqs: ['analytic-number-theory', 'complex-analysis'],
    why: {
      'analytic-number-theory': 'Riemann’s 8-page paper: the zeta function’s zeros conduct the primes’ rhythm. Pin the zeros to one critical line and the primes’ deepest order is revealed.',
      'complex-analysis': 'The zeta zeros live in the complex plane — the conjecture is a statement about where, and every tool of complex analysis has been thrown at it for 165 years.',
    },
    explain: 'A million-dollar Millennium Problem, Hilbert’s obsession ("Has the Riemann hypothesis been proven?" — his first question upon waking in 500 years), and the axis around which modern number theory silently turns. Ten trillion zeros checked; zero proofs.',
    problems: [
      { q: 'Where must the nontrivial zeros lie, per the hypothesis?', a: 'On the line Re(s) = 1/2' },
      { q: 'The bounty for a proof?', a: '$1,000,000 (Clay Millennium Prize)' },
    ],
  },
]
