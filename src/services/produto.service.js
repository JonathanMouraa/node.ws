const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 120 }
];

// Listar produtos
function listar(nome) {
    if (nome) {
        return produtos.filter(produto =>
            produto.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    return produtos;
}

// Buscar produto pelo ID
function buscarPorId(id) {
    return produtos.find(produto => produto.id === Number(id));
}

// Criar produto
function criar(dados) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("Nome e preço são obrigatórios");
    }

    const produto = {
        id: produtos.length > 0
            ? Math.max(...produtos.map(p => p.id)) + 1
            : 1,
        nome: dados.nome,
        preco: dados.preco
    };

    produtos.push(produto);

    return produto;
}

// Atualizar produto inteiro - PUT
function atualizar(id, dados) {
    const indice = produtos.findIndex(
        produto => produto.id === Number(id)
    );

    if (indice === -1) {
        return null;
    }

    if (!dados.nome || dados.preco == null) {
        throw new Error("Nome e preço são obrigatórios");
    }

    produtos[indice] = {
        id: Number(id),
        nome: dados.nome,
        preco: dados.preco
    };

    return produtos[indice];
}

// Atualizar parcialmente - PATCH
function atualizarParcial(id, dados) {
    const produto = buscarPorId(id);

    if (!produto) {
        return null;
    }

    if (dados.nome !== undefined) {
        produto.nome = dados.nome;
    }

    if (dados.preco !== undefined) {
        produto.preco = dados.preco;
    }

    return produto;
}

// Excluir produto
function excluir(id) {
    const indice = produtos.findIndex(
        produto => produto.id === Number(id)
    );

    if (indice === -1) {
        return false;
    }

    produtos.splice(indice, 1);

    return true;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    atualizarParcial,
    excluir
};