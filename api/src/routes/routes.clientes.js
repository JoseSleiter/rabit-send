const express = require ('express')
const ClienteCrtl = require('../controllers/cliente.controller')
const cliente = express.Router();

cliente
.get('/clientes', ClienteCrtl.index )
.post('/clientes', ClienteCrtl.store)

module.exports = cliente;