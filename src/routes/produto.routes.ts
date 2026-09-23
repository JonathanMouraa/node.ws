import { Router } from "express";
import * as produtoController from "../controllers/produto.controllers";

const router = Router();

router.get("/", produtoController.listar);

router.get("/:id", produtoController.buscarPorId);

router.post("/", produtoController.criar);

router.put("/:id", produtoController.atualizar);

router.patch("/:id", produtoController.atualizarParcial);

router.delete("/:id", produtoController.excluir);

export default router;