# Field Script — Project Context for Claude

**Location:** `/Users/lukasz/genuary-2026/sketches/asemic_writing/`
**GitHub:** https://github.com/lukaszlysakowski/field-script
**Live:** https://lukaszlysakowski.github.io/field-script/
**Preview server:** `asemic_writing` on port 3457 (defined in `/Users/lukasz/claude/.claude/launch.json`)

---

## Core System

One sentence: *Subdivide space recursively; fill each terminal cell with lines governed by a Schotter disorder field; arrange in horizontal density bands with word-spacing rhythm; overlay cross-strata highway marks.*

Three layers that must remain structurally distinct:
1. **Density wave** — drives which horizontal bands are active (Y-axis structure)
2. **Word-weight noise** — drives order/disorder within each band (X-axis structure, Schotter gradient)
3. **Highways** — cross-strata vertical marks that span multiple cell chains, crossing subdivision boundaries

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Full layout: EditART PRNG boilerplate + dark sidebar HTML + stage div |
| `index.js` | All p5.js algorithm + `setupControls()` wiring HTML buttons |
| `p5.min.js` | Local p5.js (do not replace without testing) |
| `philosophy.md` | Artistic intent, lineage, system description — update when direction shifts |
| `CLAUDE.md` | This file — update when architecture or defaults change |

---

## Architecture Decisions to Preserve

- **Highways are prepended** to the segments array, drawn first (behind field marks). `depth=6, w=0.7-1.0` — same weight register as fine field marks. Do not make them heavier.
- **Size-adjusted density threshold:** `0.35 * max(1, sizeRatio * 0.55)` — large cells need higher density to appear. Keeps inter-band gaps clean.
- **Schotter gradient:** `disorder = 1.0 - cell.wordWeight`. At disorder=0: near-vertical marks spanning full cell height. At disorder=1: rotated up to ~58° and shortened. The rotation uses `randAngle = random(-HALF_PI*0.65, HALF_PI*0.65) * disorder`.
- **Threads:** drawn in `drawSegment()`, skipped for highway segments (`seg.isHighway`). Skipped when `hideThreads` or when `avgDensity <= 0.5` and `skipSparseConnections` is on.
- **Border + signature:** drawn in `initDrawing()` (border rect) and `drawSignature()` (called at animation end). Pad = `Math.round(cs * 0.04)`. Signature format: `Field Script · seed m0 m1 m2 m3 m4  YYYY-MM-DD HH:MM` in JetBrains Mono.
- **Canvas sizing:** `cs = Math.min(windowWidth - 212 - 48, windowHeight - 48)`. The `212` is the sidebar width — update both if sidebar width changes.
- **SVG export has four Inkscape layers:** Border, Highways, Segments, Threads. This is intentional for plotter pen-pass separation.

---

## Current Controls and Defaults

| Section | Control | Default | Notes |
|---|---|---|---|
| Field | Wave | Medium (1.5–3 Hz) | |
| Field | Angle | Vertical | Creates horizontal text bands |
| Field | Invert | Off | |
| Marks | Density | Dense (maxLines 4, skipChance 0.05) | |
| Marks | Depth | 6 (index 3 in depthOptions) | |
| Marks | Strokes | Lines | Bezier mode available via toggle |
| Marks | Crosshatch | Off | Deep cells (depth≥3) only |
| Style | Wobble | Off | |
| Style | Sepia | Off | Background `#f0dfc0`, ink `#5c4033` |
| Style | Growth | Serpentine | Radial and Spiral available |
| Style | Thread | Black (semi-transparent) | Red option: `#843c41` |
| Style | Skip Sparse | On | Skip thread connections where avgDensity ≤ 0.5 |
| View | Threads | Visible | Same-seed redraw when toggled |
| View | Highways | Visible | Same-seed redraw when toggled |

---

## Art History Connections to Maintain

These are not decorative — the algorithm embodies these formal relationships:

- **Frieder Nake** — recursive subdivision producing horizontal bands (the unintended, then intentional, connection)
- **Georg Nees / Schotter** — the disorder gradient is structurally his single-variable order→chaos system, applied laterally
- **Vera Molnár** — the word-weight noise is a second perturbation system operating on the first (density wave)
- **Sol LeWitt** — the one-sentence system description IS the work; all other outputs are instances
- **Alison Knowles / House of Dust** — the glyph vocabulary (8 stroke types) is the list; the grammar assembles them
- **Klee / Highways and Byways** — the highway marks are the cross-strata vertical paths crossing horizontal registers

Do not add complexity that blurs the one-sentence description. Additions should either strengthen one of these connections or pass the Knowles Diagnostic (one idea, one sentence, does this path justify itself?).

---

## Auto-Update Protocol

**Update this file** when any of the following change:
- A default value changes (update the Controls table)
- A new control is added or removed
- An architectural decision is made (e.g. changing highway depth, threshold formula, border pad)
- Canvas sizing formula changes

**Update `philosophy.md`** when:
- The art direction shifts significantly
- A new art history connection is established
- The one-sentence system description changes

**Update project memory** (`/Users/lukasz/.claude/projects/-Users-lukasz-claude/memory/project_asemic_writing.md`) when:
- Major evolutions happen
- The GitHub/live URLs change
- The core architecture changes

**After any session with significant changes**, commit to GitHub:
```bash
cd /Users/lukasz/genuary-2026/sketches/asemic_writing
git add -A && git commit -m "description of changes"
git push
```
