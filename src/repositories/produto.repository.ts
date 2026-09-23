import { Produto } from "../model.js/produto.model";

export interface ProdutoRepository {
    listar(nome?: string): Promise<Produto[]>;

    buscarPorId(id: number): Promise<Produto | null>;

    criar(produto: Produto): Promise<Produto>;

    atualizar(id: number, produto: Produto): Promise<Produto | null>;

    atualizarParcial(
        id: number,
        dados: Partial<Produto>
    ): Promise<Produto | null>;

    excluir(id: number): Promise<boolean>;
}