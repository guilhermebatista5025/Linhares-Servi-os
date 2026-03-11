const db = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Custo do processamento (10 é o padrão ideal)

exports.cadastro = async (req, res) => {
    const { nome, email, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
        if (row) return res.json({ msg: "Email já cadastrado" });

        try {
            // Gerando o Hash da senha
            const hash = await bcrypt.hash(senha, saltRounds);

            db.run(
                "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)",
                [nome, email, hash], // Salvando o HASH, não a senha pura
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

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, row) => {
        if (!row) {
            return res.json({ msg: "Email ou senha incorretos" });
        }

        // Comparando a senha digitada com o Hash que está no banco
        const senhaCorreta = await bcrypt.compare(senha, row.senha);

        if (senhaCorreta) {
            res.json({ msg: "Login OK" });
        } else {
            res.json({ msg: "Email ou senha incorretos" });
        }
    });
};