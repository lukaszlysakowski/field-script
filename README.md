# Field Script

**A homage to a homage** — generative mark-making after Frieder Nake's *Hommage à Paul Klee* (1965), after Paul Klee's *Highways and Byways* (1929).

**[→ Live maker](https://lukaszlysakowski.github.io/field-script/)**  ·  **[→ Specimen gallery](https://lukaszlysakowski.github.io/field-script/specimen.html)**

---

## Origin

Field Script began as an exploration of **asemic writing** — marks that carry the grammar and gesture of language without carrying any meaning. The intent was to merge two earlier generative sketches: one based on recursive grid subdivision, another based on organic lifeform growth. The resulting system subdivides a canvas into cells of varying scale, fills each cell with abstract strokes, and arranges them into horizontal density bands that read like lines of text from an unknown script.

The system was not designed to reference any specific work. The connection announced itself.

Recursive subdivision producing horizontal banding with vertical marks inside cells: this is also what Frieder Nake's *Hommage à Paul Klee* does. Nake, one of the pioneers of computer-generated art, built his 1965 piece using matrix multiplication and stochastic processes to produce a composition of horizontal registers with marks inside them — a computational tribute to Klee's mark-making sensibility.

The deeper loop: Paul Klee's own practice was the original connection point. His *Highways and Byways* (1929) is a painting of horizontal landscape bands crossed by vertical paths — fields divided by roads, terrain divided by canals — that reads simultaneously as aerial landscape and as a system of notation. Klee's marks look like writing. Nake chose Klee as his subject precisely because Klee already thought algorithmically — systematic variation, rule-governed structure, marks as notation.

**Field Script arrives at the same formal territory through the same computational method without intending to.** That coincidence became the piece's subject. What began as asemic writing became, unintentionally, a homage to a homage: recursive subdivision as the persistent formal logic connecting a 1929 painting, a 1965 plotter drawing, and this.

---

## The System

Two independent systems operate on the canvas simultaneously:

**System 1 — The Field (vertical structure)**
A horizontal density wave creates text-line bands: dense registers of marks separated by quiet margins, like lines of script on a page. The wave frequency, angle, and phase are all configurable, allowing the "page layout" to vary from tight manuscript to open composition.

**System 2 — Word Spacing + Schotter Gradient (horizontal structure)**
A secondary Perlin noise field runs along the X axis, creating word-cluster rhythm within each band. Cells at the centre of a word cluster receive ordered, near-vertical marks (full height, parallel — the ordered end of the Schotter spectrum). Cells at word edges receive progressively rotated and shortened marks, dissolving into scattered diagonals. This is Georg Nees's *Schotter* logic applied laterally: a single variable controlling the transition from order to chaos, here running along the writing direction rather than top-to-bottom.

**Highways**
Cross-strata vertical marks span multiple cell chains, crossing the horizontal subdivision boundaries without belonging to any individual band. These are Klee's "highways" — the vertical paths in *Highways and Byways* that cross all horizontal fields. In the code they are generated separately, prepended to the segment list (drawn behind all other marks), and given their own SVG layer for separate pen-pass plotting.

**Threads**
Thin semi-transparent connecting lines trace the pen's movement between marks — the calligrapher's hand returning across the page. Inherited from the source sketches' pen-plotter aesthetic.

---

## Controls

| Section | Control | Effect |
|---|---|---|
| Field | Wave | Density wave frequency (None / Sparse / Medium / Busy) |
| Field | Angle | Wave direction — Vertical creates horizontal text bands |
| Field | Invert | Flip density so sparse becomes dense |
| Marks | Density | Mark count per cell (Light / Medium / Dense) |
| Marks | Depth | Recursion depth — higher = finer subdivision |
| Marks | Strokes | Lines (Schotter mode) or Bezier (glyph vocabulary) |
| Marks | Crosshatch | Add perpendicular lines in deeply subdivided cells |
| Style | Wobble | Hand-drawn noise perturbation on all mark endpoints |
| Style | Sepia | Warm ink tones on aged paper ground |
| Style | Growth | Traversal order: Serpentine / Radial / Spiral |
| Style | Thread | Thread colour: Black (semi-transparent) or Red |
| Style | Skip Sparse | Suppress threads in low-density zones |
| View | Threads | Show / hide connecting threads (same-seed redraw) |
| View | Highways | Show / hide highway marks (same-seed redraw) |
| — | Randomize | Randomize all parameters + new seed |
| — | Refresh | New seed, keep current parameters |
| — | SVG | Export — five Inkscape layers: Border / Highways / Segments / Threads / Signature |
| — | PNG | Export raster |

Click anywhere on the canvas to generate a new seed with current parameters.

---

## Specimen & Canon

Beyond the live maker, the project carries a **curated canon** — **130 compositions** selected from hundreds of seeds and organised into **14 archetypes** along a single axis: **waveLevel**, an openness dial running from the dense extreme (*Packed Manuscript*, waveLevel 0) through structured middle registers to the sparse extreme (*Open Gesture*, waveLevel 3).

A static **specimen site** presents the collection:

- **[specimen.html](https://lukaszlysakowski.github.io/field-script/specimen.html)** — the index: one exemplar card per archetype, plus the two axis extremes.
- **theme.html** — a per-archetype gallery: browse every piece in a theme with prev/next (← / → keys) and a thumbnail strip.

Each piece offers four downloads, all generated in the browser:

| Download | What it is |
|---|---|
| **PNG** | The raster image as shown — lossless. |
| **SVG** | Full vector with depth-scaled stroke weights and a single-line stroke-font signature. |
| **Plot-ready SVG** | Pen-plotter–ready: background removed, layered by pen, stroke weights preserved (for width-aware tools such as DrawingBotV3 / vpype), sized in mm. |
| **Overdraw SVG** | Weight baked into geometry — heavy strokes become multiple parallel pen passes, so a single-pen plotter physically draws them thicker (pen width selectable). |

---

## SVG / Plotter Output

The SVG export produces five Inkscape layers corresponding to natural pen-pass separations on a plotter:

1. **Border** — Registration frame
2. **Highways** — Cross-strata vertical marks (heavier pen or separate pass)
3. **Segments** — Field marks and glyph strokes
4. **Threads** — Connecting trace lines (fine pen, reduced opacity)
5. **Signature** — Single-line stroke caption (seed identifier)

Each layer can be plotted independently, combined selectively, or used for multi-pen registration. The specimen gallery additionally offers **plot-ready** (cleaned, weight-preserving) and **overdraw** (multi-pass thickness for single-pen plotters) variants of any piece — see [Specimen & Canon](#specimen--canon).

---

## Lineage

| Work | Artist | Year | Connection |
|---|---|---|---|
| *Highways and Byways* | Paul Klee | 1929 | Horizontal registers + vertical paths; landscape as notation |
| *Hommage à Paul Klee* | Frieder Nake | 1965 | Recursive subdivision; computational tribute to Klee's grammar |
| *Schotter* | Georg Nees | 1968 | Single variable controlling order→disorder gradient |
| *House of Dust* | Alison Knowles | 1967 | Vocabulary list + grammatical rule = complete generative system |
| *Wall Drawings* | Sol LeWitt | 1968– | The instruction as the work; every execution is an instance |
| Field Script | — | 2026 | Homage to a homage; the same algorithm finding the same territory |

---

## Running Locally

No build step required. Serve the directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:3000` (or whichever port) for the maker, or `/specimen.html` for the curated gallery.

The `studies/` folder holds the grammar-analysis and waveLevel-exploration tooling used to derive the canon — reference material, not part of the live site.

---

*Each seed is a complete document. No two are translatable. All are somehow familiar.*

---

## License

[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) — Lukasz Lysakowski, 2026

You may share this work with attribution. Commercial use and derivative works are not permitted.
