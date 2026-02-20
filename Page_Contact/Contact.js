// ===========================
//  NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('nav__links--open'));


// ===========================
//  SPIDER WEB CANVAS
// ===========================
const canvas = document.getElementById('webCanvas');
const ctx    = canvas.getContext('2d');

let W, H;

// --- Tuning ---
const NODE_COUNT   = 180;   // density
const MAX_DIST     = 130;   // max edge length (px)
const REPEL_R      = 110;   // mouse repulsion radius
const REPEL_FORCE  = 3.2;   // push strength
const RETURN_EASE  = 0.055; // spring stiffness back to home
const DAMPING      = 0.76;  // velocity damping (lower = more fluid)
const DESTROY_R    = 65;    // tear radius on click/drag
const REBUILD_WAIT = 8000;  // ms before a destroyed node starts coming back (very slow)
const FADE_SPEED   = 0.004; // fade-in speed (very slow)
const TENSION_R    = 140;   // radius within which threads "glow" from tension
const DRIFT_SPEED  = 0.09;  // home wander speed (very slow constant drift)

function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

// ===========================
//  NODE CLASS
// ===========================
class Node {
    constructor(initial = true) {
        this.hx = Math.random() * (W || window.innerWidth);
        this.hy = Math.random() * (H || window.innerHeight);
        this.x  = this.hx;
        this.y  = this.hy;
        this.vx = 0;
        this.vy = 0;

        // Home drifts slowly — gives the web its gentle constant movement
        const angle = Math.random() * Math.PI * 2;
        const speed = DRIFT_SPEED * (0.5 + Math.random() * 0.8);
        this.dhx = Math.cos(angle) * speed;
        this.dhy = Math.sin(angle) * speed;

        this.alive      = true;
        this.alpha      = initial ? 1 : 0;
        this.rebuilding = !initial;
        this.fadeIn     = initial ? 1 : 0;
    }

    destroy() {
        if (!this.alive) return;
        this.alive = false;
        this.alpha = 0;
        setTimeout(() => this.respawn(), REBUILD_WAIT + Math.random() * 4000);
    }

    respawn() {
        this.hx = Math.random() * W;
        this.hy = Math.random() * H;

        // Enter from a random edge
        const side = Math.floor(Math.random() * 4);
        if      (side === 0) { this.x = this.hx; this.y = -10; }
        else if (side === 1) { this.x = W + 10;  this.y = this.hy; }
        else if (side === 2) { this.x = this.hx; this.y = H + 10; }
        else                 { this.x = -10;      this.y = this.hy; }

        this.vx = 0; this.vy = 0;
        const angle = Math.random() * Math.PI * 2;
        const speed = DRIFT_SPEED * (0.5 + Math.random() * 0.8);
        this.dhx = Math.cos(angle) * speed;
        this.dhy = Math.sin(angle) * speed;
        this.alive = true; this.rebuilding = true;
        this.fadeIn = 0;   this.alpha = 0;
    }

    update(mx, my) {
        if (!this.alive) return;

        // Drift the home position slowly — the node follows via spring
        this.hx += this.dhx;
        this.hy += this.dhy;

        // Soft bounce of home off screen edges
        if (this.hx < 0)  { this.hx = 0;  this.dhx *= -1; }
        if (this.hx > W)  { this.hx = W;  this.dhx *= -1; }
        if (this.hy < 0)  { this.hy = 0;  this.dhy *= -1; }
        if (this.hy > H)  { this.hy = H;  this.dhy *= -1; }

        // Mouse repulsion
        const dxm = this.x - mx;
        const dym = this.y - my;
        const dm2 = dxm * dxm + dym * dym;

        if (dm2 < REPEL_R * REPEL_R && dm2 > 0.01) {
            const dm    = Math.sqrt(dm2);
            const force = (1 - dm / REPEL_R) * REPEL_FORCE;
            this.vx += (dxm / dm) * force;
            this.vy += (dym / dm) * force;
        }

        // Spring back to home
        this.vx += (this.hx - this.x) * RETURN_EASE;
        this.vy += (this.hy - this.y) * RETURN_EASE;

        // Damping
        this.vx *= DAMPING;
        this.vy *= DAMPING;

        this.x += this.vx;
        this.y += this.vy;

        // Fade in
        if (this.rebuilding) {
            this.fadeIn = Math.min(1, this.fadeIn + FADE_SPEED);
            this.alpha  = this.fadeIn;
            if (this.fadeIn >= 1) this.rebuilding = false;
        }
    }

