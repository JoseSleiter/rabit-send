'use strict'
const Cliente = require('./cliente.module')
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    cliente_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Cliente,
        required: true
    },
    latitud:{
        type: Number,
        required: true
    },
    longitud:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Direccion', schema)