'use strict'
const Elemento = require('../models/elemento.module')

class ElementosController {
    static async index(rep, res){
        try {
            let response = Elemento.find({}).populate('producto_id').populate('carrito_id')

            response.then( elementos =>{
                if(!elementos)
                return res.status(404).send({message: 'No exits elements', err});
                res.status(200).send({data : elementos});

            })
            .catch(err =>{
                res.status(400).send({message: 'Error en la peticion', err});
            })

        } catch (error) {
            res.status(500).send({"mensagge": "Not Bound"})
        }

    }

    static async store(req, res){        
        if(!Object.keys(req.body).length >= 4)
        return res.status(422).send({menssage : "No se tienen todos los datos"})
        let {producto_id, cantidad, precio, id_carrito} = req.body

        try {
            let response = Elemento.create({producto_id, cantidad, precio, id_carrito})

            response.then( elementos =>{
                res.status(201).send({menssage: "create", data : elementos})

            }).catch( err =>{
                res.status(422).send({message: "Error en peticion", error: err})
            })
        } catch (error) {
            res.status(500).send({mensagge: "Not Found"})
        }
    }

    static async show(req, res){
        let {carrito_id} = req.params 
        let response = Elemento.find({carrito_id}).populate('producto_id').populate('carrito_id')
        console.log(req.params)
        response.then( elementos =>{
            res.status(200).send(elementos)
        }).catch( err => {
            res.status(422).send(err)
            
        })
    }
}

module.exports = ElementosController;