    // Distance from this node to its home — used for thread tension
    displacement() {
        const dx = this.x - this.hx;
        const dy = this.y - this.hy;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// ===========================
//  INIT
// ===========================
let nodes = [];

function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node(true));
}

// ===========================
//  MOUSE / TOUCH
// ===========================
const mouse = { x: -9999, y: -9999, pressing: false };

function onMove(x, y) {
    mouse.x = x;
    mouse.y = y;
    if (mouse.pressing) tearWeb(x, y);
}

function tearWeb(x, y) {
    const r2 = DESTROY_R * DESTROY_R;
    nodes.forEach(n => {
        if (!n.alive) return;
        const dx = n.x - x;
        const dy = n.y - y;
        if (dx * dx + dy * dy < r2) n.destroy();
    });
}

window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
canvas.addEventListener('mousedown', e => {
    mouse.pressing = true;
    tearWeb(e.clientX, e.clientY);
});
window.addEventListener('mouseup',    () => mouse.pressing = false);
window.addEventListener('mouseleave', () => {
    mouse.pressing = false;
    mouse.x = -9999; mouse.y = -9999;
});

canvas.addEventListener('touchstart', e => {
    mouse.pressing = true;
    const t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY;
    tearWeb(t.clientX, t.clientY);
}, { passive: true });
canvas.addEventListener('touchmove', e => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
}, { passive: true });
canvas.addEventListener('touchend', () => mouse.pressing = false);

// ===========================
//  DRAW LOOP
// ===========================
function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update all nodes
    nodes.forEach(n => n.update(mouse.x, mouse.y));

    // --- Draw edges ---
    for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        if (!ni.alive) continue;

        for (let j = i + 1; j < nodes.length; j++) {
            const nj = nodes[j];
            if (!nj.alive) continue;

            const dx = ni.x - nj.x;
            const dy = ni.y - nj.y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d >= MAX_DIST) continue;

            const proximity  = 1 - d / MAX_DIST;
            const baseAlpha  = proximity * Math.min(ni.alpha, nj.alpha);

            // Tension: how far are the two nodes from their home?
            const tension = Math.min(1, (ni.displacement() + nj.displacement()) / 40);

            // Thread color shifts toward light blue when under tension
            const r1 = Math.round(91  - tension * 70);
            const g1 = Math.round(140 + tension * 100);
            const b1 = 255;
            const r2 = Math.round(91  - tension * 60);
            const g2 = Math.round(140 + tension * 110);
            const b2 = 255;

            const lineAlpha = baseAlpha * (0.45 + tension * 0.45);
            const lineWidth = 0.8 + tension * 1.2;

            const grad = ctx.createLinearGradient(ni.x, ni.y, nj.x, nj.y);
            grad.addColorStop(0, `rgba(${r1},${g1},${b1},${lineAlpha})`);
            grad.addColorStop(1, `rgba(${r2},${g2},${b2},${lineAlpha})`);

            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth   = lineWidth;
            ctx.stroke();

            // Extra glow layer on tense threads
            if (tension > 0.25) {
                ctx.beginPath();
                ctx.moveTo(ni.x, ni.y);
                ctx.lineTo(nj.x, nj.y);
                ctx.strokeStyle = `rgba(140,220,255,${tension * 0.12})`;
                ctx.lineWidth   = lineWidth + 3;
                ctx.stroke();
            }
        }
    }

    // --- Draw nodes ---
    nodes.forEach(n => {
        if (!n.alive) return;

        const tension = Math.min(1, n.displacement() / 20);

        // Halo — expands with tension
        const haloR = 4 + tension * 8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(91 - tension * 60)},${Math.round(140 + tension * 100)},255,${n.alpha * (0.07 + tension * 0.15)})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8 + tension * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(91 - tension * 60)},${Math.round(160 + tension * 80)},255,${n.alpha * 0.92})`;
        ctx.fill();
    });

    // --- Tear cursor glow (click only) ---
    if (mouse.pressing && mouse.x > -100) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, DESTROY_R);
        g.addColorStop(0,   'rgba(100,200,255,0.14)');
        g.addColorStop(0.5, 'rgba(91,180,255,0.05)');
        g.addColorStop(1,   'rgba(91,140,255,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, DESTROY_R, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

// ===========================
//  BOOT
// ===========================
window.addEventListener('resize', () => {
    resize();
    initNodes();
});

resize();
initNodes();
draw();