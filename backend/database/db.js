const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/linhares.db");


// TABELA DE USUÁRIOS
db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nome TEXT,
 email TEXT UNIQUE,
 senha TEXT
)
`);


// TABELA DE SERVIÇOS CONTRATADOS
db.run(`
CREATE TABLE IF NOT EXISTS servicos_contratados (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 cliente_id INTEGER,
 nome_servico TEXT,
 profissional TEXT,
 foto_profissional TEXT, -- CAMPO NOVO PARA A IMAGEM
 descricao TEXT,
 horario TEXT,
 data_pagamento TEXT,
 local TEXT,
 metodo_pagamento TEXT,
 valor REAL,
 status TEXT DEFAULT 'ATIVO',
 data_contratacao DATETIME DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
)
`);



module.exports = db;
