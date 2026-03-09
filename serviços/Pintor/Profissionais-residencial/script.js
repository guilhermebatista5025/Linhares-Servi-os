// ===== ESTRELAS VISUAIS NOS CARDS =====
document.querySelectorAll(".stars").forEach(starContainer => {
  const rating = parseInt(starContainer.getAttribute("data-rating"));
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.innerHTML = "★";
    if (i <= rating) star.classList.add("active");
    starContainer.appendChild(star);
  }
});

// ===== FILTRO DE BUSCA + ESTRELAS =====
const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const searchIcon = document.querySelector(".search-icon");
const starCard = document.querySelector(".star-card");

// Cria as opções de filtro (Todos + 1 a 5 estrelas)
const options = ["Todos", 1, 2, 3, 4, 5];
options.forEach(opt => {
  const div = document.createElement("div");
  div.classList.add("star-option");
  div.textContent = opt === "Todos" ? "Todos" : `${opt}/5`;
  
  div.addEventListener("click", () => {
    if (opt === "Todos") {
      cards.forEach(card => card.style.display = "flex");
    } else {
      cards.forEach(card => {
        const rating = parseInt(card.querySelector(".stars").getAttribute("data-rating"));
        card.style.display = rating === opt ? "flex" : "none";
      });
    }
    starCard.style.display = "none"; // fecha o filtro ao selecionar
  });

  starCard.appendChild(div);
});

// Mostra/esconde o mini-card de filtro quando clica no ícone
searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  starCard.style.display = starCard.style.display === "flex" ? "none" : "flex";
});

// Filtro de busca por nome ou profissão
search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase();
  cards.forEach(card => {
    const nome = card.querySelector("h3").textContent.toLowerCase();
    const profissao = card.querySelector(".profissao").textContent.toLowerCase();
    card.style.display = nome.includes(term) || profissao.includes(term) ? "flex" : "none";
  });
});

// Fecha mini-card ao clicar fora
document.addEventListener("click", (e) => {
  if (!searchIcon.contains(e.target) && !starCard.contains(e.target)) {
    starCard.style.display = "none";
  }
});
