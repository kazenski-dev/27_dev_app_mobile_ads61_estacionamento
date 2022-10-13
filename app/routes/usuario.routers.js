const express = require('express');
const usuario = require("../controllers/usuario.controller"); 

const rota = express.Router();

rota
    .route('/api/usuarios')
    .post(usuario.create)
    .get(usuario.findAll);

rota
    .route('/api/usuarios/:id')
    .get(usuario.findOne)
    .put(usuario.update)
    .delete(usuario.delete);

module.exports = rota;    