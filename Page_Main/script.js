// ===========================
// CANVAS PARTICULES
// ===========================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(91, 140, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(91, 140, 255, ${0.15 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===========================
// NAVIGATION MOBILE
// ===========================
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
});

document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('nav__links--open'));
});

// ===========================
// CARROUSEL
// ===========================
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.carousel-next');
const prevBtn = document.querySelector('.carousel-prev');
const dotsWrap = document.getElementById('carouselDots');

let currentIndex = 0;

// Crée les dots
items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
});

function goTo(index) {
    const total = items.length;
    const prev = currentIndex;
    currentIndex = (index + total) % total;

    if (prev === currentIndex) return;

    // Slide out actuelle
    items[prev].classList.add('exit-left');
    items[prev].classList.remove('active');

    // Slide in nouvelle
    items[currentIndex].classList.remove('exit-left');
    // Reset position de départ si nécessaire
    items[currentIndex].style.transform = 'translateX(60px)';
    items[currentIndex].style.opacity = '0';
    items[currentIndex].style.pointerEvents = 'auto';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            items[currentIndex].style.transform = '';
            items[currentIndex].style.opacity = '';
            items[currentIndex].classList.add('active');
        });
    });

    // Clean exit après transition
    setTimeout(() => {
        items[prev].classList.remove('exit-left');
        items[prev].style.transform = '';
        items[prev].style.opacity = '';
    }, 450);

    // Dots
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
    });
}

nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
prevBtn.addEventListener('click', () => goTo(currentIndex - 1));

// Navigation clavier (désactivée si modal ouverte)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
});

