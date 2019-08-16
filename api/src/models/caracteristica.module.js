'use strict'
const Producto = require('./producto.module')
const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    producto_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Producto,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    impacto_precio:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Caracteristica', schema)