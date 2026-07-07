import type { TopicNode } from '../types'

// Tier 5-10. Letters enter the board.

export const ALGEBRA: TopicNode[] = [
  {
    id: 'variables', title: 'Variables', tag: 'letters stand in for numbers', branch: 'algebra', tier: 5, year: 820,
    prereqs: ['order-of-operations'],
    why: { 'order-of-operations': 'Once every expression means exactly one thing, you can afford to leave a blank in it — and the blank gets a name: x.' },
    explain: 'Al-Khwarizmi’s al-jabr gave us a way to talk about a number before knowing it. The single most powerful abbreviation ever chalked: all of algebra is downstream of the letter x.',
    problems: [
      { q: 'If x = 7, what is 3x − 5?', a: '16' },
      { q: 'Write "five more than double a number" using n.', a: '2n + 5' },
    ],
  },
  {
    id: 'expressions', title: 'Expressions', tag: 'number sentences with blanks', branch: 'algebra', tier: 6, year: 820,
    prereqs: ['variables'],
    explain: 'Combinations of numbers, variables, and operations — recipes waiting for inputs. Simplifying expressions is arithmetic performed on things you haven’t met yet.',
    problems: [
      { q: 'Simplify 3x + 5x − 2.', a: '8x − 2' },
      { q: 'Expand 4(2x + 3).', a: '8x + 12' },
    ],
  },
  {
    id: 'equations', title: 'Equations', tag: 'a balance to keep', branch: 'algebra', tier: 6, year: 820,
    prereqs: ['variables'],
    why: { variables: 'Set two expressions equal and the unknown becomes catchable: whatever you do to one side, do to the other, until x stands alone.' },
    explain: 'A scale with an unknown weight on it. Solving means undoing operations in reverse — every inverse from arithmetic finally earns its keep.',
    problems: [
      { q: 'Solve 3x + 7 = 22.', a: 'x = 5' },
      { q: 'Solve 5(x − 2) = 30.', a: 'x = 8' },
    ],
  },
  {
    id: 'linear-equations', title: 'Linear Equations', tag: 'the straight-line family', branch: 'algebra', tier: 7, year: 820,
    prereqs: ['equations'],
    explain: 'Equations where x never gets squared — steady, proportional change. They model constant speed, flat rates, and straight lines, and they are the one family mathematics can ALWAYS solve.',
    problems: [
      { q: 'Solve 2x + 3 = 7x − 12.', a: 'x = 3' },
      { q: 'A taxi costs $3 plus $2/mile. How far for $19?', a: '8 miles' },
    ],
  },
  {
    id: 'inequalities', title: 'Inequalities', tag: 'when equal is too much to ask', branch: 'algebra', tier: 7, year: 1631,
    prereqs: ['equations', 'number-line'],
    explain: 'Solutions become whole regions instead of single points. One treacherous rule: multiply by a negative and the inequality flips — direction matters on the number line.',
    problems: [
      { q: 'Solve −2x + 5 > 11.', a: 'x < −3' },
      { q: 'Which integers satisfy 3 ≤ 2n − 1 < 9?', a: 'n = 2, 3, 4' },
    ],
  },
  {
    id: 'graphing-lines', title: 'Graphing Lines', tag: 'equations become pictures', branch: 'algebra', tier: 7, year: 1637,
    prereqs: ['linear-equations', 'coordinate-plane'],
    why: {
      'coordinate-plane': 'Descartes’ grid lets an equation cast a shadow you can SEE: every solution of y = 2x + 1 is a point, and together they draw a line.',
      'linear-equations': 'Each linear equation owns exactly one straight line — algebra and geometry become the same subject.',
    },
    explain: 'The marriage of algebra and geometry. Solving equations becomes finding where pictures cross — a single idea that carries all the way to calculus.',
    problems: [
      { q: 'Where does y = 2x − 6 cross the x-axis?', a: '(3, 0)' },
      { q: 'Do y = 3x + 1 and y = 3x − 4 ever meet?', a: 'No — parallel (same slope)' },
    ],
  },
  {
    id: 'slope', title: 'Slope', tag: 'steepness as a number', branch: 'algebra', tier: 8, year: 1637,
    prereqs: ['graphing-lines', 'ratios'],
    why: { ratios: 'Slope is a ratio — rise over run. How much y changes per one step of x.' },
    explain: 'One number that captures a line’s whole attitude. Slope is rate of change — speed, price per unit, growth per year — and the derivative upstairs is nothing but slope, perfected.',
    problems: [
      { q: 'Slope through (1, 2) and (5, 10)?', a: '2' },
      { q: 'A line drops 3 for every 4 right. Slope?', a: '−3/4' },
    ],
  },
  {
    id: 'systems-of-equations', title: 'Systems of Equations', tag: 'several truths at once', branch: 'algebra', tier: 8, year: -200,
    prereqs: ['linear-equations', 'graphing-lines'],
    explain: 'Two unknowns, two equations, one point that satisfies both — the crossing of two lines. Chinese scholars solved these two millennia ago with a method we now call matrix elimination.',
    problems: [
      { q: 'Solve x + y = 10, x − y = 4.', a: 'x = 7, y = 3' },
      { q: '3 pens + 2 pencils = $8; 1 pen + 2 pencils = $4. Pen price?', a: '$2' },
    ],
  },
  {
    id: 'polynomials', title: 'Polynomials', tag: 'x, x², x³ — stacked', branch: 'algebra', tier: 7, year: 1600,
    prereqs: ['expressions', 'exponents'],
    explain: 'Sums of powers of x. The most well-behaved functions in existence — computers evaluate almost everything by secretly using them, and calculus will approximate the whole world with them.',
    problems: [
      { q: 'Degree of 4x³ − x + 7?', a: '3' },
      { q: '(x + 2)(x + 5) = ?', a: 'x² + 7x + 10' },
    ],
  },
  {
    id: 'factoring', title: 'Factoring', tag: 'un-multiplying polynomials', branch: 'algebra', tier: 8, year: 1600,
    prereqs: ['polynomials', 'factors-multiples'],
    why: { 'factors-multiples': 'Numbers break into primes; polynomials break into simpler polynomials. Same instinct, bigger prey.' },
    explain: 'Rewriting a polynomial as a product. The payoff: a product equals zero only when a factor does — so factoring turns equations into a list of roots.',
    problems: [
      { q: 'Factor x² + 7x + 12.', a: '(x + 3)(x + 4)' },
      { q: 'Factor x² − 25.', a: '(x − 5)(x + 5)' },
    ],
  },
  {
    id: 'quadratic-equations', title: 'Quadratic Equations', tag: 'when x meets x²', branch: 'algebra', tier: 8, year: -1800,
    prereqs: ['polynomials', 'factoring'],
    explain: 'Equations of thrown balls, folded areas, and profit peaks. Babylonians solved them on clay 3,800 years ago. Two solutions, always — once you allow every kind of number.',
    problems: [
      { q: 'Solve x² − 5x + 6 = 0.', a: 'x = 2 or x = 3' },
      { q: 'A square’s area is 144. Side length?', a: '12' },
    ],
  },
  {
    id: 'completing-the-square', title: 'Completing the Square', tag: 'literally building a square', branch: 'algebra', tier: 9, year: 820,
    prereqs: ['quadratic-equations'],
    why: { 'quadratic-equations': 'Al-Khwarizmi solved x² + 10x = 39 by drawing an actual square and filling in its missing corner. Geometry doing algebra’s homework.' },
    explain: 'Rearranging any quadratic into "(something)² = number". It is the move that PROVES the quadratic formula, finds circle centers, and reappears inside integrals.',
    problems: [
      { q: 'Write x² + 6x + 2 as (x+a)² + b.', a: '(x + 3)² − 7' },
      { q: 'Solve x² + 4x = 21 by completing the square.', a: 'x = 3 or x = −7' },
    ],
  },
  {
    id: 'quadratic-formula', title: 'The Quadratic Formula', tag: 'one key for every quadratic', branch: 'algebra', tier: 9, year: 1637,
    prereqs: ['completing-the-square', 'square-roots'],
    why: { 'completing-the-square': 'Complete the square on ax² + bx + c = 0 with letters instead of numbers, and the formula falls out — it is that trick, done once, forever.' },
    explain: 'x = (−b ± √(b²−4ac)) / 2a. The discriminant under the root even tells you in advance how many solutions exist. Galois will one day prove degree five has no such key — see the far side of the board.',
    problems: [
      { q: 'Solve 2x² + 3x − 2 = 0.', a: 'x = ½ or x = −2' },
      { q: 'How many real roots does x² + x + 1 = 0 have?', a: 'None (discriminant −3)' },
    ],
  },
  {
    id: 'parabolas', title: 'Parabolas', tag: 'the throw-a-ball curve', branch: 'algebra', tier: 9, year: 1637,
    prereqs: ['quadratic-equations', 'graphing-lines'],
    explain: 'The graph of every quadratic: one perfect arc with a vertex and a mirror line. Balls, fountains, satellite dishes, headlight mirrors — the same curve, everywhere.',
    problems: [
      { q: 'Vertex of y = (x − 3)² + 2?', a: '(3, 2)' },
      { q: 'Max height of h = −5t² + 20t?', a: '20 (at t = 2)' },
    ],
  },
  {
    id: 'functions', title: 'Functions', tag: 'machines that eat numbers', branch: 'algebra', tier: 8, year: 1734,
    prereqs: ['equations', 'graphing-lines'],
    why: { equations: 'An equation is a question; a function is the machine that answers it for EVERY input at once. f(x) is the single most-used notation above this point on the board.' },
    explain: 'A rule assigning each input exactly one output. From here on, mathematics stops studying numbers and starts studying the machines between them — calculus, analysis, and category theory are all function-worship.',
    problems: [
      { q: 'f(x) = x² − 3x. Find f(5).', a: '10' },
      { q: 'Is x² + y² = 25 a function of x?', a: 'No — two y values per x' },
    ],
  },
  {
    id: 'function-transformations', title: 'Function Transformations', tag: 'shift, stretch, flip', branch: 'algebra', tier: 9, year: 1800,
    prereqs: ['functions'],
    explain: 'f(x) + 3 slides up; f(x − 2) slides right; −f(x) flips. Every graph you will ever meet is a familiar shape wearing these three disguises.',
    problems: [
      { q: 'How does y = (x + 1)² − 4 relate to y = x²?', a: 'Left 1, down 4' },
      { q: 'Which transformation is y = f(−x)?', a: 'Reflection across the y-axis' },
    ],
  },
  {
    id: 'inverse-functions', title: 'Inverse Functions', tag: 'the machine, run backwards', branch: 'algebra', tier: 9, year: 1800,
    prereqs: ['functions'],
    why: { functions: 'Swap input and output and you undo the machine — the board’s favorite move (subtraction, division, roots, logs) finally stated in general.' },
    explain: 'f⁻¹ undoes f. Graphically it is a mirror across y = x. Logarithms, roots, and arcsin are all just inverses of machines you already know.',
    problems: [
      { q: 'Inverse of f(x) = 2x + 6?', a: 'f⁻¹(x) = (x − 6)/2' },
      { q: 'If f(3) = 11, what is f⁻¹(11)?', a: '3' },
    ],
  },
  {
    id: 'exponential-functions', title: 'Exponential Functions', tag: 'growth that compounds', branch: 'algebra', tier: 9, year: 1683,
    prereqs: ['functions', 'exponents'],
    why: { exponents: 'Put x in the exponent and growth feeds on itself — populations, interest, pandemics. The variable changed seats and everything changed.' },
    explain: 'y = 2ˣ doubles forever; nothing polynomial can keep up. Bernoulli asked what compounding continuously would pay and discovered e ≈ 2.718 — the natural growth constant that haunts the rest of the board.',
    problems: [
      { q: 'A dish of bacteria doubles hourly, starts at 100. After 6 hours?', a: '6,400' },
      { q: 'Solve 3ˣ = 81.', a: 'x = 4' },
    ],
  },
  {
    id: 'logarithms', title: 'Logarithms', tag: 'exponents, asked backwards', branch: 'algebra', tier: 9, year: 1614,
    prereqs: ['exponents', 'inverse-functions'],
    why: {
      exponents: 'log₂ 32 asks: 2 to WHAT power gives 32? The exponent, hunted.',
      'inverse-functions': 'The logarithm is literally the inverse machine of the exponential — mirror twins across y = x.',
    },
    explain: 'Napier built logs to turn multiplication into addition, and they carried every navigator, astronomer, and engineer for 350 years before calculators. They still measure earthquakes, sound, and information.',
    problems: [
      { q: 'log₁₀ 1000 = ?', a: '3' },
      { q: 'Write log(ab²) using log a and log b.', a: 'log a + 2 log b' },
    ],
  },
  {
    id: 'log-scales', title: 'Log Scales', tag: 'seeing across ten orders of magnitude', branch: 'algebra', tier: 10, year: 1935,
    prereqs: ['logarithms'],
    explain: 'Richter, decibels, pH, pandemic charts: when data spans from 1 to 1,000,000,000, plot its logarithm. Each step means "times ten" — multiplication flattened into equal paces.',
    problems: [
      { q: 'A magnitude-7 quake vs magnitude-5: how many times stronger shaking?', a: '100×' },
      { q: 'On a log scale, exponential growth looks like…?', a: 'A straight line' },
    ],
  },
  {
    id: 'sequences', title: 'Sequences', tag: 'numbers marching in order', branch: 'algebra', tier: 8, year: 1202,
    prereqs: ['functions'],
    why: { functions: 'A sequence is a function that eats positions: give it "17th" and it hands back the 17th term.' },
    explain: 'Ordered lists with a rule: arithmetic ones add a fixed step, geometric ones multiply. The question "where is this heading?" becomes the concept of limit — the doorway to calculus.',
    problems: [
      { q: '5, 8, 11, 14, … what is the 20th term?', a: '62' },
      { q: '3, 6, 12, 24, … which type and what ratio?', a: 'Geometric, ratio 2' },
    ],
  },
  {
    id: 'series', title: 'Series', tag: 'adding a whole list', branch: 'algebra', tier: 9, year: 1350,
    prereqs: ['sequences'],
    why: { sequences: 'Take a sequence, refuse to stop adding. Young Gauss summed 1..100 in seconds; the infinite version splits the board wide open.' },
    explain: 'The sum of a sequence. Finite ones have formulas; infinite ones sometimes settle on a value — ½ + ¼ + ⅛ + … = 1 — and sometimes explode. Deciding which is a calculus superpower.',
    problems: [
      { q: '1 + 2 + 3 + … + 100 = ?', a: '5050' },
      { q: '½ + ¼ + ⅛ + … forever = ?', a: '1' },
    ],
  },
  {
    id: 'summation-notation', title: 'Summation Notation', tag: 'Σ — the sum, compressed', branch: 'algebra', tier: 9, year: 1755,
    prereqs: ['series'],
    explain: 'Euler’s Σ packs "add these up from i = 1 to n" into one glyph. Learn to read it and half the notation of statistics and calculus unlocks at once.',
    problems: [
      { q: 'Σᵢ₌₁⁴ i² = ?', a: '30' },
      { q: 'Write 2+4+6+…+20 in Σ notation.', a: 'Σᵢ₌₁¹⁰ 2i' },
    ],
  },
  {
    id: 'binomial-theorem', title: 'Binomial Theorem', tag: '(a+b)ⁿ without the pain', branch: 'algebra', tier: 9, year: 1654,
    prereqs: ['polynomials', 'combinations'],
    why: { combinations: 'The coefficient of aᵏbⁿ⁻ᵏ counts the WAYS to choose which k parentheses donate an a — expansion is a counting problem in disguise.' },
    explain: 'Pascal’s triangle hands you the expansion of (a+b)ⁿ instantly. Newton then let n be a fraction and broke the theorem open into infinite series — one of his first great weapons.',
    problems: [
      { q: 'Expand (x + 1)³.', a: 'x³ + 3x² + 3x + 1' },
      { q: 'Coefficient of x²y³ in (x + y)⁵?', a: '10' },
    ],
  },
  {
    id: 'complex-numbers', title: 'Complex Numbers', tag: 'the square root of −1', branch: 'algebra', tier: 9, year: 1545,
    prereqs: ['square-roots', 'negative-numbers'],
    why: {
      'square-roots': 'No real number squares to −1 — so Cardano, mid-formula, held his nose and used one anyway. It worked. i was born from refusing to stop.',
      'negative-numbers': 'The same move that built negatives: extend the numbers so the operation always succeeds. This is the LAST extension — after i, every polynomial equation has solutions.',
    },
    explain: 'Numbers of the form a + bi. They began as a trick inside cubic formulas and ended up running electrical engineering, quantum mechanics, and the deepest theorems on this board.',
    problems: [
      { q: '(2 + 3i) + (4 − i) = ?', a: '6 + 2i' },
      { q: 'i² · i² = ?', a: '1' },
    ],
  },
  {
    id: 'complex-plane', title: 'The Complex Plane', tag: 'numbers become 2D', branch: 'algebra', tier: 10, year: 1806,
    prereqs: ['complex-numbers', 'coordinate-plane'],
    why: { 'complex-numbers': 'Real part east, imaginary part north — every complex number is a POINT. Multiplication becomes rotation, and suddenly i makes visual sense: it is a quarter turn.' },
    explain: 'Argand’s picture turned a suspicious algebraic trick into geometry. Multiplying by i rotates 90°; multiplying numbers adds their angles. Fractals and Euler’s identity live here.',
    problems: [
      { q: 'Where does multiplying by i send the point 3 (on the real axis)?', a: 'To 3i (rotated 90°)' },
      { q: '|3 + 4i| = ?', a: '5' },
    ],
  },
  {
    id: 'polynomial-division', title: 'Polynomial Division', tag: 'long division, with letters', branch: 'algebra', tier: 9, year: 1600,
    prereqs: ['polynomials', 'long-division'],
    why: { 'long-division': 'The exact same algorithm you ran on digits, run on powers of x — divide, multiply, subtract, bring down. Remainders included.' },
    explain: 'Dividing polynomials reveals their factors and roots. The Remainder Theorem is the punchline: dividing by (x − a) leaves exactly f(a) behind.',
    problems: [
      { q: '(x² + 5x + 6) ÷ (x + 2) = ?', a: 'x + 3' },
      { q: 'Remainder of x³ − 2x + 1 divided by (x − 2)?', a: '5' },
    ],
  },
  {
    id: 'rational-functions', title: 'Rational Functions', tag: 'fractions made of polynomials', branch: 'algebra', tier: 9, year: 1700,
    prereqs: ['polynomials', 'fractions'],
    explain: 'Polynomial over polynomial. Near a zero of the bottom the graph blows up into an asymptote — your first controlled encounter with infinity, drawn in chalk.',
    problems: [
      { q: 'Where is y = 1/(x − 3) undefined?', a: 'x = 3' },
      { q: 'Horizontal asymptote of y = (2x + 1)/(x − 5)?', a: 'y = 2' },
    ],
  },
  {
    id: 'partial-fractions', title: 'Partial Fractions', tag: 'un-adding fractions', branch: 'algebra', tier: 10, year: 1702,
    prereqs: ['rational-functions', 'factoring'],
    explain: 'Splitting one complicated fraction into simple ones — the reverse of finding a common denominator. Looks like bookkeeping; becomes the key that unlocks whole families of integrals.',
    problems: [
      { q: 'Split 1/(x(x+1)) into two fractions.', a: '1/x − 1/(x+1)' },
      { q: 'Why bother? (one reason)', a: 'Simple pieces can be integrated / summed easily' },
    ],
  },
  {
    id: 'variation', title: 'Direct & Inverse Variation', tag: 'together, or in trade-off', branch: 'algebra', tier: 8, year: 1687,
    prereqs: ['ratios', 'functions'],
    explain: 'y = kx: double one, double the other. y = k/x: double one, halve the other. Gravity, gas pressure, and gear ratios speak this dialect — physics is mostly variation statements.',
    problems: [
      { q: 'y varies directly with x; y = 12 when x = 3. Find y at x = 7.', a: '28' },
      { q: 'Light intensity varies as 1/d². Twice as far = ?', a: '¼ the intensity' },
    ],
  },
  {
    id: 'polynomial-graphs', title: 'Polynomial Graphs', tag: 'wiggles, ends, and roots', branch: 'algebra', tier: 9, year: 1700,
    prereqs: ['polynomials', 'parabolas'],
    explain: 'Degree counts the possible wiggles; the leading term dictates where the tails fly; roots are where it touches ground. Read those three and you can sketch any polynomial blind.',
    problems: [
      { q: 'Max number of turns for a degree-4 polynomial?', a: '3' },
      { q: 'End behavior of y = −x³?', a: 'Up on the left, down on the right' },
    ],
  },
  {
    id: 'fundamental-theorem-algebra', title: 'Fundamental Thm of Algebra', tag: 'every polynomial surrenders', branch: 'algebra', tier: 10, year: 1799,
    prereqs: ['complex-numbers', 'polynomial-graphs'],
    why: { 'complex-numbers': 'Allow complex roots and NO polynomial can escape: degree n means exactly n roots. The number system is finally big enough. Gauss proved it at 21.' },
    explain: 'Every polynomial equation has a full set of solutions inside the complex numbers. The centuries-long project of extending numbers — negatives, fractions, irrationals, i — closes with this theorem.',
    problems: [
      { q: 'How many roots (with repeats) does x⁵ − 3x + 1 have in ℂ?', a: '5' },
      { q: 'x² + 1 = 0 has which roots?', a: 'i and −i' },
    ],
  },
]
