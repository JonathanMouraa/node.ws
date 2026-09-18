const express = require("express");

const app = express();

app.use(express.json());

// DADOS EM MEMÓRIA
let produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 120 }
];

// ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.status(200).send("API funcionando!");
});

// GET - LISTAR PRODUTOS
app.get("/produtos", (req, res) => {

  const { nome } = req.query;

  if (nome) {
    const resultado = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );

    return res.status(200).json(resultado);
  }

  res.status(200).json(produtos);
});

// GET - BUSCAR PRODUTO POR ID
app.get("/produtos/:id", (req, res) => {

  const id = Number(req.params.id);

  const produto = produtos.find(produto => produto.id === id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  res.status(200).json(produto);
});

// POST - CRIAR PRODUTO
app.post("/produtos", (req, res) => {

  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      mensagem: "Nome e preço são obrigatórios"
    });
  }

  const novoProduto = {
    id: produtos.length > 0
      ? produtos[produtos.length - 1].id + 1
      : 1,
    nome: nome,
    preco: preco
  };

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// PUT - ATUALIZAR PRODUTO COMPLETO
app.put("/produtos/:id", (req, res) => {

  const id = Number(req.params.id);

  const produto = produtos.find(produto => produto.id === id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      mensagem: "Nome e preço são obrigatórios"
    });
  }

  produto.nome = nome;
  produto.preco = preco;

  res.status(200).json(produto);
});

// PATCH - ATUALIZAÇÃO PARCIAL
app.patch("/produtos/:id", (req, res) => {

  const id = Number(req.params.id);

  const produto = produtos.find(produto => produto.id === id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  const { nome, preco } = req.body;

  if (nome !== undefined) {
    produto.nome = nome;
  }

  if (preco !== undefined) {
    produto.preco = preco;
  }

  res.status(200).json(produto);
});

// DELETE - EXCLUIR PRODUTO
app.delete("/produtos/:id", (req, res) => {

  const id = Number(req.params.id);

  const indice = produtos.findIndex(produto => produto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  produtos.splice(indice, 1);

  res.status(204).send();
});


// HEADER DE EXEMPLO
app.get("/headers", (req, res) => {

  const tipo = req.headers["x-tipo"];

  res.status(200).json({
    mensagem: "Header recebido",
    tipo: tipo || "não informado"
  });
});

// SERVIDOR
app.listen(3000, "0.0.0.0", () => {
  console.log("API rodando na porta 3000");
});
