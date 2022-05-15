// Essa var provavelmente direciona os dados do usuarioController.js para usuarioModel.js:
var usuarioModel = require("../models/usuarioModel");
var sessoes = [];
// Aqui vamos adicionar novas funções (funções essas com os nomes das routes que criamos).
// Dentro das funções vamos adicionar as variaveis, verificações e adcionar as variaveis ao usuarioModel.
function testar(req, res) {
  //console.log indica os erros
    console.log("ENTRAMOS NA usuarioController"); 
    //res.json 
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarEmpresasCadastradas(req, res) {
    usuarioModel.listarEmpresasCadastradas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
} 
function listarlinhas(req, res) {
    var varIdEmpresa = req.params.idEmpresa;
    usuarioModel.listarlinhas(varIdEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function listarOnibus(req, res) {
    var rotaEscolhida = req.params.rotaEscolhidaVar;
    usuarioModel.listarOnibus(rotaEscolhida)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function entrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo .html:
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    //Verificações das variaveis:
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        // Aqui encaminhamos ela para o usuarioModel.js:
        usuarioModel.entrar(email, senha, empresa, tipoUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                    if (resultado.length == 1) {
                        var empresaGestora = resultado[0].empresaGestora
                        var nomeEmpresa = resultado[0].nomeEmpresa
                        var idEmpresa = resultado[0].idEmpresa
                        res.json({ empresaGestora, nomeEmpresa, idEmpresa });
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo .html:
    var nome = req.body.nomeServer
    var email = req.body.emailfuncServer
    var senha = req.body.senhafuncServer
    
    //Verificações das variaveis:
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Aqui encaminhamos ela para o usuarioModel.js:
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


        

// Esse é um arquivo que propavelmente encaminha os dados entras as funções.js:
// Aqui dentro temos que adicionar o nome das novas funções que criamos acima:
module.exports = {
    entrar,
    cadastrar,
    listarlinhas,
    listarOnibus,
    listarEmpresasCadastradas,
    testar    
}