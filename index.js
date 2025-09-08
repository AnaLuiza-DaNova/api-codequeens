const express = require('express');
const app = express();

app.use(express.json());

// criar um array chamado "pessoas"

let pessoas = [
    { id: 1, nome: 'Lara', idade: 14, altura: 155 },
    { id: 2, nome: 'Ana Luíza', idade: 13, altura: 163 },
    { id: 3, nome: 'Gaby', idade: 21, altura: 156 },
    { id: 4, nome: 'Carol', idade: 18, altura: 160 },
    { id: 5, nome: 'Valentina', idade: 13, altura: 165 }
]

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de pessoas funcionando' });
});

//Endpoin
app.get('/pessoas', (req, res) => {
    res.json(pessoas)
})

//API do tipo POST (adicionar dados)
app.post("/pessoa", (req, res) => {
    const { nome, idade } = req.body;
    const newUser = {
        id: pessoas.length + 1,
        nome,
        idade,
    };
    console.log("Novos dados: ", newUser)
    pessoas.push(newUser);
    res.status(201).json(newUser); //código de criação com sucesso, 500 ferrou o backend
});

//API do tipo GET para buscar 1 pessoa só por ID
//rota: http://localhost:3000/pessoa/2
app.get("/pessoa/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(u => u.id === id);

    if (!pessoa) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(pessoa);

})

//endpoint 05 do tipo PUT/PATCH  = 'http://localhost:3000/1'
app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log ("ID: ", id)

    const pessoa = pessoas.find(p => p.id === id);
    console.log ("pessoa: ", pessoa)

    if (!pessoa) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
   
    const novaPessoa = req.body;
    console.log ("Antiga pessoa: ", pessoa)
    console.log ("Nova pessoa: ", novaPessoa)
    
    pessoa.nome = novaPessoa.nome
    pessoa.idade = novaPessoa.idade
    pessoa.altura = novaPessoa.altura
    pessoas[pessoa.id - 1] = pessoa

    console.log("Pessoas: ", pessoas)
    res.json(pessoas);
})

//Endpoint 06 do tipo DELETE
app.delete ('/deletarpessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
})

const PORT = 3000;  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//
