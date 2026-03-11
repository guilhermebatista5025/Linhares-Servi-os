const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authroutes"); // Importando suas rotas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servindo os arquivos estáticos (HTML, CSS, JS)
// O ".." sobe uma pasta para pegar os arquivos da raiz
app.use(express.static(path.join(__dirname, "..")));

// Endereço da API 
// eu uso "/api" para não dar conflito com meus arquivos .html
app.use("/api", authRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});