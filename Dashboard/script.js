document.addEventListener("DOMContentLoaded", async () => {
    // 1. IDENTIFICAÇÃO DO USUÁRIO E CONTAINER
    const container = document.querySelector(".servicos-container");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogado) {
        alert("Sessão expirada. Por favor, faça login.");
        // MUDE PARA O CAMINHO ABSOLUTO (COM A BARRA NO INÍCIO)
        window.location.href = "/Login-cadastro/index.html";
        return;
    }

    try {
        // 2. BUSCA OS DADOS NO SEU BACK-END
        const response = await fetch(`http://localhost:3000/api/meus-servicos/${usuarioLogado.id}`);
        const servicos = await response.json();

        if (servicos.length === 0) {
            container.innerHTML = "<p style='color: black; text-align: center; width: 100%; grid-column: 1/-1;'>Você ainda não contratou nenhum serviço.</p>";
            return;
        }

        // 3. LIMPA O CONTEÚDO E GERA OS CARDS
        container.innerHTML = "";

        servicos.forEach(s => {
            // Adicionamos o ID no card para sabermos quem excluir depois
            container.innerHTML += `
                <div class="servico-card" id="card-${s.id}">
                    <div class="profissional-img">
                        <img src="https://i.pravatar.cc/150?u=${s.id}" alt="Profissional">
                    </div>

                    <div class="servico-info">
                        <div class="servico-nome">${s.nome_servico}</div>
                        <div class="profissional">${s.profissional}</div>
                        <div class="avaliacao">⭐ 5.0 (Nova Contratação)</div>
                        <div class="descricao">${s.descricao || 'Serviço contratado via plataforma.'}</div>

                        <div class="meta-grid">
                            <div class="horario"><strong>Horário:</strong> ${s.horario}</div>
                            <div class="pagamento"><strong>Pagamento:</strong> ${s.data_pagamento}</div>
                            <div class="local"><strong>Local:</strong> ${s.local}</div>
                            <div class="metodo"><strong>Método:</strong> ${s.metodo_pagamento}</div>
                            <div class="valor-fix" style="color: #00ff88; font-weight: bold;">R$ ${s.valor.toFixed(2)}</div>
                        </div>

                        <div class="status ${s.status.toLowerCase()}">${s.status}</div>

                        <div class="card-footer" style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn-detalhes">Ver detalhes</button>
                            ${s.status === 'ATIVO' ? '<button class="btn-cancelar">Cancelar</button>' : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        inicializarInteracoes();

    } catch (error) {
        console.error("Erro ao carregar serviços do banco:", error);
    }
});

// FUNÇÃO PARA EXCLUIR DEFINITIVAMENTE DO BANCO
async function excluirDoBanco(id, cardElement) {
    if (!confirm("Deseja remover permanentemente este serviço do seu histórico?")) return;

    try {
        const response = await fetch(`http://localhost:3000/api/excluir-servico/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            cardElement.remove();
            alert("Registro apagado com sucesso!");
        } else {
            alert("Erro ao apagar do banco.");
        }
    } catch (error) {
        console.error("Erro na requisição de exclusão:", error);
    }
}

function inicializarInteracoes() {
    // --- CANCELAR SERVIÇO COM OPÇÃO DE APAGAR ---
    const botoesCancelar = document.querySelectorAll(".btn-cancelar");
    botoesCancelar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".servico-card");
            const status = card.querySelector(".status");
            const metodo = card.querySelector(".metodo").textContent;
            const footer = e.target.parentElement;

            // 1. Mudança visual
            status.textContent = "CANCELADO";
            status.classList.remove("ativo");
            status.classList.add("cancelado");

            if (metodo.includes("Pix")) {
                alert("Pagamento via Pix detectado. O estorno será processado em até 72h.");
            }

            // 2. Remove o botão cancelar
            e.target.remove();

            // 3. Cria o botão de Apagar do Banco
            const btnApagar = document.createElement("button");
            btnApagar.textContent = "Apagar Registro";
            btnApagar.style.backgroundColor = "#ff4d4d";
            btnApagar.style.color = "white";
            btnApagar.style.border = "none";
            btnApagar.style.padding = "8px 12px";
            btnApagar.style.borderRadius = "5px";
            btnApagar.style.cursor = "pointer";

            const idServico = card.id.replace('card-', '');
            btnApagar.onclick = () => excluirDoBanco(idServico, card);

            footer.appendChild(btnApagar);
        });
    });

    // --- POPUP DE COMPROVANTE ---
    const popup = document.getElementById("popup");
    const fecharPopup = document.getElementById("fecharPopup");
    const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

    botoesDetalhes.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".servico-card");

            document.getElementById("recibo-servico").textContent = card.querySelector(".servico-nome").textContent;
            document.getElementById("recibo-profissional").textContent = card.querySelector(".profissional").textContent;
            document.getElementById("recibo-horario").textContent = card.querySelector(".horario").textContent.replace("Horário:", "").trim();
            document.getElementById("recibo-pagamento").textContent = card.querySelector(".pagamento").textContent.replace("Pagamento:", "").trim();
            document.getElementById("recibo-local").textContent = card.querySelector(".local").textContent.replace("Local:", "").trim();
            document.getElementById("recibo-metodo").textContent = card.querySelector(".metodo").textContent.replace("Método:", "").trim();

            const statusCard = card.querySelector(".status");
            const reciboStatus = document.getElementById("recibo-status");
            reciboStatus.className = statusCard.className;
            reciboStatus.textContent = statusCard.textContent === "ATIVO" ? "Serviço Contratado com Sucesso" : "Serviço Cancelado";

            popup.style.display = "flex";
        });
    });

    if (fecharPopup) {
        fecharPopup.addEventListener("click", () => popup.style.display = "none");
    }

    window.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });
}