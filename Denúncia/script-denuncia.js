document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('denunciaForm');
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnClose = document.getElementById('btn-close');

    // Função para enviar
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btnEnviar = document.getElementById('btn-enviar');
        btnEnviar.innerText = 'Processando...';
        btnEnviar.disabled = true;

        // Simula envio
        setTimeout(() => {
            alert('Relatório enviado com sucesso. Analisaremos o caso em breve.');
            // Redireciona de volta ou limpa o form
            window.history.back();
        }, 1500);
    });

    // Funções de fechar/cancelar
    const fechar = () => {
        if(confirm("Deseja descartar as alterações?")) {
            window.history.back();
        }
    };

    btnCancelar.addEventListener('click', fechar);
    btnClose.addEventListener('click', fechar);
});