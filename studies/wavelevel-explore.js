// ============================================================================
// Field Script — waveLevel Mining  (branch: wavelevel-preview)
// ----------------------------------------------------------------------------
// EXPERIMENT extension. 24 fresh seeds generated at the under-explored dense end
// of the waveLevel axis — waveLevel 0 (None) and 1 (Sparse) — across the geometric
// waves (chaotic ignores waveLevel). Guarded (inv+skip+shallow → skip off) and
// interior-ink ≥0.5% checked. This mines the "packed manuscript" territory that
// the 117-keeper grammar never sampled (every keeper is waveLevel=2).
//
// Run:  eval(await fetch('/wavelevel-explore.js').then(r=>r.text()))
//
// Touches nothing in the canonical model — only sets globals per render on the
// live sketch. Records carry `wl` (the waveLevel they were generated/rendered at).
// ============================================================================

(function () {
  const SEEDS = [{"wl":0,"wA":0,"dL":1,"mD":2,"gM":1,"depth":4,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.358 0.261 0.849 0.835 0.868"},{"wl":0,"wA":2,"dL":2,"mD":7,"gM":0,"depth":14,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.639 0.735 0.797 0.073 0.944"},{"wl":0,"wA":3,"dL":2,"mD":1,"gM":2,"depth":2,"inv":false,"wob":false,"xh":true,"bez":false,"skip":false,"ct":true,"ht":false,"hh":true,"seeds":"0.516 0.513 0.953 0.350 0.150"},{"wl":0,"wA":4,"dL":1,"mD":7,"gM":0,"depth":14,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.641 0.136 0.638 0.958 0.755"},{"wl":0,"wA":2,"dL":1,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":false,"bez":true,"skip":false,"ct":true,"ht":true,"hh":false,"seeds":"0.613 0.642 0.777 0.319 0.327"},{"wl":0,"wA":3,"dL":2,"mD":6,"gM":2,"depth":12,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.294 0.426 0.056 0.272 0.776"},{"wl":0,"wA":1,"dL":1,"mD":6,"gM":2,"depth":12,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":true,"seeds":"0.804 0.364 0.836 0.402 0.513"},{"wl":0,"wA":4,"dL":0,"mD":2,"gM":1,"depth":4,"inv":false,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.259 0.217 0.843 0.314 0.540"},{"wl":0,"wA":4,"dL":0,"mD":2,"gM":0,"depth":4,"inv":false,"wob":true,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":true,"seeds":"0.611 0.565 0.994 0.964 0.552"},{"wl":0,"wA":1,"dL":1,"mD":5,"gM":1,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":true,"seeds":"0.205 0.454 0.915 0.501 0.504"},{"wl":0,"wA":1,"dL":0,"mD":6,"gM":0,"depth":12,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.818 0.523 0.851 0.691 0.555"},{"wl":0,"wA":4,"dL":2,"mD":1,"gM":0,"depth":2,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.658 0.090 0.015 0.130 0.620"},{"wl":1,"wA":1,"dL":2,"mD":6,"gM":0,"depth":12,"inv":true,"wob":false,"xh":false,"bez":false,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.635 0.348 0.688 0.428 0.900"},{"wl":1,"wA":4,"dL":2,"mD":1,"gM":0,"depth":2,"inv":false,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.307 0.332 0.166 0.065 0.316"},{"wl":1,"wA":2,"dL":1,"mD":2,"gM":1,"depth":4,"inv":true,"wob":true,"xh":false,"bez":true,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.072 0.253 0.479 0.083 0.918"},{"wl":1,"wA":0,"dL":2,"mD":1,"gM":1,"depth":2,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.582 0.543 0.897 0.799 0.941"},{"wl":1,"wA":4,"dL":1,"mD":5,"gM":2,"depth":10,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.386 0.179 0.058 0.114 0.188"},{"wl":1,"wA":2,"dL":0,"mD":1,"gM":0,"depth":2,"inv":true,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.765 0.845 0.307 0.098 0.031"},{"wl":1,"wA":4,"dL":0,"mD":4,"gM":0,"depth":8,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.313 0.706 0.010 0.439 0.552"},{"wl":1,"wA":3,"dL":2,"mD":3,"gM":0,"depth":6,"inv":true,"wob":true,"xh":false,"bez":false,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.823 0.862 0.956 0.193 0.730"},{"wl":1,"wA":3,"dL":1,"mD":4,"gM":2,"depth":8,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.167 0.926 0.919 0.975 0.560"},{"wl":1,"wA":4,"dL":2,"mD":6,"gM":0,"depth":12,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.945 0.576 0.590 0.388 0.055"},{"wl":1,"wA":4,"dL":1,"mD":6,"gM":0,"depth":12,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.795 0.959 0.415 0.484 0.514"},{"wl":1,"wA":4,"dL":1,"mD":6,"gM":2,"depth":12,"inv":false,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.167 0.383 0.969 0.186 0.517"}];

  function render(s) {
    waveLevel = s.wl; waveAngleLevel = s.wA; densityLevel = s.dL; maxDepthLevel = s.mD; growthMode = s.gM;
    invertDensity = s.inv; wobbleMode = s.wob; crosshatchEnabled = s.xh; useBezier = s.bez;
    skipSparseConnections = s.skip; coloredThread = s.ct; hideThreads = s.ht; hideHighways = s.hh; sepiaMode = true;
    const sd = s.seeds.split(' '); m0 = sd[0]; m1 = sd[1]; m2 = sd[2]; m3 = sd[3]; m4 = sd[4];
    setPaperColor(); setSeeds(); initDrawing();
    while (currentSegment < segments.length) { drawSegment(segments[currentSegment], currentSegment); currentSegment++; }
    noLoop(); drawThreadsToOverlay(); drawSignature();
    const src = document.querySelector('canvas'), W = src.width, H = src.height;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f0dfc0'; ctx.fillRect(0, 0, W, H); ctx.drawImage(src, 0, 0, W, H);
    if (typeof threadCanvas !== 'undefined' && threadCanvas) ctx.drawImage(threadCanvas, 0, 0, W, H);
    return c.toDataURL('image/jpeg', 0.85);
  }

  function build() {
    SEEDS.forEach(s => { if (!s._hi) s._hi = render(s); });
    const waveShort = ['Diag', 'Horiz', 'Vert', 'Radial', 'Square', 'Chaotic'];
    ['__viewer', '__matrix_overlay', '__cviewer', '__wlpreview', '__wlexplore'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); });
    const wrap = document.createElement('div'); wrap.id = '__wlexplore';
    wrap.style.cssText = 'position:fixed;inset:0;background:#e8dcc8;z-index:99999;overflow:auto;padding:24px;box-sizing:border-box;font-family:Georgia,serif;color:#3a2a1a;';
    let html = `<div style="font-size:16px;font-weight:bold;color:#5a3c20;">Field Script — waveLevel Mining <span style="font-size:11px;color:#9a6840;font-family:monospace;">(branch: wavelevel-preview · 24 new seeds at wl 0/1 · model unchanged)</span></div>
      <div style="font-size:11px;color:#8a7558;margin:4px 0 14px;font-family:monospace;">Fresh seeds at the under-explored dense end. Geometric waves only. Guarded + ink-checked. Threads on.</div>`;
    [[0, 'waveLevel 0 — None  ·  dense / packed manuscript territory'], [1, 'waveLevel 1 — Sparse  ·  looser structured']].forEach(([wl, title]) => {
      const items = SEEDS.filter(s => s.wl === wl);
      html += `<div style="font-size:13px;font-weight:bold;color:#6a4a2a;text-transform:uppercase;letter-spacing:0.05em;margin:16px 0 8px;border-bottom:1px solid #c4a882;padding-bottom:4px;">${title} · ${items.length}</div>`;
      html += `<div style="display:flex;flex-wrap:wrap;gap:8px;">`;
      items.forEach((s, i) => {
        html += `<div style="width:158px;background:#fdf7ed;border:1px solid #d8c8a8;border-radius:3px;padding:5px;"><img src="${s._hi}" style="width:100%;aspect-ratio:1;object-fit:cover;border:1px solid #ddd;display:block;"/><div style="font-size:8px;color:#8a7a6a;margin-top:3px;font-family:monospace;line-height:1.4;">${waveShort[s.wA]}·${['L','M','D'][s.dL]}·d${s.depth}·${['Se','Ra','Sp'][s.gM]}${s.inv?'·inv':''}</div></div>`;
      });
      html += `</div>`;
    });
    wrap.innerHTML = html;
    document.body.appendChild(wrap);
  }

  window.WaveLevelExplore = { SEEDS, render, build };
  if (typeof initDrawing === 'function') build();
  else console.warn('[WaveLevelExplore] sketch not ready — call WaveLevelExplore.build() once loaded.');
})();
