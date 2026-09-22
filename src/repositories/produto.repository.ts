import { Produto } from "../model.js/produto.model";

export interface ProdutoRepository {
    listar(): Promise<Produto[]>;

    buscarPorId(id: number): Promise<Produto | null>;

    criar(produto: Produto): Promise<Produto>;
}