// debug-friendly: roda só quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('[DEBUG] script carregado e DOM pronto');

  const phrases = [
    "🔍  O que você precisa?",
    "🛠  Encontre seu serviço",
    "📌 Busque aqui",
    "💡 Digite sua busca"
  ];

  let index = 0;
  const input = document.getElementById("searchInput");
  if (!input) {
    console.error('[DEBUG] input #searchInput não encontrado no DOM');
  } else {
    input.style.transition = "color 0.3s ease";
    input.setAttribute("placeholder", phrases[index]);

    function animatePlaceholder() {
      input.style.color = 'transparent';
      setTimeout(() => {
        index = (index + 1) % phrases.length;
        input.setAttribute("placeholder", phrases[index]);
        input.style.color = '';
      }, 300);
    }

    setInterval(animatePlaceholder, 3500);
  }

  /* ========== NAVBAR DROPDOWN (hover + clique) ========== */
  const navItems = document.querySelectorAll('.nav-item');
  if (!navItems || navItems.length === 0) {
    console.warn('[DEBUG] nenhum .nav-item encontrado');
  }

  let activeDropdown = null;
  console.log('[DEBUG] activeDropdown inicial:', activeDropdown);

  navItems.forEach((item, idx) => {
    const dropdown = item.querySelector('.dropdown-menu');
    const icon = item.querySelector('.icon-wrap');

    console.log(`[DEBUG] nav-item[${idx}] dropdown:`, dropdown, 'icon:', icon);

    if (!dropdown) return; // pula se não tiver dropdown

    // hover
    item.addEventListener('mouseenter', () => {
      if (!dropdown.classList.contains('locked')) {
       dropdown.style.display = 'flex';
        console.log('[DEBUG] mouseenter -> show adicionado em', dropdown);
      }
    });

    item.addEventListener('mouseleave', () => {
      if (!dropdown.classList.contains('locked')) {
        dropdown.classList.remove('none');
        console.log('[DEBUG] mouseleave -> show removido em', dropdown);
      }
    });

    if (!icon) {
      console.warn('[DEBUG] item tem dropdown mas não tem .icon-wrap — clique não será ligado');
      return;
    }

    // click icon
    icon.addEventListener('click', e => {
      e.stopPropagation();
      try {
        if (activeDropdown && activeDropdown !== dropdown) {
          activeDropdown.classList.remove('show', 'locked');
          console.log('[DEBUG] outro dropdown fechado:', activeDropdown);
        }

        const isLocked = dropdown.classList.toggle('locked');
        dropdown.classList.toggle('show', isLocked);
        activeDropdown = isLocked ? dropdown : null;

        console.log('[DEBUG] clique no icon -> isLocked:', isLocked);
        console.log('[DEBUG] activeDropdown agora é:', activeDropdown);
      } catch (err) {
        console.error('[DEBUG] erro no click do icon:', err);
      }
    });
  });

  // clicar fora fecha qualquer dropdown travado
  document.addEventListener('click', () => {
    if (activeDropdown) {
      activeDropdown.classList.remove('locked', 'show');
      console.log('[DEBUG] click fora -> activeDropdown fechado:', activeDropdown);
      activeDropdown = null;
      console.log('[DEBUG] activeDropdown agora é:', activeDropdown);
    }
  });



  /* ======================================================
   *  MENU LATERAL (sidebar) — ADICIONADO SEM ALTERAR NADA
   * ====================================================== */
  const btn = document.querySelector('.btn-menu');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  if (btn && sidebar && overlay) {
      btn.addEventListener('click', () => {
          sidebar.classList.toggle('active');
          overlay.classList.toggle('active');
      });

      overlay.addEventListener('click', () => {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
      });
  } else {
      console.warn('[DEBUG] menu lateral: btn, sidebar ou overlay não encontrado');
  }

}); // fim do DOMContentLoaded