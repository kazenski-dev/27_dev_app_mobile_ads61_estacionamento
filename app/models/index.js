const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize =  new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.estacionamento = require("./estacionamento.model.js")(sequelize, Sequelize);
db.vaga = require("./vaga.model.js")(sequelize, Sequelize);
db.veiculo = require("./veiculo.model.js")(sequelize, Sequelize);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.modelo = require("./modelo.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);

module.exports = db;