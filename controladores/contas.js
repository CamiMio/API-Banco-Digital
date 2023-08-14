let {contas,depositos,saques,transferencias} = require('../bancodedados');

const cadastrarConta = (req , res) => {
    let ultimaConta = 1
    if (contas.length > 0) {
        let ultimoIndice = contas.length - 1;
        if(contas[ultimoIndice].numeroConta){
        ultimaConta = Number(contas[ultimoIndice].numeroConta + 1);} }

        let novaConta = {
            numeroConta: ultimaConta,
            saldo: 0,
            usuario: {...req.body}
        }
        contas.push(novaConta);
        return res.status(201).json(novaConta);    
     
}

const listarContas = (req,res) => {

    if(contas.length <= 0){
      return res.status(200).json({mensagem: " Não há contas bancárias cadastradas"});}
     return res.status(200).json(contas);

}

const atualizarContas = (req, res) => {
    const {numeroConta} = req.params;
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
   
    const numeroContaBancaria = contas.find((numero)=>{
    return Number(numero.numeroConta) === Number(numeroConta)});


    numeroContaBancaria.usuario.nome = nome
    numeroContaBancaria.usuario.cpf = cpf
    numeroContaBancaria.usuario.data_nascimento = data_nascimento
    numeroContaBancaria.usuario.telefone = telefone
    numeroContaBancaria.usuario.email = email
    numeroContaBancaria.usuario.senha = senha
    return res.status(200).json({mensagem:'Conta atualizada com sucesso'});
}




const deletarContas = (req,res) => {
    const {numeroConta} = req.params;
    contas = contas.filter((conta) => {
        return Number(conta.numeroConta) != Number(numeroConta);
    });

    return res.status(200).json({mensagem: "Conta excluída com sucesso"});
}


const saldoDaConta = (req,res) => {
    let { numeroConta, senha } = req.query;
      if(!numeroConta && !senha){
       return res.status(400).json({ mensagem: 'Número da conta e a senha devem ser informados.' });
       }

       const numeroContaBancaria = contas.find((numero)=>{
        return Number(numero.numeroConta) === Number(numeroConta)
        });
    
        if(!numeroContaBancaria){
        return res.status(404).json({ mensagem: 'Não existe o numero de conta bancária informado'});
        }
       
       if(numeroContaBancaria.usuario.senha !== senha ){
        return res.status(400).json({ mensagem: 'A senha informada é inválida'});
        }

       numeroContaBancaria.saldo = numeroContaBancaria.saldo;
       return res.status(200).json({saldo: numeroContaBancaria.saldo});  
   }

const extratoDaConta = (req,res) => {
    let { numeroConta, senha } = req.query;
    
    if(!numeroConta && !senha){
     return res.status(400).json({ erro: 'Número da conta e a senha devem ser informados.' });
     }
    const numeroContaBancaria = contas.find((numero)=>{
        return Number(numero.numeroConta) === Number(numeroConta)
    });

    if(!numeroContaBancaria){
        return res.status(404).json({ mensagem: 'Não existe o numero de conta bancária informado'});
    }

    

    const extrato = {
        numeroConta: numeroContaBancaria.numeroConta,
        
        saldo: numeroContaBancaria.saldo,

        depositos: depositos.filter((dep)=>{
            return dep.numeroConta === Number(numeroConta);
        }),
        
        saques: saques.filter((saq) => { 
            return saq.numeroConta === Number(numeroConta);
        }),

        transferenciasEnviadas:transferencias.filter((transf)=>{
            return transf.numeroContaOrigem === Number(numeroConta);
        }),

        transferenciasRecebidas:transferencias.filter((transf)=>{
            return transf.numeroContaDestino === Number(numeroConta);
        }),
    }
        return res.status(201).json(extrato);
}
module.exports = {
    cadastrarConta,
    listarContas,
    atualizarContas,
    deletarContas, 
    saldoDaConta,
    extratoDaConta
}