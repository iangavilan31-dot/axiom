// The SAT Math universe: the four College Board content domains, each a cluster of
// skills, each skill lit by SOLVING real SAT-style problems (retrieval practice).
// Weights follow the Digital SAT blueprint: Algebra ~35%, Advanced ~35%,
// Problem-Solving & Data ~15%, Geometry & Trig ~15%.

export type SatDomainId = 'algebra' | 'advanced' | 'data' | 'geometry'

export interface SatProblem {
  q: string
  /** 4 options → multiple choice; omit → student-produced (grid-in) */
  choices?: string[]
  /** 'A'|'B'|'C'|'D' for MC, else the canonical grid-in answer */
  answer: string
  /** extra accepted grid-in forms (e.g. '0.375' for '3/8') */
  accept?: string[]
  solution: string
}

export interface SatSkill {
  id: string
  title: string
  domain: SatDomainId
  blurb: string
  prereqs?: string[]
  problems: SatProblem[]
}

export interface SatDomain {
  id: SatDomainId
  name: string
  color: string
  weightPct: number
}

export const SAT_DOMAINS: SatDomain[] = [
  { id: 'algebra', name: 'Algebra', color: '#ff9558', weightPct: 35 },
  { id: 'advanced', name: 'Advanced Math', color: '#ff6b5e', weightPct: 35 },
  { id: 'data', name: 'Problem-Solving & Data', color: '#7bd88f', weightPct: 15 },
  { id: 'geometry', name: 'Geometry & Trig', color: '#7f9cff', weightPct: 15 },
]

