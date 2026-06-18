// ============================================================================
// Field Script — waveLevel Axis Preview  (branch: wavelevel-preview)
// ----------------------------------------------------------------------------
// EXPERIMENT, not part of the canonical model. Renders 6 representative keepers
// at all four waveLevel values (None/Sparse/Medium/Busy) side by side to show
// how the wave-frequency axis reshapes each composition. Touches nothing else:
// it only sets `waveLevel` per render on the live sketch (the canonical grammar
// renders are all waveLevel=2).
//
// Run in the running sketch page:
//   eval(await fetch('/wavelevel-preview.js').then(r=>r.text()))
//
// Finding (2026-06-11): waveLevel behaves like an openness/density dial for the
// GEOMETRIC waves (Diagonal/Vertical/Horizontal/Square/Radial) — None(0) packs
// the field densely, Busy(3) opens it out to sparse/gestural. CHAOTIC (Turbulent
// Field) is noise-driven and barely responds. The `None` column in particular
// opens a "dense packed manuscript" territory the 117-keeper grammar never sampled
// (every keeper is Medium).
// ============================================================================

(function () {
  const PICKS = [{"pass":15,"n":26,"label":"Diagonal Manuscript","wA":0,"dL":2,"mD":5,"gM":0,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.036 0.997 0.597 0.301 0.389"},{"pass":16,"n":22,"label":"Vertical Column","wA":2,"dL":2,"mD":1,"gM":0,"depth":2,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.630 0.999 0.272 0.466 0.912"},{"pass":15,"n":41,"label":"Horizontal Band","wA":1,"dL":2,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":true,"seeds":"0.648 0.694 0.742 0.800 0.066"},{"pass":15,"n":10,"label":"Monumental","wA":4,"dL":2,"mD":3,"gM":2,"depth":6,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.614 0.919 0.441 0.076 0.030"},{"pass":15,"n":22,"label":"Orbital Script","wA":3,"dL":1,"mD":3,"gM":0,"depth":6,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.296 0.428 0.340 0.750 0.875"},{"pass":15,"n":27,"label":"Turbulent Field","wA":5,"dL":1,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":false,"bez":false,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.887 0.286 0.798 0.018 0.959"}];

  // render one record at a given waveLevel (threads composited via bare threadCanvas)
  function render(s, wl) {
    waveLevel = wl; waveAngleLevel = s.wA; densityLevel = s.dL; maxDepthLevel = s.mD; growthMode = s.gM;
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
    PICKS.forEach(p => { p.imgs = [0, 1, 2, 3].map(wl => render(p, wl)); });
    ['__viewer', '__matrix_overlay', '__cviewer', '__wlpreview'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); });
    if (window.__viewerKey) document.removeEventListener('keydown', window.__viewerKey);
    const wrap = document.createElement('div'); wrap.id = '__wlpreview';
    wrap.style.cssText = 'position:fixed;inset:0;background:#e8dcc8;z-index:99999;overflow:auto;padding:24px;box-sizing:border-box;font-family:Georgia,serif;color:#3a2a1a;';
    const wlNames = ['None (0)', 'Sparse (1)', 'Medium (2) · current', 'Busy (3)'];
    let html = `<div style="font-size:16px;font-weight:bold;color:#5a3c20;">Field Script — waveLevel Axis Preview <span style="font-size:11px;color:#9a6840;font-family:monospace;">(branch: wavelevel-preview · model unchanged)</span></div>
      <div style="font-size:11px;color:#8a7558;margin:4px 0 16px;font-family:monospace;">Same seed across each row · only waveLevel changes. None packs dense → Busy opens sparse (geometric waves); Chaotic barely responds. Medium = canonical. Threads on.</div>
      <div style="display:grid;grid-template-columns:160px repeat(4,1fr);gap:8px;align-items:start;">`;
    html += `<div></div>`;
    wlNames.forEach((nm, i) => { html += `<div style="text-align:center;font-size:12px;font-weight:bold;color:${i === 2 ? '#1a7a4a' : '#6a4a2a'};padding-bottom:4px;border-bottom:2px solid ${i === 2 ? '#1a7a4a' : '#c4a882'};">${nm}</div>`; });
    PICKS.forEach(p => {
      html += `<div style="font-size:12px;font-weight:bold;line-height:1.4;padding-top:30px;">${p.label}<div style="font-size:9px;color:#8a7558;font-weight:normal;font-family:monospace;margin-top:2px;">P${p.pass}·${p.n}</div></div>`;
      p.imgs.forEach((src, i) => { html += `<div style="background:#fdf7ed;border:${i === 2 ? '2px solid #1a7a4a' : '1px solid #d8c8a8'};border-radius:3px;padding:4px;"><img src="${src}" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;border:1px solid #ddd;"/></div>`; });
    });
    html += `</div>`;
    wrap.innerHTML = html;
    document.body.appendChild(wrap);
  }

  window.WaveLevelPreview = { PICKS, render, build };
  if (typeof initDrawing === 'function') build();
  else console.warn('[WaveLevelPreview] sketch not ready — call WaveLevelPreview.build() once loaded.');
})();
