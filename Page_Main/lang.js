/* ================================================================
   SYSTÈME DE TRADUCTION — lang.js
   Inclure ce fichier dans toutes les pages
================================================================ */

const TRANSLATIONS = {
    fr: {
        // NAV
        nav_journey: "Parcours",
        nav_projects: "Projets",
        nav_contact: "Contact",
        nav_home: "Accueil",

        // INDEX — Hero
        hero_seeking: "Recherche un stage",
        hero_desc: "Spécialisé en C#, Unity et systèmes procéduraux, je crée des jeux et des projets toujours plus ambitieux.",
        hero_btn_projects: "Voir mes projets",
        hero_btn_cv: "Mon CV",
        hero_btn_contact: "Me contacter",

        // INDEX — Outils & Expériences
        section_tools: "Mes Outils",
        section_xp: "Mes Expériences",
        xp_coursier: "Coursier.fr — Livreur",
        xp_raffin: "Henri Raffin - Embossage",

        // INDEX — Parcours
        journey_title: "Mon Parcours",
        journey_eyebrow: "Une trajectoire en constante évolution",
        tl_0_title: "Premiers Scripts", tl_0_sub: "Le début de tout", tl_0_desc: "Découverte du code via scratch, réalisation d'un tas de petits jeux.",
        tl_1_title: "BAC", tl_1_sub: "STI2D", tl_1_desc: "Options Energie et Environnement, Lycée Pierre Termier à Grenoble",
        tl_2_title: "Gaming Campus", tl_2_sub: "Lyon", tl_2_desc: "Entrée au Gaming Campus, je découvre le code en profondeur",
        tl_3_title: "Apprentissage", tl_3_sub: "C++ / C#", tl_3_desc: "J'acquiers beaucoup de compétences dans différents domaines",
        tl_4_title: "3ème Année", tl_4_sub: "Unity", tl_4_desc: "Unity Avancée, Systèmes procéduraux, Systèmes modulaires, j'ai acquis de très bonnes bases en programmation",
        tl_5_title: "Recherche Stage", tl_5_sub: "Prêt pour l'industrie", tl_5_desc: "Portfolio complet, A la recherche d'une première expérience pro.",

        // INDEX — Carousel
        projects_title: "Quelques Projets",
        carousel_see_all: "Voir tous les projets",
        carousel_github: "Voir sur GitHub",
        slide1_title: "Strangeraria",
        slide1_desc: "Ce projet, développé en une semaine, consistait à créer un jeu procédural capable de générer un monde dynamique et renouvelé à chaque partie.",
        slide2_title: "SpacefishShooter",
        slide2_desc: "Shooter réalisé à trois, entièrement en C++ avec SFML. Assets faits maison. Je me suis occupé des collisions, du combat, du système de vie, du boss, des crédits et de la DA.",

        // FOOTER
        footer_copy: "© 2025 — Elouan Bouché",
        // CONTACT PAGE
        contact_page_title: "Contact — Elouan Bouché",
        contact_label: "Prendre contact",
        contact_title: "Travaillons<br>ensemble.",
        contact_sub: "Disponible pour des collaborations, des opportunités de stage ou simplement pour échanger autour du dev et du jeu vidéo.",
        contact_divider: "ou",
        contact_btn: "Envoyer un message",
        contact_linkedin_handle: "Elouan Bouché",

        // PROJET PAGE
        proj_page_title: "Projets - Elouan Bouché",
        proj_hero_title: "Mes",
        proj_hero_title_span: "Projets",
        proj_hero_sub: "Une sélection de mes réalisations en développement de jeux et logiciels.",
        filter_all: "Tous",
        filter_1sem: "1 Semaine",
        filter_2sem: "2 Semaines",
        filter_solo: "Solo",
        no_results: "Aucun projet pour ce filtre.",
        btn_cahier: "📄 Cahier des charges",
        btn_gameplay: "Voir gameplay complet",
        btn_test_itch: "🎮 Tester sur itch.io",

        // PROJETS descriptions
        p1_desc: "Défi d'une semaine : créer un Pokémon‑like jouable en console, développé en trinôme pour retrouver l'esprit des jeux de notre enfance. La responsabilité portait sur la gestion complète de la carte et des déplacements du joueur, avec un système d'interaction permettant de ramasser des objets disséminés dans le monde. La logique des dresseurs ennemis a également été mise en place : détection du joueur, déclenchement automatique des combats et transitions de scène fluides pour assurer une expérience cohérente malgré les contraintes d'un jeu entièrement textuel.",
        p2_desc: "Le but de ce projet était de concevoir une base de données capable de stocker l'ensemble des statistiques du joueur de manière structurée et fiable. Nous avons mis en place un système permettant d'enregistrer automatiquement ces données au fil de la progression. Enfin, nous avons développé une fonctionnalité de chargement permettant de restaurer l'état complet du joueur à chaque lancement du jeu.  PS : Pas de github puisque il y'a la clé API google de mon coéquipier dans firebase",
        p3_desc: "Jeu solo mêlant escape game et aventure, reposant sur un système de changement de personnage instantané, avec un gameplay asymétrique (robot agile et furtif / robot lourd orienté force brute et vitesse), incluant la conception et l'intégration de l'architecture de gameplay, des interactions, des compétences, des transitions entre personnages, ainsi que le développement de la logique C++ et Blueprints pour un système fluide et modulaire",
        p4_desc: "Ce projet, développé en une semaine, consistait à créer un jeu procédural capable de générer un monde dynamique et renouvelé à chaque partie. Je me suis chargé de toute la partie technique liée à la génération procédurale : création du terrain, gestion des chunks, système de creusage et de placement de blocs, ainsi que l'optimisation de ces mécaniques pour garantir une expérience fluide. De son côté, mon coéquipier a développé les ennemis, l'inventaire et le système de combat, ce qui nous a permis de construire un prototype complet mêlant exploration, action et construction.",
        p5_desc: "Ce projet 3C avait pour objectif de mettre en place un système complet de contrôle du personnage, de la caméra et du gameplay. Nous avons choisi d'aller plus loin que les attentes initiales en ajoutant un mode multijoueur local. De mon côté, je me suis occupé de toute la génération aléatoire de la map, de la création des héros modulaires ainsi que du système de capacités modulaires. Mon coéquipier, lui, a géré l'intégration du multijoueur local, la caméra et l'ensemble des transitions, ce qui nous a permis de construire une expérience cohérente et dynamique.",
        p6_desc: "Il s'agit d'un jeu entièrement réalisé en UI sur Unity, inspiré d'Age of War et de Plants vs Zombies. L'objectif était de recréer un gameplay stratégique basé sur la gestion de lignes, les unités et la progression, mais sans utiliser de sprites ou de scènes 2D classiques : tout est construit en interface. Ce choix nous a permis d'explorer une approche différente du game design, centrée sur la lisibilité, la modularité et la réactivité de l'UI.",
        p7_desc: "Il s'agit d'un petit jeu conçu pour mettre en valeur les shaders Unity et approfondir la maîtrise de Shader Graph. L'objectif était d'expérimenter différents effets visuels, de comprendre leur fonctionnement interne et d'apprendre à créer des matériaux dynamiques et stylisés. Ce projet nous a permis d'explorer la logique des graphes, d'optimiser les rendus et de mieux comprendre le pipeline visuel d'Unity.",
        p8_desc: "Objectif du projet : me challenger en développant un jeu où tous les modèles 3D sont générés par script, accompagnés d'une physique entièrement codée à la main. Un exercice complet mêlant algorithmie, mathématiques, optimisation et création procédurale.",
        p9_desc: "Le but de ce projet était de créer un FPS satisfaisant, centré sur des sensations de tir percutantes et un maximum de feedback visuel et sonore. Nous avons réparti le travail de manière complémentaire : je me suis occupé de toute la gestion des armes et du système de tir, ainsi que de la boutique d'armes et du système d'équipement modulaire, tandis que mon coéquipier a conçu la map et développé le robot ennemi ainsi que son comportement de mort. Ensemble, nous avons construit une expérience dynamique et cohérente, où chaque élément contribue à renforcer le feeling du gameplay.",
        p10_desc: "Shooter réalisé à trois, entièrement en C++ avec SFML. Assets faits maison. Je me suis occupé des collisions, du combat, du système de vie, du boss, des crédits et de la DA.",
        p11_desc: "Ce projet réalisé avec SFML consistait à développer un petit jeu en 2D reposant sur une gestion précise des tiles et de l'environnement. J'ai pris en charge la mise en place du système de tuiles, ainsi que les mécaniques de creusage, de coupe d'arbres et de minage. Puis pour finir, j'ai travaillé sur les animaux et leur IA, ce qui a permis de donner vie au monde et d'enrichir l'expérience de jeu.",
    },
    en: {
        // NAV
        nav_journey: "Journey",
        nav_projects: "Projects",
        nav_contact: "Contact",
        nav_home: "Home",

        // INDEX — Hero
        hero_seeking: "Looking for an internship",
        hero_desc: "Specialized in C#, Unity and procedural systems, I create games and projects that are always more ambitious.",
        hero_btn_projects: "See my projects",
        hero_btn_cv: "My Resume",
        hero_btn_contact: "Contact me",

        // INDEX — Outils & Expériences
        section_tools: "My Tools",
        section_xp: "My Experience",
        xp_coursier: "Coursier.fr — Delivery Driver",
        xp_raffin: "Henri Raffin - Embossing",

        // INDEX — Parcours
        journey_title: "My Journey",
        journey_eyebrow: "A constantly evolving path",
        tl_0_title: "First Scripts", tl_0_sub: "Where it all began", tl_0_desc: "Discovered coding through Scratch, made a bunch of small games.",
        tl_1_title: "High School", tl_1_sub: "STI2D", tl_1_desc: "Energy & Environment track, Lycée Pierre Termier in Grenoble",
        tl_2_title: "Gaming Campus", tl_2_sub: "Lyon", tl_2_desc: "Joined Gaming Campus, diving deep into programming",
        tl_3_title: "Learning", tl_3_sub: "C++ / C#", tl_3_desc: "Gained a wide range of skills across many domains",
        tl_4_title: "3rd Year", tl_4_sub: "Unity", tl_4_desc: "Advanced Unity, procedural systems, modular systems — built very strong programming foundations",
        tl_5_title: "Seeking Internship", tl_5_sub: "Ready for industry", tl_5_desc: "Full portfolio, looking for a first professional experience.",

        // INDEX — Carousel
        projects_title: "Featured Projects",
        carousel_see_all: "See all projects",
        carousel_github: "View on GitHub",
        slide1_title: "Strangeraria",
        slide1_desc: "This project, built in one week, was about creating a procedural game capable of generating a dynamic world renewed at each run.",
        slide2_title: "SpacefishShooter",
        slide2_desc: "Shooter made by a team of three, entirely in C++ with SFML. Handmade assets. I handled collisions, combat, health system, boss, credits and art direction.",

        // FOOTER
        footer_copy: "© 2025 — Elouan Bouché",
        // CONTACT PAGE
        contact_page_title: "Contact — Elouan Bouché",
        contact_label: "Get in touch",
        contact_title: "Let's work<br>together.",
        contact_sub: "Available for collaborations, internship opportunities, or just to chat about dev and game design.",
        contact_divider: "or",
        contact_btn: "Send a message",
        contact_linkedin_handle: "Elouan Bouché",

        // PROJET PAGE
        proj_page_title: "Projects - Elouan Bouché",
        proj_hero_title: "My",
        proj_hero_title_span: "Projects",
        proj_hero_sub: "A selection of my game and software development work.",
        filter_all: "All",
        filter_1sem: "1 Week",
        filter_2sem: "2 Weeks",
        filter_solo: "Solo",
        no_results: "No projects for this filter.",
        btn_cahier: "📄 Design Document",
        btn_gameplay: "Watch full gameplay",
        btn_test_itch: "🎮 Play on itch.io",

        // PROJETS descriptions
        p1_desc: "One-week challenge: build a playable Pokémon-like game in the console, developed as a trio to recapture the spirit of childhood games. I handled the full map management and player movement, with an interaction system for picking up items scattered around the world. I also implemented enemy trainer logic: player detection, automatic battle triggers and smooth scene transitions for a coherent experience despite the constraints of an all-text game.",
        p2_desc: "The goal of this project was to design a database capable of storing all player statistics in a structured and reliable way. We set up a system to automatically save this data during gameplay. Finally, we built a loading feature to fully restore the player's state on each game launch. PS: No GitHub since my teammate's Google API key is in Firebase.",
        p3_desc: "Solo game blending escape room and adventure, built around an instant character-swap system with asymmetric gameplay (agile stealth robot / heavy brute-force robot), including the design and integration of gameplay architecture, interactions, abilities, character transitions, and C++/Blueprints logic for a fluid and modular system.",
        p4_desc: "This project, built in one week, was about creating a procedural game capable of generating a dynamic world renewed at each run. I handled all the technical side of procedural generation: terrain creation, chunk management, digging and block placement, and optimizing these mechanics for smooth performance. My teammate developed enemies, inventory and combat, giving us a complete prototype mixing exploration, action and building.",
        p5_desc: "This 3C project aimed to implement a complete character controller, camera and gameplay system. We chose to go beyond expectations by adding a local multiplayer mode. I handled all random map generation, modular hero creation and modular ability systems. My teammate managed local multiplayer integration, camera and all transitions, giving us a coherent and dynamic experience.",
        p6_desc: "A game built entirely in UI within Unity, inspired by Age of War and Plants vs Zombies. The goal was to recreate strategic line-management gameplay with units and progression, without using classic 2D sprites or scenes — everything is built as an interface. This let us explore a different approach to game design focused on readability, modularity and UI responsiveness.",
        p7_desc: "A small game designed to showcase Unity shaders and deepen mastery of Shader Graph. The goal was to experiment with different visual effects, understand how they work internally, and learn to create dynamic and stylized materials. This project let us explore graph logic, optimize renders and better understand Unity's visual pipeline.",
        p8_desc: "Project goal: challenge myself by building a game where all 3D models are generated by script, with physics entirely hand-coded. A complete exercise mixing algorithms, maths, optimization and procedural creation.",
        p9_desc: "The goal was to create a satisfying FPS focused on impactful shooting sensations and maximum visual and audio feedback. We split the work: I handled all weapon management and shooting systems, as well as the weapon shop and modular equipment system, while my teammate designed the map and built the enemy robot with its death behavior. Together we crafted a dynamic and coherent experience where every element reinforces gameplay feel.",
        p10_desc: "Shooter made by a team of three, entirely in C++ with SFML. Handmade assets. I handled collisions, combat, health system, boss, credits and art direction.",
        p11_desc: "This SFML project involved building a 2D game with precise tile and environment management. I set up the tile system along with digging, tree-cutting and mining mechanics. I then worked on animals and their AI, bringing the world to life and enriching the gameplay experience.",
    }
};

