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


function login(){

 const email = document.querySelector(".sign-in input[type='email']").value;
 const senha = document.querySelector(".sign-in input[type='password']").value;

 fetch("http://localhost:3000/api/login",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body: JSON.stringify({
   email:email,
   senha:senha
  })
 })
 .then(res=>res.json())
 .then(data=>{
  alert(data.msg);

  if(data.msg === "Login OK"){
   window.location.href = "index.html";
  }

 });

}