import { Request, Response } from "express";
import { ProdutoRepositorySequelize } from "../repositories/produto.repository.sequelize";
import { ProdutoService } from "../services/produto.service";

const repository = new ProdutoRepositorySequelize();
const service = new ProdutoService(repository);

// GET /produtos
export async function listar(req: Request, res: Response) {
    const produtos = await service.listar(
        req.query.nome as string | undefined
    );

    res.status(200).json(produtos);
}

// GET /produtos/:id
export async function buscarPorId(
    req: Request,
    res: Response
) {
    const produto = await service.buscarPorId(
        Number(req.params.id)
    );

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

// POST /produtos
export async function criar(
    req: Request,
    res: Response
) {
    try {
        const produto = await service.criar(req.body);

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({
            mensagem: (error as Error).message
        });
    }
}

// PUT /produtos/:id
export async function atualizar(
    req: Request,
    res: Response
) {
    try {
        const produto = await service.atualizar(
            Number(req.params.id),
            req.body
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({
            mensagem: (error as Error).message
        });
    }
}

// PATCH /produtos/:id
export async function atualizarParcial(
    req: Request,
    res: Response
) {
    const produto = await service.atualizarParcial(
        Number(req.params.id),
        req.body
    );

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
}

// DELETE /produtos/:id
export async function excluir(
    req: Request,
    res: Response
) {
    const excluido = await service.excluir(
        Number(req.params.id)
    );

    if (!excluido) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(204).send();
}