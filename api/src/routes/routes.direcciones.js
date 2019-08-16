const express = require ('express')
const direccionCrtl = require('../controllers/direccion.controller')
const direccion = express.Router();


direccion
.get('/direcciones', direccionCrtl.index)
.post('/direcciones', direccionCrtl.store)

module.exports = direccion;