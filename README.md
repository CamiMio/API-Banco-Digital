# API-Banco-Digital
Criação de uma RESTful API 

# Estrutura do Código
O código está organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, ele possui:
    -   Uma pasta src contendo:
    -   Um arquivo index.js
    -   Um arquivo servidor.js
    -   Um arquivo de rotas
    -   Um arquivo de bancodedados.js

    -   Um pasta com controladores contendo:
    -   Um arquivo contas.js
    -   Um arquivo transacoes.js

    -   Um pasta intermediários contendo:
    -   Um arquivo validacoes.js


## Persistências dos dados
Os dados estão sendo persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`.
    

## Status Code
Os `status code` abaixo correspondem as respostas da API.
```javascript
// 200 = requisição bem sucedida
// 201 = requisição bem sucedida e algo foi criado
// 400 = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 404 = o servidor não pode encontrar o recurso solicitado
```


## Endpoints
### Listar contas bancárias
#### `GET` `/contas?senha_banco=123`
Esse endpoint lista todas as contas bancárias existentes.
```javascript
// 2 contas encontradas
[
    {
        numero: "1",
        saldo: 0,
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar.com',
            senha: '1234'
        }
    },
    {
        numero: "2",
        saldo: 1000,
        usuario: {
            nome: 'Foo Bar 2',
            cpf: '00011122234',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar2.com',
            senha: '12345'
        }
    }
]

// nenhuma conta encontrada
[]
```



### Criar conta bancária
#### `POST` `/contas`
Esse endpoint cria uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

```javascript
// HTTP Status 201
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: 'Foo Bar',
        cpf: '00011122233',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo@bar.com',
        senha: '1234'
    }
}

// HTTP Status 400, 404
{
    mensagem: 'Mensagem do erro!'
}
```




### Atualizar usuário da conta bancária
#### `PUT` `/contas/:numeroConta/usuario`
Esse endpoint atualiza apenas os dados do usuário de uma conta bancária.
```javascript
// HTTP Status 200
{
    mensagem: "Conta atualizada com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Excluir Conta
#### `DELETE` `/contas/:numeroConta`
Esse endpoint exclui uma conta bancária existente
```javascript
// HTTP Status 200
{
    mensagem: "Conta excluída com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```




### Depositar
#### `POST` `/transacoes/depositar`
Esse endpoint soma o valor do depósito ao saldo de uma conta válida e registrar essa transação.
```javascript
// HTTP Status 200
{
    mensagem: "Depósito realizado com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

#### Exemplo do registro de um depósito

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### Sacar
#### `POST` `/transacoes/sacar`
Esse endpoint realiza o saque de um valor em uma determinada conta bancária e registrar essa transação.
```javascript
// HTTP Status 200
{
    mensagem: "Saque realizado com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```







### Tranferir
#### `POST` `/transacoes/transferir`
Esse endpoint permiti a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

```javascript
// HTTP Status 200
{
    mensagem: "Transferência realizada com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```





### Saldo
#### `GET` `/contas/saldo?numero_conta=123&senha=123`
Esse endpoint retorna o saldo de uma conta bancária.
```javascript
// HTTP Status 200
{
    saldo: 13000
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```





### Extrato
#### `GET` `/contas/extrato?numero_conta=123&senha=123`
Esse endpoint lista as transações realizadas de uma conta específica.
```javascript
// HTTP Status 200
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}
