const express = require('express');
const app = express();

app.use(express.json());

let comidas = [
    { id: 1, nome: "coxinha", peso: 100, preço: 3, cor: "laranja" },
    { id: 2, nome: "pastel", peso: 100, preço: 4, cor: "bege" },
    { id: 3, nome: "sanduíche", peso: 70, preço: 10, cor: "bege" },
    { id: 4, nome: "cupcake", peso: 50, preço: 6, cor: "rosa" },
    { id: 5, nome: "brigadeiro", peso: 15, preço: 5, cor: "marrom" }
]

app.get ('/comidas', (req, res) => {
    res.json(comidas)
})

app.get("/comida/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const comida = comidas.find(c => c.id === id);

    if (!comida) {
        return res.status(404).json({ error: "Comida não disponível" });
    }

    res.json(comida);
})

app.put('/comidas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const comida = comidas.find((c) => c.id === id);

    if (!comida) {
        res.status(404).json({
            status: 404,
            error: "NOT FOUND",
            message: "Informação não encontrada."
        })
    }

    const novaComida = req.body;

    //if (!novaComida) {
        //res.status(404).json({
            //status: 401,
          //  error: "UNAUTHORIZED",
        //    message: "Essa variável está cheia."
      //  })
    //}

    comida.nome = novaComida.nome || comida.nome
    comida.peso = novaComida.peso || comida.peso
    comida.preço = novaComida.preço || comida.preço
    comida.cor = novaComida.cor || comida.cor

    const index = comidas.findIndex((c) => c.id === id)
    comidas[index] = comida


    res.json(comidas);
})

const PORT = 3000;  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});