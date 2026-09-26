import { Request, Response } from "express";
import * as controller from "../produto.controllers";
import ProdutoSequelize from "../../model/produto.sequelize.model";

function mockResponse() {
    const res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);

    return res;
}

async function criarProdutoTeste() {
    return ProdutoSequelize.create({
        nome: "Produto Teste",
        preco: 100
    });
}

describe("ProdutoController", () => {

    test("deve listar produtos", async () => {
        const req = {
            query: {}
        } as Request;

        const res = mockResponse();

        await controller.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve buscar produto por ID", async () => {
        const produto = await criarProdutoTeste();

        const req = {
            params: { id: String(produto.id) }
        } as unknown as Request;

        const res = mockResponse();

        await controller.buscarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve retornar 404 ao buscar produto inexistente", async () => {
        const req = {
            params: { id: "999999" }
        } as unknown as Request;

        const res = mockResponse();

        await controller.buscarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            mensagem: "Produto não encontrado"
        });
    });

    test("deve criar produto", async () => {
        const req = {
            body: {
                nome: "Produto Teste",
                preco: 100
            }
        } as Request;

        const res = mockResponse();

        await controller.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve retornar 400 ao criar produto inválido", async () => {
        const req = {
            body: {
                preco: 100
            }
        } as Request;

        const res = mockResponse();

        await controller.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve atualizar produto", async () => {
        const produto = await criarProdutoTeste();

        const req = {
            params: { id: String(produto.id) },
            body: {
                nome: "Produto Atualizado",
                preco: 200
            }
        } as unknown as Request;

        const res = mockResponse();

        await controller.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve retornar 404 ao atualizar produto inexistente", async () => {
        const req = {
            params: { id: "999999" },
            body: {
                nome: "Produto",
                preco: 200
            }
        } as unknown as Request;

        const res = mockResponse();

        await controller.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            mensagem: "Produto não encontrado"
        });
    });

    test("deve atualizar parcialmente", async () => {
        const produto = await criarProdutoTeste();

        const req = {
            params: { id: String(produto.id) },
            body: {
                preco: 300
            }
        } as unknown as Request;

        const res = mockResponse();

        await controller.atualizarParcial(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("deve retornar 404 ao atualizar parcialmente produto inexistente", async () => {
        const req = {
            params: { id: "999999" },
            body: {
                preco: 300
            }
        } as unknown as Request;

        const res = mockResponse();

        await controller.atualizarParcial(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            mensagem: "Produto não encontrado"
        });
    });

    test("deve excluir produto", async () => {
        const produto = await criarProdutoTeste();

        const req = {
            params: { id: String(produto.id) }
        } as unknown as Request;

        const res = mockResponse();

        await controller.excluir(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    test("deve retornar 404 ao excluir produto inexistente", async () => {
        const req = {
            params: { id: "999999" }
        } as unknown as Request;

        const res = mockResponse();

        await controller.excluir(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            mensagem: "Produto não encontrado"
        });
    });
});
