const express = require("express");
const router = express.Router();

const authController = require("../controllers/authcontroller");


// ROTAS DE USUÁRIO
router.post("/cadastro", authController.cadastro);
router.post("/login", authController.login);


// ROTA PARA CONTRATAR SERVIÇO
router.post("/contratar-servico", authController.contratarServico);

// ROTA PARA BUSCAR OS SERVIÇOS DO USUÁRIO LOGADO
router.get("/meus-servicos/:cliente_id", authController.listarServicosPorCliente);


module.exports = router;


