const express = require('express');
const modelo = require("../controllers/modelo.controller"); 

const rota = express.Router();

rota
    .route('/api/modelos')
    .post(modelo.create)
    .get(modelo.findAll);

rota
    .route('/api/modelos/:id')
    .get(modelo.findOne)
    .put(modelo.update)
    .delete(modelo.delete);

module.exports = rota;    