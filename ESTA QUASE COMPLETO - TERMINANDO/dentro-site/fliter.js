const profissionais = [
    {
        id: 1,
        nome: "João Silva",
        profissao: "Eletricista",
        descricao: "Serviços rápidos e seguros em instalações elétricas.",
        avaliacao: "",
        imagem: "https://www.shutterstock.com/shutterstock/photos/2682948513/display_1500/stock-photo-solar-panel-happy-man-and-portrait-of-engineer-with-arms-crossed-on-roof-in-city-photovoltaic-2682948513.jpg"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        profissao: "Pintora",
        descricao: "Transforme seu ambiente com cores vivas e acabamento profissional.",
        avaliacao: "",
        imagem: "https://www.shutterstock.com/shutterstock/photos/2684646245/display_1500/stock-photo-close-up-portrait-of-a-young-woman-with-curly-hair-wearing-a-red-striped-shirt-standing-outdoors-2684646245.jpg"
    },
    {
        id: 3,
        nome: "Ana Costa ",
        profissao: "Jardineiro",
        descricao: "Criação de logotipos, identidades visuais e material digital.",
        avaliacao: "",
        imagem: "https://tse3.mm.bing.net/th/id/OIP.tgy_iHKaFIYjoqCFgP-obgHaE9?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
        {
        id: 4,
        nome: "Rafael Gomes",
        profissao: "Marceneiro",
        descricao: "Móveis sob medida com qualidade e acabamento premium.   ",
        avaliacao: "",
        imagem: "https://www.shutterstock.com/shutterstock/photos/2706340785/display_1500/stock-photo-carpenter-portrait-and-man-with-arms-crossed-workshop-and-happy-for-craftsmanship-or-2706340785.jpg"
    }
    // Você pode adicionar infinitos profissionais aqui
];

// filter.js

// 1. Elementos do DOM (Baseado no seu HTML)
const searchInput = document.getElementById('searchInput');
const container = document.querySelector('.professionals .cards-container');
const sectionProfissionais = document.querySelector('.professionals');


// 2. FUNÇÃO DE RENDERIZAÇÃO (Desenha os cards na tela)
function renderizarProfissionais(lista) {
    // Limpa o conteúdo anterior
    container.innerHTML = '';

    // Verifica se a lista está vazia
    if(lista.length === 0) {
        const termoBusca = searchInput ? searchInput.value : "seu serviço";
        container.innerHTML = `
            <p style="width:100%; text-align:center; padding: 40px 0; font-size: 1.2em; color: #555;">
                Nenhum profissional encontrado para o termo: "${termoBusca}".
            </p>
        `;
        return; // Sai da função
    }

    // Cria o HTML para cada profissional encontrado
    lista.forEach(prof => {
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img src="${prof.imagem}" alt="${prof.nome}" class="card-img" />
                </div>
                <h3>${prof.nome}</h3>
                <p>${prof.profissao} - ${prof.descricao}</p>
                <div class="stars">${prof.avaliacao}</div>
                <button class="btn-outline">Pedir Orçamento</button>
            </div>
        `;
        container.innerHTML += html;
    });
    
    // Opcional: Rola a tela para mostrar os resultados
    if (sectionProfissionais && lista.length > 0 && searchInput.value.length > 0) {
        // Rola suavemente para o topo da seção de profissionais
        sectionProfissionais.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


// 3. FUNÇÃO DE FILTRAGEM (A lógica da busca)
function filtrarProfissionais() {
    // Se o input não existir (por segurança), interrompe
    if (!searchInput) return;
    
    // Pega o termo, remove espaços vazios e transforma em minúsculas
    const termo = searchInput.value.toLowerCase().trim();

    // Se o termo estiver vazio, mostra a lista completa
    if (termo === "") {
        renderizarProfissionais(profissionais);
        return;
    }

    // Filtra o array de profissionais
    const filtrados = profissionais.filter(prof => {
        // Cria uma string grande com todas as informações importantes
        const dadosBusca = [
            
            prof.profissao,
          // Inclui a descrição para buscas mais amplas
        ].join(' ').toLowerCase();

        // Verifica se a string grande contém o termo de busca
        return dadosBusca.includes(termo);
    });

    // Manda desenhar na tela apenas os profissionais filtrados
    renderizarProfissionais(filtrados);
}


// 4. INICIALIZAÇÃO E EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    // 4.1. Garante que a lista inicial seja renderizada ao carregar
    if (typeof profissionais !== 'undefined' && profissionais.length > 0) {
        renderizarProfissionais(profissionais);
    } else {
        console.error("ERRO: O array 'profissionais' está vazio ou não foi carregado.");
    }

    // 4.2. Ativa o filtro em tempo real ao digitar na barra de busca
    if (searchInput) {
        searchInput.addEventListener('input', filtrarProfissionais);
        
        // 4.3. Previne que a tecla Enter submeta o formulário (recarregue a página)
        const searchForm = searchInput.closest('form');
        if (searchForm) {
             searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                filtrarProfissionais();
            });
        }
    }
});