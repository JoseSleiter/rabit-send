'use strict'
const Carrito = require('../models/carrito.module')
const Cliente = require('../models/cliente.module')
const Direccion = require('../models/direccion.module')
const Producto = require('../models/producto.module')
const Caracteristica = require('../models/caracteristica.module')
const Elemento = require('../models/elemento.module')

class carritoController {
    static async index(req, res){
        try {
            let response = Carrito.find({}).populate('cliente_id').populate('direccion_id')

            response.then( carritos =>{
                if(!carritos)
                return res.status(404).send({message: "No exist result"})
                res.status(200).send({data: carritos})

            }).catch( err =>{
                res.status(400).send({message: "Error en peticion", error: err})

            })
        } catch (error) {
            res.status(500).send({message: "No found"})
  
        }

    }

    static async show(req, res){


    }

    static async store(req, res){
        if(!Object.keys(req.body).length >= 3)
        return res.status(422).send({menssage : "No se tienen todos los datos"})
        let {cliente_id, direccion_id, propina} = req.body
        
        try {
            Carrito.create({cliente_id, direccion_id, propina}).then( carrito =>{
                console.log(carrito)
                res.status(201).send({menssage: "create", data :  carrito})
            }).catch( err => {
                console.log({message: err.message})
                res.status(422).send({message: "Error en peticion", error: err})
            })
        } catch (error) {
            res.status(500).send({"mensagge": "Not Bound"})
        }

    }

    static async storeCarrito(req, res){
        console.log(!Object.keys(req.body).length )
        if(!Object.keys(req.body).length < 6)
        return res.status(422).send({menssage : "No se tienen todos los datos"})
        let {...data } = req.body
        try {
            let cliente_data = await Cliente.create({
                nombre: data.nombre,
                apellido: data.apellido })

            let direccion_data = await Direccion.create({
                cliente_id: cliente_data._id, 
                latitud: data.latitud, 
                longitud: data.longitud })

            let carrito_data = await Carrito.create({
                cliente_id: cliente_data._id, 
                direccion_id: direccion_data._id, 
                propina: data.propina })

            data.productos.map( async(producto) =>{
                let producto_data = await Producto.create({
                    id: producto.id, 
                    nombre: producto.nombre,
                    imagen_url: producto.imagen_url, 
                    precio: producto.precio })

                if(!producto.caracteristica)
                Caracteristica.create({
                    producto_id: producto_data._id,
                    nombre: producto_data.caracteristica.nombre,
                    impacto_precio: producto_data.impacto_precio})

                Elemento.create({
                    producto_id: producto_data._id,
                    cantidad: producto.cantidad,
                    precio: producto.precio,
                    carrito_id: carrito_data._id
                })
            })
            res.status(201).send({menssage: "create", data :  data})

            // Carrito.create({cliente_id, direccion_id, propina}).then( carrito =>{
            //     console.log(carrito)
            //     res.status(201).send({menssage: "create", data :  carrito})
            // }).catch( err => {
            //     console.log({message: err.message})
            //     res.status(422).send({message: "Error en peticion", error: err})
            // })
        } catch (error) {
            res.status(500).send({"mensagge": "Not Found"})
        }
    
    }
}

module.exports = carritoController;