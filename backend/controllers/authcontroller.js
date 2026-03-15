const db = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// CADASTRO

exports.cadastro = async (req, res) => {
    const { nome, email, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
        if (row) return res.json({ msg: "Email já cadastrado" });

        try {
            const hash = await bcrypt.hash(senha, saltRounds);

            db.run(
                "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)",
                [nome, email, hash],
                function(err) {
                    if (err) return res.json({ msg: "Erro ao cadastrar" });
                    res.json({ msg: "Conta criada com segurança" });
                }
            );

        } catch (error) {
            res.json({ msg: "Erro ao processar senha" });
        }
    });
};


// LOGIN

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {

        if (!row) {
            return res.json({ msg: "Email ou senha incorretos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, row.senha);

        if (senhaCorreta) {
            res.json({
                msg: "Login OK",
                usuario: {
                    id: row.id,
                    nome: row.nome,
                    email: row.email
                }
            });
        } else {
            res.json({ msg: "Email ou senha incorretos" });
        }

    });
};



// CONTRATAR SERVIÇO

exports.contratarServico = (req,res)=>{

const {
cliente_id,
nome_servico,
profissional,
descricao,
horario,
data_pagamento,
local,
metodo_pagamento,
valor
} = req.body


db.run(`
INSERT INTO servicos_contratados
(cliente_id,nome_servico,profissional,descricao,horario,data_pagamento,local,metodo_pagamento,valor)
VALUES (?,?,?,?,?,?,?,?,?)
`,
[
cliente_id,
nome_servico,
profissional,
descricao,
horario,
data_pagamento,
local,
metodo_pagamento,
valor
],
function(err){

if(err){
return res.status(500).json({erro:err.message})
}

res.json({
msg:"Serviço contratado com sucesso",
id:this.lastID
})

})

};

// BUSCAR SERVIÇOS DO CLIENTE
exports.listarServicosPorCliente = (req, res) => {
    const { cliente_id } = req.params; // Vamos passar o ID pela URL

    const sql = "SELECT * FROM servicos_contratados WHERE cliente_id = ? ORDER BY id DESC";

    db.all(sql, [cliente_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Retorna a lista de serviços encontrados
        res.json(rows);
    });
};
