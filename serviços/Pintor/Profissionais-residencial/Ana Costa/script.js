// Menu móvel
const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
btn.addEventListener("click", () => nav.classList.toggle("open"));

// Containers expansíveis
const heroBtns = document.querySelectorAll(".hero-actions button");
heroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        document
            .querySelectorAll(".orcamento-container")
            .forEach((c) => (c.style.display = "none"));
        const container = document.getElementById("orcamento-" + target);
        if (container) container.style.display = "flex";
    });
});

// ELEMENTOS DO POPUP PIX
const popup = document.querySelector(".pix-popup");
const closeBtn = document.querySelector(".close-popup");
const copyBtn = document.querySelector(".copy-btn");
const pixKeyInput = document.getElementById("pix-key");
const btnConfirmar = document.getElementById("btn-confirmar-pagamento");

// Abrir popup ao clicar em Gerar QR
document.querySelectorAll(".gerar-qr").forEach((btn) => {
    btn.addEventListener("click", () => (popup.style.display = "flex"));
});

// 1. FUNÇÃO APENAS PARA COPIAR A CHAVE
copyBtn.addEventListener("click", () => {
    pixKeyInput.select();
    document.execCommand("copy");
    alert("Chave Pix copiada! Agora realize o pagamento no seu aplicativo.");
});

// 2. FUNÇÃO PARA SALVAR NO BANCO
if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {
        const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));

        if (!dadosUsuario || !dadosUsuario.id) {
            alert("Erro: Sessão expirada. Faça login novamente.");  
            // MUDE AQUI TAMBÉM
            window.location.href = "/Login-cadastro/index.html";
            return;
        }

        let dadosParaEnviar = {};

        // Verifica qual formulário está visível para pegar os dados corretos
        const orcamentoSolicitar = document.getElementById("orcamento-solicitar");
        const orcamentoPessoalmente = document.getElementById("orcamento-pessoalmente");

        if (orcamentoSolicitar && orcamentoSolicitar.style.display === "flex") {
            const data = document.getElementById('data-servico-solicitar');
            const hora = document.getElementById('horario-servico-solicitar');

            if (!data.value || !hora.value) {
                alert("Por favor, preencha a Data e o Horário antes de confirmar.");
                return;
            }

            dadosParaEnviar = {
                cliente_id: dadosUsuario.id,
                nome_servico: "Solicitar Agora",
                profissional: "Bruna Silva",
                descricao: "Serviço solicitado via formulário direto",
                horario: `${data.value} às ${hora.value}`,
                data_pagamento: new Date().toLocaleDateString('pt-BR'),
                local: "A combinar",
                metodo_pagamento: "Pix",
                valor: 109.99
            };

        } else if (orcamentoPessoalmente && orcamentoPessoalmente.style.display === "flex") {
            const data = document.getElementById('data-servico');
            const hora = document.getElementById('horario-servico');
            const local = document.getElementById('local-servico');

            if (!data.value || !hora.value || !local.value) {
                alert("Por favor, preencha Data, Horário e Local antes de confirmar.");
                return;
            }

            dadosParaEnviar = {
                cliente_id: dadosUsuario.id,
                nome_servico: "Orçamento Pessoalmente",
                profissional: "Bruna Silva",
                descricao: "Contratação confirmada via Pix",
                horario: `${data.value} às ${hora.value}`,
                data_pagamento: new Date().toLocaleDateString('pt-BR'),
                local: local.value,
                metodo_pagamento: "Pix",
                valor: 59.99
            };
        }

        // Envio para o Back-end
        try {
            const response = await fetch("http://localhost:3000/api/contratar-servico", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (response.ok) {
                alert("Pagamento confirmado! Redirecionando...");
                popup.style.display = "none";
                window.location.href = "/Dashboard/index.html";
            } else {
                const erro = await response.json();
                alert("Erro ao salvar: " + (erro.msg || "Erro no servidor."));
            }
        } catch (error) {
            console.error("Erro na conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    });
}

// 3. FUNÇÕES PARA FECHAR O POPUP
closeBtn.addEventListener("click", () => popup.style.display = "none");

window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") popup.style.display = "none";
});

// Avaliações dinâmicas
document.querySelectorAll(".testimonial-rating").forEach((ratingEl) => {
    const rating = parseFloat(ratingEl.dataset.rating);
    const starsInner = ratingEl.querySelector(".stars-inner");
    if (starsInner) {
        const starPercentage = (rating / 5) * 100;
        starsInner.style.width = `${starPercentage}%`;
    }
});
