/* ================================================================
   DONNÉES
================================================================ */
const PROJECTS = [
    {
        name: "Project Alpha",
        tags: ["unity", "cs"],
        description: "Un jeu de plateforme 2D développé sous Unity avec un système de dialogue dynamique, de la génération procédurale de niveaux et une IA ennemie basée sur des arbres de comportement. Le projet explore la narration interactive et les mécaniques de roguelite.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a2040/5b8cff?text=Screenshot+1" },
            { type: "image", src: "https://placehold.co/800x450/1a2040/5b8cff?text=Screenshot+2" },
        ],
        github: "https://github.com/", itch: "https://itch.io/", cahier: "#",
    },
    {
        name: "Project Beta",
        tags: ["unreal", "cpp"],
        description: "Un FPS sous Unreal Engine 5 utilisant Lumen et Nanite. Gameplay inspiré de l'immersive sim avec des interactions physiques poussées, un système d'inventaire custom en C++ et un éditeur de niveaux procédural.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a1a2e/a855f7?text=Screenshot+1" },
            { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        github: "https://github.com/", itch: "https://itch.io/", cahier: "#",
    },
    {
        name: "Project Gamma",
        tags: ["godot", "python"],
        description: "Un RPG top-down développé sous Godot 4, associé à des outils Python pour la génération automatique de cartes via bruit de Perlin. Interface de debug et pipeline d'assets entièrement automatisé.",
        media: [{ type: "image", src: "https://placehold.co/800x450/0f1a10/22c55e?text=Screenshot+1" }],
        github: "https://github.com/", itch: "https://itch.io/", cahier: "#",
    },
    {
        name: "Project Delta",
        tags: ["opengl", "cpp"],
        description: "Un moteur de rendu 3D minimaliste from scratch en OpenGL et C++. Implémentation d'un pipeline de deferred rendering, shadow mapping, SSAO et post-processing. Exercice académique sur les APIs graphiques bas niveau.",
        media: [{ type: "image", src: "https://placehold.co/800x450/1a1010/ef4444?text=Screenshot+1" }],
        github: "https://github.com/", itch: null, cahier: "#",
    },
    {
        name: "Project Epsilon",
        tags: ["unity", "cs"],
        description: "Un puzzle-game VR développé avec Unity XR Interaction Toolkit. Le joueur manipule des objets physiques pour résoudre des énigmes dans un environnement minimaliste. Prise en charge Meta Quest 2 & 3.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/101a2a/38bdf8?text=Screenshot+1" },
            { type: "image", src: "https://placehold.co/800x450/101a2a/38bdf8?text=Screenshot+2" },
        ],
        github: "https://github.com/", itch: "https://itch.io/", cahier: "#",
    },
    {
        name: "Project Zeta",
        tags: ["unreal", "cpp", "python"],
        description: "Un prototype de simulation RTS sous Unreal Engine 5. L'IA des unités repose sur un système de pathfinding A* custom. Des scripts Python gèrent la pipeline de build et les tests automatisés.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a1520/f59e0b?text=Screenshot+1" },
            { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        github: "https://github.com/", itch: "https://itch.io/", cahier: "#",
    },
];

const TAG_META = {
    unity:  { label: "Unity",         cls: "ptag-unity"  },
    unreal: { label: "Unreal Engine",  cls: "ptag-unreal" },
    cpp:    { label: "C++",            cls: "ptag-cpp"    },
    cs:     { label: "C#",             cls: "ptag-cs"     },
    python: { label: "Python",         cls: "ptag-python" },
    godot:  { label: "Godot",          cls: "ptag-godot"  },
    opengl: { label: "OpenGL",         cls: "ptag-opengl" },
};

function makeTags(tags) {
    return tags.map(t => {
        const m = TAG_META[t] || { label: t, cls: "" };
        return `<span class="ptag ${m.cls}">${m.label}</span>`;
    }).join("");
}

/* ── BUILD CARDS ── */
const grid  = document.getElementById("projectsGrid");
const noRes = document.getElementById("noResults");