// Swipe tactile
let touchStartX = 0;
const track = document.querySelector('.carousel-track') || document.querySelector('.carousel');
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.extra-card').forEach(el => observer.observe(el));

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerH = document.querySelector('.main-header').offsetHeight;
            window.scrollTo({ top: target.offsetTop - headerH - 20, behavior: 'smooth' });
        }
    });
});
// ===========================
// SINE WAVE JOURNEY
// ===========================
(function () {
    const sineCanvas = document.getElementById('sineCanvas');
    if (!sineCanvas) return;

    const layer = document.getElementById('tlLayer');

    const EVENTS = [
        { year: "2016", title: "Premiers Scripts",  sub: "Le début de tout",  desc: "Découverte du code via scratch, réalisation d'un tas de petits jeux.", t: 0.07 },
        { year: "2022", title: "BAC",       sub: "STI2D",              desc: "Options Energie et Environnement, Lycée Pierre Termier à Grenoble",        t: 0.24 },
        { year: "2023", title: "Gaming Campus",   sub: "Lyon",           desc: "Entrée au Gaming Campus, je découvre le code en profondeur",    t: 0.42 },
        { year: "2024 - 2025", title: "Apprentissage",   sub: "C++ / C#",              desc: "J'acquiers beaucoup de compêtences dans différents domaines",         t: 0.60 },
        { year: "2026", title: "3ème Année",  sub: "Unity",     desc: "Unity Avancée, Systèmes proceduraux, Systèmes modulaires, j'ai acquis de très bonnes bases en  programmation",           t: 0.78 },
        { year: "Actuellement", title: "Recherche Stage",    sub: "Prêt pour l'industrie",   desc: "Portfolio complet, A la recherche d'une première expérience pro.", t: 0.93 }
    ];

    // WAVE
    function waveNorm(xNorm, phase) {
        return (
            Math.sin(xNorm * Math.PI * 3.5 + phase) * 0.28 +
            Math.sin(xNorm * Math.PI * 2.0 + phase * 0.65) * 0.09 +
            Math.sin(xNorm * Math.PI * 5.5 + phase * 1.4) * 0.03
        );
    }

    let W = 0, H = 0, phase = 0;
    let elDots = [], elCards = [], elConns = [];
    let initiated = false;

    const CARD_W = 195;
    const CARD_H = 150;
    const GAP    = 28;

    // ââ STATIC LAYOUT â cards fixed at phase=0
    // All "above" cards share the SAME top Y; all "below" share the SAME bottom Y
    function computeStaticPositions() {
        const midY = H * 0.5;
        const amp  = H * 0.28;

        // Find the unified row Y for above and below cards
        // Above cards: bottom edge = min(dotY at phase=0) - GAP  â push all to same TOP
        // Below cards: top edge = max(dotY at phase=0) + GAP     â push all to same BOTTOM

        // First pass: get dot Y at phase=0 for each event
        const dotYs = EVENTS.map(ev => midY + waveNorm(ev.t, 0) * amp);

        const aboveIdx = EVENTS.map((_, i) => i).filter(i => i % 2 === 0);
        const belowIdx = EVENTS.map((_, i) => i).filter(i => i % 2 !== 0);

        // Highest wave point among "above" slots â cards sit just above it
        const aboveWaveMin = Math.min(...aboveIdx.map(i => dotYs[i]));
        const belowWaveMax = Math.max(...belowIdx.map(i => dotYs[i]));

        // Row tops
        const aboveRowTop = Math.max(4, aboveWaveMin - GAP - CARD_H);
        const belowRowTop = Math.min(H - CARD_H - 4, belowWaveMax + GAP);

        return EVENTS.map((ev, i) => {
            const x     = ev.t * W;
            const dotY  = dotYs[i];
            const above = i % 2 === 0;

            let cx = x - CARD_W / 2;
            cx = Math.max(2, Math.min(W - CARD_W - 2, cx));

            const cy            = above ? aboveRowTop : belowRowTop;
            const connAnchorY   = above ? cy + CARD_H : cy;   // card edge facing the wave

            return { x, dotY, above, cx, cy, connAnchorY };
        });
    }

    // BUILD DOM 
    function build() {
        layer.innerHTML = '';
        elDots = []; elCards = []; elConns = [];

        EVENTS.forEach((ev) => {
            const dot = document.createElement('div');
            dot.className = 'wave-dot';
            layer.appendChild(dot);
            elDots.push(dot);

            const conn = document.createElement('div');
            conn.className = 'tl-connector';
            layer.appendChild(conn);
            elConns.push(conn);

            const card = document.createElement('div');
            card.className = 'tl-card';
            card.innerHTML = `
                <div class="tl-card-inner">
                    <span class="tl-year">${ev.year}</span>
                    <div class="tl-title">${ev.title}</div>
                    <div class="tl-sub">${ev.sub}</div>
                    <div class="tl-desc">${ev.desc}</div>
                </div>`;
            layer.appendChild(card);
            elCards.push(card);
        });

        // Place cards at static positions
        const positions = computeStaticPositions();
        positions.forEach((p, i) => {
            elCards[i].style.left = p.cx + 'px';
            elCards[i].style.top  = p.cy + 'px';
        });

        // Staggered reveal
        if (!initiated) {
            initiated = true;
            setTimeout(() => {
                EVENTS.forEach((_, i) => {
                    setTimeout(() => {
                        elDots[i].classList.add('lit');
                        elConns[i].classList.add('lit');
                        elCards[i].classList.add('lit');
                    }, i * 130);
                });
            }, 300);
        } else {
            elDots.forEach(d => d.classList.add('lit'));
            elConns.forEach(c => c.classList.add('lit'));
            elCards.forEach(c => c.classList.add('lit'));
        }
    }

    // UPDATE ANIMATED (dots + elastic connectors only)
    function updateAnimated(ph) {
        const midY = H * 0.5;
        const amp  = H * 0.28;
        const positions = computeStaticPositions();

        EVENTS.forEach((ev, i) => {
            const x    = ev.t * W;
            const dotY = midY + waveNorm(ev.t, ph) * amp;
            const p    = positions[i];

            elDots[i].style.left = x + 'px';
            elDots[i].style.top  = dotY + 'px';

            const connTop  = Math.min(dotY, p.connAnchorY);
            const connH    = Math.max(0, Math.abs(dotY - p.connAnchorY));

            elConns[i].style.left   = x + 'px';
            elConns[i].style.top    = connTop + 'px';
            elConns[i].style.height = connH + 'px';
            elConns[i].style.background = p.above
                ? 'linear-gradient(180deg, rgba(168,85,247,0.15), rgba(91,140,255,0.65))'
                : 'linear-gradient(180deg, rgba(91,140,255,0.65), rgba(168,85,247,0.15))';
        });
    }

    // DRAW WAVE
    function drawWave(ph) {
        const ctx2 = sineCanvas.getContext('2d');
        ctx2.clearRect(0, 0, W, H);

        const midY = H * 0.5;
        const amp  = H * 0.28;
        const STEPS = 500;

        const grad = ctx2.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0,   '#5b8cff');
        grad.addColorStop(0.5, '#a855f7');
        grad.addColorStop(1,   '#5b8cff');

        // Glow halos
        for (let g = 4; g >= 1; g--) {
            ctx2.beginPath();
            for (let s = 0; s <= STEPS; s++) {
                const xn = s / STEPS;
                const x  = xn * W;
                const y  = midY + waveNorm(xn, ph) * amp;
                s === 0 ? ctx2.moveTo(x, y) : ctx2.lineTo(x, y);
            }
            ctx2.strokeStyle = `rgba(91,140,255,${0.055 / g})`;
            ctx2.lineWidth   = 2 + g * 7;
            ctx2.lineCap = ctx2.lineJoin = 'round';
            ctx2.stroke();
        }

        // Main wave
        ctx2.beginPath();
        for (let s = 0; s <= STEPS; s++) {
            const xn = s / STEPS;
            const x  = xn * W;
            const y  = midY + waveNorm(xn, ph) * amp;
            s === 0 ? ctx2.moveTo(x, y) : ctx2.lineTo(x, y);
        }
        ctx2.strokeStyle = grad;
        ctx2.lineWidth   = 2.8;
        ctx2.lineCap = ctx2.lineJoin = 'round';
        ctx2.stroke();

        // Under-fill
        ctx2.beginPath();
        for (let s = 0; s <= STEPS; s++) {
            const xn = s / STEPS;
            const x  = xn * W;
            const y  = midY + waveNorm(xn, ph) * amp;
            s === 0 ? ctx2.moveTo(x, y) : ctx2.lineTo(x, y);
        }
        ctx2.lineTo(W, H); ctx2.lineTo(0, H); ctx2.closePath();
        const fill = ctx2.createLinearGradient(0, midY - amp, 0, H);
        fill.addColorStop(0,   'rgba(91,140,255,0.07)');
        fill.addColorStop(0.6, 'rgba(91,140,255,0.02)');
        fill.addColorStop(1,   'rgba(91,140,255,0)');
        ctx2.fillStyle = fill; ctx2.fill();

        // Above-fill
        ctx2.beginPath();
        ctx2.moveTo(0, 0); ctx2.lineTo(W, 0);
        for (let s = STEPS; s >= 0; s--) {
            const xn = s / STEPS;
            const x  = xn * W;
            const y  = midY + waveNorm(xn, ph) * amp;
            ctx2.lineTo(x, y);
        }
        ctx2.closePath();
        const fill2 = ctx2.createLinearGradient(0, 0, 0, midY + amp);
        fill2.addColorStop(0, 'rgba(168,85,247,0.04)');
        fill2.addColorStop(1, 'rgba(168,85,247,0)');
        ctx2.fillStyle = fill2; ctx2.fill();
    }

    // RESIZE 
    function resize() {
        W = sineCanvas.parentElement.clientWidth;
        H = sineCanvas.parentElement.clientHeight;
        sineCanvas.width  = W;
        sineCanvas.height = H;
        build();
        drawWave(phase);
        updateAnimated(phase);
    }

    function animate() {
        phase += 0.007;
        drawWave(phase);
        updateAnimated(phase);
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        clearTimeout(window._sineRsz);
        window._sineRsz = setTimeout(resize, 100);
    });

    resize();
    animate();
})();