// ===== ANIMAÇÃO DE SCROLL =====
const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // só anima uma vez
      }
    });
  },
  { threshold: 0.2 } // ativa quando 20% do elemento aparece
);

faders.forEach((fade) => {
  observer.observe(fade);
});
