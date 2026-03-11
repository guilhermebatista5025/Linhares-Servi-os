const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/linhares.db");

db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nome TEXT,
 email TEXT UNIQUE,
 senha TEXT
)
`);

module.exports = db;