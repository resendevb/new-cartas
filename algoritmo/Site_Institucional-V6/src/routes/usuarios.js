// Essa var provavelmente direciona os dados da routes.js para usuarioController.js:
var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");
// Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// Aqui podemos criar novas ROUTEs para mais a frente criar novas funções:
// OBS: Ao criar novar ROUTEs devemos apanas copiar umas exatamente como estar e mudar o nome que estar dentro das () e após o usuarioController.
//usuarios cadastradas:

// get é para para puxar dados do banco
//router.get("/listarEmpresasCadastradas", function (req, res) {
   // usuarioController.listarEmpresasCadastradas(req, res);
//});
//Lista de linhas das empresas cadastradas:
//router.get("/listarlinhas/:idEmpresa", function (req, res) {
  //  usuarioController.listarlinhas(req, res);
//});
//Lista de onibus cadastrados nas rotas:
//router.get("/listarOnibus/:rotaEscolhidaVar", function (req, res) {
   // usuarioController.listarOnibus(req, res);
//});



//Cadastro de usuarios:
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});


module.exports = router;