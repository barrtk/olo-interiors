// ========================================
// SMOOTH SCROLL + MOBILE MENU
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            document.querySelector(".nav-links")?.classList.remove("active");
            document.querySelector(".mobile-menu-btn")?.classList.remove("active");
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
mobileMenuBtn?.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", mobileMenuBtn.classList.contains("active"));
});

// Navbar shrink
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.padding = "10px 0";
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.padding = "20px 0";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
});

// ========================================
// MAP + LIGHTBOX + SWIPER (wszystko działa!)
// ========================================
window.addEventListener("load", () => {
    // Leaflet Map
    if (typeof L !== "undefined" && document.getElementById("map")) {
        const map = L.map("map").setView([55.8642, -4.2518], 9);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([55.8642, -4.2518]).addTo(map);
        L.circle([55.8642, -4.2518], { color: "#8B4513", fillColor: "#8B4513", fillOpacity: 0.2, radius: 12000 }).addTo(map);
    }

    // Lightbox – z opóźnieniem
    setTimeout(() => {
        if (typeof lightbox !== "undefined") {
            lightbox.option({
                resizeDuration: 200,
                wrapAround: true,
                fadeDuration: 300,
                imageFadeDuration: 300,
                disableScrolling: true,
                alwaysShowNavOnTouchDevices: true
            });
        }
    }, 500);
});

// ========================================
// SWIPER – DZIAŁA NA 100% NAWSZE (nawet przy 1 zdjęciu!)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.gallery-item .swiper').forEach(container => {
        const slidesCount = container.querySelectorAll('.swiper-slide').length;

        new Swiper(container, {
            // Podstawowe
            loop: slidesCount > 1 ? true : false,        // loop TYLKO gdy >1 zdjęcie
            loopedSlides: slidesCount > 1 ? 50 : null,   // ważne dla loop
            speed: 600,
            grabCursor: true,
            centeredSlides: true,
            spaceBetween: 0,

            // Zawsze pokazujemy strzałki i kropki (nawet przy 1 zdjęciu)
            navigation: {
                nextEl: container.querySelector('.swiper-button-next'),
                prevEl: container.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: false,
            },

            // Kluczowe – nie blokujemy kliknięć (dla Lightboxa)
            preventClicks: false,
            preventClicksPropagation: false,

            // Ukrywamy strzałki TYLKO gdy naprawdę nie ma po co przewijać
            watchSlidesProgress: true,
            watchOverflow: true,

            // Żeby nie było warningów przy 1 zdjęciu
            allowTouchMove: slidesCount > 1,
            simulateTouch: slidesCount > 1,

            // Responsywność
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            },

            // Dodatkowe – wymusza odświeżenie po załadowaniu zdjęć
            on: {
                init: function () {
                    this.update();
                },
                resize: function () {
                    this.update();
                }
            }
        });
    });
});

// Form validation
document.querySelector(".contact-form")?.addEventListener("submit", e => {
    let valid = true;
    ["name", "email", "message"].forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim() || (id === "email" && !field.value.includes("@"))) {
            field.style.borderColor = "#d32f2f";
            valid = false;
        } else {
            field.style.borderColor = "#ddd";
        }
    });
    if (!valid) {
        e.preventDefault();
        alert("Proszę poprawnie wypełnić wszystkie wymagane pola.");
    }
});

console.log("Olo Interiors – Wszystko działa! 🚀");