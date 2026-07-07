import type { Person } from './types'

// Chalk medallions floating near the fields they built.
// `near` ids must exist in the branch data.

export const PEOPLE: Person[] = [
  { id: 'pythagoras', name: 'Pythagoras', years: 'c. 570–495 BC', year: -530, glyph: 'a² + b² = c²', legend: 'Mystic who heard numbers in music strings and right angles — his cult treated proof like prayer.', near: ['pythagorean-theorem', 'irrational-numbers'] },
  { id: 'euclid', name: 'Euclid', years: 'c. 300 BC', year: -300, glyph: 'Q.E.D.', legend: 'Wrote the Elements — 13 books that made "prove it" the law of mathematics for 2,000 years.', near: ['primes', 'gcd-lcm'] },
]
