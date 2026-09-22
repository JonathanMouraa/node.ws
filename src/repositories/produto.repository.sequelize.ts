import { Produto } from "../model.js/produto.model";
import { ProdutoRepository } from "./produto.repository";

export class ProdutoRepositorySequelize implements ProdutoRepository {

    async listar(): Promise<Produto[]> {
        // Sequelize
        throw new Error("Não implementado");
    }

    async buscarPorId(
        id: number
    ): Promise<Produto | null> {
        // Sequelize
        throw new Error("Não implementado");
    }

    async criar(
        produto: Produto
    ): Promise<Produto> {
        // Sequelize
        throw new Error("Não implementado");
    }
}