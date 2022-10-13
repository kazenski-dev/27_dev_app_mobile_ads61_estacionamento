const express = require('express');
const vaga = require("../controllers/vaga.controller"); 

const rota = express.Router();

rota
    .route('/api/vagas')
    .post(vaga.create)
    .get(vaga.findAll);

rota
    .route('/api/vagas/:id')
    .get(vaga.findOne)
    .put(vaga.update)
    .delete(vaga.delete);

module.exports = rota;    