// ── Langue active ──
let currentLang = localStorage.getItem('lang') || 'fr';

function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['fr'][key] || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updateLangButtons();
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = val;
        } else if (val.includes('<')) {
            el.innerHTML = val;
        } else {
            el.textContent = val;
        }
    });
    // Titre de page
    const pageKey = document.body.dataset.pageTitle;
    if (pageKey) document.title = t(pageKey);
    // Event custom pour que les scripts de page réagissent
    document.dispatchEvent(new CustomEvent('langchange', { detail: currentLang }));
}

// ── Injecter les boutons drapeaux dans le header ──
function injectLangButtons() {
    // Inject CSS directly to avoid GitHub Pages caching issues
    if (!document.getElementById('langStyle')) {
        const style = document.createElement('style');
        style.id = 'langStyle';
        style.textContent = `
            #langSwitcher {
                display: flex;
                gap: 4px;
                align-items: center;
                position: absolute;
                left: 0;
            }
            .lang-btn {
                background: transparent;
                border: 2px solid transparent;
                border-radius: 6px;
                padding: 2px;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity .2s, border-color .2s, transform .2s;
                line-height: 0;
            }
            .lang-btn img {
                width: 28px !important;
                height: 20px !important;
                object-fit: cover !important;
                border-radius: 3px;
                display: block;
            }
            .lang-btn:hover { opacity: 0.85; transform: scale(1.08); }
            .lang-btn.active { opacity: 1; border-color: #5b8cff; }
            @media (max-width: 768px) {
                #langSwitcher { left: 0; right: auto; }
            }
        `;
        document.head.appendChild(style);
    }
    const nav = document.querySelector('.nav');
    if (!nav || document.getElementById('langSwitcher')) return;

    const switcher = document.createElement('div');
    switcher.id = 'langSwitcher';
    switcher.innerHTML = `
        <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr" title="Français">
            <img src="/SiteWeb/Image/france.png" alt="FR" />
        </button>
        <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">
            <img src="/SiteWeb/Image/USA.png" alt="EN" />
        </button>
    `;
    switcher.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    nav.prepend(switcher);
}

document.addEventListener('DOMContentLoaded', () => {
    injectLangButtons();
    applyTranslations();
});