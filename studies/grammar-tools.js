// ============================================================================
// Field Script — Grammar Tools (restart artifact, 2026-06-10)
// ----------------------------------------------------------------------------
// Self-contained session restore for the curated grammar (117 keepers).
// History: 109 (Pass 15+16) + 10 (Pass 17) = 119, then −2 on re-curation after the thread layer
// was restored (thread compositing bug fixed 2026-06-11 — see renderOne). Renders include threads.
// Run this file's contents in the running sketch page (via preview_eval, or
// temporarily add <script src="grammar-tools.js"></script> to index.html).
//
// On execution it:
//   1. rebuilds the crisp 940px renders from the 109 curated seeds (waveLevel=2)
//   2. launches the fullsize keep/curate viewer
//
// Depends on the live p5 sketch globals/functions (waveAngleLevel, setSeeds,
// initDrawing, drawSegment, drawThreadsToOverlay, drawSignature, segments,
// currentSegment, depthOptions, threadCanvas, setPaperColor).
//
// Refined taxonomy (12 archetypes): see CLAUDE.md "Refined Grammar — Curated".
//   1 Orbital · 2 VertColumn · 3 DiagManuscript · 5 Monumental · 6 DenseNetwork
//   7 Horizontal · 8 DiagAerial · 9 DoubleRadial · 10 VertRadial · 12 DisplayGlyph
//   14 HorizBand · TF TurbulentField (merged Chaotic) · X Unnamed
// Dropped vs 14-scheme: VertLight; merged: ChaoticSparse+Turbulent -> TurbulentField.
// ============================================================================

