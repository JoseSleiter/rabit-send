const express = require('express')
const caracteristicaCrtl = require('../controllers/caracteristicas.controller')
const caracteristica = express.Router()

caracteristica
.get('/caracteristicas', caracteristicaCrtl.index)
.post('/caracteristicas', caracteristicaCrtl.store)

module.exports = caracteristica;