/**
 * rabbit.js — Événement de Pâques
 *
 * - Le lapin apparaît en bas à droite (fixed) quand le footer est visible
 * - Cliquer sur le lapin → la forêt apparaît + la chasse aux 5 œufs commence
 * - Les œufs sont en position: absolute dans la page (bougent avec le scroll)
 * - Positions variées et cachées dans les sections
 * - PC uniquement
 */

(function () {
  "use strict";

  const isMobile =
    /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent);
  if (isMobile) return;

  /* ══════════════════════════════════════════
     STYLES
  ══════════════════════════════════════════ */
  const css = document.createElement("style");
  css.textContent = `

    #ef-bg {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1.2s ease;
    }
    #ef-bg.show { opacity: 1; }

    #ef-bg-sky {
      position: absolute; inset: 0;
      background: linear-gradient(180deg,
        #87ceeb 0%, #b8e4f0 22%, #d4f0b0 40%,
        #4a8c2a 55%, #2d6b18 72%, #1a4010 100%
      );
    }

    #ef-sun {
      position: absolute;
      top: 6%; left: 8%;
      width: 72px; height: 72px;
      background: radial-gradient(circle, #ffe066 40%, #ffcc00 70%, transparent 100%);
      border-radius: 50%;
      box-shadow: 0 0 60px 22px rgba(255,220,0,.45);
      animation: efSun 4s ease-in-out infinite;
    }
    @keyframes efSun {
      0%,100%{ box-shadow: 0 0 60px 22px rgba(255,220,0,.45); }
      50%    { box-shadow: 0 0 90px 36px rgba(255,220,0,.7); }
    }

    .ef-cloud {
      position: absolute;
      background: rgba(255,255,255,.88);
      border-radius: 50px;
      animation: efCloud linear infinite;
    }
    @keyframes efCloud {
      from { transform: translateX(-260px); }
      to   { transform: translateX(110vw); }
    }

    #ef-trees {
      position: absolute;
      bottom: 0; left: 0;
      width: 100%; height: 65%;
      pointer-events: none;
    }

    #ef-grass {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 18%;
      background: linear-gradient(180deg, #56c45a 0%, #2e7d32 100%);
      border-radius: 55% 55% 0 0 / 28% 28% 0 0;
    }
    #ef-grass::before {
      content:''; position:absolute; inset:0;
      background: repeating-linear-gradient(90deg,
        transparent 0,transparent 8px,rgba(0,0,0,.04) 8px,rgba(0,0,0,.04) 9px);
    }

    .ef-butterfly {
      position: absolute;
      pointer-events: none;
      animation: efBf linear infinite;
    }
    @keyframes efBf {
      0%  { transform: translate(0,0); }
      25% { transform: translate(32px,-22px) rotate(8deg); }
      50% { transform: translate(64px, 6px) rotate(-4deg); }
      75% { transform: translate(32px,-16px) rotate(6deg); }
      100%{ transform: translate(0,0); }
    }

    #ef-rabbit {
      position: fixed;
      bottom: -100px;
      right: 60px;
      width: 68px; height: 84px;
      cursor: pointer;
      z-index: 100;
      pointer-events: all;
      filter: drop-shadow(0 4px 16px rgba(0,0,0,.5));
      user-select: none;
      transition: bottom .7s cubic-bezier(.34,1.56,.64,1);
    }
    #ef-rabbit.show { bottom: 0px; }
    #ef-rabbit:hover { animation: efWiggle .4s ease; }
    @keyframes efWiggle {
      0%,100%{ transform:rotate(0); }
      30%    { transform:rotate(-9deg); }
      70%    { transform:rotate(9deg); }
    }
    #ef-rabbit svg { width:100%; height:100%; }

    #ef-bubble {
      position: fixed;
      bottom: 94px; right: 48px;
      background: #fff; color: #333;
      border-radius: 12px;
      padding: 7px 13px;
      font-family: 'Segoe UI', sans-serif;
      font-size: 12.5px;
      white-space: nowrap;
      box-shadow: 0 4px 18px rgba(0,0,0,.2);
      pointer-events: none;
      opacity: 0; transform: translateY(6px);
      transition: opacity .3s, transform .3s;
      z-index: 101;
    }
    #ef-bubble::after {
      content:''; position:absolute;
      bottom:-7px; right:22px;
      border:7px solid transparent;
      border-bottom:none; border-top-color:#fff;
    }
    #ef-bubble.show { opacity:1; transform:translateY(0); }

    /* Oeufs : ABSOLUTE dans la page, bougent avec le scroll */
    .ef-egg {
      position: absolute;
      width: 38px; height: 46px;
      cursor: pointer;
      z-index: 50;
      animation: efEggFloat 2.8s ease-in-out infinite;
      transition: filter .2s, opacity .4s;
      opacity: 0;
    }
    .ef-egg.visible { opacity: 1; }
    .ef-egg:nth-child(2n){ animation-delay:-1.4s; }
    .ef-egg:nth-child(3n){ animation-delay:-.7s; }
    @keyframes efEggFloat {
      0%,100%{ transform:translateY(0); }
      50%    { transform:translateY(-8px); }
    }
    .ef-egg:hover {
      filter: brightness(1.4) drop-shadow(0 0 12px rgba(255,220,0,.9));
    }
    .ef-egg.found {
      pointer-events:none;
      animation: efEggPop .5s ease forwards;
    }
    @keyframes efEggPop {
      0%  { transform:scale(1);   opacity:1; }
      50% { transform:scale(2) translateY(-18px); opacity:.8; }
      100%{ transform:scale(0) translateY(-40px); opacity:0; }
    }

    /* Indice pulsant — aussi en absolute */
    .ef-hint {
      position: absolute;
      width:11px; height:11px;
      border-radius:50%;
      background:rgba(255,235,60,.7);
      pointer-events:none;
      z-index:49;
      animation: efHint 2s ease-in-out infinite;
      opacity: 0;
      transition: opacity .4s;
    }
    .ef-hint.visible { opacity: 1; }
    @keyframes efHint {
      0%,100%{ transform:scale(1);   opacity:.7; }
      50%    { transform:scale(2.4); opacity:0; }
    }

    #ef-hud {
      position: fixed;
      top:16px; left:50%; transform:translateX(-50%);
      z-index:200;
      display:none; align-items:center; gap:10px;
      background:rgba(0,0,0,.55);
      backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.18);
      border-radius:50px;
      padding:9px 20px;
      font-family:'Segoe UI',sans-serif;
      color:#fff; font-size:13px; white-space:nowrap;
    }
    #ef-hud.on { display:flex; }
    .ef-dot {
      width:18px; height:18px;
      border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
      border:2px solid rgba(255,255,255,.3);
      background:rgba(255,255,255,.1);
      transition:all .3s;
    }
    .ef-dot.got { transform:scale(1.25); box-shadow:0 0 8px rgba(255,220,0,.7); }
    .ef-hud-close {
      cursor:pointer; padding:2px 9px; border-radius:20px;
      background:rgba(255,255,255,.15); font-size:11px; margin-left:4px;
      transition:background .2s;
    }
    .ef-hud-close:hover { background:rgba(255,255,255,.3); }

    .ef-particle {
      position:fixed; width:8px; height:8px;
      border-radius:50%; pointer-events:none; z-index:300;
      animation:efPart .7s ease-out forwards;
    }
    @keyframes efPart {
      0%  { transform:translate(0,0) scale(1); opacity:1; }
      100%{ transform:translate(var(--dx),var(--dy)) scale(0); opacity:0; }
    }

    #ef-win {
      position:fixed; inset:0; z-index:400;
      display:flex; align-items:center; justify-content:center;
      opacity:0; pointer-events:none; transition:opacity .5s;
    }
    #ef-win.on { opacity:1; pointer-events:all; }
    .ef-win-card {
      background:rgba(0,0,0,.65); backdrop-filter:blur(22px);
      border:2px solid rgba(255,220,0,.45); border-radius:22px;
      padding:36px 52px; text-align:center; color:#fff;
      font-family:'Segoe UI',sans-serif;
      animation:efWinPop .5s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes efWinPop {
      from{ transform:scale(.5); opacity:0; }
      to  { transform:scale(1);  opacity:1; }
    }
    .ef-win-title {
      font-size:2rem; font-weight:800;
      background:linear-gradient(135deg,#ffe066,#ff9966,#ff66cc);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text; margin-bottom:8px;
    }
    .ef-win-sub { font-size:.9rem; color:rgba(255,255,255,.72); margin-bottom:18px; }
    .ef-win-row { font-size:1.7rem; letter-spacing:6px;
      animation:efWinBounce 1s ease-in-out infinite; }
    @keyframes efWinBounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
    .ef-win-btn {
      margin-top:20px; padding:9px 26px; border:none; border-radius:28px;
      background:linear-gradient(135deg,#ffe066,#ff9966);
      color:#333; font-size:13px; font-weight:700; cursor:pointer;
      transition:transform .2s, box-shadow .2s;
    }
    .ef-win-btn:hover { transform:scale(1.06); box-shadow:0 4px 18px rgba(255,200,0,.5); }

    .ef-confetti {
      position:fixed; pointer-events:none; z-index:350;
      animation:efConfetti linear forwards;
    }
    @keyframes efConfetti {
      0%  { transform:translate(0,-20px) rotate(0); opacity:1; }
      100%{ transform:translate(var(--tx),100vh) rotate(var(--rot)); opacity:0; }
    }
  `;
  document.head.appendChild(css);

  /* ══════════════════════════════════════════
     FOND FORÊT
  ══════════════════════════════════════════ */
  const bg = document.createElement("div");
  bg.id = "ef-bg";
  bg.innerHTML = `<div id="ef-bg-sky"></div><div id="ef-sun"></div>`;

  for (let i = 0; i < 5; i++) {
    const c = document.createElement("div");
    c.className = "ef-cloud";
    const w = 80 + Math.random() * 90, h = 24 + Math.random() * 18;
    Object.assign(c.style, {
      width: w+"px", height: h+"px",
      top: (3 + Math.random() * 26)+"%",
      left: (-240 + Math.random() * 80)+"px",
      animationDuration: (36 + Math.random() * 44)+"s",
      animationDelay: (-Math.random() * 44)+"s",
    });
    [0, 1].forEach(j => {
      const b = document.createElement("div");
      Object.assign(b.style, {
        position:"absolute", borderRadius:"50%",
        background:"rgba(255,255,255,.88)",
        width: (w*(j?.38:.52))+"px", height: (h*1.45)+"px",
        top: -(h*.38)+"px", left: (j ? w*.52 : w*.10)+"px",
      });
      c.appendChild(b);
    });
    bg.appendChild(c);
  }

  const treeCanvas = document.createElement("canvas");
  treeCanvas.id = "ef-trees";
  bg.appendChild(treeCanvas);

  const grass = document.createElement("div");
  grass.id = "ef-grass";
  bg.appendChild(grass);

  ["#ff9acd","#ffee88","#88ddff","#aaffbb","#ffaa66"].forEach((col) => {
    const bf = document.createElement("div");
    bf.className = "ef-butterfly";
    bf.style.cssText = `left:${6+Math.random()*82}%;top:${30+Math.random()*40}%;
      width:20px;height:14px;
      animation-duration:${6+Math.random()*9}s;
      animation-delay:${-Math.random()*9}s;`;
    bf.innerHTML = `<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="5"  cy="7" rx="5" ry="5" fill="${col}" opacity=".85"/>
      <ellipse cx="15" cy="7" rx="5" ry="5" fill="${col}" opacity=".85"/>
      <line x1="10" y1="2" x2="10" y2="12" stroke="#555" stroke-width="1"/>
    </svg>`;
    bg.appendChild(bf);
  });

  document.body.appendChild(bg);

  function drawTrees() {
    const W = window.innerWidth, H = treeCanvas.offsetHeight || window.innerHeight * .65;
    treeCanvas.width = W; treeCanvas.height = H;
    const ctx = treeCanvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    function tree(x, h, tw, layers, dark) {
      ctx.fillStyle = dark ? "#3a2008" : "#5a3010";
      ctx.fillRect(x - tw/2, H - h, tw, h);
      const g = dark ? ["#164008","#1e5510","#256016"] : ["#2a8016","#36a820","#45c82a"];
      for (let i = 0; i < layers; i++) {
        const r = 1 - i/layers;
        const lw = h*1.5*r+18, lh = h*.55*r+12;
        const ty = H - h - i*(h*.36);
        ctx.fillStyle = g[Math.min(i, g.length-1)];
        ctx.beginPath();
        ctx.moveTo(x, ty-lh);
        ctx.lineTo(x-lw/2, ty);
        ctx.lineTo(x+lw/2, ty);
        ctx.closePath(); ctx.fill();
      }
    }
    for (let i = 0; i < 18; i++)
      tree((W/17)*i+5, 55+Math.random()*30, 7, 3, true);
    [.04,.10,.17,.24,.31,.39,.46,.53,.60,.67,.74,.81,.88,.95].forEach(p =>
      tree(W*p, 90+Math.random()*65, 12, 4, false)
    );
  }
  requestAnimationFrame(() => setTimeout(drawTrees, 50));
  window.addEventListener("resize", drawTrees);

  /* ══════════════════════════════════════════
     LAPIN
  ══════════════════════════════════════════ */
  const rabbit = document.createElement("div");
  rabbit.id = "ef-rabbit";
  rabbit.innerHTML = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="18" rx="7" ry="18" fill="#f0d0e0" stroke="#d4a0b0" stroke-width="1.5"/>
    <ellipse cx="42" cy="15" rx="7" ry="18" fill="#f0d0e0" stroke="#d4a0b0" stroke-width="1.5"/>
    <ellipse cx="22" cy="18" rx="4" ry="14" fill="#f9a8c0"/>
    <ellipse cx="42" cy="15" rx="4" ry="14" fill="#f9a8c0"/>
    <ellipse cx="32" cy="58" rx="18" ry="20" fill="#f5e6ec"/>
    <ellipse cx="32" cy="38" rx="15" ry="14" fill="#f5e6ec"/>
    <circle cx="27" cy="35" r="3" fill="#222"/>
    <circle cx="37" cy="35" r="3" fill="#222"/>
    <circle cx="28" cy="34" r="1" fill="#fff"/>
    <circle cx="38" cy="34" r="1" fill="#fff"/>
    <ellipse cx="32" cy="41" rx="3" ry="2" fill="#f9a8c0"/>
    <line x1="20" y1="41" x2="29" y2="42" stroke="#ccc" stroke-width="1"/>
    <line x1="20" y1="44" x2="29" y2="43" stroke="#ccc" stroke-width="1"/>
    <line x1="44" y1="41" x2="35" y2="42" stroke="#ccc" stroke-width="1"/>
    <line x1="44" y1="44" x2="35" y2="43" stroke="#ccc" stroke-width="1"/>
    <path d="M30 43 Q32 46 34 43" fill="none" stroke="#d4a0b0" stroke-width="1.5"/>
    <ellipse cx="20" cy="74" rx="8" ry="5" fill="#f0d0e0"/>
    <ellipse cx="44" cy="74" rx="8" ry="5" fill="#f0d0e0"/>
    <circle cx="46" cy="58" r="5" fill="#fff"/>
    <rect x="10" y="60" width="16" height="10" rx="3" fill="#c8a050"/>
    <rect x="10" y="58" width="16" height="4" rx="2" fill="#a06820"/>
    <circle cx="15" cy="60" r="3" fill="#e84393"/>
    <circle cx="22" cy="60" r="3" fill="#43c6e8"/>
  </svg>`;
  document.body.appendChild(rabbit);

  const bubble = document.createElement("div");
  bubble.id = "ef-bubble";
  bubble.textContent = (typeof t === "function") ? t("rabbit_bubble") : "🥚 Clique pour la chasse !";
  document.body.appendChild(bubble);

  /* ══════════════════════════════════════════
     HUD & VICTOIRE
  ══════════════════════════════════════════ */
  const EGG_COLORS = [
    { body:"#e84393", stripe:"#ff88bb" },
    { body:"#43c6e8", stripe:"#88e0ff" },
    { body:"#ffe066", stripe:"#fff5aa" },
    { body:"#66dd88", stripe:"#aaffc8" },
    { body:"#cc77ff", stripe:"#eeb8ff" },
  ];

  const hud = document.createElement("div");
  hud.id = "ef-hud";
  hud.innerHTML = `
    <span id="ef-hud-label">🥚 Trouve les œufs !</span>
    <div style="display:flex;gap:5px">
      ${Array.from({length:5},(_,i)=>`<div class="ef-dot" id="ef-dot-${i}"></div>`).join("")}
    </div>
    <span class="ef-hud-close" id="ef-hud-close-btn">✕ Quitter</span>
  `;
  document.body.appendChild(hud);

  const winPanel = document.createElement("div");
  winPanel.id = "ef-win";
  winPanel.innerHTML = `
    <div class="ef-win-card">
      <div class="ef-win-title" id="ef-win-title">🐰 Félicitations !</div>
      <div class="ef-win-sub" id="ef-win-sub">Tu as trouvé tous les œufs de Pâques !</div>
      <div class="ef-win-row">🥚🥚🥚🥚🥚</div>
      <button class="ef-win-btn" id="ef-win-close">Retourner au site ✨</button>
    </div>
  `;
  document.body.appendChild(winPanel);

  /* ══════════════════════════════════════════
     TRADUCTIONS — mise à jour dynamique
  ══════════════════════════════════════════ */
  function applyRabbitLang() {
    if (typeof t !== "function") return;
    bubble.textContent          = t("rabbit_bubble");
    const hudLabel = document.getElementById("ef-hud-label");
    const hudClose = document.getElementById("ef-hud-close-btn");
    const winTitle = document.getElementById("ef-win-title");
    const winSub   = document.getElementById("ef-win-sub");
    const winBtn   = document.getElementById("ef-win-close");
    if (hudLabel) hudLabel.textContent = t("rabbit_hud_label");
    if (hudClose) hudClose.textContent = t("rabbit_hud_close");
    if (winTitle) winTitle.textContent = t("rabbit_win_title");
    if (winSub)   winSub.textContent   = t("rabbit_win_sub");
    if (winBtn)   winBtn.textContent   = t("rabbit_win_btn");
  }

  // Appliquer au chargement (après que lang.js ait initialisé)
  document.addEventListener("DOMContentLoaded", applyRabbitLang);
  // Réagir aux changements de langue
  document.addEventListener("langchange", applyRabbitLang);

  /* ══════════════════════════════════════════
     SCROLL — lapin visible quand footer en vue
  ══════════════════════════════════════════ */
  let rabbitRevealed = false;
  let bubbleTimer = null;

  function checkScroll() {
    const footer = document.querySelector("footer, .main-footer, #contact");
    if (!footer) return;
    const footerVisible = footer.getBoundingClientRect().top < window.innerHeight;

    if (footerVisible && !rabbitRevealed) {
      rabbitRevealed = true;
      rabbit.classList.add("show");
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => {
        bubble.classList.add("show");
        bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 3500);
      }, 700);
    } else if (!footerVisible && rabbitRevealed && !huntOn) {
      rabbitRevealed = false;
      rabbit.classList.remove("show");
      bubble.classList.remove("show");
    }
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  /* ══════════════════════════════════════════
     JEU
  ══════════════════════════════════════════ */
  let huntOn = false, foundCnt = 0;

  rabbit.addEventListener("click", startHunt);
  hud.querySelector("#ef-hud-close-btn").addEventListener("click", stopHunt);
  winPanel.querySelector("#ef-win-close").addEventListener("click", stopHunt);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && huntOn) stopHunt(); });

  /**
   * Positions absolues dans la page, réparties et bien cachées.
   * Calculées dynamiquement selon la hauteur totale du document.
   */
  function getEggPositions() {
    const H = document.body.scrollHeight;
    const W = window.innerWidth;

    return [
      // Coin supérieur droit, juste sous le header (partiellement hors écran)
      { top: H * 0.05,  left: W * 0.94 - 20 },
      // Section about, bord gauche (caché derrière le bord)
      { top: H * 0.20,  left: 4 },
      // Zone mini-jeu / journey, côté droit
      { top: H * 0.42,  left: W * 0.91 - 20 },
      // Section projets, bord gauche bas
      { top: H * 0.63,  left: 6 },
      // Footer, coin droit
      { top: H * 0.90,  left: W * 0.92 - 20 },
    ];
  }

  function eggSVG(c) {
    return `<svg viewBox="0 0 36 44" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="24" rx="16" ry="20" fill="${c.body}"/>
      <path d="M4 20 Q18 14 32 20" stroke="${c.stripe}" stroke-width="3" fill="none"/>
      <path d="M5 27 Q18 21 31 27" stroke="${c.stripe}" stroke-width="2" fill="none" opacity=".6"/>
      <ellipse cx="13" cy="16" rx="4" ry="3" fill="rgba(255,255,255,.28)" transform="rotate(-20 13 16)"/>
    </svg>`;
  }

  function startHunt() {
    if (huntOn) return;
    huntOn = true; foundCnt = 0;

    for (let i = 0; i < 5; i++) {
      const d = document.getElementById("ef-dot-"+i);
      if (d) { d.classList.remove("got"); d.style.background=""; d.style.borderColor=""; }
    }

    bg.classList.add("show");
    rabbit.classList.remove("show");
    bubble.classList.remove("show");
    placeEggs();
    hud.classList.add("on");
    winPanel.classList.remove("on");
  }

  function stopHunt() {
    huntOn = false; foundCnt = 0;
    hud.classList.remove("on");
    winPanel.classList.remove("on");
    document.querySelectorAll(".ef-egg, .ef-hint").forEach(e => e.remove());
    bg.classList.remove("show");
    if (rabbitRevealed) rabbit.classList.add("show");
  }

  function placeEggs() {
    document.querySelectorAll(".ef-egg, .ef-hint").forEach(e => e.remove());

    const positions = getEggPositions();

    positions.forEach((pos, i) => {
      const hint = document.createElement("div");
      hint.className = "ef-hint";
      hint.style.cssText = `left:${pos.left + 14}px; top:${pos.top + 40}px;`;
      document.body.appendChild(hint);

      const egg = document.createElement("div");
      egg.className = "ef-egg";
      egg.style.cssText = `left:${pos.left}px; top:${pos.top}px;`;
      egg.innerHTML = eggSVG(EGG_COLORS[i]);
      egg.addEventListener("click", () => collect(egg, hint, i));
      document.body.appendChild(egg);

      setTimeout(() => {
        egg.classList.add("visible");
        hint.classList.add("visible");
      }, 200 + i * 140);
    });
  }

  function collect(egg, hint, idx) {
    if (egg.classList.contains("found")) return;
    egg.classList.add("found");
    if (hint) hint.style.opacity = "0";
    foundCnt++;

    const dot = document.getElementById("ef-dot-"+(foundCnt-1));
    if (dot) {
      dot.classList.add("got");
      dot.style.background  = EGG_COLORS[idx].body;
      dot.style.borderColor = EGG_COLORS[idx].stripe;
    }

    const r = egg.getBoundingClientRect();
    burst(r.left + r.width/2, r.top + r.height/2, EGG_COLORS[idx].body);

    if (foundCnt >= 5) setTimeout(victory, 650);
  }

  function burst(cx, cy, color) {
    for (let i = 0; i < 16; i++) {
      const p = document.createElement("div");
      p.className = "ef-particle";
      const a = (i/16)*Math.PI*2, d = 45+Math.random()*65;
      p.style.cssText = `left:${cx}px;top:${cy}px;background:${color};
        animation-duration:${.4+Math.random()*.5}s;`;
      p.style.setProperty("--dx", Math.cos(a)*d+"px");
      p.style.setProperty("--dy", Math.sin(a)*d+"px");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 950);
    }
  }

  function victory() {
    winPanel.classList.add("on");
    const cols = EGG_COLORS.map(c => c.body);
    for (let i = 0; i < 90; i++) {
      setTimeout(() => {
        const p = document.createElement("div");
        p.className = "ef-confetti";
        const size = 5+Math.random()*9;
        p.style.cssText = `
          left:${Math.random()*100}vw; top:-10px;
          width:${size}px; height:${size}px;
          border-radius:${Math.random()>.5?"50%":"2px"};
          background:${cols[Math.floor(Math.random()*cols.length)]};
          animation-duration:${2+Math.random()*2}s;`;
        p.style.setProperty("--tx", (Math.random()*160-80)+"px");
        p.style.setProperty("--rot", Math.random()*720+"deg");
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 4200);
      }, i*35);
    }
  }

})();