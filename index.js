const express = require('express');
const app = express();

app.use(express.json());

// criar um array chamado "pessoas"

let pessoas = [
    {nome:'Lara', idade:14, altura:155},
    {nome:'Ana Luíza', idade:13, altura:163},
    {nome:'Gaby', idade:21, altura:156},
    {nome:'Carol', idade:18, altura:160},
    {nome:'Valentina', idade:13, altura:165}
]

app.get('/',(req, res) => {
    res.json({ mensagem: 'API de pessoas funcionando' });
});

app.get('/pessoas', (req, res) => {
    res.json(pessoas)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//
