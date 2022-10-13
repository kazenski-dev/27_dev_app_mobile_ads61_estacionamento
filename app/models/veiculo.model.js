const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Veiculo = sequelize.define("Veiculo", {
        placa: {
            type: Sequelize.STRING(45)
        },
        cor: {
            type: Sequelize.STRING(45)
        },
        cliente_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Clientes',
                key: 'id'
            }
        },
        modelo_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Modelos',
                key: 'id'
            }
        }
    }, {
        indexes: [
            {
                unique: false,
                primary: false,
                fields: ['cliente_id']
            },
            {
                unique: false,
                primary: false,
                fields: ['modelo_id']
            },
            {
                unique: true,
                fields: ['placa']
            }
        ]
    });
    return Veiculo;
}