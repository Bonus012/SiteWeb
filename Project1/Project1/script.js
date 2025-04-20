const carousel = document.getElementById("carousel");
const items = document.querySelectorAll(".carousel-item");
const menuHamburger = document.querySelector(".menu-hamburger");
const navLinks = document.querySelector(".nav-links");

menuHamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-menu");
});


let index = 0;

function updateCarousel() {
    items.forEach((item, i) => {
        item.classList.remove("active");
        const video = item.querySelector("video");
        if (i === index) {
            item.classList.add("active");
            video.play();
        } else {
            video.pause();
        }
    });
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function moveCarousel(direction) {
    index += direction;
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    updateCarousel();
}

updateCarousel();