// Aqui provavelmente são as VARs e funções que vinculão ao banco de dados: 
const { links } = require("express/lib/response");
var database = require("../database/config")
// Aqui vamos criar as funções com os nomes as ROUTS que nós criamos.
// Dentro das () da function vamos adicionar as variaveis que foram encaminhadas lá no usuarioModel (Devemos adicionar elas no console.log também).
// E após adicionarmos as variaveis vamos criar uma var instrucao = `` e dentro da `` vamos colocar as QUERIS que desejamos (insert into, select e por ai vai...)
// OBS: Quando nós mexemos das QUERYs devemos colocar delas o campo do banco que vamos dar o comando exatamente como está escrito no banco de dados, não inserimos apenas as VARs.
// No caso do login vamos umar uma QUERY de SELECT e vamos utilizar o WHERE para localizar os dados informados nas VARs.
function listarEmpresasCadastradas() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM empresa;
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarlinhas(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM linha WHERE fkEmpresa = ${idEmpresa};
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarOnibus(rotaEscolhida) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT onibus.numeroOnibus, onibus.placaOnibus, rota FROM onibus join linha on fkLinha = idLinha join empresa on fkEmpresa = idEmpresa where idLinha =  ${rotaEscolhida};
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function entrar(email, senha, empresa, tipoUsuario) { // Adicionamos as variaveis aqui
    console.log(`
    ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> 
    verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar():
    `, email, senha, tipoUsuario) // Adicionamos as variaveis aqui
    var instrucao = `
                SELECT
                    usuario.emailUsuario,
                    usuario.senhaUsuario,
                    empresa.nomeEmpresa,
                    empresa.empresaGestora,
                    empresa.idEmpresa
                    FROM usuario
                    JOIN empresa  
                    ON idEmpresa = fkEmpresa
                        WHERE emailUsuario = '${email}'
                        AND senhaUsuario = '${senha}'
                        AND idEmpresa = '${empresa}';
           
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// Aqui vamos criar as funções com os nomes as ROUTS que nós criamos.
// Dentro das () da function vamos adicionar as variaveis que foram encaminhadas lá no usuarioModel (Devemos adicionar elas no console.log também).
// E após adicionarmos as variaveis vamos criar uma var instrucao = `` e dentro da `` vamos colocar as QUERIS que desejamos (insert into, select e por ai vai...)
// OBS: Quando nós mexemos das QUERYs devemos colocar delas o campo do banco que vamos dar o comando exatamente como está escrito no banco de dados, não inserimos apenas as VARs.
// No caso de cadastro vamos usar a QUERY de INSERT INTO:
function cadastrar(
    nome, email, senha
) {
    console.log(`
    ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> 
    verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():
    `, nome, email, senha);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
                INSERT INTO cadastros 
                (nome, email, senha) VALUES 
                ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// Aqui vamos criar as funções com os nomes as ROUTS que nós criamos.
// Dentro das () da function vamos adicionar as variaveis que foram encaminhadas lá no usuarioModel (Devemos adicionar elas no console.log também).
// E após adicionarmos as variaveis vamos criar uma var instrucao = `` e dentro da `` vamos colocar as QUERIS que desejamos (insert into, select e por ai vai...)
// OBS: Quando nós mexemos das QUERYs devemos colocar delas o campo do banco que vamos dar o comando exatamente como está escrito no banco de dados, não inserimos apenas as VARs.
// No caso de cadastro vamos usar a QUERY de INSERT INTO:

    
function cadastrolinha(
    nomeLinha, rota, empresapert// Adicionamos as variaveis aqui
) {
    console.log(`
    ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> 
    verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():
    `, nomeLinha, rota, empresapert);// Adicionamos as variaveis aqui
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
                INSERT INTO linha 
                (nomeLinha, rota, fkEmpresa) VALUES 
                ('${nomeLinha}', '${rota}', '${empresapert}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
//---------------------
function cadastrarOnibus(
    numeroOnibus, placaOnibus, rotaOnibus // Adicionamos as variaveis aqui
) {
    console.log(`
    ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> 
    verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():
    `, numeroOnibus, placaOnibus, rotaOnibus); // Adicionamos as variaveis aqui
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
                INSERT INTO onibus 
                (numeroOnibus, placaOnibus, fkLinha) VALUES 
                ('${numeroOnibus}', '${placaOnibus}', '${rotaOnibus}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// Esse é um arquivo que propavelmente encaminha os dados entras as funções.js:
// Aqui dentro temos que adicionar o nome das novas funções que criamos acima:
module.exports = {
    entrar,
    cadastrolinha,
    cadastrarOnibus,
    listarEmpresasCadastradas,
    listarlinhas,
    listarOnibus,
    cadastrar    
};