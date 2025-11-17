// ========================================
// SMOOTH SCROLL + MOBILE MENU CLOSE
// ========================================
const anchors = document.querySelectorAll('a[href^="#"]');
for (const anchor of anchors) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      const navLinks2 = document.querySelector(".nav-links");
      const mobileBtn = document.querySelector(".mobile-menu-btn");
      if (navLinks2?.classList.contains("active")) {
        navLinks2.classList.remove("active");
        mobileBtn?.classList.remove("active");
        mobileBtn?.setAttribute("aria-expanded", "false");
      }
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    const isExpanded = mobileMenuBtn.classList.contains("active");
    mobileMenuBtn.setAttribute("aria-expanded", isExpanded.toString());
  });
}

// ========================================
// NAVBAR SHRINK ON SCROLL
// ========================================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.padding = "20px 0";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  }
});

// ========================================
// WINDOW LOAD: MAP + LIGHTBOX (Z OPÓŹNIENIEM!)
// ========================================
window.addEventListener("load", () => {
  // --- LEAFLET MAP ---
  if (typeof L !== "undefined") {
    const glasgowLat = 55.8642;
    const glasgowLng = -4.2518;
    const map = L.map("map").setView([glasgowLat, glasgowLng], 9);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    L.marker([glasgowLat, glasgowLng]).addTo(map);

    L.circle([glasgowLat, glasgowLng], {
      color: "#8B4513",
      fillColor: "#8B4513",
      fillOpacity: 0.2,
      radius: 12000
    }).addTo(map);
  }

  // --- LIGHTBOX Z OPÓŹNIENIEM 150ms ---
  // To daje czas na pełne wyrenderowanie social-icons (w tym MyBuilder)
  setTimeout(() => {
    if (typeof lightbox !== "undefined") {
      lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
        fadeDuration: 300,
        imageFadeDuration: 300
      });
    }
  }, 150);
});

// ========================================
// CONTACT FORM VALIDATION
// ========================================
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    let isValid = true;

    // Name
    if (!nameInput.value.trim()) {
      isValid = false;
      nameInput.style.borderColor = "#d32f2f";
    } else {
      nameInput.style.borderColor = "#ddd";
    }

    // Email
    if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
      isValid = false;
      emailInput.style.borderColor = "#d32f2f";
    } else {
      emailInput.style.borderColor = "#ddd";
    }

    // Message
    if (!messageInput.value.trim()) {
      isValid = false;
      messageInput.style.borderColor = "#d32f2f";
    } else {
      messageInput.style.borderColor = "#ddd";
    }

    if (!isValid) {
      e.preventDefault();
      alert("Proszę poprawnie wypełnić wszystkie wymagane pola.");
    }
  });
}

console.log("Olo Interiors – Strona załadowana poprawnie");