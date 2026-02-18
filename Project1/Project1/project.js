/* ===========================
   PROJET.JS
=========================== */

// ── DATA ──────────────────────────────────────────────────────────────────
// Complète ces objets avec tes vrais projets.
// media: tableau de { type: "image"|"video"|"youtube", src: "..." }
const PROJECTS = [
    {
        id: 0,
        name: "Project Alpha",
        tags: ["unity", "c#"],
        description:
            "Un jeu de plateforme 2D développé sous Unity avec un système de dialogue dynamique, de la génération procédurale de niveaux et une IA ennemie basée sur des arbres de comportement. Le projet explore la narration interactive et les mécaniques de roguelite.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a2040/5b8cff?text=Screenshot+1" },
            { type: "image", src: "https://placehold.co/800x450/1a2040/5b8cff?text=Screenshot+2" },
        ],
        github: "https://github.com/",
        itch: "https://itch.io/",
        cahier: "#",
    },
    {
        id: 1,
        name: "Project Beta",
        tags: ["unreal", "c++"],
        description:
            "Un FPS technique sous Unreal Engine 5 utilisant Lumen et Nanite. Gameplay inspiré de l'immersive sim avec des interactions physiques poussées, un système d'inventaire custom en C++ et un éditeur de niveaux procédural.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a1a2e/a855f7?text=Screenshot+1" },
            { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        github: "https://github.com/",
        itch: "https://itch.io/",
        cahier: "#",
    },
    {
        id: 2,
        name: "Project Gamma",
        tags: ["godot", "python"],
        description:
            "Un RPG top-down développé sous Godot 4 avec GDScript, associé à des outils Python pour la génération automatique de cartes via algorithmes de bruit de Perlin. Interface de debug et pipeline d'assets entièrement automatisé.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/0f1a10/22c55e?text=Screenshot+1" },
            { type: "image", src: "https://placehold.co/800x450/0f1a10/22c55e?text=Screenshot+2" },
        ],
        github: "https://github.com/",
        itch: "https://itch.io/",
        cahier: "#",
    },
    {
        id: 3,
        name: "Project Delta",
        tags: ["opengl", "c++"],
        description:
            "Un moteur de rendu 3D minimaliste from scratch en OpenGL et C++. Implémentation d'un pipeline de deferred rendering, shadow mapping, SSAO, et post-processing. Exercice académique de bas niveau sur les APIs graphiques.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a1010/ef4444?text=Screenshot+1" },
        ],
        github: "https://github.com/",
        itch: null,
        cahier: "#",
    },
    {
        id: 4,
        name: "Project Epsilon",
        tags: ["unity", "c#"],
        description:
            "Un puzzle-game VR développé avec Unity XR Interaction Toolkit. Le joueur manipule des objets physiques pour résoudre des énigmes logiques dans un environnement minimaliste et épuré. Prise en charge Meta Quest 2 & 3.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/101a2a/38bdf8?text=Screenshot+1" },
            { type: "image", src: "https://placehold.co/800x450/101a2a/38bdf8?text=Screenshot+2" },
        ],
        github: "https://github.com/",
        itch: "https://itch.io/",
        cahier: "#",
    },
    {
        id: 5,
        name: "Project Zeta",
        tags: ["unreal", "c++", "python"],
        description:
            "Un prototype de simulation RTS sous Unreal Engine 5. L'IA des unités repose sur un système de pathfinding A* custom. Des scripts Python gèrent la pipeline de build et les tests automatisés des comportements ennemis.",
        media: [
            { type: "image", src: "https://placehold.co/800x450/1a1520/f59e0b?text=Screenshot+1" },
            { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ],
        github: "https://github.com/",
        itch: "https://itch.io/",
        cahier: "#",
    },
];

// ── PARTICLES ─────────────────────────────────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.5 + 0.3,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            a: Math.random() * 0.6 + 0.1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(91,140,255,${p.a})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ── NAV TOGGLE ─────────────────────────────────────────────────────────────
(function initNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
        links.classList.toggle("nav__links--open");
    });
})();

// ── FILTER ─────────────────────────────────────────────────────────────────
(function initFilter() {
    const btns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const noRes = document.getElementById("noResults");
    let active = "all";

    function applyFilter() {
        let visible = 0;
        cards.forEach((card) => {
            const cardTags = card.dataset.tags.split(" ");
            const show = active === "all" || cardTags.includes(active);
            card.classList.toggle("hidden", !show);
            if (show) visible++;
        });
        noRes.hidden = visible > 0;
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            active = btn.dataset.tag;
            applyFilter();
        });
    });
})();

// ── MODAL ──────────────────────────────────────────────────────────────────
(function initModal() {
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("modalClose");
    const mediaEl = document.getElementById("modalMedia");
    const titleEl = document.getElementById("modalTitle");
    const tagsEl = document.getElementById("modalTags");
    const descEl = document.getElementById("modalDescription");
    const cahierEl = document.getElementById("modalCahier");
    const githubEl = document.getElementById("modalGithub");
    const itchEl = document.getElementById("modalItch");

    const TAG_CLASSES = {
        "unity": "ptag--unity",
        "unreal": "ptag--unreal",
        "c++": "ptag--cpp",
        "c#": "ptag--cs",
        "python": "ptag--python",
        "godot": "ptag--godot",
        "opengl": "ptag--opengl",
    };

    function openModal(project) {
        // Title
        titleEl.textContent = project.name;

        // Tags
        tagsEl.innerHTML = project.tags
            .map((t) => `<span class="ptag ${TAG_CLASSES[t] || ""}">${t}</span>`)
            .join("");

        // Description
        descEl.textContent = project.description;

        // Media
        mediaEl.innerHTML = project.media
            .map((m) => {
                if (m.type === "image") return `<img src="${m.src}" alt="${project.name}" loading="lazy" />`;
                if (m.type === "video") return `<video src="${m.src}" controls></video>`;
                if (m.type === "youtube") return `<iframe src="${m.src}" title="YouTube" frameborder="0" allowfullscreen></iframe>`;
                return "";
            })
            .join("");

        // Buttons
        cahierEl.href = project.cahier || "#";

        if (project.github) {
            githubEl.href = project.github;
            githubEl.style.display = "";
        } else {
            githubEl.style.display = "none";
        }

        if (project.itch) {
            itchEl.href = project.itch;
            itchEl.style.display = "";
        } else {
            itchEl.style.display = "none";
        }

        // Open
        overlay.setAttribute("aria-hidden", "false");
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        // Stop any video/iframe
        setTimeout(() => { mediaEl.innerHTML = ""; }, 300);
    }

    // Bind cards
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
            const project = PROJECTS[parseInt(card.dataset.id, 10)];
            if (project) openModal(project);
        });
    });

    // Close controls
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
})();