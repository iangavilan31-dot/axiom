import type { TopicNode } from '../types'

// Tier 6-13. Chance becomes calculable.

export const PROBABILITY: TopicNode[] = [
  {
    id: 'counting-principle', title: 'The Counting Principle', tag: 'multiply the choices', branch: 'probability', tier: 6, year: 1650,
    prereqs: ['multiplication'],
    why: { multiplication: '3 shirts × 4 pants = 12 outfits. Independent choices multiply — the times table becomes a possibility-counter.' },
    explain: 'The seed of combinatorics: when choices stack, possibilities multiply. Passwords, license plates, DNA codons — count without listing.',
    problems: [
      { q: '4-digit PIN codes: how many exist?', a: '10,000' },
      { q: '5 appetizers, 8 mains, 3 desserts: how many dinners?', a: '120' },
    ],
  },
  {
    id: 'factorials', title: 'Factorials', tag: 'n! — multiply all the way down', branch: 'probability', tier: 6, year: 1150,
    prereqs: ['multiplication'],
    explain: '5! = 5·4·3·2·1 = 120: the ways to order five things. Factorials explode faster than exponentials — 60! exceeds the atoms in the observable universe.',
    problems: [
      { q: '6! = ?', a: '720' },
      { q: 'Ways to shuffle a 4-book shelf?', a: '24' },
    ],
  },
  {
    id: 'permutations', title: 'Permutations', tag: 'order matters', branch: 'probability', tier: 7, year: 1150,
    prereqs: ['factorials', 'counting-principle'],
    explain: 'Arrangements where sequence counts: podium finishes, seatings, anagram counts. A shuffled deck has 52! orderings — every fair shuffle you have ever seen was almost surely brand new in history.',
    problems: [
      { q: 'Gold-silver-bronze from 8 runners: how many ways?', a: '336' },
      { q: 'Arrangements of the letters in MATH?', a: '24' },
    ],
  },
  {
    id: 'combinations', title: 'Combinations', tag: 'order doesn’t matter', branch: 'probability', tier: 7, year: 1150,
    prereqs: ['permutations'],
    why: { permutations: 'Count arrangements, then forgive the ordering: divide by k!. "Choose" is "arrange" with amnesia.' },
    explain: 'nCk: how many committees, hands, or lottery tickets. The numbers that fill Pascal’s triangle and expand binomials — counting’s greatest hits all use "choose".',
    problems: [
      { q: 'Choose 2 toppings from 6?', a: '15' },
      { q: 'Lottery: choose 6 from 49 — how many tickets?', a: '13,983,816' },
    ],
  },
  {
    id: 'pascals-triangle', title: 'Pascal’s Triangle', tag: 'the triangle that knows everything', branch: 'probability', tier: 7, year: 1100,
    prereqs: ['combinations', 'addition'],
    why: {
      addition: 'Each entry is the sum of the two above — pure addition builds a structure containing binomial coefficients, powers of 2, Fibonacci, and fractals.',
      combinations: 'Row n, slot k IS nCk: the triangle is every "choose" precomputed, centuries before Pascal (China and Persia had it first).',
    },
    explain: 'A triangle of sums hiding half of mathematics: shade the odd entries and Sierpinski’s fractal appears. The friendliest deep object on the board.',
    problems: [
      { q: 'Row 4 (starting row 0)?', a: '1 4 6 4 1' },
      { q: 'Sum of row n?', a: '2ⁿ' },
    ],
  },
  {
    id: 'probability', title: 'Probability', tag: 'measuring the unknown', branch: 'probability', tier: 7, year: 1654,
    prereqs: ['fractions', 'counting-principle'],
    why: {
      fractions: 'A probability IS a fraction: favorable outcomes over possible ones. The gambler’s question became a number between 0 and 1.',
      'counting-principle': 'To weigh chance you must first COUNT possibilities — combinatorics is probability’s engine room.',
    },
    explain: 'Born in 1654 letters between Pascal and Fermat about a gambling dispute. The maddest idea on the board: putting exact numbers on what has not happened yet — and being right, on average, forever.',
    problems: [
      { q: 'P(rolling a 5 or 6 on one die)?', a: '1/3' },
      { q: 'P(two coin flips both heads)?', a: '1/4' },
    ],
  },
  {
    id: 'compound-events', title: 'Compound Events', tag: 'AND multiplies, OR adds', branch: 'probability', tier: 8, year: 1657,
    prereqs: ['probability'],
    explain: 'The grammar of chance: independent ANDs multiply, exclusive ORs add, and "at least one" is best attacked through its complement. Three rules cover most of everyday uncertainty.',
    problems: [
      { q: 'P(at least one head in 3 flips)?', a: '7/8' },
      { q: 'P(die shows even OR five)?', a: '2/3' },
    ],
  },
  {
    id: 'birthday-paradox', title: 'The Birthday Paradox', tag: '23 people, even odds', branch: 'probability', tier: 9, year: 1939,
    prereqs: ['compound-events'],
    why: { 'compound-events': 'Compute the complement — P(all 23 birthdays differ) — and multiply the survival odds down: it drops below 50% shockingly fast.' },
    explain: 'In a room of 23, a shared birthday is more likely than not; at 70 it is 99.9%. Intuition fails because PAIRS grow quadratically — 23 people is 253 chances. Hackers exploit the same math to find hash collisions.',
    problems: [
      { q: 'People needed for >50% shared birthday?', a: '23' },
      { q: 'How many pairs among 23 people?', a: '253' },
    ],
  },
  {
    id: 'conditional-probability', title: 'Conditional Probability', tag: 'chance, given a clue', branch: 'probability', tier: 8, year: 1713,
    prereqs: ['compound-events'],
    explain: 'P(A|B): how the odds shift once you know something. Humans are notoriously bad at this — the Monty Hall door and medical false positives fool doctors and game-show contestants alike.',
    problems: [
      { q: 'Two kids, at least one is a boy. P(both boys)?', a: '1/3' },
      { q: 'Monty Hall: switch or stay?', a: 'Switch — 2/3 vs 1/3' },
    ],
  },
  {
    id: 'independence', title: 'Independence', tag: 'when clues tell you nothing', branch: 'probability', tier: 8, year: 1713,
    prereqs: ['conditional-probability'],
    explain: 'Events are independent when knowing one leaves the other’s odds untouched. The die has no memory — the "law of averages" gamblers pray to does not exist.',
    problems: [
      { q: 'Five heads in a row. P(heads next)?', a: 'Still 1/2' },
      { q: 'Are "draw an ace" then "draw an ace" (no replacement) independent?', a: 'No' },
    ],
  },
  {
    id: 'bayes-theorem', title: 'Bayes’ Theorem', tag: 'update your beliefs, precisely', branch: 'probability', tier: 9, year: 1763,
    prereqs: ['conditional-probability'],
    why: { 'conditional-probability': 'Bayes flips the conditional: from P(evidence|cause) — which you know — to P(cause|evidence) — which you want. Reasoning backward, legally.' },
    explain: 'The mathematics of changing your mind. Spam filters, medical diagnosis, courtroom DNA, self-driving perception: one 1763 formula from a Presbyterian minister’s drawer runs them all.',
    problems: [
      { q: 'Disease: 1% prevalence, test 90% accurate, positive result. Roughly P(sick)?', a: '≈ 8% — not 90%!' },
      { q: 'Bayes converts P(B|A) into…?', a: 'P(A|B)' },
    ],
  },
  {
    id: 'random-variables', title: 'Random Variables', tag: 'chance, given a number', branch: 'probability', tier: 9, year: 1713,
    prereqs: ['probability', 'functions'],
    why: { functions: 'A random variable is a function from outcomes to numbers — "the dice sum", "the stock’s close". Once chance outputs numbers, all of algebra and calculus can grip it.' },
    explain: 'The upgrade that mathematized randomness: stop tracking outcomes, track numerical summaries of them. Distributions, expectations, and all of statistics follow from this move.',
    problems: [
      { q: 'X = sum of two dice. P(X = 12)?', a: '1/36' },
      { q: 'Possible values of X = number of heads in 3 flips?', a: '0, 1, 2, 3' },
    ],
  },
  {
    id: 'expected-value', title: 'Expected Value', tag: 'the long-run average', branch: 'probability', tier: 9, year: 1657,
    prereqs: ['random-variables'],
    why: { 'random-variables': 'Weight each value by its probability and add: the fair price of any gamble. Casinos are buildings constructed on this one formula being slightly in their favor.' },
    explain: 'What you’d average if you played forever. Insurance premiums, lottery critiques, and every rational decision under uncertainty start with E[X].',
    problems: [
      { q: 'E[one die roll]?', a: '3.5' },
      { q: 'Pay $2 to win $10 on a 6: fair?', a: 'No — EV = −$0.33' },
    ],
  },
  {
    id: 'gamblers-ruin', title: 'Gambler’s Ruin', tag: 'the house always wins — proved', branch: 'probability', tier: 10, year: 1656,
    prereqs: ['expected-value'],
    explain: 'Play a fair game against infinite wealth and you go broke with probability 1. Even fairness cannot save finite pockets — the theorem behind "the house always wins" and bankroll management.',
    problems: [
      { q: 'Fair coin, you have $1, house has $99. P(you win it all)?', a: '1/100' },
      { q: 'Why do casinos love table limits?', a: 'They cap doubling strategies (martingales)' },
    ],
  },
  {
    id: 'binomial-distribution', title: 'Binomial Distribution', tag: 'count the successes', branch: 'probability', tier: 10, year: 1713,
    prereqs: ['random-variables', 'combinations'],
    why: { combinations: 'P(k successes in n tries) needs to count WHICH tries succeeded — that is nCk, straight from Pascal’s triangle.' },
    explain: 'Flip n coins, take n shots, poll n voters: the distribution of "how many succeeded". The first distribution everyone meets, and the parent of the bell curve.',
    problems: [
      { q: 'P(exactly 2 heads in 4 flips)?', a: '6/16 = 3/8' },
      { q: 'Free-throw 80%, 3 shots: P(all 3)?', a: '0.512' },
    ],
  },
  {
    id: 'poisson-distribution', title: 'Poisson Distribution', tag: 'counting rare events', branch: 'probability', tier: 10, year: 1837,
    prereqs: ['random-variables', 'exponential-functions'],
    explain: 'Emails per hour, typos per page, Prussian cavalry deaths by horse-kick (the famous first dataset): when events are rare and independent, one parameter λ predicts the whole pattern.',
    problems: [
      { q: 'λ = 2 calls/min. P(0 calls in a minute)?', a: 'e⁻² ≈ 0.135' },
      { q: 'Poisson’s single parameter λ is both the mean and the…?', a: 'Variance' },
    ],
  },
  {
    id: 'normal-distribution', title: 'The Normal Distribution', tag: 'the bell tolls for everything', branch: 'probability', tier: 10, year: 1733,
    prereqs: ['random-variables', 'improper-integrals'],
    why: { 'improper-integrals': 'The bell curve’s total area over ALL real numbers is exactly 1 — an improper integral (with a √π inside) holding up all of statistics.' },
    explain: 'Heights, measurement errors, test scores: the same bell, everywhere. It shows up uninvited because of the Central Limit Theorem — and 68-95-99.7 is the most useful rule of thumb in science.',
    problems: [
      { q: 'Within ±2σ of the mean lies about…?', a: '95% of the data' },
      { q: 'IQ ~ N(100, 15). P(above 130) ≈ ?', a: '≈ 2.5%' },
    ],
  },
  {
    id: 'law-of-large-numbers', title: 'Law of Large Numbers', tag: 'averages settle down', branch: 'probability', tier: 10, year: 1713,
    prereqs: ['expected-value', 'limits'],
    why: { limits: 'The sample average CONVERGES to the true mean — a limit statement about reality. Bernoulli spent 20 years proving what every casino banks on.' },
    explain: 'Flip enough coins and the heads fraction pins itself to ½. Chance is wild in the small and lawful in the large — the bridge between probability theory and actual data.',
    problems: [
      { q: '10 flips vs 10,000: which fraction is more reliably near 0.5?', a: '10,000' },
      { q: 'Does LLN say heads become "due" after tails?', a: 'No — no memory, only dilution' },
    ],
  },
  {
    id: 'central-limit-theorem', title: 'Central Limit Theorem', tag: 'why the bell is everywhere', branch: 'probability', tier: 11, year: 1810,
    prereqs: ['normal-distribution', 'law-of-large-numbers'],
    why: { 'normal-distribution': 'Add up MANY independent little influences — any shape at all — and their sum bends toward the bell. The normal curve is not an assumption; it is a destination.' },
    explain: 'The most magical theorem in statistics: averages of almost anything become normally distributed. It is why polls work, why measurement errors are bell-shaped, why statistics is possible at all.',
    problems: [
      { q: 'Sum 100 dice. The total’s distribution looks…?', a: 'Bell-shaped (normal)' },
      { q: 'Does CLT need the originals to be bell-shaped?', a: 'No — that’s the magic' },
    ],
  },
  {
    id: 'descriptive-stats', title: 'Descriptive Statistics', tag: 'mean, median, spread', branch: 'probability', tier: 7, year: 1660,
    prereqs: ['division', 'decimals'],
    explain: 'Summarize a thousand numbers with three: center (mean/median), spread (range/SD), shape. The median ignores billionaires; the mean does not — choosing WHICH summary is already an argument.',
    problems: [
      { q: 'Data 2, 3, 3, 10: mean and median?', a: 'Mean 4.5, median 3' },
      { q: 'One billionaire walks into a bar: which jumps, mean or median income?', a: 'The mean' },
    ],
  },
  {
    id: 'data-visualization', title: 'Data Visualization', tag: 'numbers you can see', branch: 'probability', tier: 8, year: 1786,
    prereqs: ['descriptive-stats', 'coordinate-plane'],
    why: { 'coordinate-plane': 'Playfair put time on x and money on y and invented the line chart — data got a picture, and patterns invisible in tables jumped off the page.' },
    explain: 'Histograms, scatter plots, box plots: the eye finds structure faster than any formula. Also the easiest place to lie — truncated axes have moved elections.',
    problems: [
      { q: 'Best first plot for one numeric variable?', a: 'Histogram' },
      { q: 'Classic axis trick to exaggerate change?', a: 'Truncating the y-axis' },
    ],
  },
  {
    id: 'sampling', title: 'Sampling', tag: 'tasting the soup', branch: 'probability', tier: 9, year: 1895,
    prereqs: ['descriptive-stats', 'probability'],
    explain: 'A well-stirred spoonful judges the whole pot: 1,000 random people can speak for 300 million, with quantifiable error. Randomness is the guarantee — the 1936 Literary Digest asked 2.4 million of the WRONG people and blew the election call.',
    problems: [
      { q: 'What matters more: sample size or randomness?', a: 'Randomness (bias beats size)' },
      { q: 'Sampling error shrinks like…?', a: '1/√n' },
    ],
  },
  {
    id: 'hypothesis-testing', title: 'Hypothesis Testing', tag: 'could this be luck?', branch: 'probability', tier: 11, year: 1925,
    prereqs: ['sampling', 'normal-distribution'],
    explain: 'Fisher’s lady claimed she could taste whether milk was poured first — his tea experiment birthed the p-value: IF chance alone ruled, how weird is this data? Every drug trial since runs on that question.',
    problems: [
      { q: 'p = 0.03 means: assuming no effect, P(data this extreme) = ?', a: '3%' },
      { q: 'Does p < 0.05 prove the hypothesis true?', a: 'No — only that luck is an awkward explanation' },
    ],
  },
  {
    id: 'confidence-intervals', title: 'Confidence Intervals', tag: 'honest error bars', branch: 'probability', tier: 11, year: 1937,
    prereqs: ['sampling', 'central-limit-theorem'],
    why: { 'central-limit-theorem': 'The CLT makes sample means bell-shaped — so we can say exactly how far they typically stray, and wrap the estimate in a ±margin.' },
    explain: '"52% ± 3%" — the interval, not the point, is the honest answer. A 95% interval means the METHOD captures truth 95% of the time. Polls, physics constants, and lab results all speak this language.',
    problems: [
      { q: 'Quadrupling the sample size does what to the margin?', a: 'Halves it' },
      { q: 'Poll says 48% ± 3 vs 52% ± 3: settled?', a: 'No — intervals overlap' },
    ],
  },
  {
    id: 'regression', title: 'Correlation & Regression', tag: 'lines through life', branch: 'probability', tier: 11, year: 1886,
    prereqs: ['data-visualization', 'least-squares'],
    why: { 'least-squares': 'Regression IS least squares aimed at data: the best line through the cloud. Galton fit parents’ vs children’s heights and named the "regression to the mean" he saw.' },
    explain: 'How strongly two things move together, and the line that predicts one from the other. The most used — and most abused — tool in science: correlation still is not causation.',
    problems: [
      { q: 'r = −0.9 means…?', a: 'Strong negative relationship' },
      { q: 'Ice cream sales correlate with drownings because…?', a: 'A lurking variable: summer' },
    ],
  },
  {
    id: 'simpsons-paradox', title: 'Simpson’s Paradox', tag: 'the trend that flips', branch: 'probability', tier: 12, year: 1951,
    prereqs: ['regression', 'conditional-probability'],
    explain: 'A treatment can win in every subgroup and lose overall — aggregation can reverse truth. Berkeley’s 1973 admissions "bias" dissolved when split by department. The best cautionary tale in statistics.',
    problems: [
      { q: 'Drug beats placebo for men AND women but loses combined: possible?', a: 'Yes — that IS the paradox' },
      { q: 'The cure is to check…?', a: 'Confounders / group sizes before pooling' },
    ],
  },
  {
    id: 'benfords-law', title: 'Benford’s Law', tag: 'nature’s crooked dice', branch: 'probability', tier: 11, year: 1938,
    prereqs: ['probability', 'log-scales'],
    why: { 'log-scales': 'Data spread across many orders of magnitude is uniform in LOG-space — and log-uniform makes "1" the leading digit 30.1% of the time.' },
    explain: 'In real-world data, small leading digits dominate: 1 appears 30%, 9 barely 4.6%. Forensic accountants catch fraud because embezzlers invent numbers that are too uniform.',
    problems: [
      { q: 'P(leading digit 1) under Benford?', a: 'log₁₀ 2 ≈ 30.1%' },
      { q: 'Who gets caught by it?', a: 'Fabricated data (fraud, fake expenses)' },
    ],
  },
  {
    id: 'markov-chains', title: 'Markov Chains', tag: 'memoryless futures', branch: 'probability', tier: 12, year: 1906,
    prereqs: ['probability', 'matrices'],
    why: { matrices: 'All transition odds fit one matrix; tomorrow is a matrix multiplication away, and the long-run forecast is its eigenvector.' },
    explain: 'Systems whose next step depends only on NOW: board games, weather models, text prediction. Google’s PageRank imagines a surfer clicking forever — a Markov chain crowned the web.',
    problems: [
      { q: 'Sunny→sunny 0.9. P(sunny in 2 days | sunny, staying via sunny)?', a: '0.81 (plus other paths)' },
      { q: 'What property defines Markov?', a: 'Only the current state matters' },
    ],
  },
  {
    id: 'stochastic-processes', title: 'Stochastic Processes', tag: 'randomness in motion', branch: 'probability', tier: 13, year: 1900,
    prereqs: ['markov-chains', 'central-limit-theorem'],
    explain: 'Randomness with a clock: stock prices, pollen jitter, neuron spikes. Bachelier modeled the Paris Bourse five years before Einstein used the same walk for atoms — Brownian motion runs both markets and molecules.',
    problems: [
      { q: 'A random walk’s typical distance after n steps?', a: '≈ √n' },
      { q: 'Black-Scholes option pricing is built on which process?', a: 'Brownian motion' },
    ],
  },
  {
    id: 'monte-carlo', title: 'Monte Carlo Methods', tag: 'solve it by rolling dice', branch: 'probability', tier: 12, year: 1946,
    prereqs: ['law-of-large-numbers', 'random-variables'],
    why: { 'law-of-large-numbers': 'Simulate a million random trials and average — LLN guarantees the average converges to the true answer. Integration by gambling.' },
    explain: 'Ulam, recovering from illness and playing solitaire, realized simulation beats calculation when problems get ugly. Nuclear physics, graphics rendering, and AlphaGo’s tree search all roll these dice.',
    problems: [
      { q: 'Estimate π: throw darts at a square with an inscribed circle, then…?', a: '4 × (fraction inside circle)' },
      { q: 'Monte Carlo error shrinks like…?', a: '1/√n' },
    ],
  },
  {
    id: 'bayesian-statistics', title: 'Bayesian Statistics', tag: 'science as belief-updating', branch: 'probability', tier: 12, year: 1939,
    prereqs: ['bayes-theorem', 'hypothesis-testing'],
    explain: 'Start with a prior, feed in data, get a posterior — rinse, repeat. Turing used it to crack Enigma; modern AI, spam filters, and A/B tests are Bayesian updating at industrial scale.',
    problems: [
      { q: 'Prior × likelihood ∝ …?', a: 'Posterior' },
      { q: 'How do Bayesians and frequentists differ on "probability"?', a: 'Degree of belief vs long-run frequency' },
    ],
  },
]
