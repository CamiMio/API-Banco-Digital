const { Router } = require('express');

const contasControlador = require('./controladores/contas');
const transacoesControlador = require('./controladores/transacoes');

const {validarCamposObrigatoriosDaConta, validarSenhaAdministrador, validarCPFouEmailExistentes, verificarNumerodeContaValido, verificarSaldo, verificarContaExistente, verificacaoSenhaValida, senhaValida} = require('./intermediarios/validacoes');
const { verificarAoMenosUmCampo } = require('./intermediarios/validacoes');

const rotas = Router();



rotas.post('/contas', validarCamposObrigatoriosDaConta,validarCPFouEmailExistentes, contasControlador.cadastrarConta );  // criar contas


rotas.get('/contas', validarSenhaAdministrador,contasControlador.listarContas); //listar contas


rotas.put('/contas/:numeroConta/usuario',validarSenhaAdministrador, verificarAoMenosUmCampo, verificarNumerodeContaValido, validarCPFouEmailExistentes,verificarContaExistente,contasControlador.atualizarContas); // atualizar contas


rotas.delete('/contas/:numeroConta',verificarNumerodeContaValido,verificarSaldo,verificarContaExistente,contasControlador.deletarContas );//deletar conta


rotas.get('/contas/saldo', contasControlador.saldoDaConta);//ver saldo


rotas.get('/contas/extrato', contasControlador.extratoDaConta); // ver extrato





rotas.post('/transacoes/depositar',transacoesControlador.depositarNaConta ); //depositar


rotas.post('/transacoes/sacar',transacoesControlador.sacarDaConta);// sacar


rotas.post('/transacoes/transferir', transacoesControlador.transferirDaConta ); //transferir


module.exports = rotas


