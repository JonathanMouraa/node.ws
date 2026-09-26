import { Produto } from "../../model/produto.model";
import { ProdutoRepository } from "../../repositories/produto.repository";
import { ProdutoService } from "../produto.service";

describe("ProdutoService", () => {

    let repository: jest.Mocked<ProdutoRepository>;
    let service: ProdutoService;

    beforeEach(() => {
        repository = {
            listar: jest.fn(),
            buscarPorId: jest.fn(),
            criar: jest.fn(),
            atualizar: jest.fn(),
            atualizarParcial: jest.fn(),
            excluir: jest.fn()
        };

        service = new ProdutoService(repository);
    });

    test("deve listar produtos", async () => {
        const produtos = [
            new Produto(1, "Notebook", 3500)
        ];

        repository.listar.mockResolvedValue(produtos);

        const resultado = await service.listar();

        expect(resultado).toEqual(produtos);
        expect(repository.listar).toHaveBeenCalledWith(undefined);
    });

    test("deve buscar produto por ID", async () => {
        const produto = new Produto(1, "Notebook", 3500);

        repository.buscarPorId.mockResolvedValue(produto);

        const resultado = await service.buscarPorId(1);

        expect(resultado).toEqual(produto);
        expect(repository.buscarPorId).toHaveBeenCalledWith(1);
    });

    test("deve criar produto", async () => {
        const produto = new Produto(1, "Notebook", 3500);

        repository.listar.mockResolvedValue([]);
        repository.criar.mockResolvedValue(produto);

        const resultado = await service.criar({
            nome: "Notebook",
            preco: 3500
        });

        expect(resultado).toEqual(produto);
        expect(repository.criar).toHaveBeenCalled();
    });

    test("deve rejeitar criação sem nome", async () => {
        await expect(
            service.criar({
                nome: "",
                preco: 3500
            })
        ).rejects.toThrow("Nome e preço são obrigatórios");
    });

    test("deve rejeitar criação sem preço", async () => {
        await expect(
            service.criar({
                nome: "Notebook",
                preco: null as unknown as number
            })
        ).rejects.toThrow("Nome e preço são obrigatórios");
    });

    test("deve atualizar produto", async () => {
        const produto = new Produto(1, "Notebook Gamer", 4500);

        repository.atualizar.mockResolvedValue(produto);

        const resultado = await service.atualizar(1, {
            nome: "Notebook Gamer",
            preco: 4500
        });

        expect(resultado).toEqual(produto);
        expect(repository.atualizar).toHaveBeenCalledWith(
            1,
            expect.any(Produto)
        );
    });

    test("deve rejeitar atualização sem nome", async () => {
        await expect(
            service.atualizar(1, {
                nome: "",
                preco: 4500
            })
        ).rejects.toThrow("Nome e preço são obrigatórios");
    });

    test("deve atualizar parcialmente", async () => {
        const produto = new Produto(1, "Notebook Gamer", 4800);

        repository.atualizarParcial.mockResolvedValue(produto);

        const resultado = await service.atualizarParcial(1, {
            preco: 4800
        });

        expect(resultado).toEqual(produto);
        expect(repository.atualizarParcial).toHaveBeenCalledWith(
            1,
            { preco: 4800 }
        );
    });

    test("deve excluir produto", async () => {
        repository.excluir.mockResolvedValue(true);

        const resultado = await service.excluir(1);

        expect(resultado).toBe(true);
        expect(repository.excluir).toHaveBeenCalledWith(1);
    });

});
