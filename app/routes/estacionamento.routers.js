const express = require('express');
const estacionamento = require("../controllers/estacionamento.controller"); 

const rota = express.Router();

rota
    .route('/api/estacionamentos')
    .post(estacionamento.create)
    .get(estacionamento.findAll);
    
rota
    .route('/api/estacionamentos/:id')
    .get(estacionamento.findOne)
    .put(estacionamento.update)
    .delete(estacionamento.delete);

module.exports = rota;    