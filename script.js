// Reveal + Ano
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Ativo no menu (clique)
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".menu-item").forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
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
if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

// A11y foco visível
document.addEventListener("keyup", (e) => {
  if (e.key === "Tab") document.body.classList.add("user-tabbing");
});
document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-tabbing");
});