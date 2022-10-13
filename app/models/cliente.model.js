const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        nome: {
            type: Sequelize.STRING(45)
        },
        cpf: {
            type: Sequelize.STRING(45)
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['cpf']
            }
        ]
    });
    return Cliente;
}