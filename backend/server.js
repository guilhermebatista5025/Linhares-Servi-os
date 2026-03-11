const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.listen(3000,()=>{
 console.log("Servidor rodando em http://localhost:3000");
});

app.get("/", (req,res)=>{
 res.send("O Servidor Linhares Serviços está funcionando");
});