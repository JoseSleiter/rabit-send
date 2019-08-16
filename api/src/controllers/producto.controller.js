'use strict';
require('../config/config')
const Producto = require('../models/producto.module');
const ObjectID = require('mongodb').ObjectID;   

class ProductoController{

    static async test(req, res){
        res.status(200).json(
            {
                data: "todo bien, es un test",
                port_MONGO: process.env.MONGO_SERVICE_PORT,
                host_MONGO: process.env.MONGO_SERVICE_HOST,
                url_MONGO: process.env.DATABASE_URL
            }
        )
    }


    /**
     * Returns all the products in the documents
     * @param {*} req datos de peticion del cliente
     * @param {*} res respuesta del servidor 39200
     */
    static async index(req, res){      
        try{
            let response = Producto.find({})

            response.then( async (products) =>{             
                let count = await Producto.count({})          
                res.status(200).json({products, count});  

            }).catch( err => {
                res.status(400).json(err)
            });

        }catch( exception){
            res.status(500).json(exception)            
        }

    }

    /**
     * Store in the document a product
     * @param {*} req datos de peticion del cliente
     * @param {*} res respuesta del servidor
     */
    static async store(req, res){  
        if( !Object.keys(req.body).length >= 3)
                return res.status(422).json({data: "Error faltan datos"})
                    
        const {...data} = req.body
        try{
        
            let response = Producto.create({  
                nombre: data.nombre, 
                imagen_url: data.imagen_url, 
                precio: data.precio 
            });                
            
            response.then(products => {                        
                // create!
                res.status(201).json({ data: products})
            }).catch( err => {
                // No create!
                res.status(400).send({message: 'Error en la peticion', err});
            });           
        }catch( exception){
            res.status(500).send(exception)            
        }
    }

    /**
     * Search one product in the documents
     * @param {*} req datos de peticion del cliente
     * @param {*} res respuesta del servidor
     */
    static async show(req, res){
        let productId = req.params.id;
        console.log(req.params)
        try{
            let response = Producto.findById({
                _id: ObjectID(productId)
            })
            response.then( product => {                
                if(!product) 
                return res.status(404).send({message: 'Not found'});

                res.status(200).send({message: 'Elemento encontrado', data: product});
                // followThisUser(req.user.sub, productId).then((value) => {
                //     return res.status(200).send({
                //         user,
                //         following: value.following,
                //         followed: value.followed
                //     });
                // });
                
            }).catch( err =>{
                res.status(400).send({message: 'Error en la peticion', err});
            });

        }catch( exception){
            res.status(500).send({                
                message: 'Error server'
            });          
        }

    }

    static async delete(req, res) {
        let {id} = req.params;
        // deleteOne, deleteMany, findByIdAndRemove(id), findByIdAndUpdate(id, params,{new: true})
        let response = Producto.remove({ _id:ObjectID(id )});
        try{
            response.then( product =>{

                if(!product.n)
                return res.status(404).send({message: 'Not found user'})
    
                res.status(200).send({ message: `Eliminado producto ${id}`});
            }).catch( err =>{                
                res.status(400).send({ message: 'Error en la peticion', error: err});
    
            })      
        }catch(Exception){
            res.status(500).send({                
                message: 'Error server'
            });
        }
    }
}

module.exports = ProductoController;