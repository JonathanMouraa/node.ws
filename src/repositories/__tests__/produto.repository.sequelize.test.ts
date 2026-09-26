import sequelize from "../../database/database";
import ProdutoSequelize from "../../model/produto.sequelize.model";
import { Produto } from "../../model/produto.model";
import { ProdutoRepositorySequelize } from "../produto.repository.sequelize";

describe("ProdutoRepositorySequelize", () => {

    const repository = new ProdutoRepositorySequelize();

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await ProdutoSequelize.destroy({
            where: {},
            truncate: true
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test("deve listar produtos", async () => {
        await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.listar();

        expect(resultado).toHaveLength(1);
        expect(resultado[0].nome).toBe("Notebook");
    });

    test("deve listar produtos filtrando por nome", async () => {
        await ProdutoSequelize.bulkCreate([
            {
                nome: "Notebook",
                preco: 3500
            },
            {
                nome: "Mouse",
                preco: 120
            }
        ]);

        const resultado = await repository.listar("Mouse");

        expect(resultado).toHaveLength(1);
        expect(resultado[0].nome).toBe("Mouse");
    });

    test("deve buscar produto por ID", async () => {
        const criado = await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.buscarPorId(criado.id);

        expect(resultado).not.toBeNull();
        expect(resultado?.nome).toBe("Notebook");
    });

    test("deve retornar null ao buscar produto inexistente", async () => {
        const resultado = await repository.buscarPorId(999);

        expect(resultado).toBeNull();
    });

    test("deve criar produto", async () => {
        const produto = new Produto(
            0,
            "Teclado",
            200
        );

        const resultado = await repository.criar(produto);

        expect(resultado.id).toBeGreaterThan(0);
        expect(resultado.nome).toBe("Teclado");
        expect(resultado.preco).toBe(200);
    });

    test("deve atualizar produto", async () => {
        const criado = await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.atualizar(
            criado.id,
            new Produto(
                criado.id,
                "Notebook Gamer",
                4500
            )
        );

        expect(resultado?.nome).toBe("Notebook Gamer");
        expect(resultado?.preco).toBe(4500);
    });

    test("deve retornar null ao atualizar produto inexistente", async () => {
        const resultado = await repository.atualizar(
            999,
            new Produto(999, "Produto", 100)
        );

        expect(resultado).toBeNull();
    });

    test("deve atualizar parcialmente o nome", async () => {
        const criado = await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.atualizarParcial(
            criado.id,
            { nome: "Notebook Gamer" }
        );

        expect(resultado?.nome).toBe("Notebook Gamer");
        expect(resultado?.preco).toBe(3500);
    });

    test("deve atualizar parcialmente o preço", async () => {
        const criado = await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.atualizarParcial(
            criado.id,
            { preco: 4500 }
        );

        expect(resultado?.nome).toBe("Notebook");
        expect(resultado?.preco).toBe(4500);
    });

    test("deve retornar null ao atualizar parcialmente produto inexistente", async () => {
        const resultado = await repository.atualizarParcial(
            999,
            { preco: 100 }
        );

        expect(resultado).toBeNull();
    });

    test("deve excluir produto", async () => {
        const criado = await ProdutoSequelize.create({
            nome: "Notebook",
            preco: 3500
        });

        const resultado = await repository.excluir(criado.id);

        expect(resultado).toBe(true);
    });

    test("deve retornar false ao excluir produto inexistente", async () => {
        const resultado = await repository.excluir(999);

        expect(resultado).toBe(false);
    });

});
