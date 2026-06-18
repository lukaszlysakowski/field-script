# Field Script — Exploration Tracker

Generative asemic writing system. Bezier glyph vocabulary over a recursive subdivision field.
Seeded via 5 floats (m0–m4). Aesthetic space explored through named parameter archetypes.

---

## Archetypes

Six canonical parameter clusters. Each defines a distinct compositional mode.

### A — Glyph Archipelago
Scattered islands of fine script marks. Medium diagonal wave creates natural text-band structure
without rigidity. Marks read as syllabary — distinct glyphs in loose clusters.
```
waveLevel=2  waveAngleLevel=0  densityLevel=2  maxDepthLevel=3
invertDensity=false  wobbleMode=true  growthMode=0  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

### D — Display Glyphs
Large isolated letterforms floating in open space. Busy wave inverted concentrates density
in large cells, producing display-scale marks above a dense manuscript body. Title-page composition.
```
waveLevel=3  waveAngleLevel=0  densityLevel=2  maxDepthLevel=3
invertDensity=true  wobbleMode=true  growthMode=0  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

### H — Horizontal Register
Actual text-line rhythm. Horizontal wave bands create rows of marks reading left-to-right —
the most legible page analogue. Density varies along the y-axis.
```
waveLevel=2  waveAngleLevel=1  densityLevel=2  maxDepthLevel=3
invertDensity=false  wobbleMode=true  growthMode=0  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

### R — Radial Script
Marks orbit a gravitational center. Radial wave + radial growth produces concentric rings
of writing, density fading toward the periphery. Like a stellar inscription.
```
waveLevel=2  waveAngleLevel=3  densityLevel=2  maxDepthLevel=3
invertDensity=false  wobbleMode=true  growthMode=1  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

