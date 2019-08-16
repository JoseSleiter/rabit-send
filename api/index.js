'use strict'

require('./src/config/config')
var mongoose = require('mongoose');
var app = require('./src/app');

// Database mlab.com
mongoose.Promise = global.Promise;

// Conexion
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
.then(() => {
    console.log(`La conexión a la base de datos local se ha realizado correctamente `)        
    // CREAR EL SERVIDOR WEB CON NODEJS
    app.listen( process.env.PORT, () => {
        console.log(`Server started on port ${ process.env.PORT}`);
        // console.log(mongoose.get('test'))

    });
})
.catch(err => console.log(err));