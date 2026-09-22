import { Produto } from "../model.js/produto.model";

const produtos: Produto[] = [
    new Produto(1, "Notebook", 3500),
    new Produto(2, "Mouse", 120)
];

// Listar produtos
function listar(nome?: string) {
    if (nome) {
        return produtos.filter(produto =>
            produto.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    return produtos;
}

// Buscar produto pelo ID
function buscarPorId(id: number) {
    return produtos.find(
        produto => produto.id === Number(id)
    );
}

// Criar produto
function criar(dados: { nome: string; preco: number }) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("Nome e preço são obrigatórios");
    }

    const id = produtos.length > 0
        ? Math.max(...produtos.map(p => p.id)) + 1
        : 1;

    const produto = new Produto(
        id,
        dados.nome,
        dados.preco
    );

    produtos.push(produto);

    return produto;
}

// Atualizar produto inteiro - PUT
function atualizar(id: number, dados: { nome: string; preco: number }) {
    const indice = produtos.findIndex(
        produto => produto.id === Number(id)
    );

    if (indice === -1) {
        return null;
    }

    if (!dados.nome || dados.preco == null) {
        throw new Error("Nome e preço são obrigatórios");
    }

    produtos[indice] = new Produto(
        Number(id),
        dados.nome,
        dados.preco
    );

    return produtos[indice];
}

// Atualizar parcialmente - PATCH
function atualizarParcial(
    id: number,
    dados: { nome?: string; preco?: number }
) {
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
function excluir(id: number) {
    const indice = produtos.findIndex(
        produto => produto.id === Number(id)
    );

    if (indice === -1) {
        return false;
    }

    produtos.splice(indice, 1);

    return true;
}

export {
    listar,
    buscarPorId,
    criar,
    atualizar,
    atualizarParcial,
    excluir
};