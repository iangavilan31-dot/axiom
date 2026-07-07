import type { TopicNode } from '../types'

// Tier 9-13. Motion enters the board.

export const CALCULUS: TopicNode[] = [
  {
    id: 'zenos-paradoxes', title: 'Zeno’s Paradoxes', tag: 'motion is impossible (?)', branch: 'calculus', tier: 9, year: -450,
    prereqs: ['series', 'fractions'],
    why: { series: 'To cross the room: first half, then half the rest, forever — infinitely many steps, one finite walk. ½+¼+⅛+… = 1 is the 2,300-years-later reply.' },
    explain: 'Zeno argued the arrow never lands and Achilles never catches the tortoise. The paradoxes are wrong-but-brilliant: they mark exactly the spot where mathematics needed limits, and waited two millennia for them.',
    problems: [
      { q: 'Achilles runs 10× the tortoise’s speed, 100m behind. Where does he catch it?', a: 'At 111.1m (100/(1−0.1))' },
      { q: 'What resolves the paradoxes?', a: 'Convergent infinite series (limits)' },
    ],
  },
  {
    id: 'limits', title: 'Limits', tag: 'sneaking up on a value', branch: 'calculus', tier: 9, year: 1821,
    prereqs: ['functions', 'sequences'],
    why: {
      sequences: 'A limit is where a sequence is HEADING — 0.9, 0.99, 0.999… never arrives at 1, yet 1 is the only honest destination.',
      functions: 'Limits ask what a function approaches, not what it equals — the loophole that lets calculus divide by "almost zero" safely.',
    },
    explain: 'Zeno said you can never cross the room (first half, then half of that…). Limits are the 2,300-year-later answer: infinite processes can have finite, exact destinations. All of calculus stands on this.',
    problems: [
      { q: 'limit of (x² − 1)/(x − 1) as x → 1?', a: '2' },
      { q: 'limit of 1/n as n → ∞?', a: '0' },
    ],
  },
  {
    id: 'continuity', title: 'Continuity', tag: 'no rips in the curve', branch: 'calculus', tier: 10, year: 1817,
    prereqs: ['limits'],
    explain: 'A function you can draw without lifting the chalk. Precisely: the limit equals the value at every point. Break it, and calculus’ guarantees break with it.',
    problems: [
      { q: 'Is f(x) = 1/x continuous at x = 0?', a: 'No — not even defined there' },
      { q: 'A continuous function on [1,5] with f(1)=−2, f(5)=3 must cross…?', a: 'Zero (IVT)' },
    ],
  },
  {
    id: 'derivatives', title: 'Derivatives', tag: 'slope at a single instant', branch: 'calculus', tier: 10, year: 1665,
    prereqs: ['limits', 'slope'],
    why: {
      slope: 'Slope needs two points — a derivative is slope’s limit as the second point slides into the first. Steepness at one instant, not between.',
      limits: 'Divide a vanishing rise by a vanishing run: without limits it is 0/0 nonsense; with limits it is the most useful number in science.',
    },
    explain: 'Newton (plague year, age 23) and Leibniz independently cracked instantaneous change. Speed at an instant, growth right now, sensitivity of anything to anything — the derivative is the verb of mathematics.',
    problems: [
      { q: 'd/dx of x³?', a: '3x²' },
      { q: 'Where is the slope of y = x² equal to 0?', a: 'x = 0 (the bottom of the bowl)' },
    ],
  },
  {
    id: 'differentiation-rules', title: 'Differentiation Rules', tag: 'derivatives on autopilot', branch: 'calculus', tier: 11, year: 1684,
    prereqs: ['derivatives'],
    explain: 'Power, product, quotient rules: Leibniz’s notation turned limit arguments into pure symbol-pushing. Calculus became something you could DO before breakfast.',
    problems: [
      { q: 'd/dx of x² · sin x?', a: '2x sin x + x² cos x' },
      { q: 'd/dx of 5x⁴ − 3x + 7?', a: '20x³ − 3' },
    ],
  },
  {
    id: 'chain-rule', title: 'Chain Rule', tag: 'rates inside rates', branch: 'calculus', tier: 11, year: 1676,
    prereqs: ['differentiation-rules'],
    why: { 'differentiation-rules': 'Machines feed machines: if y depends on u and u on x, the rates MULTIPLY. The chain rule is why gears, dominoes, and neural networks can be differentiated.' },
    explain: 'The rule for functions inside functions — and secretly the most important rule of the modern world: backpropagation, which trains every neural network, is the chain rule applied a billion times.',
    problems: [
      { q: 'd/dx of (3x + 1)⁵?', a: '15(3x + 1)⁴' },
      { q: 'd/dx of sin(x²)?', a: '2x cos(x²)' },
    ],
  },
  {
    id: 'implicit-differentiation', title: 'Implicit Differentiation', tag: 'slopes without solving', branch: 'calculus', tier: 11, year: 1684,
    prereqs: ['chain-rule'],
    explain: 'A circle’s equation never says "y =", yet its tangents exist. Differentiate both sides, treat y as a function in hiding, and the slope surrenders anyway.',
    problems: [
      { q: 'For x² + y² = 25, dy/dx = ?', a: '−x/y' },
      { q: 'Slope of that circle at (3, 4)?', a: '−3/4' },
    ],
  },
  {
    id: 'second-derivative', title: 'The Second Derivative', tag: 'the rate of the rate', branch: 'calculus', tier: 11, year: 1684,
    prereqs: ['derivatives'],
    explain: 'Differentiate twice: position → velocity → acceleration. Geometrically it is concavity — whether the curve smiles or frowns — and it flags exactly where trends change character.',
    problems: [
      { q: 'If f(x) = x³, f″(x) = ?', a: '6x' },
      { q: 'f″ > 0 means the graph is…?', a: 'Concave up (a smile)' },
    ],
  },
  {
    id: 'optimization', title: 'Optimization', tag: 'the best possible — proved', branch: 'calculus', tier: 11, year: 1638,
    prereqs: ['derivatives'],
    why: { derivatives: 'At a peak or valley the tangent lies flat: set the derivative to zero and the best point falls out. Fermat used this before "derivative" had a name.' },
    explain: 'Largest area, cheapest can, fastest route, maximum profit. Nature optimizes too — light literally takes the path of least time. This one technique quietly runs economics and engineering.',
    problems: [
      { q: 'Max of f(x) = −x² + 6x?', a: '9, at x = 3' },
      { q: 'Split 20 into two numbers with max product.', a: '10 and 10' },
    ],
  },
  {
    id: 'related-rates', title: 'Related Rates', tag: 'linked changes, timed', branch: 'calculus', tier: 11, year: 1687,
    prereqs: ['chain-rule'],
    explain: 'The ladder slides, the shadow stretches, the balloon inflates: when quantities are chained together, their speeds are chained too. Differentiate the relationship and solve for the unknown rate.',
    problems: [
      { q: 'A square’s side grows 2 cm/s. At side 10, area grows at…?', a: '40 cm²/s' },
      { q: 'Radius grows 1 cm/s. At r=3, circle area grows at…?', a: '6π cm²/s' },
    ],
  },
  {
    id: 'lhopitals-rule', title: 'L’Hôpital’s Rule', tag: '0/0, resolved', branch: 'calculus', tier: 11, year: 1696,
    prereqs: ['derivatives', 'limits'],
    explain: 'When a limit collapses to 0/0, compare the SPEEDS instead: differentiate top and bottom and try again. (L’Hôpital bought the rule from Johann Bernoulli — math’s most famous ghostwrite.)',
    problems: [
      { q: 'limit of sin x / x as x → 0?', a: '1' },
      { q: 'limit of (eˣ − 1)/x as x → 0?', a: '1' },
    ],
  },
  {
    id: 'riemann-sums', title: 'Riemann Sums', tag: 'area by slicing', branch: 'calculus', tier: 10, year: 1635,
    prereqs: ['area-formulas', 'series', 'limits'],
    why: {
      'area-formulas': 'No formula fits a curved region — so approximate it with rectangles, whose areas you HAVE known since tier 4.',
      limits: 'More slices, thinner slices — the limit of the total is the exact area. Archimedes’ old exhaustion trick, industrialized.',
    },
    explain: 'Chop the region under a curve into rectangles and add. Crude at 5 slices, good at 50, EXACT in the limit. This picture is the definition of the integral.',
    problems: [
      { q: 'Approximating with more rectangles makes the error…?', a: 'Shrink toward 0' },
      { q: 'Left-sum under an increasing curve: over- or under-estimate?', a: 'Underestimate' },
    ],
  },
  {
    id: 'definite-integrals', title: 'Definite Integrals', tag: 'exact area, exact total', branch: 'calculus', tier: 11, year: 1666,
    prereqs: ['riemann-sums'],
    why: { 'riemann-sums': 'The integral IS the limit of the slicing — ∫ is just a stretched S for "sum of infinitely thin slices".' },
    explain: 'Total distance from speed, total energy from power, total anything from its rate. Where the derivative asks "how fast?", the integral asks "how much, in all?"',
    problems: [
      { q: '∫₀³ 2x dx = ?', a: '9' },
      { q: 'A car does 60 mph for 2 hours. The integral of speed is…?', a: '120 miles — distance' },
    ],
  },
  {
    id: 'antiderivatives', title: 'Antiderivatives', tag: 'differentiation, reversed', branch: 'calculus', tier: 11, year: 1666,
    prereqs: ['differentiation-rules'],
    why: { 'differentiation-rules': 'Ask the backwards question — WHAT has derivative 2x? — and every rule you learned runs in reverse. Plus C, because constants vanish without a trace.' },
    explain: 'Un-doing the derivative. The board’s oldest move (inverse everything) applied to calculus itself — and the bridge that is about to join the two halves of the subject.',
    problems: [
      { q: 'Antiderivative of 3x²?', a: 'x³ + C' },
      { q: 'Antiderivative of cos x?', a: 'sin x + C' },
    ],
  },
  {
    id: 'fundamental-theorem-calculus', title: 'Fundamental Thm of Calculus', tag: 'slopes and areas are twins', branch: 'calculus', tier: 12, year: 1666,
    prereqs: ['definite-integrals', 'antiderivatives'],
    why: {
      'definite-integrals': 'The stunning secret: accumulating area is UNDONE by taking slope. Two problems studied for centuries turn out to be one.',
      antiderivatives: 'To compute a definite integral, find any antiderivative and subtract endpoints — infinity of slices collapses to one subtraction.',
    },
    explain: 'The theorem that made calculus a machine instead of a heroic effort. Newton and Leibniz both saw it; the priority war that followed poisoned mathematics for a century. Still the greatest two-for-one in the subject.',
    problems: [
      { q: '∫₁⁴ 2x dx via antiderivative?', a: 'x² from 1 to 4 = 15' },
      { q: 'In one line: what does the FTC connect?', a: 'Derivatives and integrals (inverse processes)' },
    ],
  },
  {
    id: 'integration-techniques', title: 'Integration Techniques', tag: 'substitution and its friends', branch: 'calculus', tier: 12, year: 1700,
    prereqs: ['fundamental-theorem-calculus', 'chain-rule'],
    why: { 'chain-rule': 'u-substitution is the chain rule read right-to-left — spot the inner function, rename it, and the integral untangles.' },
    explain: 'Differentiation is mechanical; integration is a craft. Substitution, symmetry, partial fractions: a toolkit of reversals, each one some derivative rule played backwards.',
    problems: [
      { q: '∫ 2x(x² + 1)³ dx = ?', a: '(x² + 1)⁴/4 + C' },
      { q: '∫ 1/x dx = ?', a: 'ln|x| + C' },
    ],
  },
  {
    id: 'integration-by-parts', title: 'Integration by Parts', tag: 'the product rule, reversed', branch: 'calculus', tier: 12, year: 1715,
    prereqs: ['integration-techniques'],
    explain: '∫u dv = uv − ∫v du: trade a hard integral for an easier one. It integrates ln x, x·eˣ, and by iterating, defines the gamma function and Fourier coefficients upstairs.',
    problems: [
      { q: '∫ x eˣ dx = ?', a: 'x eˣ − eˣ + C' },
      { q: 'Which rule, reversed, gives integration by parts?', a: 'The product rule' },
    ],
  },
  {
    id: 'improper-integrals', title: 'Improper Integrals', tag: 'integrating to infinity', branch: 'calculus', tier: 12, year: 1823,
    prereqs: ['integration-techniques', 'limits'],
    explain: 'Areas of infinitely long regions — sometimes finite! Gabriel’s Horn holds finite paint yet has infinite surface. Probability lives here: the bell curve’s total area over ALL reals is exactly 1.',
    problems: [
      { q: '∫₁^∞ 1/x² dx = ?', a: '1' },
      { q: '∫₁^∞ 1/x dx = ?', a: 'Diverges (infinite)' },
    ],
  },
  {
    id: 'integral-applications', title: 'Integral Applications', tag: 'volumes, lengths, work', branch: 'calculus', tier: 12, year: 1700,
    prereqs: ['definite-integrals', 'solid-geometry'],
    why: { 'solid-geometry': 'Spin a curve around an axis and slice: every cross-section is a disk whose area you know. Integrals build the volume formulas geometry could only state.' },
    explain: 'Slice anything thin enough and add: volumes of vases, work to launch a rocket, force on a dam. The integral is a universal "total-izer" for the physical world.',
    problems: [
      { q: 'Volume when y = x, 0..1, spins around the x-axis?', a: 'π/3' },
      { q: 'What shape does each thin slice make?', a: 'A disk (πr² dx)' },
    ],
  },
  {
    id: 'arc-length', title: 'Arc Length & Curvature', tag: 'measuring along the curve', branch: 'calculus', tier: 12, year: 1659,
    prereqs: ['integral-applications', 'pythagorean-theorem'],
    why: { 'pythagorean-theorem': 'Each tiny piece of curve is a hypotenuse: ds = √(dx² + dy²). Pythagoras, shrunk to infinitesimal size and integrated.' },
    explain: 'How long is a curve, really? Chop it into infinitesimal straight pieces and sum. Roller-coaster track, coastline, cable length — the integral of tiny hypotenuses.',
    problems: [
      { q: 'The formula ds = ?', a: '√(1 + (dy/dx)²) dx' },
      { q: 'Arc length of y = x from 0 to 3?', a: '3√2' },
    ],
  },
  {
    id: 'differential-equations', title: 'Differential Equations', tag: 'laws written in rates', branch: 'calculus', tier: 12, year: 1687,
    prereqs: ['antiderivatives', 'exponential-functions'],
    why: {
      'exponential-functions': 'The equation y′ = y — "grows as fast as it is big" — has exactly one hero solution: eˣ. Nature’s favorite function is a differential equation’s answer.',
      antiderivatives: 'Solving a differential equation is antidifferentiation with attitude: recover the unknown FUNCTION from a law about its rates.',
    },
    explain: 'Newton wrote gravity as a differential equation and the solar system obeyed. Populations, pandemics, pendulums, planets, portfolios — science does not describe the world; it writes differential equations for it.',
    problems: [
      { q: 'Solve y′ = 2y, y(0) = 3.', a: 'y = 3e^{2x}' },
      { q: 'Newton’s 2nd law as a differential equation?', a: 'F = m·x″' },
    ],
  },
  {
    id: 'infinite-series', title: 'Infinite Series', tag: 'adding forever, carefully', branch: 'calculus', tier: 11, year: 1350,
    prereqs: ['series', 'limits'],
    why: { limits: 'An infinite sum is DEFINED as the limit of its running totals — no limit, no sum. The harmonic series 1+½+⅓+… creeps upward forever; Oresme proved it in 1350.' },
    explain: 'Some infinite sums settle (½+¼+⅛+…=1), some explode, and telling them apart is an art form. Series are how calculators compute sin, e, and π — everything is secretly a series.',
    problems: [
      { q: 'Does 1 + ½ + ⅓ + ¼ + … converge?', a: 'No — diverges (slowly!)' },
      { q: 'Sum of 1 + ⅓ + ⅑ + 1/27 + …?', a: '3/2' },
    ],
  },
  {
    id: 'convergence-tests', title: 'Convergence Tests', tag: 'will the sum survive?', branch: 'calculus', tier: 12, year: 1821,
    prereqs: ['infinite-series'],
    explain: 'Comparison, ratio, integral, alternating: a detective kit for deciding convergence without computing the sum. Cauchy built these to stop a century of gleeful nonsense with divergent series.',
    problems: [
      { q: 'Ratio test on Σ 2ⁿ/n! — converge?', a: 'Yes (ratio → 0)' },
      { q: 'Σ 1/n² converges to…? (famous)', a: 'π²/6' },
    ],
  },
  {
    id: 'power-series', title: 'Power Series', tag: 'infinite polynomials', branch: 'calculus', tier: 12, year: 1715,
    prereqs: ['infinite-series', 'polynomials'],
    why: { polynomials: 'Let a polynomial run forever: a₀ + a₁x + a₂x² + … Within its radius of convergence it behaves perfectly — differentiate and integrate term by term like a child’s polynomial.' },
    explain: 'Functions dressed as endless polynomials. Inside their circle of convergence they are the best-behaved objects in analysis — and generating functions borrow them to count things.',
    problems: [
      { q: '1 + x + x² + x³ + … = ? (|x|<1)', a: '1/(1 − x)' },
      { q: 'Radius of convergence of Σ xⁿ/n!?', a: 'Infinite' },
    ],
  },
  {
    id: 'taylor-series', title: 'Taylor Series', tag: 'any function from one point', branch: 'calculus', tier: 13, year: 1715,
    prereqs: ['power-series', 'derivatives'],
    why: { derivatives: 'Know every derivative of f at a single point and you can rebuild f EVERYWHERE nearby: each derivative dictates one coefficient. A function’s DNA, read at one spot.' },
    explain: 'sin x = x − x³/6 + x⁵/120 − …: your calculator has never known what sine "is" — it sums this series. Taylor series are how machines do calculus and how physicists approximate everything.',
    problems: [
      { q: 'First two nonzero terms of eˣ?', a: '1 + x' },
      { q: 'Using sin x ≈ x, sin(0.1) ≈ ?', a: '0.1 (error < 0.0002)' },
    ],
  },
  {
    id: 'eulers-identity', title: 'Euler’s Identity', tag: 'e^{iπ} + 1 = 0', branch: 'calculus', tier: 13, year: 1748,
    prereqs: ['taylor-series', 'complex-numbers', 'unit-circle'],
    why: {
      'taylor-series': 'Feed ix into the series for eˣ and it splits, miraculously, into cos x + i·sin x. The proof is three series laid side by side.',
      'unit-circle': 'e^{iθ} walks the unit circle: exponential growth, aimed sideways, becomes rotation. At θ = π it lands exactly on −1.',
      'complex-numbers': 'Five constants from five different corners of the board — e, i, π, 1, 0 — locked in one equation. Voted the most beautiful in mathematics, repeatedly.',
    },
    explain: 'The board’s crown jewel. Growth (e), rotation (i, π), and the two atoms of arithmetic (1, 0) turn out to be one family. When Benjamin Peirce proved it in class he said: "We cannot understand it, and we know it must be the truth."',
    problems: [
      { q: 'e^{iπ/2} = ?', a: 'i' },
      { q: 'Which five constants appear?', a: 'e, i, π, 1, 0' },
    ],
  },
  {
    id: 'newtons-method', title: 'Newton’s Method', tag: 'root-hunting by tangent', branch: 'calculus', tier: 11, year: 1669,
    prereqs: ['derivatives', 'long-division'],
    why: { 'long-division': 'Like long division, it is an ALGORITHM: guess, slide down the tangent line, repeat. Each pass roughly doubles the correct digits.' },
    explain: 'To solve f(x) = 0: guess, follow the tangent to where it hits zero, guess again. Your calculator’s square-root button is this method, three iterations deep. When it misbehaves, it draws fractals.',
    problems: [
      { q: 'One Newton step for x² − 2 from x = 1.5?', a: 'x ≈ 1.4167' },
      { q: 'What does each iteration follow?', a: 'The tangent line to its x-intercept' },
    ],
  },
  {
    id: 'multivariable-functions', title: 'Multivariable Functions', tag: 'surfaces over the plane', branch: 'calculus', tier: 12, year: 1750,
    prereqs: ['functions', 'solid-geometry'],
    explain: 'f(x, y): temperature over a map, elevation over terrain, profit over two choices. Graphs become landscapes, and calculus is about to learn to hike them.',
    problems: [
      { q: 'f(x,y) = x² + y². What are its level curves?', a: 'Circles' },
      { q: 'f(3, 4) for f = x·y − y?', a: '8' },
    ],
  },
  {
    id: 'partial-derivatives', title: 'Partial Derivatives', tag: 'one direction at a time', branch: 'calculus', tier: 13, year: 1755,
    prereqs: ['multivariable-functions', 'derivatives'],
    why: { derivatives: 'Freeze every variable but one and differentiate as usual. The gradient — all partials bundled — points exactly uphill; machine learning descends it backwards.' },
    explain: 'Slopes of landscapes: east-slope and north-slope separately. The gradient vector they form drives weather models, heat flow, and the gradient descent that trains every neural network.',
    problems: [
      { q: '∂/∂x of x²y + y³?', a: '2xy' },
      { q: 'Gradient of f = x² + y² at (1, 2)?', a: '(2, 4)' },
    ],
  },
  {
    id: 'multiple-integrals', title: 'Multiple Integrals', tag: 'summing over areas and volumes', branch: 'calculus', tier: 13, year: 1769,
    prereqs: ['multivariable-functions', 'definite-integrals'],
    explain: 'Integrate over a region instead of an interval: mass of a plate, charge in a cloud, probability over two variables. Slice in x, then in y — Fubini lets you take the dimensions one at a time.',
    problems: [
      { q: '∫₀¹∫₀² x·y dy dx = ?', a: '1' },
      { q: 'The double integral of 1 over a region gives its…?', a: 'Area' },
    ],
  },
  {
    id: 'vector-calculus', title: 'Vector Calculus', tag: 'grad, div, curl', branch: 'calculus', tier: 13, year: 1873,
    prereqs: ['partial-derivatives', 'vectors'],
    why: { vectors: 'Fields assign a VECTOR to every point — wind maps, magnetic fields. Calculus on them needs vector language: divergence for outflow, curl for swirl.' },
    explain: 'The mathematics of fields. Maxwell wrote four vector-calculus equations and light fell out as a consequence — the greatest mic-drop in physics. Stokes’ theorem unifies all of it.',
    problems: [
      { q: 'Divergence measures…?', a: 'Net outflow from a point (source-ness)' },
      { q: 'Whose four equations predicted light?', a: 'Maxwell’s' },
    ],
  },
]