export const SAT_SKILLS: SatSkill[] = [
  // ---------------- ALGEBRA ----------------
  {
    id: 's-lineq1', title: 'Linear Equations (1 variable)', domain: 'algebra',
    blurb: 'Isolate x by undoing operations in reverse.',
    problems: [
      { q: 'If 3(x − 4) = 2x + 5, what is the value of x?', answer: '17',
        solution: '3x − 12 = 2x + 5 → x − 12 = 5 → x = 17.' },
      { q: '5 − 2(x + 1) = 9. What is x?', choices: ['−3', '−2', '2', '7'], answer: 'A',
        solution: '5 − 2x − 2 = 9 → 3 − 2x = 9 → −2x = 6 → x = −3.' },
      { q: 'If x/4 + 3 = 7, what is x?', answer: '16',
        solution: 'x/4 = 4 → x = 16.' },
    ],
  },
  {
    id: 's-lineq2', title: 'Linear Equations (2 variables)', domain: 'algebra',
    blurb: 'A line is every (x, y) that satisfies the equation.', prereqs: ['s-lineq1'],
    problems: [
      { q: 'For 2x + 3y = 12, what is y when x = 3?', answer: '2',
        solution: '6 + 3y = 12 → 3y = 6 → y = 2.' },
      { q: 'A line passes through (0, −1) and (2, 3). Which is its equation?',
        choices: ['y = 2x − 1', 'y = 2x + 1', 'y = x − 1', 'y = −2x − 1'], answer: 'A',
        solution: 'Slope = (3 − (−1))/(2 − 0) = 4/2 = 2. Intercept is −1, so y = 2x − 1.' },
    ],
  },
  {
    id: 's-slope', title: 'Slope & Linear Models', domain: 'algebra',
    blurb: 'Slope = rate of change. Read what it means in context.', prereqs: ['s-lineq2'],
    problems: [
      { q: 'A candle’s height is h = 12 − 1.5t (h in inches, t in hours). What does 1.5 represent?',
        choices: ['Inches burned per hour', 'Starting height', 'Hours to burn out', 'Height after 1 hour'],
        answer: 'A', solution: 'The coefficient of t is the rate of change: the candle loses 1.5 inches each hour.' },
      { q: 'A line passes through (2, 7) and (5, 16). What is its slope?', answer: '3',
        solution: 'Slope = (16 − 7)/(5 − 2) = 9/3 = 3.' },
    ],
  },
  {
    id: 's-systems', title: 'Systems of Equations', domain: 'algebra',
    blurb: 'Two lines, one crossing point that satisfies both.', prereqs: ['s-slope'],
    problems: [
      { q: '2x + y = 8 and y = x − 1. What is the value of x?',
        choices: ['2', '3', '4', '5'], answer: 'B',
        solution: 'Substitute: 2x + (x − 1) = 8 → 3x − 1 = 8 → 3x = 9 → x = 3.' },
      { q: 'x + y = 10 and x − y = 4. What is x?', answer: '7',
        solution: 'Add the equations: 2x = 14 → x = 7.' },
      { q: 'For what value of b do 4x + 6y = 12 and 2x + 3y = b have infinitely many solutions?',
        answer: '6', solution: 'Divide the first equation by 2: 2x + 3y = 6. The lines coincide only when b = 6.' },
    ],
  },
  {
    id: 's-lineineq', title: 'Linear Inequalities', domain: 'algebra',
    blurb: 'Same as equations — but flip the sign when you ×/÷ by a negative.', prereqs: ['s-lineq1'],
    problems: [
      { q: 'Solve −2x + 5 > 11.', choices: ['x < −3', 'x > −3', 'x < 3', 'x > 8'], answer: 'A',
        solution: '−2x > 6. Dividing by −2 flips the sign: x < −3.' },
      { q: 'A gym charges $20 plus $3 per class. With $50, what is the greatest number of classes?',
        answer: '10', solution: '20 + 3n ≤ 50 → 3n ≤ 30 → n ≤ 10.' },
    ],
  },
  {
    id: 's-linword', title: 'Building Linear Models', domain: 'algebra',
    blurb: 'Turn the words into a fee + rate·quantity equation.', prereqs: ['s-lineineq'],
    problems: [
      { q: 'A taxi charges $2.50 plus $0.40 per mile. Which gives the cost c for m miles?',
        choices: ['c = 0.40m + 2.50', 'c = 2.50m + 0.40', 'c = 2.90m', 'c = 2.50 + 0.40 + m'],
        answer: 'A', solution: 'Fixed fee $2.50 plus $0.40 for each mile: c = 0.40m + 2.50.' },
      { q: 'A plumber charges a $75 fee plus $60/hour. A job cost $315. How many hours?',
        answer: '4', solution: '75 + 60h = 315 → 60h = 240 → h = 4.' },
    ],
  },

  // ---------------- ADVANCED MATH ----------------
  {
    id: 's-equiv', title: 'Equivalent Expressions', domain: 'advanced',
    blurb: 'Expand, combine, and simplify without changing the value.',
    problems: [
      { q: 'Which is equivalent to (2x + 3)(x − 5)?',
        choices: ['2x² − 7x − 15', '2x² + 7x − 15', '2x² − 7x + 15', '2x² − 13x − 15'], answer: 'A',
        solution: 'FOIL: 2x² − 10x + 3x − 15 = 2x² − 7x − 15.' },
      { q: 'For x ≠ 3, the expression (x² − 9)/(x − 3) equals x + 3. What is its value at x = 5?',
        answer: '8', solution: '(x²−9)/(x−3) = (x−3)(x+3)/(x−3) = x + 3 = 8.' },
    ],
  },
  {
    id: 's-quadsolve', title: 'Solving Quadratics', domain: 'advanced',
    blurb: 'Factor, square-root, or use the quadratic formula.', prereqs: ['s-equiv'],
    problems: [
      { q: 'What are the solutions of x² − 5x + 6 = 0?',
        choices: ['2 and 3', '−2 and −3', '1 and 6', '−1 and −6'], answer: 'A',
        solution: 'Factor: (x − 2)(x − 3) = 0 → x = 2 or x = 3.' },
      { q: 'If x² = 49, what is the positive value of x?', answer: '7',
        solution: 'x = ±√49 = ±7. The positive value is 7.' },
      { q: 'One solution of 2x² + 3x − 2 = 0 is:',
        choices: ['1/2', '2', '1', '−1/2'], answer: 'A',
        solution: 'Factor: (2x − 1)(x + 2) = 0 → x = 1/2 or x = −2.' },
    ],
  },
  {
    id: 's-quadgraph', title: 'Quadratic Graphs', domain: 'advanced',
    blurb: 'Vertex form gives the vertex; roots are the x-intercepts.', prereqs: ['s-quadsolve'],
    problems: [
      { q: 'What is the vertex of y = (x − 3)² + 2?',
        choices: ['(3, 2)', '(−3, 2)', '(3, −2)', '(2, 3)'], answer: 'A',
        solution: 'Vertex form y = (x − h)² + k has vertex (h, k) = (3, 2).' },
      { q: 'For y = x² − 6x + 8, what is the sum of the x-intercepts?', answer: '6',
        solution: 'Roots of x² − 6x + 8 = (x − 2)(x − 4) are 2 and 4; sum = 6 (also −b/a = 6).' },
    ],
  },
  {
    id: 's-exprad', title: 'Exponents & Radicals', domain: 'advanced',
    blurb: 'Multiply → add exponents; roots are fractional powers.',
    problems: [
      { q: 'Simplify (2x³)(3x⁴).',
        choices: ['6x⁷', '6x¹²', '5x⁷', '6x⁻¹'], answer: 'A',
        solution: 'Multiply coefficients (6) and add exponents (3 + 4 = 7): 6x⁷.' },
      { q: 'What is 16^(3/4)?', answer: '8',
        solution: '16^(1/4) = 2, then 2³ = 8.' },
      { q: 'Which is √50 in simplest form?',
        choices: ['5√2', '25√2', '2√5', '10√5'], answer: 'A',
        solution: '√50 = √(25·2) = 5√2.' },
    ],
  },
  {
    id: 's-expfn', title: 'Exponential Functions', domain: 'advanced',
    blurb: 'Growth/decay multiplies by a fixed factor each step.', prereqs: ['s-exprad'],
    problems: [
      { q: 'A population is P = 200·2ᵗ. What is P after 3 years?',
        choices: ['1600', '1200', '600', '800'], answer: 'A',
        solution: '200 · 2³ = 200 · 8 = 1600.' },
      { q: 'A $1000 investment grows as V = 1000(1.05)ᵗ. What does 1.05 represent?',
        choices: ['5% growth per year', '5% loss per year', 'The number of years', 'The final value'],
        answer: 'A', solution: 'The base 1.05 means each year the value is multiplied by 1.05 — a 5% increase.' },
      { q: 'A $20,000 car loses 10% of its value each year. What is it worth after 2 years?',
        answer: '16200', solution: '20000 · (0.90)² = 20000 · 0.81 = 16,200.' },
    ],
  },
  {
    id: 's-poly', title: 'Polynomials & Factoring', domain: 'advanced',
    blurb: 'Break a polynomial into a product of simpler ones.', prereqs: ['s-equiv'],
    problems: [
      { q: 'Factor x² − 7x + 12.',
        choices: ['(x − 3)(x − 4)', '(x + 3)(x + 4)', '(x − 2)(x − 6)', '(x − 1)(x − 12)'], answer: 'A',
        solution: 'Two numbers multiplying to 12 and adding to −7: −3 and −4.' },
      { q: 'Factor x² − 16.',
        choices: ['(x − 4)(x + 4)', '(x − 4)²', '(x − 8)(x + 2)', '(x − 16)(x + 1)'], answer: 'A',
        solution: 'Difference of squares: x² − 16 = (x − 4)(x + 4).' },
    ],
  },
  {
    id: 's-nonlin', title: 'Nonlinear Systems', domain: 'advanced',
    blurb: 'Set the two expressions equal and solve the quadratic.', prereqs: ['s-quadsolve'],
    problems: [
      { q: 'y = x² and y = x + 6 intersect. What is the positive x-value of intersection?',
        answer: '3', solution: 'x² = x + 6 → x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 (positive).' },
      { q: 'How many real solutions does the system y = x² + 1, y = x − 2 have?',
        choices: ['0', '1', '2', 'Infinitely many'], answer: 'A',
        solution: 'x² + 1 = x − 2 → x² − x + 3 = 0. Discriminant 1 − 12 < 0, so no real solutions.' },
    ],
  },
  {
    id: 's-funcs', title: 'Function Notation', domain: 'advanced',
    blurb: 'f(x) is a machine; feed it the input, read the output.',
    problems: [
      { q: 'If f(x) = x² − 3x, what is f(5)?', answer: '10',
        solution: 'f(5) = 25 − 15 = 10.' },
      { q: 'The graph of g(x) − 3 is the graph of g shifted:',
        choices: ['Down 3', 'Up 3', 'Right 3', 'Left 3'], answer: 'A',
        solution: 'Subtracting from the whole function moves the graph vertically down by 3.' },
      { q: 'The graph of f(x − 2) is the graph of f shifted:',
        choices: ['Right 2', 'Left 2', 'Up 2', 'Down 2'], answer: 'A',
        solution: 'Replacing x with x − 2 shifts the graph right by 2.' },
    ],
  },
  {
    id: 's-absval', title: 'Absolute Value', domain: 'advanced',
    blurb: 'Distance from zero — set up two cases.',
    problems: [
      { q: 'Solve |x − 3| = 7.',
        choices: ['10 and −4', '10 and 4', '−10 and 4', '4 and −4'], answer: 'A',
        solution: 'x − 3 = 7 → x = 10, or x − 3 = −7 → x = −4.' },
      { q: 'If |2x + 1| = 9, what is the positive solution for x?', answer: '4',
        solution: '2x + 1 = 9 → 2x = 8 → x = 4.' },
    ],
  },

  // ---------------- PROBLEM-SOLVING & DATA ----------------
  {
    id: 's-ratios', title: 'Ratios, Rates & Proportions', domain: 'data',
    blurb: 'Find the unit rate, then scale.',
    problems: [
      { q: 'If 3 apples cost $1.20, how much do 8 apples cost (in dollars)?',
        answer: '3.20', accept: ['3.2', '$3.20'], solution: 'Unit price = 1.20/3 = $0.40. 8 · 0.40 = $3.20.' },
      { q: 'A car travels 150 miles in 3 hours. At this rate, how far in 5 hours?',
        choices: ['250', '450', '300', '200'], answer: 'A',
        solution: 'Rate = 150/3 = 50 mph. 50 · 5 = 250 miles.' },
    ],
  },
  {
    id: 's-percent', title: 'Percentages', domain: 'data',
    blurb: 'Percent means "per hundred"; change = difference ÷ original.', prereqs: ['s-ratios'],
    problems: [
      { q: 'What is 15% of 80?', answer: '12', solution: '0.15 · 80 = 12.' },
      { q: 'A $60 shirt is discounted 25%. What is the sale price?',
        choices: ['$45', '$35', '$15', '$48'], answer: 'A',
        solution: '25% of 60 is 15; 60 − 15 = $45 (or 0.75 · 60).' },
      { q: 'A price rose from $40 to $50. What is the percent increase?', answer: '25',
        accept: ['25%'], solution: 'Increase 10, over original 40: 10/40 = 0.25 = 25%.' },
    ],
  },
  {
    id: 's-units', title: 'Units & Conversion', domain: 'data',
    blurb: 'Multiply by conversion factors so units cancel.', prereqs: ['s-ratios'],
    problems: [
      { q: 'A runner moves at 5 meters per second. How many meters in 2 minutes?',
        choices: ['600', '300', '10', '150'], answer: 'A',
        solution: '2 minutes = 120 seconds. 5 · 120 = 600 meters.' },
      { q: 'How many minutes are in 2.5 hours?', answer: '150', solution: '2.5 · 60 = 150 minutes.' },
    ],
  },
  {
    id: 's-scatter', title: 'Scatterplots & Models', domain: 'data',
    blurb: 'A line of best fit predicts; read its slope and sign.', prereqs: ['s-percent'],
    problems: [
      { q: 'A line of best fit y = 3x + 5 predicts plant height (cm) from weeks x. Predicted height at 4 weeks?',
        choices: ['17', '12', '20', '8'], answer: 'A', solution: '3·4 + 5 = 17 cm.' },
      { q: 'In a scatterplot, as x increases y tends to decrease. The association is:',
        choices: ['Negative', 'Positive', 'None', 'Exponential'], answer: 'A',
        solution: 'Downward trend = negative association.' },
    ],
  },
  {
    id: 's-stats', title: 'Center & Spread', domain: 'data',
    blurb: 'Mean, median, range, and how spread out the data is.', prereqs: ['s-percent'],
    problems: [
      { q: 'What is the median of 3, 7, 7, 2, 10?', answer: '7',
        solution: 'Sorted: 2, 3, 7, 7, 10. The middle value is 7.' },
      { q: 'Set A: 10, 10, 10, 10. Set B: 2, 6, 14, 18. Both have mean 10. Which has the larger standard deviation?',
        choices: ['Set B', 'Set A', 'They are equal', 'Cannot tell'], answer: 'A',
        solution: 'Standard deviation measures spread. Set A has none; Set B is spread out, so B is larger.' },
      { q: 'What is the mean of 4, 8, 10, 6, 2?', answer: '6', solution: 'Sum = 30, divided by 5 = 6.' },
    ],
  },
  {
    id: 's-prob', title: 'Probability', domain: 'data',
    blurb: 'Favorable outcomes over total outcomes.', prereqs: ['s-ratios'],
    problems: [
      { q: 'A bag has 3 red and 5 blue marbles. What is the probability of drawing red?',
        answer: '3/8', accept: ['0.375'], solution: '3 red out of 8 total = 3/8 = 0.375.' },
      { q: 'Of 200 students, 120 play a sport. What is the probability a random student plays a sport?',
        choices: ['0.6', '0.4', '0.12', '0.3'], answer: 'A', solution: '120/200 = 0.6.' },
    ],
  },
  {
    id: 's-sample', title: 'Sampling & Inference', domain: 'data',
    blurb: 'Random samples generalize; margins of error give a range.', prereqs: ['s-stats'],
    problems: [
      { q: 'A poll of 500 random voters finds 52% ± 3% support a measure. Best conclusion?',
        choices: ['Between 49% and 55% of all voters likely support it', 'Exactly 52% support it',
          '55% support it', 'The sample is too small to say anything'], answer: 'A',
        solution: 'The margin of error gives a plausible range: 52% ± 3% = 49% to 55%.' },
      { q: 'To fairly estimate a whole school’s opinion, the best sample is:',
        choices: ['Random students from all grades', 'Only seniors', 'Only the math club', 'The pollster’s friends'],
        answer: 'A', solution: 'A random, representative sample avoids bias; the others are skewed subgroups.' },
    ],
  },

  // ---------------- GEOMETRY & TRIG ----------------
  {
    id: 's-angles', title: 'Lines & Angles', domain: 'geometry',
    blurb: 'Straight lines make 180°; parallels copy angles.',
    problems: [
      { q: 'Two angles are supplementary. One measures 65°. What is the other (in degrees)?',
        answer: '115', solution: 'Supplementary angles sum to 180°: 180 − 65 = 115.' },
      { q: 'Parallel lines are cut by a transversal; one angle is 40°. Its alternate interior angle is:',
        choices: ['40°', '140°', '50°', '80°'], answer: 'A',
        solution: 'Alternate interior angles are equal, so 40°.' },
    ],
  },
  {
    id: 's-triangles', title: 'Triangles & Similarity', domain: 'geometry',
    blurb: 'Angles sum to 180°; similar triangles scale by a ratio.', prereqs: ['s-angles'],
    problems: [
      { q: 'A triangle has angles 50° and 60°. What is the third angle (in degrees)?',
        answer: '70', solution: 'Angles sum to 180°: 180 − 50 − 60 = 70.' },
      { q: 'Two similar triangles have ratio 2 : 3. If a small side is 8, the corresponding large side is:',
        choices: ['12', '5.3', '16', '10'], answer: 'A',
        solution: '8 · (3/2) = 12.' },
    ],
  },
  {
    id: 's-trig', title: 'Right Triangles & Trig', domain: 'geometry',
    blurb: 'a² + b² = c²; SOH-CAH-TOA for the ratios.', prereqs: ['s-triangles'],
    problems: [
      { q: 'A right triangle has legs 6 and 8. What is the hypotenuse?', answer: '10',
        solution: '√(6² + 8²) = √(36 + 64) = √100 = 10.' },
      { q: 'In a right triangle, the side opposite θ is 3 and the hypotenuse is 5. What is sin θ?',
        choices: ['3/5', '4/5', '3/4', '5/3'], answer: 'A',
        solution: 'sin θ = opposite/hypotenuse = 3/5.' },
      { q: 'A right triangle has hypotenuse 13 and one leg 5. What is the other leg?', answer: '12',
        solution: '√(13² − 5²) = √(169 − 25) = √144 = 12.' },
    ],
  },
  {
    id: 's-circles', title: 'Circles', domain: 'geometry',
    blurb: 'Area πr², circumference 2πr, and the (x−h)²+(y−k)²=r² equation.', prereqs: ['s-angles'],
    problems: [
      { q: 'A circle has area 36π. What is its radius?', answer: '6',
        solution: 'πr² = 36π → r² = 36 → r = 6.' },
      { q: 'The circle (x − 2)² + (y + 3)² = 16 has which center and radius?',
        choices: ['Center (2, −3), r = 4', 'Center (−2, 3), r = 4', 'Center (2, −3), r = 16', 'Center (2, 3), r = 4'],
        answer: 'A', solution: 'Center is (h, k) = (2, −3); r = √16 = 4.' },
    ],
  },
  {
    id: 's-areavol', title: 'Area & Volume', domain: 'geometry',
    blurb: 'Length × width, and base area × height for solids.',
    problems: [
      { q: 'A rectangle is 7 by 12. What is its area?', answer: '84', solution: '7 · 12 = 84.' },
      { q: 'A cube has side length 3. What is its volume?',
        choices: ['27', '9', '18', '54'], answer: 'A', solution: '3³ = 27.' },
      { q: 'A cylinder has radius 2 and height 5. Its volume is kπ. What is k?', answer: '20',
        solution: 'V = πr²h = π·4·5 = 20π, so k = 20.' },
    ],
  },
  {
    id: 's-coordgeo', title: 'Coordinate Geometry', domain: 'geometry',
    blurb: 'Distance and midpoint from the Pythagorean theorem.', prereqs: ['s-trig'],
    problems: [
      { q: 'What is the distance between (1, 2) and (4, 6)?', answer: '5',
        solution: '√((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5.' },
      { q: 'What is the midpoint of (2, 3) and (8, 11)?',
        choices: ['(5, 7)', '(6, 8)', '(3, 4)', '(10, 14)'], answer: 'A',
        solution: 'Average the coordinates: ((2+8)/2, (3+11)/2) = (5, 7).' },
    ],
  },
]

