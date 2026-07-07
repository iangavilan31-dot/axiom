import type { TopicNode } from '../types'

// Tier 8-13. Arrows and grids of numbers — the language of data and space.

export const LINEAR_ALGEBRA: TopicNode[] = [
  {
    id: 'vectors', title: 'Vectors', tag: 'arrows with attitude', branch: 'linear-algebra', tier: 8, year: 1844,
    prereqs: ['coordinate-plane', 'negative-numbers'],
    why: { 'coordinate-plane': 'A point (3, 4) becomes an ARROW from the origin — something you can add, stretch, and aim. Coordinates grow verbs.' },
    explain: 'Quantities with direction: velocity, force, displacement. Add them tip-to-tail, scale them by numbers. Everything from game physics to GPT embeddings is vectors underneath.',
    problems: [
      { q: '(2, 3) + (4, −1) = ?', a: '(6, 2)' },
      { q: 'Length of vector (6, 8)?', a: '10' },
    ],
  },
  {
    id: 'dot-product', title: 'Dot Product', tag: 'how aligned are two arrows?', branch: 'linear-algebra', tier: 9, year: 1844,
    prereqs: ['vectors', 'law-of-cosines'],
    why: { 'law-of-cosines': 'a·b = |a||b|cos θ — the dot product IS the law of cosines’ correction term, promoted to its own operation. It measures agreement.' },
    explain: 'Multiply matching components and add: one number saying how much two vectors point the same way. Zero means perpendicular. Search engines rank documents by dot products of meaning-vectors.',
    problems: [
      { q: '(1, 2)·(3, 4) = ?', a: '11' },
      { q: '(2, 1)·(−1, 2) = ? What does it mean?', a: '0 — perpendicular' },
    ],
  },
  {
    id: 'cross-product', title: 'Cross Product', tag: 'the perpendicular arrow', branch: 'linear-algebra', tier: 10, year: 1843,
    prereqs: ['dot-product', 'solid-geometry'],
    explain: 'In 3D, two vectors define a parallelogram; the cross product is the arrow perpendicular to it, as long as its area. Torque, magnetic force, and every 3D game camera use it.',
    problems: [
      { q: '|a × b| equals the area of…?', a: 'The parallelogram they span' },
      { q: 'x̂ × ŷ = ?', a: 'ẑ' },
    ],
  },
  {
    id: 'matrices', title: 'Matrices', tag: 'numbers in formation', branch: 'linear-algebra', tier: 9, year: 1850,
    prereqs: ['systems-of-equations'],
    why: { 'systems-of-equations': 'Strip a system’s letters and keep the coefficient grid — that grid IS the matrix. The system becomes one crisp equation: Ax = b.' },
    explain: 'Rectangular arrays of numbers that act like single objects. Spreadsheets, images, graphs, quantum states — anything with rows and columns of structure becomes a matrix.',
    problems: [
      { q: 'Dimensions of a matrix with 3 rows, 5 columns?', a: '3 × 5' },
      { q: 'Write x + 2y = 5, 3x − y = 1 as a matrix equation.', a: '[[1,2],[3,−1]]·[x,y]ᵀ = [5,1]ᵀ' },
    ],
  },
  {
    id: 'matrix-multiplication', title: 'Matrix Multiplication', tag: 'machines composed', branch: 'linear-algebra', tier: 10, year: 1858,
    prereqs: ['matrices', 'dot-product'],
    why: { 'dot-product': 'Each output entry is a dot product — row meets column. The strange recipe exists so that multiplying matrices means DOING one transformation after another.' },
    explain: 'Cayley’s rule looks arbitrary until you see it: AB means "apply B, then A". Composition of actions, as arithmetic. Warning: AB ≠ BA — order matters, for the first time on this board.',
    problems: [
      { q: '[[1,2],[0,1]] × [[1,0],[3,1]] — top-left entry?', a: '7' },
      { q: 'Is matrix multiplication commutative?', a: 'No' },
    ],
  },
  {
    id: 'determinants', title: 'Determinants', tag: 'the area a matrix sweeps', branch: 'linear-algebra', tier: 10, year: 1683,
    prereqs: ['matrices'],
    explain: 'One number per square matrix: how much it scales area (2D) or volume (3D), with a minus sign if it flips orientation. Zero determinant = the transformation squashes space flat — no undo.',
    problems: [
      { q: 'det [[3, 1], [2, 4]] = ?', a: '10' },
      { q: 'det = 0 means the matrix…?', a: 'Squashes space; not invertible' },
    ],
  },
  {
    id: 'gaussian-elimination', title: 'Gaussian Elimination', tag: 'systems, mechanized', branch: 'linear-algebra', tier: 10, year: -200,
    prereqs: ['matrices', 'systems-of-equations'],
    why: { 'systems-of-equations': 'Add multiples of rows to kill variables one column at a time — the Nine Chapters did it with counting rods 2,200 years before Gauss got the credit.' },
    explain: 'The workhorse algorithm of scientific computing: reduce, back-substitute, done. Weather forecasts and structural engineering run millions of eliminations a second.',
    problems: [
      { q: 'Goal shape of elimination?', a: 'Triangular (row echelon) form' },
      { q: 'Solve x + y = 5, 2x + y = 8 by elimination.', a: 'x = 3, y = 2' },
    ],
  },
  {
    id: 'matrix-inverses', title: 'Matrix Inverses', tag: 'the undo button', branch: 'linear-algebra', tier: 11, year: 1858,
    prereqs: ['matrix-multiplication', 'determinants'],
    why: { determinants: 'An inverse exists exactly when det ≠ 0 — you can only undo a transformation that didn’t flatten space.' },
    explain: 'A⁻¹ undoes A: the inverse-operation instinct (subtraction, division, logs) arrives at matrices. Encrypt with A, decrypt with A⁻¹ — the Hill cipher did exactly that.',
    problems: [
      { q: 'Inverse of [[2, 0], [0, 4]]?', a: '[[1/2, 0], [0, 1/4]]' },
      { q: 'A·A⁻¹ = ?', a: 'The identity matrix' },
    ],
  },
  {
    id: 'linear-transformations', title: 'Linear Transformations', tag: 'matrices are motions', branch: 'linear-algebra', tier: 11, year: 1858,
    prereqs: ['matrix-multiplication', 'transformations', 'functions'],
    why: {
      transformations: 'Every rotation, stretch, and shear of the plane is a matrix; every matrix is one. Geometry’s motions and algebra’s grids are the same objects.',
      functions: 'A linear transformation is a function on vectors that respects addition and scaling — the best-behaved functions in existence.',
    },
    explain: 'The heart of the subject: a matrix is not a spreadsheet, it is an ACTION on space. Watch where it sends the grid and you understand it completely. Every 3D game frame is millions of these.',
    problems: [
      { q: 'What does [[0,−1],[1,0]] do to the plane?', a: 'Rotates 90° counterclockwise' },
      { q: 'What does [[2,0],[0,2]] do?', a: 'Doubles everything (scale ×2)' },
    ],
  },
  {
    id: 'vector-spaces', title: 'Vector Spaces', tag: 'anything that adds and scales', branch: 'linear-algebra', tier: 11, year: 1888,
    prereqs: ['vectors', 'functions'],
    why: { vectors: 'Forget arrows: polynomials add and scale, functions add and scale, sound waves add and scale. ANY such world is a vector space — one theory rules them all.' },
    explain: 'The abstraction jump: define "vector" by behavior, not appearance. Suddenly linear algebra applies to signals, quantum states, and function spaces — the same theorems, everywhere.',
    problems: [
      { q: 'Do polynomials of degree ≤ 2 form a vector space?', a: 'Yes' },
      { q: 'Do vectors with positive entries only?', a: 'No — no negatives/zero' },
    ],
  },
  {
    id: 'linear-independence', title: 'Linear Independence', tag: 'no freeloaders', branch: 'linear-algebra', tier: 11, year: 1880,
    prereqs: ['vector-spaces'],
    explain: 'Vectors are independent when none can be built from the others — each adds a genuinely new direction. Redundancy detection: the concept data scientists call "collinearity" and fear.',
    problems: [
      { q: 'Are (1,0), (0,1), (1,1) independent?', a: 'No — the third is the sum' },
      { q: 'Max independent vectors in 3D space?', a: '3' },
    ],
  },
  {
    id: 'basis-dimension', title: 'Basis & Dimension', tag: 'the space’s skeleton', branch: 'linear-algebra', tier: 12, year: 1888,
    prereqs: ['linear-independence'],
    explain: 'A basis is a minimal spanning crew: enough directions to reach everything, no waste. Every basis of a space has the SAME size — that invariant number is dimension, finally defined honestly.',
    problems: [
      { q: 'Standard basis of the plane?', a: '(1,0) and (0,1)' },
      { q: 'Dimension of polynomials of degree ≤ 3?', a: '4' },
    ],
  },
  {
    id: 'change-of-basis', title: 'Change of Basis', tag: 'same space, new eyes', branch: 'linear-algebra', tier: 12, year: 1888,
    prereqs: ['basis-dimension', 'matrix-inverses'],
    explain: 'Describe the same vector in different coordinate systems and hard problems can become easy — the whole game of eigenvalues, Fourier, and compression is "pick the basis where it’s simple".',
    problems: [
      { q: 'Why change basis? (one reason)', a: 'The problem may be diagonal/simple in the right one' },
      { q: 'JPEG compression changes to which kind of basis?', a: 'Frequency (cosine) basis' },
    ],
  },
  {
    id: 'eigenvalues', title: 'Eigenvalues & Eigenvectors', tag: 'the directions that hold still', branch: 'linear-algebra', tier: 12, year: 1829,
    prereqs: ['linear-transformations', 'determinants'],
    why: {
      'linear-transformations': 'Most vectors get knocked off course by a transformation — eigenvectors only stretch. They are the transformation’s private axes, its true personality.',
      determinants: 'Finding them = solving det(A − λI) = 0. The determinant hunts the stretch factors.',
    },
    explain: 'The still directions of a spinning world. Bridge resonance, quantum energy levels, PageRank (Google is one giant eigenvector), face recognition — all eigen-problems. Learn this word; it runs the modern world.',
    problems: [
      { q: 'Eigenvalues of [[3, 0], [0, 5]]?', a: '3 and 5' },
      { q: 'Google’s PageRank is essentially…?', a: 'An eigenvector of the web’s link matrix' },
    ],
  },
  {
    id: 'inner-product-spaces', title: 'Inner Product Spaces', tag: 'geometry for any space', branch: 'linear-algebra', tier: 12, year: 1907,
    prereqs: ['dot-product', 'vector-spaces'],
    why: { 'dot-product': 'Abstract the dot product’s rules and every vector space gains lengths and angles — even spaces of functions. "Perpendicular sound waves" becomes a real sentence.' },
    explain: 'Bring angle and length to abstract spaces. Two functions can be orthogonal; a melody has a "length". This is the doorway to Fourier analysis and quantum mechanics’ Hilbert spaces.',
    problems: [
      { q: 'Two vectors with inner product 0 are called…?', a: 'Orthogonal' },
      { q: '⟨f, g⟩ for functions is usually defined as…?', a: '∫ f(x)g(x) dx' },
    ],
  },
  {
    id: 'orthogonality', title: 'Orthogonality & Projections', tag: 'shadows onto subspaces', branch: 'linear-algebra', tier: 12, year: 1907,
    prereqs: ['inner-product-spaces'],
    explain: 'Project a vector onto a subspace: its shadow is the CLOSEST point in that subspace. This one geometric fact powers least squares, Fourier coefficients, and every "best approximation" in engineering.',
    problems: [
      { q: 'Projection of (3, 4) onto the x-axis?', a: '(3, 0)' },
      { q: 'The error vector (original − shadow) is always…?', a: 'Perpendicular to the subspace' },
    ],
  },
  {
    id: 'least-squares', title: 'Least Squares', tag: 'the best line through messy data', branch: 'linear-algebra', tier: 12, year: 1805,
    prereqs: ['orthogonality', 'systems-of-equations'],
    why: { orthogonality: 'No line hits every data point — so project the data onto the space of lines and take the shadow: the line minimizing squared error. Fitting is projection.' },
    explain: 'Gauss used it (at 24) to rediscover the lost asteroid Ceres from scraps of data, making himself famous overnight. Every trendline, forecast, and ML baseline since is least squares.',
    problems: [
      { q: 'Least squares minimizes the sum of…?', a: 'Squared vertical errors' },
      { q: 'Which astronomer-mathematician found Ceres with it?', a: 'Gauss' },
    ],
  },
  {
    id: 'rank-nullity', title: 'Rank & Null Space', tag: 'what survives, what dies', branch: 'linear-algebra', tier: 11, year: 1884,
    prereqs: ['gaussian-elimination', 'linear-independence'],
    explain: 'Rank counts the dimensions a matrix keeps; the null space is everything it crushes to zero. They always sum to the input dimension — information is conserved or visibly destroyed, never misplaced.',
    problems: [
      { q: 'A 3×3 matrix with rank 2 crushes how many dimensions?', a: '1' },
      { q: 'Rank + nullity = ?', a: 'Number of columns' },
    ],
  },
  {
    id: 'svd', title: 'Singular Value Decomposition', tag: 'every matrix, X-rayed', branch: 'linear-algebra', tier: 13, year: 1873,
    prereqs: ['eigenvalues', 'orthogonality'],
    explain: 'Any matrix = rotate · stretch · rotate. The stretch factors (singular values) rank what matters; drop the small ones and you get compression, noise removal, recommendation engines — data science’s favorite theorem.',
    problems: [
      { q: 'SVD factors any matrix into which three actions?', a: 'Rotation, scaling, rotation' },
      { q: 'Keeping only large singular values gives…?', a: 'A compressed/denoised approximation' },
    ],
  },
]
