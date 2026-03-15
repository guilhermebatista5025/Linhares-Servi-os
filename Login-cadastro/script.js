const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
 container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
 container.classList.remove("active");
});


// ... (mantenha o código do container.classList)

function cadastrar() {
    const nome = document.querySelector(".sign-up input[type='text']").value;
    const email = document.querySelector(".sign-up input[type='email']").value;
    const senha = document.querySelector(".sign-up input[type='password']").value;

    fetch("http://localhost:3000/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.msg);
        // Opcional: Se o cadastro deu certo, você pode trocar a aba para o login automaticamente
        if (data.msg === "Usuário cadastrado com sucesso!") {
            container.classList.remove("active");
        }
    });
}

function login() {
    const email = document.querySelector(".sign-in input[type='email']").value;
    const senha = document.querySelector(".sign-in input[type='password']").value;

    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Dados recebidos:", data);

        if (data.msg === "Login OK") {
            // 1. SALVAR OS DADOS (Isso é o que as outras páginas vão checar)
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            
            alert("Bem-vindo(a)!");

            // 2. REDIRECIONAR PARA O DASHBOARD OU HOME
            // Se o index.html for a sua landing page protegida:
            window.location.href = "/index.html"; 
        } else {
            alert(data.msg || "Email ou senha incorretos.");
        }
    })
    .catch(err => {
        console.error("Erro no fetch:", err);
        alert("Erro ao conectar com o servidor.");
    });
}
