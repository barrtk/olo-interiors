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

// Form validation and WhatsApp message sending
document.querySelector("#contactForm")?.addEventListener("submit", e => {
    e.preventDefault(); // Prevent default form submission

    let valid = true;
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const phoneField = document.getElementById("phone"); // Get phone field

    // Basic validation
    if (!nameField.value.trim()) {
        nameField.style.borderColor = "#d32f2f";
        valid = false;
    } else {
        nameField.style.borderColor = "#ddd";
    }

    if (!emailField.value.trim() || !emailField.value.includes("@")) {
        emailField.style.borderColor = "#d32f2f";
        valid = false;
    } else {
        emailField.style.borderColor = "#ddd";
    }

    if (!messageField.value.trim()) {
        messageField.style.borderColor = "#d32f2f";
        valid = false;
    } else {
        messageField.style.borderColor = "#ddd";
    }

    if (valid) {
        const form = e.target;
        const whatsappNumber = form.dataset.whatsappNumber;
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim(); // Get phone value
        const message = messageField.value.trim();

        let whatsappMessage = `New message from website:\n\nName: ${name}\nEmail: ${email}`;
        if (phone) {
            whatsappMessage += `\nPhone: ${phone}`;
        }
        whatsappMessage += `\n\nMessage: ${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Clear form fields after submission
        nameField.value = "";
        emailField.value = "";
        phoneField.value = "";
        messageField.value = "";

        alert("Your message has been prepared in WhatsApp. Please send it.");
    } else {
        alert("Please fill in all required fields correctly.");
    }
});

console.log("Olo Interiors – Wszystko działa! 🚀");