// Reveal + Animação
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          // Remover observer após animação para melhor performance
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Ativo no menu (clique e scroll)
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".menu-item").forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
    
    // Fechar menu em mobile
    if (window.innerWidth <= 1024) {
      closeMenu();
    }
  });
});

// Atualizar menu ativo ao fazer scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const menuItems = document.querySelectorAll(".menu-item");
  
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });
  
  menuItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href");
    if (href === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Hamburger + overlay (mobile)
let hamburger = document.querySelector(".hamburger");
if (!hamburger) {
  hamburger = document.createElement("button");
  hamburger.classList.add("hamburger");
  hamburger.setAttribute("aria-label", "Abrir menu");
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.appendChild(hamburger);
}

const overlay = document.querySelector(".overlay");

function closeMenu() {
  document.body.classList.remove("menu-aberto");
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  hamburger.setAttribute("aria-label", "Abrir menu");
}

function toggleMenu() {
  document.body.classList.toggle("menu-aberto");
  const aberto = document.body.classList.contains("menu-aberto");
  hamburger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  hamburger.innerHTML = aberto ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

hamburger.addEventListener("click", toggleMenu);
if (overlay) overlay.addEventListener("click", closeMenu);

// Fecha ao clicar em item do menu no mobile
document.querySelectorAll(".menu-item").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 980) closeMenu();
  });
});

// Se virar desktop, fecha menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

// Tema (localStorage)
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".toggle-theme i");
if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
    themeIcon.className = "fas fa-moon";
  } else {
    themeIcon.className = "fas fa-sun";
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    themeIcon.className = document.body.classList.contains("dark") ? "fas fa-moon" : "fas fa-sun";
  });
}

// A11y foco visível
document.addEventListener("keyup", (e) => {
  if (e.key === "Tab") document.body.classList.add("user-tabbing");
});
document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-tabbing");
});