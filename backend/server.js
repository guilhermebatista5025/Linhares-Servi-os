const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const authRoutes = require("./routes/authroutes");

const app = express();

// --- BANCO DE DADOS ---
const dbPath = path.join(__dirname, "database", "linhares.db"); 
const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(express.json());

// --- MIDDLEWARE DE ACESSO ---
const verificarAcesso = (req, res, next) => {
    if (req.url.includes("/css") || req.url.includes("/js") || req.url.includes("/img")) {
        return next();
    }
    if (req.url.startsWith("/api/")) {
        return next();
    }
    if (req.url.startsWith("/Login-cadastro")) {
        return next();
    }
    if (req.url === "/") {
        return res.redirect("/Login-cadastro/index.html");
    }
    next();
};

app.use(verificarAcesso);

// --- 1. ROTAS DE API (DEVEM VIR ANTES DO STATIC) ---
app.use("/api", authRoutes);

// ROTA DE EXCLUSÃO (Coloquei aqui para o Express ler primeiro)
app.delete("/api/excluir-servico/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM servicos_contratados WHERE id = ?"; 

    db.run(query, [id], function(err) {
        if (err) {
            console.error("Erro no banco:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }
        res.json({ message: "Deletado com sucesso" });
    });
});

// --- 2. ROTAS DE PÁGINAS E ARQUIVOS ESTÁTICOS ---
app.get('/meus-servicos.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Dashboard', 'index.html'));
});

// O static fica por último para não "atropelar" as rotas acima
app.use(express.static(path.join(__dirname, "..")));

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));