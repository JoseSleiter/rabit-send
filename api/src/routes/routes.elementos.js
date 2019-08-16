const express = require('express')

const elementosCtrl = require('../controllers/elementos.controller')
const elemento = express.Router()

elemento
.get('/elementos', elementosCtrl.index)
.post('/elementos', elementosCtrl.store) 
.get('/elementos/:id', elementosCtrl.show)

module.exports = elemento;