export const SAT_SKILL_MAP = new Map<string, SatSkill>(SAT_SKILLS.map(s => [s.id, s]))
export const TOTAL_PROBLEMS = SAT_SKILLS.reduce((n, s) => n + s.problems.length, 0)

/** Projected SAT math score from mastered-skill fraction. 200 → 800. Labeled "projected". */
export function projectedScore(masteredCount: number): number {
  const frac = SAT_SKILLS.length ? masteredCount / SAT_SKILLS.length : 0
  return Math.round((200 + 600 * frac) / 10) * 10
}

/** Normalize a grid-in answer for lenient matching. */
export function answerMatches(input: string, p: SatProblem): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '').replace(/^\$/, '').replace(/%$/, '')
  const a = norm(input)
  if (!a) return false
  const targets = [p.answer, ...(p.accept ?? [])].map(norm)
  if (targets.includes(a)) return true
  // numeric equality (handles 3.2 vs 3.20, fractions vs decimals)
  const toNum = (s: string): number | null => {
    if (/^-?\d*\.?\d+$/.test(s)) return parseFloat(s)
    const f = s.match(/^(-?\d+)\/(\d+)$/)
    if (f) return parseInt(f[1]) / parseInt(f[2])
    return null
  }
  const an = toNum(a)
  if (an === null) return false
  return targets.some(t => { const tn = toNum(t); return tn !== null && Math.abs(tn - an) < 1e-6 })
}
