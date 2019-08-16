'use strict'
const Cliente = require('../models/cliente.module')

class clienteController {
    static async index(req, res){
        try {
            let response = Cliente.find({})

            response.then( clientes =>{
                console.log(clientes)
                if(!clientes) 
                return res.status(404).send({menssage : "No exits clients"})

                res.status(200).send({data : clientes})
            }).catch( err =>{
                res.status(400).send({menssage : "Error en peticion"})

            })
        } catch (error) {
            res.status(500).send({menssage : "No Found"})
        }
    }

    static async store(req, res){
        if( !Object.keys(data).length >= 2) 
        return res.status(422).send({menssage : "No se tienen todos los datos"})
        const {...data} = req.body;
        console.log(data)
        try {       
            let response = Cliente.create({nombre: data.nombre, apellido: data.apellido})

            response.then( cliente =>{                        
                res.status(201).send({menssage: "create", data : cliente})

            }).catch( err =>{
                res.status(400).send({menssage : "No Found"})

            })
        } catch (error) {
            res.status(500).send({menssage : "No Found"})
        }
    }
}

module.exports = clienteController;