PROJECTS.forEach((p, i) => {
    const thumb = p.media[0]?.type === "image"
        ? p.media[0].src
        : `https://placehold.co/600x340/10121a/5b8cff?text=${encodeURIComponent(p.name)}`;

    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.tags = p.tags.join(" ");
    card.dataset.id = i;
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
        <div class="card-img">
            <img src="${thumb}" alt="${p.name}" loading="lazy"/>
            <div class="card-img-overlay"><span>Voir les détails →</span></div>
        </div>
        <div class="card-body">
            <h3 class="card-name">${p.name}</h3>
            <div class="card-tags">${makeTags(p.tags)}</div>
        </div>`;
    card.addEventListener("click", () => expandCard(card, i));
    grid.appendChild(card);
});

/* ── FILTER ── */
document.getElementById("filterWrapper").addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    let visible = 0;
    document.querySelectorAll(".project-card").forEach(card => {
        const show = tag === "all" || card.dataset.tags.split(" ").includes(tag);
        card.classList.toggle("hidden", !show);
        if (show) visible++;
    });
    noRes.style.display = visible ? "none" : "block";
});

/* ════════════════════════════════════════
   EXPAND CARD
════════════════════════════════════════ */
let expandedEl = null;
let originCard = null;

function expandCard(card, idx) {
    if (expandedEl) return;
    const p = PROJECTS[idx];

    const rect = card.getBoundingClientRect();

    const el = document.createElement("div");
    el.className = "expanded-card";
    el.style.top    = rect.top    + "px";
    el.style.left   = rect.left   + "px";
    el.style.width  = rect.width  + "px";
    el.style.height = rect.height + "px";

    el.innerHTML = `
        <button class="exp-close" id="expClose">✕</button>
        <div class="exp-content">
            <div class="exp-media">
                ${p.media.map(m => {
                    if (m.type === "image")   return `<img src="${m.src}" alt="${p.name}" loading="lazy"/>`;
                    if (m.type === "video")   return `<video src="${m.src}" controls></video>`;
                    if (m.type === "youtube") return `<iframe src="${m.src}" title="YouTube" frameborder="0" allowfullscreen></iframe>`;
                    return "";
                }).join("")}
            </div>
            <div class="exp-info">
                <div class="exp-header">
                    <h2 class="exp-title">${p.name}</h2>
                    <div class="exp-tags">${makeTags(p.tags)}</div>
                </div>
                <p class="exp-desc">${p.description}</p>
                <div class="exp-actions">
                    <a href="${p.cahier || '#'}" class="btn btn-primary" target="_blank">📄 Cahier des charges</a>
                    ${p.github ? `<a href="${p.github}" class="btn btn-ghost" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        GitHub</a>` : ""}
                    ${p.itch ? `<a href="${p.itch}" class="btn btn-ghost btn-itch" target="_blank">🎮 Tester sur itch.io</a>` : ""}
                </div>
            </div>
        </div>`;

    document.body.appendChild(el);
    expandedEl = el;
    originCard = card;

    card.classList.add("is-expanded");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.classList.add("animating");

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const padding  = vw < 600 ? 12 : 32;
            const targetW  = Math.min(900, vw - padding * 2);
            const targetH  = Math.min(vh - padding * 2, vw < 600 ? vh * 0.9 : 720);
            const targetL  = (vw - targetW) / 2;
            const targetT  = (vh - targetH) / 2;

            el.style.top          = targetT + "px";
            el.style.left         = targetL + "px";
            el.style.width        = targetW + "px";
            el.style.height       = targetH + "px";
            el.style.borderRadius = "24px";

            setTimeout(() => el.classList.add("show-content"), 420);
        });
    });

    el.querySelector("#expClose").addEventListener("click", collapseCard);
    document.addEventListener("keydown", onEscape);
}

function collapseCard() {
    if (!expandedEl || !originCard) return;

    const el   = expandedEl;
    const card = originCard;

    el.classList.remove("show-content");
    const rect = card.getBoundingClientRect();

    setTimeout(() => {
        el.classList.remove("animating");
        el.classList.add("closing");

        el.style.top          = rect.top    + "px";
        el.style.left         = rect.left   + "px";
        el.style.width        = rect.width  + "px";
        el.style.height       = rect.height + "px";
        el.style.borderRadius = "18px";
        el.style.opacity      = "0";

        setTimeout(() => {
            el.remove();
            card.classList.remove("is-expanded");
            document.body.classList.remove("modal-open");
            document.body.style.overflow = "";
            expandedEl = null;
            originCard = null;
        }, 420);
    }, 150);

    document.removeEventListener("keydown", onEscape);
}

function onEscape(e) {
    if (e.key === "Escape") collapseCard();
}

/* ── NAV TOGGLE ── */
document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
});

/* ── PARTICLES ── */
(function () {
    const c   = document.getElementById("particles");
    const ctx = c.getContext("2d");
    let W, H;
    const pts = Array.from({ length: 90 }, () => ({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        r:  Math.random() * 1.4 + .3,
        dx: (Math.random() - .5) * .28,
        dy: (Math.random() - .5) * .28,
        a:  Math.random() * .55 + .1,
    }));

    function resize() {
        W = c.width  = window.innerWidth;
        H = c.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    (function tick() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(91,140,255,${p.a})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        requestAnimationFrame(tick);
    })();
})();