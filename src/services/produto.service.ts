import { Produto } from "../model/produto.model";
import { ProdutoRepository } from "../repositories/produto.repository";

export class ProdutoService {

    constructor(
        private repository: ProdutoRepository
    ) {}

    async listar(nome?: string): Promise<Produto[]> {
        return this.repository.listar(nome);
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.repository.buscarPorId(id);
    }

    async criar(
        dados: { nome: string; preco: number }
    ): Promise<Produto> {

        if (!dados.nome || dados.preco == null) {
            throw new Error("Nome e preço são obrigatórios");
        }

        const produtos = await this.repository.listar();

        const id = produtos.length > 0
            ? Math.max(...produtos.map(p => p.id)) + 1
            : 1;

        const produto = new Produto(
            id,
            dados.nome,
            dados.preco
        );

        return this.repository.criar(produto);
    }

    async atualizar(
        id: number,
        dados: { nome: string; preco: number }
    ): Promise<Produto | null> {

        if (!dados.nome || dados.preco == null) {
            throw new Error("Nome e preço são obrigatórios");
        }

        const produto = new Produto(
            id,
            dados.nome,
            dados.preco
        );

        return this.repository.atualizar(id, produto);
    }

    async atualizarParcial(
        id: number,
        dados: { nome?: string; preco?: number }
    ): Promise<Produto | null> {

        return this.repository.atualizarParcial(
            id,
            dados
        );
    }

    async excluir(id: number): Promise<boolean> {
        return this.repository.excluir(id);
    }
}