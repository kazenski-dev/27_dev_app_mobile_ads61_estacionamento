const express = require('express');
const cliente = require("../controllers/cliente.controller"); 

const rota = express.Router();

rota
    .route('/api/clientes')
    .post(cliente.create)
    .get(cliente.findAll);

rota
    .route('/api/clientes/:id')
    .get(cliente.findOne)
    .put(cliente.update)
    .delete(cliente.delete);

module.exports = rota;    