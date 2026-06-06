// EVOLUTION: Schotter applied to word-weight. Word-centre cells get ordered vertical marks
// (parallel, full height). Word-edge cells get lines rotated and shortened by disorder.
// Two systems: density wave drives line position, word noise drives order→chaos within bands.

let cs;
let segments = [];
let currentSegment = 0;
let cells = [];
let growthCenter;
let wordNoiseOffset = 0; // tied to seed, gives each run a unique word-spacing pattern

let densityLevel      = 2;
let maxDepthLevel     = 3;
let waveLevel         = 2;
let waveAngleLevel    = 2;
let invertDensity     = false;
let wobbleMode        = false;
let sepiaMode         = false;
let growthMode            = 0;
let crosshatchEnabled     = false;
let useBezier             = false;
let skipSparseConnections = true;
let coloredThread         = false;
let hideThreads           = false;
let hideHighways          = false;

// UI wired via HTML — no p5 button elements

const densityOptions = [
    { name: 'Light',  maxLines: 1, skipChance: 0.40 },
    { name: 'Medium', maxLines: 2, skipChance: 0.20 },
    { name: 'Dense',  maxLines: 4, skipChance: 0.05 }
];

const depthOptions     = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 30, 40, 60, 100];
const waveOptions      = [
    { name: 'None',   freqMin: 0,   freqMax: 0   },
    { name: 'Sparse', freqMin: 0.8, freqMax: 1.5 },
    { name: 'Medium', freqMin: 1.5, freqMax: 3   },
    { name: 'Busy',   freqMin: 3,   freqMax: 5   }
];
const waveAngleOptions = ['Diagonal', 'Horizontal', 'Vertical', 'Radial', 'Square', 'Chaotic'];
const growthOptions    = ['Serpentine', 'Radial', 'Spiral'];

