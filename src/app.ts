import express from "express";
import sequelize from "./database/database";
import produtoRoutes from "./routes/produto.routes";
import "./model/produto.sequelize.model";

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);

sequelize.sync()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch((error) => {
        console.error("Erro ao conectar com o banco:", error);
    });

export default app;