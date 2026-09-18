import {Router} from "express";
import * as produtoController
   from "../controllers/produto.controller" ;

// GET /produtos
router.get("/", produtoController.listar);

// GET /produtos/:id
router.get("/:id", produtoController.buscarPorId);

// POST /produtos
router.post("/", produtoController.criar);

exports default router;