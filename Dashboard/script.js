    document.addEventListener("DOMContentLoaded", async () => {
        // 1. IDENTIFICAÇÃO DO USUÁRIO E CONTAINER
        const container = document.querySelector(".servicos-container"); 
        const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioLogado) {
            alert("Sessão expirada. Por favor, faça login.");
            window.location.href = "../login/index.html"; 
            return;
        }

        try {
            // 2. BUSCA OS DADOS NO SEU BACK-END (NODE/SQLITE)
            const response = await fetch(`http://localhost:3000/api/meus-servicos/1${usuarioLogado.id}`);
            const servicos = await response.json();

            if (servicos.length === 0) {
                container.innerHTML = "<p style='color: white; text-align: center; width: 100%; grid-column: 1/-1;'>Você ainda não contratou nenhum serviço.</p>";
                return;
            }

            // 3. LIMPA O CONTEÚDO E GERA OS CARDS COM SUAS CLASSES ORIGINAIS
            container.innerHTML = ""; 

            servicos.forEach(s => {
                container.innerHTML += `
                    <div class="servico-card">
                        <div class="profissional-img">
                            <img src="https://i.pravatar.cc" alt="Profissional">
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

                            <div class="card-footer" style="margin-top: 15px; display: flex; gap: 10px;">
                                <button class="btn-detalhes">Ver detalhes</button>
                                ${s.status === 'ATIVO' ? '<button class="btn-cancelar">Cancelar</button>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            });

            // 4. ATIVA AS SUAS FUNCIONALIDADES ORIGINAIS (CANCELAR E DETALHES)
            inicializarInteracoes();

        } catch (error) {
            console.error("Erro ao carregar serviços do banco:", error);
        }
    });

    // FUNÇÃO QUE CONTÉM TODA A SUA LÓGICA ORIGINAL
    function inicializarInteracoes() {
        
        // --- CANCELAR SERVIÇO (ORIGINAL) ---
        const botoesCancelar = document.querySelectorAll(".btn-cancelar");
        botoesCancelar.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const card = e.target.closest(".servico-card");
                const status = card.querySelector(".status");
                const metodo = card.querySelector(".metodo").textContent;

                status.textContent = "CANCELADO";
                status.classList.remove("ativo");
                status.classList.add("cancelado");

                if (metodo.includes("PIX")) {
                    alert("Pagamento realizado via PIX.\n\nO estorno será devolvido para a mesma chave PIX utilizada no pagamento em até 72 horas.");
                }
                e.target.remove();
            });
        });

        // --- POPUP DE COMPROVANTE (ORIGINAL) ---
        const popup = document.getElementById("popup");
        const fecharPopup = document.getElementById("fecharPopup");
        const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

        botoesDetalhes.forEach((btn) => {
            btn.addEventListener("click", () => {
                const card = btn.closest(".servico-card");

                const servico = card.querySelector(".servico-nome").textContent;
                const profissional = card.querySelector(".profissional").textContent;
                const horario = card.querySelector(".horario").textContent.replace("Horário:", "").trim();
                const pagamento = card.querySelector(".pagamento").textContent.replace("Pagamento:", "").trim();
                const local = card.querySelector(".local").textContent.replace("Local:", "").trim();
                const metodo = card.querySelector(".metodo").textContent.replace("Método:", "").trim();
                const statusCard = card.querySelector(".status");

                // Preencher recibo
                document.getElementById("recibo-servico").textContent = servico;
                document.getElementById("recibo-profissional").textContent = profissional;
                document.getElementById("recibo-horario").textContent = horario;
                document.getElementById("recibo-pagamento").textContent = pagamento;
                document.getElementById("recibo-local").textContent = local;
                document.getElementById("recibo-metodo").textContent = metodo;

                const reciboStatus = document.getElementById("recibo-status");
                reciboStatus.className = statusCard.className;

                if (statusCard.textContent === "ATIVO") {
                    reciboStatus.textContent = "Serviço Contratado com Sucesso";
                } else {
                    reciboStatus.textContent = "Serviço Cancelado";
                }

                popup.style.display = "flex";
            });
        });

        // FECHAR POPUP
        fecharPopup.addEventListener("click", () => {
            popup.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    }
