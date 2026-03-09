// Menu móvel
const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
btn.addEventListener("click", () => nav.classList.toggle("open"));

// Containers expansíveis
const heroBtns = document.querySelectorAll(".hero-actions button");
heroBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    document.querySelectorAll(".orcamento-container").forEach(c => c.style.display = "none");
    const container = document.getElementById("orcamento-" + target);
    if(container) container.style.display = "flex";
  });
});

// POPUP PIX
const popup = document.querySelector(".pix-popup");
const closeBtn = document.querySelector(".close-popup");
const copyBtn = document.querySelector(".copy-btn");
const pixKeyInput = document.getElementById("pix-key");

document.querySelectorAll(".gerar-qr").forEach(btn => {
  btn.addEventListener("click", () => popup.style.display = "flex");
});

closeBtn.addEventListener("click", () => popup.style.display = "none");
copyBtn.addEventListener("click", () => {
  pixKeyInput.select();
  pixKeyInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Chave Pix copiada!");
});

// Avaliações dinâmicas nos depoimentos
document.querySelectorAll('.testimonial-rating').forEach(ratingEl => {
  const rating = parseFloat(ratingEl.dataset.rating);
  const starsInner = ratingEl.querySelector('.stars-inner');
  const starPercentage = (rating / 5) * 100;
  starsInner.style.width = `${starPercentage}%`;
});