(function () {
  const ARCH_NAME = {
    '1': 'Orbital Script', '2': 'Vertical Column', '3': 'Diagonal Manuscript',
    '5': 'Monumental', '6': 'Dense Network', '7': 'Horizontal Register',
    '8': 'Diagonal Aerial', '9': 'Double Radial', '10': 'Vert Radial-Growth',
    '12': 'Display Glyphs', '14': 'Horizontal Band', 'TF': 'Turbulent Field', 'X': 'Unnamed'
  };
  const WAVE = ['Diagonal', 'Horizontal', 'Vertical', 'Radial', 'Square', 'Chaotic'];
  const DENS = ['Light', 'Medium', 'Dense'];
  const GROW = ['Serpentine', 'Radial', 'Spiral'];

  // --- 109 curated keepers (params + seeds + refined archetype) ---
  const KEEPERS = [{"pass":15,"n":10,"wA":4,"dL":2,"mD":3,"gM":2,"depth":6,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.614 0.919 0.441 0.076 0.030","arch":"5"},{"pass":15,"n":24,"wA":4,"dL":0,"mD":2,"gM":0,"depth":4,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.644 0.727 0.399 0.025 0.574","arch":"5"},{"pass":15,"n":43,"wA":4,"dL":1,"mD":5,"gM":2,"depth":10,"inv":true,"wob":true,"xh":false,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.948 0.368 0.676 0.661 0.023","arch":"5"},{"pass":15,"n":57,"wA":4,"dL":0,"mD":1,"gM":2,"depth":2,"inv":true,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.377 0.875 0.614 0.232 0.290","arch":"5"},{"pass":15,"n":69,"wA":4,"dL":1,"mD":2,"gM":1,"depth":4,"inv":false,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.488 0.289 0.113 0.084 0.123","arch":"5"},{"pass":15,"n":80,"wA":4,"dL":1,"mD":1,"gM":2,"depth":2,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.840 0.537 0.446 0.013 0.701","arch":"5"},{"pass":16,"n":1,"wA":4,"dL":0,"mD":6,"gM":1,"depth":12,"inv":true,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.564 0.083 0.469 0.606 0.619","arch":"5"},{"pass":16,"n":4,"wA":4,"dL":0,"mD":5,"gM":2,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.277 0.707 0.547 0.753 0.289","arch":"5"},{"pass":16,"n":21,"wA":4,"dL":0,"mD":7,"gM":1,"depth":14,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.369 0.803 0.574 0.578 0.520","arch":"5"},{"pass":16,"n":23,"wA":4,"dL":0,"mD":7,"gM":2,"depth":14,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.768 0.287 0.176 0.843 0.535","arch":"5"},{"pass":16,"n":36,"wA":4,"dL":0,"mD":7,"gM":0,"depth":14,"inv":true,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.655 0.553 0.474 0.411 0.554","arch":"5"},{"pass":16,"n":58,"wA":4,"dL":2,"mD":4,"gM":2,"depth":8,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.312 0.207 0.394 0.120 0.975","arch":"5"},{"pass":16,"n":62,"wA":4,"dL":0,"mD":5,"gM":2,"depth":10,"inv":true,"wob":true,"xh":false,"bez":true,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.176 0.043 0.455 0.081 0.675","arch":"5"},{"pass":16,"n":71,"wA":4,"dL":1,"mD":1,"gM":0,"depth":2,"inv":true,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.636 0.149 0.170 0.580 0.673","arch":"5"},{"pass":16,"n":75,"wA":4,"dL":1,"mD":4,"gM":2,"depth":8,"inv":false,"wob":true,"xh":true,"bez":false,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.628 0.569 0.049 0.950 0.947","arch":"5"},{"pass":16,"n":84,"wA":4,"dL":0,"mD":2,"gM":1,"depth":4,"inv":false,"wob":true,"xh":false,"bez":false,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.512 0.920 0.057 0.589 0.074","arch":"5"},{"pass":15,"n":6,"wA":2,"dL":0,"mD":6,"gM":0,"depth":12,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.138 0.918 0.075 0.442 0.409","arch":"2"},{"pass":15,"n":9,"wA":2,"dL":0,"mD":3,"gM":1,"depth":6,"inv":true,"wob":false,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.073 0.031 0.097 0.645 0.940","arch":"2"},{"pass":15,"n":28,"wA":2,"dL":1,"mD":4,"gM":0,"depth":8,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.390 0.651 0.509 0.329 0.394","arch":"2"},{"pass":15,"n":53,"wA":2,"dL":2,"mD":3,"gM":2,"depth":6,"inv":true,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.594 0.569 0.279 0.469 0.272","arch":"2"},{"pass":15,"n":54,"wA":2,"dL":2,"mD":1,"gM":0,"depth":2,"inv":true,"wob":false,"xh":false,"bez":false,"skip":false,"ct":true,"ht":true,"hh":false,"seeds":"0.421 0.965 0.397 0.855 0.898","arch":"2"},{"pass":15,"n":70,"wA":2,"dL":1,"mD":1,"gM":2,"depth":2,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.504 0.971 0.753 0.586 0.982","arch":"2"},{"pass":15,"n":74,"wA":2,"dL":0,"mD":7,"gM":0,"depth":14,"inv":true,"wob":false,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.854 0.224 0.342 0.966 0.758","arch":"2"},{"pass":15,"n":82,"wA":2,"dL":0,"mD":4,"gM":1,"depth":8,"inv":true,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.220 0.444 0.441 0.542 0.779","arch":"2"},{"pass":15,"n":92,"wA":2,"dL":2,"mD":6,"gM":0,"depth":12,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.130 0.868 0.745 0.544 0.883","arch":"2"},{"pass":15,"n":93,"wA":2,"dL":1,"mD":1,"gM":1,"depth":2,"inv":true,"wob":false,"xh":false,"bez":false,"skip":false,"ct":true,"ht":true,"hh":false,"seeds":"0.827 0.750 0.955 0.768 0.937","arch":"2"},{"pass":16,"n":6,"wA":2,"dL":1,"mD":4,"gM":1,"depth":8,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.561 0.706 0.180 0.331 0.627","arch":"2"},{"pass":16,"n":10,"wA":2,"dL":2,"mD":1,"gM":2,"depth":2,"inv":false,"wob":false,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.296 0.650 0.444 0.530 0.943","arch":"2"},{"pass":16,"n":19,"wA":2,"dL":1,"mD":3,"gM":2,"depth":6,"inv":true,"wob":true,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.311 0.739 0.656 0.563 0.031","arch":"2"},{"pass":16,"n":22,"wA":2,"dL":2,"mD":1,"gM":0,"depth":2,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.630 0.999 0.272 0.466 0.912","arch":"2"},{"pass":16,"n":51,"wA":2,"dL":1,"mD":6,"gM":0,"depth":12,"inv":false,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.359 0.243 0.582 0.087 0.510","arch":"2"},{"pass":15,"n":20,"wA":0,"dL":1,"mD":5,"gM":2,"depth":10,"inv":true,"wob":true,"xh":true,"bez":false,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.502 0.911 0.586 0.462 0.168","arch":"3"},{"pass":15,"n":26,"wA":0,"dL":2,"mD":5,"gM":0,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.036 0.997 0.597 0.301 0.389","arch":"3"},{"pass":15,"n":39,"wA":0,"dL":2,"mD":4,"gM":0,"depth":8,"inv":true,"wob":true,"xh":true,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.792 0.216 0.867 0.712 0.288","arch":"3"},{"pass":15,"n":50,"wA":0,"dL":1,"mD":2,"gM":1,"depth":4,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.899 0.136 0.560 0.990 0.404","arch":"3"},{"pass":15,"n":73,"wA":0,"dL":2,"mD":5,"gM":0,"depth":10,"inv":true,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.045 0.712 0.432 0.620 0.768","arch":"3"},{"pass":15,"n":75,"wA":0,"dL":1,"mD":7,"gM":0,"depth":14,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.556 0.188 0.333 0.471 0.532","arch":"3"},{"pass":16,"n":12,"wA":0,"dL":2,"mD":3,"gM":2,"depth":6,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.968 1.000 0.753 0.105 0.186","arch":"3"},{"pass":16,"n":13,"wA":0,"dL":2,"mD":5,"gM":1,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.160 0.090 0.433 0.179 0.362","arch":"3"},{"pass":16,"n":28,"wA":0,"dL":2,"mD":4,"gM":1,"depth":8,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.506 0.274 0.199 0.675 0.663","arch":"3"},{"pass":16,"n":34,"wA":0,"dL":2,"mD":3,"gM":1,"depth":6,"inv":false,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.155 0.852 0.019 0.695 0.103","arch":"3"},{"pass":16,"n":82,"wA":0,"dL":2,"mD":7,"gM":2,"depth":14,"inv":true,"wob":false,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.033 0.805 0.215 0.110 0.420","arch":"3"},{"pass":16,"n":94,"wA":0,"dL":1,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.622 0.110 0.344 0.361 0.155","arch":"3"},{"pass":15,"n":23,"wA":5,"dL":1,"mD":2,"gM":1,"depth":4,"inv":true,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.820 0.483 0.940 0.800 0.303","arch":"12"},{"pass":15,"n":25,"wA":5,"dL":2,"mD":7,"gM":2,"depth":14,"inv":true,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.235 0.495 0.086 0.388 0.878","arch":"12"},{"pass":15,"n":31,"wA":5,"dL":2,"mD":5,"gM":1,"depth":10,"inv":true,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.250 0.143 0.719 0.409 0.363","arch":"12"},{"pass":15,"n":38,"wA":1,"dL":2,"mD":2,"gM":1,"depth":4,"inv":true,"wob":false,"xh":true,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.075 0.065 0.496 0.250 0.033","arch":"12"},{"pass":15,"n":60,"wA":5,"dL":2,"mD":5,"gM":0,"depth":10,"inv":true,"wob":false,"xh":true,"bez":true,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.725 0.157 0.555 0.828 0.071","arch":"12"},{"pass":15,"n":72,"wA":3,"dL":2,"mD":4,"gM":0,"depth":8,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.313 0.502 0.258 0.795 0.235","arch":"12"},{"pass":15,"n":78,"wA":5,"dL":1,"mD":3,"gM":0,"depth":6,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.684 0.506 0.119 0.412 0.417","arch":"12"},{"pass":15,"n":94,"wA":1,"dL":2,"mD":3,"gM":0,"depth":6,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.828 0.006 0.810 0.474 0.373","arch":"12"},{"pass":16,"n":0,"wA":4,"dL":2,"mD":1,"gM":1,"depth":2,"inv":true,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.390 0.333 0.842 0.695 0.564","arch":"12"},{"pass":16,"n":38,"wA":1,"dL":2,"mD":4,"gM":0,"depth":8,"inv":true,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":true,"seeds":"0.261 0.464 0.849 0.723 0.684","arch":"12"},{"pass":16,"n":45,"wA":4,"dL":2,"mD":7,"gM":2,"depth":14,"inv":true,"wob":false,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":true,"seeds":"0.205 0.210 0.560 0.881 0.198","arch":"12"},{"pass":16,"n":66,"wA":5,"dL":2,"mD":3,"gM":2,"depth":6,"inv":true,"wob":true,"xh":false,"bez":false,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.730 0.735 0.113 0.804 0.388","arch":"12"},{"pass":15,"n":5,"wA":3,"dL":0,"mD":2,"gM":0,"depth":4,"inv":true,"wob":false,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.140 0.514 0.267 0.063 0.101","arch":"1"},{"pass":15,"n":19,"wA":3,"dL":2,"mD":6,"gM":0,"depth":12,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.204 0.204 0.164 0.526 0.541","arch":"1"},{"pass":15,"n":22,"wA":3,"dL":1,"mD":3,"gM":0,"depth":6,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.296 0.428 0.340 0.750 0.875","arch":"1"},{"pass":15,"n":49,"wA":3,"dL":0,"mD":7,"gM":0,"depth":14,"inv":true,"wob":false,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.268 0.723 0.603 0.591 0.657","arch":"1"},{"pass":15,"n":56,"wA":3,"dL":0,"mD":2,"gM":2,"depth":4,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.978 0.595 0.056 0.642 0.219","arch":"1"},{"pass":16,"n":54,"wA":3,"dL":0,"mD":7,"gM":2,"depth":14,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.466 0.206 0.824 0.497 0.205","arch":"1"},{"pass":16,"n":55,"wA":3,"dL":1,"mD":7,"gM":0,"depth":14,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.265 0.342 0.154 0.147 0.665","arch":"1"},{"pass":16,"n":83,"wA":3,"dL":1,"mD":5,"gM":0,"depth":10,"inv":false,"wob":false,"xh":false,"bez":false,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.743 0.700 0.930 0.695 0.583","arch":"1"},{"pass":16,"n":90,"wA":3,"dL":2,"mD":2,"gM":0,"depth":4,"inv":false,"wob":true,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.304 0.819 0.794 0.362 0.288","arch":"1"},{"pass":15,"n":13,"wA":5,"dL":2,"mD":1,"gM":0,"depth":2,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.001 0.329 0.699 0.203 0.600","arch":"TF"},{"pass":15,"n":27,"wA":5,"dL":1,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":false,"bez":false,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.887 0.286 0.798 0.018 0.959","arch":"TF"},{"pass":15,"n":44,"wA":5,"dL":0,"mD":4,"gM":1,"depth":8,"inv":true,"wob":false,"xh":false,"bez":true,"skip":false,"ct":true,"ht":true,"hh":false,"seeds":"0.233 0.552 0.976 0.160 0.045","arch":"TF"},{"pass":15,"n":71,"wA":5,"dL":2,"mD":6,"gM":2,"depth":12,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.383 0.210 0.430 0.711 0.779","arch":"TF"},{"pass":15,"n":81,"wA":5,"dL":0,"mD":2,"gM":1,"depth":4,"inv":true,"wob":false,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.610 0.297 0.436 0.754 0.349","arch":"TF"},{"pass":15,"n":85,"wA":5,"dL":2,"mD":5,"gM":0,"depth":10,"inv":false,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.730 0.201 0.828 0.971 0.344","arch":"TF"},{"pass":15,"n":87,"wA":5,"dL":1,"mD":2,"gM":0,"depth":4,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.495 0.004 0.923 0.524 0.434","arch":"TF"},{"pass":16,"n":2,"wA":5,"dL":2,"mD":7,"gM":0,"depth":14,"inv":false,"wob":false,"xh":true,"bez":true,"skip":false,"ct":true,"ht":true,"hh":false,"seeds":"0.648 0.405 0.999 0.258 0.451","arch":"TF"},{"pass":16,"n":53,"wA":5,"dL":0,"mD":4,"gM":1,"depth":8,"inv":false,"wob":true,"xh":true,"bez":false,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.455 0.426 0.757 0.120 0.304","arch":"TF"},{"pass":15,"n":18,"wA":3,"dL":0,"mD":7,"gM":1,"depth":14,"inv":true,"wob":false,"xh":true,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.322 0.650 0.203 0.726 0.575","arch":"9"},{"pass":15,"n":37,"wA":3,"dL":1,"mD":1,"gM":1,"depth":2,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.913 0.294 0.220 0.985 0.859","arch":"9"},{"pass":15,"n":40,"wA":3,"dL":2,"mD":6,"gM":1,"depth":12,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.157 0.328 0.315 0.380 0.815","arch":"9"},{"pass":15,"n":62,"wA":3,"dL":2,"mD":6,"gM":1,"depth":12,"inv":true,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.970 0.075 0.007 0.449 0.399","arch":"9"},{"pass":16,"n":32,"wA":3,"dL":0,"mD":5,"gM":2,"depth":10,"inv":true,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.590 0.191 0.277 0.811 0.166","arch":"9"},{"pass":16,"n":67,"wA":3,"dL":1,"mD":5,"gM":1,"depth":10,"inv":true,"wob":false,"xh":true,"bez":false,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.348 0.516 0.140 0.007 0.657","arch":"9"},{"pass":16,"n":85,"wA":1,"dL":0,"mD":4,"gM":1,"depth":8,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.873 0.121 0.982 0.427 0.558","arch":"9"},{"pass":16,"n":92,"wA":3,"dL":0,"mD":2,"gM":1,"depth":4,"inv":true,"wob":false,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.043 0.488 0.962 0.187 0.692","arch":"9"},{"pass":15,"n":7,"wA":1,"dL":1,"mD":5,"gM":1,"depth":10,"inv":false,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.858 0.290 0.838 0.897 0.862","arch":"7"},{"pass":15,"n":79,"wA":1,"dL":1,"mD":3,"gM":1,"depth":6,"inv":true,"wob":true,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.056 0.251 0.604 0.549 0.762","arch":"7"},{"pass":15,"n":84,"wA":1,"dL":1,"mD":5,"gM":2,"depth":10,"inv":false,"wob":false,"xh":false,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.063 0.310 0.255 0.275 0.265","arch":"7"},{"pass":15,"n":90,"wA":1,"dL":1,"mD":6,"gM":1,"depth":12,"inv":true,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.946 0.490 0.802 0.939 0.713","arch":"7"},{"pass":16,"n":3,"wA":1,"dL":1,"mD":5,"gM":0,"depth":10,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.059 0.557 0.722 0.807 0.804","arch":"7"},{"pass":16,"n":30,"wA":1,"dL":1,"mD":4,"gM":2,"depth":8,"inv":false,"wob":true,"xh":false,"bez":false,"skip":true,"ct":false,"ht":true,"hh":true,"seeds":"0.519 0.970 0.112 0.426 0.426","arch":"7"},{"pass":16,"n":56,"wA":1,"dL":1,"mD":6,"gM":2,"depth":12,"inv":true,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.393 0.428 0.130 0.095 0.428","arch":"7"},{"pass":15,"n":3,"wA":0,"dL":1,"mD":3,"gM":2,"depth":6,"inv":false,"wob":true,"xh":false,"bez":false,"skip":false,"ct":false,"ht":true,"hh":false,"seeds":"0.267 0.523 0.981 0.868 0.797","arch":"8"},{"pass":15,"n":52,"wA":0,"dL":2,"mD":7,"gM":2,"depth":14,"inv":false,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.305 0.878 0.530 0.672 0.295","arch":"8"},{"pass":16,"n":11,"wA":0,"dL":0,"mD":2,"gM":2,"depth":4,"inv":true,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.201 0.786 0.198 0.408 0.434","arch":"8"},{"pass":16,"n":25,"wA":0,"dL":0,"mD":6,"gM":2,"depth":12,"inv":false,"wob":false,"xh":false,"bez":false,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.312 0.380 0.733 0.699 0.814","arch":"8"},{"pass":16,"n":42,"wA":0,"dL":0,"mD":7,"gM":2,"depth":14,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.749 0.946 0.856 0.797 0.866","arch":"8"},{"pass":16,"n":91,"wA":0,"dL":0,"mD":1,"gM":1,"depth":2,"inv":false,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.882 0.780 0.997 0.804 0.931","arch":"8"},{"pass":15,"n":2,"wA":4,"dL":2,"mD":6,"gM":1,"depth":12,"inv":false,"wob":true,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.508 0.388 0.740 0.704 0.394","arch":"X"},{"pass":15,"n":47,"wA":2,"dL":1,"mD":3,"gM":2,"depth":6,"inv":false,"wob":false,"xh":true,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.366 0.560 0.260 0.522 0.792","arch":"X"},{"pass":16,"n":26,"wA":4,"dL":1,"mD":5,"gM":1,"depth":10,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":true,"seeds":"0.214 0.764 0.287 0.207 0.651","arch":"X"},{"pass":16,"n":68,"wA":1,"dL":0,"mD":1,"gM":1,"depth":2,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.943 0.141 0.456 0.858 0.030","arch":"X"},{"pass":16,"n":88,"wA":4,"dL":2,"mD":6,"gM":0,"depth":12,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":true,"seeds":"0.499 0.412 0.903 0.624 0.123","arch":"X"},{"pass":15,"n":12,"wA":2,"dL":0,"mD":2,"gM":1,"depth":4,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.398 0.244 0.711 0.543 0.081","arch":"10"},{"pass":16,"n":59,"wA":2,"dL":2,"mD":4,"gM":1,"depth":8,"inv":false,"wob":false,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.691 0.528 0.720 0.840 0.556","arch":"10"},{"pass":15,"n":16,"wA":3,"dL":2,"mD":6,"gM":2,"depth":12,"inv":false,"wob":false,"xh":false,"bez":false,"skip":true,"ct":false,"ht":true,"hh":false,"seeds":"0.835 0.864 0.528 0.957 0.560","arch":"6"},{"pass":15,"n":66,"wA":3,"dL":2,"mD":4,"gM":2,"depth":8,"inv":false,"wob":false,"xh":true,"bez":true,"skip":false,"ct":true,"ht":false,"hh":false,"seeds":"0.575 0.156 0.700 0.467 0.772","arch":"6"},{"pass":15,"n":89,"wA":3,"dL":2,"mD":1,"gM":2,"depth":2,"inv":true,"wob":false,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.421 0.196 0.548 0.147 0.688","arch":"6"},{"pass":15,"n":32,"wA":1,"dL":2,"mD":2,"gM":1,"depth":4,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.764 0.626 0.525 0.723 0.407","arch":"14"},{"pass":15,"n":41,"wA":1,"dL":2,"mD":4,"gM":0,"depth":8,"inv":false,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":false,"hh":true,"seeds":"0.648 0.694 0.742 0.800 0.066","arch":"14"},{"pass":16,"n":86,"wA":1,"dL":2,"mD":2,"gM":0,"depth":4,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":false,"hh":false,"seeds":"0.980 0.517 0.238 0.850 0.715","arch":"14"},{"pass":17,"n":3,"wA":3,"dL":2,"mD":3,"gM":2,"depth":6,"inv":false,"wob":false,"xh":true,"bez":false,"skip":true,"ct":false,"ht":false,"hh":true,"seeds":"0.339 0.888 0.200 0.085 0.571","arch":"6"},{"pass":17,"n":4,"wA":3,"dL":2,"mD":7,"gM":2,"depth":14,"inv":false,"wob":true,"xh":true,"bez":false,"skip":false,"ct":false,"ht":false,"hh":false,"seeds":"0.463 0.063 0.810 0.526 0.039","arch":"6"},{"pass":17,"n":5,"wA":3,"dL":2,"mD":3,"gM":2,"depth":6,"inv":false,"wob":true,"xh":true,"bez":true,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.920 0.169 0.253 0.117 0.445","arch":"6"},{"pass":17,"n":6,"wA":1,"dL":2,"mD":6,"gM":2,"depth":12,"inv":false,"wob":true,"xh":true,"bez":true,"skip":true,"ct":false,"ht":false,"hh":false,"seeds":"0.593 0.846 0.874 0.330 0.930","arch":"14"},{"pass":17,"n":9,"wA":1,"dL":2,"mD":5,"gM":0,"depth":10,"inv":false,"wob":false,"xh":true,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.416 0.047 0.051 0.307 0.041","arch":"14"},{"pass":17,"n":10,"wA":1,"dL":2,"mD":6,"gM":1,"depth":12,"inv":false,"wob":true,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":false,"seeds":"0.694 0.926 0.405 0.229 0.588","arch":"14"},{"pass":17,"n":14,"wA":1,"dL":2,"mD":4,"gM":2,"depth":8,"inv":false,"wob":true,"xh":true,"bez":false,"skip":true,"ct":true,"ht":false,"hh":true,"seeds":"0.852 0.320 0.971 0.966 0.160","arch":"14"},{"pass":17,"n":15,"wA":1,"dL":2,"mD":7,"gM":2,"depth":14,"inv":false,"wob":false,"xh":false,"bez":true,"skip":true,"ct":true,"ht":true,"hh":true,"seeds":"0.749 0.869 0.858 0.426 0.704","arch":"14"},{"pass":17,"n":17,"wA":2,"dL":2,"mD":6,"gM":1,"depth":12,"inv":false,"wob":false,"xh":true,"bez":false,"skip":false,"ct":false,"ht":true,"hh":true,"seeds":"0.201 0.135 0.078 0.052 0.824","arch":"10"},{"pass":17,"n":19,"wA":2,"dL":2,"mD":1,"gM":1,"depth":2,"inv":false,"wob":true,"xh":false,"bez":true,"skip":false,"ct":true,"ht":false,"hh":true,"seeds":"0.486 0.400 0.822 0.024 0.042","arch":"10"}];

  // --- render one record at native canvas resolution (waveLevel=2 canonical) ---
  async function renderOne(s) {
    waveLevel = 2; waveAngleLevel = s.wA; densityLevel = s.dL; maxDepthLevel = s.mD; growthMode = s.gM;
    invertDensity = s.inv; wobbleMode = s.wob; crosshatchEnabled = s.xh; useBezier = s.bez;
    skipSparseConnections = s.skip; coloredThread = s.ct; hideThreads = s.ht; hideHighways = s.hh; sepiaMode = true;
    const sd = s.seeds.split(' ');
    m0 = sd[0]; m1 = sd[1]; m2 = sd[2]; m3 = sd[3]; m4 = sd[4];
    setPaperColor(); setSeeds(); initDrawing();
    while (currentSegment < segments.length) { drawSegment(segments[currentSegment], currentSegment); currentSegment++; }
    noLoop(); drawThreadsToOverlay(); drawSignature();
    const src = document.querySelector('canvas'), W = src.width, H = src.height;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f0dfc0'; ctx.fillRect(0, 0, W, H); ctx.drawImage(src, 0, 0, W, H);
    // threadCanvas is a top-level `let` in index.js — a global lexical binding, NOT a window
    // property. Reference it bare; `window.threadCanvas` is undefined and silently drops threads.
    if (typeof threadCanvas !== 'undefined' && threadCanvas) ctx.drawImage(threadCanvas, 0, 0, W, H);
    s._hi = c.toDataURL('image/jpeg', 0.9);
  }

  async function renderAll() {
    const t0 = performance.now();
    for (const s of KEEPERS) { if (!s._hi) await renderOne(s); }
    return 'rendered ' + KEEPERS.length + ' in ' + Math.round(performance.now() - t0) + 'ms';
  }

  // --- fullsize keep/curate viewer over KEEPERS ---
  function launchViewer(startIdx) {
    KEEPERS.forEach(s => { if (s._keep === undefined) s._keep = true; });
    const ALL = KEEPERS;
    const flagsOf = s => [s.inv ? 'inv' : '', s.wob ? 'wob' : '', s.xh ? 'xh' : '', s.bez ? '' : 'lines', s.skip ? 'skip' : ''].filter(Boolean).join(' ') || '—';
    const layersOf = s => [s.ht ? '' : 'thr', s.hh ? '' : 'hwy', s.ct ? 'col' : ''].filter(Boolean).join(' ') || '—';
    const idOf = s => 'P' + s.pass + '·' + s.n;
    let idx = Math.max(0, Math.min((startIdx | 0), KEEPERS.length - 1)), filterKept = false;
    const list = () => filterKept ? ALL.filter(s => s._keep) : ALL;
    const prev = document.getElementById('__viewer'); if (prev) prev.remove();
    if (window.__viewerKey) document.removeEventListener('keydown', window.__viewerKey);
    const v = document.createElement('div'); v.id = '__viewer';
    v.style.cssText = 'position:fixed;inset:0;background:#e3d6c0;z-index:100000;display:flex;flex-direction:column;font-family:Georgia,serif;color:#3a2a1a;user-select:none;';
    v.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;padding:10px 18px;background:#d8c8ac;border-bottom:1px solid #c4a882;font-size:13px;">
        <div id="__v_counter" style="font-weight:bold;font-size:15px;min-width:90px;"></div>
        <div id="__v_id" style="font-family:monospace;color:#7a5c3c;font-weight:bold;"></div>
        <div id="__v_arch" style="font-size:15px;font-weight:bold;"></div>
        <div id="__v_keptcount" style="margin-left:auto;font-weight:bold;color:#1a7a4a;"></div>
        <button id="__v_filter" style="font-family:Georgia,serif;font-size:12px;padding:5px 10px;border:1px solid #9a8868;background:#efe6d4;border-radius:4px;cursor:pointer;">Kept only (f)</button>
        <button id="__v_export" style="font-family:Georgia,serif;font-size:12px;padding:5px 10px;border:1px solid #9a8868;background:#efe6d4;border-radius:4px;cursor:pointer;">Export kept (e)</button>
        <button id="__v_close" style="font-family:Georgia,serif;font-size:12px;padding:5px 10px;border:1px solid #9a8868;background:#efe6d4;border-radius:4px;cursor:pointer;">Close (Esc)</button>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:18px;padding:14px;min-height:0;">
        <button id="__v_prev" style="font-size:30px;width:54px;height:90px;border:1px solid #b09868;background:#efe6d4cc;border-radius:8px;cursor:pointer;flex:none;">‹</button>
        <div id="__v_imgwrap" style="height:100%;aspect-ratio:1;position:relative;border:5px solid #caa;border-radius:4px;background:#f0dfc0;box-shadow:0 6px 28px rgba(0,0,0,.25);overflow:hidden;">
          <img id="__v_img" style="width:100%;height:100%;object-fit:contain;display:block;" />
          <div id="__v_badge" style="position:absolute;top:14px;left:14px;background:#1a7a4a;color:#fff;font-weight:bold;font-size:15px;padding:6px 14px;border-radius:20px;display:none;letter-spacing:.05em;">✓ KEEP</div>
        </div>
        <button id="__v_next" style="font-size:30px;width:54px;height:90px;border:1px solid #b09868;background:#efe6d4cc;border-radius:8px;cursor:pointer;flex:none;">›</button>
      </div>
      <div style="padding:10px 18px;background:#d8c8ac;border-top:1px solid #c4a882;display:flex;align-items:center;gap:18px;">
        <button id="__v_keep" style="font-family:Georgia,serif;font-size:15px;font-weight:bold;padding:10px 22px;border:none;border-radius:6px;cursor:pointer;color:#fff;flex:none;"></button>
        <div style="font-size:13px;line-height:1.5;font-family:monospace;color:#5a4632;">
          <div id="__v_meta"></div>
          <div id="__v_seed" style="color:#8a7558;font-size:11px;margin-top:2px;"></div>
        </div>
        <div style="margin-left:auto;font-size:11px;color:#8a7558;text-align:right;line-height:1.5;">
          ← / → navigate · K or Space = keep · F = kept-only · E = export<br>full resolution (940px native) · waveLevel=2 · 117 curated keepers (threads on)
        </div>
      </div>`;
    document.body.appendChild(v);
    const $ = id => document.getElementById(id);
    const img = $('__v_img'), wrap = $('__v_imgwrap'), badge = $('__v_badge');
    function render() {
      const L = list();
      if (!L.length) { $('__v_counter').textContent = '0 / 0'; $('__v_id').textContent = ''; $('__v_arch').textContent = '(none)'; img.src = ''; badge.style.display = 'none'; $('__v_meta').textContent = ''; $('__v_seed').textContent = ''; $('__v_keptcount').textContent = 'kept: ' + ALL.filter(s => s._keep).length; return; }
      if (idx >= L.length) idx = L.length - 1; if (idx < 0) idx = 0;
      const s = L[idx];
      img.src = s._hi || '';
      wrap.style.borderColor = s._keep ? '#1a7a4a' : '#caa';
      badge.style.display = s._keep ? 'block' : 'none';
      $('__v_counter').textContent = (idx + 1) + ' / ' + L.length;
      $('__v_id').textContent = idOf(s);
      $('__v_arch').textContent = ARCH_NAME[s.arch] || s.arch;
      $('__v_meta').textContent = WAVE[s.wA] + ' · ' + DENS[s.dL] + ' · depth ' + s.depth + ' · ' + GROW[s.gM] + ' · ' + flagsOf(s) + ' · [' + layersOf(s) + ']';
      $('__v_seed').textContent = 'seeds ' + s.seeds;
      const kb = $('__v_keep');
      kb.textContent = s._keep ? '✓ Kept — click to unmark (K)' : 'Mark KEEP (K)';
      kb.style.background = s._keep ? '#1a7a4a' : '#9a6840';
      $('__v_keptcount').textContent = 'kept: ' + ALL.filter(x => x._keep).length + ' / ' + ALL.length;
    }
    const nav = d => { const L = list(); if (!L.length) return; idx = (idx + d + L.length) % L.length; render(); };
    const toggleKeep = () => { const L = list(); if (!L.length) return; L[idx]._keep = !L[idx]._keep; render(); };
    const setFilter = on => { filterKept = on; idx = 0; $('__v_filter').style.background = on ? '#1a7a4a' : '#efe6d4'; $('__v_filter').style.color = on ? '#fff' : '#3a2a1a'; render(); };
    function exportKept() {
      const kept = ALL.filter(s => s._keep);
      const lines = kept.map(s => `- ${idOf(s)} · ${s.seeds} · ${WAVE[s.wA].slice(0, 5)}·${DENS[s.dL].slice(0, 4)}·d${s.depth} · ${GROW[s.gM].slice(0, 4)} · ${flagsOf(s)} · ${layersOf(s)} · [${ARCH_NAME[s.arch]}]`).join('\n');
      window._keptExport = lines;
      let pnl = document.getElementById('__v_exportpanel');
      if (!pnl) {
        pnl = document.createElement('div'); pnl.id = '__v_exportpanel';
        pnl.style.cssText = 'position:fixed;inset:8% 12%;z-index:100001;background:#fdf7ed;border:2px solid #9a6840;border-radius:8px;padding:18px;display:flex;flex-direction:column;gap:10px;box-shadow:0 10px 40px rgba(0,0,0,.35);';
        pnl.innerHTML = '<div style="font-weight:bold;font-family:Georgia,serif;color:#5a3c20;">Kept seed lines (also in window._keptExport)</div><textarea id="__v_exporttext" style="flex:1;font-family:monospace;font-size:11px;padding:8px;border:1px solid #c4a882;border-radius:4px;resize:none;"></textarea><button id="__v_exportclose" style="align-self:flex-end;font-family:Georgia,serif;padding:6px 16px;border:1px solid #9a8868;background:#efe6d4;border-radius:4px;cursor:pointer;">Done</button>';
        document.body.appendChild(pnl);
        document.getElementById('__v_exportclose').onclick = () => pnl.remove();
      }
      document.getElementById('__v_exporttext').value = lines || '(nothing kept)';
    }
    const close = () => { v.remove(); if (window.__viewerKey) document.removeEventListener('keydown', window.__viewerKey); };
    $('__v_prev').onclick = () => nav(-1); $('__v_next').onclick = () => nav(1); $('__v_keep').onclick = toggleKeep;
    $('__v_filter').onclick = () => setFilter(!filterKept); $('__v_export').onclick = exportKept; $('__v_close').onclick = close; img.onclick = () => nav(1);
    window.__viewerKey = function (e) {
      if (document.getElementById('__v_exportpanel') && e.key === 'Escape') { document.getElementById('__v_exportpanel').remove(); e.preventDefault(); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { nav(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { nav(-1); e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'k' || e.key === 'K') { toggleKeep(); e.preventDefault(); }
      else if (e.key === 'f' || e.key === 'F') { setFilter(!filterKept); e.preventDefault(); }
      else if (e.key === 'e' || e.key === 'E') { exportKept(); e.preventDefault(); }
      else if (e.key === 'Escape') { close(); e.preventDefault(); }
    };
    document.addEventListener('keydown', window.__viewerKey);
    render();
  }

  // --- full overview: all keepers grouped by refined archetype; click a thumb to open viewer ---
  function buildOverview() {
    const waveShort = ['Diag', 'Horiz', 'Vert', 'Radial', 'Square', 'Chaotic'];
    const dist = {}; KEEPERS.forEach(s => dist[s.arch] = (dist[s.arch] || 0) + 1);
    const order = Object.keys(dist).sort((a, b) => dist[b] - dist[a]);
    const old = document.getElementById('__matrix_overlay'); if (old) old.remove();
    const wrap = document.createElement('div'); wrap.id = '__matrix_overlay';
    wrap.style.cssText = 'position:fixed;inset:0;background:#e8dcc8;z-index:99999;overflow:auto;padding:22px;box-sizing:border-box;font-family:Georgia,serif;';
    const bar = document.createElement('div'); bar.style.cssText = 'display:flex;align-items:center;gap:14px;margin-bottom:4px;';
    const t = document.createElement('div'); t.style.cssText = 'font-size:15px;font-weight:bold;color:#5a3c20;';
    t.textContent = 'Field Script — Refined Grammar Overview · ' + KEEPERS.length + ' keepers · 12 archetypes';
    const flip = document.createElement('button');
    flip.style.cssText = 'margin-left:auto;font-family:Georgia,serif;font-size:12px;padding:6px 14px;border:1px solid #9a8868;background:#efe6d4;border-radius:4px;cursor:pointer;';
    flip.textContent = 'Flip through ▶'; flip.onclick = () => launchViewer(0);
    bar.appendChild(t); bar.appendChild(flip); wrap.appendChild(bar);
    const sub = document.createElement('div'); sub.style.cssText = 'font-size:10px;color:#8a7558;margin-bottom:14px;font-family:monospace;';
    sub.innerHTML = 'Full 940px renders, waveLevel=2. Pass 17 marked <span style="color:#1a7a4a;font-weight:bold;">●</span>. Click any image to open it full-screen in the viewer.';
    wrap.appendChild(sub);
    order.forEach(id => {
      const items = KEEPERS.filter(s => s.arch === id); if (!items.length) return;
      const isX = id === 'X', isTF = id === 'TF', nNew = items.filter(s => s.pass === 17).length;
      const h = document.createElement('div');
      h.style.cssText = `font-size:12px;font-weight:bold;color:${isX ? '#a05a3a' : (isTF ? '#7a4a8a' : '#6a4a2a')};letter-spacing:0.06em;text-transform:uppercase;margin:14px 0 8px;border-bottom:1px solid ${isX ? '#a05a3a' : (isTF ? '#7a4a8a' : '#c4a882')};padding-bottom:4px;`;
      h.textContent = (ARCH_NAME[id] || id) + '  ·  ' + items.length + (nNew ? ('  (+' + nNew + ' Pass 17)') : '') + (isTF ? '  — merged chaotic' : '');
      wrap.appendChild(h);
      const row = document.createElement('div'); row.style.cssText = 'display:flex;flex-wrap:wrap;gap:7px;';
      items.forEach(s => {
        const gi = KEEPERS.indexOf(s);
        const cell = document.createElement('div');
        cell.style.cssText = `position:relative;width:120px;background:${isX ? '#f6ece0' : '#fdf7ed'};border:1px solid ${isX ? '#d8b89a' : '#d8c8a8'};border-radius:2px;padding:5px;cursor:pointer;`;
        cell.title = 'Open ' + ('P' + s.pass + '·' + s.n) + ' in viewer';
        cell.onclick = () => launchViewer(gi);
        cell.innerHTML = `<img src="${s._hi}" style="width:100%;aspect-ratio:1;object-fit:cover;border:1px solid #ddd;pointer-events:none;" />
          ${s.pass === 17 ? '<div style="position:absolute;top:8px;right:8px;width:9px;height:9px;border-radius:50%;background:#1a7a4a;border:1px solid #fff;"></div>' : ''}
          <div style="font-size:7px;color:#8a7a6a;margin-top:3px;font-family:monospace;line-height:1.3;">P${s.pass}·${s.n} ${waveShort[s.wA]}·${['L', 'M', 'D'][s.dL]}·d${s.depth}<br>${['Se', 'Ra', 'Sp'][s.gM]}${s.inv ? '·inv' : ''}${s.xh ? '·xh' : ''}</div>`;
        row.appendChild(cell);
      });
      wrap.appendChild(row);
    });
    document.body.appendChild(wrap);
  }

  // expose + auto-run
  window.GrammarTools = { KEEPERS, ARCH_NAME, renderOne, renderAll, launchViewer, buildOverview };
  (async () => {
    if (typeof initDrawing !== 'function') {
      console.warn('[GrammarTools] sketch not ready — call GrammarTools.renderAll() then GrammarTools.buildOverview() / .launchViewer() once the p5 sketch has loaded.');
      return;
    }
    console.log('[GrammarTools] ' + await renderAll());
    buildOverview();   // landing screen: full overview (click a thumb → single-image viewer)
    launchViewer(0);   // also open the single-image viewer on top (Esc returns to overview)
  })();
})();
