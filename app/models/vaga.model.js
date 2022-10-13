const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Vaga = sequelize.define("Vaga", {
        valor: {
            type: Sequelize.DECIMAL(10,2)
        },
        tipovaga: {
            type: Sequelize.INTEGER
        },

    });
    return Vaga;
}