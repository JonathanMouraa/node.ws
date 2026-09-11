const express = require("express");

const router = express.Router();

const controller = require("../controllers/produto.controllers");

// GET /produtos
router.get("/", controller.listar);

// GET /produtos/:id
router.get("/:id", controller.buscarPorId);

// POST /produtos
router.post("/", controller.criar);

// PUT /produtos/:id
router.put("/:id", controller.atualizar);

// PATCH /produtos/:id
router.patch("/:id", controller.atualizarParcial);

// DELETE /produtos/:id
router.delete("/:id", controller.excluir);

module.exports = router;