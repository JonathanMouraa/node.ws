import { Produto } from "../model/produto.model";
import ProdutoSequelize from "../model/produto.sequelize.model";
import { ProdutoRepository } from "./produto.repository";

export class ProdutoRepositorySequelize implements ProdutoRepository {

    async listar(nome?: string): Promise<Produto[]> {

        const produtos = await ProdutoSequelize.findAll({
            where: nome
                ? {
                    nome: {
                        [require("sequelize").Op.like]: `%${nome}%`
                    }
                }
                : undefined
        });

        return produtos.map(produto =>
            new Produto(
                produto.id,
                produto.nome,
                produto.preco
            )
        );
    }

    async buscarPorId(id: number): Promise<Produto | null> {

        const produto = await ProdutoSequelize.findByPk(id);

        if (!produto) {
            return null;
        }

        return new Produto(
            produto.id,
            produto.nome,
            produto.preco
        );
    }

    async criar(produto: Produto): Promise<Produto> {

        const criado = await ProdutoSequelize.create({
            nome: produto.nome,
            preco: produto.preco
        });

        return new Produto(
            criado.id,
            criado.nome,
            criado.preco
        );
    }

    async atualizar(
        id: number,
        produto: Produto
    ): Promise<Produto | null> {

        const existente = await ProdutoSequelize.findByPk(id);

        if (!existente) {
            return null;
        }

        existente.nome = produto.nome;
        existente.preco = produto.preco;

        await existente.save();

        return new Produto(
            existente.id,
            existente.nome,
            existente.preco
        );
    }

    async atualizarParcial(
        id: number,
        dados: Partial<Produto>
    ): Promise<Produto | null> {

        const existente = await ProdutoSequelize.findByPk(id);

        if (!existente) {
            return null;
        }

        if (dados.nome !== undefined) {
            existente.nome = dados.nome;
        }

        if (dados.preco !== undefined) {
            existente.preco = dados.preco;
        }

        await existente.save();

        return new Produto(
            existente.id,
            existente.nome,
            existente.preco
        );
    }

    async excluir(id: number): Promise<boolean> {

        const quantidade = await ProdutoSequelize.destroy({
            where: { id }
        });

        return quantidade > 0;
    }
}