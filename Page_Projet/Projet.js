/* ================================================================
   DONNÉES
================================================================ */
const PROJECTS = [
    //P1
    {
        name: "Pokemon Console",
        tags: ["cs", "1sem"],
        description: "Défi d’une semaine : créer un Pokémon‑like jouable en console, développé en trinôme pour retrouver l’esprit des jeux de notre enfance. La responsabilité portait sur la gestion complète de la carte et des déplacements du joueur, avec un système d’interaction permettant de ramasser des objets disséminés dans le monde. La logique des dresseurs ennemis a également été mise en place : détection du joueur, déclenchement automatique des combats et transitions de scène fluides pour assurer une expérience cohérente malgré les contraintes d’un jeu entièrement textuel.",
        media: [
            { type: "image", src: "../Image/PokemonMinia.png" },
            { type: "video", src: "../Video/videoPokemon.mp4" },
        ],
        github: "https://github.com/Bonus012/Pokemon-Console-Cs", cahier: "../Pdf/CDC_Bases_du_Cs_1.pdf", youtube: "https://youtu.be/YuVpi7J5FUg",
    },
    //P2
    {
        name: "Projet Sauvegarde",
        tags: ["cs", "unity", "1sem"],
        description: "Le but de ce projet était de concevoir une base de données capable de stocker l’ensemble des statistiques du joueur de manière structurée et fiable. Nous avons mis en place un système permettant d’enregistrer automatiquement ces données au fil de la progression. Enfin, nous avons développé une fonctionnalité de chargement permettant de restaurer l’état complet du joueur à chaque lancement du jeu.  PS : Pas de github puisque il y'a la clé API google de mon coéquipier dans firebase",
        media: [
            { type: "image", src: "../Image/Save1.png" },
            { type: "image", src: "../Image/Save2.png" },
        ],
        cahier: "../Pdf/CDC Persistance des données 2.pdf",
    },
    //P3
    {
        name: "Switchbound",
        tags: ["cpp", "2sem", "unreal"],
        description: "Jeu solo mêlant escape game et aventure, reposant sur un système de changement de personnage instantané, avec un gameplay asymétrique (robot agile et furtif / robot lourd orienté force brute et vitesse), incluant la conception et l’intégration de l’architecture de gameplay, des interactions, des compétences, des transitions entre personnages, ainsi que le développement de la logique C++ et Blueprints pour un système fluide et modulaire",
        media: [
            { type: "image", src: "../Image/Switchbound.png" },
            { type: "gif", src: "../Video/SwitchboundGIF.mp4" },
        ],
        github: "https://github.com/Bonus012/Switchbound_Unreal", cahier: "../Pdf/CDC_BlueprintsCpp.pdf", youtube: "https://youtu.be/HYMIHXcsBx8"
    },
    //P4
    {
        name: "Generation Procedurale",
        tags: ["cs", "unity", "1sem"],
        description: "Ce projet, développé en une semaine, consistait à créer un jeu procédural capable de générer un monde dynamique et renouvelé à chaque partie. Je me suis chargé de toute la partie technique liée à la génération procédurale : création du terrain, gestion des chunks, système de creusage et de placement de blocs, ainsi que l’optimisation de ces mécaniques pour garantir une expérience fluide. De son côté, mon coéquipier a développé les ennemis, l’inventaire et le système de combat, ce qui nous a permis de construire un prototype complet mêlant exploration, action et construction.",
        media: [
            { type: "image", src: "../Image/GenPro_1.png" },
            { type: "gif", src: "../Video/Jeu_StrangerariaGIF.mp4" },
            { type: "image", src: "../Image/GenPro_2.png" },
            { type: "image", src: "../Image/GenPro_3.png" },
        ],
        github: "https://github.com/Bonus012/Generation_Procedural", itch: null, cahier: "../Pdf/CDC_Génération_Procedurale_4.pdf", youtube: "https://youtu.be/Xd8QVbwEI64"
    },
    //P5
    {
        name: "The Hundreth Ascend",
        tags: ["unity", "cs", "1sem"],
        description: "Ce projet 3C avait pour objectif de mettre en place un système complet de contrôle du personnage, de la caméra et du gameplay. Nous avons choisi d’aller plus loin que les attentes initiales en ajoutant un mode multijoueur local. De mon côté, je me suis occupé de toute la génération aléatoire de la map, de la création des héros modulaires ainsi que du système de capacités modulaires. Mon coéquipier, lui, a géré l’intégration du multijoueur local, la caméra et l’ensemble des transitions, ce qui nous a permis de construire une expérience cohérente et dynamique.",
        media: [
            { type: "image", src: "../Image/ProjMultiLocal_1.png" },
            { type: "video", src: "../Video/TheHundrethAscentDemo.mp4" },
            { type: "image", src: "../Image/ProjMultiLocal_2.png" },
        ],
        github: "https://github.com/Bonus012/Projet_3C_The_Hundreth_Ascend", cahier: "../Pdf/CDC_3C_5.pdf",
    },
    //P6
    {
        name: "Mafia War",
        tags: ["unity", "cs", "solo", "1sem"],
        description: "Il s’agit d’un jeu entièrement réalisé en UI sur Unity, inspiré d’Age of War et de Plants vs Zombies. L’objectif était de recréer un gameplay stratégique basé sur la gestion de lignes, les unités et la progression, mais sans utiliser de sprites ou de scènes 2D classiques : tout est construit en interface. Ce choix nous a permis d’explorer une approche différente du game design, centrée sur la lisibilité, la modularité et la réactivité de l’UI.",
        media: [
            { type: "image", src: "../Image/MafiaWar_1.png" },
            { type: "gif", src: "../Video/MafiaWarGIF.mp4" },
            { type: "image", src: "../Image/MafiaWar_2.png" },
            { type: "image", src: "../Image/MafiaWar_3.png" },
        ],
        github: "https://github.com/Bonus012/Projet_UI-UX_MafiaWar", cahier: "../Pdf/CDC_UI_UX 6.pdf", youtube: "https://youtu.be/TIXvuEBVxH4"
    },
    //P7
    {
        name: "Projet Shader",
        tags: ["unity", "cs", "solo", "1sem"],
        description: "Il s’agit d’un petit jeu conçu pour mettre en valeur les shaders Unity et approfondir la maîtrise de Shader Graph. L’objectif était d’expérimenter différents effets visuels, de comprendre leur fonctionnement interne et d’apprendre à créer des matériaux dynamiques et stylisés. Ce projet nous a permis d’explorer la logique des graphes, d’optimiser les rendus et de mieux comprendre le pipeline visuel d’Unity.",
        media: [
            { type: "image", src: "../Image/Shader.png" },
            { type: "gif", src: "../Video/ShaderGIF.mp4" },
        ],
        github: "https://github.com/Bonus012/Projet_Shader", cahier: "../Pdf/CDC_Shader_7.pdf", youtube: "https://youtu.be/WvyUmPnesEA"
    },
    //P8
    {
        name: "Defi de 3 jours",
        tags: ["cs", "unity", "solo"],
        description: "Objectif du projet : me challenger en développant un jeu où tous les modèles 3D sont générés par script, accompagnés d’une physique entièrement codée à la main. Un exercice complet mêlant algorithmie, mathématiques, optimisation et création procédurale.",
        media: [
            { type: "image", src: "../Image/cylindre.png" },
            { type: "gif", src: "../Video/cylindreGIF.mp4" },
        ],
        github: "https://github.com/Bonus012/MiniJeu3jours",
    },
    //P9
    {
        name: "Project FPS",
        tags: ["cs", "unity", "1sem"],
        description: "Le but de ce projet était de créer un FPS satisfaisant, centré sur des sensations de tir percutantes et un maximum de feedback visuel et sonore. Nous avons réparti le travail de manière complémentaire : je me suis occupé de toute la gestion des armes et du système de tir, ainsi que de la boutique d’armes et du système d’équipement modulaire, tandis que mon coéquipier a conçu la map et développé le robot ennemi ainsi que son comportement de mort. Ensemble, nous avons construit une expérience dynamique et cohérente, où chaque élément contribue à renforcer le feeling du gameplay.",
        media: [{ type: "image", src: "https://placehold.co/800x450/0f1a10/22c55e?text=Screenshot+1" }],
        github: "https://github.com/", cahier: "../Pdf/CDC_FPS_3.pdf",
    },
    //P10
    {
        name: "Spacefish Shooter",
        tags: ["cpp", "2sem"],
        description: "Shooter réalisé à trois, entièrement en C++ avec SFML. Assets faits maison. Je me suis occupé des collisions, du combat, du système de vie, du boss, des crédits et de la DA.",
        media: [
            { type: "image", src: "../Image/Spacefishshooter.png" },
            { type: "gif", src: "../Video/video-shootthemupGIF.mp4" },
        ],
        youtube: "https://youtu.be/Dzm9YcMz0ZI",
    },
    //P11
    {
        name: "Lost in Palm",
        tags: ["cpp", "2sem", "solo"],
        description: "Ce projet réalisé avec SFML consistait à développer un petit jeu en 2D reposant sur une gestion précise des tiles et de l’environnement. J’ai pris en charge la mise en place du système de tuiles, ainsi que les mécaniques de creusage, de coupe d’arbres et de minage. Puis pour finir, j'ai travaillé sur les animaux et leur IA, ce qui a permis de donner vie au monde et d’enrichir l’expérience de jeu.",
        media: [
            { type: "image", src: "../Image/Lostinpalm.png" },
            { type: "gif", src: "../Video/VideoJeu1LostInPalmGIF.mp4" },
        ],
        youtube: "https://youtu.be/I9j3Uwnz9vc",
    },
];

