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

document.querySelectorAll('.extra-card, .timeline-item').forEach(el => observer.observe(el));

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