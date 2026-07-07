import type { TopicNode } from '../types'

// Tier 5-13. What is truth, what is proof, what can be known.

export const LOGIC: TopicNode[] = [
  {
    id: 'propositional-logic', title: 'Propositional Logic', tag: 'AND, OR, NOT', branch: 'logic', tier: 5, year: -350,
    prereqs: ['euclidean-proof'],
    why: { 'euclidean-proof': 'Euclid showed proofs in action; Aristotle asked what makes ANY argument valid, regardless of subject. Logic is the grammar underneath every theorem on this board.' },
    explain: 'Statements that are true or false, glued by AND, OR, NOT, IF-THEN. Aristotle’s syllogisms ruled for 2,000 years — then became the algebra your phone’s chips compute a trillion times a second.',
    problems: [
      { q: '"If it rains, the ground is wet. The ground is wet." Did it rain?', a: 'Unknown — affirming the consequent' },
      { q: 'Negate "all swans are white".', a: 'Some swan is not white' },
    ],
  },
  {
    id: 'truth-tables', title: 'Truth Tables', tag: 'every case, checked', branch: 'logic', tier: 6, year: 1921,
    prereqs: ['propositional-logic'],
    explain: 'Brute-force honesty: list every combination of true/false and evaluate. Tautologies show all-true columns; contradictions all-false. Wittgenstein used them to argue logic says nothing — and everything.',
    problems: [
      { q: 'Rows in a truth table for 3 variables?', a: '8' },
      { q: 'Is "P OR NOT P" a tautology?', a: 'Yes' },
    ],
  },
  {
    id: 'predicate-logic', title: 'Predicate Logic', tag: '∀ and ∃ — for all, there exists', branch: 'logic', tier: 6, year: 1879,
    prereqs: ['propositional-logic'],
    why: { 'propositional-logic': 'Propositions can’t see inside "all primes are odd" — quantifiers can. Frege’s 1879 Begriffsschrift added ∀/∃ and became, arguably, logic’s biggest leap since Aristotle.' },
    explain: 'The language mathematics is actually written in: every ε-δ definition, every theorem statement is quantifier choreography. Swap ∀∃ order and truth changes — precision at machine grade.',
    problems: [
      { q: '"∀x ∃y: y > x" — true for numbers?', a: 'Yes' },
      { q: '"∃y ∀x: y > x" — same symbols, reordered?', a: 'False — no largest number' },
    ],
  },
  {
    id: 'axiomatic-systems', title: 'Axiomatic Systems', tag: 'choose beliefs, derive worlds', branch: 'logic', tier: 7, year: 1899,
    prereqs: ['predicate-logic', 'euclidean-proof'],
    why: { 'euclidean-proof': 'Hilbert redid Euclid with modern rigor and a manifesto: axioms are not truths but CHOICES — "tables, chairs, beer mugs" could replace points and lines if the rules held.' },
    explain: 'Pick axioms, crank the logic, get a mathematics. Change the pick, get another (non-Euclidean geometry proved that). Hilbert dreamed of axioms for everything, provably consistent — hold that thought for Gödel.',
    problems: [
      { q: 'Can axioms be "wrong"?', a: 'Only inconsistent — they are choices, not facts' },
      { q: 'Whose program sought complete, consistent axioms for all math?', a: 'Hilbert’s' },
    ],
  },
  {
    id: 'cardinality', title: 'Cardinality', tag: 'comparing infinities', branch: 'logic', tier: 8, year: 1874,
    prereqs: ['sets', 'functions'],
    why: {
      sets: 'Two sets are the same size when a perfect pairing exists — no counting needed. Cantor applied it to INFINITE sets, and sizes appeared where none should be.',
      functions: 'The pairing is a bijection: same-size means some function matches elements one-to-one, none left over. Even for infinite sets.',
    },
    explain: 'The evens match the integers (pair n with 2n) — an infinite set the same size as its half. Hotel-sized scandals like this got Cantor called a "corrupter of youth". He was simply right.',
    problems: [
      { q: 'Are the even numbers "fewer" than the integers?', a: 'No — same cardinality' },
      { q: 'Are the rationals countable?', a: 'Yes — zigzag through the grid' },
    ],
  },
  {
    id: 'countable-uncountable', title: 'Uncountable Infinity', tag: 'some infinities are bigger', branch: 'logic', tier: 9, year: 1874,
    prereqs: ['cardinality', 'decimals'],
    why: {
      cardinality: 'Cantor’s diagonal: list ALL decimals, then build one differing from the nth at digit n — it escapes every list. The reals are a strictly LARGER infinity.',
      decimals: 'The proof runs on decimal expansions — infinite digit strings are exactly what outnumber the integers.',
    },
    explain: 'The most shocking proof of the 19th century, four lines long. Infinity comes in sizes; there is a whole ladder of them (ℵ₀, ℵ₁, …); and most real numbers can never be named or listed.',
    problems: [
      { q: 'Is the set of ALL integer lists (infinite sequences) countable?', a: 'No — diagonalize' },
      { q: 'The trick’s name?', a: 'Cantor’s diagonal argument' },
    ],
  },
  {
    id: 'hilberts-hotel', title: 'Hilbert’s Hotel', tag: 'no vacancy — come on in', branch: 'logic', tier: 9, year: 1924,
    prereqs: ['countable-uncountable'],
    explain: 'A full infinite hotel always has room: shift everyone up one; for infinitely many guests, send room n to 2n. Comedy that is also rigorous — the arithmetic of ℵ₀, staged.',
    problems: [
      { q: 'Full hotel, one new guest: the move?', a: 'Everyone shifts +1; room 1 opens' },
      { q: 'Full hotel, infinite bus: the move?', a: 'Room n → 2n; odd rooms open' },
    ],
  },
  {
    id: 'ordinals', title: 'Ordinals', tag: 'counting past infinity', branch: 'logic', tier: 10, year: 1883,
    prereqs: ['countable-uncountable'],
    explain: 'After all the numbers comes ω, then ω+1, then ω·2, ωω, and up forever — order-types of well-ordered sets. Cantor’s transfinite staircase, where even "and then keep going" is a number.',
    problems: [
      { q: 'Is ω + 1 = 1 + ω?', a: 'No — 1+ω = ω, but ω+1 > ω' },
      { q: 'What comes immediately after all finite numbers?', a: 'ω' },
    ],
  },
  {
    id: 'russells-paradox', title: 'Russell’s Paradox', tag: 'the set that broke mathematics', branch: 'logic', tier: 8, year: 1901,
    prereqs: ['sets', 'predicate-logic'],
    why: { sets: 'The set of all sets that do NOT contain themselves: does it contain itself? Yes implies no; no implies yes. Naive set theory died of one sentence.' },
    explain: 'Russell mailed it to Frege as Frege’s life’s work sat at the printer; Frege appended history’s most heartbreaking postscript. The barber who shaves exactly those who don’t shave themselves — same knife.',
    problems: [
      { q: 'Who shaves the barber?', a: 'Contradiction either way — no such barber' },
      { q: 'Whose system did the paradox destroy?', a: 'Frege’s' },
    ],
  },
  {
    id: 'zfc', title: 'ZFC Set Theory', tag: 'the patched foundations', branch: 'logic', tier: 9, year: 1908,
    prereqs: ['russells-paradox', 'axiomatic-systems'],
    why: { 'russells-paradox': 'Zermelo’s repair: sets are BUILT upward by sanctioned steps, never summoned by description. "The set of all sets" becomes ungrammatical — the paradox can’t be written.' },
    explain: 'Nine axioms that (as far as a century of hammering shows) hold. Officially, every object in mathematics — numbers, functions, this graph — is a ZFC set. The constitution of modern math.',
    problems: [
      { q: 'Does ZFC allow a set of all sets?', a: 'No' },
      { q: 'What does the C stand for?', a: 'Choice (the axiom of)' },
    ],
  },
  {
    id: 'axiom-of-choice', title: 'Axiom of Choice', tag: 'infinitely many choices at once', branch: 'logic', tier: 10, year: 1904,
    prereqs: ['zfc'],
    explain: 'From infinitely many bins, pick one item from each — harmless? It implies every set can be well-ordered AND that a ball splits into five pieces reassembling into two balls (Banach–Tarski). Accepted, warily, everywhere.',
    problems: [
      { q: 'The famous "paradox" it enables?', a: 'Banach–Tarski (one ball → two)' },
      { q: 'Is AC provable from the other axioms?', a: 'No — independent (Gödel + Cohen)' },
    ],
  },
  {
    id: 'continuum-hypothesis', title: 'Continuum Hypothesis', tag: 'the question with no answer', branch: 'logic', tier: 11, year: 1878,
    prereqs: ['countable-uncountable', 'zfc'],
    why: { 'countable-uncountable': 'Is there an infinity strictly between the integers and the reals? Cantor bet no and broke himself on it; Hilbert made it Problem #1 of his famous 23.' },
    explain: 'The resolution is the twist: Gödel (1940) proved you cannot REFUTE it from ZFC; Cohen (1963) proved you cannot PROVE it. Mathematics’ own axioms leave it forever open. Choose your universe.',
    problems: [
      { q: 'Can ZFC settle CH?', a: 'No — independent of ZFC' },
      { q: 'Which two men split the independence proof?', a: 'Gödel and Cohen' },
    ],
  },
  {
    id: 'godel-incompleteness', title: 'Gödel’s Incompleteness', tag: 'truth outruns proof', branch: 'logic', tier: 11, year: 1931,
    prereqs: ['axiomatic-systems', 'zfc'],
    why: { 'axiomatic-systems': 'Hilbert demanded a complete, consistent axiom system for mathematics. Gödel, 25, answered: any system rich enough for arithmetic contains TRUE statements it cannot prove — and cannot prove its own consistency.' },
    explain: 'He built a sentence that says "I am not provable" — out of pure arithmetic, by encoding statements as numbers. The dream of total mathematical certainty ended in 1931, killed from the inside.',
    problems: [
      { q: 'What does Gödel’s sentence assert?', a: 'Its own unprovability' },
      { q: 'Can strong systems prove their own consistency?', a: 'No — second incompleteness theorem' },
    ],
  },
  {
    id: 'turing-machines', title: 'Turing Machines', tag: 'computation, defined', branch: 'logic', tier: 11, year: 1936,
    prereqs: ['algorithms', 'predicate-logic'],
    why: { algorithms: 'What IS an algorithm, exactly? Turing’s answer: a tape, a head, a state table — and everything computable is computable by one. Your laptop is this machine, gilded.' },
    explain: 'Invented to settle a logic question, it became the blueprint of the computer age. The universal machine — one machine simulating all others — is the idea of SOFTWARE itself.',
    problems: [
      { q: 'The universal machine gave us which everyday concept?', a: 'Software / the stored program' },
      { q: 'What are a Turing machine’s three parts?', a: 'Tape, head, state table' },
    ],
  },
  {
    id: 'halting-problem', title: 'The Halting Problem', tag: 'the uncomputable, found', branch: 'logic', tier: 12, year: 1936,
    prereqs: ['turing-machines', 'russells-paradox'],
    why: { 'russells-paradox': 'Feed a "does-it-halt?" oracle a program built to do the OPPOSITE of the oracle’s prediction about itself — the same self-reference knife as the barber, now cutting computation.' },
    explain: 'No program can decide, for all programs, whether they halt. Perfect virus scanners, perfect bug-finders, perfect auto-graders: provably impossible, forever. Computation has a horizon.',
    problems: [
      { q: 'Can some halting cases be decided?', a: 'Yes — just not ALL, uniformly' },
      { q: 'What does it imply about perfect malware detection?', a: 'Impossible in general' },
    ],
  },
  {
    id: 'lambda-calculus', title: 'Lambda Calculus', tag: 'functions all the way down', branch: 'logic', tier: 12, year: 1936,
    prereqs: ['turing-machines', 'functions'],
    why: { 'turing-machines': 'Church built computation from nothing but function-application — and it computes EXACTLY what Turing’s tapes compute. Two alien definitions, one boundary: strong evidence both found the real thing.' },
    explain: 'Numbers, booleans, loops — all encoded as pure functions. LISP was carved from it in 1958; Haskell, closures, and arrow functions in your browser are lambda calculus with better marketing.',
    problems: [
      { q: 'Lambda calculus computes the same class as…?', a: 'Turing machines (Church–Turing)' },
      { q: 'Name a language family descended from it.', a: 'LISP / functional languages' },
    ],
  },
  {
    id: 'model-theory', title: 'Model Theory', tag: 'axioms and their worlds', branch: 'logic', tier: 12, year: 1930,
    prereqs: ['predicate-logic', 'zfc'],
    explain: 'The study of which structures satisfy which axioms. Its shock result (Löwenheim–Skolem): axioms never pin down one world — theories of the uncountable have countable models. Language underdetermines reality.',
    problems: [
      { q: 'Can first-order axioms force exactly one model?', a: 'No (beyond finite cases)' },
      { q: 'A "model" of axioms is…?', a: 'A structure making them all true' },
    ],
  },
  {
    id: 'type-theory', title: 'Type Theory', tag: 'proofs ARE programs', branch: 'logic', tier: 13, year: 1972,
    prereqs: ['lambda-calculus', 'russells-paradox'],
    why: {
      'russells-paradox': 'Russell invented types to outlaw self-swallowing sets. Martin-Löf rebuilt them into a full foundation — where the paradox is a type error.',
      'lambda-calculus': 'Curry–Howard: a proposition is a type; a proof is a program of that type. Verifying a proof IS type-checking a program — the deepest pun in mathematics.',
    },
    explain: 'The foundation computers prefer: Lean, Coq, and Agda check proofs mechanically. The Four-Color and Kepler proofs are formally verified; mathematicians increasingly let the machine hold the ladder.',
    problems: [
      { q: 'Under Curry–Howard, a proof corresponds to a…?', a: 'Program (of the proposition’s type)' },
      { q: 'Name a proof assistant.', a: 'Lean (or Coq, Agda, Isabelle)' },
    ],
  },
]
