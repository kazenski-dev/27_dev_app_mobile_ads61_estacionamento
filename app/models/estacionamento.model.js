const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Estacionamento = sequelize.define("Estacionamento", {
        entrada: {
            type: Sequelize.DATE
        },
        saida: {
            type: Sequelize.DATE
        },
        valor: {
            type: Sequelize.DECIMAL
        },
        veiculo_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Veiculos',
                key: 'id'
            }
        },
        vaga_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Vagas',
                key: 'id'
            }
        }
    }, {
        indexes: [
            {
                unique: false,
                primary: false,
                fields: ['veiculo_id']
            },
            {
                unique: false,
                primary: false,
                fields: ['vaga_id']
            }
        ]
    });
    return Estacionamento;
}