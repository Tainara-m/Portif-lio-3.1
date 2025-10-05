// === Scroll Reveal com IntersectionObserver (melhor performance) ===
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
});

// === Sidebar Inicialmente Colapsada ===
const sidebar = document.getElementById("sidebar");
const collapseIcon = document.getElementById("collapse-icon");

// Define estado inicial
sidebar.classList.remove("expanded");
collapseIcon.classList.remove("fa-angle-double-left");
collapseIcon.classList.add("fa-angle-double-right");

// Alterna sidebar (desktop)
document.querySelector(".toggle-sidebar").addEventListener("click", () => {
  sidebar.classList.toggle("expanded");
  const expanded = sidebar.classList.contains("expanded");
  collapseIcon.classList.toggle("fa-angle-double-left", expanded);
  collapseIcon.classList.toggle("fa-angle-double-right", !expanded);
});

// Marca item ativo no menu
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".menu-item").forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});

// === Fundo animado com bolhas ===
const coresBolhas = ['#065F6A', '#072f35ff', '#39a0adff', '#12383dff', '#60d3e2ff'];
const container = document.querySelector(".bolhas-container");

for (let i = 0; i < 30; i++) {
  const bolha = document.createElement("div");
  bolha.classList.add("bolha");

  const tamanho = Math.random() * 20 + 10;
  bolha.style.width = `${tamanho}px`;
  bolha.style.height = `${tamanho}px`;
  bolha.style.left = `${Math.random() * 100}%`;
  bolha.style.animationDuration = `${Math.random() * 10 + 5}s`;
  bolha.style.backgroundColor = coresBolhas[Math.floor(Math.random() * coresBolhas.length)];

  container.appendChild(bolha);
}

// === Menu Hambúrguer ===
const hamburger = document.createElement("button");
hamburger.classList.add("hamburger");
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.body.appendChild(hamburger);

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("menu-aberto");
  const aberto = document.body.classList.contains("menu-aberto");
  hamburger.innerHTML = aberto
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Fecha o menu ao clicar em um link no mobile
document.querySelectorAll(".menu-item").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      document.body.classList.remove("menu-aberto");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Ajusta automaticamente ao redimensionar
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    document.body.classList.remove("menu-aberto");
  }
});

// === Alternância de Tema (salva no localStorage) ===
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Aplica tema salvo
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

// === Acessibilidade: foco visível e navegação por teclado ===
document.addEventListener("keyup", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-tabbing");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-tabbing");
});
