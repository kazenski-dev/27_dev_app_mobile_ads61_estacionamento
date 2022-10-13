const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Modelo = sequelize.define("Modelo", {
        nome: {
            type: Sequelize.STRING(45)
        }
    });
    return Modelo;
}