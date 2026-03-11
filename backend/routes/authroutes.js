const express = require("express");
const router = express.Router();
// Importa o controller que criamos acima
const authController = require("../controllers/authcontroller");

// Agora a rota apenas aponta para a função no controller
router.post("/cadastro", authController.cadastro);
router.post("/login", authController.login);

module.exports = router;