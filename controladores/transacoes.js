let { saques , depositos, transferencias, contas } = require('../bancodedados');

const depositarNaConta = (req,res) => {
    const { numeroConta, valor } = req.body;
    
    if (!numeroConta && !valor) {
        return res.status(400).json({ erro: 'Número da conta e valor do depósito devem ser informados.' });
      }
    const numeroContaBancaria = contas.find((numero)=>{
        return Number(numero.numeroConta) === Number(numeroConta)
    });  
    
    if(!numeroContaBancaria){
        return res.status(404).json({ mensagem: 'Não existe o numero de conta bancária informado'});
    }
    if (valor <= 0) {
        return res.status(400).json({ erro: 'O valor do depósito deve ser maior que zero.' });
    }

   const data = new Date();
    numeroContaBancaria.saldo = numeroContaBancaria.saldo + valor;
    depositos.push({data,numeroConta, valor});
    return res.status(200).json({ mensagem: 'Depósito realizado com sucesso.' });
}


const sacarDaConta = (req,res) => {
    let { numeroConta, valor, senha } = req.body;

    if (!numeroConta && !valor && !senha) {
        return res.status(400).json({ mensagem: 'Número da conta, valor do saque e a senha devem ser informados.' });
    }
    
    const numeroContaBancaria = contas.find((numero)=>{
        return Number(numero.numeroConta) === Number(numeroConta);
    });   
    
    if(!numeroContaBancaria){
        return res.status(404).json({ mensagem: 'Não existe o numero de conta bancária informado'});
    }    

    if(valor > numeroContaBancaria.saldo){
        return res.status(404).json({ mensagem: `O seu saldo é de ${numeroContaBancaria.saldo} reais, insuficiente para saque`});
    }

    if(numeroContaBancaria.usuario.senha !== senha){
        return res.status(400).json({ mensagem: 'A senha informada é inválida'});

    }

    const data = new Date();
    numeroContaBancaria.saldo = numeroContaBancaria.saldo - valor;
    saques.push(
        {data,
        numeroConta, 
        valor});

        return res.status(200).json({ mensagem: 'Saque realizado com sucesso.' });

    }


    const transferirDaConta = (req, res) => {
        let {numeroContaOrigem, numeroContaDestino, valor , senhaContaOrigem } = req.body;

        if(!numeroContaDestino && !numeroContaOrigem && !valor && !senhaContaOrigem){
            return res.status(400).json({ mensagem: 'Número da conta de origem, destino, valor e senha devem ser informados.' });
        }

        const numeroContaBancariaOrigem = contas.find((numero)=>{
            return Number(numero.numeroConta) === Number(numeroContaOrigem)
        });
           
        if(!numeroContaBancariaOrigem){
            return res.status(400).json({ mensagem: 'O numero da conta bancária de origem não existe'});
        }

        const numeroContaBancariaDestino = contas.find((numero)=>{
            return Number(numero.numeroConta) === Number(numeroContaDestino)
        });
           
        if(!numeroContaBancariaDestino){
            return res.status(400).json({ mensagem: 'O numero da conta bancária de destino não existe'});
        }

        if(numeroContaBancariaOrigem.usuario.senha !== senhaContaOrigem ){
            return res.status(400).json({ mensagem: 'A senha informada é inválida'});

        }

        if(numeroContaBancariaOrigem.saldo < valor){
            return res.status(400).json({ mensagem: 'O valor é insuficiente para a transferência'});

        }


    const data = new Date();   
    numeroContaBancariaOrigem.saldo = numeroContaBancariaOrigem.saldo - valor;
    numeroContaBancariaDestino.saldo = numeroContaBancariaDestino.saldo + valor;
    const objeto = {
            data,
            numeroContaOrigem,
            numeroContaDestino,
            valor
    }
    
    transferencias.push(objeto);
    return res.status(200).json({ mensagem: "Transferência realizada com sucesso!"});

}


module.exports = {

    depositarNaConta,
    sacarDaConta,
    transferirDaConta,
 

}