const express = require('express');
const veiculo = require("../controllers/veiculo.controller"); 

const rota = express.Router();

rota
    .route('/api/veiculos')
    .post(veiculo.create)
    .get(veiculo.findAll);

rota
    .route('/api/veiculos/:id')
    .get(veiculo.findOne)
    .put(veiculo.update)
    .delete(veiculo.delete);

module.exports = rota;    