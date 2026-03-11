const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.post("/cadastro",(req,res)=>{

 const {nome,email,senha} = req.body;

 db.get("SELECT * FROM usuarios WHERE email = ?",[email],(err,row)=>{

  if(row){
   return res.json({msg:"Email já cadastrado"});
  }

  db.run(
   "INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)",
   [nome,email,senha],
   function(err){

    if(err){
     return res.json({msg:"Erro ao cadastrar"});
    }

    res.json({msg:"Conta criada"});
   }
  );

 });

});


router.post("/login",(req,res)=>{

 const {email,senha} = req.body;

 db.get(
  "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
  [email,senha],
  (err,row)=>{

   if(row){
    res.json({msg:"Login OK"});
   }else{
    res.json({msg:"Email ou senha incorretos"});
   }

  }
 );

});

module.exports = router;