### C — Chaotic Field
Noise-driven density map — no geometric wave pattern, pure Perlin turbulence.
Organic clustering with no predictable structure. The least controlled, most emergent mode.
```
waveLevel=3  waveAngleLevel=5  densityLevel=2  maxDepthLevel=3
invertDensity=false  wobbleMode=true  growthMode=0  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

### M — Monumental Sparse
Very few, very large marks. Shallow subdivision (bigger cells) + light density + busy inversion
selects for the largest zones and fills them with full-cell glyphs. One to four marks per composition.
```
waveLevel=3  waveAngleLevel=0  densityLevel=0  maxDepthLevel=2
invertDensity=true  wobbleMode=true  growthMode=0  useBezier=true
hideThreads=true  hideHighways=true  sepiaMode=true  skipSparseConnections=true
```

---

## Refined Grammar — Curated (2026-06-10, +Pass 17 & thread-fix re-curation 2026-06-11)

Canonical grammar after curating the 185 grammar samples (Pass 15 + 16) in the fullsize viewer.
**109 of 185 kept (59%)**, then **Pass 17 added 10** targeted keepers → 119, then **re-curated to
117** after a thread-compositing bug was fixed (see note below). The keep-rates per archetype drove
a reduction of the taxonomy **14 → 12 archetypes**:

- **Dropped — Vert Light / Airy** (kept 1/5 = 20%). Almost entirely rejected; its members fold to Unnamed.
- **Merged — Chaotic Sparse (4/14) + Turbulent Manuscript (5/10) → Turbulent Field** (9/24 = 38%).
  The two chaotic archetypes weren't distinctly valued; consolidated to one rule = *any Chaotic wave*.

No new archetype was created — the kept Unnamed (5) are scattered (Square·Dense, Square·Med, Horiz·Light),
not a coherent cluster.

Keep-rate by archetype (kept / total of 185), strongest first:

| Archetype | Keep rate | | Archetype | Keep rate |
|-----------|-----------|-|-----------|-----------|
| Vertical Column | 15/18 (83%) | | Diagonal Aerial | 6/11 (55%) |
| Double Radial | 8/11 (73%) | | Display Glyphs | 12/22 (55%) |
| Orbital Script | 9/13 (69%) | | Dense Network | 3/6 (50%) |
| Monumental | 16/24 (67%) | | Horizontal Band | 3/6 (50%) |
| Vert Radial-Growth | 4/6 (67%) | | Turbulent Field | 9/24 (38%) |
| Diagonal Manuscript | 12/19 (63%) | | _(Unnamed)_ | 5/13 (38%) |
| Horizontal Register | 7/12 (58%) | | ~~Vert Light/Airy~~ | ~~1/5 (20%)~~ dropped |

Refined classifier = original 14-archetype scorer with two pure label ops (no formula change, so no
reclassification side-effects): `VertLight → Unnamed`, `{ChaoticSparse, Turbulent} → TurbulentField`.

Curated distribution (n=109): `Monumental 16 · VertColumn 15 · DiagManuscript 12 · DisplayGlyph 12 ·
Orbital 9 · TurbulentField 9 · DoubleRadial 8 · Horizontal 7 · DiagAerial 6 · Unnamed 5 ·
VertRadial 4 · DenseNetwork 3 · HorizBand 3`.

Distribution after Pass 17 + thread-fix re-curation (n=117): `Monumental 16 · VertColumn 15 ·
DiagManuscript 12 · DisplayGlyph 12 · Orbital 9 · TurbulentField 9 · DoubleRadial 8 · HorizBand 8 ·
Horizontal 7 · DenseNetwork 6 · DiagAerial 6 · Unnamed 5 · VertRadial 4`.

**Thread-compositing bug fix (2026-06-11):** `threadCanvas` is a top-level `let` in index.js — a global
lexical binding, NOT a `window` property. Renders guarded on `if(window.threadCanvas)` (always undefined),
so the thread + highway-thread overlay was silently dropped from every render. Fixed to reference
`threadCanvas` bare (grammar-tools.js `renderOne` + the render recipe below). 73/119 keepers have
`ht=false` (threads visible) and changed visibly — re-curation dropped 2 Vert Radial-Growth that no
longer worked with threads on (P15·34, P16·33). Renders are now thread-correct and canonical.

Browser: kept flag on each record (`s._keep`); refined tag `s._refArch`; crisp 940px render `s._hi` (threads on).

### Curated keepers — grouped by refined archetype (107 here + 10 Pass 17 below = 117)

_Was 109; −2 on thread-fix re-curation (P15·34, P16·33 removed)._

- P15·10 · 0.614 0.919 0.441 0.076 0.030 · Square·Dense·d6 · Spiral · wob skip · hwy · [Monumental]
- P15·24 · 0.644 0.727 0.399 0.025 0.574 · Square·Light·d4 · Serp · skip · hwy · [Monumental]
- P15·43 · 0.948 0.368 0.676 0.661 0.023 · Square·Med·d10 · Spiral · inv wob lines · thr hwy · [Monumental]
- P15·57 · 0.377 0.875 0.614 0.232 0.290 · Square·Light·d2 · Spiral · inv wob xh skip · thr hwy · [Monumental]
- P15·69 · 0.488 0.289 0.113 0.084 0.123 · Square·Med·d4 · Radial · xh lines · thr hwy · [Monumental]
- P15·80 · 0.840 0.537 0.446 0.013 0.701 · Square·Med·d2 · Spiral · wob lines skip · hwy · [Monumental]
- P16·1 · 0.564 0.083 0.469 0.606 0.619 · Square·Light·d12 · Radial · inv · hwy · [Monumental]
- P16·4 · 0.277 0.707 0.547 0.753 0.289 · Square·Light·d10 · Spiral · — · hwy · [Monumental]
- P16·21 · 0.369 0.803 0.574 0.578 0.520 · Square·Light·d14 · Radial · inv wob lines skip · thr · [Monumental]
- P16·23 · 0.768 0.287 0.176 0.843 0.535 · Square·Light·d14 · Spiral · wob skip · thr hwy · [Monumental]
- P16·36 · 0.655 0.553 0.474 0.411 0.554 · Square·Light·d14 · Serp · inv wob xh lines skip · thr hwy · [Monumental]
- P16·58 · 0.312 0.207 0.394 0.120 0.975 · Square·Dense·d8 · Spiral · — · thr hwy col · [Monumental]
- P16·62 · 0.176 0.043 0.455 0.081 0.675 · Square·Light·d10 · Spiral · inv wob · — · [Monumental]
- P16·71 · 0.636 0.149 0.170 0.580 0.673 · Square·Med·d2 · Serp · inv xh lines · thr hwy · [Monumental]
- P16·75 · 0.628 0.569 0.049 0.950 0.947 · Square·Med·d8 · Spiral · wob xh lines · thr hwy col · [Monumental]
- P16·84 · 0.512 0.920 0.057 0.589 0.074 · Square·Light·d4 · Radial · wob lines · hwy · [Monumental]
- P15·6 · 0.138 0.918 0.075 0.442 0.409 · Vert·Light·d12 · Serp · wob xh skip · thr hwy · [VertColumn]
- P15·9 · 0.073 0.031 0.097 0.645 0.940 · Vert·Light·d6 · Radial · inv lines skip · thr · [VertColumn]
- P15·28 · 0.390 0.651 0.509 0.329 0.394 · Vert·Med·d8 · Serp · — · thr hwy · [VertColumn]
- P15·53 · 0.594 0.569 0.279 0.469 0.272 · Vert·Dense·d6 · Spiral · inv wob xh lines skip · hwy · [VertColumn]
- P15·54 · 0.421 0.965 0.397 0.855 0.898 · Vert·Dense·d2 · Serp · inv lines · hwy col · [VertColumn]
- P15·70 · 0.504 0.971 0.753 0.586 0.982 · Vert·Med·d2 · Spiral · inv skip · hwy · [VertColumn]
- P15·74 · 0.854 0.224 0.342 0.966 0.758 · Vert·Light·d14 · Serp · inv xh skip · thr · [VertColumn]
- P15·82 · 0.220 0.444 0.441 0.542 0.779 · Vert·Light·d8 · Radial · inv · thr hwy · [VertColumn]
- P15·92 · 0.130 0.868 0.745 0.544 0.883 · Vert·Dense·d12 · Serp · inv skip · thr hwy · [VertColumn]
- P15·93 · 0.827 0.750 0.955 0.768 0.937 · Vert·Med·d2 · Radial · inv lines · hwy col · [VertColumn]
- P16·6 · 0.561 0.706 0.180 0.331 0.627 · Vert·Med·d8 · Radial · inv wob lines skip · hwy · [VertColumn]
- P16·10 · 0.296 0.650 0.444 0.530 0.943 · Vert·Dense·d2 · Spiral · xh · thr hwy · [VertColumn]
- P16·19 · 0.311 0.739 0.656 0.563 0.031 · Vert·Med·d6 · Spiral · inv wob · thr hwy col · [VertColumn]
- P16·22 · 0.630 0.999 0.272 0.466 0.912 · Vert·Dense·d2 · Serp · wob xh skip · col · [VertColumn]
- P16·51 · 0.359 0.243 0.582 0.087 0.510 · Vert·Med·d12 · Serp · xh lines · hwy · [VertColumn]
- P15·20 · 0.502 0.911 0.586 0.462 0.168 · Diag·Med·d10 · Spiral · inv wob xh lines · hwy · [DiagManuscript]
- P15·26 · 0.036 0.997 0.597 0.301 0.389 · Diag·Dense·d10 · Serp · skip · hwy col · [DiagManuscript]
- P15·39 · 0.792 0.216 0.867 0.712 0.288 · Diag·Dense·d8 · Serp · inv wob xh · thr hwy col · [DiagManuscript]
- P15·50 · 0.899 0.136 0.560 0.990 0.404 · Diag·Med·d4 · Radial · inv skip · thr hwy · [DiagManuscript]
- P15·73 · 0.045 0.712 0.432 0.620 0.768 · Diag·Dense·d10 · Serp · inv wob skip · thr hwy col · [DiagManuscript]
- P15·75 · 0.556 0.188 0.333 0.471 0.532 · Diag·Med·d14 · Serp · inv skip · thr hwy · [DiagManuscript]
- P16·12 · 0.968 1.000 0.753 0.105 0.186 · Diag·Dense·d6 · Spiral · wob skip · thr hwy col · [DiagManuscript]
- P16·13 · 0.160 0.090 0.433 0.179 0.362 · Diag·Dense·d10 · Radial · — · thr hwy col · [DiagManuscript]
- P16·28 · 0.506 0.274 0.199 0.675 0.663 · Diag·Dense·d8 · Radial · wob skip · col · [DiagManuscript]
- P16·34 · 0.155 0.852 0.019 0.695 0.103 · Diag·Dense·d6 · Radial · wob xh lines skip · hwy · [DiagManuscript]
- P16·82 · 0.033 0.805 0.215 0.110 0.420 · Diag·Dense·d14 · Spiral · inv · thr hwy col · [DiagManuscript]
- P16·94 · 0.622 0.110 0.344 0.361 0.155 · Diag·Med·d8 · Serp · wob xh lines skip · thr · [DiagManuscript]
- P15·23 · 0.820 0.483 0.940 0.800 0.303 · Chaotic·Med·d4 · Radial · inv wob xh skip · thr hwy · [DisplayGlyph]
- P15·25 · 0.235 0.495 0.086 0.388 0.878 · Chaotic·Dense·d14 · Spiral · inv wob skip · thr hwy · [DisplayGlyph]
- P15·31 · 0.250 0.143 0.719 0.409 0.363 · Chaotic·Dense·d10 · Radial · inv wob xh · hwy · [DisplayGlyph]
- P15·38 · 0.075 0.065 0.496 0.250 0.033 · Horiz·Dense·d4 · Radial · inv xh lines skip · thr hwy col · [DisplayGlyph]
- P15·60 · 0.725 0.157 0.555 0.828 0.071 · Chaotic·Dense·d10 · Serp · inv xh · — · [DisplayGlyph]
- P15·72 · 0.313 0.502 0.258 0.795 0.235 · Radial·Dense·d8 · Serp · inv skip · thr · [DisplayGlyph]
- P15·78 · 0.684 0.506 0.119 0.412 0.417 · Chaotic·Med·d6 · Serp · inv skip · thr hwy · [DisplayGlyph]
- P15·94 · 0.828 0.006 0.810 0.474 0.373 · Horiz·Dense·d6 · Serp · inv skip · thr hwy · [DisplayGlyph]
- P16·0 · 0.390 0.333 0.842 0.695 0.564 · Square·Dense·d2 · Radial · inv wob xh · thr hwy · [DisplayGlyph]
- P16·38 · 0.261 0.464 0.849 0.723 0.684 · Horiz·Dense·d8 · Serp · inv xh lines skip · — · [DisplayGlyph]
- P16·45 · 0.205 0.210 0.560 0.881 0.198 · Square·Dense·d14 · Spiral · inv xh · thr · [DisplayGlyph]
- P16·66 · 0.730 0.735 0.113 0.804 0.388 · Chaotic·Dense·d6 · Spiral · inv wob lines · — · [DisplayGlyph]
- P15·5 · 0.140 0.514 0.267 0.063 0.101 · Radial·Light·d4 · Serp · inv lines skip · thr hwy · [Orbital]
- P15·19 · 0.204 0.204 0.164 0.526 0.541 · Radial·Dense·d12 · Serp · wob xh skip · hwy col · [Orbital]
- P15·22 · 0.296 0.428 0.340 0.750 0.875 · Radial·Med·d6 · Serp · wob lines skip · thr hwy · [Orbital]
- P15·49 · 0.268 0.723 0.603 0.591 0.657 · Radial·Light·d14 · Serp · inv xh skip · thr hwy · [Orbital]
- P15·56 · 0.978 0.595 0.056 0.642 0.219 · Radial·Light·d4 · Spiral · wob skip · hwy · [Orbital]
- P16·54 · 0.466 0.206 0.824 0.497 0.205 · Radial·Light·d14 · Spiral · wob lines skip · thr hwy col · [Orbital]
- P16·55 · 0.265 0.342 0.154 0.147 0.665 · Radial·Med·d14 · Serp · — · thr hwy · [Orbital]
- P16·83 · 0.743 0.700 0.930 0.695 0.583 · Radial·Med·d10 · Serp · lines · — · [Orbital]
- P16·90 · 0.304 0.819 0.794 0.362 0.288 · Radial·Dense·d4 · Serp · wob · thr hwy col · [Orbital]
- P15·13 · 0.001 0.329 0.699 0.203 0.600 · Chaotic·Dense·d2 · Serp · wob skip · hwy · [TurbulentField]
- P15·27 · 0.887 0.286 0.798 0.018 0.959 · Chaotic·Med·d8 · Serp · wob lines · thr hwy col · [TurbulentField]
- P15·44 · 0.233 0.552 0.976 0.160 0.045 · Chaotic·Light·d8 · Radial · inv · hwy col · [TurbulentField]
- P15·71 · 0.383 0.210 0.430 0.711 0.779 · Chaotic·Dense·d12 · Spiral · lines skip · hwy · [TurbulentField]
- P15·81 · 0.610 0.297 0.436 0.754 0.349 · Chaotic·Light·d4 · Radial · inv xh skip · thr · [TurbulentField]
- P15·85 · 0.730 0.201 0.828 0.971 0.344 · Chaotic·Dense·d10 · Serp · wob xh lines skip · hwy · [TurbulentField]
- P15·87 · 0.495 0.004 0.923 0.524 0.434 · Chaotic·Med·d4 · Serp · skip · hwy · [TurbulentField]
- P16·2 · 0.648 0.405 0.999 0.258 0.451 · Chaotic·Dense·d14 · Serp · xh · hwy col · [TurbulentField]
- P16·53 · 0.455 0.426 0.757 0.120 0.304 · Chaotic·Light·d8 · Radial · wob xh lines · — · [TurbulentField]
- P15·18 · 0.322 0.650 0.203 0.726 0.575 · Radial·Light·d14 · Radial · inv xh skip · hwy col · [DoubleRadial]
- P15·37 · 0.913 0.294 0.220 0.985 0.859 · Radial·Med·d2 · Radial · wob lines skip · thr hwy col · [DoubleRadial]
- P15·40 · 0.157 0.328 0.315 0.380 0.815 · Radial·Dense·d12 · Radial · inv skip · thr hwy · [DoubleRadial]
- P15·62 · 0.970 0.075 0.007 0.449 0.399 · Radial·Dense·d12 · Radial · inv wob xh skip · hwy · [DoubleRadial]
- P16·32 · 0.590 0.191 0.277 0.811 0.166 · Radial·Light·d10 · Spiral · inv skip · thr hwy · [DoubleRadial]
- P16·67 · 0.348 0.516 0.140 0.007 0.657 · Radial·Med·d10 · Radial · inv xh lines skip · thr hwy col · [DoubleRadial]
- P16·85 · 0.873 0.121 0.982 0.427 0.558 · Horiz·Light·d8 · Radial · inv wob lines skip · hwy col · [DoubleRadial]
- P16·92 · 0.043 0.488 0.962 0.187 0.692 · Radial·Light·d4 · Radial · inv xh · thr hwy · [DoubleRadial]
- P15·7 · 0.858 0.290 0.838 0.897 0.862 · Horiz·Med·d10 · Radial · wob xh · thr hwy · [Horizontal]
- P15·79 · 0.056 0.251 0.604 0.549 0.762 · Horiz·Med·d6 · Radial · inv wob skip · thr · [Horizontal]
- P15·84 · 0.063 0.310 0.255 0.275 0.265 · Horiz·Med·d10 · Spiral · — · thr hwy · [Horizontal]
- P15·90 · 0.946 0.490 0.802 0.939 0.713 · Horiz·Med·d12 · Radial · inv wob lines skip · thr hwy · [Horizontal]
- P16·3 · 0.059 0.557 0.722 0.807 0.804 · Horiz·Med·d10 · Serp · wob lines skip · hwy col · [Horizontal]
- P16·30 · 0.519 0.970 0.112 0.426 0.426 · Horiz·Med·d8 · Spiral · wob lines skip · — · [Horizontal]
- P16·56 · 0.393 0.428 0.130 0.095 0.428 · Horiz·Med·d12 · Spiral · inv xh lines skip · hwy · [Horizontal]
- P15·3 · 0.267 0.523 0.981 0.868 0.797 · Diag·Med·d6 · Spiral · wob lines · hwy · [DiagAerial]
- P15·52 · 0.305 0.878 0.530 0.672 0.295 · Diag·Dense·d14 · Spiral · xh lines · thr hwy · [DiagAerial]
- P16·11 · 0.201 0.786 0.198 0.408 0.434 · Diag·Light·d4 · Spiral · inv xh lines · thr hwy · [DiagAerial]
- P16·25 · 0.312 0.380 0.733 0.699 0.814 · Diag·Light·d12 · Spiral · lines · thr hwy col · [DiagAerial]
- P16·42 · 0.749 0.946 0.856 0.797 0.866 · Diag·Light·d14 · Spiral · wob xh skip · thr hwy · [DiagAerial]
- P16·91 · 0.882 0.780 0.997 0.804 0.931 · Diag·Light·d2 · Radial · xh lines skip · hwy · [DiagAerial]
- P15·2 · 0.508 0.388 0.740 0.704 0.394 · Square·Dense·d12 · Radial · wob xh lines skip · thr · [Unnamed]
- P15·47 · 0.366 0.560 0.260 0.522 0.792 · Vert·Med·d6 · Spiral · xh skip · thr hwy col · [Unnamed]
- P16·26 · 0.214 0.764 0.287 0.207 0.651 · Square·Med·d10 · Radial · wob skip · thr col · [Unnamed]
- P16·68 · 0.943 0.141 0.456 0.858 0.030 · Horiz·Light·d2 · Radial · skip · thr hwy col · [Unnamed]
- P16·88 · 0.499 0.412 0.903 0.624 0.123 · Square·Dense·d12 · Serp · skip · thr col · [Unnamed]
- P15·12 · 0.398 0.244 0.711 0.543 0.081 · Vert·Light·d4 · Radial · skip · thr hwy · [VertRadial]
- P16·59 · 0.691 0.528 0.720 0.840 0.556 · Vert·Dense·d8 · Radial · xh skip · thr · [VertRadial]
- P15·16 · 0.835 0.864 0.528 0.957 0.560 · Radial·Dense·d12 · Spiral · lines skip · hwy · [DenseNetwork]
- P15·66 · 0.575 0.156 0.700 0.467 0.772 · Radial·Dense·d8 · Spiral · xh · thr hwy col · [DenseNetwork]
- P15·89 · 0.421 0.196 0.548 0.147 0.688 · Radial·Dense·d2 · Spiral · inv xh · thr hwy · [DenseNetwork]
- P15·32 · 0.764 0.626 0.525 0.723 0.407 · Horiz·Dense·d4 · Radial · skip · thr · [HorizBand]
- P15·41 · 0.648 0.694 0.742 0.800 0.066 · Horiz·Dense·d8 · Serp · wob xh · thr · [HorizBand]
- P16·86 · 0.980 0.517 0.238 0.850 0.715 · Horiz·Dense·d4 · Serp · wob skip · thr hwy col · [HorizBand]

### Pass 17 additions (10) — targeted growth of thin archetypes (2026-06-11)

Generated 20 candidates constrained to the three thinnest archetypes (signature-locked, `inv=false`,
guarded, ≥0.5% ink, ≥20% novel vs the 109). Kept 10 in the fullsize candidate viewer. The fully-locked
signatures (Dense Network, Vert Radial-Growth fix wave+density+growth) yielded fewer novel points than
Horizontal Band (growth free). Growth: DenseNetwork 3→6, HorizBand 3→8, VertRadial 4→6
(VertRadial later returned to 4 when thread-fix re-curation dropped P15·34 & P16·33).

- P17·3 · 0.339 0.888 0.200 0.085 0.571 · Radial·Dense·d6 · Spiral · xh lines skip · thr · [Dense Network]
- P17·4 · 0.463 0.063 0.810 0.526 0.039 · Radial·Dense·d14 · Spiral · wob xh lines · thr hwy · [Dense Network]
- P17·5 · 0.920 0.169 0.253 0.117 0.445 · Radial·Dense·d6 · Spiral · wob xh · — · [Dense Network]
- P17·6 · 0.593 0.846 0.874 0.330 0.930 · Horiz·Dense·d12 · Spiral · wob xh skip · thr hwy · [Horizontal Band]
- P17·9 · 0.416 0.047 0.051 0.307 0.041 · Horiz·Dense·d10 · Serp · xh skip · hwy col · [Horizontal Band]
- P17·10 · 0.694 0.926 0.405 0.229 0.588 · Horiz·Dense·d12 · Radial · wob skip · hwy col · [Horizontal Band]
- P17·14 · 0.852 0.320 0.971 0.966 0.160 · Horiz·Dense·d8 · Spiral · wob xh lines skip · thr col · [Horizontal Band]
- P17·15 · 0.749 0.869 0.858 0.426 0.704 · Horiz·Dense·d14 · Spiral · skip · col · [Horizontal Band]
- P17·17 · 0.201 0.135 0.078 0.052 0.824 · Vert·Dense·d12 · Radial · xh lines · — · [Vert Radial-Growth]
- P17·19 · 0.486 0.400 0.822 0.024 0.042 · Vert·Dense·d2 · Radial · wob · thr col · [Vert Radial-Growth]

---

## Grammar Study 2 — waveLevel-aware, 14 archetypes (2026-06-11)

Combines **Study 1** keepers with curated waveLevel-mining seeds (wl0/1) and the waveLevel-3 **Open
Gesture** set (wl3), then refined to **132 keepers** in a final full pass: the structured wl2 middle
was tightened (−30 of 158), then **Display Glyphs re-mined (+4)** at the user's interest (the inversion
archetype). `waveLevel` (0/1/2/3) is a real dimension — every record carries `wl` and renders at it
(Study 1 was uniformly wl2).

**Two texture-defined archetypes name the axis extremes** (both cut across wave angles, unlike the 12
wl2 wave-angle archetypes):
- **Packed Manuscript (PM, ×8)** — the dense, packed-field look from waveLevel 0/1. Would otherwise
  scatter across 5 buckets (VertColumn, DenseNetwork, Unnamed, Horizontal, Monumental). = 7 wl0 + WL1·13.
- **Open Gesture (OG, ×27)** — the sparse, gestural *figure-in-void* look from waveLevel 3: marks
  clustered into one legible gesture (a ring, a fan, a sweep, a constellation) with generous negative
  space. Judged by composition, not density (span ink 0.5–12.5%). Favors Square + Radial waves and
  Light/Medium density; Vertical produced none. Mined over 4 batches → 34 kept → trimmed to 27.

Distribution (n=132): `OpenGesture 27 · Monumental 14 · DisplayGlyph 13 · VertColumn 9 ·
DiagManuscript 9 · Orbital 8 · PackedManuscript 8 · DenseNetwork 7 · HorizBand 7 · DiagAerial 6 ·
TurbulentField 6 · Unnamed 6 · Horizontal 4 · DoubleRadial 4 · VertRadial 4`. waveLevel: `wl0 9 · wl1 5 · wl2 91 · wl3 27`.

Artifact: **`grammar-study-2.js`** (132 records with `id`/`wl`/`arch`; renders each at its own
waveLevel with threads on; clickable overview + single-image viewer; APIs on `window.GrammarStudy2`).
Run: `eval(await fetch('/grammar-study-2.js').then(r=>r.text()))`. Study 1 (`grammar-tools.js`, 117,
all wl2) is kept intact alongside it. The wl0/1 seeds trace to `wavelevel-explore.js`; the wl3 set was
mined this session (geometric waves, guarded + dead-empty filtered, curated by eye over 4 batches).

The waveLevel axis itself: an openness/density dial for geometric waves — **wl0 packs dense** (Packed
Manuscript) · wl2 structured (the 12 archetypes) · **wl3 opens to sparse/gestural** (Open Gesture);
wl1 is a muddy middle (gentle wave, no distinct identity); chaotic ignores waveLevel. See
`wavelevel-preview.js` (the 6-seed × 4-level comparison) for the axis demonstration.

---

## Published features — canon in the sketch + specimen sheet (2026-06-12)

Both built on branch `canon-features` (the curated canon, previously a side artifact, is now wired
into the public-facing sketch).

**`canon.js`** — shared data module: `window.FieldScriptCanon = { archetypes, records }` (the 132
curated records + archetype-name map, extracted from `grammar-study-2.js`). Single source of truth
for the two features below; loaded by `index.html` before `index.js`.

**Canon-browse mode** (in `index.html` + `index.js`) — a "Canon · curated" sidebar section: `browse`
toggle, `archetype` filter (All + 14 archetypes, cycled), prev/next stepper, and a position readout
(`id · n/total`). Stepping calls `applyCanonRecord(rec)` → sets all params + seeds (sepia forced),
syncs every sidebar label via `syncUI()`, and re-renders. Lets a visitor walk the authored canon in
the live sketch instead of pure randomization. Coexists with randomize/refresh. Functions:
`setupCanon`, `applyCanonRecord`, `syncUI`, `canonShow`, `canonStep`, `canonRefreshList`.

**`specimen.html`** — a standalone designed type-specimen of the grammar: one exemplar per archetype
(14, the first canon record of each), grouped **"Structured Field · waveLevel 2"** (12) +
**"Axis Extremes"** (Packed Manuscript / Open Gesture). Fraunces + JetBrains Mono on limestone; renders
embedded at 720px JPEG (self-contained, ~1.3MB). Regenerate by re-rendering exemplars in the sketch and
POSTing the assembled HTML to a one-shot local writer (see git history / this session). Exemplars are
the per-archetype *first* record — easy to swap for hand-picked ones.

---

## Seed Library

Format: `pass · seeds · wave·density·depth · growth · flags · layers`
Layers: `thr`=threads visible, `hwy`=highways visible, `col`=colored threads

### Pass 16 — Grammar, guarded + novelty-filtered (2026-06-10) · 96 added

Second grammar pass, additive to Pass 15's 89 base (base untouched). Each sample passed three filters:
1. **Empty-interior guard** (now permanent in `index.js` `randomizeAll`): `inv && skip && maxDepthLevel<=3`
   → force `skipSparseConnections=false`. Stops the degenerate combos pruned in Pass 15 at the source.
2. **Interior-ink safety net** (harness): post-render interior coverage must be ≥0.5% (catches the
   high-depth `inv` empties the param guard alone misses — e.g. former #95-types).
3. **Novelty filter**: parameter-space distance ≥0.20 from *every* existing sample (89 base + accepted).
   Distance weights: wave ×3, growth ×2, density ×2, depth ×1.5, inv ×1.5, other 7 flags ×1 (den=17).

Generation cost (acceptance funnel): ~420 rolls → 54 guard-corrected, ~304 novelty-rejected (free,
pre-render), ~21 empty-rejected (post-render), 96 accepted. Novelty was the dominant filter — the
89-base already covers the common combos densely, so new samples had to reach genuinely new regions.

Two new archetypes emerged from the combined Unnamed pool (24 → 8) and were added to the taxonomy:
- **13 Turbulent Manuscript** — Chaotic wave + Med/Dense (`wA=5, dL>=1`). Dense Perlin turbulence,
  ink-heavy churning field; the dense sibling of Chaotic Sparse (which is Light+Spiral).
- **14 Horizontal Band** — Horizontal wave + Dense (`wA=1, dL=2`). Packed text-block rows, distinct
  from Horizontal Register (Medium density, looser rhythm).

Combined distribution (n=185, 14 archetypes):
`Monumental 24 · DisplayGlyph 22 · DiagManuscript 19 · VertColumn 18 · ChaoticSparse 14 · Orbital 13 ·
Horizontal 12 · DiagAerial 11 · DoubleRadial 11 · Turbulent 10 · DenseNetwork 6 · VertRadial 6 ·
HorizBand 6 · VertLight 5 · Unnamed 8`

Stored in browser: `window._pass16` (96, each with `_arch`, `_ink`, `_mind` novelty score, `_new=true`).
Base remains `window._grammar` (89).

_Seed list trimmed (2026-06-10): of the 96, the curated keepers are listed in **Refined Grammar —
Curated** above. The 76 rejected across Pass 15+16 were removed during curation._


### Pass 15 — Grammar (2026-06-10) · 89 kept (96 sampled − 7 empty), clustered under archetypes

96 fresh `randomizeAll()` samples (sepia forced for visual consistency), sorted into the 12
named productions by a weighted classifier (wave angle ×2, growth/density/invert/depth ×1;
best fit < 3 → Unnamed). Tag in `[brackets]` = assigned archetype. This maps where the
system *naturally gravitates* — the productive frequency of each rule.

Pruned 7 empty-interior samples (#17,29,46,51,64,86,95) — interior ink ≤0.07%, only frame +
signature visible. All were `Dense·inv·skip` combos where inversion empties the field and
`skipSparseConnections` deletes the remainder. → 89 kept.

Distribution (n=89, after pruning):
`DisplayGlyph 12 · VertColumn 10 · Monumental 10 · Orbital 8 · Horizontal 8 · DiagManuscript 6 ·
DoubleRadial 6 · ChaoticSparse 5 · DiagAerial 5 · VertLight 4 · DenseNetwork 3 · VertRadial 2 · Unnamed 10`

Takeaways: Dense+inv (DisplayGlyph) and Vert+Dense+inv (VertColumn) dominate — the inversion flag
is the strongest attractor in the space (and its over-application is exactly what produced the
empty interiors we pruned). Radial-growth (gM=1) productions (DoubleRadial 6, VertRadial 2)
remain rare even under uniform sampling, confirming they are genuinely peripheral dialects.
10 "Unnamed" samples (mostly Chaotic/Horiz-Dense hybrids) suggest 1–2 archetypes may still be missing.

Stored in browser as `window._grammar` (89 kept; pruned 7 held in `window._grammarRemoved`).
Each: img + full param record + seeds + `_arch` + `_ink` (interior coverage).

_Seed list trimmed (2026-06-10): curated keepers are in **Refined Grammar — Curated** above._


### Pass 14 — Full Random (2026-06-10) · 32 selected from 48

- P14·0  · 0.949 0.671 0.737 0.481 0.431 · Horiz·Med·d8 · Serp · inv xh · hwy
- P14·1  · 0.921 0.088 0.180 0.139 0.420 · Square·Light·d6 · Radial · wob lines xh · col
- P14·2  · 0.321 0.430 0.606 0.469 0.907 · Radial·Med·d2 · Serp · xh · thr hwy
- P14·3  · 0.503 0.711 0.812 0.411 0.088 · Chaotic·Light·d14 · Spiral · xh · hwy
- P14·5  · 0.894 0.519 0.435 0.636 0.621 · Vert·Med·d2 · Radial · thr hwy
- P14·6  · 0.554 0.617 0.769 0.077 0.124 · Square·Dense·d10 · Serp · wob xh · thr
- P14·7  · 0.779 0.727 0.572 0.850 0.043 · Horiz·Light·d6 · Radial · wob xh
- P14·8  · 0.582 0.433 0.975 0.608 0.958 · Vert·Light·d14 · Spiral · inv wob xh · thr
- P14·12 · 0.237 0.024 0.888 0.427 0.173 · Square·Med·d10 · Spiral · inv wob lines
- P14·16 · 0.351 0.675 0.539 0.407 0.319 · Radial·Med·d12 · Radial · wob xh · col
- P14·17 · 0.052 0.531 0.236 0.389 0.160 · Horiz·Med·d8 · Radial · lines · thr hwy col
- P14·19 · 0.065 0.780 0.876 0.867 0.144 · Radial·Med·d14 · Serp · inv · thr col
- P14·20 · 0.012 0.096 0.546 0.156 0.153 · Vert·Med·d8 · Serp · inv wob lines xh · hwy col
- P14·21 · 0.071 0.266 0.525 0.127 0.845 · Radial·Light·d12 · Serp · thr col
- P14·22 · 0.734 0.346 0.429 0.841 0.289 · Square·Light·d2 · Spiral · wob xh · thr hwy
- P14·23 · 0.042 0.499 0.115 0.801 0.738 · Radial·Light·d8 · Radial · inv xh · thr hwy
- P14·24 · 0.187 0.362 0.328 0.471 0.091 · Vert·Med·d10 · Radial · wob · thr hwy
- P14·25 · 0.424 0.748 0.119 0.724 0.010 · Horiz·Med·d6 · Spiral · wob
- P14·27 · 0.162 0.774 0.302 0.315 0.751 · Radial·Dense·d6 · Spiral · wob
- P14·28 · 0.185 0.397 0.520 0.734 0.803 · Horiz·Light·d14 · Serp · inv wob · thr hwy col
- P14·31 · 0.669 0.556 0.438 0.968 0.759 · Square·Dense·d8 · Serp · xh · hwy col
- P14·32 · 0.813 0.113 0.410 0.102 0.033 · Chaotic·Light·d2 · Serp · inv wob lines · thr hwy
- P14·34 · 0.963 0.476 0.068 0.052 0.330 · Horiz·Med·d4 · Serp · inv · thr hwy col
- P14·36 · 0.784 0.051 0.434 0.553 0.067 · Radial·Light·d4 · Serp · lines xh · thr
- P14·37 · 0.654 0.824 0.620 0.192 0.484 · Vert·Med·d12 · Serp · wob xh · hwy
- P14·39 · 0.204 0.332 0.400 0.778 0.509 · Diag·Med·d2 · Radial · wob xh · thr hwy
- P14·41 · 0.707 0.560 0.516 0.083 0.778 · Radial·Dense·d14 · Serp · wob xh
- P14·42 · 0.483 0.147 0.940 0.291 0.787 · Square·Light·d12 · Spiral · xh · hwy col
- P14·43 · 0.873 0.774 0.136 0.301 0.325 · Radial·Light·d6 · Radial · lines · thr hwy
- P14·44 · 0.579 0.518 0.786 0.198 0.575 · Chaotic·Med·d6 · Radial · thr
- P14·45 · 0.116 0.716 0.029 0.442 0.133 · Radial·Dense·d4 · Radial
- P14·47 · 0.180 0.969 0.989 0.135 0.576 · Vert·Dense·d8 · Radial · xh · thr

### Pass 13 — Full Random (2026-06-10) · 33 selected from 48

- P13·1  · 0.487 0.846 0.087 0.658 0.032 · Vert·Med·d6 · Radial · wob xh · thr col
- P13·2  · 0.768 0.914 0.543 0.057 0.119 · Chaotic·Light·d14 · Radial · wob lines xh · thr hwy
- P13·3  · 0.115 0.189 0.086 0.085 0.776 · Radial·Med·d4 · Spiral · wob · col
- P13·4  · 0.419 0.113 0.512 0.408 0.226 · Square·Dense·d6 · Serp · hwy
- P13·5  · 0.593 0.256 0.006 0.333 0.256 · Square·Dense·d12 · Radial · inv wob xh · col
- P13·6  · 0.183 0.811 0.635 0.642 0.364 · Vert·Light·d12 · Radial · lines · thr hwy
- P13·7  · 0.118 0.048 0.368 0.526 0.847 · Chaotic·Med·d14 · Spiral · inv xh · thr col
- P13·8  · 0.322 0.225 0.557 0.702 0.730 · Radial·Med·d8 · Radial · inv wob · thr hwy
- P13·9  · 0.294 0.748 0.085 0.887 0.106 · Diag·Light·d4 · Serp · inv wob xh · thr hwy col
- P13·10 · 0.053 0.049 0.081 0.986 0.329 · Vert·Med·d14 · Radial · wob · col
- P13·16 · 0.573 0.223 0.747 0.851 0.838 · Diag·Light·d14 · Spiral · wob xh · thr hwy
- P13·18 · 0.130 0.068 0.314 0.201 0.781 · Chaotic·Dense·d8 · Spiral · lines xh · thr
- P13·20 · 0.266 0.092 0.800 0.990 0.700 · Radial·Med·d14 · Serp · thr
- P13·21 · 0.561 0.462 0.368 0.520 0.809 · Radial·Dense·d2 · Serp · wob lines xh · hwy col
- P13·22 · 0.548 0.531 0.747 0.658 0.567 · Radial·Light·d8 · Radial · lines xh · col
- P13·26 · 0.874 0.855 0.975 0.084 0.139 · Radial·Light·d2 · Radial · inv · thr hwy
- P13·29 · 0.035 0.155 0.454 0.071 0.867 · Vert·Med·d8 · Radial · xh · thr
- P13·30 · 0.613 0.014 0.285 0.439 0.787 · Vert·Dense·d6 · Radial · wob lines xh
- P13·32 · 0.834 0.917 0.453 0.959 0.624 · Horiz·Med·d6 · Radial · wob · thr hwy col
- P13·33 · 0.763 0.959 0.231 0.749 0.379 · Vert·Dense·d8 · Radial · thr
- P13·34 · 0.504 0.977 0.105 0.077 0.277 · Diag·Med·d14 · Radial · inv · col
- P13·35 · 0.272 0.809 0.574 0.287 0.703 · Radial·Light·d14 · Serp · thr
- P13·36 · 0.325 0.077 0.918 0.247 0.612 · Vert·Light·d6 · Spiral · wob
- P13·37 · 0.854 0.309 0.308 0.866 0.724 · Radial·Med·d4 · Spiral · wob lines xh · hwy
- P13·38 · 0.170 0.896 0.552 0.596 0.924 · Chaotic·Light·d10 · Serp · thr hwy
- P13·39 · 0.158 0.254 0.477 0.045 0.235 · Square·Med·d2 · Spiral · wob lines xh · thr hwy
- P13·40 · 0.414 0.326 0.481 0.199 0.884 · Square·Light·d4 · Serp · lines xh · hwy
- P13·41 · 0.964 0.322 0.445 0.353 0.354 · Diag·Dense·d4 · Serp · inv wob lines · thr
- P13·42 · 0.591 0.475 0.808 0.248 0.008 · Diag·Light·d14 · Radial · lines · col
- P13·43 · 0.410 0.409 0.898 0.637 0.235 · Chaotic·Light·d12 · Serp · inv · hwy
- P13·45 · 0.682 0.009 0.583 0.522 0.201 · Chaotic·Dense·d12 · Radial · lines · thr
- P13·46 · 0.133 0.420 0.652 0.143 0.114 · Diag·Dense·d6 · Serp · wob xh · thr hwy col
- P13·47 · 0.099 0.541 0.143 0.360 0.929 · Horiz·Dense·d6 · Radial · thr hwy

### Pass 12 — Full Random (2026-06-10) · 26 selected from 48

- P12·0  · 0.290 0.766 0.348 0.594 0.762 · Square·Dense·d8 · Radial · inv wob · thr hwy
- P12·3  · 0.395 0.346 0.000 0.062 0.246 · Diag·Dense·d6 · Radial · thr hwy
- P12·4  · 0.464 0.692 0.048 0.031 0.989 · Radial·Light·d10 · Radial · inv wob xh · col
- P12·5  · 0.210 0.383 0.801 0.573 0.524 · Chaotic·Med·d6 · Radial · thr
- P12·6  · 0.891 0.255 0.758 0.134 0.593 · Chaotic·Light·d10 · Spiral · inv xh
- P12·7  · 0.973 0.589 0.721 0.646 0.463 · Diag·Dense·d4 · Spiral · wob lines · thr col
- P12·14 · 0.049 0.988 0.217 0.292 0.228 · Radial·Dense·d14 · Spiral · inv lines · thr hwy
- P12·15 · 0.193 0.940 0.276 0.941 0.069 · Radial·Dense·d6 · Serp · wob · thr
- P12·16 · 0.096 0.840 0.778 0.552 0.904 · Vert·Light·d12 · Spiral · inv lines xh · hwy col
- P12·17 · 0.206 0.826 0.869 0.207 0.527 · Diag·Dense·d4 · Radial · hwy col
- P12·19 · 0.427 0.418 0.699 0.993 0.476 · Vert·Light·d6 · Radial · wob xh · thr col
- P12·20 · 0.688 0.188 0.329 0.490 0.023 · Diag·Dense·d10 · Serp · inv wob lines · thr hwy col
- P12·23 · 0.142 0.788 0.543 0.106 0.125 · Diag·Med·d2 · Radial · xh · thr hwy col
- P12·25 · 0.770 0.964 0.664 0.403 0.144 · Diag·Med·d8 · Radial · inv xh
- P12·29 · 0.275 0.973 0.801 0.134 0.052 · Horiz·Med·d8 · Serp · wob · thr hwy col
- P12·30 · 0.923 0.355 0.083 0.688 0.776 · Square·Light·d6 · Radial · wob lines xh · thr
- P12·31 · 0.997 0.023 0.921 0.653 0.481 · Vert·Dense·d6 · Serp · inv lines · thr hwy
- P12·32 · 0.686 0.186 0.788 0.608 0.988 · Chaotic·Light·d12 · Serp · inv · thr col
- P12·34 · 0.199 0.951 0.108 0.611 0.496 · Vert·Dense·d14 · Serp · inv · col
- P12·37 · 0.287 0.386 0.227 0.333 0.003 · Vert·Dense·d6 · Spiral · inv lines · thr hwy col
- P12·40 · 0.937 0.553 0.051 0.788 0.742 · Chaotic·Med·d10 · Serp · wob xh · col
- P12·41 · 0.975 0.606 0.553 0.576 0.231 · Vert·Dense·d10 · Spiral · wob lines xh · col
- P12·42 · 0.192 0.865 0.531 0.983 0.950 · Chaotic·Light·d2 · Spiral · inv wob xh · thr hwy col
- P12·43 · 0.196 0.311 0.098 0.309 0.623 · Diag·Light·d10 · Radial · wob xh · thr hwy
- P12·46 · 0.844 0.959 0.846 0.717 0.783 · Vert·Dense·d14 · Radial · inv lines
- P12·47 · 0.525 0.141 0.563 0.604 0.421 · Square·Light·d6 · Spiral

### Pass 11 — Full Random (2026-06-10) · 32 selected from 48

- P11·0  · 0.354 0.510 0.590 0.290 0.117 · Diag·Light·d10 · Spiral · wob lines xh · thr hwy col
- P11·2  · 0.822 0.301 0.702 0.824 0.627 · Radial·Med·d10 · Spiral · wob lines · thr hwy
- P11·3  · 0.956 0.557 0.539 0.503 0.661 · Diag·Dense·d8 · Radial · inv wob lines
- P11·5  · 0.451 0.907 0.741 0.016 0.534 · Diag·Med·d4 · Spiral · inv wob lines xh · col
- P11·7  · 0.983 0.662 0.283 0.472 0.794 · Chaotic·Light·d12 · Serp · wob · thr col
- P11·10 · 0.093 0.393 0.283 0.921 0.557 · Radial·Light·d4 · Radial · inv wob · hwy col
- P11·11 · 0.872 0.260 0.901 0.019 0.725 · Vert·Med·d12 · Radial · wob lines · thr col
- P11·12 · 0.693 0.287 0.574 0.468 0.778 · Chaotic·Light·d6 · Spiral · lines xh
- P11·13 · 0.986 0.429 0.099 0.923 0.043 · Radial·Light·d8 · Radial · wob xh
- P11·14 · 0.892 0.405 0.940 0.293 0.803 · Vert·Light·d8 · Spiral · thr
- P11·15 · 0.094 0.785 0.492 0.685 0.509 · Vert·Med·d14 · Radial · wob xh · thr hwy col
- P11·19 · 0.140 0.656 0.279 0.024 0.391 · Radial·Dense·d14 · Spiral · inv wob lines · col
- P11·20 · 0.592 0.127 0.033 0.889 0.670 · Square·Med·d6 · Serp · inv wob · hwy
- P11·21 · 0.549 0.733 0.835 0.963 0.251 · Vert·Med·d2 · Radial · thr hwy col
- P11·22 · 0.077 0.280 0.636 0.008 0.858 · Radial·Dense·d4 · Spiral · xh
- P11·23 · 0.924 0.579 0.575 0.370 0.150 · Radial·Dense·d6 · Radial · inv xh · thr hwy
- P11·24 · 0.646 0.855 0.709 0.169 0.327 · Radial·Dense·d14 · Spiral · inv wob lines · thr hwy
- P11·26 · 0.427 0.476 0.425 0.241 0.132 · Diag·Med·d14 · Serp · wob lines xh · hwy col
- P11·28 · 0.733 0.706 0.740 0.712 0.512 · Chaotic·Light·d8 · Serp · inv wob
- P11·29 · 0.535 0.424 0.609 0.137 0.809 · Square·Med·d14 · Spiral · wob
- P11·30 · 0.490 0.853 0.114 0.842 0.762 · Vert·Med·d6 · Serp · lines xh
- P11·31 · 0.984 0.638 0.473 0.688 0.239 · Square·Light·d2 · Radial · lines xh · thr col
- P11·32 · 0.416 0.648 0.009 0.207 0.680 · Horiz·Light·d10 · Radial · wob lines · hwy col
- P11·33 · 0.930 0.538 0.896 0.819 0.154 · Diag·Med·d12 · Serp · thr col
- P11·36 · 0.620 0.714 0.590 0.550 0.053 · Chaotic·Med·d12 · Spiral · wob · thr col
- P11·38 · 0.889 0.564 0.587 0.559 0.404 · Vert·Dense·d12 · Spiral · inv wob lines · hwy col
- P11·39 · 0.474 0.344 0.240 0.248 0.476 · Horiz·Light·d6 · Serp · inv wob xh · hwy col
- P11·40 · 0.869 0.848 0.570 0.291 0.444 · Horiz·Dense·d8 · Radial · inv wob · thr hwy
- P11·41 · 0.030 0.983 0.514 0.253 0.960 · Horiz·Light·d6 · Radial · thr col
- P11·42 · 0.187 0.081 0.184 0.368 0.645 · Vert·Dense·d14 · Radial · hwy col
- P11·44 · 0.153 0.202 0.633 0.087 0.367 · Diag·Med·d4 · Serp · wob lines · thr
- P11·45 · 0.597 0.470 0.415 0.525 0.905 · Radial·Med·d8 · Spiral · lines · hwy

### Pass 10 — Full Random (2026-06-10) · 33 selected from 48

- P10·2  · 0.758 0.280 0.934 0.081 0.144 · Vert·Med·d10 · Serp · inv lines xh · thr hwy col
- P10·4  · 0.126 0.482 0.687 0.999 0.398 · Horiz·Med·d6 · Spiral · inv wob xh · thr hwy col
- P10·5  · 0.993 0.901 0.388 0.196 0.664 · Horiz·Light·d8 · Serp · inv wob xh · col
- P10·7  · 0.746 0.889 0.257 0.800 0.246 · Radial·Light·d10 · Spiral · wob · thr
- P10·9  · 0.097 0.997 0.991 0.630 0.370 · Vert·Med·d14 · Serp · inv xh · col
- P10·10 · 0.021 0.745 0.381 0.710 0.839 · Square·Light·d4 · Spiral · wob lines xh · thr hwy col
- P10·11 · 0.942 0.684 0.634 0.187 0.537 · Horiz·Dense·d10 · Spiral · wob lines xh · thr hwy col
- P10·12 · 0.744 0.800 0.619 0.469 0.430 · Radial·Dense·d14 · Serp · wob lines xh · thr
- P10·13 · 0.991 0.034 0.968 0.485 0.282 · Chaotic·Dense·d6 · Spiral · inv wob · thr
- P10·15 · 0.149 0.399 0.157 0.851 0.855 · Vert·Dense·d12 · Spiral · inv lines · thr hwy
- P10·16 · 0.132 0.271 0.097 0.121 0.342 · Square·Med·d10 · Spiral · wob · hwy
- P10·17 · 0.181 0.123 0.405 0.151 0.806 · Radial·Light·d4 · Radial · inv wob lines · col
- P10·18 · 0.701 0.982 0.092 0.388 0.510 · Square·Med·d10 · Serp · wob xh · col
- P10·19 · 0.575 0.839 0.588 0.514 0.603 · Square·Light·d14 · Serp · lines xh
- P10·21 · 0.845 0.273 0.589 0.629 0.668 · Square·Dense·d12 · Radial · lines · hwy col
- P10·22 · 0.508 0.641 0.104 0.419 0.968 · Diag·Med·d14 · Serp · inv lines · thr col
- P10·23 · 0.950 0.941 0.602 0.007 0.307 · Diag·Med·d14 · Serp · wob lines · thr
- P10·25 · 0.041 0.611 0.219 0.133 0.815 · Square·Light·d10 · Spiral · thr hwy
- P10·26 · 0.515 0.108 0.319 0.562 0.775 · Chaotic·Dense·d8 · Serp · inv · thr hwy
- P10·27 · 0.384 0.990 0.653 0.037 0.026 · Diag·Dense·d6 · Radial · inv lines xh · thr hwy col
- P10·28 · 0.124 0.002 0.535 0.663 0.067 · Radial·Light·d2 · Radial · inv lines · thr
- P10·29 · 0.423 0.548 0.762 0.908 0.506 · Horiz·Dense·d14 · Radial · xh · hwy
- P10·30 · 0.867 0.164 0.696 0.936 0.134 · Horiz·Med·d8 · Spiral · thr
- P10·31 · 0.295 0.553 0.510 0.693 0.922 · Radial·Light·d8 · Spiral · lines
- P10·32 · 0.510 0.303 0.297 0.340 0.034 · Vert·Med·d8 · Radial · lines · hwy
- P10·34 · 0.669 0.378 0.097 0.833 0.922 · Square·Light·d4 · Spiral · inv wob · thr
- P10·35 · 0.501 0.409 0.419 0.392 0.142 · Diag·Light·d4 · Serp · thr
- P10·38 · 0.025 0.726 0.222 0.587 0.302 · Square·Light·d14 · Serp · lines xh
- P10·40 · 0.505 0.261 0.554 0.369 0.991 · Radial·Light·d2 · Spiral · wob lines · thr hwy
- P10·41 · 0.137 0.739 0.753 0.160 0.340 · Chaotic·Light·d14 · Spiral · inv wob · thr hwy
- P10·43 · 0.819 0.873 0.880 0.841 0.939 · Diag·Light·d12 · Spiral · xh
- P10·45 · 0.489 0.580 0.484 0.332 0.050 · Diag·Light·d14 · Radial · wob lines xh · thr
- P10·46 · 0.683 0.697 0.888 0.277 0.057 · Diag·Dense·d4 · Radial · inv · thr col

### Pass 9 — Full Random (2026-06-10) · 22 selected from 48

- P9·0  · 0.670 0.898 0.026 0.361 0.338 · Horiz·Dense·d8 · Spiral · inv wob lines xh · thr col
- P9·7  · 0.047 0.501 0.525 0.949 0.059 · Radial·Med·d10 · Radial · lines xh · thr hwy
- P9·10 · 0.773 0.714 0.416 0.105 0.265 · Radial·Light·d6 · Spiral · inv wob lines · thr col
- P9·12 · 0.232 0.296 0.570 0.756 0.508 · Vert·Light·d12 · Radial · wob xh · hwy col
- P9·13 · 0.239 0.183 0.042 0.728 0.627 · Vert·Light·d12 · Spiral · inv lines xh · thr
- P9·16 · 0.016 0.585 0.293 0.260 0.953 · Square·Dense·d10 · Spiral · lines · hwy col
- P9·17 · 0.285 0.167 0.642 0.723 0.977 · Square·Med·d12 · Radial · col
- P9·18 · 0.432 0.223 0.067 0.537 0.946 · Square·Dense·d6 · Radial · inv wob · thr hwy col
- P9·20 · 0.609 0.910 0.673 0.522 0.927 · Vert·Dense·d14 · Spiral · wob lines xh
- P9·26 · 0.067 0.442 0.181 0.340 0.870 · Horiz·Med·d6 · Spiral · wob lines · thr hwy col
- P9·30 · 0.946 0.535 0.176 0.538 0.225 · Square·Dense·d12 · Serp · thr
- P9·32 · 0.912 0.125 0.141 0.991 0.285 · Radial·Med·d12 · Radial · inv
- P9·33 · 0.953 0.408 0.644 0.733 0.627 · Diag·Med·d2 · Serp · thr
- P9·34 · 0.811 0.963 0.671 0.954 0.993 · Radial·Dense·d10 · Spiral · lines · thr hwy col
- P9·36 · 0.844 0.285 0.396 0.338 0.385 · Radial·Med·d14 · Radial · inv wob xh · hwy
- P9·37 · 0.515 0.154 0.336 0.415 0.761 · Vert·Dense·d12 · Serp · thr col
- P9·38 · 0.901 0.421 0.962 0.495 0.342 · Chaotic·Light·d8 · Radial · inv · thr hwy
- P9·42 · 0.130 0.706 0.977 0.752 0.604 · Diag·Light·d12 · Spiral · wob · thr hwy
- P9·43 · 0.646 0.077 0.758 0.444 0.859 · Horiz·Med·d12 · Serp · wob xh
- P9·44 · 0.874 0.552 0.775 0.751 0.920 · Radial·Med·d6 · Spiral · wob
- P9·46 · 0.827 0.133 0.184 0.760 0.204 · Diag·Dense·d12 · Radial · wob · hwy
- P9·47 · 0.564 0.136 0.286 0.271 0.904 · Radial·Light·d10 · Serp · inv lines · thr

### Pass 8 — Full Random (2026-06-10) · 17 selected from 48

- P8·0  · 0.821 0.505 0.474 0.161 0.787 · Horiz·Light·d2 · Serp · wob xh
- P8·1  · 0.374 0.340 0.214 0.903 0.204 · Diag·Dense·d2 · Spiral · wob lines · thr col
- P8·6  · 0.608 0.697 0.510 0.445 0.782 · Horiz·Dense·d14 · Serp · thr
- P8·7  · 0.175 0.482 0.955 0.210 0.985 · Chaotic·Dense·d14 · Serp · inv xh · thr
- P8·8  · 0.029 0.601 0.031 0.212 0.128 · Diag·Light·d4 · Spiral · wob xh · thr col
- P8·10 · 0.688 0.291 0.973 0.788 0.541 · Diag·Med·d10 · Serp · inv wob · thr hwy
- P8·11 · 0.457 0.130 0.669 0.783 0.547 · Square·Light·d4 · Radial · wob xh
- P8·12 · 0.018 0.171 0.548 0.994 0.031 · Radial·Light·d2 · Spiral · wob lines · thr hwy
- P8·20 · 0.565 0.800 0.348 0.393 0.989 · Square·Med·d8 · Spiral · inv · col
- P8·25 · 0.359 0.100 0.069 0.592 0.673 · Diag·Med·d14 · Serp · wob · col
- P8·29 · 0.405 0.390 0.536 0.902 0.812 · Radial·Dense·d12 · Serp · inv lines · thr
- P8·31 · 0.266 0.175 0.882 0.559 0.213 · Vert·Med·d2 · Radial · wob
- P8·32 · 0.919 0.554 0.184 0.970 0.706 · Vert·Dense·d6 · Radial · inv wob
- P8·34 · 0.104 0.805 0.544 0.171 0.151 · Vert·Dense·d10 · Serp · lines · thr hwy col
- P8·36 · 0.676 0.364 0.888 0.701 0.481 · Horiz·Light·d12 · Spiral · xh · thr col
- P8·39 · 0.452 0.734 0.199 0.903 0.545 · Horiz·Dense·d2 · Serp · inv · col
- P8·40 · 0.737 0.640 0.562 0.346 0.727 · Diag·Med·d10 · Serp · wob · thr col

### Pass 7 — Full Random (2026-06-10) · 35 selected from 48

- P7·1  · 0.959 0.829 0.839 0.684 0.867 · Diag·Med·d4 · Radial · inv · thr hwy
- P7·2  · 0.389 0.821 0.730 0.790 0.484 · Chaotic·Dense·d2 · Spiral · inv wob lines · thr hwy col
- P7·4  · 0.729 0.006 0.276 0.116 0.508 · Chaotic·Med·d6 · Spiral · inv wob lines xh · thr hwy col
- P7·5  · 0.611 0.833 0.430 0.156 0.595 · Horiz·Dense·d14 · Radial · inv wob · col
- P7·6  · 0.472 0.391 0.011 0.379 0.082 · Horiz·Med·d8 · Spiral · wob · thr hwy
- P7·7  · 0.922 0.332 0.708 0.452 0.671 · Square·Dense·d8 · Serp · inv lines xh · thr hwy
- P7·8  · 0.871 0.397 0.560 0.719 0.543 · Diag·Dense·d8 · Serp · xh · hwy
- P7·9  · 0.999 0.459 0.798 0.821 0.422 · Diag·Med·d12 · Spiral · inv wob lines xh · hwy
- P7·11 · 0.897 0.739 0.684 0.474 0.722 · Square·Light·d8 · Spiral · inv wob lines xh
- P7·12 · 0.043 0.057 0.280 0.561 0.463 · Vert·Med·d14 · Spiral · xh · col
- P7·13 · 0.488 0.456 0.456 0.829 0.196 · Diag·Dense·d4 · Serp · inv lines · thr hwy col
- P7·14 · 0.380 0.169 0.137 0.051 0.005 · Diag·Dense·d8 · Serp · inv wob lines · col
- P7·15 · 0.365 0.775 0.836 0.646 0.008 · Vert·Light·d4 · Spiral · wob xh · hwy
- P7·16 · 0.910 0.113 0.242 0.911 0.556 · Horiz·Light·d8 · Radial · thr col
- P7·17 · 0.928 0.296 0.047 0.859 0.837 · Chaotic·Dense·d12 · Spiral · inv wob lines xh · thr col
- P7·18 · 0.171 0.246 0.810 0.874 0.887 · Chaotic·Dense·d12 · Spiral · inv xh · thr hwy
- P7·19 · 0.859 0.178 0.307 0.660 0.853 · Chaotic·Dense·d10 · Serp · inv wob xh · thr hwy
- P7·20 · 0.752 0.463 0.877 0.188 0.344 · Radial·Med·d4 · Spiral · inv lines · thr hwy col
- P7·24 · 0.983 0.768 0.256 0.526 0.761 · Square·Light·d10 · Serp · wob lines xh
- P7·26 · 0.918 0.213 0.785 0.493 0.619 · Diag·Med·d14 · Serp · wob xh · thr hwy col
- P7·28 · 0.803 0.686 0.791 0.491 0.206 · Radial·Med·d12 · Radial · lines · thr hwy col
- P7·29 · 0.051 0.301 0.886 0.799 0.825 · Vert·Light·d2 · Serp · wob lines xh · thr col
- P7·30 · 0.376 0.861 0.254 0.933 0.774 · Vert·Light·d6 · Serp · inv wob lines · thr hwy col
- P7·31 · 0.031 0.921 0.401 0.301 0.770 · Square·Med·d2 · Spiral · lines xh · thr
- P7·32 · 0.341 0.651 0.455 0.044 0.833 · Radial·Light·d8 · Spiral · wob lines xh · thr col
- P7·34 · 0.303 0.219 0.458 0.457 0.396 · Diag·Light·d6 · Radial · inv xh · col
- P7·35 · 0.900 0.648 0.219 0.998 0.768 · Chaotic·Med·d4 · Serp · inv wob xh · col
- P7·37 · 0.992 0.908 0.073 0.726 0.539 · Radial·Med·d4 · Radial · inv lines · thr col
- P7·38 · 0.650 0.433 0.278 0.556 0.996 · Chaotic·Dense·d4 · Spiral · inv
- P7·39 · 0.246 0.077 0.043 0.638 0.543 · Horiz·Light·d2 · Serp · wob lines · thr col
- P7·40 · 0.375 0.537 0.023 0.839 0.974 · Chaotic·Dense·d4 · Radial · inv lines · thr col
- P7·41 · 0.092 0.549 0.065 0.790 0.208 · Vert·Light·d14 · Spiral · wob lines · thr hwy
- P7·43 · 0.313 0.527 0.506 0.630 0.500 · Chaotic·Dense·d10 · Radial · wob lines xh · thr col
- P7·46 · 0.106 0.294 0.950 0.806 0.466 · Square·Med·d6 · Radial · wob lines · thr hwy
- P7·47 · 0.959 0.095 0.079 0.018 0.541 · Horiz·Dense·d10 · Spiral · inv wob · thr hwy

### Pass 6 — Full Random (2026-06-10) · 30 selected from 48
*Note: seeds not reproducible for this pass (randomizeAll() bug). Params only.*

- P6·2  · Diag·Dense·d10 · Serp · wob xh · hwy
- P6·6  · Square·Light·d8 · Serp · lines · hwy col
- P6·10 · Vert·Dense·d10 · Serp · thr hwy col
- P6·11 · Vert·Light·d2 · Serp · thr hwy
- P6·12 · Radial·Light·d10 · Spiral · inv · hwy
- P6·14 · Diag·Light·d6 · Radial · lines xh · thr hwy
- P6·15 · Square·Light·d2 · Spiral · wob lines · thr hwy col
- P6·16 · Vert·Dense·d10 · Spiral · hwy col
- P6·17 · Chaotic·Light·d14 · Radial · lines xh · thr hwy
- P6·18 · Radial·Med·d12 · Spiral · inv wob xh · thr hwy
- P6·20 · Vert·Dense·d2 · Serp · inv wob xh · thr
- P6·21 · Square·Light·d14 · Radial · inv · thr hwy col
- P6·22 · Horiz·Dense·d8 · Serp · thr hwy
- P6·26 · Vert·Med·d12 · Radial · inv wob · thr hwy
- P6·27 · Square·Dense·d6 · Spiral · xh · hwy
- P6·29 · Vert·Med·d6 · Serp · lines · hwy col
- P6·30 · Square·Med·d10 · Radial · thr hwy col
- P6·32 · Chaotic·Med·d6 · Radial · inv wob xh · hwy
- P6·35 · Horiz·Light·d10 · Radial · wob lines · thr hwy
- P6·36 · Diag·Dense·d2 · Serp · wob · hwy
- P6·37 · Diag·Light·d12 · Serp · lines · hwy
- P6·38 · Vert·Dense·d6 · Serp · lines · thr col
- P6·39 · Chaotic·Med·d8 · Spiral · wob · thr
- P6·40 · Chaotic·Dense·d14 · Spiral · wob · thr hwy col
- P6·41 · Chaotic·Dense·d10 · Serp · wob lines · hwy col
- P6·42 · Square·Light·d2 · Serp · inv wob · hwy
- P6·43 · Radial·Light·d10 · Spiral · lines xh · hwy
- P6·45 · Diag·Dense·d10 · Spiral · wob · thr hwy
- P6·46 · Radial·Dense·d2 · Radial · inv lines xh · thr hwy col
- P6·47 · Radial·Med·d12 · Radial · inv wob xh · thr hwy

---

## Exploration Log

| Date | Archetypes | Seeds | Action |
|------|-----------|-------|--------|
| 2026-06-07 | A, D | 6 each (Set A + B) | First comparison grid |
| 2026-06-09 | A, D | 6 each (A1–A6, D1–D6) | 12-image grid, selected A5/A6/D4/D6 |
| 2026-06-09 | A,D,H,R,C,M | 4 each = 24 total | First full archetype pass |
| 2026-06-10 | Biased random | 48 pass 1 | Exploration — no selections |
| 2026-06-10 | Biased random | 48 pass 2 | 21 selected → saved to seed library |
| 2026-06-10 | Biased random | 48 pass 3 | 14 selected → saved to seed library |
| 2026-06-10 | Biased random | 48 pass 4 | 14 selected → saved to seed library |
| 2026-06-10 | Biased random | 48 pass 5 | 6 selected → saved to seed library |

---

## Parameter Reference

```javascript
// waveAngleOptions: 0=Diagonal 1=Horizontal 2=Vertical 3=Radial 4=Square 5=Chaotic
// growthOptions:    0=Serpentine 1=Radial 2=Spiral
// densityOptions:   0=Light(skip40%) 1=Medium(skip20%) 2=Dense(skip5%)
// depthOptions:     [1,2,4,6,8,10,12...] — index into array
//   maxDepthLevel=2 → depth=4, maxDepthLevel=3 → depth=6
```

---

## Archetype Visual Matrix — Session State (2026-06-10)

Visual matrix built from 260 seeds (Passes 6–14). Identifying canonical archetypes for a representative reference grid.

### Render recipe
```javascript
// Standard 420×420 thumbnail render (SZ=420):
const SZ=420;
waveLevel=2; waveAngleLevel=X; densityLevel=X; maxDepthLevel=X;
invertDensity=bool; wobbleMode=bool; growthMode=X; useBezier=bool;
crosshatchEnabled=bool; hideThreads=bool; hideHighways=bool;
coloredThread=bool; sepiaMode=true; skipSparseConnections=false;
m0='X.XXX'; m1='X.XXX'; m2='X.XXX'; m3='X.XXX'; m4='X.XXX';
setPaperColor(); setSeeds(); initDrawing();
await new Promise(res=>setTimeout(res,450));
while(currentSegment<segments.length){drawSegment(segments[currentSegment],currentSegment);currentSegment++;}
noLoop(); drawThreadsToOverlay(); drawSignature();
await new Promise(res=>setTimeout(res,100));
const src=document.querySelector('canvas');
const clone=document.createElement('canvas'); clone.width=SZ; clone.height=SZ;
const ctx=clone.getContext('2d');
ctx.fillStyle='#f0dfc0'; ctx.fillRect(0,0,SZ,SZ);
ctx.drawImage(src,0,0,SZ,SZ);
if(typeof threadCanvas!=='undefined' && threadCanvas) ctx.drawImage(threadCanvas,0,0,SZ,SZ); // bare ref! threadCanvas is a top-level `let`, NOT on window
window.KEY = clone.toDataURL('image/jpeg',0.82);
```

Seed flag decoder: `inv`=invertDensity=true, `wob`=wobbleMode=true, `xh`=crosshatchEnabled=true, `lines`=useBezier=false.
Layer decoder: `thr`=hideThreads=false, `hwy`=hideHighways=false, `col`=coloredThread=true. Absent = default off.

Wave/density/depth decoder:
- Wave: Diag=0, Horiz=1, Vert=2, Radial=3, Square=4, Chaotic=5
- Density: Light=0, Med=1, Dense=2
- Depth: d2→mD=1, d4→mD=2, d6→mD=3, d8→mD=4, d10→mD=5, d12→mD=6, d14→mD=7
- Growth: Serp=0, Radial=1, Spiral=2

### Confirmed Archetypes (8) — window._cat1 through _cat8

| # | Name | Seed line |
|---|------|-----------|
| 1 | Orbital Script | P14·21 · 0.071 0.266 0.525 0.127 0.845 · Radial·Light·d12 · Serp · thr col |
| 2 | Vertical Column | P12·31 · 0.997 0.023 0.921 0.653 0.481 · Vert·Dense·d6 · Serp · inv lines · thr hwy |
| 3 | Diagonal Manuscript | P12·20 · 0.688 0.188 0.329 0.490 0.023 · Diag·Dense·d10 · Serp · inv wob lines · thr hwy col |
| 4 | Chaotic Sparse | P12·6 · 0.891 0.255 0.758 0.134 0.593 · Chaotic·Light·d10 · Spiral · inv xh |
| 5 | Monumental | P14·22 · 0.734 0.346 0.429 0.841 0.289 · Square·Light·d2 · Spiral · wob xh · thr hwy |
| 6 | Dense Network | P9·34 · 0.811 0.963 0.671 0.954 0.993 · Radial·Dense·d10 · Spiral · lines · thr hwy col |
| 7 | Horizontal Register | P10·30 · 0.867 0.164 0.696 0.936 0.134 · Horiz·Med·d8 · Spiral · thr |
| 8 | Diagonal Aerial | P13·16 · 0.573 0.223 0.747 0.851 0.838 · Diag·Light·d14 · Spiral · wob xh · thr hwy |

Render params for each (wA=waveAngle, dL=density, mD=maxDepthLevel, gM=growth):

| # | wA | dL | mD | gM | inv | wob | xh | bez | ht | hh | ct |
|---|----|----|----|----|-----|-----|----|-----|----|----|-----|
| 1 | 3 | 0 | 6 | 0 | F | F | F | T | F | T | T |
| 2 | 2 | 2 | 3 | 0 | T | F | F | F | F | F | F |
| 3 | 0 | 2 | 5 | 0 | T | T | F | F | F | F | T |
| 4 | 5 | 0 | 5 | 2 | T | F | T | T | T | T | F |
| 5 | 4 | 0 | 1 | 2 | F | T | T | T | F | F | F |
| 6 | 3 | 2 | 5 | 2 | F | F | F | F | F | F | T |
| 7 | 1 | 1 | 4 | 2 | F | F | F | T | F | T | F |
| 8 | 0 | 0 | 7 | 2 | F | T | T | T | F | F | F |

### Pending Candidates — approved to add (A/B/C), stored in _cA/_cB/_cC

| Key | Name | Seed line |
|-----|------|-----------|
| _cA | Double Radial | P14·23 · 0.042 0.499 0.115 0.801 0.738 · Radial·Light·d8 · Radial · inv xh · thr hwy |
| _cB | Vert Radial-Growth | P13·33 · 0.763 0.959 0.231 0.749 0.379 · Vert·Dense·d8 · Radial · thr |
| _cC | Vert Light / Airy | P7·41 · 0.092 0.549 0.065 0.790 0.208 · Vert·Light·d14 · Spiral · wob lines · thr hwy |

Render params:

| Key | wA | dL | mD | gM | inv | wob | xh | bez | ht | hh | ct |
|-----|----|----|----|-----|-----|-----|----|-----|----|----|-----|
| _cA | 3 | 0 | 4 | 1 | T | F | T | T | F | F | F |
| _cB | 2 | 2 | 4 | 1 | F | F | F | T | F | T | F |
| _cC | 2 | 0 | 7 | 2 | F | T | F | F | F | F | F |

### Display Glyph Candidates — user to choose one (stored in _dA/_dB/_dC/_dD)

The "D — Display Glyphs" archetype from the original 6 was missing from the matrix. These four Dense+inv seeds were rendered as candidates. User needs to pick one.

| Key | Seed line | Notes |
|-----|-----------|-------|
| _dA | P12·34 · 0.199 0.951 0.108 0.611 0.496 · Vert·Dense·d14 · Serp · inv · col | wA=2, dL=2, mD=7, gM=0, inv=T, wob=F, bez=T, ht=T, hh=T, ct=T |
| _dB | P9·18 · 0.432 0.223 0.067 0.537 0.946 · Square·Dense·d6 · Radial · inv wob · thr hwy col | wA=4, dL=2, mD=3, gM=1, inv=T, wob=T, bez=T, ht=F, hh=F, ct=T |
| _dC | P13·5 · 0.593 0.256 0.006 0.333 0.256 · Square·Dense·d12 · Radial · inv wob xh · col | wA=4, dL=2, mD=6, gM=1, inv=T, wob=T, xh=T, bez=T, ht=T, hh=T, ct=T |
| _dD | P12·17 · 0.206 0.826 0.869 0.207 0.527 · Diag·Dense·d4 · Radial · hwy col | wA=0, dL=2, mD=2, gM=1, inv=T, wob=F, bez=T, ht=T, hh=F, ct=T |

### ▶ RESUME LATER (current state as of 2026-06-11 end of session)

**Where we are:** the grammar is in two studies, both committed to `main` (local only, **not pushed**):
- **Study 2 — the current, complete grammar:** `grammar-study-2.js`, **132 keepers · 14 archetypes ·
  waveLevel-aware (0/1/2/3)**. The waveLevel axis is fully mapped: Packed Manuscript (wl0, dense extreme)
  · 12 structured archetypes (wl2) · Open Gesture (wl3, sparse/gestural extreme). See "Grammar Study 2".
- **Study 1 — the prior refined grammar:** `grammar-tools.js`, 117 keepers, all wl2, 12 archetypes. Intact.

Empty-interior guard live in `index.js`; thread-compositing bug fixed (renders include threads).

**One-step restart (loads the current grammar, Study 2):**
1. Start the preview server (launch config `asemic_writing`, port 3457; serves this folder).
2. In the running page: `eval(await fetch('/grammar-study-2.js').then(r=>r.text()))` via preview_eval.
3. It auto-renders all 132 at native res (each at its own `wl`, threads on, ~3s), builds the clickable
   overview (click a thumb → viewer), and opens the single-image viewer.
   API: `GrammarStudy2.renderAll()` · `.buildOverview()` · `.launchViewer(startIdx)` · `.KEEPERS` (132).
   To open just one archetype (e.g. trim Open Gesture): filter `GrammarStudy2.KEEPERS.filter(s=>s.arch==='OG')`.
   _(Study 1 still loads the same way via `grammar-tools.js` → `window.GrammarTools`.)_

Viewer keys: ←/→ navigate · K/Space keep · F kept-only · E export · Esc close.

**Render recipe** (each record renders at its own `wl`; not stored in seed lines for Study 1, where wl=2):
set globals from a record → `setPaperColor(); setSeeds(); initDrawing();` → loop `drawSegment` over
all `segments` (synchronous, no wait) → `noLoop(); drawThreadsToOverlay(); drawSignature()` →
composite paper + canvas + `threadCanvas` (bare ref!) at native size.

### Next steps — thoughts (2026-06-12)

The **mapping/curation phase is complete** (260+ seeds → 132-keeper canon, 14 archetypes, waveLevel
axis fully mapped). Further generating/trimming is diminishing returns. The question has shifted from
*"what can the system make?"* to *"what do we do with the canon we authored?"* Key gap: the canon lives
in a side artifact (`grammar-study-2.js`), **disconnected from the published Field Script sketch**,
which still just randomizes.

Recommended directions, in priority order:
1. **Type-specimen sheet (lead rec).** One designed page: the 14 archetypes, one definitive exemplar
   each, named + arranged like a font specimen. The artifact that justifies the curation; finite,
   finishable; squarely in the user's Tufte/Heritage design wheelhouse. The capstone.
2. **Wire the canon into the live sketch (higher-leverage).** Add a "canon"/gallery mode to the
   published sketch so visitors step through the 132 curated compositions or browse by archetype,
   instead of pure randomization. Makes the authored variation visible to others.
3. **Plotter/SVG output.** Sketch already has SVG export + plotter heritage — export strongest pieces
   (or one/archetype) as plotter-ready SVGs; make the canon physical.
4. **Publish.** `git push` (8 commits ahead of origin, local; CC-licensed GH Pages repo).

My vote: **#1 now** (specimen sheet capstone), **#2** as the natural follow-on. Stopping here is also
valid — the canon is saved at a clean point.

### Taxonomy expansion — Pass 16 added archetypes 13 & 14 (2026-06-10) — SUPERSEDED by refined 12

_Historical: Pass 16 used a 14-archetype scheme. The curation (see "Refined Grammar — Curated")
reduced it to 12 — dropped Vert Light/Airy, merged Chaotic Sparse + Turbulent Manuscript (13) →
Turbulent Field. The note below documents the 14-scheme definitions of 13 & 14 as originally added._

The grammar passes (15, 16) classify samples by a weighted nearest-archetype scorer (wave ×2,
growth/density/invert/depth ×1; best score < 3 → Unnamed). Archetypes 9–14 are the numbered
grammar taxonomy (supersedes/extends the original lettered A–M set above for grammar work).

| # | Name | Classifier signature (≥3 to match) | Description |
|---|------|-----------------------------------|-------------|
| 13 | Turbulent Manuscript | `wA=5 (Chaotic, +2)` + `dL≥1 (Med/Dense, +1)` | Dense Perlin turbulence — ink-heavy churning field, no geometric order. Dense sibling of Chaotic Sparse (#4, which is Light+Spiral). |
| 14 | Horizontal Band | `wA=1 (Horiz, +2)` + `dL=2 (Dense, +1)` | Packed text-block rows. Dense counterpart of Horizontal Register (#7, Medium density, looser rhythm). |

Note: `inv` Dense samples still route to Display Glyphs (#12) first (score 4 > 3) — the inversion
attractor takes precedence over 13/14 for inverted-density fields. Both 13/14 capture the non-inv cases.

### Empty-interior guard (added to index.js `randomizeAll`, 2026-06-10)

```javascript
if (invertDensity && skipSparseConnections && maxDepthLevel <= 3) {
    skipSparseConnections = false;
}
```
Prevents the `inv + skip + shallow-depth` degenerate combos that empty the interior (Pass 15 prune).
Harness adds a post-render interior-ink ≥0.5% net for the high-depth `inv` empties the guard misses.

### Files on disk (persistent — all committed to main)
- `index.js` — sketch + empty-interior guard in `randomizeAll`
- `CLAUDE.md` — this file: both studies + full methodology + Pass 6–14 history
- `grammar-study-2.js` — **current restart artifact**: 132 records (wl 0/1/2/3, 14 archetypes incl
  Packed Manuscript + Open Gesture) + renderAll (per-record wl, threads on) + overview + viewer
- `grammar-tools.js` — Study 1 restart artifact: 117 records (all wl2, 12 archetypes)
- `wavelevel-preview.js` — waveLevel axis comparison (6 seeds × 4 levels)
- `wavelevel-explore.js` — wl0/1 mining set (24 seeds)
- `archetype-matrix-2026-06-10.png` — earlier 11-archetype reference matrix render

### Browser state (ephemeral — rebuilt by re-running the artifact)
- `window.GrammarStudy2.KEEPERS` — 132 records (current grammar); `_hi`=native render, `_keep` flag
- `window.GrammarTools.KEEPERS` — 117 records (Study 1)
- _(the wl3 mining pool `window._wl3` was in-memory only; the kept 27 are saved in grammar-study-2.js)_
