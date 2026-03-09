let services = [
    {id:1, name:"Limpeza", client:"João", status:"Ativo", date:"2025-12-11", postponeReason:""},
    {id:2, name:"Instalação", client:"Maria", status:"Concluído", date:"2025-12-10", postponeReason:""},
    {id:3, name:"Manutenção", client:"Carlos", status:"Pendente", date:"2025-12-09", postponeReason:""},
];

// Atualiza dashboard
function updateDashboard() {
    const statusCount = {Ativo:0, Concluído:0, Pendente:0, Erro:0};
    services.forEach(s => {
        if (statusCount[s.status] !== undefined) statusCount[s.status]++;
    });

    document.getElementById("activeServices").innerText = statusCount.Ativo;
    document.getElementById("completedServices").innerText = statusCount.Concluído;
    document.getElementById("pendingServices").innerText = statusCount.Pendente;
    document.getElementById("errorServices").innerText = statusCount.Erro;

    const tableBody = document.getElementById("serviceTable");
    tableBody.innerHTML = "";

    services.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.client}</td>
            <td>${s.status}</td>
            <td>${s.date}</td>
            <td>${s.postponeReason ? s.postponeReason : "-"}</td>
            <td class="d-flex gap-1 flex-wrap">
                <button class="btn btn-sm btn-warning" onclick="editService(${s.id})">
                    Editar
                </button>

                <button class="btn btn-sm btn-secondary" onclick="openPostpone(${s.id})">
                    Adiar
                </button>

                <button class="btn btn-sm btn-success" onclick="openQuestionario(${s.id})">
                    Questionário
                </button>

                <button class="btn btn-sm btn-danger" onclick="deleteService(${s.id})">
                    Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    updateCardClasses();
}

// Atualiza classes CSS nos cards
function updateCardClasses() {
    const cards = [
        {id:"activeServices", status:"ativo"},
        {id:"completedServices", status:"concluido"},
        {id:"pendingServices", status:"pendente"},
        {id:"errorServices", status:"erro"}
    ];

    cards.forEach(c => {
        const card = document.getElementById(c.id).parentElement.parentElement;
        card.classList.remove("ativo","concluido","pendente","erro");
        card.classList.add(c.status);
    });
}

// Adicionar / Editar serviço
function addService(service) {
    if (service.id) {
        services = services.map(s => s.id === service.id ? service : s);
    } else {
        service.id = services.length ? Math.max(...services.map(s => s.id)) + 1 : 1;
        service.postponeReason = "";
        services.push(service);
    }
    updateDashboard();
}

// Editar serviço
function editService(id) {
    const s = services.find(s => s.id === id);
    document.getElementById("editId").value = s.id;
    document.getElementById("serviceName").value = s.name;
    document.getElementById("serviceClient").value = s.client;
    document.getElementById("serviceStatus").value = s.status;
    document.getElementById("serviceDate").value = s.date;
}

// Excluir serviço
function deleteService(id) {
    if (confirm("Quer mesmo excluir esse serviço?")) {
        services = services.filter(s => s.id !== id);
        updateDashboard();
    }
}

// Form adicionar/editar
document.getElementById("serviceForm").addEventListener("submit", e => {
    e.preventDefault();

    const service = {
        id: document.getElementById("editId").value
            ? parseInt(document.getElementById("editId").value)
            : null,
        name: document.getElementById("serviceName").value,
        client: document.getElementById("serviceClient").value,
        status: document.getElementById("serviceStatus").value,
        date: document.getElementById("serviceDate").value,
        postponeReason: ""
    };

    addService(service);
    e.target.reset();
    document.getElementById("editId").value = "";
});

// Modal Adiar
function openPostpone(id) {
    const s = services.find(s => s.id === id);
    document.getElementById("postponeId").value = s.id;
    document.getElementById("postponeReason").value = s.postponeReason;
    document.getElementById("postponeDate").value = s.date;
    document.getElementById("postponeModal").style.display = "block";
}

function closeModal() {
    document.getElementById("postponeModal").style.display = "none";
}

// Salvar adiação
function savePostpone() {
    const id = parseInt(document.getElementById("postponeId").value);
    const reason = document.getElementById("postponeReason").value;
    const newDate = document.getElementById("postponeDate").value;

    const s = services.find(s => s.id === id);
    s.date = newDate;
    s.status = "Pendente";
    s.postponeReason = reason;

    updateDashboard();
    closeModal();
}

// BOTÃO QUESTIONÁRIO
function openQuestionario(id) {
    alert("Questonario não encontrado! ID: " + id);
    // futuro:
    // window.location.href = `questionario.html?id=${id}`;
}

// Inicializa
updateDashboard();
