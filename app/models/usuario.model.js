const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("Usuario", {
        nome: {
            type: Sequelize.STRING(45)
        },
        login: {
            type: Sequelize.STRING(45)
        },
        senha: {
            type: Sequelize.STRING(45)
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['login']
            }
        ]
    });
    return Usuario;
}