'use strict'
const Caracteristica = require('../models/caracteristica.module')

class caracteristicasController{
    static async index(req, res){
        try {
            let response = Caracteristica.find({}).populate('producto_id')

            response.then( caracteristicas =>{
                if(!caracteristicas)
                return res.status(404).send({message: 'No exits elements', err});
                res.status(200).send({data : caracteristicas});

            })
            .catch(err =>{
                res.status(400).send({message: 'Error en la peticion', err});
            })

        } catch (error) {
            res.status(500).send({"mensagge": "Not Bound"})
        }
    }

    static async store(req, res){
        if(!Object.keys(req.body).length >= 3)
        return res.status(422).send({menssage : "No se tienen todos los datos"})

        let {producto_id, nombre, impacto_precio} = req.body

        try {
            Caracteristica.create({producto_id, nombre, impacto_precio}).then( caracteristica =>{
                console.log(caracteristica)
                res.status(201).send({menssage: "create", data :  caracteristica})
            }).catch( err => {
                console.log({message: err.message})
                res.status(422).send({message: "Error en peticion", error: err})
            })
        } catch (error) {
            res.status(500).send({"mensagge": "Not Bound"})
        }

    }

    static async show(req, res){
        
    }
}

module.exports = caracteristicasController;