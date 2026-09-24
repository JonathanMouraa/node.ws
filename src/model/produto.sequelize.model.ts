import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class ProdutoSequelize extends Model {
    declare id: number;
    declare nome: string;
    declare preco: number;
}

ProdutoSequelize.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "produtos",
        timestamps: false
    }
);

export default ProdutoSequelize;