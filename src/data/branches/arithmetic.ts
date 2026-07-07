import type { TopicNode } from '../types'

// The trunk. Tier 0-5, the dense core of the web.

export const ARITHMETIC: TopicNode[] = [
  {
    id: 'counting', title: 'Counting', tag: 'where everything begins', branch: 'arithmetic', tier: 0, year: -3000,
    explain: 'One, two, three — matching things to numbers. Every idea on this board, all the way to the research frontier, grows out of this single act.',
    problems: [
      { q: 'How many sides does a cube have?', a: '6' },
      { q: 'Count by threes: 3, 6, 9, … what comes 5th?', a: '15' },
    ],
  },
  {
    id: 'addition', title: 'Addition', tag: 'counting on', branch: 'arithmetic', tier: 1, year: -2500,
    prereqs: ['counting'],
    why: { counting: 'Adding IS counting — start at 3, count on 2 more, land on 5. Addition just names the shortcut.' },
    explain: 'Combining two piles into one. Addition is counting with a head start, and it is the seed of multiplication, exponents, sums, and integrals far above.',
    problems: [
      { q: '47 + 38 = ?', a: '85' },
      { q: 'What number added to 26 gives 61?', a: '35' },
    ],
  },
  {
    id: 'place-value', title: 'Place Value', tag: 'why 10 is not 1 and 0', branch: 'arithmetic', tier: 1, year: -2000,
    prereqs: ['counting'],
    explain: 'Position gives a digit its power: the 7 in 704 means seven hundreds. Base-ten notation is one of the greatest inventions on this board — long division, decimals, and computers all lean on it.',
    problems: [
      { q: 'In 5,382 — what does the 3 stand for?', a: '300' },
      { q: 'Write "four thousand and forty" in digits.', a: '4040' },
    ],
  },
  {
    id: 'subtraction', title: 'Subtraction', tag: 'addition, undone', branch: 'arithmetic', tier: 2, year: -2500,
    prereqs: ['addition'],
    why: { addition: 'Subtraction is the question "what do I add?" — 9 − 4 asks: 4 plus what makes 9. Every inverse operation on this board echoes this move.' },
    explain: 'Taking away, or measuring the gap between two numbers. It is the first "inverse" — an operation that undoes another — a pattern you will meet again in division, logarithms, and integrals.',
    problems: [
      { q: '83 − 47 = ?', a: '36' },
      { q: 'The gap between 250 and 178 is?', a: '72' },
    ],
  },
  {
    id: 'multiplication', title: 'Multiplication', tag: 'repeated addition, weaponized', branch: 'arithmetic', tier: 2, year: -2000,
    prereqs: ['addition'],
    why: { addition: '3 × 4 is 4 + 4 + 4. Multiplication compresses repeated addition into one move — the same trick exponents will pull on multiplication itself.' },
    explain: 'Adding the same number again and again, collapsed into a single act. Rows × columns, scaling, area — multiplication is the workhorse of the entire board.',
    problems: [
      { q: '7 × 8 = ?', a: '56' },
      { q: 'A crate holds 12 boxes of 24 eggs. How many eggs?', a: '288' },
    ],
  },
  {
    id: 'zero', title: 'Zero', tag: 'the number that is nothing', branch: 'arithmetic', tier: 2, year: 628,
    prereqs: ['place-value'],
    why: { 'place-value': 'Zero was born as a placeholder — the empty column in 704. Then Brahmagupta dared to treat "nothing" as a number you can calculate with.' },
    explain: 'Nothing, treated as a number. Zero took centuries to be accepted, and the whole algebra sector depends on it: equations are solved by asking "when does this equal zero?"',
    problems: [
      { q: 'What is 47 × 0?', a: '0' },
      { q: 'Why can’t you divide by 0? (one short reason)', a: 'No number times 0 gives a nonzero answer — the question has no answer.' },
    ],
  },
  {
    id: 'division', title: 'Division', tag: 'sharing, and repeated subtraction', branch: 'arithmetic', tier: 3, year: -2000,
    prereqs: ['multiplication', 'subtraction'],
    why: {
      multiplication: 'Division un-does multiplication: 12 ÷ 3 asks "3 times what makes 12?" They are one fact wearing two faces.',
      subtraction: 'Division is repeated subtraction: 12 ÷ 4 counts how many times you can take 4 away before hitting zero. Three hops.',
    },
    explain: 'Splitting into equal groups — or asking how many times one number fits inside another. Fractions, ratios, and rates are all division in disguise.',
    problems: [
      { q: '156 ÷ 12 = ?', a: '13' },
      { q: '5 friends split $85 evenly. Each gets?', a: '$17' },
    ],
  },
  {
    id: 'negative-numbers', title: 'Negative Numbers', tag: 'below zero', branch: 'arithmetic', tier: 3, year: 200,
    prereqs: ['subtraction', 'zero'],
    why: {
      subtraction: '5 − 8 has no answer in counting numbers. Negatives are invented so subtraction ALWAYS works — math grows by refusing to say "impossible".',
      zero: 'Zero is the mirror. Negatives live on the other side of it, each number paired with its opposite.',
    },
    explain: 'Numbers below zero — debts, depths, temperatures. Invented so that subtraction never fails. The pattern "extend the numbers so the operation always works" repeats with fractions, irrationals, and imaginaries.',
    problems: [
      { q: '−7 + 12 = ?', a: '5' },
      { q: '(−4) × (−6) = ?', a: '24' },
    ],
  },
  {
    id: 'number-line', title: 'The Number Line', tag: 'numbers become places', branch: 'arithmetic', tier: 3, year: 1637,
    prereqs: ['negative-numbers'],
    why: { 'negative-numbers': 'Once numbers go below zero, they need somewhere to stand — a line running both ways, with zero in the middle.' },
    explain: 'Every number gets a home on an endless line. This quiet picture is enormous: it turns arithmetic into geometry, and it is the stage where calculus and analysis will later perform.',
    problems: [
      { q: 'What number sits exactly halfway between −3 and 9?', a: '3' },
      { q: 'How far apart are −5 and 7?', a: '12' },
    ],
  },
  {
    id: 'long-division', title: 'Long Division', tag: 'division, industrialized', branch: 'arithmetic', tier: 4, year: 1200,
    prereqs: ['division', 'place-value'],
    why: { division: 'Long division is just division run one place-value column at a time — a repeatable recipe instead of a guess.' },
    explain: 'A step-by-step recipe that divides any two numbers using place value. It is also your first real algorithm — a machine made of steps — foreshadowing the entire computation sector.',
    problems: [
      { q: '1,344 ÷ 21 = ?', a: '64' },
      { q: '2,000 ÷ 16 = ?', a: '125' },
    ],
  },
  {
    id: 'remainders', title: 'Remainders', tag: 'what refuses to divide', branch: 'arithmetic', tier: 4, year: -300,
    prereqs: ['division'],
    explain: 'What is left over when division does not come out even. Remainders look small but power clock arithmetic, cryptography, and half of number theory.',
    problems: [
      { q: '58 ÷ 9 leaves remainder…?', a: '4' },
      { q: 'What day of the week is it 30 days after a Monday?', a: 'Wednesday (30 mod 7 = 2)' },
    ],
  },
  {
    id: 'fractions', title: 'Fractions', tag: 'numbers between numbers', branch: 'arithmetic', tier: 4, year: -1800,
    prereqs: ['division'],
    why: { division: 'A fraction IS a division you refused to finish: 3 ÷ 4 = ¾. Write the question down and call it the answer.' },
    explain: 'Parts of a whole — the numbers living between the whole numbers. Egyptians used them 4,000 years ago. Ratios, probability, and rational functions all grow from here.',
    problems: [
      { q: '½ + ⅓ = ?', a: '5/6' },
      { q: 'Which is bigger: 5/8 or 3/5?', a: '5/8' },
    ],
  },
  {
    id: 'decimals', title: 'Decimals', tag: 'fractions in base-ten clothes', branch: 'arithmetic', tier: 5, year: 1585,
    prereqs: ['fractions', 'place-value'],
    why: {
      fractions: '0.75 and ¾ are the same number in different clothes — decimals are fractions whose denominators are powers of ten.',
      'place-value': 'Decimals extend place value past the units digit: tenths, hundredths, thousandths — the same idea, marching right.',
    },
    explain: 'Simon Stevin’s 1585 pamphlet taught Europe to write fractions with a dot. Decimals make measuring, money, and science practical — and lead straight to the idea of infinite decimal expansions.',
    problems: [
      { q: 'Write 7/8 as a decimal.', a: '0.875' },
      { q: '0.3 × 0.3 = ?', a: '0.09' },
    ],
  },
  {
    id: 'percentages', title: 'Percentages', tag: 'fractions of a hundred', branch: 'arithmetic', tier: 5, year: 1500,
    prereqs: ['fractions', 'decimals'],
    explain: 'Per centum — for each hundred. A standard ruler for comparing parts: interest rates, discounts, statistics. Every percentage is a fraction with 100 on the bottom.',
    problems: [
      { q: '15% of 80 = ?', a: '12' },
      { q: 'A $60 jacket is 25% off. New price?', a: '$45' },
    ],
  },
  {
    id: 'ratios', title: 'Ratios & Proportion', tag: 'comparing by dividing', branch: 'arithmetic', tier: 5, year: -300,
    prereqs: ['fractions'],
    explain: 'How many of this per one of that. Ratios power maps, recipes, similar triangles, and slopes. The Greeks built their whole theory of size on proportion.',
    problems: [
      { q: 'Mix juice 2:5 with water. With 6 cups juice, how much water?', a: '15 cups' },
      { q: 'Solve x/12 = 3/4.', a: 'x = 9' },
    ],
  },
  {
    id: 'rounding', title: 'Rounding & Estimation', tag: 'close enough, on purpose', branch: 'arithmetic', tier: 5, year: 1500,
    prereqs: ['decimals'],
    explain: 'Deliberately trading precision for speed. Good estimation is a superpower: it catches nonsense answers before they escape, and it is the spirit behind limits and approximation theory upstairs.',
    problems: [
      { q: 'Estimate 39 × 21 in your head.', a: '≈ 800 (exact: 819)' },
      { q: 'Round 3.14159 to 2 decimal places.', a: '3.14' },
    ],
  },
  {
    id: 'order-of-operations', title: 'Order of Operations', tag: 'the grammar of arithmetic', branch: 'arithmetic', tier: 3, year: 1600,
    prereqs: ['multiplication', 'addition'],
    explain: 'Rules that make one expression mean one thing: powers before products, products before sums. Not a law of nature — a shared grammar so every reader computes the same answer.',
    problems: [
      { q: '3 + 4 × 5 = ?', a: '23' },
      { q: '(8 − 3)² − 10 ÷ 2 = ?', a: '20' },
    ],
  },
  {
    id: 'exponents', title: 'Exponents', tag: 'repeated multiplication, compressed', branch: 'arithmetic', tier: 4, year: 1637,
    prereqs: ['multiplication'],
    why: { multiplication: '2⁵ is 2·2·2·2·2. Exponents do to multiplication exactly what multiplication did to addition — compress the repeat.' },
    explain: 'Powers: growth that multiplies instead of adds. Doubling, compound interest, exponential explosions — and the doorway to roots, logarithms, and e.',
    problems: [
      { q: '2¹⁰ = ?', a: '1024' },
      { q: '5³ × 5² = 5^?', a: '5⁵ = 3125' },
    ],
  },
  {
    id: 'square-roots', title: 'Roots', tag: 'exponents, undone', branch: 'arithmetic', tier: 5, year: -1700,
    prereqs: ['exponents'],
    why: { exponents: 'A root asks the backwards question: what number, squared, gives 49? Another inverse — the board’s favorite move.' },
    explain: 'The inverse of powers. Babylonians approximated √2 on clay tablets 3,700 years ago. Roots crack open right triangles, quadratic equations — and the shocking discovery that some numbers are irrational.',
    problems: [
      { q: '√144 = ?', a: '12' },
      { q: 'Between which two whole numbers is √40?', a: '6 and 7' },
    ],
  },
  {
    id: 'scientific-notation', title: 'Scientific Notation', tag: 'taming the huge and tiny', branch: 'arithmetic', tier: 5, year: -250,
    prereqs: ['exponents', 'decimals'],
    explain: 'Archimedes counted the sand grains in the universe; we write 3 × 10⁸ for the speed of light. Powers of ten let one line of chalk hold a galaxy or an atom.',
    problems: [
      { q: 'Write 4,500,000 in scientific notation.', a: '4.5 × 10⁶' },
      { q: '(2 × 10³) × (3 × 10⁴) = ?', a: '6 × 10⁷' },
    ],
  },
  {
    id: 'factors-multiples', title: 'Factors & Multiples', tag: 'what divides what', branch: 'arithmetic', tier: 4, year: -300,
    prereqs: ['multiplication', 'division'],
    explain: 'The divisibility skeleton of the whole numbers: 12 = 2·2·3. Which numbers fit inside which is the founding question of the entire number theory sector.',
    problems: [
      { q: 'List the factors of 36.', a: '1, 2, 3, 4, 6, 9, 12, 18, 36' },
      { q: 'What is the 7th multiple of 8?', a: '56' },
    ],
  },
  {
    id: 'primes', title: 'Prime Numbers', tag: 'the atoms of arithmetic', branch: 'arithmetic', tier: 5, year: -300,
    prereqs: ['factors-multiples'],
    why: { 'factors-multiples': 'Primes are the numbers with NO smaller factors — the unbreakable pieces every other number is built from.' },
    explain: 'Numbers divisible only by 1 and themselves. Euclid proved there are infinitely many; today they lock your bank account. The deepest unsolved problem on this board — the Riemann Hypothesis — is about their rhythm.',
    problems: [
      { q: 'Is 91 prime?', a: 'No — 7 × 13' },
      { q: 'Break 84 into primes.', a: '2² × 3 × 7' },
    ],
  },
  {
    id: 'gcd-lcm', title: 'GCD & LCM', tag: 'the greatest shared piece', branch: 'arithmetic', tier: 5, year: -300,
    prereqs: ['factors-multiples'],
    explain: 'The biggest factor two numbers share, and the smallest multiple they both reach. Euclid’s algorithm for the GCD is the oldest algorithm still in daily use — 2,300 years and counting.',
    problems: [
      { q: 'GCD of 48 and 60?', a: '12' },
      { q: 'LCM of 6 and 10?', a: '30' },
    ],
  },
  {
    id: 'divisibility-rules', title: 'Divisibility Rules', tag: 'x-ray vision for numbers', branch: 'arithmetic', tier: 5, year: 1200,
    prereqs: ['division', 'place-value'],
    explain: 'Digit tricks that reveal factors without dividing: digits summing to 9 means divisible by 9. Each rule is a small theorem about place value in disguise.',
    problems: [
      { q: 'Is 4,731 divisible by 3?', a: 'Yes (4+7+3+1 = 15)' },
      { q: 'Is 53,196 divisible by 4?', a: 'Yes (96 is)' },
    ],
  },
  {
    id: 'absolute-value', title: 'Absolute Value', tag: 'distance, ignoring direction', branch: 'arithmetic', tier: 4, year: 1806,
    prereqs: ['negative-numbers', 'number-line'],
    explain: 'How far from zero, forgetting the sign: |−7| = 7. Innocent here — but "size of the gap" grows up to become the definition of limits and the heart of analysis.',
    problems: [
      { q: '|−13| + |4| = ?', a: '17' },
      { q: 'Solve |x| = 5.', a: 'x = 5 or x = −5' },
    ],
  },
  {
    id: 'irrational-numbers', title: 'Irrational Numbers', tag: 'the scandal of √2', branch: 'arithmetic', tier: 5, year: -450,
    prereqs: ['square-roots', 'fractions'],
    why: {
      'square-roots': '√2 exists — it’s the diagonal of a unit square — but NO fraction squares to 2. The Pythagoreans allegedly drowned the man who proved it.',
      fractions: 'Irrationals are exactly the numbers fractions cannot reach — an infinity of holes in the fraction line.',
    },
    explain: 'Numbers that no fraction can express: √2, π, e. Their decimal digits run forever without pattern. Filling these holes properly takes two millennia and creates real analysis.',
    problems: [
      { q: 'Is 0.101001000100001… rational?', a: 'No — the pattern never repeats' },
      { q: 'Name two famous irrational numbers.', a: 'π and √2 (or e, φ)' },
    ],
  },
  {
    id: 'clock-arithmetic', title: 'Clock Arithmetic', tag: 'numbers that wrap around', branch: 'arithmetic', tier: 5, year: 1801,
    prereqs: ['remainders'],
    why: { remainders: 'On a clock, only the remainder survives: 9 + 6 = 15 = 3 o’clock. Arithmetic done entirely with remainders.' },
    explain: 'Arithmetic on a circle: after 12 comes 1 again. Gauss turned this toy into modular arithmetic — the engine of cryptography and the gateway drug to number theory.',
    problems: [
      { q: 'It’s 10 o’clock. What time is it 100 hours later?', a: '2 o’clock (100 mod 12 = 4)' },
      { q: '17 mod 5 = ?', a: '2' },
    ],
  },
]
