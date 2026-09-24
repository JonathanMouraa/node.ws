import { Produto } from "../model/produto.model";
import { ProdutoRepository } from "./produto.repository";

export class ProdutoRepositoryMemory implements ProdutoRepository {

    private produtos: Produto[] = [
        new Produto(1, "Notebook", 3500),
        new Produto(2, "Mouse", 120)
    ];

    async listar(nome?: string): Promise<Produto[]> {
        if (nome) {
            return this.produtos.filter(produto =>
                produto.nome
                    .toLowerCase()
                    .includes(nome.toLowerCase())
            );
        }

        return this.produtos;
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.produtos.find(
            produto => produto.id === id
        ) ?? null;
    }

    async criar(produto: Produto): Promise<Produto> {
        this.produtos.push(produto);

        return produto;
    }

    async atualizar(
        id: number,
        produto: Produto
    ): Promise<Produto | null> {

        const indice = this.produtos.findIndex(
            item => item.id === id
        );

        if (indice === -1) {
            return null;
        }

        this.produtos[indice] = produto;

        return produto;
    }

    async atualizarParcial(
        id: number,
        dados: Partial<Produto>
    ): Promise<Produto | null> {

        const produto = await this.buscarPorId(id);

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

    async excluir(id: number): Promise<boolean> {

        const indice = this.produtos.findIndex(
            produto => produto.id === id
        );

        if (indice === -1) {
            return false;
        }

        this.produtos.splice(indice, 1);

        return true;
    }
}