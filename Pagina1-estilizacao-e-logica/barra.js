const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // rolando pra baixo → fixa a barra
    header.classList.add("fixed");
  } else if (currentScroll < 50) {
    // voltando pro topo → tira a fixação
    header.classList.remove("fixed");
  }

  lastScroll = currentScroll;
});
