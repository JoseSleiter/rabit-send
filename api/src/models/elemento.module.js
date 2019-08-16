'use strict'
const Producto = require ('./producto.module')
const Carrito = require ('./carrito.module')
const mongoose = require ('mongoose')

const schema = new mongoose.Schema({
    producto_id:{
        type: [mongoose.Schema.Types.ObjectId],      
        ref: Producto,
        required: true
    },
    carrito_id:{
        type: [mongoose.Schema.Types.ObjectId],      
        ref: Carrito,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Elemento', schema)