window.onload = function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");
  const popupContent = document.querySelector(".popup-content");

  // Mostra o popup com delay de 2s e animação suave
  setTimeout(() => {
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.opacity = "1";
      popupContent.classList.add("show");
    }, 10);
  }, 1000);

  // Fecha o popup ao clicar no X
  closeBtn.addEventListener("click", () => {
    popup.style.opacity = "0";
    popupContent.classList.remove("show");
    setTimeout(() => (popup.style.display = "none"), 300);
  });

  // Fecha ao clicar fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.opacity = "0";
      popupContent.classList.remove("show");
      setTimeout(() => (popup.style.display = "none"), 300);
    }
  });
};
