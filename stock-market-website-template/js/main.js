// -----------------------------
// Smooth Scroll
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== "#") {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// -----------------------------
// Sticky Navbar on Scroll
// -----------------------------
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("sticky", window.scrollY > 20);
});

// -----------------------------
// Mobile Menu Toggle (future ready)
// -----------------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// -----------------------------
// Swiper Slider (Services Section)
// -----------------------------
if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".services-slider", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

// -----------------------------
// Fade-In Reveal Animation
// -----------------------------
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger on load


// Horizontal Drag Scroll for Services Section
// -----------------------------
const scrollContainer = document.querySelector('.services-row');
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.classList.add('active');
});

scrollContainer.addEventListener('mouseleave', () => (isDown = false));
scrollContainer.addEventListener('mouseup', () => (isDown = false));

scrollContainer.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll speed multiplier
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Mobile touch drag (inertia feel)
scrollContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  scrollLeft = scrollContainer.scrollLeft;
});
scrollContainer.addEventListener('touchmove', e => {
  const x = e.touches[0].clientX;
  const walk = (x - startX) * 1.5;
  scrollContainer.scrollLeft = scrollLeft - walk;
});
