// ===== Botão de Voltar =====
const botaoVoltar = document.querySelector(".back-button");

if (botaoVoltar) {
  botaoVoltar.addEventListener("click", () => {
    window.location.href = "../escolha-serviços.html";
  });
}
