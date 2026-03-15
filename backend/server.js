const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const authRoutes = require("./routes/authroutes");

const app = express();

// --- CONFIGURAÇÃO DO BANCO DE DADOS ---
// Ajustado para o caminho exato do seu print: backend/database/linhares.db
const dbPath = path.join(__dirname, "database", "linhares.db"); 
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite: linhares.db");
    }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Header de segurança CSP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob: 'unsafe-inline'; style-src * 'unsafe-inline';");
    next();
});

// Rotas da API
app.use("/api", authRoutes);

// Log de requisições
app.use((req, res, next) => {
    if (!req.url.includes("excluir")) console.log("O navegador pediu:", req.url);
    next();
});

// Servindo os arquivos estáticos
app.use(express.static(path.join(__dirname, "..")));

// Rota manual para o Dashboard
app.get('/meus-servicos.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Dashboard', 'index.html'));
});

// --- ROTA DE EXCLUSÃO CORRIGIDA ---
app.delete("/api/excluir-servico/:id", (req, res) => {
    const { id } = req.params;
    
    // Mudei de 'servicos' para 'servicos_contratados' como no seu print
    const query = "DELETE FROM servicos_contratados WHERE id = ?"; 

    console.log(`Tentando excluir ID ${id} da tabela servicos_contratados...`);

    db.run(query, [id], function(err) {
        if (err) {
            console.error("Erro no SQLite:", err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (this.changes === 0) {
            console.log("Nenhum serviço encontrado com esse ID.");
            return res.status(404).json({ message: "Serviço não encontrado." });
        }

        console.log(`Sucesso! Serviço ${id} removido.`);
        res.json({ message: "Deletado com sucesso" });
    });
});

// Inicialização
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});