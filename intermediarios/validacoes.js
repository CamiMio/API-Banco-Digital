const { contas,  } = require('../bancodedados');

const validarCamposObrigatoriosDaConta = (req, res, next) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) { return res.status(404).json({mensagem: "Informe o nome do cliente"})}
    if (!cpf) {return res.status(400).json({mensagem: "Informe o cpf do cliente"})}
    if (!data_nascimento) {return res.status(400).json({mensagem: "Informe a data de nascimento do cliente"})}
    if (!telefone) { return res.status(400).json({mensagem: "Informe o telefone do cliente"})}
    if (!email) { return res.status(400).json({mensagem: "Informe o e-mail do cliente"})}
    if (!senha) { return res.status(400).json({mensagem: "Informe a senha"})}
    next();
}




const validarCPFouEmailExistentes = (req, res, next) =>{
    let {email , cpf} = req.body;
    let cpfJaExistente = contas.find((conta)=>{
        return Number(conta.usuario.cpf) === Number(cpf)});

    if (cpfJaExistente) {
        return res.status(400).json({mensagem: "Já existe uma conta cadastrada com o CPF informado, insira um CPF diferente"});
    }
        
    let emailJaExistente = contas.find((conta) => {
        return conta.usuario.email === email});
    
    if (emailJaExistente) {
        return res.status(400).json({mensagem: "Já existe uma conta cadastrada com e-mail informado, insira um email"});
    }
    
    next();
}




const validarSenhaAdministrador = (req, res, next) => {
    const { senha } = req.query;
    if(!senha) {
        return res.status(400).json({mensagem: "Informe a senha"});
    }
    if(senha !== 'Cubos123Bank') {
        return res.status(400).json({mensagem: "Senha incorreta"});
    }
    next();

}


const verificarAoMenosUmCampo = (req, res, next) => {
    let = { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if(!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({mensagem: 'Informar pelo menos um dado.'});
    }

    next();

    }


   const verificarNumerodeContaValido = (req,res,next)=>{

    let {numeroConta} = req.params
    
    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'O numero conta informado não é um numero válido'});  
    }
    next();
   }




   const verificarSaldo = (req, res, next)=>{
    if(contas.saldo > 0 ) {
        return res.status(404).json({ mensagem: 'A conta informada não pode ser removida, pois o saldo deve ser igual de R$ 0,00'});
    }
    next();

   }


   const verificarContaExistente = (req, res, next)=>{
    let {numeroConta} = req.params;

    const numeroContaBancaria = contas.find((numero)=>{
        return Number(numero.numeroConta) === Number(numeroConta)
    });
    
    if(!numeroContaBancaria){
        return res.status(404).json({ mensagem: 'Não existe o numero de conta bancária informado'});
    }
    next();
   }




module.exports = {
    validarCamposObrigatoriosDaConta,
    validarCPFouEmailExistentes,
    validarSenhaAdministrador,
    verificarAoMenosUmCampo,
    verificarNumerodeContaValido,
    verificarSaldo,
    verificarContaExistente,
    

}