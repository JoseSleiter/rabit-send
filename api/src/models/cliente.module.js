'use strict';
const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cliente', schema);