function setup() {
    let sidebarW = 212; // matches CSS .sidebar width
    let pad      = 48;  // 24px each side in .stage
    cs = Math.min(windowWidth - sidebarW - pad, windowHeight - pad);
    let canvas = createCanvas(cs, cs);
    canvas.parent('canvas-container');
    setupControls();
    setSeeds();
    initDrawing();
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function setCtrl(id, value) {
    let el = document.getElementById(id);
    if (el) el.textContent = value;
}

function setToggle(btnId, valId, isActive, onLabel, offLabel) {
    let btn = document.getElementById(btnId);
    let val = document.getElementById(valId);
    if (btn) btn.classList.toggle('on', isActive);
    if (val) val.textContent = isActive ? onLabel : offLabel;
}

function wire(id, fn) {
    let el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
}

// ─── controls ─────────────────────────────────────────────────────────────────

function setupControls() {
    wire('waveBtn', () => {
        waveLevel = (waveLevel + 1) % 4;
        setCtrl('waveVal', waveOptions[waveLevel].name);
        initDrawing();
    });
    wire('waveAngleBtn', () => {
        waveAngleLevel = (waveAngleLevel + 1) % 6;
        setCtrl('waveAngleVal', waveAngleOptions[waveAngleLevel]);
        initDrawing();
    });
    wire('invertBtn', () => {
        invertDensity = !invertDensity;
        setToggle('invertBtn', 'invertVal', invertDensity, 'on', 'off');
        initDrawing();
    });
    wire('densityBtn', () => {
        densityLevel = (densityLevel + 1) % 3;
        setCtrl('densityVal', densityOptions[densityLevel].name);
        initDrawing();
    });
    wire('depthBtn', () => {
        maxDepthLevel = (maxDepthLevel + 1) % depthOptions.length;
        setCtrl('depthVal', depthOptions[maxDepthLevel]);
        initDrawing();
    });
    wire('strokeTypeBtn', () => {
        useBezier = !useBezier;
        setCtrl('strokeTypeVal', useBezier ? 'Bezier' : 'Lines');
        initDrawing();
    });
    wire('crosshatchBtn', () => {
        crosshatchEnabled = !crosshatchEnabled;
        setToggle('crosshatchBtn', 'crosshatchVal', crosshatchEnabled, 'on', 'off');
        initDrawing();
    });
    wire('wobbleBtn', () => {
        wobbleMode = !wobbleMode;
        setToggle('wobbleBtn', 'wobbleVal', wobbleMode, 'on', 'off');
        initDrawing();
    });
    wire('sepiaBtn', () => {
        sepiaMode = !sepiaMode;
        setToggle('sepiaBtn', 'sepiaVal', sepiaMode, 'on', 'off');
        repaint();
    });
    wire('growthBtn', () => {
        growthMode = (growthMode + 1) % 3;
        setCtrl('growthVal', growthOptions[growthMode]);
        initDrawing();
    });
    wire('threadColorBtn', () => {
        coloredThread = !coloredThread;
        setToggle('threadColorBtn', 'threadColorVal', coloredThread, 'Red', 'Black');
        initDrawing();
    });
    wire('skipSparseBtn', () => {
        skipSparseConnections = !skipSparseConnections;
        setToggle('skipSparseBtn', 'skipSparseVal', skipSparseConnections, 'on', 'off');
        initDrawing();
    });
    wire('hideThreadsBtn', () => {
        hideThreads = !hideThreads;
        setToggle('hideThreadsBtn', 'hideThreadsVal', hideThreads, 'hidden', 'visible');
        setSeeds(); initDrawing();
    });
    wire('hideHighwaysBtn', () => {
        hideHighways = !hideHighways;
        setToggle('hideHighwaysBtn', 'hideHighwaysVal', hideHighways, 'hidden', 'visible');
        setSeeds(); initDrawing();
    });
    wire('randomizeBtn', randomizeAll);
    wire('refreshBtn',   refresh);
    wire('svgBtn',       exportSVG);
    wire('pngBtn',       exportPNG);
}

// ─── density field ────────────────────────────────────────────────────────────

function getDensityAt(x, y, waveFreq, phaseOffset, noiseScale, noiseOffset) {
    let cx = cs / 2, cy = cs / 2;
    let d;

    if (waveAngleLevel === 5) {
        d = noise(noiseOffset + x * noiseScale / cs, noiseOffset + y * noiseScale / cs);
        if (waveFreq > 0) d = pow(d, map(waveFreq, 0, 5, 2, 0.5));
    } else {
        let t;
        if      (waveAngleLevel === 0) t = (x + y) / (cs * 2);
        else if (waveAngleLevel === 1) t = x / cs;
        else if (waveAngleLevel === 2) t = y / cs;
        else if (waveAngleLevel === 3) t = dist(x, y, cx, cy) / (cs * 0.7);
        else                           t = max(abs(x - cx), abs(y - cy)) / (cs * 0.5);

        d = waveFreq === 0 ? 1 : (sin(t * TWO_PI * waveFreq + phaseOffset) + 1) / 2;
    }

    return invertDensity ? 1 - d : d;
}

// Word spacing — slow X-axis noise creates "word" clusters within each band.
// Returns 0 (gap) → 1 (dense word). Seeded via wordNoiseOffset.
function getWordWeight(x, y) {
    // Two overlapping noise scales: coarse = word length, fine = glyph-level variation
    let coarse = noise(x * 0.008 + wordNoiseOffset, y * 0.003 + wordNoiseOffset + 50);
    let fine   = noise(x * 0.025 + wordNoiseOffset + 100, y * 0.006 + wordNoiseOffset + 150);
    return coarse * 0.7 + fine * 0.3;
}

// ─── recursive subdivision ────────────────────────────────────────────────────

function subdivideCell(x, y, size, depth, maxDepth, waveFreq, phaseOffset, noiseScale, noiseOffset) {
    let mid     = { x: x + size / 2, y: y + size / 2 };
    let density = getDensityAt(mid.x, mid.y, waveFreq, phaseOffset, noiseScale, noiseOffset);

    let shouldSplit = depth < maxDepth
        && size > cs / 64
        && random() < density * 0.85;

    if (shouldSplit) {
        let h  = size / 2;
        let w  = size * 0.08 * noise(x * 0.01, y * 0.01, depth * 0.5);
        let sx = constrain(h + w * (random() > 0.5 ? 1 : -1), h * 0.65, h * 1.35);
        let sy = constrain(h + w * (random() > 0.5 ? 1 : -1), h * 0.65, h * 1.35);

        subdivideCell(x,      y,      sx,        depth+1, maxDepth, waveFreq, phaseOffset, noiseScale, noiseOffset);
        subdivideCell(x + sx, y,      size - sx, depth+1, maxDepth, waveFreq, phaseOffset, noiseScale, noiseOffset);
        subdivideCell(x,      y + sy, sx,        depth+1, maxDepth, waveFreq, phaseOffset, noiseScale, noiseOffset);
        subdivideCell(x + sx, y + sy, size - sx, depth+1, maxDepth, waveFreq, phaseOffset, noiseScale, noiseOffset);
    } else {
        cells.push({
            x, y, size, depth, density,
            distFromCenter: dist(mid.x, mid.y, growthCenter.x, growthCenter.y)
        });
    }
}

// ─── wobble ───────────────────────────────────────────────────────────────────

function wobble(x, y, seed) {
    if (!wobbleMode) return { x, y };
    return {
        x: x + (noise(x * 0.01, y * 0.01, seed) - 0.5) * 8,
        y: y + (noise(x * 0.01 + 100, y * 0.01 + 100, seed) - 0.5) * 8
    };
}

// ─── glyph vocabulary ─────────────────────────────────────────────────────────

function generateGlyphs(cell) {
    let s  = cell.size;
    let xo = cell.x;
    let yo = cell.y;
    let m  = s * 0.12;
    let cx = xo + s / 2;
    let cy = yo + s / 2;

    let angle = atan2(growthCenter.y - cy, growthCenter.x - cx);
    let tb    = constrain(s * 0.1 * sin(angle + noise(cx*0.005, cy*0.005) * 0.4 - 0.2), -s*0.2, s*0.2);

    let sizeRatio  = s / (cs / 16);
    let maxStrokes = max(1, floor(densityOptions[densityLevel].maxLines / max(1, sizeRatio)));
    // Word weight modulates stroke count: "word-centre" cells get more strokes
    let n = max(1, floor(random(1, maxStrokes + 1) * cell.density * cell.wordWeight));

    let out = [];

    if (useBezier) {
        let baseType = floor(noise(cx * 0.006, cy * 0.006) * 8);

        for (let a = 0; a < n; a++) {
            let gt = (baseType + a) % 8;
            let w  = random(0.35, 1.7);
            let x1, y1, cx1, cy1, cx2, cy2, x2, y2;

            if (gt === 0) {
                x1  = xo + random(m*1.2, s-m*1.2);
                y1  = yo + m;
                x2  = constrain(x1 + random(-s*0.15, s*0.15) + tb*0.5, xo+m, xo+s-m);
                y2  = yo + s - m;
                cx1 = constrain(x1 + tb*0.3 + random(-s*0.15, s*0.15), xo+m*0.5, xo+s-m*0.5);
                cy1 = yo + s*0.30;
                cx2 = constrain(x2 - tb*0.3 + random(-s*0.15, s*0.15), xo+m*0.5, xo+s-m*0.5);
                cy2 = yo + s*0.70;
            } else if (gt === 1) {
                x1  = xo + random(m, s-m);
                y1  = yo + m;
                x2  = xo + s * (x1 < cx ? 0.78 : 0.22);
                y2  = yo + s - m*0.6;
                cx1 = constrain(x1 + tb*0.2, xo+m, xo+s-m);
                cy1 = yo + s*0.35;
                cx2 = constrain(x2 + (x1 < cx ? s*0.18 : -s*0.18), xo+m, xo+s-m);
                cy2 = yo + s*0.65;
            } else if (gt === 2) {
                x1  = xo + random(m, s*0.45);
                y1  = yo + s*0.55 + random(0, s*0.18);
                x2  = xo + random(s*0.55, s-m);
                y2  = y1 + random(-s*0.08, s*0.08);
                cx1 = constrain(x1 + (x2-x1)*0.25 + tb*0.2, xo+m, xo+s-m);
                cy1 = yo + m*0.8;
                cx2 = constrain(x2 - (x2-x1)*0.25 - tb*0.2, xo+m, xo+s-m);
                cy2 = yo + m*0.8;
            } else if (gt === 3) {
                x1  = xo + random(m, s-m);
                y1  = yo + m;
                x2  = xo + random(m, s-m);
                y2  = yo + s - m;
                cx1 = constrain(xo + s*0.82 + tb*0.25, xo+m, xo+s-m);
                cy1 = yo + s*0.22;
                cx2 = constrain(xo + s*0.18 - tb*0.25, xo+m, xo+s-m);
                cy2 = yo + s*0.78;
            } else if (gt === 4) {
                let rr = cos(angle) > 0;
                x1  = xo + (rr ? m*1.5 : s-m*1.5);
                y1  = yo + s*0.22;
                x2  = x1;
                y2  = yo + s*0.78;
                let ax = rr ? xo+s*0.88 : xo+s*0.12;
                cx1 = ax;  cy1 = yo + m*0.9;
                cx2 = ax;  cy2 = yo + s - m*0.9;
            } else if (gt === 5) {
                let rr = cos(angle) <= 0;
                x1  = xo + (rr ? m*1.5 : s-m*1.5);
                y1  = yo + s*0.22;
                x2  = x1;
                y2  = yo + s*0.78;
                let ax = rr ? xo+s*0.88 : xo+s*0.12;
                cx1 = ax;  cy1 = yo + m*0.9;
                cx2 = ax;  cy2 = yo + s - m*0.9;
            } else if (gt === 6) {
                x1  = xo + s*0.5;
                y1  = yo + m;
                x2  = x1 + random(-s*0.06, s*0.06);
                y2  = yo + m + random(s*0.02, s*0.1);
                cx1 = constrain(xo + s*0.88 + tb*0.15, xo+m, xo+s-m);
                cy1 = yo + s*0.22;
                cx2 = constrain(xo + s*0.12 - tb*0.15, xo+m, xo+s-m);
                cy2 = yo + s*0.72;
            } else {
                x1  = xo + m;
                y1  = yo + m;
                x2  = xo + s - m;
                y2  = yo + s - m;
                cx1 = constrain(xo + s*0.65 + tb*0.25, xo+m, xo+s-m);
                cy1 = yo + s*0.10;
                cx2 = constrain(xo + s*0.10 - tb*0.25, xo+m, xo+s-m);
                cy2 = yo + s*0.78;
            }

            out.push({ isBezier: true, x1, y1, cx1, cy1, cx2, cy2, x2, y2, depth: cell.depth, density: cell.density, w });
        }

    } else {
        // Schotter-style: disorder increases as wordWeight decreases.
        // Word-centre cells → vertical parallel marks. Word-edge cells → scattered, rotated.
        let disorder  = 1.0 - cell.wordWeight;
        let maxAngle  = HALF_PI * 0.65;  // up to ~58° at full disorder
        // Organic lean from growth centre, scaled down in disordered zones
        let leanBase  = s * 0.12 * sin(angle + noise(cx*0.005, cy*0.005) * 0.4 - 0.2) * cell.wordWeight;

        for (let a = 0; a < n; a++) {
            let randAngle = random(-maxAngle, maxAngle) * disorder;

            // Line length: ordered = tall, disordered = variable/shorter
            let heightFrac = 0.5 + cell.wordWeight * 0.45 + random(-0.12, 0.12) * disorder;
            let lineLen    = s * constrain(heightFrac, 0.2, 0.95);

            // Midpoint: neatly spaced when ordered, scattered when disordered
            let spread = m * 1.2 + (s - m * 2.4) * (disorder * random() + (1 - disorder) * (a / max(1, n - 1)));
            let midX   = xo + spread + leanBase * noise(a * 0.3, cx * 0.01);
            let midY   = yo + s * 0.5 + random(-s * 0.06, s * 0.06) * disorder;

            // Rotate about midpoint
            let x1 = midX + sin(randAngle) * lineLen * 0.5;
            let y1 = midY - cos(randAngle) * lineLen * 0.5;
            let x2 = midX - sin(randAngle) * lineLen * 0.5;
            let y2 = midY + cos(randAngle) * lineLen * 0.5;

            let w = random(0.35, 1.5);

            if (a % 2 === 0) {
                out.push({ isBezier: false, x1, y1, x2, y2, depth: cell.depth, density: cell.density, w });
            } else {
                out.push({ isBezier: false, x1: x2, y1: y2, x2: x1, y2: y1, depth: cell.depth, density: cell.density, w });
            }
        }
    }

    if (crosshatchEnabled && cell.depth >= 3) {
        let crossLines = max(1, floor(n * 0.5));
        for (let a = 0; a < crossLines; a++) {
            let y1 = yo + random(m, s - m);
            let y2 = yo + random(m, s - m);
            let x1 = xo + m;
            let x2 = xo + s - m;
            let w  = random(0.3, 1.4);
            if (a % 2 === 0) {
                out.push({ isBezier: false, x1, y1, x2, y2, depth: cell.depth, density: cell.density, w });
            } else {
                out.push({ isBezier: false, x1: x2, y1: y2, x2: x1, y2: y1, depth: cell.depth, density: cell.density, w });
            }
        }
    }

    return out;
}

// ─── highways ─────────────────────────────────────────────────────────────────
// Cross-strata marks that span multiple cells — the rule from Highways and Byways.
// Each highway picks an x-position, finds all density-passing cells that contain it,
// groups them into contiguous vertical chains, and draws one line per chain spanning
// the full height. Structural marks that cross subdivision boundaries.

function generateHighways(allCells) {
    if (hideHighways) return [];
    let highways = [];
    let numHighways = floor(random(4, 9));

    for (let h = 0; h < numHighways; h++) {
        let hx = random(cs * 0.04, cs * 0.96);

        // Cells containing this x-position, in density-bearing zones only
        let column = allCells.filter(cell => {
            let tol = cell.size * 0.15;
            return hx >= cell.x - tol
                && hx <= cell.x + cell.size + tol
                && cell.density >= 0.20;
        });

        if (column.length < 2) continue;
        column.sort((a, b) => a.y - b.y);

        // Group into contiguous vertical chains (gap tolerance: 4% of canvas)
        let groups = [];
        let cur    = [column[0]];
        for (let i = 1; i < column.length; i++) {
            let gap = column[i].y - (column[i-1].y + column[i-1].size);
            if (gap < cs * 0.04) {
                cur.push(column[i]);
            } else {
                if (cur.length >= 2) groups.push([...cur]);
                cur = [column[i]];
            }
        }
        if (cur.length >= 2) groups.push(cur);

        for (let group of groups) {
            let y1 = group[0].y;
            let y2 = group[group.length - 1].y + group[group.length - 1].size;
            let midY = (y1 + y2) / 2;

            // Organic lean from growth centre over the full span (Lifeform DNA)
            let angle = atan2(growthCenter.y - midY, growthCenter.x - hx);
            let span  = y2 - y1;
            let lean  = span * 0.055 * sin(angle + noise(hx * 0.005, midY * 0.005) * 0.4);

            // Tiny position jitter so no two runs are identical
            let jit   = span * 0.008;
            let x1    = hx + lean * 0.5 + random(-jit, jit);
            let x2    = hx - lean * 0.5 + random(-jit, jit);

            let avgDensity = group.reduce((s, c) => s + c.density, 0) / group.length;

            highways.push({
                isBezier:  false,
                isHighway: true,
                x1, y1, x2, y2,
                depth:   6,        // fine-line weight — same as deep field marks
                density: avgDensity,
                w:       random(0.7, 1.0)
            });
        }
    }

    return highways;
}

// ─── main ─────────────────────────────────────────────────────────────────────

function initDrawing() {
    background(sepiaMode ? '#f0dfc0' : '#faebd7');
    segments       = [];
    cells          = [];
    currentSegment = 0;

    // Outer margin + inset border — characteristic of Nake's plotter registration frame
    let pad   = Math.round(cs * 0.04);
    let inner = cs - pad * 2;
    stroke(sepiaMode ? '#5c4033' : 0);
    strokeWeight(0.7);
    noFill();
    rect(pad, pad, inner, inner);

    // Signature drawn at animation end so JetBrains Mono has time to load

    growthCenter = {
        x: cs / 2 + random(-cs * 0.1, cs * 0.1),
        y: cs / 2 + random(-cs * 0.1, cs * 0.1)
    };

    let density     = densityOptions[densityLevel];
    let wave        = waveOptions[waveLevel];
    let maxDepth    = depthOptions[maxDepthLevel];
    let waveFreq    = random(wave.freqMin, wave.freqMax);
    let phaseOffset = random(TWO_PI);
    let noiseScale  = random(3, 8);
    let noiseOffset = random(1000);

    // Word noise offset: seeded, independent of subdivision noise
    wordNoiseOffset = random(500);

    // Subdivision offset to keep all marks inside the border
    let baseSize = inner / 4;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            subdivideCell(pad + col*baseSize, pad + row*baseSize, baseSize, 0, maxDepth,
                waveFreq, phaseOffset, noiseScale, noiseOffset);
        }
    }

    if (growthMode === 0) {
        let rowH = cs / 36;
        cells.sort((a, b) => {
            let rA = floor((a.y + a.size*0.5) / rowH);
            let rB = floor((b.y + b.size*0.5) / rowH);
            if (rA !== rB) return rA - rB;
            return (a.x + a.size*0.5) - (b.x + b.size*0.5);
        });
    } else if (growthMode === 1) {
        cells.sort((a, b) => a.distFromCenter - b.distFromCenter);
    } else {
        cells.sort((a, b) => {
            let angleA = atan2(a.y + a.size/2 - growthCenter.y, a.x + a.size/2 - growthCenter.x);
            let angleB = atan2(b.y + b.size/2 - growthCenter.y, b.x + b.size/2 - growthCenter.x);
            let bandSize = cs * 0.08;
            let bandA = floor(a.distFromCenter / bandSize);
            let bandB = floor(b.distFromCenter / bandSize);
            if (bandA !== bandB) return bandA - bandB;
            return bandA % 2 === 0 ? angleA - angleB : angleB - angleA;
        });
    }

    for (let cell of cells) {
        if (random() < density.skipChance) continue;

        // Band density gate: large cells in sparse zones are suppressed
        let sizeRatio = cell.size / (cs / 16);
        let bandThreshold = 0.35 * max(1, sizeRatio * 0.55);
        if (cell.density < bandThreshold) continue;

        // Word weight: secondary noise field along X creates word/space rhythm
        let midX = cell.x + cell.size / 2;
        let midY = cell.y + cell.size / 2;
        let ww   = getWordWeight(midX, midY);

        // Word gap: only skip truly silent zones; let the disorder transition be visible
        if (ww < 0.12) continue;

        cell.wordWeight = ww;
        segments.push(...generateGlyphs(cell));
    }

    // Highways prepended — drawn first so field marks layer on top
    let highwaySegs = generateHighways(cells);
    segments = [...highwaySegs, ...segments];

    loop();
}

