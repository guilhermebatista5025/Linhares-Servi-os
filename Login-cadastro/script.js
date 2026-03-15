const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
 container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
 container.classList.remove("active");
});


function cadastrar(){

 const nome = document.querySelector(".sign-up input[type='text']").value;
 const email = document.querySelector(".sign-up input[type='email']").value;
 const senha = document.querySelector(".sign-up input[type='password']").value;

 fetch("http://localhost:3000/api/cadastro",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body: JSON.stringify({
   nome:nome,
   email:email,
   senha:senha
  })
 })
 .then(res=>res.json())
 .then(data=>{
  alert(data.msg);
 });

}


function login() {
  const email = document.querySelector(".sign-in input[type='email']").value;
  const senha = document.querySelector(".sign-in input[type='password']").value;

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      senha: senha
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data); // Para você conferir se o "usuario" com o ID chegou

    if (data.msg === "Login OK") {
      // --- O PULO DO GATO ESTÁ AQUI ---
      // Salvamos o objeto usuario (que tem id, nome, email) no navegador
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      
      alert(data.msg);
      window.location.href = "/index.html";
    } else {
      alert(data.msg);
    }
  });
}
