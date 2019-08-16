const express = require('express');
const app = express();

// set variables
// app.set('port', '3000');
app.set('json spaces', 2)

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use('/api/' ,require('./routes/routes.productos'))
app.use('/api/', require('./routes/routes.clientes'))
app.use('/api/', require('./routes/routes.direcciones'))
app.use('/api/', require('./routes/routes.carritos'))
app.use('/api/', require('./routes/routes.elementos'))
app.use('/api/', require('./routes/routes.caracteristicas'))

module.exports = app;
