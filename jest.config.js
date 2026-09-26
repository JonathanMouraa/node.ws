module.exports = {
    testEnvironment: "node",

    transform: {
        "^.+\\.tsx?$": "babel-jest"
    },

    collectCoverage: true,

    collectCoverageFrom: [
        "src/services/produto.service.ts",
        "src/repositories/produto.repository.sequelize.ts",
        "src/controllers/produto.controllers.ts",
        "src/model/produto.model.ts"
    ]
};
