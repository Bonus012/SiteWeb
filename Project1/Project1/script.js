// --- MENU BURGER ---
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- CARROUSEL ---
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

// Fonctions de navigation
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Écouteurs sur les boutons fléchés (avec images)
document.querySelector('.carousel-arrow.left').addEventListener('click', previousSlide);
document.querySelector('.carousel-arrow.right').addEventListener('click', nextSlide);

// BONUS : si tu as aussi des boutons avec id #next et #prev
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', previousSlide);
