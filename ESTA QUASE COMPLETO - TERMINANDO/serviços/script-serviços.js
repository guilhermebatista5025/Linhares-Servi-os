const cards = document.querySelectorAll(".card");
const btnConfirmar = document.getElementById("confirmar");
const resultado = document.getElementById("resultado");
let cardSelecionado = null;

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault(); // impede de redirecionar no clique direto

    // remove o destaque dos outros
    cards.forEach((c) => c.classList.remove("ativo"));

    // adiciona destaque no clicado
    card.classList.add("ativo");

    // salva o card selecionado
    cardSelecionado = card;

    // mostra mensagem de seleção
    const servicoSelecionado = card.dataset.service;
    resultado.textContent = `✅ Você selecionou: ${
      servicoSelecionado.charAt(0).toUpperCase() + servicoSelecionado.slice(1)
    }`;
    resultado.style.color = "#0a2540";
    resultado.style.fontWeight = "600";

    // animação do texto
    resultado.classList.add("ativo");
    setTimeout(() => resultado.classList.remove("ativo"), 300);
  });
});

btnConfirmar.addEventListener("click", () => {
  if (cardSelecionado) {
    // pega o link do card e redireciona
    const link = cardSelecionado.getAttribute("href");
    window.location.href = link;
  } else {
    resultado.textContent = "⚠️ Selecione um serviço antes de confirmar!";
    resultado.style.color = "red";

    resultado.classList.add("ativo");
    setTimeout(() => resultado.classList.remove("ativo"), 300);
  }
});