// ─── draw ─────────────────────────────────────────────────────────────────────

function draw() {
    let perFrame = 20;

    for (let i = 0; i < perFrame && currentSegment < segments.length; i++) {
        let nextSeg = currentSegment < segments.length - 1 ? segments[currentSegment + 1] : null;
        drawSegment(segments[currentSegment], currentSegment, nextSeg);
        currentSegment++;
    }

    if (currentSegment >= segments.length) {
        noLoop();
        drawSignature();
        triggerPreview();
    }
}

function drawSignature() {
    let pad     = Math.round(cs * 0.04);
    let inner   = cs - pad * 2;
    let now     = new Date();
    let dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    let timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    let label   = `Field Script · seed ${m0} ${m1} ${m2} ${m3} ${m4}  ${dateStr} ${timeStr}`;
    let sigSize = max(8, Math.round(cs * 0.013));

    fill(sepiaMode ? '#5c4033' : 0);
    noStroke();
    textFont('JetBrains Mono, monospace');
    textSize(sigSize);
    textAlign(LEFT, TOP);
    text(label, pad, pad + inner + Math.round(sigSize * 0.55));
}

function drawSegment(seg, idx, nextSeg) {
    let baseWeight = cs / 400;
    let sw = baseWeight * map(seg.depth, 0, 8, 1.5, 0.3) * (seg.w || 1);
    strokeWeight(max(0.3, sw));
    noFill();

    if (sepiaMode) {
        colorMode(HSB, 360, 100, 100, 255);
        stroke(25 + noise(idx*0.10)*15, 40 + noise(idx*0.05)*20, 25 + noise(idx*0.08)*15);
    } else {
        colorMode(RGB, 255);
        stroke(0);
    }

    let p2;
    if (seg.isBezier) {
        let p1  = wobble(seg.x1,  seg.y1,  idx*0.10);
        let cp1 = wobble(seg.cx1, seg.cy1, idx*0.10 + 15);
        let cp2 = wobble(seg.cx2, seg.cy2, idx*0.10 + 30);
        p2  = wobble(seg.x2,  seg.y2,  idx*0.10 + 50);
        bezier(p1.x, p1.y, cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
    } else {
        let p1 = wobble(seg.x1, seg.y1, idx*0.10);
        p2 = wobble(seg.x2, seg.y2, idx*0.10 + 50);
        line(p1.x, p1.y, p2.x, p2.y);
    }

    // Thread connection to next segment — not on highways (structural marks, not trace)
    if (nextSeg && !hideThreads && !seg.isHighway) {
        let avgDensity = (seg.density + nextSeg.density) / 2;
        if (!skipSparseConnections || avgDensity > 0.5) {
            strokeWeight(0.8);
            if (coloredThread) {
                stroke('#843c41');
            } else {
                if (sepiaMode) {
                    stroke(30, 30, 40);
                } else {
                    stroke(0, 100);
                }
            }
            let p3 = wobble(nextSeg.x1, nextSeg.y1, idx*0.1 + 100);
            line(p2.x, p2.y, p3.x, p3.y);
        }
    }

    if (sepiaMode) colorMode(RGB, 255);
}

// ─── export ───────────────────────────────────────────────────────────────────

function randomizeAll() {
    // Use Math.random() so parameter choices don't consume the seeded PRNG
    densityLevel   = Math.floor(Math.random() * 3);
    maxDepthLevel  = Math.floor(Math.random() * 7) + 1; // indices 1–7 → depths 2–10
    waveLevel      = Math.floor(Math.random() * 4);
    waveAngleLevel = Math.floor(Math.random() * 6);
    invertDensity  = Math.random() > 0.6;
    wobbleMode     = Math.random() > 0.6;
    sepiaMode      = Math.random() > 0.6;
    growthMode     = Math.floor(Math.random() * 3);
    crosshatchEnabled     = Math.random() > 0.7;
    useBezier             = Math.random() > 0.5;
    skipSparseConnections = Math.random() > 0.3;
    coloredThread         = Math.random() > 0.7;
    hideThreads           = Math.random() > 0.7;
    hideHighways          = Math.random() > 0.8;

    setCtrl('densityVal',    densityOptions[densityLevel].name);
    setCtrl('depthVal',      depthOptions[maxDepthLevel]);
    setCtrl('waveVal',       waveOptions[waveLevel].name);
    setCtrl('waveAngleVal',  waveAngleOptions[waveAngleLevel]);
    setCtrl('growthVal',     growthOptions[growthMode]);
    setCtrl('strokeTypeVal', useBezier ? 'Bezier' : 'Lines');
    setToggle('invertBtn',      'invertVal',      invertDensity,         'on',     'off');
    setToggle('wobbleBtn',      'wobbleVal',      wobbleMode,            'on',     'off');
    setToggle('sepiaBtn',       'sepiaVal',       sepiaMode,             'on',     'off');
    setToggle('crosshatchBtn',  'crosshatchVal',  crosshatchEnabled,     'on',     'off');
    setToggle('skipSparseBtn',  'skipSparseVal',  skipSparseConnections, 'on',     'off');
    setToggle('threadColorBtn', 'threadColorVal', coloredThread,         'Red',    'Black');
    setToggle('hideThreadsBtn', 'hideThreadsVal', hideThreads,           'hidden', 'visible');
    setToggle('hideHighwaysBtn','hideHighwaysVal',hideHighways,           'hidden', 'visible');

    setSeeds();
    initDrawing();
}

function exportSVG() {
    let bg           = sepiaMode ? '#f0dfc0' : '#faebd7';
    let mainColor    = sepiaMode ? '#5c4033' : '#000000';
    let threadColor  = coloredThread ? '#843c41' : (sepiaMode ? '#8b7355' : '#000000');
    let threadOpacity = coloredThread ? '1' : (sepiaMode ? '0.6' : '0.4');
    let strokeWidth  = 0.5;

    let mainPaths    = [];
    let highwayPaths = [];
    let threadPaths  = [];
    let currentMainPath = '';

    for (let i = 0; i < segments.length; i++) {
        let seg     = segments[i];
        let nextSeg = i < segments.length - 1 ? segments[i + 1] : null;

        // Highways go to their own layer
        if (seg.isHighway) {
            let p1 = wobble(seg.x1, seg.y1, i*0.10);
            let p2 = wobble(seg.x2, seg.y2, i*0.10 + 50);
            highwayPaths.push(`M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
            continue;
        }

        let p1, p2;
        if (seg.isBezier) {
            p1 = wobble(seg.x1, seg.y1, i*0.10);
            p2 = wobble(seg.x2, seg.y2, i*0.10 + 50);
            let cp1 = wobble(seg.cx1, seg.cy1, i*0.10 + 15);
            let cp2 = wobble(seg.cx2, seg.cy2, i*0.10 + 30);
            if (currentMainPath === '') currentMainPath = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
            currentMainPath += `C ${cp1.x.toFixed(2)} ${cp1.y.toFixed(2)} ${cp2.x.toFixed(2)} ${cp2.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
        } else {
            p1 = wobble(seg.x1, seg.y1, i*0.10);
            p2 = wobble(seg.x2, seg.y2, i*0.10 + 50);
            if (currentMainPath === '') currentMainPath = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
            currentMainPath += `L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
        }

        if (nextSeg) {
            let avgDensity = (seg.density + nextSeg.density) / 2;
            if (skipSparseConnections && avgDensity <= 0.5) {
                mainPaths.push(currentMainPath.trim());
                currentMainPath = '';
            } else {
                let pThread = wobble(nextSeg.x1, nextSeg.y1, i*0.1 + 100);
                threadPaths.push(`M ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${pThread.x.toFixed(2)} ${pThread.y.toFixed(2)}`);
                let pNext = wobble(nextSeg.x1, nextSeg.y1, (i+1)*0.1);
                currentMainPath += `M ${pNext.x.toFixed(2)} ${pNext.y.toFixed(2)} `;
            }
        }
    }
    if (currentMainPath !== '') mainPaths.push(currentMainPath.trim());

    let pad   = Math.round(cs * 0.04);
    let inner = cs - pad * 2;

    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
     width="${cs}" height="${cs}" viewBox="0 0 ${cs} ${cs}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <g inkscape:groupmode="layer" inkscape:label="Border" fill="none" stroke="${mainColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
    <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}"/>
  </g>
  <g inkscape:groupmode="layer" inkscape:label="Signature">
    <text x="${pad}" y="${pad + inner + Math.round(cs * 0.013 * 1.6)}"
          font-family="Courier New, Courier, monospace" font-size="${Math.round(cs * 0.013)}"
          fill="${mainColor}">${(() => { let n=new Date(); return `Field Script · seed ${m0} ${m1} ${m2} ${m3} ${m4}  ${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')} ${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`; })()}</text>
  </g>
  <g inkscape:groupmode="layer" inkscape:label="Highways"
     fill="none" stroke="${mainColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
`;
    for (let p of highwayPaths) svg += `    <path d="${p}"/>\n`;
    svg += `  </g>\n`;
    svg += `  <g inkscape:groupmode="layer" inkscape:label="Segments"
     fill="none" stroke="${mainColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
`;
    for (let p of mainPaths) svg += `    <path d="${p}"/>\n`;
    svg += `  </g>\n`;
    svg += `  <g inkscape:groupmode="layer" inkscape:label="Threads"
     fill="none" stroke="${threadColor}" stroke-width="${strokeWidth * 0.5}" stroke-linecap="round" opacity="${threadOpacity}">\n`;
    for (let p of threadPaths) svg += `    <path d="${p}"/>\n`;
    svg += `  </g>\n</svg>`;

    let blob   = new Blob([svg], { type: 'image/svg+xml' });
    let url    = URL.createObjectURL(blob);
    let a      = document.createElement('a');
    a.href     = url;
    a.download = `asemic_d${depthOptions[maxDepthLevel]}_${densityOptions[densityLevel].name.toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportPNG() {
    save(`asemic_d${depthOptions[maxDepthLevel]}_${densityOptions[densityLevel].name.toLowerCase()}.png`);
}

// Repaint existing segments with current colour mode — no regeneration, no new seed.
// Used by style-only toggles (sepia) so marks stay identical.
function repaint() {
    noLoop();
    background(sepiaMode ? '#f0dfc0' : '#faebd7');
    let pad   = Math.round(cs * 0.04);
    let inner = cs - pad * 2;
    stroke(sepiaMode ? '#5c4033' : 0);
    strokeWeight(0.7);
    noFill();
    rect(pad, pad, inner, inner);
    for (let i = 0; i < segments.length; i++) {
        let nextSeg = i < segments.length - 1 ? segments[i + 1] : null;
        drawSegment(segments[i], i, nextSeg);
    }
    drawSignature();
}

function refresh() {
    setSeeds();
    initDrawing();
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= cs && mouseY >= 0 && mouseY <= cs) {
        setSeeds();
        initDrawing();
    }
}

function windowResized() {
    let sidebarW = 212;
    let pad      = 48;
    cs = Math.min(windowWidth - sidebarW - pad, windowHeight - pad);
    resizeCanvas(cs, cs);
    setSeeds();
    initDrawing();
}

function keyTyped() {
    if (key === 's' || key === 'S') exportSVG();
    if (key === 'p' || key === 'P') exportPNG();
}