const TAG_META = {
    unity: { label: "Unity", cls: "ptag-unity" },
    unreal: { label: "Unreal Engine", cls: "ptag-unreal" },
    cpp: { label: "C++", cls: "ptag-cpp" },
    cs: { label: "C#", cls: "ptag-cs" },
    "1sem": { label: "1 Semaine", cls: "ptag-1sem" },
    "2sem": { label: "2 Semaines", cls: "ptag-2sem" },
    solo: { label: "Solo", cls: "ptag-solo" },
};

function makeTags(tags) {
    return tags.map(t => {
        const m = TAG_META[t] || { label: t, cls: "" };
        return `<span class="ptag ${m.cls}">${m.label}</span>`;
    }).join("");
}

/* ── BUILD CARDS ── */
const grid = document.getElementById("projectsGrid");
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
    el.style.top = rect.top + "px";
    el.style.left = rect.left + "px";
    el.style.width = rect.width + "px";
    el.style.height = rect.height + "px";

    el.innerHTML = `
        <button class="exp-close" id="expClose">✕</button>
        <div class="exp-content">
            <div class="exp-media">
                ${p.media.map(m => {
        if (m.type === "image") return `<img src="${m.src}" alt="${p.name}" loading="lazy"/>`;
        if (m.type === "video") return `<video src="${m.src}" controls></video>`;
        if (m.type === "gif") return `<video src="${m.src}" autoplay loop muted playsinline></video>`;
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
                    ${p.cahier ? `<a href="${p.cahier}" class="btn btn-primary" target="_blank">📄 Cahier des charges</a>` : ""}
                    ${p.github ? `<a href="${p.github}" class="btn btn-ghost" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        GitHub</a>` : ""}
                    ${p.itch ? `<a href="${p.itch}" class="btn btn-ghost btn-itch" target="_blank">🎮 Tester sur itch.io</a>` : ""}
                    ${p.youtube ? `<a href="${p.youtube}" class="btn btn-ghost btn-yt" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Voir gameplay complet</a>` : ""}
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
            const padding = vw < 600 ? 12 : 32;
            const targetW = Math.min(900, vw - padding * 2);
            const targetH = Math.min(vh - padding * 2, vw < 600 ? vh * 0.9 : 720);
            const targetL = (vw - targetW) / 2;
            const targetT = (vh - targetH) / 2;

            el.style.top = targetT + "px";
            el.style.left = targetL + "px";
            el.style.width = targetW + "px";
            el.style.height = targetH + "px";
            el.style.borderRadius = "24px";

            setTimeout(() => el.classList.add("show-content"), 420);
        });
    });

    el.querySelector("#expClose").addEventListener("click", collapseCard);
    document.addEventListener("keydown", onEscape);
}

function collapseCard() {
    if (!expandedEl || !originCard) return;

    const el = expandedEl;
    const card = originCard;

    el.classList.remove("show-content");
    const rect = card.getBoundingClientRect();

    setTimeout(() => {
        el.classList.remove("animating");
        el.classList.add("closing");

        el.style.top = rect.top + "px";
        el.style.left = rect.left + "px";
        el.style.width = rect.width + "px";
        el.style.height = rect.height + "px";
        el.style.borderRadius = "18px";
        el.style.opacity = "0";

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
    const c = document.getElementById("particles");
    const ctx = c.getContext("2d");
    let W, H;
    const pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + .3,
        dx: (Math.random() - .5) * .28,
        dy: (Math.random() - .5) * .28,
        a: Math.random() * .55 + .1,
    }));

    function resize() {
        W = c.width = window.innerWidth;
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